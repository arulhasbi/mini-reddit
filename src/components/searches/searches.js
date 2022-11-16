import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import styled from "styled-components";

import moment from "moment/moment";

import { DocumentTextIcon } from "@heroicons/react/24/solid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons";

import { Comments } from "../../store/comments/comments";
import { Votes } from "../../store/votes/votes";

import {
  selectAllSearches,
  selectLoadSearchesStatus,
} from "../../store/search/searchSlice";

import {
  loadComments,
  selectLoadCommentsStatus,
  selectAllComments,
  setPostID,
  selectPostID,
} from "../../store/comments/commentsSlice";

import { selectLoginStatus } from "../../store/login/loginSlice";

export const Searches = () => {
  const dispatch = useDispatch();

  const [commentToggle, setCommentToggle] = useState(false);
  const allComments = useSelector(selectAllComments);
  const loadCommentsStatus = useSelector(selectLoadCommentsStatus);

  const allSearches = useSelector(selectAllSearches);
  const loadSearchesStatus = useSelector(selectLoadSearchesStatus);

  const loginStatus = useSelector(selectLoginStatus);

  const postID = useSelector(selectPostID);

  const handleLoadComments = (post_id, subreddit_id) => {
    if (commentToggle) {
      setCommentToggle(false);
      return;
    }
    dispatch(
      loadComments({
        where: {
          article: post_id,
          subreddit: subreddit_id,
        },
        token: loginStatus.accessToken,
      })
    );
    dispatch(setPostID(post_id));
    setCommentToggle(true);
  };
  return (
    <SearchesWrapper className="phone:ml-[-20px] phone:mr-[-20px] tablet:grow-[5] tablet:ml-[0px] tablet:mr-[0px]">
      <SearchesMaxWidth>
        <section>
          <p className="px-5 py-3 antialiased font-extrabold text-lg flex gap-1 justify-center hover:cursor-pointer bg-indigo-800">
            <span className="text-white">search result</span>
            <DocumentTextIcon className="w-5 text-amber-200" />
          </p>
          {!loadSearchesStatus.isPending ? (
            <section>
              <section>
                {allSearches &&
                  allSearches.map((post, index) => (
                    <div
                      key={index}
                      className="min-h-[100px] my-5 px-3 pt-6 pb-3 bg-white shadow-sm border"
                    >
                      <div className="flex gap-5">
                        <div className="px-2 flex items-center border bg-white rounded-xl">
                          <Votes score={post.score} postID={post.post_id} />
                        </div>
                        <div className="grow">
                          <div className="flex items-start gap-3 border-b pb-3 mb-5">
                            <span>
                              <DocumentTextIcon className="w-5 text-amber-200" />
                            </span>
                            <span className="text-gray-500 hover:underline hover:decoration-1 hover:cursor-pointer">
                              Posted by u/{post.author}
                            </span>{" "}
                            <button
                              className="ml-auto hover:bg-gray-200 px-2"
                              type="button"
                            >
                              <span className="font-medium">
                                {post.subreddit_name}
                              </span>
                            </button>
                            <span className="text-gray-500">
                              {moment(
                                new Date(post.created_utc * 1000)
                              ).fromNow()}
                            </span>
                          </div>
                          <p className="text-lg mt-2 mb-5">{post.title}</p>
                          <div className="flex justify-end">
                            <button className="flex gap-3 hover:bg-gray-200 px-2">
                              <span>
                                <FontAwesomeIcon icon={faComment} />
                              </span>
                              <span
                                className="text-gray-600"
                                onClick={() =>
                                  handleLoadComments(
                                    post.post_id,
                                    post.subreddit_name
                                  )
                                }
                              >
                                {post.num_comments} Comments
                              </span>
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="mt-5">
                        {loadCommentsStatus.isPending &&
                          postID === post.post_id && <p>Loading Comments...</p>}
                        {!loadCommentsStatus.isPending &&
                          allComments.length > 0 &&
                          postID === post.post_id &&
                          commentToggle && <Comments comments={allComments} />}
                      </div>
                    </div>
                  ))}
              </section>
            </section>
          ) : (
            <p className="py-7">Loading Search Result...</p>
          )}
        </section>
      </SearchesMaxWidth>
    </SearchesWrapper>
  );
};

const SearchesWrapper = styled.div``;
const SearchesMaxWidth = styled.div``;
