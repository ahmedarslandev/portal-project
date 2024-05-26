import { userModel } from "@/models/models";
import { connectDB } from "@/dbConfig/connectDB";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken";
export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { OTP } = await req.json();
    const hashedEmail = req.cookies.get("email")?.value;

    if (!hashedEmail) {
      return NextResponse.json({
        status: 400,
        message: "Email is required",
      });
    }
    const email = jwt.verify(
      hashedEmail as any,
      process.env.JWT_TOKEN_SECRET as any
    ) as JwtPayload;
    // console.log(OTP, email);
    const user = await userModel.find({
      email: email?.email,
      verifyCode: OTP,
    });
    console.log(user);
    if (user.length <= 0) {
      return NextResponse.json({
        status: 400,
        message: "Provided OTP or Email is invalid",
        success: false,
      });
    }

    if (user[0].verifyCodeExpiry > Date.now()) {
      user[0].isVerified = true;
      user[0].verifyCode = "";
      await user[0].save();
      return NextResponse.json({
        status: 200,
        message: "Verified successfully",
        user,
      });
    } else {
      return NextResponse.json({
        status: 400,
        message: "OTP has been Expired",
      });
    }
  } catch (error) {
    return NextResponse.json("provided OTP code is incorrect");
  }
}
