import { body, validationResult } from "express-validator";

export default async function signUpValidation(req, res, next) {
  const rules = [
    body("name").notEmpty().withMessage("Name is Required!"),
    body("email").isEmail().withMessage("Email is Required!"),
    body("password")
      .notEmpty()
      .withMessage("Password should have atleast 4 Characters or Digits."),
    body("type").notEmpty().withMessage("Type(Seller, Buyer) is Required!"),
  ];

  await Promise.all(rules.map((rule) => rule.run(req)));

  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    return res.status(400).send(validationErrors.array()[0].msg);
  }

  next();
}
