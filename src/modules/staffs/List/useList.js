import { useState } from 'react';
import { useQuery, useMutation } from 'react-query';

import { getStaffList } from '../services';

const useList = () => {
  const [searchParams, setSearchParams] = useState({
    skip: 0,
    take: 5,
    page: 1,
    terms: '',
    type: 'Portal',
  });

  const staffs = useQuery(
    ['staff', searchParams],
    () => getStaffList(searchParams),
    {
      keepPreviousData: true,
    }
  );

  const handleChangeSearch = ({ target }) => {
    setSearchParams({
      ...searchParams,
      terms: target.value,
    });
  };

  return {
    staffs,
    handleChangeSearch,
  };
};

export default useList;
