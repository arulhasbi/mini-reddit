import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import { DocumentTextIcon } from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import { loadPosts, selectLoadPostsStatus, selectAllPosts } from "./postsSlice";
import { selectLoginStatus } from "../login/loginSlice";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons";

export const Posts = () => {
  const dispatch = useDispatch();
  const fetchStatus = useRef(false);
  const loginStatus = useSelector(selectLoginStatus);
  const allPosts = useSelector(selectAllPosts);
  const loadPostsStatus = useSelector(selectLoadPostsStatus);
  useEffect(() => {
    if (fetchStatus.current) return;
    if (loginStatus.accessToken) {
      dispatch(loadPosts({ where: "best", token: loginStatus.accessToken }));
      fetchStatus.current = true;
    }
  }, [loginStatus.accessToken, dispatch]);
  return (
    <PostsWrapper className="phone:ml-[-20px] phone:mr-[-20px] tablet:grow-[5] tablet:ml-[0px] tablet:mr-[0px]">
      <PostsMaxWidth>
        <section>
          <p className="px-5 py-3 antialiased font-extrabold text-lg flex gap-1 justify-center hover:cursor-pointer bg-indigo-800 drop-shadow-md">
            <span className="text-white">posts</span>
            <DocumentTextIcon className="w-5 text-amber-200" />
          </p>
          {!loadPostsStatus.isPending ? (
            <section>
              {allPosts &&
                allPosts.map((post, index) => (
                  <div
                    key={index}
                    className="min-h-[100px] my-5 px-3 pt-6 pb-3 bg-white shadow-sm border"
                  >
                    <div className="flex items-start gap-3 border-b pb-3 mb-5">
                      <span>
                        <DocumentTextIcon className="w-5 text-amber-200" />
                      </span>
                      <span className="text-gray-500">
                        Posted by u/{post.author}
                      </span>{" "}
                      <span className="ml-auto font-medium">
                        {post.subreddit_name}
                      </span>
                      <span className="text-gray-500">
                        {moment(new Date(post.created_utc * 1000)).fromNow()}
                      </span>
                    </div>
                    <p className="text-lg mt-2 mb-5">{post.title}</p>
                    <div>
                      <button className="flex gap-3 hover:bg-gray-200 px-2">
                        <span>
                          <FontAwesomeIcon icon={faComment} />
                        </span>
                        <span>{post.num_comments} Comments</span>
                      </button>
                    </div>
                  </div>
                ))}
            </section>
          ) : (
            <p className="py-7">Loading Posts...</p>
          )}
        </section>
      </PostsMaxWidth>
    </PostsWrapper>
  );
};

const PostsWrapper = styled.div``;
const PostsMaxWidth = styled.div``;
