import React from "react";

import "./index.css";
import styled from "styled-components";
import Introduction from "./components/introduction/Introduction";

import BackgroundImg from "./assets/KakaoTalk_20241204_204236812.png";

const App = () => {
    return(
        <StCotainer>
            <Introduction/>
        </StCotainer>

        )
}
const StCotainer = styled.main`
  width: auto;
  height: 100vh;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-left: 50px;
    background-image: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.9)),
    url(${BackgroundImg});  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: relative;
`;


export default App