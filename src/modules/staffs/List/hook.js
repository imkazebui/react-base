import { useState } from 'react';

import { useGetStaffList } from './queries';

const useList = () => {
  const [searchParams, setSearchParams] = useState({
    skip: 0,
    take: 5,
    page: 1,
    terms: '',
    type: 'Portal',
  });

  const { data: staffs } = useGetStaffList(searchParams);

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
