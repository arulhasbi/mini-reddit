import React from "react";
import styled from "styled-components";
import { DocumentTextIcon } from "@heroicons/react/24/solid";

export const Posts = () => {
  return (
    <PostsWrapper className="bg-indigo-800 drop-shadow-md phone:ml-[-20px] phone:mr-[-20px] tablet:grow-[5] tablet:ml-[0px] tablet:mr-[0px] tablet:rounded-lg">
      <PostsMaxWidth>
        <section>
          <p className="px-5 py-3 antialiased font-extrabold text-lg flex gap-1 justify-center hover:cursor-pointer">
            <span className="text-white">posts</span>
            <DocumentTextIcon className="w-5 text-amber-200" />
          </p>
        </section>
      </PostsMaxWidth>
    </PostsWrapper>
  );
};

const PostsWrapper = styled.div``;
const PostsMaxWidth = styled.div``;
