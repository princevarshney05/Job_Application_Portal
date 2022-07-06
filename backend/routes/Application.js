const express = require("express");
const router = express.Router();
const passport = require("passport");
const passportConfig = require("../passport");
const jwt = require("jsonwebtoken");

const Application = require("../models/Applications");

function errorMessage(res, number, msg, bool) {
  res.status(number).json({ message: { msgBody: msg, msgError: bool } });
}

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const newApplication = new Application({
      applicantId: req.user._id,
      jobId: req.body.jobId,
      SOP: req.body.SOP,
      Status: "Applied",
    });
    newApplication.save((err, result) => {
      if (err) {
        console.log(err);
        errorMessage(res, 500, "error has occured", true);
      } else {
        errorMessage(res, 201, "Application sucesfully submitted", false);
      }
    });
  }
);

router.post(
  "/isapplied",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Application.find({
      $and: [{ applicantId: req.user._id }, { jobId: req.body.jobId }],
    }).exec((err, result) => {
      if (err) errorMessage(res, 500, "error has occured", true);
      else {
        res.status(200).json(result);
      }
    });
  }
);

router.get(
  "/myapplication",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Application.find({ applicantId: req.user._id }).exec((err, result) => {
      if (err) errorMessage(res, 500, "error has occured", true);
      else {
        res.status(200).json(result);
      }
    });
  }
);

router.get(
  "/myopenapplication",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Application.find({
      $and: [{ applicantId: req.user._id }, { Status: { $ne: "Rejected" } }],
    }).exec((err, result) => {
      if (err) errorMessage(res, 500, "error has occured", true);
      else {
        res.status(200).json(result);
      }
    });
  }
);

router.post(
  "/getapplicants",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Application.find({
      $and: [{ jobId: req.body.jobId }, { Status: { $ne: "Rejected" } }],
    }).exec((err, result) => {
      if (err) errorMessage(res, 500, "error has occured", true);
      else {
        res.status(200).json(result);
      }
    });
  }
);

module.exports = router;
