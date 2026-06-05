import { cookies } from "next/headers";

import { ResponseCode } from "@/constants";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const backendUrl = `${process.env.NEXT_PUBLIC_API_URL}/auth/select-role`;

    const accessToken = (await cookies()).get("access_token")?.value;

    const res = await fetch(backendUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: accessToken ? `Bearer ${accessToken}` : "",
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const error = await res.json();
      return Response.json(error, { status: res.status });
    }

    const result = await res.json();
    const { access_token, user } = result.data || {};

    if (!access_token || !user) {
      return Response.json(
        {
          message: "Invalid response from server",
          statusCode: ResponseCode.INTERNAL_SERVER_ERROR,
        },
        { status: ResponseCode.INTERNAL_SERVER_ERROR }
      );
    }

    const isProduction = process.env.NODE_ENV === "production";

    (await cookies()).set("access_token", access_token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: "lax",
      path: "/",
    });

    return Response.json({ success: true, data: { user } });
  } catch (error) {
    console.error("Select role error:", error);
    return Response.json(
      {
        message: "Internal server error",
        statusCode: ResponseCode.INTERNAL_SERVER_ERROR,
      },
      { status: ResponseCode.INTERNAL_SERVER_ERROR }
    );
  }
}
