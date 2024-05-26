import { userModel } from "@/models/models";
import { StateModel } from "@/models/models";
import { NextRequest, NextResponse } from "next/server";
import { states } from "./states";

export async function POST(req: NextRequest) {
  try {
    const { userId } = await req.json();
    const user = await userModel.findOne({ _id: userId });
    if (!user?.isAdmin === true) {
      return NextResponse.json({
        status: 500,
        success: false,
        message: "You are not allowed to add state",
      });
    }

    const s = await StateModel.find();
    if (s.length > 0) {
      return NextResponse.json({
        status: 500,
        success: false,
        message: "States already had looped",
      });
    }

    states.forEach(async (e) => {
      const state = new StateModel({
        stateName: e.stateName,
      });
      e.code.forEach((code) => {
        state.areaCodes.push({ code: code });
      });
      await state.save();
    });

    return NextResponse.json({
      status: 200,
      success: true,
      message: "State added successfully",
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      success: false,
      message: "Internal Server Error",
    });
  }
}
