import axios from 'axios';
import Cookies from 'js-cookie';
import NProgress from 'nprogress';
import API_DOMAIN from 'constants/api';
import { LANGUAGE, TOKEN } from 'constants/cookies';
import { isLocalHost } from 'utilities/url';

import 'nprogress/nprogress.css';

let requestsCounter = 0;

const instance = axios.create({
  baseURL: `${API_DOMAIN}/`,
});

// Set the AUTH token for any request
instance.interceptors.request.use(function (config) {
  requestsCounter++;
  NProgress.start();

  let token = Cookies.get(TOKEN);

  if (isLocalHost) {
    token = localStorage.getItem(TOKEN);
  }

  const language = Cookies.get(LANGUAGE) || 'en';
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  config.headers['Accept-Language'] = language ? language : '';
  return config;
});

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data

    if (--requestsCounter === 0) {
      NProgress.done();
    }

    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    // console.log('err', error.toJSON());

    // Object.entries(error).map(([label, value], idx) => {
    //   console.log(`idx ${idx}`, label, value);
    // });

    if (--requestsCounter === 0) {
      NProgress.done();
    }

    const { status } = error.response;

    switch (status) {
      case 401:
        const url =
          process.env.REACT_APP_LOGIN_DOMAIN +
          `?continue=${window.location.href}`;
        window.location.href = url;
        break;
      case 403:
      // todo
      default:
        // other case
        break;
    }

    return Promise.reject(error);
  }
);

const updateProgress = (e) =>
  NProgress.inc(calculatePercentage(e.loaded, e.total));
const calculatePercentage = (loaded, total) => Math.floor(loaded * 1.0) / total;

instance.defaults.onDownloadProgress = updateProgress;
instance.defaults.onUploadProgress = updateProgress;

export default instance;
