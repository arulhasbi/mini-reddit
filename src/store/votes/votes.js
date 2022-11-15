import React from "react";
import styled from "styled-components";
import {
  ArrowSmallUpIcon,
  ArrowSmallDownIcon,
} from "@heroicons/react/24/solid";

export const Votes = (props) => {
  const handleClickVote = (kind) => {
    if (kind === "up") {
      console.log(kind);
    } else {
      console.log(kind);
    }
  };
  return (
    <VotesWrapper>
      <VotesMaxWidth>
        <section className="text-center flex flex-col gap-1 items-center">
          <button onClick={() => handleClickVote("up")}>
            <ArrowSmallUpIcon className="h-7 w-7 text-black hover:bg-gray-200" />
          </button>
          <span className="text-md font-bold">
            {(props.score / 1000).toFixed(1)}K
          </span>
          <button onClick={() => handleClickVote("down")}>
            {" "}
            <ArrowSmallDownIcon className="h-7 w-7 text-black hover:bg-gray-200" />
          </button>
        </section>
      </VotesMaxWidth>
    </VotesWrapper>
  );
};

const VotesWrapper = styled.div``;
const VotesMaxWidth = styled.div``;
