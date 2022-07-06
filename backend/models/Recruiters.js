const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recruiterSchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  contact: {
    type: Number,
    required: true,
  },
  bio: {
    type: String,
    required: true,
  },
});

module.exports = recruiter = mongoose.model("recruiters", recruiterSchema);
