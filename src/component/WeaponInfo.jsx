// packages & components
import styled from "styled-components";

// 데이터 및 이미지 객체 임포트
import {
  arData,
  dmrData,
  srData,
  lmgData,
  shotgunData,
  etcData,
  smgData,
  handgunData,
} from "../data/weaponData";
import { WeaponImages } from "../assets";

export const ListHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 0;
  margin-bottom: 15px;
  font-family: Inter;
  font-size: 28px;
  font-weight: 700;
  color: #000000;
  width: 100%; /* 본문 Row와 너비 기준을 맞춤 */
`;

export const HeaderName = styled.div`
  width: 150px;
  text-align: center;
  flex-shrink: 0;
`;

export const Line = styled.div`
  height: 35px;
  border-right: 2px solid #f2a900;
  margin: 0;
  padding: 0;
  flex-shrink: 0;
`;

export const HeaderInfo = styled.div`
  flex: 1;
  padding-left: 40px; /* WeaponRow의 gap인 40px와 값을 일치시켜 시작점을 맞춥니다 */
`;

export const WeaponList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-bottom: 5px;
`;

export const WeaponRow = styled.div`
  display: flex;
  align-items: center;
  gap: 40px; /* ImageBox와 InfoContainer 사이의 간격 */
  width: 100%;
`;

export const ImageBox = styled.div`
  width: 150px;
  height: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 15px 10px 10px 10px;
  box-sizing: border-box;
  flex-shrink: 0;
`;
export const Image = styled.img`

`;

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

export const WeaponName = styled.div`
  font-family: Inter;
  font-size: 18px;
  font-weight: 700;
  color: #000000;
  text-align: center;
`;

export const InfoContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  height: 150px;
`;

export const InfoColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 16px;
  flex: 1;
  height: 70%;
  padding: 0 30px;
  border-right: 2px solid #f2a900;
`;

export const InfoText = styled.div`
  font-family: Inter;
  font-size: 20px;
  font-weight: 700;
  color: #000000;
  word-break: keep-all;
  line-height: 1.2;
`;

