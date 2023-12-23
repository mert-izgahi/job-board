import { Request, Response } from "express";
import { asyncWrapper } from "../../middlewares";
import Account from "./model";
import BadRequestError from "../../errors/BadRequestError";
import jwt from "jsonwebtoken";

const register = asyncWrapper(async (req: Request, res: Response) => {
  const { fullName, email, password, confirmPassword } = req.body;
  if (password !== confirmPassword) {
    throw new BadRequestError("Passwords do not match");
  }

  const existingAccount = await Account.findOne({ email });

  if (existingAccount) {
    throw new BadRequestError("Account already exists");
  }

  const account = await Account.create({
    fullName,
    email,
    password,
    confirmPassword,
  });

  if (!account) {
    return res.status(400).json({ message: "Failed to register account" });
  }

  const token = jwt.sign({ userId: account._id }, process.env.JWT_SECRET!);

  res
    .status(201)
    .json({ data: token, message: "Account registered successfully" });
});

const login = asyncWrapper(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const account = await Account.findOne({ email });
  if (!account) {
    throw new BadRequestError("Account does not exist");
  }

  const isMatch = await account.comparePassword(password);

  if (!isMatch) {
    throw new BadRequestError("Invalid credentials");
  }

  const token = jwt.sign({ userId: account._id }, process.env.JWT_SECRET!);

  res.status(200).json({ data: token, message: "Login successful" });
});

const logout = asyncWrapper(async (req: Request, res: Response) => {
  res.send("logout Account");
});
export { register, login, logout };
