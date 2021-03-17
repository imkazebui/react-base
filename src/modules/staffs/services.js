import axios from 'utilities/axios';

const apiBase = 'user-managements';

const apiUrl = {
  list: apiBase,
};

export const getStaffList = async (payload) => {
  const { data } = await axios.get(apiUrl.list, {
    params: {
      ...payload,
      role: payload.role || undefined,
      type: 'Portal',
    },
  });

  return data;
};
