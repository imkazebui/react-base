import axios from 'utilities/axios';

const apiBase = 'users';

const apiUrl = {
  login: apiBase + '/login',
};

export const login = async (payload) => {
  const { data } = await axios.post(apiUrl.login, payload);

  return data;
};
