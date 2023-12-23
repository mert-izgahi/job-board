import { SchemaDefinition } from "mongoose";
import User, { UserDocument } from "../models/user.model";

export async function createUser(
  input: SchemaDefinition<Omit<UserDocument, "createdAt" | "updatedAt" | "comparePassword">>
) {
  try {
    const user = await User.create(input);
    return user
  } catch (e: any) {
    throw new Error(e);
  }
}
