import React from "react";
import styled from "styled-components";
import { authorization } from "../../api/reddit-auth";
import { useSelector } from "react-redux";
import { selectLoginStatus } from "../../store/login/loginSlice";

export const Login = () => {
  const loginStatus = useSelector(selectLoginStatus);
  const handleLogin = () => {
    authorization();
  };

  return (
    <LoginWrapper className="text-center mr-2">
      <LoginMaxWidth>
        {!loginStatus.accessToken ? (
          <button
            type="button"
            className="font-bold text-sm text-white bg-amber-600 py-2 px-5 rounded-3xl shadow-md"
            onClick={handleLogin}
          >
            Authorize me
          </button>
        ) : (
          <button
            type="button"
            className="font-bold text-sm text-white bg-gray-400 py-2 px-5 rounded-3xl shadow-md"
            disabled
          >
            Authorized
          </button>
        )}
      </LoginMaxWidth>
    </LoginWrapper>
  );
};

const LoginWrapper = styled.div``;
const LoginMaxWidth = styled.div``;
