import axios from 'axios';
import { useCallback } from 'react';

const useLogin = () => {
  const onSubmit = useCallback((values) => {
    console.log('values', values);
  }, []);

  return {
    onSubmit,
  };
};

export default useLogin;
