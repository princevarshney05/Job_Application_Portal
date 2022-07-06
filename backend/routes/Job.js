const express = require("express");
const router = express.Router();
const passport = require("passport");
const passportConfig = require("../passport");
const jwt = require("jsonwebtoken");
const Job = require("../models/Jobs");

function errorMessage(res, number, msg, bool) {
  res.status(number).json({ message: { msgBody: msg, msgError: bool } });
}

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findOne({ email: req.user.email })
      .populate("_recruiter")
      .exec((err, result) => {
        if (err) errorMessage(res, 500, "error has occured", true);
        else {
          const newJob = Job({
            title: req.body.title,
            nameR: result._recruiter.name,
            emailR: result.email,
            maxApplicants: req.body.maxApplicants,
            maxPositions: req.body.maxPositions,
            deadline: req.body.deadline,
            skills: req.body.skills,
            jobType: req.body.jobType,
            jobDuration: req.body.jobDuration,
            salary: req.body.salary,
          });

          newJob.save((err, result) => {
            if (err) {
              console.log(err);
              errorMessage(res, 500, "error has occured", true);
            } else {
              errorMessage(res, 201, "Job sucesfully created", false);
            }
          });
        }
      });
  }
);

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Job.find({ emailR: req.user.email }).exec((err, result) => {
      if (err) errorMessage(res, 500, "error has occured", true);
      else res.status(200).json(result);
    });
  }
);

router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Job.findOneAndDelete({ _id: req.body._id }).exec((err, result) => {
      if (err) errorMessage(res, 500, "error has occured", true);
      else res.status(200).json(result);
    });
  }
);

router.put(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log(req.body);
    Job.findOneAndUpdate(
      { _id: req.body._id },
      { $set: req.body },
      {
        new: true,
      }
    ).exec((err, result) => {
      if (err) errorMessage(res, 500, "error has occured", true);
      else res.status(200).json(result);
    });
  }
);

module.exports = router;
