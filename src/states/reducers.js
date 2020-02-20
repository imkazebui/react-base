import { combineReducers } from "redux";

import exampleReducer from "./example/reducer";
import { authReducer, authName } from "./auth";

export default combineReducers({
  [authName]: authReducer
});
