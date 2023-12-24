import { Express } from "express";
import {
  createUserSession,
  deleteOneSession,
  deleteUserSessions,
  forgetPassword,
  getUserSessions,
  registerUser,
  resetPassword,
} from "./controllers/session.controller";
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
  app.post("/api/register", registerUser);
  app.post("/api/sessions", createUserSession);
  app.put("/api/forgot-password", forgetPassword);
  app.put("/api/reset-password/:token", resetPassword);
  app.get("/api/sessions", withAuth, getUserSessions);
  app.delete("/api/sessions", withAuth, deleteUserSessions);
  app.delete("/api/sessions/:sessionId", withAuth, deleteOneSession);

  // Profile ROUTES
  app.get("/api/profile", withAuth, getProfile);
  app.put("/api/profile", withAuth, updateProfile);
  // Skills ROUTES
  app.get("/api/profile/skills", withAuth, getSkills);
  app.post("/api/profile/skills", withAuth, createSkill);
  app.put("/api/profile/skills/:id", withAuth, updateSkill);
  app.delete("/api/profile/skills/:id", withAuth, deleteSkill);

  // Languages ROUTES
  app.get("/api/profile/languages", withAuth, getLanguages);
  app.post("/api/profile/languages", withAuth, createLanguage);
  app.put("/api/profile/languages/:id", withAuth, updateLanguage);
  app.delete("/api/profile/languages/:id", withAuth, deleteLanguage);

  app.get("/api/users", withAuth, getUsers);
  app.get("/api/users/:id", withAuth, getUser);
}

export default router;
