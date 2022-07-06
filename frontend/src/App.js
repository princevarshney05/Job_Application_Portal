import React, { useContext } from "react";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";

import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./Components/Login";
import Profile from "./Components/Profile";
import ProfileApplicant from "./Components/ProfileApplicant";
import Register from "./Components/Register";
import PrivateRoute from "./hocs/PrivateRoute";
import UnPrivateRoute from "./hocs/UnPrivateRoute";
import CreateJobs from "./Components/CreateJobs";
import DisplayJobs from "./Components/DisplayJobs";
import Recruiter from "./Components/Recruiter";
import FindJobs from "./Components/FindJobs";
import MyApplications from "./Components/MyApplications";

function App() {
  return (
    <Router>
      <Navbar />
      <Route exact path="/" component={Home} />
      <UnPrivateRoute path="/login" component={Login} />
      <PrivateRoute path="/profile" roles={["recruiter"]} component={Profile} />
      <PrivateRoute
        path="/createjob"
        roles={["recruiter"]}
        component={CreateJobs}
      />
      <PrivateRoute
        path="/displayjob"
        roles={["recruiter"]}
        component={DisplayJobs}
      />
      <PrivateRoute
        path="/profileapplicant"
        roles={["applicant"]}
        component={ProfileApplicant}
      />
      <PrivateRoute
        path="/findjobs"
        roles={["applicant"]}
        component={FindJobs}
      />
      <PrivateRoute
        path="/myapplications"
        roles={["applicant"]}
        component={MyApplications}
      />
      <PrivateRoute
        path="/recruiter"
        roles={["recruiter"]}
        component={Recruiter}
      />

      <UnPrivateRoute path="/register" component={Register} />
    </Router>
  );
}

export default App;
