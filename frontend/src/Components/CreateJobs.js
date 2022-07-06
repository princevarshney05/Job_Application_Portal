import React, { useState } from "react";
import JobService from "../Services/JobService";
import Message from "../Components/Message";
import DateMomentUtils from "@date-io/moment"; // choose your lib
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";

const CreateJobs = (props) => {
  const [job, setJob] = useState({
    title: "",
    maxApplicants: "",
    maxPositions: "",
    deadline: new Date(),
    skills: [""],
    jobType: "Full Time",
    jobDuration: 0,
    salary: "",
  });

  const [message, setMessage] = useState(null);

  const onChange = (e) => {
    setJob({ ...job, [e.target.name]: e.target.value });
  };

  const onDateChange = (e) => {
    setJob({ ...job, deadline: e });
  };

  const handleplus = () => {
    const values = { ...job };
    values.skills = [...job.skills];
    values.skills.push("");
    setJob(values);
  };

  const handleminus = (idx) => {
    const values = { ...job };
    values.skills = [...job.skills];
    if (values.skills.length > 1) values.skills.splice(idx, 1);
    setJob(values);
  };

  const handleChangeSkill = (idx, event) => {
    const values = { ...job };
    values.skills = [...job.skills];
    values.skills[idx] = event.target.value;
    setJob(values);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    JobService.registerjob(job).then((data) => {
      const { message } = data;
      setMessage(message);
    });
  };

  return (
    <div>
      <h1>Create Jobs</h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            className="form-control"
            onChange={onChange}
            id="title"
            name="title"
          />
        </div>

        <div className="form-group">
          <label htmlFor="maxApplicants">Maximum number of Applicants:</label>
          <input
            type="number"
            className="form-control"
            onChange={onChange}
            id="maxApplicants"
            name="maxApplicants"
          />
        </div>

        <div className="form-group">
          <label htmlFor="maxPositions">Total Positions:</label>
          <input
            type="number"
            className="form-control"
            onChange={onChange}
            id="maxPositions"
            name="maxPositions"
          />
        </div>
        <label htmlFor="deadline">Deadline: </label>
        <MuiPickersUtilsProvider utils={DateMomentUtils} id="deadline">
          <DateTimePicker
            value={job.deadline}
            onChange={onDateChange}
            name="deadline"
            className="form-control"
          />
        </MuiPickersUtilsProvider>
        <div className="form-group">
          <label htmlFor="skills">Skills:</label>

          {job.skills.map((skill, idx) => (
            <div key={idx}>
              <input
                type="text"
                className="form-control"
                onChange={(event) => {
                  handleChangeSkill(idx, event);
                }}
                name="skill"
              />
              <button type="button" onClick={() => handleplus()}>
                +
              </button>
              <button type="button" onClick={() => handleminus(idx)}>
                -
              </button>
            </div>
          ))}
        </div>
        <div className="form-group">
          <label for="jobType">Job Type:</label>
          <select
            name="jobType"
            id="jobType"
            className="form-control"
            onChange={onChange}
          >
            <option>Full Time</option>
            <option>Part Time</option>
            <option>Work From Home</option>
          </select>
        </div>
        <div className="form-group">
          <label for="jobDuration">Job Duration:</label>
          <select
            name="jobDuration"
            id="jobDuration"
            className="form-control"
            onChange={onChange}
          >
            <option>0</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            <option>6</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="salary">Salary:</label>
          <input
            type="number"
            className="form-control"
            onChange={onChange}
            id="salary"
            name="salary"
          />
        </div>
        <button className="btn btn-lg btn-primary btn-block" type="submit">
          Submit
        </button>
      </form>
      {message ? <Message message={message} /> : null}
    </div>
  );
};

export default CreateJobs;
