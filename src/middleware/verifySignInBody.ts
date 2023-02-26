import { RequestHandler } from "express";
import { userSignInSchema } from "../validators/users.js";
import _ from "underscore";

const verifySignInBody: RequestHandler = (req, res, next) => {
  const body = _.pick(req.body, "email", "password");
  const { error } = userSignInSchema.validate(body);
  if (error) {
    return res.status(400).json({
      message: "Validation Failed!",
      errors: error.details.map((ed) => ed.message),
    });
  }
  next();
};

export { verifySignInBody };
