import passport from "passport";
import { error } from "../../helpers/response.js";

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