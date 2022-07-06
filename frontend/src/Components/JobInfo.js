import React, { useState, useEffect } from "react";
import ApplicationService from "../Services/ApplicationService";
import ProfileService from "../Services/ProfileService";

const Jobinfo = (props) => {
  const [data, setData] = useState([]);
  const [display, setDisplay] = useState([]);
  useEffect(() => {
    ApplicationService.getapplicants({ jobId: props.id }).then((data) => {
      let temp = data.map((entry, idx) => {
        return ProfileService.getapplicantbyId({ id: entry.applicantId });
      });
      Promise.all(temp).then((result) => {
        const ele = result.map((e, i) => {
          return {
            ...e._applicant,
            ["SOP"]: data[i].SOP,
            ["Status"]: data[i].Status,
            ["doa"]: data[i].DOA,
          };
        });
        setData(ele);
        setDisplay(ele);
      });
    });
  }, []);

  const dynamicSort = (property, sortOrder) => {
    return function (a, b) {
      /* next line works with strings and numbers,
       * and you may want to customize it to your needs
       */
      var result =
        a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
      return result * sortOrder;
    };
  };

  const sortData = (param) => {
    var order = prompt("Enter 0 for ascending and 1 for descending");

    const values = [...display];
    if (order === "0") values.sort(dynamicSort(param, 1));
    else if (order === "1") values.sort(dynamicSort(param, -1));
    setDisplay(values);
  };

  return (
    <div>
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
          <a className="dropdown-item" onClick={() => sortData("name")}>
            Name
          </a>
          <a className="dropdown-item" onClick={() => sortData("doa")}>
            Date of Application
          </a>
          <a className="dropdown-item" onClick={() => sortData("rating")}>
            Rating
          </a>
        </div>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Skills</th>

            <th scope="col">Date of Application</th>
            <th scope="col">Rating</th>
            <th scope="col">Education</th>
            <th scope="col">SOP</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          {display.map((job, idx) => (
            <tr>
              <th scope="row">{idx + 1}</th>
              <td>{job.name}</td>
              <td>{JSON.stringify(job.skills)}</td>
              <td>{job.doa}</td>
              <td>{job.rating}</td>
              <td>{JSON.stringify(job.education)}</td>
              <td>{job.SOP}</td>
              <td>{job.Status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Jobinfo;
