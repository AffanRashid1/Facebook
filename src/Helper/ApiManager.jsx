import axios from "axios";
// Get the base URL from environment variables
const baseUrl = process.env.REACT_APP_API_KEY;
// Create an Axios instance with default headers
const axiosInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": true,
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});
// Function to make API requests
export default function apiManager({
  method = "get",
  path = "",
  params = {},
  token = localStorage.getItem("token"),
}) {
  // Create a new headers object based on default headers
  //   const headers = {
  //     "Content-Type": "application/json",
  //     "ngrok-skip-browser-warning": true,
  //   };
  // If a token is provided, add it to the headers for authorization
  //   if (token) {
  //     headers.Authorization = `Bearer ${token}`;
  //   }

  // Perform the API request
  return axiosInstance
    .request({
      method,
      url: path,
      data: method !== "get" ? params : null,
      //   headers,
    })
    .then((response) => {
      const filteredData = {
        status: response?.status,
        ...response.data,
      };
      return filteredData;
    })
    .catch((error) => {
      const filteredData = {
        status: error?.response.status,
        errors: error.response.data.data,
        axiosMessage: error.message,
        message: error.response.data.message,
      };
      throw filteredData;
    });
}

// import axios from "axios";
// let _baseUrl = process.env.REACT_APP_API_URL;
// export default function apiManager({
//   header = {
//     "Content-Type": "application/json",
//     "ngrok-skip-browser-warning": true,
//   },
//   method = "get",
//   path = "",
//   params = {},
//   baseUrl = _baseUrl,
//   token = localStorage.getItem(process.env.LOGIN_TOKEN),
// }) {
//   let HEADER = { headers: header };
//   if (token) {
//     HEADER = { headers: { Authorization: `Bearer ${token}`, ...header } };
//   }
//   return new Promise(function (myResolve, myReject) {
//     if (["put", "patch", "post"].indexOf(method) !== -1) {
//       axios[method](baseUrl + path, params, HEADER)
//         .then((response) => {
//           myResolve(response);
//         })
//         .catch((err) => {
//           myReject(err);
//         });
//       return;
//     }
//     axios[method](baseUrl + path, HEADER)
//       .then((response) => {
//         myResolve(response);
//       })
//       .catch((err) => {
//         myReject(err);
//       });
//   });
// }
