// packages & components
import { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { GlobalStyle } from "./Main";
import Header from "../component/Header";
import WeaponInfoPage from "../component/WeaponInfo";
import PartsInfoPage from "../component/PartsInfo";
import ItemInfoPage from "../component/ItemsInfo";
import RideInfoPage from "../component/RideInfo";


// styled-components
const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: #d9d9d9;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
`;

const MainContainer = styled.div`
  width: 100%;
  height: 80%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const Nav = styled.div`
  display: flex;
  width: 100%;
  height: 100px;
  align-items: center;
  justify-content: center;
  gap: 100px;
  flex-shrink: 0;
`;

const NavText = styled.span`
  color: ${(props) => (props.$active ? "#F2A900" : "#000000")};
  text-align: center;
  font-family: Inter;
  font-size: 32px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  cursor: pointer;
  transition: color 0.2s ease;
`;

const DataWapper = styled.div`
  width: 100%;
  flex: 1;
  overflow-y: auto;
  padding: 10px 80px;
  box-sizing: border-box;

  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background: #a0a0a0;
    border-radius: 4px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
`;

export default function InfoPage() {
  const [activeTab, setActiveTab] = useState("총기");

  return (
    <>
      <GlobalStyle />
      <Container>
        <Header name="info" />
        <MainContainer>
          <Nav>
            <NavText $active={activeTab === "총기"} onClick={() => setActiveTab("총기")}>총기</NavText>
            <NavText $active={activeTab === "파츠"} onClick={() => setActiveTab("파츠")}>파츠</NavText>
            <NavText $active={activeTab === "힐템"} onClick={() => setActiveTab("힐템")}>힐템</NavText>
            <NavText $active={activeTab === "탈것"} onClick={() => setActiveTab("탈것")}>탈것</NavText>
          </Nav>

          <DataWapper>
            {/* --- 1️⃣ 총기 탭 데이터 영역 --- */}
            {activeTab === "총기" && (
              <WeaponInfoPage />
            )}
            {activeTab === "파츠" && (
              <PartsInfoPage />
            )}
            {activeTab === "힐템" && (
              <ItemInfoPage />
            )}
            {activeTab === "탈것" && (
              <RideInfoPage />
            )}
          </DataWapper>
        </MainContainer>
      </Container>
    </>
  );
}