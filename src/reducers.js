import { combineReducers } from "redux";
import userReducer from "./userreducer";

const rootReducer = combineReducers({
  user: userReducer,
});

export default rootReducer;
