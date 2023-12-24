import { Express } from "express";
import { createSkillSchema, createUserSchema } from "./schema/user.schema";
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
import {
  createSkill,
  getLanguages,
  getProfile,
  getSkills,
  getUser,
  getUsers,
  updateProfile,
} from "./controllers/user.controller";
function router(app: Express) {
  // Session ROUTES
  app.post("/api/register", validate(createUserSchema), registerUser);
  app.post("/api/sessions", validate(createSessionSchema), createUserSession);
  app.get("/api/sessions", withAuth, getUserSessions);
  app.delete("/api/sessions", withAuth, deleteUserSessions);
  app.delete("/api/sessions/:sessionId", withAuth, deleteOneSession);

  // User ROUTES
  app.get("/api/profile", withAuth, getProfile);
  app.get("/api/profile/skills", withAuth, getSkills);
  app.post("/api/profile/skills", withAuth,validate(createSkillSchema), createSkill);
  app.get("/api/profile/languages", withAuth, getLanguages);
  app.put("/api/profile", withAuth, updateProfile);
  app.get("/api/users", withAuth, getUsers);
  app.get("/api/users/:id", withAuth, getUser);
}

export default router;
