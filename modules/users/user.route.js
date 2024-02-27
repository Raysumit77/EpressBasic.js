const router = require("express").Router();
const multer = require("multer");
const { Login, validate } = require("./user.validate");
const { checkRole } = require("../../utils/sessionManager");
const userController = require("./user.controller");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/image/users");
  },
  filename: function (req, file, cb) {
    const imageName = "image".concat(
      "-",
      Date.now(),
      ".",
      file.originalname.split(".")[file.originalname.split(".").length - 1]
    );
    cb(null, imageName);
  },
});

//hw file size each max1mb
//hw file type png, jpeg, jpg

const upload = multer({ storage: storage });

//get all the users
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

// /add new user
router.post("/", checkRole(["admin"]), validate, async (req, res, next) => {
  try {
    // console.log(req.body);

    const result = await userController.create(req.body);
    res.json({ data: result });
  } catch (err) {
    next(err);
  }
});

//REGISTER USER
router.post(
  "/register",
  upload.single("pictureUrl"),
  validate,
  async (req, res, next) => {
    try {
      if (req.file) {
        req.body.pictureUrl = req.file.path.replace("public", "");
      }
      const result = await userController.register(req.body);
      res.json({ data: result });
    } catch (err) {
      next(err);
    }
  }
);

//LOGIN
router.post("/login", Login, async (req, res, next) => {
  try {
    // console.log(req.body);
    // res.json({ msg: "hello from user Route " });
    const result = await userController.login(req.body);
    res.json({ data: result });
  } catch (err) {
    next(err);
  }
});
//generate token
router.post("/generate-fp-token", async (req, res, next) => {
  try {
    const result = await userController.generateFPToken(req.body);
    res.json({ data: result });
  } catch (err) {
    next(err);
  }
});

router.post("/verify-fp-token", async (req, res, next) => {
  try {
    const result = await userController.verifyFPToken(req.body);
    res.json({ data: result });
  } catch (err) {
    next(err);
  }
});

router.post(
  "/change-password",
  checkRole(["user", "admin"]),
  async (req, res, next) => {
    try {
      const result = await userController.changePassword(req.body);
      res.json({ data: result });
    } catch (err) {
      next(err);
    }
  }
);

router.post("/reset-password", checkRole(["admin"]), async (req, res, next) => {
  try {
    const result = await userController.resetPassword(req.body);
    res.json({ data: result });
  } catch (e) {
    next(e);
  }
});

router.patch("/block-user", checkRole(["admin"]), async (req, res, next) => {
  try {
    const result = await userController.blockUser(req.body);
    res.json({ data: result });
  } catch (e) {
    next(e);
  }
});

//GET MY PROFILE
router.get(
  "/get-profile",
  checkRole(["admin", "user"]),
  async (req, res, next) => {
    try {
      const result = await userController.getProfile(req.currentUser);
      res.json({ data: result });
    } catch (err) {
      next(err);
    }
  }
);

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

//delete single user
router.delete("/:id", async (req, res, next) => {
  try {
    const result = await userController.removeById(req.params.id);
    res.json({ data: result });
  } catch (err) {
    next(err);
  }
});
module.exports = router;
