import { error } from "../helpers/response";
import { CustomAPIError } from "../utils/customError";

// eslint-disable-next-line no-unused-vars
const errorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof CustomAPIError) {
    return error(res, 500, err.message);
  }
  if (err.name === "ValidationError") {
    let msg = "";
    Object.keys(err.errors).forEach((key) => {
      msg += `${err.errors[key].message}.`;
    });

    return error(res, 400, msg);
  }
  if (err.name === "TokenExpiredError") {
    return error(res, 401, "Token expired");
  }
  // eslint-disable-next-line no-console
  console.log(err);
  return error(res, 500, "Network Error");
};

export default errorHandlerMiddleware;
