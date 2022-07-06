import React, { useState, useEffect } from "react";
import Message from "../Components/Message";

import ProfileService from "../Services/ProfileService";

const Profile = () => {
  const [data, setData] = useState({
    email: "",
    name: "",
    contact: "",
    bio: "",
  });
  const [copy, setCopy] = useState("");
  const [edit, setEdit] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    ProfileService.getrecruiter().then((result) => {
      const values = { ...data };
      values["email"] = result.email;
      values["name"] = result._recruiter.name;
      values["contact"] = result._recruiter.contact;
      values["bio"] = result._recruiter.bio;
      setData(values);
    });
  }, []);

  const handleEdit = () => {
    setEdit(true);
    setCopy(data);
    document.getElementById("bio").disabled = false;

    document.getElementById("name").disabled = false;
    document.getElementById("contact").disabled = false;
  };

  const handleSubmit = () => {
    ProfileService.modifyRecruiter(data).then((result) => {
      const { message } = result;
      setMessage(message);
      if (message) {
        if (message.msgError) {
          setData(copy);
        }
      }
    });
    document.getElementById("bio").disabled = true;
    document.getElementById("name").disabled = true;
    document.getElementById("contact").disabled = true;

    setEdit(false);
  };

  const onChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <form>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            className="form-control"
            disabled="disabled"
            id="email"
            name="email"
            value={data.email}
          />
        </div>

        <div className="form-group">
          <label htmlFor="bio">Bio:</label>
          <input
            type="text"
            className="form-control"
            disabled="disabled"
            id="bio"
            name="bio"
            value={data.bio}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            className="form-control"
            disabled="disabled"
            id="name"
            name="name"
            value={data.name}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="contact">Contact:</label>
          <input
            type="number"
            className="form-control"
            disabled="disabled"
            id="contact"
            name="contact"
            value={data.contact}
            onChange={onChange}
          />
        </div>
      </form>
      {!edit ? (
        <button type="button" onClick={handleEdit}>
          Edit
        </button>
      ) : null}
      {edit ? (
        <button type="button" onClick={handleSubmit}>
          Save Changes
        </button>
      ) : null}
      {message ? <Message message={message} /> : null}
    </div>
  );
};

export default Profile;
