export const LoginStart = userCredentials => ({
  type: "LOGIN_START",
});

export const LoginSuccess = user => ({
  type: "LOGIN_SUCCESS",
  payload: userCredentials,
});

export const LoginFail = error => ({
  type: "LOGIN_FAIL",
  payload: error,
});

export const Follow = userId => ({
  type: "FOLLOWED",
  payload: userId,
});

export const Unfollow = userId => ({
  type: "UNFOLLOWED",
  payload: userId,
});

export const LogoutSuccess = user => ({
  type: "LOGOUT",
});

export const Edit = img => ({
  type: "EDIT",
  payload: img,
});
