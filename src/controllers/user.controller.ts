import { Request, Response } from "express";
import { _logger } from "../utils/logger";
import { createUser } from "../services/user.services";
import asyncWrapper from "../middleware/asyncWrapper";
import { CreateUserInput } from "../schema/user.schema";
import { omit } from "lodash";
export const register = asyncWrapper(
  async (req: Request<{}, {}, CreateUserInput["body"]>, res: Response) => {
    const user = await createUser(req.body);
    return res.json({
      data: omit(user.toJSON(), "password"),
      message: "User created successfully",
    });
  }
);
