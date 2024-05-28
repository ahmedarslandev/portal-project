import { StateModel, callerIdModel, userModel } from "@/models/models";
import { NextApiRequest, NextApiResponse } from "next";
import jwt, { JwtPayload } from "jsonwebtoken";
import { connectDB } from "@/dbConfig/connectDB";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      await connectDB();
      const { email, callerId } = req.query;
      if (!email || !callerId) {
        return res
          .status(400)
          .json({ message: "Email or CallerId not provided" });
      }

      const userCode = (callerId as string).trim().substring(0, 3);
      const { email: decodedEmail } = jwt.decode(email as string) as JwtPayload;
      const user = await userModel.findOne({ email: decodedEmail });
      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }

      const state = await StateModel.find({
        areaCodes: { $elemMatch: { code: userCode } },
      });
      if (state.length === 0) {
        return res.status(400).json({ message: "State not found" });
      }

      const IDs = await callerIdModel.find({
        state: state[0].stateName,
        owner: user._id,
      });
      if (!IDs || IDs.length === 0) {
        return res.status(400).json({
          message:
            "Provided user does not have the related callerId. Please try another user's API Key to fetch callerId",
        });
      }

      const callerIdsss = IDs[state[0].reqNumber].Number;
      if (state[0].callerIds.length > state[0].reqNumber + 1) {
        state[0].reqNumber += 1;
      } else {
        state[0].reqNumber = 0;
      }

      const id = await callerIdModel.findOne({ Number: callerIdsss });
      if (!id) {
        return res
          .status(400)
          .json({ message: "CallerId from server not found" });
      }

      id.counts += 1;
      await userModel.findOneAndUpdate(
        { "callerIds._id": id._id },
        { $set: { "callerIds.$.counts": id.counts } },
        { new: true }
      );
      await state[0].save();
      await id.save();

      return res.status(200).json({
        callerId: callerIdsss,
        message: "success",
      });
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}
