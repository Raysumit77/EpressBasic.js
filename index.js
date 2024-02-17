require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");

const indexRouter = require("./routes");
const PORT = Number(process.env.PORT);

const app = express();
mongoose.connect("mongodb://localhost:27017/blog-app-530").then(() => {
  console.log("database connected");
});

app.use(morgan("dev"));
app.use(express.json());
app.use("/assets", express.static("public"));

// app.use(req,res,next) => {
// res.body.country = "nepal";
// next();
// }
app.use("/", indexRouter);

app.use((err, req, res, next) => {
  err = err ? err.toString() : "something went wrong";
  res.status(500).json({ msg: err });
});

app.listen(PORT, () => {
  console.log(`applicaion is runnung at port ${PORT}`);
});
