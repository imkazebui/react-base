import { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';
import { TOKEN } from 'constants/cookies';

import { useLogin } from './queries';

const useHook = () => {
  const history = useHistory();
  const login = useLogin();

  const onSubmit = useCallback((values) => {
    login.mutate(
      { ...values, systemType: 'Portal' },
      {
        onSuccess: ({ data }) => {
          console.log('data', data);
          Cookies.set(TOKEN, data.accessToken);
          history.push('/staff');
        },
        onError: (error, variables, context) => {
          // I will fire second!
        },
      }
    );
  }, []);

  return {
    onSubmit,
  };
};

export default useHook;
