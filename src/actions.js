export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGOUT = "LOGOUT";

export const loginSuccess = (username, token) => ({
  type: LOGIN_SUCCESS,
  payload: { username, token },
});

export const logout = () => ({
  type: LOGOUT,
});
