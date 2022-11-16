// required parameters for reddit URL
const client_id = "-FyI6jV3CPgrSIWAkaUUiQ";
const client_secret = "DFa5xnHIp3xM9oh4m-L-ssheORGo6A";
const response_type = "code";
export const state = "8477052678";
const redirect_uri = "http://localhost:3000/callback/";
const duration = "permanent";
const scope = "read vote";

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
