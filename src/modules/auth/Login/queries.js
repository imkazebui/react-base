import axios from 'utilities/axios';
import { useQuery, useMutation } from 'react-query';

const apiBase = 'users';

const apiUrl = {
  login: apiBase + '/login',
};

export const useLogin = () => {
  return useMutation((payload) => axios.post(apiUrl.login, payload));
};
