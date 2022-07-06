const express = require("express");
const router = express.Router();
const passport = require("passport");
const passportConfig = require("../passport");
const jwt = require("jsonwebtoken");

const User = require("../models/Users");
const Applicant = require("../models/Applicants");
const Recruiter = require("../models/Recruiters");

function errorMessage(res, number, msg, bool) {
  res.status(number).json({ message: { msgBody: msg, msgError: bool } });
}

const signToken = (userID) => {
  return jwt.sign(
    {
      iss: "NoobCoder",
      sub: userID,
    },
    "NoobCoder",
    { expiresIn: "1h" }
  );
};

router.post("/register", (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) {
      errorMessage(res, 500, "error has occured", true);
    }
    if (user) {
      errorMessage(res, 400, "email is in use", true);
    } else {
      const role = req.body.role;

      if (role === "applicant") {
        const newApplicant = Applicant({
          name: req.body.name,
          education: req.body.education,
          skills: req.body.skills,
          rating: req.body.rating,
        });

        newApplicant.save((err, record) => {
          if (err) {
            errorMessage(res, 500, "error has occured", true);
          } else {
            const newUser = new User({
              email: req.body.email,
              password: req.body.password,
              role: req.body.role,
              _applicant: record._id,
            });
            newUser.save((err, result) => {
              if (err) {
                errorMessage(res, 500, "error has occured", true);
              } else {
                errorMessage(res, 201, "Account sucesfully created", false);
              }
            });
          }
        });
      } else if (role == "recruiter") {
        const newRecruiter = new Recruiter({
          name: req.body.name,
          contact: req.body.contact,
          bio: req.body.bio,
        });
        newRecruiter.save((err, record) => {
          if (err) {
            errorMessage(res, 500, "error has occured", true);
          } else {
            const newUser = new User({
              email: req.body.email,
              password: req.body.password,
              role: req.body.role,
              _recruiter: record._id,
            });
            newUser.save((err, result) => {
              if (err) {
                errorMessage(res, 500, "error has occured", true);
              } else {
                errorMessage(res, 201, "Account sucesfully created", false);
              }
            });
          }
        });
      }
    }
  });
});

router.post(
  "/login",
  passport.authenticate("local", { session: false }),
  (req, res) => {
    if (req.isAuthenticated()) {
      const { _id } = req.user;
      const token = signToken(_id);
      res.cookie("access_token", token, { httpOnly: true, sameSite: true });
      res.status(200).json({ isAuthenticated: true, user: req.user });
    }
  }
);

router.get(
  "/logout",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.clearCookie("access_token");
    res.json({ user: "", success: true });
  }
);

router.get(
  "/authenticated",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.status(200).json({ isAuthenticated: true, user: req.user });
  }
);

router.get(
  "/recruiterdata",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findOne({ email: req.user.email })
      .populate("_recruiter")
      .exec((err, result) => {
        if (err) errorMessage(res, 500, "error has occured", true);
        else res.status(200).json(result);
      });
  }
);

router.get(
  "/applicantdata",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findOne({ email: req.user.email })
      .populate("_applicant")
      .exec((err, result) => {
        if (err) errorMessage(res, 500, "error has occured", true);
        else res.status(200).json(result);
      });
  }
);
router.post(
  "/applicantdata",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findOne({ _id: req.body.id })
      .populate("_applicant")
      .exec((err, result) => {
        if (err) errorMessage(res, 500, "error has occured", true);
        else res.status(200).json(result);
      });
  }
);
router.put(
  "/recruiter",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Recruiter.findOneAndUpdate(
      { _id: req.user._recruiter._id },
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
router.put(
  "/applicant",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Applicant.findOneAndUpdate(
      { _id: req.user._applicant._id },
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
