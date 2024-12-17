import { body, validationResult } from "express-validator";

export default async function addProductValidation(req, res, next) {
  const rules = [
    body("name").notEmpty().withMessage("Name is Required!"),
    body("price").isFloat({ gt: 1 }).withMessage("Price is Required!"),
    body("desc").notEmpty().withMessage("Description is Required!"),
    body("category").notEmpty().withMessage("Category is Required!"),
  ];

  await Promise.all(rules.map((rule) => rule.run(req)));

  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    return res.send(validationErrors.array()[0].msg);
  }

  next();
}
