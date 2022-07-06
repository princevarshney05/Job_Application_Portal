import React, { useState, useEffect } from "react";

import ProfileService from "../Services/ProfileService";
import Message from "./Message";

const Profile = () => {
  const [data, setData] = useState({
    email: "",
    skills: [],
    name: "",
    education: [],
  });

  const [message, setMessage] = useState(null);

  const [copy, setCopy] = useState("");

  const handleSubmit = () => {
    ProfileService.modifyApplicant(data).then((result) => {
      const { message } = result;
      setMessage(message);
      if (message) {
        if (message.msgError) {
          setData(copy);
        }
      }
    });
  };

  const handleChangeSkill = (idx, event) => {
    const values = { ...data };
    values.skills = [...data.skills];
    values.skills[idx] = event.target.value;
    setData(values);
  };

  const handleChangeEducation = (idx, event) => {
    const values = { ...data };

    values.education[idx][event.target.name] = event.target.value;
    setData(values);
  };

  const onChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleplus = () => {
    const values = { ...data };
    values.skills = [...data.skills];
    values.skills.push("");

    setData(values);
  };

  const handleminus = (idx) => {
    const values = { ...data };
    values.skills = [...data.skills];
    if (values.skills.length > 1) values.skills.splice(idx, 1);
    setData(values);
  };

  const handleplusedu = () => {
    const values = { ...data };

    values.education.push({ instituteName: "", startYear: "", endYear: "" });
    setData(values);
  };

  const handleminusedu = (idx) => {
    const values = { ...data };
    if (values.education.length > 1) values.education.splice(idx, 1);
    setData(values);
  };

  useEffect(() => {
    ProfileService.getapplicant().then((result) => {
      const values = { ...data };
      values["email"] = result.email;
      values["name"] = result._applicant.name;
      values["skills"] = result._applicant.skills;
      values["education"] = result._applicant.education;

      setData(values);
    });
  }, []);

  return (
    <div>
      <form>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={data.email}
            disabled="disabled"
          />
        </div>

        <div className="form-group">
          <label htmlFor="skills">Skills:</label>
          {data.skills.map((skill, idx) => (
            <div key={idx}>
              <input
                type="text"
                value={data.skills[idx]}
                className="form-control"
                id={"skills" + idx}
                onChange={(event) => {
                  handleChangeSkill(idx, event);
                }}
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
            id="name"
            name="name"
            value={data.name}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="education">Education:</label>

          <div id="education">
            {data.education.map((skill, idx) => (
              <div key={idx}>
                <label htmlFor="instituteName">Institute Name</label>
                <input
                  type="text"
                  className="form-control"
                  id={"instituteName" + idx}
                  name="instituteName"
                  value={data.education[idx].instituteName}
                  onChange={(event) => handleChangeEducation(idx, event)}
                  placeholder="institute name"
                />
                <label htmlFor="startYear">Start Year</label>
                <input
                  type="number"
                  className="form-control"
                  id={"startYear" + idx}
                  name="startYear"
                  placeholder="Start Year"
                  value={data.education[idx].startYear}
                  onChange={(event) => handleChangeEducation(idx, event)}
                />
                <label htmlFor="endYear">End Year</label>
                <input
                  type="number"
                  className="form-control"
                  id={"endYear" + idx}
                  name="endYear"
                  placeholder="End Year"
                  value={data.education[idx].endYear}
                  onChange={(event) => handleChangeEducation(idx, event)}
                />
                <div>
                  <button type="button" onClick={() => handleplusedu()}>
                    +
                  </button>
                  <button type="button" onClick={() => handleminusedu(idx)}>
                    -
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </form>

      <button type="button" onClick={handleSubmit}>
        Save Changes
      </button>
      {message ? <Message message={message} /> : null}
    </div>
  );
};

export default Profile;
