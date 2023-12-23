import { Router } from "express";
import {
  getAll,
  getOne,
  getStats,
  createOne,
  deleteOne,
  updateOne,
} from "./controller";
const router = Router();

router.get("/companies", getAll);
router.get("/companies/state", getStats);
router.get("/companies/:id", getOne);
router.post("/companies", createOne);
router.delete("/companies/:id", deleteOne);
router.put("/companies/:id", updateOne);

export { router };
