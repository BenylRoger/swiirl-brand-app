import { createStore } from "redux";

const initialState = {
  username: "", // Initially empty username
  loggedIn: false, // Initially not logged in
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        username: action.payload.username,
        loggedIn: true,
      };
    case "LOGOUT":
      return {
        ...state,
        username: "",
        loggedIn: false,
      };
    default:
      return state;
  }
};

const store = createStore(reducer);

export default store;
