import React from "react";
import styled from "styled-components";
import { Header } from "../components/header/header";
import { Subreddits } from "../store/subreddits/subreddits";
import { Posts } from "../store/posts/posts";
import { Footer } from "../components/footer/footer";

function App() {
  return (
    <AppWrapper className="p-5">
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
