const { verifyToken } = require("./token");
const userModel = require("../modules/users/user.model");

const checkRole = (sysRole) => {
  return async (req, res, next) => {
    try {
      const token = req.headers.access_token || null;
      if (!token) throw new Error("Token is missing");
      const { data } = verifyToken(token);
      const user = await userModel.findOne({
        email: data.email,
        isActive: true,
      });
      if (!user) throw new Error(" Invalid Token");
      const isValidRole = sysRole.some((role) => user.roles.includes(role));
      if (!isValidRole) throw new Error("permission denied!!");
      next();
    } catch (err) {
      next(err);
    }
  };
};

module.exports = { checkRole };
