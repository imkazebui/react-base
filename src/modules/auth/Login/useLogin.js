import { useCallback } from 'react';
import { useQuery, useMutation } from 'react-query';
import { useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';
import { LANGUAGE, TOKEN } from 'constants/cookies';

import { login } from '../services';

const useLogin = () => {
  const history = useHistory();
  const mutation = useMutation(login);

  const onSubmit = useCallback((values) => {
    mutation.mutate(values, {
      onSuccess: (data, variables, context) => {
        Cookies.set(TOKEN, data.accessToken);
        history.push('/staff');
      },
      onError: (error, variables, context) => {
        // I will fire second!
      },
    });
  }, []);

  return {
    onSubmit,
  };
};

export default useLogin;
