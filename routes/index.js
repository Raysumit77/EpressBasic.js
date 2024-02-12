
const router = require("express").Router();
const blogRouter = require("../modules/blogs/blog.route");
const userRoute = require("../modules/users/user.route");

  router.use("/api/v1/blogs" , blogRouter);
//   router.use("api/v1/blogs" , blogUser);


 module.exports = router;





