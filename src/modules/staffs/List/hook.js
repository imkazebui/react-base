import { useDebounce } from 'hooks';
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

  const searchPayload = useDebounce(searchParams, 500);
  const { data: staffs } = useGetStaffList(searchPayload);

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
