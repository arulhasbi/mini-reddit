// required parameters for reddit URL
let client_id = "";
let client_secret = "";
const response_type = "code";
export const state = "8477052678";
let redirect_uri = "";
const duration = "permanent";
const scope = "read vote";

if (process.env.NODE_ENV === "development") {
  client_id = process.env.REACT_APP_REDDIT_CLIENT_ID_DEV;
  client_secret = process.env.REACT_APP_REDDIT_CLIENT_SECRET_DEV;
  redirect_uri = process.env.REACT_APP_CALLBACK_DEV;
}

if (process.env.NODE_ENV === "production") {
  client_id = process.env.REACT_APP_REDDIT_CLIENT_ID_PROD;
  client_secret = process.env.REACT_APP_REDDIT_CLIENT_SECRET_PROD;
  redirect_uri = process.env.REACT_APP_CALLBACK_PROD;
}

export const authorization = () => {
  const authorizationURL = `https://www.reddit.com/api/v1/authorize?client_id=${client_id}&response_type=${response_type}&state=${state}&redirect_uri=${redirect_uri}&duration=${duration}&scope=${scope}`;
  window.location.href = authorizationURL;
};

export const loadAccessToken = async (code) => {
  const credentials = btoa(`${client_id}:${client_secret}`);
  const param = new URLSearchParams({
    code: code,
    grant_type: "authorization_code",
    redirect_uri: redirect_uri,
  });
  const response = await fetch("https://www.reddit.com/api/v1/access_token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${credentials}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: param.toString(),
  });
  const json = await response.json();
  return json;
};
