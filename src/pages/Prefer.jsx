import styled from "styled-components";
import { GlobalStyle } from "./Main";
import Header from "../component/Header";
import PreferImg from "../assets/Prefer.png"; 
import React, { useState } from "react";

import SgImg from "../assets/weapons/DBS.svg";
import ArImg from "../assets/weapons/groza.svg";
import SmgImg from "../assets/weapons/P90.svg";
import SrImg from "../assets/weapons/AWM.svg"; 
import DmrImg from "../assets/weapons/Mk14.svg";

import MapImg1 from "../assets/map/erangel.png";
import MapImg2 from "../assets/map/mirama.png";
import MapImg3 from "../assets/map/taego.png";
import MapImg4 from "../assets/map/sanok.png";
import MapImg5 from "../assets/map/vikendi.png";
import MapImg6 from "../assets/map/deston.png";
import MapImg7 from "../assets/map/rondo.png";
import MapImg8 from "../assets/map/paramo.png";
import MapImg9 from "../assets/map/Karakin.png";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: #d9d9d9;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const Background = styled.div`
  position: relative;
  width: 100%;
  height: calc(100vh - 60px); 
  background-image: url(${PreferImg});
  background-size: cover;     
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
`;

/* ==========================================================================
   메뉴바(Nav) 스타일 영역 - 레이아웃 고정 및 시각 효과만 부여
   ========================================================================== */
const Nav = styled.div`
  display: flex;
  width: 100%;
  height: 100px;             /* 높이를 절대 변하지 않게 100px로 고정합니다 */
  align-items: center;
  justify-content: center;
  gap: 100px;
  flex-shrink: 0;
  z-index: 10;
  transition: opacity 0.3s ease;

  /* 맵 영역에 호버하면 메뉴바를 살짝 투명하게 만들어 콘텐츠에 집중시킵니다 */
  &:has(+ #map-content-zone:hover) {
    opacity: 0.6;
  }
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
  transition: color 0.2s ease, font-size 0.3s ease, transform 0.3s ease;

  /* 물리적 높이를 줄이는 대신, 글자 크기만 미세하게 줄여 꿀렁임을 원천 차단합니다 */
  Nav:has(+ #map-content-zone:hover) & {
    font-size: 28px;
    transform: translateY(2px);
  }
`;

/* ==========================================================================
   캐러셀 스타일 영역 (총기 티어)
   ========================================================================== */
const CarouselContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  flex: 1;
  position: relative;
  overflow: hidden;
`;

const ArrowButton = styled.button`
  background: transparent;
  border: none;
  color: white;
  font-size: 60px;
  cursor: pointer;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 5;
  user-select: none;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.7;
  }

  ${(props) => props.$direction === "left" && "left: 40px;"}
  ${(props) => props.$direction === "right" && "right: 40px;"}
`;

const CardSlider = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 30px;
  width: 80%;
  height: 80%;
`;

const Card = styled.div`
  flex: 1;
  max-width: ${(props) => (props.$isCenter ? "400px" : "320px")};
  height: ${(props) => (props.$isCenter ? "90%" : "75%")};
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.4);
  box-sizing: border-box;
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  position: relative;
  
  opacity: ${(props) => (props.$isCenter ? "1" : "0.4")};
  transform: ${(props) => (props.$isCenter ? "scale(1)" : "scale(0.95)")};
  filter: ${(props) => (props.$isCenter ? "none" : "blur(1px)")};
  transition: all 0.4s ease-in-out;
`;

const CardTitle = styled.h2`
  color: #ffffff;
  font-family: Inter;
  font-size: ${(props) => (props.$isCenter ? "38px" : "32px")};
  font-weight: 900;
  margin: 0 0 20px 0;
`;

const GunImage = styled.img`
  width: 100%;
  height: auto;
  object-fit: contain;
  margin-top: auto;
  margin-bottom: auto;
  transform: rotate(-15deg); 
`;

/* ==========================================================================
   맵 스타일 영역 (9분할 스트립 & 깔끔한 고정 호버 효과)
   ========================================================================== */
const MapWrapper = styled.div`
  display: flex;
  width: 92%;             
  max-width: 1440px;      
  height: 52%;            /* 맵 영역 전체 높이 고정 */
  margin: 40px auto auto auto; /* 상단 여백을 명확하게 밀어주어 균형 배치 */          
  padding-bottom: 60px;
  box-sizing: border-box;
  gap: 12px; 
`;

const MapItem = styled.div`
  flex: 1; 
  position: relative;
  overflow: visible;      
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 8px;     
  cursor: pointer;
  transform-origin: center; 
  transition: flex 0.35s cubic-bezier(0.25, 1, 0.5, 1), 
              transform 0.35s cubic-bezier(0.25, 1, 0.5, 1), 
              border-color 0.3s ease;

  &:hover {
    flex: 1.15;           /* 너무 넓어지지 않고 살짝만 늘어남 */
    border-color: #F2A900;
    transform: scaleY(1.05); /* 세로 확장 비율을 더 안정감 있게 축소 */
    z-index: 5;           
  }
