import React from "react";
import styled from "styled-components";
import moment from "moment";

export const Comments = (props) => {
  return (
    <CommentsWrapper>
      <CommentsMaxWidth>
        <section>
          {props.comments.map((comment, index) => {
            return (
              <div key={index} className="mb-5 border p-3 bg-gray-100">
                <div className="phone:flex phone:flex-col phone:mb-2 tablet:flex tablet:flex-row tablet:justify-between">
                  <span className="text-gray-600 font-bold">
                    {comment.author}
                  </span>
                  <span className="text-gray-500">
                    {moment(new Date(comment.created_utc * 1000)).fromNow()}
                  </span>
                </div>
                <p className="w-auto">{comment.content}</p>
              </div>
            );
          })}
        </section>
      </CommentsMaxWidth>
    </CommentsWrapper>
  );
};

const CommentsWrapper = styled.div``;
const CommentsMaxWidth = styled.div``;
