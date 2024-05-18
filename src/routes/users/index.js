import express from "express";
import {
  UpdateUser,
  createUser,
  deleteUser,
  getAllUsers,
  getUser,
  userLogin,
} from "../../controllers/users/index.js";
export const userRouter = express.Router();

userRouter.post("/signup", createUser);
userRouter.post("/login", userLogin);
userRouter.get("/", getAllUsers);
userRouter.get("/:id", getUser);
userRouter.put("/:id", UpdateUser);
userRouter.delete("/:id", deleteUser);
