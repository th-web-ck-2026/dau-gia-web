import { cookies } from "next/headers";

import { ResponseCode } from "@/constants";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

async function proxy(req: Request, path: string[]) {
  try {
    const accessToken = (await cookies()).get("access_token")?.value;

    let res = await fetch(`${API_URL}/${path.join("/")}`, {
      method: req.method,
      headers: {
        Authorization: accessToken ? `Bearer ${accessToken}` : "",
        "Content-Type": "application/json",
      },
      body: req.method !== "GET" ? await req.text() : undefined,
    });

    if (res.status === ResponseCode.UNAUTHORIZED) {
      const refreshToken = (await cookies()).get("refresh_token")?.value;

      if (!refreshToken) {
        return Response.json(
          { message: "Unauthorized" },
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
          { message: "Session expired" },
          { status: ResponseCode.UNAUTHORIZED }
        );
      }

      const refreshData = await refreshRes.json();
      const { accessToken: newToken, refreshToken: newRefresh } = refreshData;

      if (!newToken || !newRefresh) {
        return Response.json(
          { message: "Invalid refresh response" },
          { status: ResponseCode.INTERNAL_SERVER_ERROR }
        );
      }

      (await cookies()).set("access_token", newToken, {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        path: "/",
      });

      (await cookies()).set("refresh_token", newRefresh, {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        path: "/",
      });

      res = await fetch(`${API_URL}/${path.join("/")}`, {
        method: req.method,
        headers: {
          Authorization: `Bearer ${newToken}`,
          "Content-Type": "application/json",
        },
        body: req.method !== "GET" ? await req.text() : undefined,
      });
    }

    return res;
  } catch (error) {
    console.error("Proxy error:", error);
    return Response.json(
      { message: "Internal server error" },
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
