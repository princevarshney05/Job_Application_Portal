const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ApplicationSchema = new Schema({
  applicantId: {
    type: Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  jobId: {
    type: Schema.Types.ObjectId,
    ref: "jobs",
    required: true,
  },
  SOP: {
    type: String,
    required: true,
  },
  Status: {
    type: String,
    enum: ["Applied", "Shortlisted", "Accepted", "Rejected"],
    required: true,
  },
  DOA: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Application = mongoose.model(
  "Applications",
  ApplicationSchema
);
