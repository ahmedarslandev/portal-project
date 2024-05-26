import { userModel } from "@/models/models";
import { callerIdModel } from "@/models/models";
import { StateModel } from "@/models/models";
import { connectDB } from "@/dbConfig/connectDB";
import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { Number } = await req.json();
    const callerId = await callerIdModel.findOne({ Number: Number });
    const userCode = Number.trim().substring(0, 3);
    const token = req.cookies.get("token");

    if (!token) {
      return NextResponse.json({
        success: false,
        message: "Token not found",
        status: 401,
      });
    }
    const { id } = jwt.decode(token.value as any) as JwtPayload;

    const dbUser = await userModel.findById(id);
    if (!dbUser) {
      return NextResponse.json({
        success: false,
        message: "User not found",
        status: 400,
      });
    }
    const OwnerId = dbUser._id;
    const state =
      null ||
      (await StateModel.find({
        areaCodes: { $elemMatch: { code: userCode } },
      }));
    console.log(state);
    if (state === undefined || state === null || state.length === 0) {
      return NextResponse.json({
        success: false,
        message: "State not found",
        status: 400,
      });
    }
    if (callerId) {
      return NextResponse.json({
        success: false,
        message: "Number already exists",
        status: 400,
      });
    }
    const user = await userModel.findOne({ _id: OwnerId });
    if (!user || user == null) {
      return NextResponse.json({
        success: false,
        message: "User not found",
        status: 400,
      });
    }
    const newCallerId = new callerIdModel({
      state: state[0]?.stateName,
      Number,
      owner: OwnerId,
    });
    state[0]?.callerIds.push(newCallerId);
    user.callerIds.push(newCallerId);
    await user.save();
    await state[0]?.save();
    await newCallerId.save();

    return NextResponse.json({
      success: true,
      message: "Number added successfully",
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Internal error occurred",
      status: 500,
    });
  }
}