export default function WeaponInfoPage() {
  // --- 🛠️ 무기 데이터 관련 헬퍼 함수들 ---
  const getDamage = (wp) => {
    if (!wp.damage) return "-";
    if (Array.isArray(wp.damage)) {
      return wp.damage.map((d) => `${d.min}~${d.max}`).join(" / ");
    }
    return wp.damage;
  };

  const getDps = (wp) => {
    if (wp.modes && Array.isArray(wp.modes)) {
      return wp.modes.map((m) => m.dps).join(" / ");
    }
    return wp.dps || "-";
  };

  const getRpm = (wp) => {
    if (wp.modes && Array.isArray(wp.modes)) {
      return wp.modes.map((m) => m.rpm).join(" / ");
    }
    return wp.rpm || "-";
  };

  const getDecrease = (wp) => {
    const specialTexts = {
      M416: "60m 이후 감소",
      AUG: "65m 이후 감소",
      "Beryl M762": "60m 이후 감소",
      AKM: "60m 이후 감소",
      "SCAR-L": "60m 이후 감소",
      ACE32: "60m 이후 감소",
      G36C: "60m 이후 감소",
      QBZ: "60m 이후 감소",
      K2: "60m 이후 감소",
      M16A4: "65m 이후 감소",
      "Mk47 Mutant": "65m 이후 감소",
      Groza: "60m 이후 감소",
      FAMAS: "65m 이후 감소",
      Dragunov: "100m까지 감쇄 없음",
      SLR: "100m까지 감쇄 없음",
      SKS: "100m까지 감쇄 없음",
      Mk12: "100m까지 감쇄 없음",
      "Mini 14": "100m까지 감쇄 없음",
      QBU: "100m까지 감쇄 없음",
      VSS: "50m 이후 급격히 감소",
      Mk14: "120m까지 감쇄 없음",
      Kar98k: "100m까지 감쇄 없음",
      M24: "100m까지 감쇄 없음",
      "Mosin Nagant": "100m까지 감쇄 없음",
      Win94: "100m 이후 서서히 감소",
      AWM: "감쇄 체감 불가",
      "Lynx AMR": "감쇄 없음",
      Vector: "20m 이후 급격히 감소",
      UMP: "40m 이후 감소 시작",
      "Micro UZI": "20m 이후 급격히 감소",
      JS9: "30m 이후 감소",
      "PP-19 Bizon": "35m 이후 감소",
      MP5K: "30m 이후 감소",
      "Tommy Gun": "30m 이후 급격히 감소",
      P90: "50m까지 감쇄 없음",
      DBS: "15m 이후 급격히 감소",
      S686: "10m 이후 급격히 감소",
      S1897: "12m 이후 급격히 감소",
      S12K: "15m 이후 급격히 감소",
      O12: "30m 이후 감소 시작",
      M249: "70m 이후 감소",
      "DP-28": "65m 이후 감소",
      MG3: "60m 이후 감소",
      Deagle: "25m 이후 감소",
      P18C: "15m 이후 급격히 감소",
      Skorpion: "20m 이후 급격히 감소",
      "Sawed-Off": "5m 이후 대미지 소멸",
      P1911: "20m 이후 감소",
      P92: "20m 이후 감소",
      R1895: "25m 이후 감소",
      R45: "25m 이후 감소",
      Crossbow: "탄낙차가 매우 심함",
      Panzerfaust: "거리 감소 없음",
      M79: "대미지는 없으나, 원거리에 즉시 시야 차단용 연막 차장",
      Mortar: "거리 감소 없음",
    };

    if (specialTexts[wp.name]) return specialTexts[wp.name];
    if (wp.decrease) return `${wp.decrease} 이후 감소`;
    if (wp.inter && Array.isArray(wp.inter)) {
      return wp.inter.map((i) => `${i.min}m ~ ${i.max}m (사거리)`).join(" / ");
    }
    return "-";
  };

  const getWeaponImage = (name) => {
    const exceptionMap = {
      Dragunov: "SVD",
      "Beryl M762": "m762",
      "SCAR-L": "scarl",
      "Mk47 Mutant": "mk47",
      "Mosin Nagant": "Mosin",
      "Lynx AMR": "AMR",
      "Micro UZI": "UZI",
      "PP-19 Bizon": "PP19",
      "Tommy Gun": "TommyGun",
      "Sawed-Off": "Sawedoff",
      "DP-24": "DP28",
      "STUN GUN": "Stungun",
      Crossbow: "CrossBow",
    };
    if (exceptionMap[name]) return WeaponImages[exceptionMap[name]];
    const cleanName = name.replace(/[-_\s]/g, "").toLowerCase();
    const matchedKey = Object.keys(WeaponImages).find(
      (key) => key.toLowerCase() === cleanName
    );
    return matchedKey ? WeaponImages[matchedKey] : null;
  };

  const allWeaponsData = [
    ...arData,
    ...dmrData,
    ...srData,
    ...smgData,
    ...shotgunData,
    ...lmgData,
    ...handgunData,
    ...etcData,
  ];
  return (
    <>
      <ListHeader>
        <HeaderName>총기 이름</HeaderName>
        <Line />
        <HeaderInfo>총기 정보</HeaderInfo>
      </ListHeader>

      <WeaponList>
        {allWeaponsData.map((weapon, index) => (
          <WeaponRow key={`${weapon.name}-${index}`}>
            <ImageBox>
              <WeaponImgBox>
                <Image src={getWeaponImage(weapon.name)} alt={weapon.name} />
              </WeaponImgBox>
              <WeaponName>{weapon.name}</WeaponName>
            </ImageBox>

            <InfoContainer>
              <InfoColumn>
                <InfoText>사용 탄환 : {weapon.ammo || "-"}</InfoText>
                <InfoText>기본 데미지 : {getDamage(weapon)}</InfoText>
              </InfoColumn>
              <InfoColumn>
                <InfoText>초당 피해량 : {getDps(weapon)}</InfoText>
                <InfoText>
                  탄속 : {weapon.velocity ? `${weapon.velocity}m/s` : "-"}
                </InfoText>
              </InfoColumn>
              <InfoColumn>
                <InfoText>RPM : {getRpm(weapon)}</InfoText>
                <InfoText>데미지 감소 : {getDecrease(weapon)}</InfoText>
              </InfoColumn>
            </InfoContainer>
          </WeaponRow>
        ))}
      </WeaponList>
    </>
  );
}
