import axios from 'utilities/axios';

const apiUrl = {
  base: 'users',
  login: this.base + '/login',
};

export const login = async (payload) => {
  const { data } = await axios.post(apiUrl.login, payload);

  return data;
};
