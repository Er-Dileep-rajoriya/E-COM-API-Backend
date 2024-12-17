import express from "express";
import UserController from "./user.controller.js";
import signUpValidation from "../../middlewares/signUpValidation.middleware.js";
import signInValidation from "../../middlewares/signInValidation.middleware.js";
const userRouter = express.Router();

const userController = new UserController();

userRouter.post("/signup", signUpValidation, (req, res) => {
  userController.signUpUser(req, res);
});
userRouter.post("/signin", signInValidation, (req, res) => {
  userController.signInUser(req, res);
});

export default userRouter;
