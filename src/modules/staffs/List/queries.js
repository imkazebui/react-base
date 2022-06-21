import { useQuery } from 'react-query';
import axios from 'utilities/axios';

const apiBase = 'user-managements';

const apiUrl = {
  list: apiBase,
};

export const useGetStaffList = (payload) =>
  useQuery(
    ['staff', payload],
    () =>
      axios
        .get(apiUrl.list, {
          params: payload,
        })
        .then((res) => res.data),
    {
      keepPreviousData: true,
    }
  );
