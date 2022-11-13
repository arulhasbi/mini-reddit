import React from "react";
import styled from "styled-components";
import { Header } from "../components/header/header";
import { Subreddits } from "../store/subreddits/subreddits";
import { Posts } from "../store/posts/posts";
import { Footer } from "../components/footer/footer";
import { useDispatch } from "react-redux";
import { login } from "../store/login/loginSlice";

function App() {
  const dispatch = useDispatch();
  const stateFromURL = window.location.href.match(/state=([^&]*)/);
  const codeFromURL = window.location.href.match(/code=([^#]*)/);
  if (stateFromURL !== null && codeFromURL !== null) {
    dispatch(login(codeFromURL[1]));
  }
  return (
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
  );
}

export default App;

const AppWrapper = styled.div``;
const AppMaxWidth = styled.div``;
