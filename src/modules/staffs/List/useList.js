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

  const staffs = useQuery('staff', () => getStaffList(searchParams));

  return {
    staffs,
  };
};

export default useList;
