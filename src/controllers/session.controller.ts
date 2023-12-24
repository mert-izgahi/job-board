import { Request, Response } from "express";
import asyncWrapper from "../middleware/asyncWrapper";
import {
  createUser,
  createSession,
  deleteSessions,
  findSessions,
  validatePassword,
} from "../services/session.services";
import { CreateSessionInput } from "../schema/session.schema";
import { signJwt } from "../utils/jwt.utils";
import config from "config";
import { CreateUserInput } from "../schema/user.schema";
import { omit } from "lodash";

export const registerUser = asyncWrapper(
  async (req: Request<{}, {}, CreateUserInput["body"]>, res: Response) => {
    const user = await createUser(req.body);
    return res.json({
      data: omit(user.toJSON(), "password"),
      message: "User created successfully",
    });
  }
);

export const createUserSession = asyncWrapper(
  async (req: Request<{}, {}, CreateSessionInput["body"]>, res: Response) => {
    // validate user password
    const user = await validatePassword(req.body);
    if (!user) {
      return res.status(401).send("Invalid email or password");
    }

    // create a session
    const session = await createSession({
      user: user._id,
      agent: req.headers["user-agent"] || "",
      isValid: true,
    });

    // create an access token
    const accessToken = signJwt(
      { ...user, session: session._id },
      { expiresIn: config.get<string>("jwt_EXPIRY") }
    );

    // return access token

    return res
      .status(200)
      .send({ data: accessToken, message: "Session created successfully" });
  }
);

export const getUserSessions = asyncWrapper(
  async (req: Request<{}, {}, CreateSessionInput["body"]>, res: Response) => {
    const user = res.locals.user;
    const query = { user: user._id, isValid: true };
    const sessions = await findSessions(query);
    return res.status(200).send({ data: sessions, message: "Success" });
  }
);

export const deleteUserSessions = asyncWrapper(
  async (req: Request, res: Response) => {
    const query = { user: res.locals.user._id, isValid: true };
    const update = { isValid: false };
    const sessions = await deleteSessions(query, update);
    return res.status(200).send({ data: sessions, message: "Session deleted" });
  }
);

export const deleteOneSession = asyncWrapper(
  async (req: Request, res: Response) => {
    const query = { _id: req.params.sessionId };
    const update = { isValid: false };
    const session = await deleteSessions(query, update);
    return res.status(200).send({ data: session, message: "Session deleted" });
  }
);
