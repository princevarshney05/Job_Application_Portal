import React, { useState, useContext } from "react";
import AuthService from "../Services/AuthService";
import Message from "../Components/Message";
import { AuthContext } from "../Context/AuthContext";

const Login = (props) => {
  const [user, setUser] = useState({ email: "", password: "" });
  const [message, setMessage] = useState(null);
  const authContext = useContext(AuthContext);

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    AuthService.login(user).then((data) => {
      const { isAuthenticated, user, message } = data;

      if (isAuthenticated) {
        authContext.setUser(user);
        authContext.setIsAuthenticated(isAuthenticated);
        if (user.role == "recruiter") props.history.push("/recruiter");
        else props.history.push("/profileapplicant");
      } else {
        setMessage({
          msgBody: "Incorrect credentials, please try again",
          msgError: true,
        });
      }
    });
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            className="form-control"
            onChange={onChange}
            name="email"
            id="email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            className="form-control"
            onChange={onChange}
            name="password"
            id="password"
          />
        </div>

        <button className="btn btn-lg btn-primary btn-block" type="submit">
          Login
        </button>
      </form>

      {message ? <Message message={message} /> : null}
    </div>
  );
};

export default Login;
