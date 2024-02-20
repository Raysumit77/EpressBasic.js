const router = require("express").Router();
const { validate } = require("./user.validate");
const { checkRole } = require("../../utils/sessionManager");
const userController = require("./user.controller");

// //get all the users
router.get("/", async (req, res, next) => {
  try {
    const { limit, page, search } = req.query; //used for search
    //database operation
    const result = await userController.list();
    res.json({ data: result });
  } catch (err) {
    next(err);
  }
});

// //get one users
router.get("/:Id", async (req, res, next) => {
  try {
    //database operation
    const result = await userController.getById(req.params.id);
    res.json({ data: result });
  } catch (err) {
    next(err);
  }
});

// /add new user
router.post("/", validate, async (req, res, next) => {
  try {
    // console.log(req.body);
    // res.json({ msg: "hello from user Route " });
    const result = await userController.create(req.body);
    res.json({ data: result });
  } catch (err) {
    next(err);
  }
});
//update single usee for more than 2 fields
router.put("/:id", async (req, res, next) => {
  try {
    //database operation
    const result = await userController.updateById(req.params.id, req.body);
    res.json({ data: result });
  } catch (err) {
    next(err);
  }
});

//update single user for single field
router.patch("/:id", async (req, res, next) => {
  try {
    //database operation
    const result = await userController.updateById(req.params.id, req.body);
    res.json({ data: result });
  } catch (err) {
    next(err);
  }
});

//delete single user
router.delete("/:id", async (req, res, next) => {
  try {
    const result = await userController.removeById(req.params.id);
    res.json({ data: result });
  } catch (err) {
    next(err);
  }
});

//REGISTER USER
router.post("/register", validate, async (req, res, next) => {
  try {
    // console.log(req.body);
    // res.json({ msg: "hello from user Route " });
    const result = await userController.register(req.body);
    res.json({ data: result });
  } catch (err) {
    next(err);
  }
});
module.exports = router;
