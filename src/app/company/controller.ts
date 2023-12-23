import { Request, Response } from "express";
import { asyncWrapper } from "../../middlewares";

const createOne = asyncWrapper(async (req: Request, res: Response) => {
  res.send("create Company");
});

const deleteOne = asyncWrapper(async (req: Request, res: Response) => {
  res.send("delete Company");
});

const updateOne = asyncWrapper(async (req: Request, res: Response) => {
  res.send("update Company");
});

const getOne = asyncWrapper(async (req: Request, res: Response) => {
  res.send("get Company");
});

const getAll = asyncWrapper(async (req: Request, res: Response) => {
  res.send("get all Company");
});

const getStats = asyncWrapper(async (req: Request, res: Response) => {
  res.send("get stats Company");
});

export { createOne, deleteOne, updateOne, getOne, getAll, getStats };
