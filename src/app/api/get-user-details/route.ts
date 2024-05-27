import { userModel } from "@/models/models";
import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import { connectDB } from "@/dbConfig/connectDB";
import { cookies } from "next/headers";

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    // const cookies = cookie.parse(req as any ? req.headers.cookie  || "" : document.cookie)
    const token = cookies().get("token");
    return NextResponse.json({
      token,
    });
    if (!token) {
      return NextResponse.json({
        success: false,
        message: "Token not found",
        status: 401,
      });
    }
    const { id } = jwt.decode(token as any) as JwtPayload;

    const user = await userModel.findById(id);
    if (!user) {
      return NextResponse.json({
        success: false,
        message: "Token is invalid",
        status: 404,
      });
    }
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Internal error occurred",
      status: 500,
    });
  }
}
