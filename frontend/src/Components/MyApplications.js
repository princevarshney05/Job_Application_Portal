import React, { useState, useEffect } from "react";
import ApplicationService from "../Services/ApplicationService";
import JobFindingService from "../Services/JobFindingService";

const MyApplications = (props) => {
  const [data, setData] = useState([]);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    ApplicationService.myapplication().then((data) => {
      const values = [];
      let temp = data.map(async (entry, idx) => {
        // JobFindingService.jobByid({ jobId: entry.jobId }).then((res) => {
        //   setData([{ ...res, ["status"]: entry.Status }]);
        //   values.push({ ...res, ["status"]: entry.Status });
        // });
        let res = await JobFindingService.jobByid({ jobId: entry.jobId });
        // values.push({ ...res, ["status"]: entry.Status });
        // setData(values);
        return res;
      });
      Promise.all(temp).then((result) => {
        const ele = result.map((e, i) => {
          return { ...e, ["status"]: data[i].Status };
        });
        setData(ele);
      });
      const { message } = data;
      setMessage(message);
    });
  }, []);

  const renderData = () => {
    return (
      <>
        <tbody>
          {data.map((job, idx) => (
            <tr>
              <th scope="row">{idx + 1}</th>
              <td>{job.title}</td>
              <td>{job.nameR}</td>
              <td>Not Applicable</td>

              <td>{job.salary}</td>
              <td>{job.status}</td>
            </tr>
          ))}
        </tbody>
      </>
    );
  };

  return (
    <div>
      <h1>My Applications</h1>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Title</th>
            <th scope="col">Recruiter's Name</th>

            <th scope="col">Date of joining</th>

            <th scope="col">salary</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((job, idx) => (
            <tr>
              <th scope="row">{idx + 1}</th>
              <td>{job.title}</td>
              <td>{job.nameR}</td>
              <td>Not Applicable</td>

              <td>{job.salary}</td>
              <td>{job.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyApplications;
