import express from "express";
import {
  createProfile,
  getProfile,
  getProfiles,
  removeProfile,
  updateProfile,
} from "../controllers/profileController";
import { protect } from "../controllers/authController";

const profilesRouter = express.Router();

profilesRouter.get("/", getProfiles);
profilesRouter.get("/:id", getProfile);
profilesRouter.post("/", protect, createProfile);
profilesRouter.patch("/:id", protect, updateProfile);
profilesRouter.delete("/:id", protect, removeProfile);

export default profilesRouter;
