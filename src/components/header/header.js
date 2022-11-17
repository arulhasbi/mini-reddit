import React from "react";
import styled from "styled-components";
import redditLogo from "../../assets/reddit_logo.png";
import { Search } from "../../store/search/search";
import { Login } from "../login/login";
import "../../api/util";
import { BoltIcon } from "@heroicons/react/24/solid";

// experimental
import { setPhone } from "../../store/responsive/responsiveSlice";
import { selectPhone } from "../../store/responsive/responsiveSlice";
import { useDispatch, useSelector } from "react-redux";

import { selectLoginStatus } from "../../store/login/loginSlice";

export const Header = () => {
  const dispatch = useDispatch();
  const isPhone = useSelector(selectPhone);
  const showSubreddit = () => {
    dispatch(setPhone(!isPhone));
  };
  const loginStatus = useSelector(selectLoginStatus);
  return (
    <HeaderWrapper className="min-h-max">
      <HeaderMaxWidth>
        <nav className="tablet:flex tablet:items-center tablet:justify-center gap-5 mb-5 desktop:mb-0">
          <div className="text-center flex phone:flex-row items-center justify-center gap-3">
            <figure className="w-28">
              <img
                className="w-full inline-block drop-shadow-md relative"
                src={redditLogo}
                alt="reddit logo"
              />
            </figure>
            <Login />
          </div>
          <Search />
        </nav>
        {loginStatus.accessToken && (
          <div className="flex justify-start tablet:mt-0">
            <button
              type="button"
              onClick={showSubreddit}
              className="antialiased font-extrabold flex justify-center drop-shadow-md hover:cursor-pointer px-3 flex desktop:hidden"
            >
              <span className="text-indigo-800">click for sub</span>
              <BoltIcon className="w-5 text-amber-200" />
              <span className="text-red-400">reddit</span>
            </button>
          </div>
        )}
      </HeaderMaxWidth>
    </HeaderWrapper>
  );
};

const HeaderWrapper = styled.div``;
const HeaderMaxWidth = styled.div``;
