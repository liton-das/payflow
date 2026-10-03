const AppError = require("../errors/AppError")

const roleMiddleware = (...allowRoles)=>{
   return (req, res, next) => {
    console.log("Allowed roles:", allowRoles);
        console.log("User from JWT:", req.user);
        if (!req.user) {
            return next(
                new AppError(401, "Authentication required!")
            );
        }

        if (!allowRoles.includes(req.user.role)) {
            return next(
                new AppError(403, "Access denied")
            );
        }

        next();
    };
}
module.exports = roleMiddleware