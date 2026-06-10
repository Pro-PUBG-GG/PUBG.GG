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
import { PartImages } from "../assets";
import { partsData, magazineData, stockData } from "../data/partsData";
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
    max-height: 80px;
    object-fit: contain;
  }
`;
const RowContainer = styled.div`
    display: flex;
    gap: 12px;
    align-items: flex-end;
`;
const PartsContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
`;
const PartsLabel = styled.span`
    font-size: 15px;
    color: #666;
    margin-top: 4px;
    font-weight: 600;
    margin-right: 20px;
`;

export default function PartsInfoPage() {
  const allPartsData = [...partsData, ...magazineData, ...stockData];

  // 🛠️ 1. 파츠 데이터별로 해당하는 모든 이미지 정보를 배열로 가져오는 함수
  const getPartImagesArray = (part) => {
    if (!PartImages) return [];

    const baseKeyMap = {
      // 총구류
      보정기: "compensator",
      소염기: "flask_hider",
      소음기: "suppressor",
      제동기: "muzzle_brake",
      초크: "choke",
      덕빌: "duckbill",
      // 손잡이류
      "수직 손잡이": "vertical_foregrip",
      "틸티드 그립": "tilted_grip",
      "하프 그립": "half_grip",
      "라이트 그립": "lightweight_grip",
      "엄지 손잡이": "thumb_grip",
      "레이저 사이트": "laser_sight",
      // 조준경류
      "레드 도트 사이트": "red_dot",
      "홀로그래픽 사이트": "holograpic",
      "하이브리드 스코프": "hybrid",
      "2배율 스코프": "two_scope",
      "3배율 스코프": "three_scope",
      "4배율 스코프": "four_scope",
      "6배율 스코프": "six_scope",
      "8배율 스코프": "eight_scope",
      "15배율 스코프": "max_scope",
      // 탄창류
      "퀵드로우 탄창": "quickdraw_mag",
      "대용량 탄창": "extended_mag",
      "대용량 퀵드로우 탄창": "ext_quickdraw_mag",
      // 개머리판류
      "접이식 개머리판": "folding_stock",
      "전술 개머리판": "tactical_stock",
      "중형 개머리판": "heavy_stock",
      칙패드: "cheek_pad",
      탄띠: "bullet_loops",
    };

    const baseKey =
      baseKeyMap[part.name] ||
      part.e_name?.toLowerCase().replace(/[-_\s]/g, "");
    if (!baseKey) return [];

    // 💡 분할 처리가 필요한 무기군 판단
    const isMuzzleSplit =
      part.id === "Muzzle" &&
      !["초크", "덕빌", "제동기", "Choke", "Duckbill", "Muzzle Brake"].includes(
        part.name
      );
    const isMagazineSplit = part.id === "Magazine" && part.type;

    // 2-1. 종류 분할이 필요한 경우 (보정기, 소염기, 소음기, 대용량, 대퀵, 퀵드로우)
    if (isMuzzleSplit || isMagazineSplit) {
      const images = [];

      // AR (항상 1번)
      if (PartImages[`${baseKey}1`]) {
        images.push({ src: PartImages[`${baseKey}1`], label: "AR" });
      }

      // SR (퀵드로우 제외, 나머지 파츠의 2번)
      if (part.name !== "퀵드로우 탄창" && PartImages[`${baseKey}2`]) {
        images.push({ src: PartImages[`${baseKey}2`], label: "SR" });
      }

      // SMG (퀵드로우는 2번, 나머지는 3번)
      if (part.name === "퀵드로우 탄창") {
        if (PartImages[`${baseKey}2`]) {
          images.push({ src: PartImages[`${baseKey}2`], label: "SMG" });
        }
      } else {
        if (PartImages[`${baseKey}3`]) {
          images.push({ src: PartImages[`${baseKey}3`], label: "SMG" });
        }
      }

      return images;
    }

    // 2-2. 단일 파츠인 경우 (이미지 1개만 반환)
    if (PartImages[baseKey]) {
      return [{ src: PartImages[baseKey], label: "" }];
    }

    return [];
  };

  const translateId = (id) => {
    const idMap = {
      Muzzle: "총구",
      Foregrip: "손잡이",
      Scopes: "조준경",
      Magazine: "탄창",
      Stock: "개머리판",
    };
    return idMap[id] || id;
  };

  const formatEffects = (effects) => {
    if (!effects || !Array.isArray(effects)) return "-";
    return effects
      .map((e) => {
        const value =
          e.per !== undefined
            ? `${e.per}%`
            : e.num !== undefined
            ? `${e.num}%`
            : "";
        return value ? `${e.name} (${value})` : e.name;
      })
      .join(", ");
  };

  const formatFeature = (feature) => {
    if (!feature) return "-";
    if (Array.isArray(feature)) return feature.join(" / ");
    return feature;
  };

  return (
    <>
      <ListHeader>
        <HeaderName>파츠 이름</HeaderName>
        <Line />
        <HeaderInfo>파츠 정보</HeaderInfo>
      </ListHeader>

      <WeaponList>
        {allPartsData.map((part, index) => {
          const partImages = getPartImagesArray(part);

          return (
            <WeaponRow key={`${part.name}-${index}`}>
              {/* 좌측: 이름 + 이미지 박스 (flex-direction: column 구조 유지하되 내부 가로 정렬) */}
              <ImageBox
                style={{
                  width: "320px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                }}
              >
                <WeaponName
                  style={{ alignSelf: "flex-start", fontWeight: "bold" }}
                >
                  {part.name}
                </WeaponName>

                <RowContainer>
                  {partImages.map((imgObj, idx) => (
                    <PartsContainer key={idx} >
                      <WeaponImgBox style={{ margin: 0 }}>
                        <img
                          src={imgObj.src}
                          alt={`${part.name}-${imgObj.label}`}
                        />
                      </WeaponImgBox>
                      {/* AR, SR, SMG 라벨 표시 (단일 파츠는 표시 안 함) */}
                      {imgObj.label && (
                        <PartsLabel>
                          {imgObj.label}
                        </PartsLabel>
                      )}
                    </PartsContainer>
                  ))}
                </RowContainer>
              </ImageBox>

              {/* 우측: 파츠 정보 명세 */}
              <InfoContainer>
                <InfoColumn>
                  <InfoText>분류 : {translateId(part.id)}</InfoText>
                  <InfoText>
                    적용 : {part.type ? part.type.join(", ") : "해당 슬롯 전체"}
                  </InfoText>
                </InfoColumn>

                <InfoColumn>
                  <InfoText style={{ color: "#004B87" }}>
                    효과 : {formatEffects(part.effect)}
                  </InfoText>
                </InfoColumn>

                <InfoColumn>
                  {part.penalty ? (
                    <InfoText style={{ color: "#D9534F" }}>
                      패널티 : {formatEffects(part.penalty)}
                    </InfoText>
                  ) : (
                    <InfoText>특징 : {formatFeature(part.feature)}</InfoText>
                  )}
                </InfoColumn>
              </InfoContainer>
            </WeaponRow>
          );
        })}
      </WeaponList>
    </>
  );
}
