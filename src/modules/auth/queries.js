import axios from 'utilities/axios';
import { useQuery, useMutation } from 'react-query';

const apiBase = 'users';

const apiUrl = {
  login: apiBase + '/login',
  profile: apiBase + '/profile',
};

export const useLogin = () => {
  return useMutation((payload) => axios.post(apiUrl.login, payload));
};

export const useProfile = () => {
  return useQuery('profile', () =>
    axios.get(apiUrl.profile).then((res) => res.data)
  );
};
