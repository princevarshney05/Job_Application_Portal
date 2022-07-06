const express = require("express");
const router = express.Router();
const passport = require("passport");
const passportConfig = require("../passport");
const jwt = require("jsonwebtoken");
const Job = require("../models/Jobs");

function errorMessage(res, number, msg, bool) {
  res.status(number).json({ message: { msgBody: msg, msgError: bool } });
}

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Job.find({}).exec((err, result) => {
      if (err) errorMessage(res, 500, "error has occured", true);
      else res.status(200).json(result);
    });
  }
);

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Job.findOne({ _id: req.body.jobId }).exec((err, result) => {
      if (err) errorMessage(res, 500, "error has occured", true);
      else {
        res.status(200).json(result);
      }
    });
  }
);

module.exports = router;
