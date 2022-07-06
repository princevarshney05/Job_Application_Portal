export default {
  getrecruiter: () => {
    return fetch("/user/recruiterdata").then((res) => {
      if (res.status !== 401) return res.json().then((data) => data);
      else return { message: { msgBody: "UnAuthorized", msgError: true } };
    });
  },
  getapplicant: () => {
    return fetch("/user/applicantdata").then((res) => {
      if (res.status !== 401) return res.json().then((data) => data);
      else return { message: { msgBody: "UnAuthorized", msgError: true } };
    });
  },
  getapplicantbyId: (user) => {
    return fetch("/user/applicantdata", {
      method: "post",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => data);
  },
  modifyRecruiter: (job) => {
    return fetch("/user/recruiter", {
      method: "put",
      body: JSON.stringify(job),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => data);
  },
  modifyApplicant: (job) => {
    return fetch("/user/applicant", {
      method: "put",
      body: JSON.stringify(job),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => data);
  },
};
