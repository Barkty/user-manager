const getOrigin = (origin, callback) => {
    const allowedOrigin = !origin || ["localhost", ""].some((value) => origin.includes(value));
    if (allowedOrigin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
};

export const corsOptions = {
    credentials: true,
    origin: getOrigin,
};