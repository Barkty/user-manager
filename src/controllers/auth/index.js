import passport from "passport";
import LocalStrategy from "passport-local";
import Worker from "../../models/worker.js";
import { comparePassword, removePropertiesFromObject } from "../../utils/index.js";
import { success } from "../../helpers/response.js";
import asyncWrapper from "../../middlewares/async.js";

passport.use(
    new LocalStrategy({ usernameField: "email" }, async (email, password, done) => {
      try {
        const user = await Worker.findOne({ email }).lean();
        if (!user) return done({ message: "User does not exist" });

        const isPasswordCorrect = await comparePassword(password, user.password);
  
        if (!isPasswordCorrect) return done({ message: "Invalid Credentials" });
  
        await Worker.updateOne({ staffId }, { $set: { lastLogin: new Date() } });
  
        let loggedInUser = await Worker.findOne({ email }).populate("currentStation jobTitle department").lean();
  
        loggedInUser = removePropertiesFromObject(loggedInUser, ["password", "token", "tokenExpiresIn"]);
  
        return done(null, loggedInUser);
      } catch (e) {
        return done(e);
      }
    })
  );
  
passport.serializeUser((user, done) => done(null, user._id));

passport.deserializeUser(async (userId, done) => {
    const user = await Worker.findById(userId, "-password").populate("supervisor levelOne levelTwo").lean();
    return done(null, user);
});

export const signIn = (req, res) => success(res, 200, req.user);

export const signOut = asyncWrapper(async (req, res) => {
  req.logOut((err) => {
    if (err) return console.error(err);
  });
  return success(res, 200, req.user);
});
