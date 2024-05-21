const initialState = {
  isLoggedIn: false,
  username: "",
  token: "", // Add token field for session management
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        isLoggedIn: true,
        username: action.payload.username,
        token: action.payload.token, // Save token on login
      };
    case "LOGOUT":
      return {
        ...state,
        isLoggedIn: false,
        username: "",
        token: "", // Clear token on logout
      };
    default:
      return state;
  }
};

export default userReducer;
