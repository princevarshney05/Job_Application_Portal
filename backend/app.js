const express = require("express");

const app = express();
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);

var UserRouter = require("./routes/User");
var JobRouter = require("./routes/Job");
var JobFindRouter = require("./routes/JobFind");
var Application = require("./routes/Application");

app.use(cookieParser());
app.use(express.json());

mongoose.connect(
  "mongodb://localhost:27017/job_application",
  { useNewUrlParser: true },
  () => {
    console.log("sucesfully started database");
  }
);

app.use("/user", UserRouter);
app.use("/job", JobRouter);
app.use("/jobfind", JobFindRouter);
app.use("/application", Application);

app.listen(5000, () => {
  console.log("express server started");
});
