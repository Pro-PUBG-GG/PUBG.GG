//packages & components
import styled from "styled-components";
import { GlobalStyle } from "./Main";
import Header from "../component/Header";
//assets

//styled-components
const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: #d9d9d9;
  margin: 0;
  padding: 0;
`;

export default function PatchPage(){
    return(
        <>
            <GlobalStyle />
            <Container>
                <Header name="patch" />
            </Container>
        </>
    )
}