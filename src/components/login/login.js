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

  const handleLogout = () => {
    let confirmation = prompt(
      "Are you sure want to logout? type [yes] to proceed."
    );
    if (confirmation === "yes") {
      window.localStorage.removeItem("user_access");
      if (process.env.NODE_ENV === "development") {
        window.location.replace(process.env.REACT_APP_ROOT_DEV);
      }
      if (process.env.NODE_ENV === "production") {
        window.location.replace(process.env.REACT_APP_ROOT_PROD);
      }
    }
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
            className="font-bold text-sm text-white bg-indigo-600 py-2 px-5 rounded-3xl shadow-md hover:cursor-pointer"
            onClick={handleLogout}
          >
            Log out
          </button>
        )}
      </LoginMaxWidth>
    </LoginWrapper>
  );
};

const LoginWrapper = styled.div``;
const LoginMaxWidth = styled.div``;
