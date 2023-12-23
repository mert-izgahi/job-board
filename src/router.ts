import { Express, Request, Response } from "express";
import { register } from "./controllers/user.controller";
import { createUserSchema } from "./schema/user.schema";
import validate from "./middleware/validateResource";
function router(app: Express) {
  // USER ROUTES
  app.post("/api/register", validate(createUserSchema), register);
}

export default router;
