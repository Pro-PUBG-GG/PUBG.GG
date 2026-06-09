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
  Image
} from "./WeaponInfo";
import { ItemImages } from "../assets";
import { itemData } from "../data/itemData";
import styled from "styled-components";

const WeaponImgBox = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 150px;
  height: 150px;
  overflow: hidden;
  border-radius: 8px;
  background: #b5b5b5;

  img {
    width: 100%;
    height: auto;
    max-height: 80px;
    object-fit: contain;
  }
`;

export default function ItemInfoPage() {
  // 🛠️ 에셋 Key와 데이터의 이름을 1:1 매핑하는 함수
  const getItemImage = (item) => {
    if (!ItemImages) return null;

    const keyMap = {
      // 회복 및 부스트 아이템
      "아드레날린 주사": "adrenaline",
      "자가 제세동기": "aed",
      구급상자: "aid_kit",
      붕대: "bandage",
      "블루존 수류탄": "bluezone", // 투척물이지만 파일명이 bluezone인 경우
      "에너지 드링크": "energy_drink",
      "의료용 키트": "med_kit",
      진통제: "painkiller",

      // 투척 무기 및 폭발물
      C4: "C4",
      섬광탄: "Flashbang",
      세열수류탄: "Grenade",
      수류탄: "Grenade",
      화염병: "Molotov",
      "점착 폭탄": "StickyBomb",
    };

    // 매핑 테이블에서 찾거나, 데이터에 영문명(e_name)이 있다면 소문자로 변환해 폴백 처리
    const targetKey = keyMap[item.name] || item.e_name?.replace(/[-_\s]/g, "");

    // 대소문자 구분 없이 에셋 객체에서 매칭되는 Key 탐색
    if (targetKey) {
      const actualKey = Object.keys(ItemImages).find(
        (k) => k.toLowerCase() === targetKey.toLowerCase()
      );
      if (actualKey) return ItemImages[actualKey];
    }

    return null;
  };

  const formatEffects = (effects) => {
    if (!effects || !Array.isArray(effects)) return "-";
    return effects
      .map((e) => {
        const value =
          e.per !== undefined
            ? `${e.per}%`
            : e.num !== undefined
            ? `${e.num}`
            : "";
        return value ? `${e.name} (${value})` : e.name;
      })
      .join(", ");
  };

  return (
    <>
      {/* 상단 헤더 영역 */}
      <ListHeader>
        <HeaderName>아이템 이름</HeaderName>
        <Line />
        <HeaderInfo>아이템 정보</HeaderInfo>
      </ListHeader>

      {/* 아이템 리스트 영역 */}
      <WeaponList>
        {itemData?.map((item, index) => {
          const itemImg = getItemImage(item);

          return (
            <WeaponRow key={`${item.name}-${index}`}>
              {/* 좌측: 아이템 이미지 및 이름 박스 */}
              <ImageBox style={{ width: "240px" }}>
                <WeaponImgBox>
                  <Image src={itemImg} alt={item.name} />
                </WeaponImgBox>
                <WeaponName>{item.name}</WeaponName>
              </ImageBox>

              {/* 우측: 아이템 세부 명세 명세 (3개 컬럼 레이아웃 유지) */}
              <InfoContainer>
                {/* 컬럼 1: 분류 및 소지 한도/시전 시간 */}
                <InfoColumn>
                  <InfoText>분류 : {item.category || "소모품"}</InfoText>
                  {item.castTime && (
                    <InfoText>시전 시간 : {item.castTime}초</InfoText>
                  )}
                  {item.weight && <InfoText>무게 : {item.weight}</InfoText>}
                </InfoColumn>

                {/* 컬럼 2: 주요 효과 (회복량, 부스트 수치 등) */}
                <InfoColumn>
                  <InfoText style={{ color: "#004B87" }}>
                    효과 : {formatEffects(item.effect)}
                  </InfoText>
                </InfoColumn>

                {/* 컬럼 3: 아이템 특징 및 상세 설명 */}
                <InfoColumn>
                  <InfoText style={{ whiteSpace: "pre-line" }}>
                    특징 : {item.description || item.feature || "-"}
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
