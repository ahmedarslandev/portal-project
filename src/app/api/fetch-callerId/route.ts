import { StateModel, callerIdModel, userModel } from "@/models/models";
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/dbConfig/connectDB";

export async function GET(req: NextRequest) {
  const url = req.nextUrl;
  const userId = url.searchParams.get("userId");
  const callerId = url.searchParams.get("callerId");
  try {
    connectDB();

    const userCode = callerId?.trim().substring(0, 3);
    const user = await userModel.findOne({ _id: userId });
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
      const IDs = await callerIdModel.find({
        owner: user._id,
      });
      const id = IDs[state[0].reqNumber].Number;
      return new NextResponse(`${id}`);
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
    return new NextResponse(`${callerIdsss}`);
  } catch (error: any) {
    return NextResponse.json({
      message: error.message,
      status: 500,
    });
  }
}
