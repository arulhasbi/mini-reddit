import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { Header } from "../components/header/header";
import { Subreddits } from "../store/subreddits/subreddits";
import { Posts } from "../store/posts/posts";
import { Searches } from "../components/searches/searches";
import { Footer } from "../components/footer/footer";
import { getAuthCode, checkAccessToken } from "../api/util";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/login/loginSlice";
import { selectLoginStatus, setAccessToken } from "../store/login/loginSlice";
import { selectSearchStatus } from "../store/search/searchSlice";

//experimental
import { selectPhone } from "../store/responsive/responsiveSlice";

function App() {
  const fetchStatus = useRef(false);
  const loginStatus = useSelector(selectLoginStatus);
  const searchStatus = useSelector(selectSearchStatus);
  const dispatch = useDispatch();

  const isPhone = useSelector(selectPhone);

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
        <AppWrapper
          className={`py-7 desktop:px-5 desktop:ml-0 phone:w-full phone:duration-700 ${
            isPhone ? "phone:ml-[300px]" : "phone:ml-[0px]"
          } phone:transition-spacing desktop:transition-none`}
        >
          <AppMaxWidth>
            <Header />
            <main className="mt-5 tablet:flex tablet:gap-5">
              {searchStatus ? <Searches /> : <Posts />}
              {loginStatus.accessToken && <Subreddits />}
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
