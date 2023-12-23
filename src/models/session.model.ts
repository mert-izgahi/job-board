import mongoose from "mongoose";
import { UserDocument } from "./user.model";

export interface SessionDocument extends mongoose.Document {
  user: UserDocument["_id"];
  isValid: boolean;
  agent: string;
}

const sessionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User id is required"],
    },
    isValid: {
      type: Boolean,
      default: false,
    },
    agent: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

sessionSchema.set("toJSON", {
  virtuals: true,
});

sessionSchema.set("toObject", {
  virtuals: true,
});

const Session = mongoose.model("Session", sessionSchema);

export default Session;
