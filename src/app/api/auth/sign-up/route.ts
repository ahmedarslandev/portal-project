import { connectDB } from "@/dbConfig/connectDB";
import bcrypt from "bcryptjs";
import { userModel } from "@/models/models";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { sendEmailVerification } from "@/sendEmailVerification/SendEmailVerification";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    await connectDB();
    const { username, email } = await req.json();
    const numbers = "123456789";
    let OTP = "";
    for (let i = 0; i < 6; i++) {
      OTP += numbers[Math.floor(Math.random() * numbers.length)];
    }

    const user = await userModel.findOne({ email: email });
    console.log(user);
    if (user?.isVerified == true) {
      return NextResponse.json({
        message: "User with provided email already exist",
        status: 400,
      });
    }
    console.log(req.url);
    const encryptedEmail = jwt.sign(
      { email: email },
      process.env.JWT_TOKEN_SECRET as any
    );
    const newUser = new userModel({
      username,
      email,
      verifyCode: OTP,
      verifyCodeExpiry: Date.now() + 1000 * 60,
      callerIds: [],
      isAdmin: true,
      apiKey: `http://${req.nextUrl.host}/api/fetch-callerId?email=${encryptedEmail}&callerId=`,
    });
    await newUser.save();
    setTimeout(async () => {
      const user = await userModel.findOne({ email: email });
      if (user?.isVerified == false) {
        await userModel.deleteOne({ email: email });
      }
    }, 1000 * 60 * 10);
    sendEmailVerification({ username, email, OTP });
    const data = {
      email,
      username,
    };
    const hashedEmail = await jwt.sign(
      data,
      process.env.JWT_TOKEN_SECRET as any,
      { expiresIn: 1000 * 120 }
    );
    await cookies().set("email", hashedEmail);

    return NextResponse.json({
      status: 200,
      success: true,
      message: "user saved successfully",
      newUser,
    });
  } catch (error) {
    console.log("SignUp route");
    return NextResponse.json(error);
  }
}
