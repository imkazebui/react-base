import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { TOKEN } from "constants/cookies";
import { routePath } from "./routes";

import { useLogin } from "./queries";

export const useHook = () => {
  const navigate = useNavigate();
  const login = useLogin();

  const onSubmit = useCallback((values) => {
    login.mutate(
      { ...values, systemType: "Portal" },
      {
        onSuccess: ({ data }) => {
          Cookies.set(TOKEN, data.accessToken);
          Cookies.set(TOKEN, data.accessToken, {
            domain: `.${process.env.REACT_APP_HOST_NAME}`
          });
          navigate("/staff");
        }
      }
    );
  }, []);

  const handleLogout = () => {
    Cookies.remove(TOKEN);
    Cookies.remove(TOKEN, {
      domain: `.${process.env.REACT_APP_HOST_NAME}`
    });
    history.push(routePath.login);
  };

  return {
    onSubmit,
    handleLogout
  };
};
