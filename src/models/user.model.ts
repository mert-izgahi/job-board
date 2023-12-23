import mongoose from "mongoose";
import bcrypt from "bcrypt";
import config from "config";




const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Name is required"] },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: [true, "Email already exists"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      min: [6, "Password should be at least 6 characters long"],
      select: false,
    },
    role: {
      type: String,
      enum: ["freelancer", "employer", "admin"],
      default: "freelancer",
    },
    photo: { type: String, default: "default.jpg" },
    bio: { type: String, max: [512, "Bio should be less than 512 characters"] },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number],
        default: [0, 0],
        index: "2dsphere",
      },
      formattedAddress: { type: String },
      street: { type: String },
      city: { type: String },
      state: { type: String },
      zipcode: { type: String },
      country: { type: String },
    },

    skills: [
      {
        type: {
          type: String,
          default: "skill",
          enum: ["skill"],
        },
        title: String,
        level: {
          type: String,
          enum: ["beginner", "intermediate", "advanced"],
          default: "beginner",
        },
      },
    ],

    languages: [
      {
        type: {
          type: String,
          default: "language",
          enum: ["language"],
        },
        title: String,
        level: {
          type: String,
          enum: ["beginner", "intermediate", "advanced"],
          default: "beginner",
        },
      },
    ],

    availability: {
      type: {
        type: String,
        default: "availability",
        enum: ["availability"],
      },
      enum: ["full-time", "part-time", "remote"],
    },

    hourlyRate: {
      type: Number,
      default: 0,
    },

    balance: {
      type: Number,
      default: 0,
    },
    // verified: { type: Boolean, default: false },
    // verificationToken: { type: String },
    // resetToken: { type: String },
    // resetTokenExpires: { type: Date },
  },
  {
    timestamps: true,
  }
);



const User = mongoose.model("User", userSchema);
export default User;