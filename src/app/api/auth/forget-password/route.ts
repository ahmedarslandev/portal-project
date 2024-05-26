import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { userModel } from "@/models/models";
import { sendEmailVerification } from "@/sendEmailVerification/SendEmailVerification";
import { connectDB } from "@/dbConfig/connectDB";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    await connectDB();
    const { email } = await req.json();
    const numbers = "0123456789";
    let OTP = "";
    if (!email) {
      return NextResponse.json({
        message: "Email is required",
        status: 400,
      });
    }
    const user = await userModel.findOne({ email: email });
    console.log(user);
    const username = user?.username;
    if (!user) {
      return NextResponse.json({
        message: "User with provided email not exists",
        status: 400,
      });
    }
    for (let i = 0; i < 6; i++) {
      OTP += numbers[Math.floor(Math.random() * numbers.length)];
    }
    const data = {
      email,
    };
    const hashedEmail = await jwt.sign(
      data,
      process.env.JWT_TOKEN_SECRET as any,
      { expiresIn: 1000 * 120 }
    );

    user.verifyCode = OTP;
    user.verifyCodeExpiry = Date.now() + 1000 * 60;
    await user.save();
    await cookies().set("email", hashedEmail);

    sendEmailVerification({ username, email, OTP });
    return NextResponse.json({
      status: 200,
      message: "Email sent successfully",
      success: true,
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: "Something went wrong",
      success: false,
    });
  }
}
