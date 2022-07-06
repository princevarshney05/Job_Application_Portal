import React, { useState } from "react";
import RegisterApplicant from "./RegisterApplicant";
import RegisterRecruiter from "./RegisterRecruiter";

const Register = (props) => {
  const [role, setRole] = useState(null);

  const onClickApplicant = () => {
    setRole("applicant");
  };

  const onClickRecruiter = () => {
    setRole("recruiter");
  };

  const display = () => {
    if (role) {
      if (role === "applicant")
        return <RegisterApplicant history={props.history} />;
      else return <RegisterRecruiter history={props.history} />;
    }
  };

  return (
    <div className="dropdown">
      <button
        className="btn btn-secondary dropdown-toggle"
        type="button"
        id="dropdownMenuButton"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        Select Role
      </button>
      <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <a className="dropdown-item" onClick={onClickApplicant}>
          Applicant
        </a>
        <a className="dropdown-item" onClick={onClickRecruiter}>
          Recruiter
        </a>
      </div>
      {display()}
    </div>
  );
};

export default Register;
