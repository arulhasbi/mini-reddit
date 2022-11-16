import React, { useState } from "react";
import styled from "styled-components";
import {
  ArrowSmallUpIcon,
  ArrowSmallDownIcon,
} from "@heroicons/react/24/solid";
import { selectLoginStatus } from "../login/loginSlice";
import { useDispatch, useSelector } from "react-redux";
import { updateVotes } from "./votesSlice";

export const Votes = (props) => {
  const [voteInitial, setVoteInitial] = useState(0);
  const dispatch = useDispatch();
  const [voteToggle, setVoteToggle] = useState({
    dir: "",
    status: false,
  });
  const loginStatus = useSelector(selectLoginStatus);
  const handleClickVote = (dir, id) => {
    if (dir === "up") {
      setVoteInitial(1);
    } else {
      setVoteInitial(-1);
    }
    const kind = {
      up: 1,
      down: -1,
    };
    dispatch(
      updateVotes({
        where: {
          dir: kind[dir],
          id: id,
        },
        token: loginStatus.accessToken,
      })
    );
    setVoteToggle((prevState) => {
      return {
        ...prevState,
        dir: dir,
        status: true,
      };
    });
  };
  const scoreConverter = (score) => {
    if (score >= 1000) {
      return `${(score / 1000).toFixed(1)}K`;
    }
    return score + voteInitial;
  };
  return (
    <VotesWrapper>
      <VotesMaxWidth>
        <section className="text-center flex flex-col gap-1 items-center">
          <button onClick={() => handleClickVote("up", props.postID)}>
            <ArrowSmallUpIcon
              className={`h-7 w-7 ${
                voteToggle.status && voteToggle.dir === "up"
                  ? "text-amber-600"
                  : "text-black"
              } hover:bg-gray-200`}
            />
          </button>
          <span
            className={`text-md font-bold ${
              !voteToggle.dir
                ? "text-black"
                : voteToggle.dir === "up"
                ? "text-amber-600"
                : "text-indigo-600"
            }`}
          >
            {scoreConverter(props.score)}
          </span>
          <button onClick={() => handleClickVote("down", props.postID)}>
            {" "}
            <ArrowSmallDownIcon
              className={`h-7 w-7 ${
                voteToggle.status && voteToggle.dir === "down"
                  ? "text-indigo-600"
                  : "text-black"
              } text-black hover:bg-gray-200`}
            />
          </button>
        </section>
      </VotesMaxWidth>
    </VotesWrapper>
  );
};

const VotesWrapper = styled.div``;
const VotesMaxWidth = styled.div``;
