import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { BoltIcon } from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import { selectLoginStatus } from "../login/loginSlice";
import { loadSubreddits } from "./subredditsSlice";
import {
  selectAllSubreddits,
  selectLoadSubredditsStatus,
} from "./subredditsSlice";
import { loadPostsBasedOnSubreddit } from "../posts/postsSlice";

import { selectPhone } from "../responsive/responsiveSlice";

export const Subreddits = (props) => {
  const dispatch = useDispatch();
  const fetchStatus = useRef(false);
  const loginStatus = useSelector(selectLoginStatus);
  const allSubreddits = useSelector(selectAllSubreddits);
  const loadSubredditsStatus = useSelector(selectLoadSubredditsStatus);

  const isPhone = useSelector(selectPhone);

  useEffect(() => {
    if (fetchStatus.current) return;
    if (loginStatus.accessToken) {
      dispatch(
        loadSubreddits({ where: "popular", token: loginStatus.accessToken })
      );
      fetchStatus.current = true;
    }
  }, [loginStatus.accessToken, dispatch]);
  const handleClickSubreddit = (name) => {
    dispatch(
      loadPostsBasedOnSubreddit({
        name: name,
        token: loginStatus.accessToken,
      })
    );
  };
  return (
    <SubredditsWrapper>
      <SubredditsMaxWidth>
        <section>
          <p className="phone:bg-white px-5 py-3 antialiased font-extrabold text-lg flex justify-start desktop:justify-center hover:cursor-pointer desktop:bg-indigo-800 desktop:mb-3">
            <span className="phone:text-indigo-800 desktop:text-white">
              sub
            </span>
            <BoltIcon className="w-5 text-amber-200" />
            <span className="text-red-400">reddit</span>
          </p>
          {!loadSubredditsStatus.isPending ? (
            <section className="desktop:rounded-lg">
              {allSubreddits &&
                allSubreddits.map((subreddit, index) => (
                  <button
                    key={index}
                    className="block w-full flex items-center gap-1 px-2 py-2 bg-white hover:underline hover:decoration-1"
                    onClick={() => handleClickSubreddit(subreddit.name)}
                  >
                    <span>
                      <BoltIcon className="w-5 text-amber-200" />
                    </span>
                    {subreddit.name}
                  </button>
                ))}
            </section>
          ) : (
            <p className="py-4">Loading Subreddits...</p>
          )}
        </section>
      </SubredditsMaxWidth>
    </SubredditsWrapper>
  );
};

const SubredditsWrapper = styled.div``;
const SubredditsMaxWidth = styled.div``;
