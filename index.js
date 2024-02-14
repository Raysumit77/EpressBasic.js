require("dotenv").config();

const express = require("express");
const morgan = require("morgan");

const indexRouter = require("./routes");
const PORT = Number(process.env.PORT);

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use("/assets", express.static("public"));

app.use("/", indexRouter);

app.use((err, req, res, next) => {
  err = err ? err.toString() : "something went wrong";
  res.status(500).json({ msg: err });
});

app.listen(PORT, () => {
  console.log(`applicaion is runnung at port ${PORT}`);
});