export const getAuthCode = () => {
  const state = window.location.href.match(/state=([^&]*)/);
  const code = window.location.href.match(/code=([^#]*)/);
  if (state !== null && code !== null) {
    return {
      status: true,
      state: state[1],
      code: code[1],
    };
  }
  return {
    status: false,
  };
};

export const checkAccessToken = () => {
  const userAccess = JSON.parse(window.localStorage.getItem("user_access"));
  if (userAccess === null)
    return {
      status: false,
    };
  if (userAccess.hasOwnProperty("access_token")) {
    return {
      status: true,
      accessToken: userAccess.access_token,
    };
  }
  return {
    status: false,
  };
};
