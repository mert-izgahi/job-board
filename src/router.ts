import { Express, Request, Response } from "express";
import { register } from "./controllers/user.controller";
import { createUserSchema } from "./schema/user.schema";
import validate from "./middleware/validateResource";
import {
  createUserSession,
  deleteOneSession,
  deleteUserSessions,
  getUserSessions,
} from "./controllers/session.controller";
import { createSessionSchema } from "./schema/session.schema";
import { withAuth } from "./middleware/withAuth";
function router(app: Express) {
  // USER ROUTES
  app.post("/api/register", validate(createUserSchema), register);
  app.post("/api/sessions", validate(createSessionSchema), createUserSession);
  app.get("/api/sessions", withAuth, getUserSessions);
  app.delete("/api/sessions", withAuth, deleteUserSessions);
  app.delete("/api/sessions/:sessionId", withAuth, deleteOneSession);
}

export default router;
