export default {
  registerjob: (job) => {
    return fetch("/job", {
      method: "post",
      body: JSON.stringify(job),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => data);
  },

  getjob: () => {
    return fetch("/job").then((res) => {
      if (res.status !== 401) return res.json().then((data) => data);
      else return { message: { msgBody: "UnAuthorized", msgError: true } };
    });
  },

  deletejob: (job) => {
    return fetch("/job", {
      method: "delete",
      body: JSON.stringify(job),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => data);
  },

  modifyjob: (job) => {
    return fetch("/job", {
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
