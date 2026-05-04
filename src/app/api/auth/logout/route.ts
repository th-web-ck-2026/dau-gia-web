import { cookies } from "next/headers";

import { ResponseCode } from "@/constants";

export async function POST() {
  try {
    const refreshToken = (await cookies()).get("refresh_token")?.value;

    if (refreshToken) {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken }),
      });
    }

    (await cookies()).delete("access_token");
    (await cookies()).delete("refresh_token");
    (await cookies()).set("session_hint", "false", {
      path: "/",
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error("Logout error:", error);
    return Response.json(
      { message: "Internal server error", statusCode: ResponseCode.INTERNAL_SERVER_ERROR },
      { status: ResponseCode.INTERNAL_SERVER_ERROR }
    );
  }
}