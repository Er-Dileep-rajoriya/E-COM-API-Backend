import { body, validationResult } from "express-validator";

export default async function signInValidation(req, res, next) {
  const rules = [
    body("email").isEmail().withMessage("Email is Required!"),
    body("password")
      .notEmpty()
      .withMessage("Password should have atleast 4 Characters or Digits."),
  ];

  await Promise.all(rules.map((rule) => rule.run(req)));

  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    return res.status(400).send(validationErrors.array()[0].msg);
  }

  next();
}
