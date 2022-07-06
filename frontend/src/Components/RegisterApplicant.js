import React, { useState, useRef, useEffect } from "react";
import AuthService from "../Services/AuthService";
import Message from "../Components/Message";

const RegisterApplicant = (props) => {
  const [user, setUser] = useState({
    email: "",
    password: "",
    role: "applicant",
    name: "",
    education: [{ instituteName: "", startYear: "", endYear: "" }],
    skills: [""],
  });
  const [message, setMessage] = useState(null);
  let timerID = useRef(null);

  useEffect(() => {
    return () => {
      clearTimeout(timerID);
    };
  }, []);

  const handleChangeSkill = (idx, event) => {
    const values = { ...user };
    values.skills = [...user.skills];
    values.skills[idx] = event.target.value;
    setUser(values);
  };

  const handleChangeEducation = (idx, event) => {
    const values = { ...user };

    values.education[idx][event.target.name] = event.target.value;
    setUser(values);
  };

  const handleplus = () => {
    const values = { ...user };
    values.skills = [...user.skills];
    values.skills.push("");
    setUser(values);
  };

  const handleminus = (idx) => {
    const values = { ...user };
    values.skills = [...user.skills];
    if (values.skills.length > 1) values.skills.splice(idx, 1);
    setUser(values);
  };

  const handleplusedu = () => {
    const values = { ...user };

    values.education.push({ instituteName: "", startYear: "", endYear: "" });
    setUser(values);
  };

  const handleminusedu = (idx) => {
    const values = { ...user };
    if (values.education.length > 1) values.education.splice(idx, 1);
    setUser(values);
  };

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setUser({
      email: "",
      password: "",
      role: "",
      name: "",
      education: [],
      skills: [],
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    AuthService.register(user).then((data) => {
      const { message } = data;
      setMessage(message);
      resetForm();
      if (!message.msgError) {
        timerID = setTimeout(() => {
          props.history.push("/login");
        }, 2000);
      }
    });
  };
  return (
    <div>
      <h1>Applicant</h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            className="form-control"
            onChange={onChange}
            id="email"
            name="email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            className="form-control"
            onChange={onChange}
            id="password"
            name="password"
          />
        </div>
        <div className="form-group">
          <label htmlFor="skills">Skills:</label>

          {user.skills.map((skill, idx) => (
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
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            className="form-control"
            onChange={onChange}
            id="name"
            name="name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="education">Education:</label>

          <div id="education">
            {user.education.map((edu, idx) => (
              <div key={idx}>
                <input
                  type="text"
                  className="form-control"
                  onChange={(event) => handleChangeEducation(idx, event)}
                  id="instituteName"
                  name="instituteName"
                  placeholder="Institute Name"
                />
                <input
                  type="number"
                  className="form-control"
                  onChange={(event) => handleChangeEducation(idx, event)}
                  id="startYear"
                  name="startYear"
                  placeholder="Start Year"
                />
                <input
                  type="number"
                  className="form-control"
                  onChange={(event) => handleChangeEducation(idx, event)}
                  id="endYear"
                  name="endYear"
                  placeholder="End Year"
                />
                <button type="button" onClick={() => handleplusedu()}>
                  +
                </button>
                <button type="button" onClick={() => handleminusedu(idx)}>
                  -
                </button>
              </div>
            ))}
          </div>
        </div>
        <button className="btn btn-lg btn-primary btn-block" type="submit">
          Submit
        </button>
      </form>

      {message ? <Message message={message} /> : null}
    </div>
  );
};

export default RegisterApplicant;
