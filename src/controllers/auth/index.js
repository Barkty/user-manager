import Worker from "../../models/worker.js";
import { comparePassword, removePropertiesFromObject } from "../../utils/index.js";
import { error, success } from "../../helpers/response.js";
import asyncWrapper from "../../middlewares/async.js";
import { payload } from "./request.js";
import { BadRequestError, NotFoundError } from "../../utils/error/index.js";

// passport.use(
//     new LocalStrategy({ usernameField: "email" }, async (email, password, done) => {
//       try {
//         const user = await Worker.findOne({ email }).lean();

//         if (!user) return done({ message: "User does not exist" });

//         const isPasswordCorrect = await comparePassword(password, user.password);
  
//         if (!isPasswordCorrect) return done({ message: "Invalid Credentials" });
  
//         await Worker.updateOne({ email }, { $set: { lastLogin: new Date() } });
  
//         let loggedInUser = await Worker.findOne({ email }).populate("supervisor levelOne levelTwo").lean();
  
//         loggedInUser = removePropertiesFromObject(loggedInUser, ["password"]);
//         loggedInUser = payload(loggedInUser)

//         return done(null, loggedInUser);

//       } catch (e) {
//         return done(e);
//       }
//     })
//   );
  
// passport.serializeUser(({ user }, done) => done(null, user._id));

// passport.deserializeUser(async (userId, done) => {
//     const user = await Worker.findById(userId, "-password").populate("supervisor levelOne levelTwo").lean();
//     return done(null, user);
// });

// export const passportSession = passport.session();

export const signIn = asyncWrapper(async (req, res) => {
  try {
    const { body: { email, password } } = req

    const user = await Worker.findOne({ email }).lean();

    if (!user) throw new NotFoundError("User does not exist");

    const isPasswordCorrect = await comparePassword(password, user.password);

    if (!isPasswordCorrect) throw new BadRequestError("Invalid Credentials");

    await Worker.updateOne({ email }, { $set: { lastLogin: new Date() } });

    let loggedInUser = await Worker.findOne({ email }).populate("supervisor levelOne levelTwo").lean();

    loggedInUser = removePropertiesFromObject(loggedInUser, ["password"]);

    loggedInUser = payload(loggedInUser)

    return success(res, 200, loggedInUser)

  } catch (e) {
    console.log('ERR:: ', e)
    return error(res, e?.statusCode || 500, e)
  }
});

export const signOut = asyncWrapper(async (req, res) => {
  req.logOut((err) => {
    if (err) return console.error(err);
  });
  return success(res, 200, req.user);
});
