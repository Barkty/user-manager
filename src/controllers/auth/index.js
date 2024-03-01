import passport from "passport";
import LocalStrategy from "passport-local";

passport.use(
    new LocalStrategy({ usernameField: "email" }, async (email, password, done) => {
      try {
        const user = await Worker.findOne({ staffId }).lean();
        if (!user) return done({ message: "User does not exist" });

        const isPasswordCorrect = await comparePassword(password, user.password);
  
        if (!isPasswordCorrect) return done({ message: "Invalid Credentials" });
  
        await Employee.updateOne({ staffId }, { $set: { lastLogin: new Date() } });
  
        let loggedInUser = await Employee.findOne({ staffId }).populate("currentStation jobTitle department").lean();
  
        loggedInUser = removePropertiesFromObject(loggedInUser, ["password", "token", "tokenExpiresIn"]);
  
        return done(null, loggedInUser);
      } catch (e) {
        return done(e);
      }
    })
  );
  
  passport.serializeUser((user, done) => done(null, user._id));
  passport.deserializeUser(async (userId, done) => {
    const user = await Employee.findById(userId, "-password").populate("currentStation jobTitle department").lean();
    return done(null, user);
  });