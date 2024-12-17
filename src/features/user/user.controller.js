import ApplicationError from "../../error-handler/applicationError.js";
import UserRepository from "./user.repository.js";
import UserModel from "./user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export default class UserController {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async signUpUser(req, res) {
    const { name, email, password, type } = req.body;

    try {
      const hashedPassword = await bcrypt.hash(password, 12);

      let newUser = new UserModel(name, email, hashedPassword, type);
      // inserting into database
      await this.userRepository.signUp(newUser);

      console.log("SignUp Success..");
      return res.status(201).send(newUser);
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wrong!", 500);
    }
  }

  async signInUser(req, res) {
    try {
      const user = await this.userRepository.findByEmail(req.body.email);

      if (!user) {
        return res.status(400).send("Incorrect Credentials!");
      }

      // use bcrypt to compare passwords
      const result = await bcrypt.compare(req.body.password, user.password);

      if (!result) {
        return res.status(400).send("Incorrect Credentials!");
      }

      const token = jwt.sign(
        {
          userId: user._id,
          email: user.email,
        },
        process.env.JWT_SECRET_KEY,
        {
          expiresIn: "1h",
        }
      );

      console.log("Login Success.");
      return res.status(200).send(token);
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wrong!", 500);
    }
  }
}
