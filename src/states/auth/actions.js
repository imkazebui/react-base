import * as type from "./constants";

export const login = payload => {
  return {
    type: type.LOGIN,
    payload
  };
};
