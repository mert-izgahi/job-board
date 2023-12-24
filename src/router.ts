import { Express } from "express";
import {
  createLanguageSchema,
  createSkillSchema,
  createUserSchema,
} from "./schema/user.schema";
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
  createLanguage,
  createSkill,
  deleteLanguage,
  deleteSkill,
  getLanguages,
  getProfile,
  getSkills,
  getUser,
  getUsers,
  updateLanguage,
  updateProfile,
  updateSkill,
} from "./controllers/user.controller";
function router(app: Express) {
  // Session ROUTES
  app.post("/api/register", validate(createUserSchema), registerUser);
  app.post("/api/sessions", validate(createSessionSchema), createUserSession);
  app.get("/api/sessions", withAuth, getUserSessions);
  app.delete("/api/sessions", withAuth, deleteUserSessions);
  app.delete("/api/sessions/:sessionId", withAuth, deleteOneSession);

  // Profile ROUTES
  app.get("/api/profile", withAuth, getProfile);
  app.put("/api/profile", withAuth, updateProfile);
  // Skills ROUTES
  app.get("/api/profile/skills", withAuth, getSkills);
  app.post(
    "/api/profile/skills",
    withAuth,
    validate(createSkillSchema),
    createSkill
  );
  app.put(
    "/api/profile/skills/:id",
    withAuth,
    validate(createSkillSchema),
    updateSkill
  );
  app.delete("/api/profile/skills/:id", withAuth, deleteSkill);

  // Languages ROUTES
  app.get("/api/profile/languages", withAuth, getLanguages);
  app.post(
    "/api/profile/languages",
    withAuth,
    validate(createLanguageSchema),
    createLanguage
  );
  app.put(
    "/api/profile/languages/:id",
    withAuth,
    validate(createLanguageSchema),
    updateLanguage
  );
  app.delete("/api/profile/languages/:id", withAuth, deleteLanguage);

  app.get("/api/users", withAuth, getUsers);
  app.get("/api/users/:id", withAuth, getUser);
}

export default router;
