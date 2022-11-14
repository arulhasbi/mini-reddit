const base = "https://oauth.reddit.com";

export const getSubreddits = async (where, token) => {
  const response = await fetch(`${base}/subreddits/${where}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const json = await response.json();
  return json;
};

export const getPosts = async (where, token) => {
  const response = await fetch(`${base}/${where}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const json = await response.json();
  return json;
};
