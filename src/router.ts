import { Express, Request, Response } from "express";
import { createUserSchema } from "./schema/user.schema";
import validate from "./middleware/validateResource";
import {
  createUserSession,
  deleteOneSession,
  deleteUserSessions,
  getUserSessions,
  registerUser,
} from "./controllers/session.controller";
import { createSessionSchema } from "./schema/session.schema";
import { withAuth } from "./middleware/withAuth";
import { getProfile, getUser, updateProfile } from "./controllers/user.controller";
function router(app: Express) {
  // Session ROUTES
  app.post("/api/register", validate(createUserSchema), registerUser);
  app.post("/api/sessions", validate(createSessionSchema), createUserSession);
  app.get("/api/sessions", withAuth, getUserSessions);
  app.delete("/api/sessions", withAuth, deleteUserSessions);
  app.delete("/api/sessions/:sessionId", withAuth, deleteOneSession);

  // User ROUTES
  app.get("/api/profile", withAuth, getProfile);
  app.patch("/api/profile", withAuth, updateProfile);
  app.get("/api/users/:id", withAuth, getUser);
}

export default router;
