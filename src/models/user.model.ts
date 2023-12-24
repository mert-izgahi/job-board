import mongoose from "mongoose";
import bcrypt from "bcrypt";
import config from "config";

export interface SkillDocument {
  title: string;
  level: string;
}

export interface LanguageDocument {
  name: string;
  level: number;
}

export interface UserDocument extends mongoose.Document {
  name: string;
  email: string;
  password: string;
  role: string;
  photo: string;
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
  availability: string;
  hourlyRate: number;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
  generateToken(): string;
  //   generateResetPasswordToken(): string;
  //   generateVerificationToken(): string;
  //   generatePasswordResetToken(): string;
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
    // resetToken: { type: String },
    // resetTokenExpires: { type: Date },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(config.get<number>("saltWorkFactor"));
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.comparePassword = async function (
  candidatePassword: string
) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

const User = mongoose.model<UserDocument>("User", userSchema);
export default User;
