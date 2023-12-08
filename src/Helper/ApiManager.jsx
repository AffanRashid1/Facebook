import axios from "axios";

let _baseUrl = process.env.REACT_APP_API_KEY;

export default function apiManager({
  header = {
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": true,
  },
  method = "get",
  path = "",
  params = {},
  baseUrl = _baseUrl,
  token = localStorage.getItem(process.env.REACT_APP_LOGIN_TOKEN),
}) {
  let HEADER = { headers: header };
  if (token) {
    HEADER = { headers: { Authorization: `Bearer ${token}`, ...header } };
  }

  return new Promise(function (myResolve, myReject) {
    if (["put", "patch", "post"].indexOf(method) !== -1) {
      axios[method](baseUrl + path, params, HEADER)
        .then((response) => {
          myResolve(response);
        })
        .catch((err) => {
          myReject(err);
        });
      return;
    }
    axios[method](baseUrl + path, HEADER)
      .then((response) => {
        myResolve(response);
      })
      .catch((err) => {
        myReject(err);
      });
  });
}
