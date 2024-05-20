export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGOUT = "LOGOUT";

export const loginSuccess = (username) => ({
  type: LOGIN_SUCCESS,
  payload: { username },
});

export const logout = () => ({
  type: LOGOUT,
});
