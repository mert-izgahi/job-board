import mongoose from "mongoose";
import bcrypt from "bcrypt";
import config from "config";
import crypto from "crypto";

export interface SkillDocument {
  type?: "skill";
  title: string;
  level: string;
  _id?: mongoose.Types.ObjectId;
}

export interface LanguageDocument {
  type?: "language";
  title: string;
  level: string;
  _id?: mongoose.Types.ObjectId;
}

export interface UserDocument extends mongoose.Document {
  name: string;
  email: string;
  password: string;
  role: string;
  photo: string;
  coverPhoto: string;
  companyName: string;
  jobTitle: string;
  bio: string;
  location: {
    type: string;
    coordinates: number[];
    formattedAddress: string;
    street: string;
    city: string;
    state: string;
    country: string;
    zipcode: string;
  };
  languages: LanguageDocument[];
  skills: SkillDocument[];
  socialLinks: {
    twitter?: string;
    facebook?: string;
    linkedin?: string;
    instagram?: string;
    website?: string;
  };
  availability: string;
  hourlyRate: number;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
  generateResetPasswordToken(): string;
  resetPassword(password: string): Promise<UserDocument>;
}

export interface CompanyDocument extends mongoose.Document {
  name: string;
  email: string;
  password: string;
  role: string;
  photo: string;
  coverPhoto: string;
  companyName: string;
  bio: string;
  jobTitle: string;
  location: {
    type: string;
    coordinates: number[];
    formattedAddress: string;
    street: string;
    city: string;
    state: string;
    country: string;
    zipcode: string;
  };

  socialLinks: {
    twitter?: string;
    facebook?: string;
    linkedin?: string;
    instagram?: string;
    website?: string;
  };
}



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
    coverPhoto: { type: String, default: "default.jpg" },
    companyName: { type: String },
    bio: { type: String, max: [512, "Bio should be less than 512 characters"] },
    jobTitle: { type: String },
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

    socialLinks: {
      twitter: String,
      facebook: String,
      linkedin: String,
      instagram: String,
      website: String,
    },

    availability: {
      type: String,
      enum: {
        values: ["full-time", "part-time", "remote", "internship"],
        message: "{VALUE} is not supported. Invalid availability type",
      },
      default: "full-time",
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
    resetToken: { type: String },
    resetTokenExpires: { type: Date },
    passwordChangedAt: { type: Date },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(config.get<number>("saltWorkFactor"));
  console.log(this.password);

  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.comparePassword = async function (
  candidatePassword: string
) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

userSchema.methods.generateResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");
  this.resetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  // 10 minutes
  this.resetTokenExpires = Date.now() + 10 * 60 * 1000;
  return resetToken;
};

userSchema.methods.resetPassword = async function (password: string) {
  this.password = password;
  this.resetToken = undefined;
  this.resetTokenExpires = undefined;
  await this.save();
  return this;
};

const User = mongoose.model<UserDocument>("User", userSchema);
export default User;
