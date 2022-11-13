import React from "react";
import styled from "styled-components";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

export const Search = () => {
  return (
    <SearchWrapper className="mt-3 tablet:mt-0">
      <SearchMaxWidth>
        <form>
          <div className="form-control flex gap-2 items-center justify-center">
            <input
              className="rounded-lg h-8 shadow-sm"
              type="text"
              name="search"
              placeholder="Search"
            />
            <button type="button" className="w-8">
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
