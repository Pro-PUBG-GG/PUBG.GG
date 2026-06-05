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

const Box = styled.div`
    width: 1275px;
    height: 650px;
    background-color: rgba(255, 255, 255, 0.15);
    border: 1px solid rgba(255, 255, 255, 0.2);
    margin-left: 322.5px;
    margin-top: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    padding: 20px;
    box-sizing: border-box;
`

const Change = styled.button`
    color: #ffffff;
    font-size: 30px;
    margin-top: -45%;
`

const ContentWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 90%;
  height: 60%;
  position: relative;
`;

const PartSlot = styled.div`
  width: 80px;
  height: 80px;
  background-color: rgba(255, 255, 255, 0.3); 
  border: 1px solid rgba(255, 255, 255, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const GunImage = styled.img`
  max-width: 60%;
  height: auto;
  object-fit: contain;
`;

export default function SimulationPage() {
    return (
        <>
            <GlobalStyle />
            <Container>
                <Header name="sim" />
                <Box>
                    <Change>총기변경 ⇄</Change>
                    <PartSlot>
                        {/* 여기에 파츠 아이콘/이미지 들어갈 자리 */}
                    </PartSlot>

                    <GunImage src="akm.svg" alt="Gun" />

                    <PartSlot>
                        {/* 여기에 파츠 아이콘/이미지 들어갈 자리 */}
                    </PartSlot>
                </Box>

            </Container>
        </>
    )
}