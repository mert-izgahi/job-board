import { CreateSkillInput, UpdateUserInput } from "./../schema/user.schema";
import { Request, Response } from "express";
import { _logger } from "../utils/logger";
import asyncWrapper from "../middleware/asyncWrapper";
import BadRequestError from "../errors/BadRequestError";
import User, { SkillDocument } from "../models/user.model";

export const getProfile = asyncWrapper(async (req: Request, res: Response) => {
  const user = res.locals.user.payload;
  const profile = await User.findById(user._id).select("-password");

  res.status(200).send({
    data: profile,
    message: "Profile fetched successfully",
  });
});

export const updateProfile = asyncWrapper(
  async (req: Request<{}, {}, UpdateUserInput["body"]>, res: Response) => {
    const user = res.locals.user.payload;
    const query = { _id: user._id };
    const userRef = await User.findOne(query);

    if (!userRef) {
      throw new BadRequestError("User not found");
    }

    const update = req.body;

    const updatedUser = await User.findByIdAndUpdate(query, update);

    res.status(200).send({
      data: updatedUser,
      message: "Profile fetched successfully",
    });
  }
);

export const getUser = asyncWrapper(async (req: Request, res: Response) => {
  const id = req.params.id;
  const user = await User.findOne({ _id: id });
  res.status(200).send({ data: user, message: "Profile fetched successfully" });
});

export const getUsers = asyncWrapper(async (req: Request, res: Response) => {
  const users = await User.find().select("_id name role photo skills location");
  res.status(200).send({ data: users, message: "Users fetched successfully" });
});

export const getSkills = asyncWrapper(async (req: Request, res: Response) => {
  const user = res.locals.user.payload;
  const userDoc = await User.findOne({ _id: user._id }).select("skills");
  const skills = userDoc?.skills || [];
  res
    .status(200)
    .send({ data: skills, message: "Skills fetched successfully" });
});

export const createSkill = asyncWrapper(
  async (req: Request<{}, {}, CreateSkillInput["body"]>, res: Response) => {
    const user = res.locals.user.payload;
    const userDoc = await User.findOne({ _id: user._id });

    if (!userDoc) {
      throw new BadRequestError("User not found");
    }
    const newSkill: SkillDocument = {
      title: req.body.title,
      level: req.body.level,
    };

    userDoc.skills.push(newSkill);
    await userDoc.save();
    const skills = userDoc?.skills || [];
    res.status(200).send({ data: skills, message: "Skill added successfully" });
  }
);

export const updateSkill = asyncWrapper(
  async (
    req: Request<{ skillId: string }, {}, CreateSkillInput["body"]>,
    res: Response
  ) => {
    const user = res.locals.user.payload;
    const userDoc = await User.findOne({ _id: user._id });

    if (!userDoc) {
      throw new BadRequestError("User not found");
    }

    const skillId = req.params.skillId;

    const skillIndex = userDoc.skills.findIndex(
      (skill) => skill._id.toString() === skillId
    );
  }
);

export const getLanguages = asyncWrapper(
  async (req: Request, res: Response) => {
    const user = res.locals.user.payload;
    const userDoc = await User.findOne({ _id: user._id }).select("languages");
    const languages = userDoc?.languages || [];
    res
      .status(200)
      .send({ data: languages, message: "Languages fetched successfully" });
  }
);
