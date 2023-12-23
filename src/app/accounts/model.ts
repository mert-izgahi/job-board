import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const accountSchema: mongoose.Schema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    trim: true,
    lowercase: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },

  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password must be at least 6 characters"],
  },

  confirmPassword: {
    type: String,
    required: [true, "Confirm password is required"],
  },

  role: {
    type: String,
    enum: ["admin", "freelancer", "employee"],
    default: "freelancer",
  },
});

accountSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password, salt);
    this.confirmPassword = bcrypt.hashSync(this.confirmPassword, salt);
  }
  next();
});

accountSchema.methods.comparePassword = async function (
  candidatePassword: string
) {
  
  return await bcrypt.compare(candidatePassword, this.password);
};

accountSchema.set("toJSON", {
  transform: (doc, ret) => {
    delete ret.password;
    delete ret.confirmPassword;
    return ret;
  },
  virtuals: true,
});

accountSchema.set("toObject", {
  transform: (doc, ret) => {
    delete ret.password;
    delete ret.confirmPassword;
    return ret;
  },
  virtuals: true,
});

const Account = mongoose.model("Account", accountSchema);

export default Account;
