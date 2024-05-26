import { userModel } from "@/models/models";
import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import { connectDB } from "@/dbConfig/connectDB";

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const token = req.cookies.get("token");

    if (!token) {
      return NextResponse.json({
        success: false,
        message: "Token not found",
        status: 401,
      });
    }
    console.log(token);
    const { id } = jwt.decode(token.value as any) as JwtPayload;

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
