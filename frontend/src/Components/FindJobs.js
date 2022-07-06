import React, { useState, useEffect } from "react";
import JobFindingService from "../Services/JobFindingService";
import ApplicationService from "../Services/ApplicationService";
import Message from "./Message";
var _ = require("underscore");

const FindJobs = (props) => {
  const [data, setData] = useState([]);
  const [display, setDisplay] = useState(data);
  const [message, setMessage] = useState(null);
  const [search, setSearch] = useState("");
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");

  // useEffect(() => {
  //   const values = [];
  //   JobFindingService.getjob().then((data) => {
  //     data.map((job, idx) =>
  //       ApplicationService.isApplied({ jobId: job._id }).then((result) => {
  //         if (result.length == 0) {
  //           values.push({ ...job, ["isApplied"]: false });
  //         } else {
  //           values.push({ ...job, ["isApplied"]: true });
  //         }
  //       })
  //     );

  //     const { message } = data;
  //     setMessage(message);
  //   });

  //   setData(values);
  // }, []);

  useEffect(() => {
    JobFindingService.getjob().then((data) => {
      let temp = data.map(async (job, idx) => {
        return await ApplicationService.isApplied({ jobId: job._id });
      });
      Promise.all(temp).then((result) => {
        const ele = result.map((e, i) => {
          if (e.length == 0) return { ...data[i], ["isApplied"]: false };
          else return { ...data[i], ["isApplied"]: true };
        });

        setData(ele);
        setDisplay(ele);
      });
    });
  }, []);

  const sortData = (param) => {
    var order = prompt("Enter 0 for ascending and 1 for descending");

    const values = [...display];
    if (order === "0")
      values.sort((a, b) => {
        return a[param] - b[param];
      });
    else if (order === "1")
      values.sort((a, b) => {
        return b[param] - a[param];
      });
    setDisplay(values);
  };

  const filterByType = (param) => {
    const values = data.filter((job) => job.jobType === param);
    setDisplay(values);
  };

  const filterByDuration = (param) => {
    const values = data.filter((job) => job.jobDuration < param);
    setDisplay(values);
  };

  const filterBySalary = () => {
    if (max != "" && min != "" && parseInt(min) <= parseInt(max)) {
      const values = data.filter(
        (job) => job.salary >= parseInt(min) && job.salary <= parseInt(max)
      );
      setDisplay(values);
    }
  };

  const handleSearch = (event) => {
    const values = [...data];
    const fileredData = values.filter((job) =>
      job.title.startsWith(event.target.value)
    );
    setDisplay(fileredData);
  };

  const handleApply = (job) => {
    ApplicationService.myopenapplication().then((answer) => {
      if (answer.length >= 10) {
        alert("Exceeded max limit");
      } else {
        var SOP = prompt("Enter Statement of Purpose");

        ApplicationService.Apply({ SOP: SOP, jobId: job._id }).then((res) => {
          const { message } = res;
          setMessage(message);

          if (!message.msgError) {
            const values = [...data];
            let idx = 0;
            for (var i = 0; i < values.length; i++) {
              if (_.isEqual(values[i], job)) {
                idx = i;
                break;
              }
            }

            values[idx].isApplied = true;
            setData(values);
            setDisplay(values);
          }
        });
      }
    });
  };

  const renderButton = (job) => {
    if (job.isApplied) {
      return (
        <button disabled="disabled" className="btn-primary">
          Applied
        </button>
      );
    } else {
      return (
        <button
          type="button"
          className="btn-secondary"
          onClick={() => handleApply(job)}
        >
          Apply
        </button>
      );
    }
  };

  const renderData = () => {
    return (
      <>
        <tbody>
          {display.map((job, idx) => (
            <tr key={idx}>
              <th scope="row">{idx + 1}</th>
              <td>{job.title}</td>
              <td>{job.nameR}</td>
              <td>{job.deadline}</td>
              <td>{job.jobDuration}</td>
              <td>{job.rating}</td>
              <td>{job.salary}</td>
              <td>{renderButton(job)}</td>
            </tr>
          ))}
        </tbody>
      </>
    );
  };

  return (
    <div>
      <h1>Search Jobs</h1>
      <div className="dropdown">
        <button
          className="btn btn-secondary dropdown-toggle"
          type="button"
          id="dropdownMenuButton"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          Sort Results
        </button>
        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <a className="dropdown-item" onClick={() => sortData("salary")}>
            Salary
          </a>
          <a className="dropdown-item" onClick={() => sortData("jobDuration")}>
            Duration
          </a>
          <a className="dropdown-item" onClick={() => sortData("rating")}>
            Rating
          </a>
        </div>
      </div>
      <br />
      <div className="form-group">
        <input
          type="text"
          className="form-control"
          // onChange={(e) => setSearch(e.target.value)}
          onChange={handleSearch}
          id="title"
          name="title"
          // value={search}
        />
        {/* <button type="button" onClick={handleSearch}>
          Search
        </button> */}
      </div>

      <br />
      <div className="dropdown">
        <button
          className="btn btn-secondary dropdown-toggle"
          type="button"
          id="dropdownMenuButton"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          Filter-Job Type
        </button>
        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <a
            className="dropdown-item"
            onClick={() => filterByType("Full Time")}
          >
            Full-Time
          </a>
          <a
            className="dropdown-item"
            onClick={() => filterByType("Part Time")}
          >
            Part-Time
          </a>
          <a
            className="dropdown-item"
            onClick={() => filterByType("Work From Home")}
          >
            Work From Home
          </a>
        </div>
      </div>
      <br />
      <div className="dropdown">
        <button
          className="btn btn-secondary dropdown-toggle"
          type="button"
          id="dropdownMenuButton"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          Filter-Duration
        </button>
        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <a className="dropdown-item" onClick={() => filterByDuration(1)}>
            1
          </a>
          <a className="dropdown-item" onClick={() => filterByDuration(2)}>
            2
          </a>
          <a className="dropdown-item" onClick={() => filterByDuration(3)}>
            3
          </a>
          <a className="dropdown-item" onClick={() => filterByDuration(4)}>
            4
          </a>
          <a className="dropdown-item" onClick={() => filterByDuration(5)}>
            5
          </a>
          <a className="dropdown-item" onClick={() => filterByDuration(6)}>
            6
          </a>
          <a className="dropdown-item" onClick={() => filterByDuration(7)}>
            7
          </a>
        </div>
      </div>
      <br />

      <div className="form-group">
        Filter By Salary:
        <input
          type="number"
          className="form-control"
          placeholder="Enter minimum value"
          onChange={(e) => {
            setMin(e.target.value);
          }}
        />
        <input
          type="number"
          className="form-control"
          placeholder="Enter maximum value"
          onChange={(e) => {
            setMax(e.target.value);
          }}
        />
        <button type="button" onClick={filterBySalary}>
          Search
        </button>
      </div>
      <br />
      <button
        type="button"
        onClick={() => {
          setDisplay(data);
        }}
      >
        Display all
      </button>

      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Title</th>
            <th scope="col">Recruiter's Name</th>

            <th scope="col">Deadline</th>

            <th scope="col">Duration</th>

            <th scope="col">Rating</th>
            <th scope="col">salary</th>
            <th scope="col">Jobs</th>
          </tr>
        </thead>
        {renderData()}
      </table>
      {message ? <Message message={message} /> : null}
    </div>
  );
};

export default FindJobs;
