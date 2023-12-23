import { Router } from "express";
import { login, logout, register } from "./controller";
const router = Router();

router.post("/accounts/register", register);
router.post("/accounts/login", login);
router.post("/accounts/logout", logout);

export { router };
