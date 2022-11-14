import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { Header } from "../components/header/header";
import { Subreddits } from "../store/subreddits/subreddits";
import { Posts } from "../store/posts/posts";
import { Footer } from "../components/footer/footer";
import { getAuthCode, checkAccessToken } from "../api/util";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/login/loginSlice";
import { selectLoginStatus, setAccessToken } from "../store/login/loginSlice";

function App() {
  const fetchStatus = useRef(false);
  const loginStatus = useSelector(selectLoginStatus);
  const dispatch = useDispatch();
  useEffect(() => {
    if (fetchStatus.current) return;
    const check = checkAccessToken();
    if (check.status) {
      dispatch(setAccessToken(check.accessToken));
      return;
    }
    const auth = getAuthCode();
    if (auth.status) {
      dispatch(login(auth.code));
    }
    fetchStatus.current = true;
  }, [dispatch]);
  return (
    <>
      {loginStatus.isPending ? (
        <div className="p-10">
          <p>Authorizing...</p>
        </div>
      ) : (
        <AppWrapper className="py-7 px-5">
          <AppMaxWidth>
            <Header />
            <main className="mt-8 tablet:flex tablet:gap-5">
              <Posts />
              <Subreddits />
            </main>
            <footer className="phone:hidden tablet:block">
              <Footer />
            </footer>
          </AppMaxWidth>
        </AppWrapper>
      )}
    </>
  );
}

const AppWrapper = styled.div``;
const AppMaxWidth = styled.div``;

export default App;
