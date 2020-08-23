import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import profile from "./profile.js"
export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  profile:profile
});