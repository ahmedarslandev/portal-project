import mongoose, { Schema, Document, ObjectId } from "mongoose";

export interface User extends Document {
  _id: string;
  username: string;
  email: string;
  password: string;
  verifyCode: string;
  verifyCodeExpiry: Date;
  callerIds: [];
  isVerified: boolean;
  isAdmin: boolean;
  apiKey: string;
}
export interface callerId extends Document {
  state: string;
  owner: ObjectId;
  counts: number;
  Number: string;
  isAvailable: boolean;
}

export interface State extends Document {
  stateName: string;
  areaCodes: [];
  callerIds: [];
  reqNumber: number;
}

const CallerSchema: Schema<callerId> = new Schema({
  state: {
    type: String,
    required: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  counts: {
    type: Number,
    default: 0,
  },
  Number: {
    type: String,
    required: true,
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
});

const userSchema: Schema<User> = new Schema({
  username: {
    type: String,
    required: [true, "username is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    match: [/.+\@.+\..+/, "Please enter a valid email"],
  },
  password: {
    type: String,
  },
  verifyCode: {
    type: String,
  },
  verifyCodeExpiry: {
    type: Date,
    required: [true, "Token has been expired"],
  },
  callerIds: [CallerSchema],
  isAdmin: {
    type: Boolean,
    default: false,
  },
  apiKey: {
    type: String,
    default: "",
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
});

const StateSchema: Schema<State> = new Schema({
  stateName: {
    type: String,
    required: true,
  },
  areaCodes: [
    {
      code: String,
    },
  ],
  callerIds: [CallerSchema],
  reqNumber: {
    type: Number,
    default: 0,
  },
});

const StateModel =
  mongoose.models.StateInfos ||
  mongoose.model<State>("StateInfos", StateSchema);
const callerIdModel =
  mongoose.models.CallerIds ||
  mongoose.model<callerId>("CallerIds", CallerSchema);
const userModel =
  mongoose.models.User || mongoose.model<User>("User", userSchema);

export { userModel, callerIdModel, StateModel };
