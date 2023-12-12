import axios from "axios";

let _baseUrl = process.env.REACT_APP_API_KEY;

export default function apiManager({
  header = {},
  method = "get",
  path = "",
  params = {},
  baseUrl = _baseUrl,
  token = localStorage.getItem(process.env.REACT_APP_LOGIN_TOKEN),
}) {
  let headers = { ...header }; // Create a copy of the default headers

  if (token) {
    // Add Authorization header if token is present
    headers = { ...headers, Authorization: `Bearer ${token}` };
  }

  return new Promise(function (myResolve, myReject) {
    const options = {
      method,
      url: baseUrl + path,
      ...(method !== "get" && {
        data: params,
      }),
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": true,
        ...headers, // Spread the headers here
      },
    };

    axios(options)
      .then((response) => {
        myResolve(response);
      })
      .catch((err) => {
        myReject(err);
      });
  });
}
