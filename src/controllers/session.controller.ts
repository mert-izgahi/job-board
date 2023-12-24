import { Request, Response } from "express";
import asyncWrapper from "../middleware/asyncWrapper";
import { signJwt } from "../utils/jwt.utils";
import config from "config";
import { omit } from "lodash";
import User from "../models/user.model";
import BadRequestError from "../errors/BadRequestError";
import AuthenticatedError from "../errors/AuthenticatedError";
import Session from "../models/session.model";

export const registerUser = asyncWrapper(
  async (
    req: Request<
      {},
      {},
      { email: string; password: string; name: string; role: string }
    >,
    res: Response
  ) => {
    const existsUser = await User.findOne({ email: req.body.email });

    if (existsUser) {
      throw new BadRequestError("User already exists");
    }

    // create user
    const user = await User.create(req.body);
    return res.json({
      data: omit(user.toJSON(), "password"),
      message: "User created successfully",
    });
  }
);

export const createUserSession = asyncWrapper(
  async (
    req: Request<{}, {}, { email: string; password: string }>,
    res: Response
  ) => {
    // check if user exists
    const user = await User.findOne({ email: req.body.email }).select(
      "+password"
    );
    if (!user) {
      throw new AuthenticatedError("Email not registered");
    }

    // validate user password

    const isValid = await user.comparePassword(req.body.password);

    if (!isValid) {
      throw new AuthenticatedError("Invalid password");
    }

    // create a session
    const session = await Session.create({
      user: user._id,
      agent: req.headers["user-agent"] || "",
      isValid: true,
    });

    // create an access token
    const payload = omit(user.toJSON(), "password");
    const accessToken = signJwt(
      { payload, session: session._id },
      { expiresIn: config.get<string>("jwt_EXPIRY") }
    );

    // return access token
    return res
      .status(200)
      .send({ data: accessToken, message: "Session created successfully" });
  }
);

export const getUserSessions = asyncWrapper(
  async (req: Request, res: Response) => {
    const user = res.locals.user.payload;
    const query = { user: user._id, isValid: true };
    const sessions = await Session.find(query).lean();
    return res.status(200).send({ data: sessions, message: "Success" });
  }
);

export const deleteUserSessions = asyncWrapper(
  async (req: Request, res: Response) => {
    const user = res.locals.user.payload;
    const query = { user: user._id, isValid: true };
    const update = { isValid: false };
    const sessions = await Session.updateMany(query, update);
    return res.status(200).send({ data: sessions, message: "Session deleted" });
  }
);

export const deleteOneSession = asyncWrapper(
  async (req: Request, res: Response) => {
    const query = { _id: req.params.sessionId };
    const update = { isValid: false };
    const session = await Session.updateOne(query, update);
    return res.status(200).send({ data: session, message: "Session deleted" });
  }
);

export const forgetPassword = asyncWrapper(
  async (req: Request<{}, {}, { email: string }>, res: Response) => {
    // const session = await Session.updateOne(query, update);
    res.status(200).send({ data: "Forget password", message: "Success" });
  }
);

export const resetPassword = asyncWrapper(
  async (req: Request, res: Response) => {
    res.status(200).send({ data: "Reset password", message: "Success" });
  }
);
