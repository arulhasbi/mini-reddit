import React from "react";
import styled from "styled-components";
import { authorization } from "../../api/reddit";

export const Login = () => {
  const handleLogin = () => {
    authorization();
  };
  return (
    <LoginWrapper className="text-center mr-2">
      <LoginMaxWidth>
        <button
          type="button"
          className="font-bold text-sm text-white bg-amber-600 py-2 px-5 rounded-3xl shadow-md"
          onClick={handleLogin}
        >
          Log In
        </button>
      </LoginMaxWidth>
    </LoginWrapper>
  );
};

const LoginWrapper = styled.div``;
const LoginMaxWidth = styled.div``;
