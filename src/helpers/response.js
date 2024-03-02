/**
 *
 */
const error = (res, code, err, data) => {
    let message = err.message || err;
    if (code === 500) {
        message = 'Something went wrong. Please try again later.'
    }
    return res.status(code).json({
        success: 0,
        message: message.includes("E11000") ? "Duplicate Error: Record Exists" : message,
        data
    });
};

const success = (res, code, data) => res.status(code).send({
        success: 1,
        message: "Successful",
        data
    });

export { error, success };
