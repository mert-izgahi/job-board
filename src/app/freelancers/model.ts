import mongoose from "mongoose";

const companySchema: mongoose.Schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },

    bio: {
      type: String,
      max: [512, "Description is too long"],
      min: [10, "Description is too short"],
    },

    avatar: {
      type: String,
    },

    jobTitle: {
      type: String,
    },

    status: {
      type: String,
      enum: ["active", "inactive", "blocked", "deleted", "suspended"],
      default: "active",
    },

    accountId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Account",
      required: [true, "Account id is required"],
    },
  },
  { timestamps: true }
);

const Company = mongoose.model("Company", companySchema);
