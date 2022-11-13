import React from "react";
import styled from "styled-components";
import { BoltIcon } from "@heroicons/react/24/solid";

export const Subreddits = () => {
  return (
    <SubredditsWrapper className="bg-indigo-800 drop-shadow-md phone:w-full phone:fixed phone:bottom-0 phone:left-0 tablet:static tablet:grow tablet:w-auto tablet:shrink-0 tablet:rounded-lg">
      <SubredditsMaxWidth>
        <section>
          <p className="px-5 py-3 antialiased font-extrabold text-lg flex justify-center hover:cursor-pointer">
            <span className="text-white">sub</span>
            <BoltIcon className="w-5 text-amber-200" />
            <span className="text-red-400">reddit</span>
          </p>
        </section>
      </SubredditsMaxWidth>
    </SubredditsWrapper>
  );
};

const SubredditsWrapper = styled.div``;
const SubredditsMaxWidth = styled.div``;
