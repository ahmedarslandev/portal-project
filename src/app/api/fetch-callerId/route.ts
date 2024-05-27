import { StateModel, callerIdModel, userModel } from "@/models/models";
import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import { connectDB } from "@/dbConfig/connectDB";

export async function GET(req: NextRequest) {
  try {
    connectDB();
    const url = new URL(req.url);
    const values = new URLSearchParams(url.search as any);
    return NextResponse.json({
      url: url,
    });
    const encryptedEmail = values.get("email");
    console.log("run 1");
    const callerId = values.get("callerId");
    console.log("run 1");
    const userCode = callerId?.trim().substring(0, 3);
    console.log("run 1");
    const { email } = jwt.decode(encryptedEmail as any) as JwtPayload;
    console.log("run 1");
    const user = await userModel.findOne({ email: email });
    console.log("run 1");
    if (!user) {
      return NextResponse.json({
        message: "user not found",
        status: 400,
      });
    }
    if (!callerId) {
      return NextResponse.json({
        message: "callerId not found",
        status: 400,
      });
    }

    const state = await StateModel.find({
      areaCodes: { $elemMatch: { code: userCode } },
    });
    if (state.length <= 0) {
      return NextResponse.json({
        success: false,
        message: "State not found",
        status: 400,
      });
    }

    const IDs = await callerIdModel.find({
      state: state[0].stateName,
      owner: user._id,
    });

    if (!IDs || IDs.length <= 0) {
      return NextResponse.json({
        success: false,
        message:
          "Provided user does have the related callerId , Please try another user's API Key to fetch callerId",
        status: 400,
      });
    }

    const callerIdsss = IDs[state[0].reqNumber].Number;
    console.log(callerIdsss);
    if (state[0].callerIds.length > state[0].reqNumber + 1) {
      state[0].reqNumber = state[0].reqNumber + 1;
    } else {
      state[0].reqNumber = 0;
    }
    const id = await callerIdModel.findOne({ Number: callerIdsss });
    if (!id) {
      return NextResponse.json({
        success: false,
        message: "callerId from server not found",
        status: 400,
      });
    }
    id.counts = id.counts + 1;
    await userModel.findOneAndUpdate(
      { "callerIds._id": id._id },
      {
        $set: {
          "callerIds.$.counts": id.counts + 1,
        },
      },
      {
        new: true,
      }
    );
    await state[0].save();
    await id.save();
    return NextResponse.json({
      callerId: callerIdsss,
      message: "success",
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({
      message: "internal error",
      status: 500,
    });
  }
}
