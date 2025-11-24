export const errorHandler = (err, req, res, next) => {
    console.error("Error:", err.message);

    const statusCode = err.statusCode || 500;

    return res.status(statusCode).json({
        success: false,
        message: err.message || "Internal Server Error",
    });
};