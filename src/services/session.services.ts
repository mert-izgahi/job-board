import { FilterQuery, SchemaDefinition, UpdateQuery } from "mongoose";
import Session, { SessionDocument } from "../models/session.model";
import User, { UserDocument } from "../models/user.model";
import { get, omit } from "lodash";

export async function createUser(
  input: SchemaDefinition<
    Omit<UserDocument, "createdAt" | "updatedAt" | "comparePassword">
  >
) {
  try {
    const user = await User.create(input);
    return user;
  } catch (e: any) {
    throw new Error(e);
  }
}

export const createSession = async (
  input: SchemaDefinition<
    Omit<SessionDocument, "_id" | "createdAt" | "updatedAt">
  >
) => {
  try {
    const session = await Session.create(input);
    return session.toJSON();
  } catch (e: any) {
    throw new Error(e);
  }
};

export async function validatePassword({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  try {
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return false;
    }

    const isValid = await user.comparePassword(password);

    if (!isValid) {
      return false;
    }

    return omit(user.toJSON(), "password");
  } catch (e: any) {
    throw new Error(e);
  }
}

export async function findSessions(query: FilterQuery<SessionDocument>) {
  return Session.find(query).lean();
}

export async function deleteSessions(
  query: FilterQuery<SessionDocument>,
  update: UpdateQuery<SessionDocument>
) {
  return await Session.updateMany(query, update);
}

export async function deleteOneSession(
  query: FilterQuery<SessionDocument>,
  update: UpdateQuery<SessionDocument>
) {
  return await Session.deleteOne(query, update);
}
