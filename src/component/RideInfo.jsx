import {
    ListHeader,
    Line,
    HeaderName,
    HeaderInfo,
    WeaponList,
    WeaponRow,
    ImageBox,
    WeaponName,
    InfoContainer,
    InfoColumn,
    InfoText,
  } from "./WeaponInfo";
  import { RideImages } from "../assets";
  import { ridesData } from "../data/ridesData";
  import styled from "styled-components";
  
  const WeaponImgBox = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    overflow: hidden;
  
    img {
      width: 100%;
      height: auto;
      max-height: 70px; /* 아래 뱃지 공간을 확보하기 위해 약간 줄였습니다 */
      object-fit: contain;
    }
  `;
  
  // 💡 변형 모델 명칭들을 담아낼 텍스트 박스 공간
  const VariantContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 4px;
    width: 100%;
    margin-top: 4px;
    flex-wrap: wrap; /* 글자가 많아지면 아래 줄로 유연하게 개행 */
  `;
  
  const VariantBadge = styled.span`
    font-size: 10px;
    background-color: #e5e5e5;
    color: #333333;
    padding: 2px 5px;
    border-radius: 4px;
    font-weight: 600;
  `;
  
  export default function RideInfoPage() {
    
    // 🛠️ 에셋 객체 안에서 안전하게 대표 이미지 한 장을 조회하는 헬퍼 함수
    const getAssetImage = (key) => {
      if (!RideImages || !key) return null;
      return RideImages[key] || null;
    };
  
    const formatEffects = (effects) => {
      if (!effects || !Array.isArray(effects)) return "-";
      return effects.map((e) => `${e.name} (${e.num})`).join(" / ");
    };
  
    return (
      <>
        {/* 상단 헤더 영역 - 무기 정보창과 정렬선 완전 밀착 */}
        <ListHeader>
          <HeaderName>탈것 이름 / 이미지</HeaderName>
          <Line />
          <HeaderInfo>탈것 성능 정보</HeaderInfo>
        </ListHeader>
  
        {/* 탈것 리스트 영역 */}
        <WeaponList>
          {ridesData?.map((ride, index) => {
            const rideImg = getAssetImage(ride.imageKey);
  
            return (
              <WeaponRow key={`${ride.name}-${index}`}>
                
                {/* 좌측: 이름 + 대표 이미지 1장 + 변형 모델 텍스트 목록 (정밀 150px 고정) */}
                <ImageBox>
                  <WeaponImgBox>
                    <img src={rideImg} alt={ride.name} />
                  </WeaponImgBox>
                  
                  {/* 💡 변형이 존재할 경우에만 텍스트 뱃지들을 나열합니다 */}
                  {ride.variants && ride.variants.length > 0 && (
                    <VariantContainer>
                      {ride.variants.map((variantName, vIdx) => (
                        <VariantBadge key={vIdx}>{variantName}</VariantBadge>
                      ))}
                    </VariantContainer>
                  )}
  
                  <WeaponName style={{ marginTop: "4px" }}>{ride.name}</WeaponName>
                </ImageBox>
  
                {/* 우측: 세부 성능 스펙 명세 (기존 3컬럼 레이아웃) */}
                <InfoContainer>
                  {/* 컬럼 1: 분류 및 승차 인원 */}
                  <InfoColumn>
                    <InfoText>분류 : {ride.category}</InfoText>
                    <InfoText>인원 : {ride.capacity}</InfoText>
                  </InfoColumn>
  
                  {/* 컬럼 2: 기동성 및 내구력 */}
                  <InfoColumn>
                    <InfoText style={{ color: "#004B87" }}>
                      제원 : {ride.hp ? `HP (${ride.hp})` : formatEffects(ride.effect)}
                    </InfoText>
                    <InfoText style={{ color: "#666", fontSize: "16px" }}>
                      최대 속도: {ride.maxSpeed}
                    </InfoText>
                  </InfoColumn>
  
                  {/* 컬럼 3: 탈것별 상세 특징 및 기믹 설명 */}
                  <InfoColumn>
                    <InfoText
                      style={{
                        fontSize: "16px",
                        fontWeight: "600",
                        color: "#333",
                      }}
                    >
                      특징 : {ride.description}
                    </InfoText>
                  </InfoColumn>
                </InfoContainer>
  
              </WeaponRow>
            );
          })}
        </WeaponList>
      </>
    );
  }