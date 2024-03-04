import passport from "passport";
import jwt from 'jsonwebtoken'
import Joi from "joi";
import { configDotenv } from "dotenv";
import { error } from "../../helpers/response.js";

configDotenv()

const { JWT_SECRET } = process.env

export const payload = (user) => {
    const token = jwt.sign({ _id: user._id, email: user.email, firstName: user.firstName}, JWT_SECRET, {
      expiresIn: 1 * 60 * 60 * 1000,
      issuer: "Nomar Technologies",
      audience: "https://nomar.ng"
    });

    delete user.password
    delete user.token;
    delete user.tokenExpiresIn;

    return { user, token };
};

export const validateUsersAuthRequest = (req, res, next) =>
  passport.authenticate("local", async (err, user) => {
    if (err) return error(res, 401, err.message || err);
    return req.logIn(user, async (_error) => {
      if (_error) {
        return next(_error);
      }
      return next();
    });
  })(req, res, next);

export const loginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required()
});