const AppError = require("../errors/AppError")
const { verifyToken } = require("../utils/jwt")

const authMiddleware = (req,res,next)=>{
    try {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) {
      throw new AppError(401, "Authentication required");
    }

    const token = authHeader.split(" ")[1];

    const decoded = verifyToken(token);

    req.user = decoded;

    next();
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return next(new AppError(401, "Invalid token"));
    }

    if (error.name === "TokenExpiredError") {
      return next(new AppError(401, "Token expired"));
    }

    next(error);
  }
}

module.exports = authMiddleware