export default {
  isApplied: (job) => {
    return fetch("/application/isapplied", {
      method: "post",
      body: JSON.stringify(job),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => data);
  },
  Apply: (job) => {
    return fetch("/application", {
      method: "post",
      body: JSON.stringify(job),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => data);
  },
  myapplication: () => {
    return fetch("/application/myapplication").then((res) => {
      if (res.status !== 401) return res.json().then((data) => data);
      else return { message: { msgBody: "UnAuthorized", msgError: true } };
    });
  },
  myopenapplication: () => {
    return fetch("/application/myopenapplication").then((res) => {
      if (res.status !== 401) return res.json().then((data) => data);
      else return { message: { msgBody: "UnAuthorized", msgError: true } };
    });
  },
  getapplicants: (job) => {
    return fetch("/application/getapplicants", {
      method: "post",
      body: JSON.stringify(job),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => data);
  },
};
