//packages & components
import { useNavigate } from "react-router-dom";
import { createGlobalStyle, styled } from "styled-components";

//assets
import logo from "../assets/logo.svg";
import back_image from "../assets/main.png";

//styled-components
export const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }
  html, body {
    margin: 0;
    padding: 0;
    overflow-x: hidden;
  }
  body {
    font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    background: #F7F7F5;
    color: #222;
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
  }
  img, video, svg {
    display: block;
    max-width: 100%;
  }
  a {
    text-decoration: none;
    color: inherit;
  }
  button {
    border: none;
    cursor: pointer;
    font-family: inherit;
    background: none;  /* 추가 */
  }
`;
const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: url(${back_image}) center/cover no-repeat;
  margin: 0;
  padding: 0;
`;
const Header = styled.div`
  display: flex;
  align-items: center;
  margin: 0;
  padding: 0 100px;
  width: 100%;
  height: 70px;
  background: rgba(217, 217, 217, 0.4);
`;
const LogoWapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 32px;
  height: 32px;
  flex-shrink: 0;
  cursor: pointer;
`;
const Logo = styled.img`
  margin-left: 1px;
  margin-bottom: 3px;
  width: 30px;
  height: 30px;
  position: relative;
  z-index: 2;
`;
const LogoText = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 28px;
  font-weight: 700;
  color: white;
  white-space: nowrap;
  z-index: 1;
`;
const NavWapper = styled.div`
  display: flex;
  gap: 70px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`;
const NavText = styled.span`
    font-size: 28px;
    font-weight: 700;
    color: white;
    cursor: pointer;
`;

export default function MainPage() {
    const navigate = useNavigate();
  return (
    <>
      <GlobalStyle />
      <Container>
        <Header>
          <LogoWapper>
            <Logo src={logo} alt="logo" />
            <LogoText>PUBG.GG</LogoText>
          </LogoWapper>
          <NavWapper>
            <NavText onClick={() => navigate("/info")}>백과사전</NavText>
            <NavText onClick={() => navigate("/sim")}>파츠 시뮬레이터</NavText>
            <NavText onClick={() => navigate("/prefer")}>선호도</NavText>
            <NavText onClick={() => navigate("/patch")}>패치노트</NavText>
          </NavWapper>
        </Header>
      </Container>
    </>
  );
}
