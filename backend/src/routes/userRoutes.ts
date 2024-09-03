import express from "express";
import { protect, signin, signup } from "../controllers/authController";
import { getMe, getUser, getUsers } from "../controllers/userController";

const userRouter = express.Router();

userRouter.get("/", getUsers);
userRouter.post("/signup", signup);
userRouter.post("/signin", signin);
// userRouter.patch("/update-password", protect, updatePassword);
// userRouter.patch("/update-me", protect, updateMyUser);
// userRouter.delete("/delete-me", protect, DelMyUser);
userRouter.get("/get-me", protect, getMe, getUser);
// userRouter.post("/forgotpassword", forgotPassword);
// userRouter.patch("/resetpassword/:token", resetPassword);

// userRouter
//    .route("/:id")
//    .patch(protect, restrictTo(Role.Admin), updateUser)
//    .delete(protect, restrictTo(Role.Admin), deleteUser)
//    .get(protect, restrictTo(Role.Admin), getUser);

export default userRouter;
