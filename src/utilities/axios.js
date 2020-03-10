import axios from "axios";
import { useHistory, useLocation } from "react-router-dom";

const instance = axios.create();

// Add a response interceptor
instance.interceptors.response.use(
  function(response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function(error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error

    if (error.response.status === 401) {
      // redirect to login
      const history = useHistory();
      const location = useLocation();

      history.replace("/login", { from: location.pathname });
    }

    return Promise.reject(error);
  }
);

export default instance;
