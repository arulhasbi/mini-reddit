import React from "react";
import styled from "styled-components";
import redditLogo from "../../assets/reddit_logo.png";
import { Search } from "../../store/search/search";
import { Login } from "../login/login";
import "../../api/util";

export const Header = () => {
  return (
    <HeaderWrapper className="min-h-max">
      <HeaderMaxWidth>
        <nav className="tablet:flex tablet:items-center tablet:justify-center gap-5">
          <div className="text-center flex phone:flex-row items-center justify-center gap-3">
            <figure className="w-28">
              <img
                className="w-full inline-block drop-shadow-md"
                src={redditLogo}
                alt="reddit logo"
              />
            </figure>
            <Login />
          </div>
          <Search />
        </nav>
      </HeaderMaxWidth>
    </HeaderWrapper>
  );
};

const HeaderWrapper = styled.div``;
const HeaderMaxWidth = styled.div``;
