export default {
  getjob: () => {
    return fetch("/jobfind").then((res) => {
      if (res.status !== 401) return res.json().then((data) => data);
      else return { message: { msgBody: "UnAuthorized", msgError: true } };
    });
  },

  jobByid: (job) => {
    return fetch("/jobfind", {
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
