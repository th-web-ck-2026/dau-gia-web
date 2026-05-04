import { cookies } from "next/headers";

import { ResponseCode } from "@/constants";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const error = await res.json();
      return Response.json(error, { status: res.status });
    }

    const data = await res.json();
    const { accessToken, refreshToken } = data;

    if (!accessToken || !refreshToken) {
      return Response.json(
        { message: "Invalid response from server" },
        { status: ResponseCode.INTERNAL_SERVER_ERROR }
      );
    }

    (await cookies()).set("access_token", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
    });

    (await cookies()).set("refresh_token", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error("Login error:", error);
    return Response.json(
      { message: "Internal server error" },
      { status: ResponseCode.INTERNAL_SERVER_ERROR }
    );
  }
}
