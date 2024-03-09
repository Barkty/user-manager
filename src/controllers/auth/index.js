import Worker from "../../models/worker.js";
import { comparePassword, removePropertiesFromObject } from "../../utils/index.js";
import { error, success } from "../../helpers/response.js";
import asyncWrapper from "../../middlewares/async.js";
import { payload } from "./request.js";
import { BadRequestError, NotFoundError } from "../../utils/error/index.js";

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
    return error(res, e?.statusCode || 500, e)
  }
});

export const signOut = asyncWrapper(async (req, res) => {
  req.logOut((err) => {
    if (err) return console.error(err);
  });
  return success(res, 200, req.user);
});
