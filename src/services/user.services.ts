import { FilterQuery, UpdateQuery } from "mongoose";
import User, { UserDocument } from "../models/user.model";

export async function findUser(query: FilterQuery<UserDocument>) {
  try {
    const user = await User.findOne(query).lean();
    return user;
  } catch (e: any) {
    throw new Error(e);
  }
}

export async function updateUser(
  query: FilterQuery<UserDocument>,
  update: UpdateQuery<UserDocument>
) {
  try {
    const user = await User.updateOne(query, update);
    return user;
  } catch (e: any) {
    throw new Error(e);
  }
}

export async function deleteUser(
  query: FilterQuery<UserDocument>,
  update: UpdateQuery<UserDocument>
) {
  try {
    const user = await User.updateOne(query, update);
    return user;
  } catch (e: any) {
    throw new Error(e);
  }
}
