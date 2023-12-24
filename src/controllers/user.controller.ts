import { UpdateUserInput } from "./../schema/user.schema";
import { Request, Response } from "express";
import { _logger } from "../utils/logger";
import asyncWrapper from "../middleware/asyncWrapper";
import { omit } from "lodash";
import { findUser, updateUser } from "../services/user.services";

export const getProfile = asyncWrapper(async (req: Request, res: Response) => {
  const user = res.locals.user;
  res.status(200).send({
    data: omit(user, "password"),
    message: "Profile fetched successfully",
  });
});

export const updateProfile = asyncWrapper(
  async (req: Request<{}, {}, UpdateUserInput["body"]>, res: Response) => {
    const query = { _id: res.locals.user._id };
    const userRef = await findUser(query);

    if (!userRef) {
      throw new Error("User not found");
    }
    const update = req.body;
    const user = await updateUser(query, update);
    console.log(user);

    res.status(200).send({
      data: user,
      message: "Profile fetched successfully",
    });
  }
);

export const getUser = asyncWrapper(async (req: Request, res: Response) => {
  const id = req.params.id;
  const user = await findUser({ _id: id });
  res.status(200).send({ data: user, message: "Profile fetched successfully" });
});
