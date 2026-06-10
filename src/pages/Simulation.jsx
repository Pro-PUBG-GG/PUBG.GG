//packages & component & js
import React, { useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import Header from "../component/Header";
import back_image from "../assets/Simulation.png";
import { WeaponImages, PartImages } from "../assets/index.js";
import { 
    GUN_SETTINGS,
    PART_NAMES, 
    SLOT_LABELS,
    CATEGORY_TO_PART_NUM,
    CATEGORIES,
    GUN_STATS,
    PART_EFFECTS,
    STAT_LABELS,
    DEFAULT_GUN_STATS
} from "../data/simulationData.js";

// Styled-components
const GlobalStyle = createGlobalStyle`
  html, body {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    background-color: #0c0c0c;
    font-family: 'Noto Sans KR', sans-serif;
  }
`;

const Container = styled.div`
  width: 100vw; 
  min-height: 100vh; 
  background: url(${back_image}) center/cover no-repeat fixed;
  margin: 0; 
  padding: 0; 
  position: relative; 
  display: flex; 
  flex-direction: column;
  align-items: center; 
  box-sizing: border-box;
  padding-bottom: 60px;
`;

const HeaderWrapper = styled.div` 
  width: 100%;
  z-index: 10; 
`;

const Box = styled.div`
  width: 90%; 
  max-width: 1400px; 
  background-color: rgba(15, 15, 15, 0.75); 
  border: 1px solid rgba(242, 169, 0, 0.15); 
  border-radius: 12px; 
  display: flex; 
  flex-direction: column;
  align-items: center; 
  position: relative; 
  padding: 40px; 
  margin-top: 40px;
  box-sizing: border-box;
  backdrop-filter: blur(12px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6);
`;

const ChangeButton = styled.button`
  color: #ffffff; 
  font-size: 16px; 
  font-weight: bold; 
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.2); 
  padding: 10px 24px; 
  border-radius: 6px; 
  cursor: pointer;
  position: absolute; 
  top: 25px; 
  z-index: 30;
  transition: all 0.2s ease;

  &:hover { 
    color: #f2a900; 
    border-color: #f2a900; 
    background: rgba(242, 169, 0, 0.1); 
  }
`;

const GunSelectModal = styled.div`
  position: absolute; 
  top: 85px; 
  background: rgba(15, 15, 15, 0.98); 
  border: 1px solid #f2a900;
  border-radius: 8px; 
  padding: 25px; 
  width: 95%; 
  max-width: 1200px; 
  display: flex; 
  flex-wrap: wrap;
  gap: 15px; 
  justify-content: space-between; 
  z-index: 40; 
  box-shadow: 0px 10px 30px rgba(0,0,0,0.7);
  max-height: 550px; 
  overflow-y: auto;
`;

const CategorySection = styled.div`
  display: flex; 
  flex-direction: column; 
  gap: 8px; 
  width: 14%; 
  min-width: 130px;
  
  h3 { 
    color: #f2a900; 
    font-size: 14px; 
    font-weight: 700;
    margin: 0 0 10px 0; 
    border-bottom: 2px solid rgba(242, 169, 0, 0.4); 
    padding-bottom: 5px; 
    text-align: center; 
  }
`;

const GunItem = styled.div`
  color: #aaa; 
  padding: 8px; 
  text-align: center; 
  border-radius: 4px; 
  cursor: pointer; 
  font-size: 13px;
  font-weight: 500;
  background: rgba(255,255,255,0.03); 
  text-transform: uppercase;
  transition: all 0.15s ease;

  &:hover { 
    background: #f2a900; 
    color: #000; 
    font-weight: bold; 
  }
`;

const ContentWrapper = styled.div` 
  position: relative; 
  width: 100%; 
  margin-top: 60px; 
  display: flex; 
  gap: 40px;
  align-items: flex-start;
  box-sizing: border-box;

  @media (max-width: 1100px) {
    flex-direction: column;
    align-items: center;
  }
`;

const DisplayArea = styled.div`
  flex: 1.4;
  width: 100%;
  height: 540px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.03);
  box-sizing: border-box;
  overflow: hidden;
`;

const GunImage = styled.img` 
  width: 65%; 
  max-width: 580px;
  height: auto; 
  object-fit: contain; 
  z-index: 1; 
  filter: drop-shadow(0 20px 35px rgba(0, 0, 0, 0.7));
`;

const PartSlotContainer = styled.div`
  position: absolute; 
  z-index: 3;
  display: flex;
  flex-direction: column;
  align-items: center;
  
  ${({ type }) => {
    switch (type) {
      // 1. 총구 / 초크 (총기 가장 왼쪽 끝)
      case "muzzle": return "left: 12%; top: 38%;";        
      case "choke": return "left: 10%; top: 38%;";
      
      // 2. 스코프 (총기 상단 중앙 레일 위치)
      case "scope": return "left: 46%; top: 10%;";         
      
      // 3. 손잡이 (총기 하단 앞쪽 - 7.62mm/5.56mm 하부 레일 포지션)
      case "grip": return "left: 35%; bottom: 14%;";       
      
      // 4. 탄창 (총기 하단 뒤쪽 - 트리거 앞 탄창 삽입구 포지션으로 우측 이동)
      case "magazine": return "left: 49%; bottom: 14%;";  
      
      // 5. 개머리판 / 칙패드 (총기 가장 오른쪽 끝)
      case "stock": return "right: 14%; top: 50%;";        
      case "bullet_loops": return "right: 14%; top: 50%;";
      
      default: return "";
    }
  }}
`;

const PartSlot = styled.div`
  width: 82px; 
  height: 82px; 
  background-color: ${(props) => (props.$hasPart ? "rgba(20, 20, 20, 0.85)" : "rgba(255, 255, 255, 0.06)")}; 
  border: 2px solid ${(props) => (props.$isActive || props.$hasPart ? "#f2a900" : "rgba(255, 255, 255, 0.18)")};
  border-radius: 8px; 
  display: flex; 
  align-items: center; 
  justify-content: center; 
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: ${(props) => (props.$isActive || props.$hasPart ? "0 0 15px rgba(242, 169, 0, 0.3)" : "0 6px 12px rgba(0,0,0,0.5)")};

  &:hover { 
    background-color: rgba(242, 169, 0, 0.1); 
    border-color: #f2a900; 
    transform: scale(1.04);
  }

  img { 
    width: 78%; 
    height: 78%; 
    object-fit: contain; 
  }

  span.plus {
    font-size: 24px;
    color: rgba(255, 255, 255, 0.2);
    font-weight: 300;
  }
`;

const SidebarContainer = styled.div`
  flex: 0.8;
  display: flex;
  flex-direction: column;
  gap: 14px;
  width: 100%;
  background: rgba(10, 10, 10, 0.5);
  padding: 24px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  box-sizing: border-box;
`;

const SidebarHeader = styled.div`
  font-size: 13px;
  font-weight: bold;
  color: #666;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  padding-bottom: 10px;
  margin-bottom: 6px;
`;

const SidebarRow = styled.div`
  display: flex;
  align-items: center;
  background: ${(props) => (props.$isActive ? "rgba(242, 169, 0, 0.12)" : props.$hasPart ? "rgba(255, 255, 255, 0.03)" : "rgba(255, 255, 255, 0.01)")};
  border: 1px solid ${(props) => (props.$isActive ? "#f2a900" : props.$hasPart ? "rgba(242, 169, 0, 0.3)" : "rgba(255, 255, 255, 0.06)")};
  border-radius: 8px;
  padding: 12px 18px;
  cursor: pointer;
  position: relative;
  transition: all 0.2s ease;

  &:hover {
    border-color: #f2a900;
    background: rgba(242, 169, 0, 0.05);
  }
`;

const SidebarIcon = styled.div`
  width: 40px;
  height: 40px;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 16px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  flex-shrink: 0;

  img { width: 28px; height: 28px; object-fit: contain; }
  span { color: rgba(255,255,255,0.15); font-size: 16px; }
`;

const SidebarText = styled.div`
  display: flex;
  flex-direction: column;
  
  span.type { font-size: 11px; color: #555; font-weight: 600; text-transform: uppercase; margin-bottom: 2px; }
  span.name { font-size: 14px; color: ${(props) => (props.$hasPart ? "#f2a900" : "rgba(255,255,255,0.25)")}; font-weight: ${(props) => (props.$hasPart ? "600" : "400")}; }
`;

const PartSelectModal = styled.div`
  position: absolute; 
  top: 100%;
  left: 0;
  width: 100%;
  background: #141414; 
  border: 1px solid #f2a900;
  border-radius: 6px; 
  margin-top: 5px;
  display: flex; 
  flex-direction: column; 
  z-index: 50;
  box-shadow: 0 10px 25px rgba(0,0,0,0.8);
  max-height: 220px;
  overflow-y: auto;
  box-sizing: border-box;
`;

const PartItem = styled.div`
  color: #ddd; 
  font-size: 13px; 
  padding: 10px 15px; 
  cursor: pointer; 
  display: flex;
  align-items: center; 
  gap: 12px; 
  background: rgba(255,255,255,0.02);
  transition: all 0.15s;

  img { 
    width: 24px; 
    height: 24px; 
    object-fit: contain; 
    background: rgba(0,0,0,0.4); 
    padding: 2px; 
    border-radius: 4px;
  }
  
  &:hover { 
    background: rgba(242, 169, 0, 0.15); 
    color: #fff; 
  }
`;

const RemovePartItem = styled(PartItem)`
  color: #ff4d4d; 
  justify-content: center; 
  font-weight: bold;
  border-top: 1px solid rgba(255,255,255,0.05);
  
  &:hover { 
    background: rgba(255, 77, 77, 0.15); 
    color: #ff4d4d; 
  }
`;

const Stat = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 40px;
  box-sizing: border-box;
`;

const StatTitle = styled.h2`
  font-size: 20px;
  color: #f2a900;
  margin-bottom: 20px;
  align-self: flex-start;
  font-weight: 700;
`;

const StatGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr); 
  gap: 15px;
  width: 100%;
  box-sizing: border-box;

  @media (max-width: 1200px) { grid-template-columns: repeat(3, 1fr); }
  @media (max-width: 768px) { grid-template-columns: repeat(2, 1fr); }
`;

const StatItem = styled.div`
  background: #141414;
  border: 1px solid rgba(255, 255, 255, 0.05);
  padding: 15px 20px;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;

  span.label { color: #888888; font-size: 14px; white-space: nowrap; }
  
  div { display: flex; align-items: center; gap: 8px; }
  span.base-value { color: #ffffff; font-size: 16px; font-weight: 600; }
  
  span.change-value {
    font-size: 13px;
    font-weight: 600;
    color: ${({ $status }) =>
    $status === "up" ? "#2ecc71" : $status === "down" ? "#e74c3c" : "transparent"};
  }
`;

const Info = styled.div`
  width: 100%;
  text-align: center;
  color: #555555;
  font-size: 12px;
  margin-top: 20px;
  box-sizing: border-box;
`;

export default function SimulationPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeSlot, setActiveSlot] = useState(null);

  const DEFAULT_PARTS = { muzzle: "", grip: "", magazine: "", stock: "", choke: "", bullet_loops: "", scope: "" };

  const [currentGun, setCurrentGun] = useState(() => {
    return localStorage.getItem("sim_currentGun") || "M416";
  });
  
  const [equippedParts, setEquippedParts] = useState(() => {
    try {
      const saved = localStorage.getItem("sim_equippedParts");
      return saved ? JSON.parse(saved) : DEFAULT_PARTS;
    } catch {
      return DEFAULT_PARTS;
    }
  });
  const gunConfig = GUN_SETTINGS[currentGun] || { category: "AR", allowedParts: {} };
  const partSuffix = CATEGORY_TO_PART_NUM[gunConfig.category] || "1";
  const activeSlots = Object.keys(gunConfig.allowedParts);
  
  const handleGunSelect = (gunKey) => {
    setCurrentGun(gunKey);
    localStorage.setItem("sim_currentGun", gunKey);  // ← 추가
    const reset = { muzzle: "", grip: "", magazine: "", stock: "", choke: "", bullet_loops: "", scope: "" };
    setEquippedParts(reset);
    localStorage.setItem("sim_equippedParts", JSON.stringify(reset));  // ← 추가
    setIsModalOpen(false);
    setActiveSlot(null);
  };
  
  const handlePartSelect = (slotType, partName) => {
    setEquippedParts(prev => {
      const next = { ...prev, [slotType]: partName };
      localStorage.setItem("sim_equippedParts", JSON.stringify(next));  // ← 추가
      return next;
    });
    setActiveSlot(null);
  };

  const getFinalPartKey = (basePartName) => {
    if (!basePartName) return "";
    const needsSuffix = ["compensator", "suppressor", "flask_hider", "extended_mag", "quickdraw_mag", "ext_quickdraw_mag"];
    if (needsSuffix.includes(basePartName)) {
      if (basePartName === "quickdraw_mag" && partSuffix === "3") return `${basePartName}2`;
      return `${basePartName}${partSuffix}`;
    }
    return basePartName;
  };

  const baseStats = GUN_STATS[currentGun] || { ...DEFAULT_GUN_STATS };
  const totalChanges = { ...DEFAULT_GUN_STATS };

  Object.keys(equippedParts).forEach((slot) => {
    const basePartName = equippedParts[slot];
    const finalPartKey = getFinalPartKey(basePartName);

    if (finalPartKey && PART_EFFECTS[finalPartKey]) {
      Object.keys(PART_EFFECTS[finalPartKey]).forEach((statKey) => {
        if (totalChanges[statKey] !== undefined) {
          totalChanges[statKey] += PART_EFFECTS[finalPartKey][statKey];
        }
      });
    }
  });

  const toggleSlot = (slotType) => {
    setActiveSlot(activeSlot === slotType ? null : slotType);
  };

  return (
    <>
      <GlobalStyle />
      <Container>
        <HeaderWrapper>
          <Header name="sim" />
        </HeaderWrapper>

        <Box>
          <ChangeButton onClick={() => { setIsModalOpen(!isModalOpen); setActiveSlot(null); }}>
            총기 선택 ⇄ ({currentGun.toUpperCase()})
          </ChangeButton>

          {isModalOpen && (
            <GunSelectModal>
              {CATEGORIES.map(cat => (
                <CategorySection key={cat.key}>
                  <h3>{cat.label}</h3>
                  {Object.keys(GUN_SETTINGS).filter(k => GUN_SETTINGS[k].category === cat.key).map(k => (
                    <GunItem key={k} onClick={() => handleGunSelect(k)}>{k}</GunItem>
                  ))}
                </CategorySection>
              ))}
            </GunSelectModal>
          )}

          <ContentWrapper>
            
            <DisplayArea>
              <GunImage src={WeaponImages[currentGun]} alt={currentGun} />

              {activeSlots.map((slotType) => {
                const basePartName = equippedParts[slotType];
                const finalPartKey = getFinalPartKey(basePartName);
                const hasPart = !!basePartName;

                return (
                  <PartSlotContainer key={`pin-${slotType}`} type={slotType}>
                    <PartSlot 
                      $hasPart={hasPart}
                      $isActive={activeSlot === slotType}
                      onClick={() => toggleSlot(slotType)}
                    >
                      {hasPart && PartImages[finalPartKey] ? (
                        <img src={PartImages[finalPartKey]} alt={slotType} />
                      ) : (
                        <span className="plus">+</span>
                      )}
                    </PartSlot>
                  </PartSlotContainer>
                );
              })}
            </DisplayArea>
            <SidebarContainer>
              <SidebarHeader>부착물 장착 리스트</SidebarHeader>
              {activeSlots.map((slotType) => {
                const basePartName = equippedParts[slotType];
                const finalPartKey = getFinalPartKey(basePartName);
                const allowedOptions = gunConfig.allowedParts[slotType] || [];
                const hasPart = !!basePartName;

                return (
                  <SidebarRow 
                    key={`sidebar-${slotType}`}
                    $hasPart={hasPart}
                    $isActive={activeSlot === slotType}
                    onClick={() => toggleSlot(slotType)}
                  >
                    <SidebarIcon>
                      {hasPart && PartImages[finalPartKey] ? (
                        <img src={PartImages[finalPartKey]} alt={slotType} />
                      ) : (
                        <span>+</span>
                      )}
                    </SidebarIcon>

                    <SidebarText $hasPart={hasPart}>
                      <span className="type">{SLOT_LABELS[slotType] || slotType}</span>
                      <span className="name">
                        {hasPart ? (PART_NAMES[basePartName] || basePartName) : "비어 있음"}
                      </span>
                    </SidebarText>

                    {activeSlot === slotType && allowedOptions.length > 0 && (
                      <PartSelectModal onClick={(e) => e.stopPropagation()}>
                        {allowedOptions.map(opt => {
                          const optKey = getFinalPartKey(opt);
                          return (
                            <PartItem key={opt} onClick={() => handlePartSelect(slotType, opt)}>
                              {PartImages[optKey] && <img src={PartImages[optKey]} alt={opt} />}
                              <span>{PART_NAMES[opt] || opt}</span>
                            </PartItem>
                          );
                        })}
                        {hasPart && (
                          <RemovePartItem onClick={() => handlePartSelect(slotType, "")}>
                            장착 해제
                          </RemovePartItem>
                        )}
                      </PartSelectModal>
                    )}
                  </SidebarRow>
                );
              })}
            </SidebarContainer>

          </ContentWrapper>
        </Box>
      </Container>

      <Stat>
        <StatTitle>{currentGun.toUpperCase()} 실시간 시뮬레이션 스펙</StatTitle>
        <StatGrid>
          {Object.keys(baseStats).map((key) => {
            const baseValue = baseStats[key];
            const changeValue = totalChanges[key] || 0;
            const finalValue = Math.max(0, Math.min(100, baseValue + changeValue));

            let status = "none";
            if (changeValue > 0) status = "up";
            if (changeValue < 0) status = "down";

            return (
              <StatItem key={key} $status={status}>
                <span className="label">{STAT_LABELS[key] || key}</span>
                <div>
                  <span className="base-value">{finalValue}</span>
                  {changeValue !== 0 && (
                    <span className="change-value">
                      {changeValue > 0 ? ` (+${changeValue}%)` : ` (${changeValue}%)`}
                    </span>
                  )}
                </div>
              </StatItem>
            );
          })}
        </StatGrid>
      </Stat>
      <Info>
        * 본 스탯 수치는 비공식적으로 임의로 정한 값으로 대략적인 스탯을 나타내는 수치입니다. (M416 기준으로 스탯을 정했습니다)
      </Info>
    </>
  );
}