//packages & components
import styled from "styled-components"
import { GlobalStyle } from "./Main"
import Header from "../component/Header"
//assets
import logo from "../assets/logo.svg"
import back_image from "../assets/Simulation.png"
//styled-components
const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: url(${back_image}) center/cover no-repeat;
  margin: 0;
  padding: 0;
`;

export default function SimulationPage(){
    return(
        <>
            <GlobalStyle />
            <Container>
                <Header name="sim" />
            </Container>
        </>
    )
}