import { Request, Response } from "express";
import { asyncWrapper } from "../../middlewares";

const createOne = asyncWrapper(async (req: Request, res: Response) => {
  res.send("create Freelancer");
});

const deleteOne = asyncWrapper(async (req: Request, res: Response) => {
  res.send("delete Freelancer");
});

const updateOne = asyncWrapper(async (req: Request, res: Response) => {
  res.send("update Freelancer");
});

const getOne = asyncWrapper(async (req: Request, res: Response) => {
  res.send("get Freelancer");
});

const getAll = asyncWrapper(async (req: Request, res: Response) => {
  res.send("get all Freelancers");
});


export { createOne, deleteOne, updateOne, getOne, getAll };
