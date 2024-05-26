import { StateModel } from "@/models/models";
import { connectDB } from "@/dbConfig/connectDB";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    await connectDB();
    const { code, StateName } = await req.json();

    let state = await StateModel.findOne({ stateName: StateName });
    if (!state || state == null) {
      state = new StateModel({
        stateName: StateName,
      });
    }
    state?.areaCodes.push({ code: code });
    await state.save();
    return NextResponse.json({
      message: "state added successfully",
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({
      message: "internal Server error",
      status: 500,
    });
  }
}
