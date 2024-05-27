import { connectDB } from "@/dbConfig/connectDB";
import bcrypt from "bcryptjs";
import { userModel } from "@/models/models";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { email, password } = await req.json();
    if (!email && !password) {
      return NextResponse.json({
        message: "Email and password are required",
        status: 400,
      });
    }
    const user = await userModel.findOne({ email: email });

    if (!user) {
      return NextResponse.json({
        message: "User not found",
        status: 400,
      });
    }
    if (user.isVerified == false) {
      return NextResponse.json({
        success: false,
        message: "User not verified",
        status: 400,
      });
    }

    console.log(password, user);
    const isMatch = await bcrypt.compare(password, user.password);
    cookies().delete("email");
    if (!isMatch) {
      return NextResponse.json({
        message: "Passwords do not match",
        status: 400,
      });
    }

    const data = {
      id: user._id,
    };
    const token = jwt.sign(data, process.env.JWT_TOKEN_SECRET as any, {
      expiresIn: "1d",
    });
    await cookies().set("token", token);

    return NextResponse.json({
      message: "User logged in successfully",
      status: 200,
      token: token,
    });
  } catch (error) {
    return NextResponse.json("Something went wrong");
  }
}
