const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const jobSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  nameR: {
    type: String,
    required: true,
  },
  emailR: {
    type: String,
    required: true,
  },
  maxApplicants: {
    type: Number,
    min: 0,
    required: true,
  },
  maxPositions: {
    type: Number,
    min: 0,
    required: true,
  },
  dateOfPosting: {
    type: Date,
    default: Date.now,
  },
  deadline: {
    type: Date,
    required: true,
  },
  skills: [
    {
      type: String,
      required: true,
    },
  ],
  jobType: {
    type: String,
    enum: ["Full Time", "Part Time", "Work From Home"],
    required: true,
  },
  jobDuration: {
    type: Number,
    enum: [0, 1, 2, 3, 4, 5, 6],
    required: true,
  },
  salary: {
    type: Number,
    min: 0,
    required: true,
  },
  rating: {
    type: Number,
    default: 0,
  },
});

module.exports = job = mongoose.model("jobs", jobSchema);
