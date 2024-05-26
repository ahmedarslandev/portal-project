import { connectDB } from "@/dbConfig/connectDB";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    await cookies().set("token", "");

    return NextResponse.json({
      message: "Successfully logged out",
      status: 200,
    });
  } catch (error) {
    return NextResponse.json("Something went wrong while logout");
  }
}
