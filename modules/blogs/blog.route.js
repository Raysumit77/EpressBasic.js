const router = require("express").Router();
const { validate } = require("./blog.validate");
const blogController = require("./blog.controller");

//get all the users
router.get("/", (req, res, next) => {
  try {
    const { limit, page, search } = req.query;
    //database operation
    res.json({ msg: "hello from user Route" });
  } catch (error) {
    next(err);
  }
});

//add new user
router.post("/", validate, async (req, res, next) => {
  try {
    const result = await blogController.create(req.body);
    //database operation
    res.json({ data: result });
  } catch (error) {
    next(err);
  }
});
//update single usee for more than 2 fields
router.put("/:id", (req, res, next) => {
  try {
    const { id } = req.params;
    const data = req.body;
    console.log({ id, data });
    //database operation
    res.json({ msg: `hello from user put Route id ${id}` });
  } catch (error) {
    next(err);
  }
});

//update single user for single field
router.patch("/:id", (req, res, next) => {
  try {
    const { id } = req.params;
    const data = req.body;
    console.log({ id, data });
    //database operation
    res.json({ msg: "hello from user Route" });
  } catch (error) {
    next(err);
  }
});

//delete single user
router.delete("/:id", (req, res, next) => {
  try {
    console.log(req.param.id);
    res.json({ msg: "hello from user Route" });
  } catch (error) {
    next(err);
  }
});

module.exports = router;
