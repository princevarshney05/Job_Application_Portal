import React, { useState } from "react";

import Profile from "./Profile";
import CreateJobs from "./CreateJobs";
import DisplayJobs from "./DisplayJobs";

const Recruiter = (props) => {
  return (
    <div>
      <button
        className="btn btn-lg btn-primary btn-block"
        type="button"
        onClick={() => props.history.push("/profile")}
      >
        MyProfile
      </button>
      <button
        className="btn btn-lg btn-primary btn-block"
        type="button"
        onClick={() => props.history.push("/createjob")}
      >
        Create Jobs
      </button>
      <button
        className="btn btn-lg btn-primary btn-block"
        type="button"
        onClick={() => props.history.push("/displayjob")}
      >
        Display Jobs
      </button>
    </div>
  );
};

export default Recruiter;
