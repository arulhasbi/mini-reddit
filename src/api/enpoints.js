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
  const response = await fetch(`${base}/${where.kind}?limit=${where.limit}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const json = await response.json();
  return json;
};

export const getPostsBasedOnSubreddit = async (where, token) => {
  const response = await fetch(`${base}/${where}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const json = await response.json();
  return json;
};

export const getComments = async (where, token) => {
  const response = await fetch(
    `${base}/${where.subreddit}/comments/${where.article}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const json = await response.json();
  return json;
};

export const postVotes = async (where, token) => {
  const param = new URLSearchParams({
    id: `t3_${where.id}`,
    dir: Number(where.dir).toString(),
  });
  const response = await fetch(`${base}/api/vote`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: param.toString(),
  });
  const json = response.json();
  return json;
};

export const getSearch = async (where, token) => {
  const response = await fetch(
    `${base}/search?q=${where.q}&restrict_sr=false&limit=${
      where.limit ? where.limit : 5
    }&sort=top`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const json = await response.json();
  return json;
};
