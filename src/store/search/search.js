import React, { useState } from "react";
import styled from "styled-components";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import { loadSearches, setSearchStatus } from "./searchSlice";
import { selectLoginStatus } from "../login/loginSlice";

export const Search = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const loginStatus = useSelector(selectLoginStatus);
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!search) {
      dispatch(setSearchStatus(false));
      return;
    }
    dispatch(
      loadSearches({
        where: {
          q: search,
        },
        token: loginStatus.accessToken,
      })
    );
    dispatch(setSearchStatus(true));
  };
  return (
    <SearchWrapper className="mt-5 tablet:mt-0">
      <SearchMaxWidth>
        <form onSubmit={handleSearchSubmit}>
          <div className="form-control flex gap-2 items-center justify-center">
            <input
              className="rounded-lg h-8 shadow-sm"
              type="text"
              name="search"
              placeholder="Search on reddit"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button type="submit" className="w-8">
              <MagnifyingGlassIcon className="w-full text-black" />
            </button>
          </div>
        </form>
      </SearchMaxWidth>
    </SearchWrapper>
  );
};

const SearchWrapper = styled.div``;
const SearchMaxWidth = styled.div``;
