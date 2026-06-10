import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background-color: #0c0c0c;
    font-family: 'Noto Sans KR', sans-serif;
    color: #ffffff;
    overflow-x: hidden;
  }
`;

export const Container = styled.div`
  width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-image: linear-gradient(rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.85)), url(${(props) => props.$bg});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  padding-bottom: 60px;
  box-sizing: border-box;
`;

export const HeaderWrapper = styled.div`
  width: 100%;
  z-index: 10;
`;

export const Box = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  max-width: 1400px;
  background: rgba(15, 15, 15, 0.75);
  border: 1px solid rgba(242, 169, 0, 0.15);
  border-radius: 16px;
  padding: 40px;
  margin-top: 40px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(12px);
  box-sizing: border-box;
`;

export const TitleSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding-bottom: 20px;
`;

export const GunTitle = styled.h1`
  font-size: 36px;
  font-weight: 800;
  color: #ffffff;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 15px;

  span {
    font-size: 14px;
    font-weight: 500;
    background: #f2a900;
    color: #000;
    padding: 4px 10px;
    border-radius: 4px;
    text-transform: uppercase;
  }
`;

export const GunSelect = styled.select`
  background: #1a1a1a;
  color: #fff;
  border: 1px solid #f2a900;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: 600;
  border-radius: 6px;
  cursor: pointer;
  outline: none;
  transition: all 0.2s ease;

  &:hover {
    background: #f2a900;
    color: #000;
  }
`;

export const ContentWrapper = styled.div`
  display: flex;
  gap: 40px;
  align-items: flex-start;
  width: 100%;
  box-sizing: border-box;

  @media (max-width: 1024px) {
    flex-direction: column;
    align-items: center;
  }
`;

/* 왼쪽: 총기 고유 디스플레이 전용 영역 */
export const DisplayArea = styled.div`
  flex: 1.2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.4);
  border-radius: 12px;
  padding: 40px 30px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  width: 100%;
  min-height: 420px;
  box-sizing: border-box;
`;

export const MainImageWrapper = styled.div`
  width: 100%;
  height: 350px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;

  img {
    max-width: 95%;
    max-height: 95%;
    object-fit: contain;
    filter: drop-shadow(0 15px 25px rgba(0, 0, 0, 0.7));
  }
`;

/* 오른쪽: 장착 전용 칸들을 모아둔 컨테이너 */
export const PartSlotContainer = styled.div`
  flex: 0.8;
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
  box-sizing: border-box;
`;

/* 개별 파츠 칸 슬롯 스타일 */
export const PartSlot = styled.div`
  display: flex;
  align-items: center;
  background: ${(props) => (props.$hasPart ? "rgba(242, 169, 0, 0.08)" : "rgba(255, 255, 255, 0.02)")};
  border: 1px solid ${(props) => (props.$hasPart ? "rgba(242, 169, 0, 0.4)" : "rgba(255, 255, 255, 0.08)")};
  border-radius: 10px;
  padding: 15px 20px;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative; /* 모달 팝업 기준 좌표 설정 */
  box-sizing: border-box;

  &:hover {
    border-color: #f2a900;
    background: rgba(242, 169, 0, 0.04);
  }
`;

export const SlotIcon = styled.div`
  width: 45px;
  height: 45px;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  flex-shrink: 0;

  img {
    width: 32px;
    height: 32px;
    object-fit: contain;
  }

  span.plus {
    font-size: 20px;
    color: rgba(255, 255, 255, 0.2);
    font-weight: 300;
  }
`;

export const SlotInfo = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;

  span.type {
    font-size: 12px;
    color: #777777;
    text-transform: uppercase;
    margin-bottom: 4px;
    font-weight: 500;
  }

  span.name {
    font-size: 16px;
    color: ${(props) => (props.$hasPart ? "#f2a900" : "rgba(255, 255, 255, 0.4)")};
    font-weight: ${(props) => (props.$hasPart ? "600" : "400")};
  }
`;

/* 파츠 드롭다운 선택창 */
export const PartSelectModal = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background: #141414;
  border: 1px solid #f2a900;
  border-radius: 8px;
  margin-top: 5px;
  z-index: 50;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.8);
  max-height: 250px;
  overflow-y: auto;
  box-sizing: border-box;

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background: #333;
    border-radius: 3px;
  }
`;

export const PartItem = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 20px;
  transition: background 0.2s;
  box-sizing: border-box;

  &:hover {
    background: rgba(242, 169, 0, 0.15);
  }

  img {
    width: 28px;
    height: 28px;
    object-fit: contain;
    margin-right: 15px;
    background: rgba(0, 0, 0, 0.3);
    padding: 3px;
    border-radius: 4px;
    flex-shrink: 0;
  }

  span {
    font-size: 14px;
    color: #ddd;
  }
`;

export const RemovePartItem = styled(PartItem)`
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  color: #e74c3c;
  justify-content: center;
  font-weight: 600;

  &:hover {
    background: rgba(231, 76, 60, 0.15);
  }
`;

export const Stat = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 40px;
  box-sizing: border-box;
`;

export const StatTitle = styled.h2`
  font-size: 20px;
  color: #f2a900;
  margin-bottom: 20px;
  align-self: flex-start;
  font-weight: 700;
`;

export const StatGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 15px;
  width: 100%;
  box-sizing: border-box;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const StatItem = styled.div`
  background: #141414;
  border: 1px solid rgba(255, 255, 255, 0.05);
  padding: 15px 20px;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;

  span.label {
    color: #888888;
    font-size: 14px;
    white-space: nowrap;
  }

  div {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  span.base-value {
    color: #ffffff;
    font-size: 16px;
    font-weight: 600;
  }

  span.change-value {
    font-size: 13px;
    font-weight: 600;
    color: ${({ $status }) =>
      $status === "up" ? "#2ecc71" : $status === "down" ? "#e74c3c" : "transparent"};
  }
`;

export const Info = styled.div`
  width: 100%;
  text-align: center;
  color: #555555;
  font-size: 12px;
  margin-top: 20px;
  box-sizing: border-box;
`;