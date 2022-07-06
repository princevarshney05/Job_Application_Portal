const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const applicantSchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  education: [
    {
      instituteName: {
        type: String,
        required: true,
      },
      startYear: {
        type: Number,
        required: true,
      },
      endYear: {
        type: Number,
        required: false,
      },
    },
  ],
  skills: [
    {
      type: String,
      required: true,
    },
  ],
  rating: {
    type: Number,
    required: false,
    default: 0,
  },
});

module.exports = Applicant = mongoose.model("applicants", applicantSchema);