`;

const MapImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover; 
  border-radius: 7px;     
  filter: brightness(0.45); 
  transition: filter 0.35s ease;

  ${MapItem}:hover & {
    filter: brightness(0.65);
  }
`;

const GaugeOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 0; 
  border-radius: 0 0 7px 7px; 
  background: linear-gradient(to top, rgba(242, 169, 0, 0.9), rgba(242, 169, 0, 0.3));
  transition: height 0.5s cubic-bezier(0.25, 1, 0.5, 1); 
  display: flex;
  align-items: center;
  justify-content: center;

  ${MapItem}:hover & {
    height: ${(props) => props.$percent}%; 
  }
`;

const GaugeText = styled.span`
  color: white;
  font-family: Inter;
  font-size: 22px;        
  font-weight: 800;
  opacity: 0;
  transform: translateY(10px);
  transition: opacity 0.3s ease, transform 0.3s ease;
  transition-delay: 0.15s; 

  ${MapItem}:hover & {
    opacity: 1;
    transform: translateY(0) scaleY(0.95); 
  }
`;

const MapName = styled.div`
  position: absolute;
  top: 25px;
  left: 50%;
  transform: translateX(-50%);
  color: #ffffff;
  font-family: Inter;
  font-size: 16px;        
  font-weight: 700;
  text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.9);
  white-space: nowrap;
  pointer-events: none;
  z-index: 2;
  transition: transform 0.35s cubic-bezier(0.25, 1, 0.5, 1);

  ${MapItem}:hover & {
    transform: translateX(-50%) scaleY(0.95);
  }
`;


export default function PreferPage() {
  const [activeTab, setActiveTab] = useState("총기");
  
  const gunData = [
    { id: 0, title: "SG", img: SgImg },
    { id: 1, title: "AR", img: ArImg },
    { id: 2, title: "SMG", img: SmgImg },
    { id: 3, title: "DMR", img: DmrImg },
    { id: 4, title: "SR", img: SrImg },
  ];

  const mapData = [
    { id: 1, name: "에란겔", img: MapImg1, percent: 19.6 },
    { id: 2, name: "미라마", img: MapImg2, percent: 9.7 },
    { id: 3, name: "태이고", img: MapImg3, percent: 31 },
    { id: 4, name: "사녹", img: MapImg4, percent: 13.2 },
    { id: 5, name: "비켄디", img: MapImg5, percent: 5 },
    { id: 6, name: "데스턴", img: MapImg6, percent: 2.8 },
    { id: 7, name: "론도", img: MapImg7, percent: 9.3 },
    { id: 8, name: "파라모", img: MapImg8, percent: 5.3 },
    { id: 9, name: "카라킨", img: MapImg9, percent: 4.1 }, 
  ];

  const [centerIndex, setCenterIndex] = useState(1); 

  const handlePrev = () => {
    setCenterIndex((prev) => (prev === 0 ? gunData.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCenterIndex((prev) => (prev === gunData.length - 1 ? 0 : prev + 1));
  };

  const getVisibleCards = () => {
    const len = gunData.length;
    const prevIndex = (centerIndex - 1 + len) % len;
    const nextIndex = (centerIndex + 1) % len;
    
    return [
      { ...gunData[prevIndex], position: "left" },
      { ...gunData[centerIndex], position: "center" },
      { ...gunData[nextIndex], position: "right" },
    ];
  };

  return (
    <>
      <GlobalStyle />
      <Container>
        <Header name="prefer" />
        <Background>
          <Nav>
            <NavText $active={activeTab === "총기"} onClick={() => setActiveTab("총기")}>총기 티어</NavText>
            <NavText $active={activeTab === "파츠"} onClick={() => setActiveTab("파츠")}>맵</NavText>
          </Nav>

          {/* [총기 티어 탭] */}
          {activeTab === "총기" && (
            <CarouselContainer>
              <ArrowButton $direction="left" onClick={handlePrev}>&larr;</ArrowButton>
              <CardSlider>
                {getVisibleCards().map((item) => {
                  const isCenter = item.position === "center";
                  return (
                    <Card key={item.id} $isCenter={isCenter}>
                      <CardTitle $isCenter={isCenter}>{item.title}</CardTitle>
                      <GunImage src={item.img} alt={item.title} />
                    </Card>
                  );
                })}
              </CardSlider>
              <ArrowButton $direction="right" onClick={handleNext}>&rarr;</ArrowButton>
            </CarouselContainer>
          )}

          {/* [맵 탭] */}
          {activeTab === "파츠" && (
            <MapWrapper id="map-content-zone">
              {mapData.map((map) => (
                <MapItem key={map.id}>
                  <MapName>{map.name}</MapName>
                  <MapImg src={map.img} alt={map.name} />
                  
                  <GaugeOverlay $percent={map.percent}>
                    <GaugeText>{map.percent}%</GaugeText>
                  </GaugeOverlay>
                </MapItem>
              ))}
            </MapWrapper>
          )}
        </Background>
      </Container>
    </>
  );
}