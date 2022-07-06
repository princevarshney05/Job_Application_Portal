import React, { useState, useEffect } from "react";
import JobService from "../Services/JobService";
import Message from "../Components/Message";
import DateMomentUtils from "@date-io/moment"; // choose your lib
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { Link } from "react-router-dom";
import JobInfo from "./JobInfo";

const DisplayJobs = (props) => {
  const [data, setData] = useState([]);
  const [edit, setEdit] = useState(null);
  const [message, setMessage] = useState(null);
  const [state, setState] = useState(null);

  useEffect(() => {
    JobService.getjob().then((data) => {
      const values = [];
      data.map((job, idx) => {
        values.push(false);
      });
      setEdit(values);
      setState(values);
      setData(data);
      const { message } = data;
      setMessage(message);
    });
  }, []);

  const handleDelete = (idx) => {
    JobService.deletejob({ _id: data[idx]._id }).then((res) => {
      const values = [...data];
      values.splice(idx, 1);
      setData(values);
    });
  };

  const handleEdit = (job, idx) => {
    const values = [...edit];
    values[idx] = true;
    setEdit(values);
    document.getElementById("maxApplicants" + idx).disabled = false;
    document.getElementById("maxPositions" + idx).disabled = false;
  };

  const renderDate = (job, idx) => {
    return (
      <div>
        <label htmlFor="deadline">Deadline: </label>
        <MuiPickersUtilsProvider utils={DateMomentUtils}>
          <DateTimePicker
            value={job.deadline}
            onChange={(val) => onDateChange(val, idx)}
            name="deadline"
            className="form-control"
            id="deadline"
          />
        </MuiPickersUtilsProvider>
      </div>
    );
  };

  const renderSubmit = (job, idx) => {
    return (
      <button
        type="button"
        onClick={(e) => {
          onSubmit(e, idx);
        }}
      >
        Save Changes
      </button>
    );
  };

  const onSubmit = (e, idx) => {
    e.preventDefault();
    JobService.modifyjob(data[idx]).then((data) => {
      const { message } = data;
      setMessage(message);
      const values = [...edit];
      values[idx] = false;
      setEdit(values);
    });
  };

  const onChange = (e, idx) => {
    const values = [...data];
    values[idx][e.target.name] = e.target.value;
    setData(values);
  };

  const onDateChange = (val, idx) => {
    const values = [...data];
    values[idx].deadline = val;
    setData(values);
  };

  const generateId = (string, idx) => {
    return string + idx;
  };

  const handleInfo = (job, idx) => {
    const values = [...state];
    values[idx] = true;
    setState(values);
  };

  const helper = (job, idx) => {
    return (
      <div key={idx}>
        <button type="button" onClick={() => handleInfo(job, idx)}>
          Job #{idx + 1}
        </button>

        <form>
          <div className="form-group">
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              className="form-control"
              disabled="disabled"
              id="title"
              name="title"
              value={job.title}
            />
          </div>
          <div className="form-group">
            <label htmlFor="dateOfPosting">Date of Posting:</label>
            <input
              type="datetime-local"
              className="form-control"
              disabled="disabled"
              id="dateOfPosting"
              name="dateOfPostinge"
              value={job.dateOfPosting}
            />
          </div>
          <div className="form-group">
            <label htmlFor="maxApplicants">Maximum number of Applicants:</label>
            <input
              type="number"
              className="form-control"
              disabled="disabled"
              id={generateId("maxApplicants", idx)}
              name="maxApplicants"
              value={job.maxApplicants}
              onChange={(event) => onChange(event, idx)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="maxPositions">Total Positions:</label>
            <input
              type="number"
              className="form-control"
              disabled="disabled"
              id={generateId("maxPositions", idx)}
              name="maxPositions"
              value={job.maxPositions}
              onChange={(event) => onChange(event, idx)}
            />
          </div>
          {edit[idx] ? renderDate(job, idx) : null}
          {edit[idx] ? renderSubmit(job, idx) : null}
          {!edit[idx] ? (
            <button type="button" onClick={() => handleDelete(idx)}>
              -
            </button>
          ) : null}
          {!edit[idx] ? (
            <button type="button" onClick={() => handleEdit(job, idx)}>
              Edit
            </button>
          ) : null}
        </form>
        {message ? <Message message={message} /> : null}
        {state[idx] ? <JobInfo id={job._id} /> : null}
      </div>
    );
  };
  return (
    <div>
      <h1>Display Jobs</h1>
      {data.map((job, idx) => helper(job, idx))}
    </div>
  );
};

export default DisplayJobs;
