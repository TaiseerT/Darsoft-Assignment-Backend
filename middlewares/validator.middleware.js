import { check, validationResult } from "express-validator";

export const registerUserValidator = [
  check("full_name").trim().not().isEmpty().withMessage("Name is missing"),
  check("email").isEmail().withMessage("Invalid email"),
  check("password")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Password in missing")
    .isLength({ min: 8, max: 20 })
    .withMessage("Password must be 8 to 20 characters long"),
];

export const createAddressValidator = [
  check("name").trim().not().isEmpty().withMessage("Address name is missing"),
  check("city").trim().not().isEmpty().withMessage("City is missing"),
  check("street").trim().not().isEmpty().withMessage("Street is missing"),
  check("location").trim().not().isEmpty().withMessage("Location is missing"),
];

export const createNewsValidator = [
  check("title").trim().not().isEmpty().withMessage("News title is missing"),
  check("description")
    .trim()
    .not()
    .isEmpty()
    .withMessage("News description is missing"),
];

export const loginValidator = [
  check("email").isEmail().withMessage("Email is invalid"),
  check("password")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Password is missing")
    .isLength({ min: 8, max: 20 })
    .withMessage("Password must be 8 to 20 characters long"),
];

export const validate = (req, res, next) => {
  const error = validationResult(req).array();
  if (error.length) {
    return res.status(400).json({ error: error[0].msg });
  }

  next();
};
