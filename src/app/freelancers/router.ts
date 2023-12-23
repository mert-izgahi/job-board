import { Router } from "express";
import {
  getAll,
  getOne,
  createOne,
  deleteOne,
  updateOne,
} from "./controller";
const router = Router();

router.get("/freelancers", getAll);
router.get("/freelancers/:id", getOne);
router.post("/freelancers", createOne);
router.delete("/freelancers/:id", deleteOne);
router.put("/freelancers/:id", updateOne);

export { router };
