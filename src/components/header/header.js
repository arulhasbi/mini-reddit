import React from "react";
import styled from "styled-components";
import redditLogo from "../../assets/reddit_logo.png";
import { Search } from "../../store/search/search";

export const Header = () => {
  return (
    <HeaderWrapper className="min-h-max max-w-[400px] ml-auto mr-auto">
      <HeaderMaxWidth>
        <nav className="tablet:flex tablet:items-center tablet:justify-between">
          <div className="text-center flex phone:flex-col tablet:flex-row items-center gap-2">
            <figure className="w-28">
              <img
                className="w-full inline-block drop-shadow-md"
                src={redditLogo}
                alt="reddit logo"
              />
            </figure>
          </div>
          <Search />
        </nav>
      </HeaderMaxWidth>
    </HeaderWrapper>
  );
};

const HeaderWrapper = styled.div``;
const HeaderMaxWidth = styled.div``;
