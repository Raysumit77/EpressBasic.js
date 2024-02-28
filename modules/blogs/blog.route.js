const router = require("express").Router();
const { checkRole } = require("../../utils/sessionManager");
const controller = require("./blog.controller");

//get all the users
router.get("/", async (req, res, next) => {
  try {
    // const { limit, page, search } = req.query;
    const result = await controller.list();
    res.json({ data: result });
  } catch (error) {
    next(err);
  }
});

//add new user
router.post("/", checkRole(["user", "admin"]), async (req, res, next) => {
  try {
    req.body.author = req.body.author || req.currentUser;
    const result = await controller.create(req.body);
    res.json({ data: result });
  } catch (err) {
    next(err);
  }
});
// //update single usee for more than 2 fields
// router.put("/:id", (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const data = req.body;
//     console.log({ id, data });
//     //database operation
//     res.json({ msg: `hello from user put Route id ${id}` });
//   } catch (error) {
//     next(err);
//   }
// });

// //update single user for single field
// router.patch("/:id", (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const data = req.body;
//     console.log({ id, data });
//     //database operation
//     res.json({ msg: "hello from user Route" });
//   } catch (err) {
//     next(err);
//   }
// });

// //delete single user
// router.delete("/:id", (req, res, next) => {
//   try {
//     console.log(req.param.id);
//     res.json({ msg: "hello from user Route" });
//   } catch (err) {
//     next(err);
//   }
//});

module.exports = router;
