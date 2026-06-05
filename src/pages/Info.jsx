//packages & components
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { GlobalStyle } from "./Main";
import Header from "../component/Header";
//assets
import logo from "../assets/logo.svg";
//styled-components
const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: #d9d9d9;
  margin: 0;
  padding: 0;
`;

export default function InfoPage() {
    const navigate = useNavigate();
  return (
    <>
      <GlobalStyle />
      <Container>
        <Header name="info" />
      </Container>
    </>
  );
}
