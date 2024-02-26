const { verifyToken } = require("./token");
const userModel = require("../modules/users/user.model");

const checkRole = (sysRole) => {
  return (req, res, next) => {
    const userRole = [req.headers.role] || [];
    const isValidRole = sysRole.some((role) => userRole.includes(role));
    if (!isValidRole) throw new Error("permission denied!!");
    next();
  };
};

module.exports = { checkRole };
