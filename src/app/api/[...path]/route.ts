import { cookies } from "next/headers";

import { ResponseCode } from "@/constants";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

async function proxy(req: Request, path: string[]) {
  try {
    const accessToken = (await cookies()).get("access_token")?.value;

    const { searchParams } = new URL(req.url);
    const fullPath = path.join("/");
    const backendUrl = `${API_URL}/${fullPath}${searchParams.toString() ? `?${searchParams.toString()}` : ""}`;

    let res = await fetch(backendUrl, {
      method: req.method,
      headers: {
        Authorization: accessToken ? `Bearer ${accessToken}` : "",
        "Content-Type": "application/json",
      },
      body:
        req.method !== "GET" && req.method !== "HEAD"
          ? await req.text()
          : undefined,
    });

    if (res.status === ResponseCode.UNAUTHORIZED) {
      const refreshToken = (await cookies()).get("refresh_token")?.value;

      if (!refreshToken) {
        return Response.json(
          { message: "Unauthorized", statusCode: ResponseCode.UNAUTHORIZED },
          { status: ResponseCode.UNAUTHORIZED }
        );
      }

      const refreshRes = await fetch(`${API_URL}/auth/refresh`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken }),
      });

      if (!refreshRes.ok) {
        (await cookies()).delete("access_token");
        (await cookies()).delete("refresh_token");
        return Response.json(
          { message: "Session expired", statusCode: ResponseCode.UNAUTHORIZED },
          { status: ResponseCode.UNAUTHORIZED }
        );
      }

      const result = await refreshRes.json();
      const { access_token: newToken, refresh_token: newRefresh } =
        result.data || {};

      if (!newToken || !newRefresh) {
        return Response.json(
          {
            message: "Invalid refresh response",
            statusCode: ResponseCode.INTERNAL_SERVER_ERROR,
          },
          { status: ResponseCode.INTERNAL_SERVER_ERROR }
        );
      }

      const isProduction = process.env.NODE_ENV === "production";

      (await cookies()).set("access_token", newToken, {
        httpOnly: true,
        secure: isProduction,
        sameSite: "lax",
        path: "/",
      });

      (await cookies()).set("refresh_token", newRefresh, {
        httpOnly: true,
        secure: isProduction,
        sameSite: "lax",
        path: "/",
      });

      res = await fetch(backendUrl, {
        method: req.method,
        headers: {
          Authorization: `Bearer ${newToken}`,
          "Content-Type": "application/json",
        },
        body:
          req.method !== "GET" && req.method !== "HEAD"
            ? await req.text()
            : undefined,
      });
    }

    const responseData = await res.json();
    return Response.json(responseData, {
      status: res.status,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Proxy error:", error);
    return Response.json(
      {
        message: "Internal server error",
        statusCode: ResponseCode.INTERNAL_SERVER_ERROR,
      },
      { status: ResponseCode.INTERNAL_SERVER_ERROR }
    );
  }
}

export const GET = async (
  req: Request,
  ctx: { params: Promise<{ path: string[] }> }
) => proxy(req, (await ctx.params).path);
export const POST = async (
  req: Request,
  ctx: { params: Promise<{ path: string[] }> }
) => proxy(req, (await ctx.params).path);
export const PUT = async (
  req: Request,
  ctx: { params: Promise<{ path: string[] }> }
) => proxy(req, (await ctx.params).path);
export const DELETE = async (
  req: Request,
  ctx: { params: Promise<{ path: string[] }> }
) => proxy(req, (await ctx.params).path);
