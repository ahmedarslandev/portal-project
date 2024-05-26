import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";
import { userModel } from "@/models/models";
import { connectDB } from "@/dbConfig/connectDB";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    await connectDB();
    const { password, confirmPassword } = await req.json();
    if (password != confirmPassword) {
      return NextResponse.json({
        status: 400,
        message: "Passwords do not match",
        success: false,
      });
    }
    const encryptedEmail: any = await req.cookies.get("email")?.value;
    const { email } = (await jwt.decode(encryptedEmail)) as JwtPayload;
    if (!email) {
      return NextResponse.json({
        status: 400,
        message: "Email not found",
        success: false,
      });
    }
    const user = await userModel.findOne({ email: email });
    if (!user) {
      return NextResponse.json({
        status: 400,
        message: "User not found",
        success: false,
      });
    }
    const encryptedPassword = await bcrypt.hash(password, 10);
    console.log(encryptedPassword);
    user.password = encryptedPassword;
    await user.save();
    req.cookies.delete("email");
    return NextResponse.json({
      status: 200,
      message: "Password changed successfully",
      success: true,
    });
  } catch (error) {
    return NextResponse.json({
      status: 400,
      message: "Internal Server Error",
      success: false,
    });
  }
}
