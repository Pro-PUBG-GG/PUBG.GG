import React, { useState } from "react";
import Header from "../component/Header";
import back_image from "../assets/Simulation.png";
import { WeaponImages, PartImages } from "../assets/index.js";

// 위에서 제작한 스타일 파일 매핑 연동
import * as S from "./Simulation.styles";

// ==========================================
// 1. 총기별 부착물 고증 매핑 데이터
// ==========================================
const GUN_SETTINGS = {
  M416: {
    name: "M416",
    category: "AR",
    allowedParts: {
      scope: ["red_dot", "holograpic", "hybrid", "two_scope", "three_scope", "four_scope", "six_scope"],
      muzzle: ["muzzle_brake", "compensator", "suppressor", "flask_hider"],
      grip: ["half_grip", "vertical_foregrip", "thumb_grip", "lightweight_grip", "laser_sight", "tilted_grip"],
      magazine: ["extended_mag", "quickdraw_mag", "ext_quickdraw_mag"],
      stock: ["tactical_stock", "heavy_stock"]
    }
  },
  akm: {
    name: "akm",
    category: "AR",
    allowedParts: {
      scope: ["red_dot", "holograpic", "hybrid", "two_scope", "three_scope", "four_scope", "six_scope"],
      muzzle: ["muzzle_brake", "compensator", "suppressor", "flask_hider"],
      magazine: ["extended_mag", "quickdraw_mag", "ext_quickdraw_mag"]
    }
  },
  aug: {
    name: "aug",
    category: "AR",
    allowedParts: {
      scope: ["red_dot", "holograpic", "hybrid", "two_scope", "three_scope", "four_scope", "six_scope"],
      muzzle: ["muzzle_brake", "compensator", "suppressor", "flask_hider"],
      grip: ["half_grip", "vertical_foregrip", "thumb_grip", "lightweight_grip", "laser_sight", "tilted_grip"],
      magazine: ["extended_mag", "quickdraw_mag", "ext_quickdraw_mag"]
    }
  },
  ace32: {
    name: "ace32",
    category: "AR",
    allowedParts: {
      scope: ["red_dot", "holograpic", "hybrid", "two_scope", "three_scope", "four_scope", "six_scope"],
      muzzle: ["muzzle_brake", "compensator", "suppressor", "flask_hider"],
      grip: ["half_grip", "vertical_foregrip", "thumb_grip", "lightweight_grip", "laser_sight", "tilted_grip"],
      magazine: ["extended_mag", "quickdraw_mag", "ext_quickdraw_mag"],
      stock: ["tactical_stock", "heavy_stock"]
    }
  },
  m762: {
    name: "m762",
    category: "AR",
    allowedParts: {
      scope: ["red_dot", "holograpic", "hybrid", "two_scope", "three_scope", "four_scope", "six_scope"],
      muzzle: ["muzzle_brake", "compensator", "suppressor", "flask_hider"],
      grip: ["half_grip", "vertical_foregrip", "thumb_grip", "lightweight_grip", "laser_sight", "tilted_grip"],
      magazine: ["extended_mag", "quickdraw_mag", "ext_quickdraw_mag"]
    }
  },
  m16a4: {
    name: "m16a4",
    category: "AR",
    allowedParts: {
      scope: ["red_dot", "holograpic", "hybrid", "two_scope", "three_scope", "four_scope", "six_scope"],
      muzzle: ["muzzle_brake", "compensator", "suppressor", "flask_hider"],
      magazine: ["extended_mag", "quickdraw_mag", "ext_quickdraw_mag"],
      stock: ["tactical_stock", "heavy_stock"]
    }
  },
  mk47: {
    name: "mk47",
    category: "AR",
    allowedParts: {
      scope: ["red_dot", "holograpic", "hybrid", "two_scope", "three_scope", "four_scope", "six_scope", "eight_scope", "max_scope"],
      muzzle: ["compensator", "suppressor", "flask_hider"],
      grip: ["half_grip", "vertical_foregrip", "thumb_grip", "lightweight_grip", "laser_sight", "tilted_grip"],
      magazine: ["extended_mag", "quickdraw_mag", "ext_quickdraw_mag"],
      stock: ["tactical_stock", "heavy_stock"]
    }
  },
  scar: {
    name: "scar",
    category: "AR",
    allowedParts: {
      scope: ["red_dot", "holograpic", "hybrid", "two_scope", "three_scope", "four_scope", "six_scope"],
      muzzle: ["muzzle_brake", "compensator", "suppressor", "flask_hider"],
      grip: ["half_grip", "vertical_foregrip", "thumb_grip", "lightweight_grip", "laser_sight", "tilted_grip"],
      magazine: ["extended_mag", "quickdraw_mag", "ext_quickdraw_mag"],
    }
  },
  k2: {
    name: "k2",
    category: "AR",
    allowedParts: {
      scope: ["red_dot", "holograpic", "hybrid", "two_scope", "three_scope", "four_scope", "six_scope"],
      muzzle: ["muzzle_brake", "compensator", "suppressor", "flask_hider"],
      magazine: ["extended_mag", "quickdraw_mag", "ext_quickdraw_mag"],
    }
  },
  qbz: {
    name: "qbz",
    category: "AR",
    allowedParts: {
      scope: ["red_dot", "holograpic", "hybrid", "two_scope", "three_scope", "four_scope", "six_scope"],
      muzzle: ["muzzle_brake", "compensator", "suppressor", "flask_hider"],
      grip: ["half_grip", "vertical_foregrip", "thumb_grip", "lightweight_grip", "laser_sight", "tilted_grip"],
      magazine: ["extended_mag", "quickdraw_mag", "ext_quickdraw_mag"],
    }
  },
  g36c: {
    name: "g36c",
    category: "AR",
    allowedParts: {
      scope: ["red_dot", "holograpic", "hybrid", "two_scope", "three_scope", "four_scope", "six_scope"],
      muzzle: ["muzzle_brake", "compensator", "suppressor", "flask_hider"],
      grip: ["half_grip", "vertical_foregrip", "thumb_grip", "lightweight_grip", "laser_sight", "tilted_grip"],
      magazine: ["extended_mag", "quickdraw_mag", "ext_quickdraw_mag"],
    }
  },
  famas: {
    name: "famas",
    category: "AR",
    allowedParts: {
      scope: ["red_dot", "holograpic", "hybrid", "two_scope", "three_scope", "four_scope", "six_scope"],
      muzzle: ["muzzle_brake", "compensator", "suppressor", "flask_hider"],
      magazine: ["extended_mag", "quickdraw_mag", "ext_quickdraw_mag"],
    }
  },
  groza: {
    name: "groza",
    category: "AR",
    allowedParts: {
      scope: ["red_dot", "holograpic", "hybrid", "two_scope", "three_scope", "four_scope", "six_scope"],
      muzzle: ["suppressor"],
      magazine: ["extended_mag", "quickdraw_mag", "ext_quickdraw_mag"],
    }
  },
  Kar98k: {
    name: "Kar98k",
    category: "SR",
    allowedParts: {
      scope: ["red_dot", "holograpic", "two_scope", "three_scope", "four_scope", "six_scope", "eight_scope", "max_scope"],
      muzzle: ["compensator", "suppressor", "flask_hider"],
      stock: ["bullet_loops", "cheek_pad"]
    }
  },
  M24: {
    name: "M24",
    category: "SR",
    allowedParts: {
      scope: ["red_dot", "holograpic", "two_scope", "three_scope", "four_scope", "six_scope", "eight_scope", "max_scope"],
      muzzle: ["compensator", "suppressor", "flask_hider"],
      magazine: ["extended_mag", "ext_quickdraw_mag"],
      stock: ["cheek_pad"]
    }
  },
  AWM: {
    name: "AWM",
    category: "SR",
    allowedParts: {
      scope: ["red_dot", "holograpic", "two_scope", "three_scope", "four_scope", "six_scope", "eight_scope", "max_scope"],
      muzzle: ["compensator", "suppressor", "flask_hider"],
      magazine: ["extended_mag", "ext_quickdraw_mag"],
      stock: ["cheek_pad"]
    }
  },
  AMR: {
    name: "AMR",
    category: "SR",
    allowedParts: {
      scope: ["red_dot", "holograpic", "two_scope", "three_scope", "four_scope", "six_scope", "eight_scope", "max_scope"],
    }
  },
  SKS: {
    name: "SKS",
    category: "SR",
    allowedParts: {
      scope: ["red_dot", "holograpic", "hybrid", "two_scope", "three_scope", "four_scope", "six_scope", "eight_scope", "max_scope"],
      muzzle: ["compensator", "suppressor", "flask_hider"],
      grip: ["half_grip", "vertical_foregrip", "thumb_grip", "lightweight_grip", "laser_sight", "tilted_grip"],
      magazine: ["extended_mag", "ext_quickdraw_mag"],
      stock: ["cheek_pad"]
    }
  },
  SLR: {
    name: "SLR",
    category: "SR",
    allowedParts: {
      scope: ["red_dot", "holograpic", "hybrid", "two_scope", "three_scope", "four_scope", "six_scope", "eight_scope", "max_scope"],
      muzzle: ["compensator", "suppressor", "flask_hider"],
      magazine: ["extended_mag", "ext_quickdraw_mag"],
      stock: ["cheek_pad"]
    }
  },
  SVD: {
    name: "SVD",
    category: "SR",
    allowedParts: {
      scope: ["red_dot", "holograpic", "hybrid", "two_scope", "three_scope", "four_scope", "six_scope", "eight_scope", "max_scope"],
      muzzle: ["compensator", "suppressor", "flask_hider"],
      magazine: ["extended_mag", "ext_quickdraw_mag"],
      stock: ["cheek_pad"]
    }
  },
  MK14: {
    name: "MK14",
    category: "SR",
    allowedParts: {
      scope: ["red_dot", "holograpic", "hybrid", "two_scope", "three_scope", "four_scope", "six_scope", "eight_scope", "max_scope"],
      muzzle: ["compensator", "suppressor", "flask_hider"],
      magazine: ["extended_mag", "ext_quickdraw_mag"],
      stock: ["cheek_pad"]
    }
  },
  mini14: {
    name: "mini14",
    category: "SR",
    allowedParts: {
      scope: ["red_dot", "holograpic", "hybrid", "two_scope", "three_scope", "four_scope", "six_scope", "eight_scope", "max_scope"],
      muzzle: ["compensator", "suppressor", "flask_hider"],
      magazine: ["extended_mag", "ext_quickdraw_mag"],
    }
  },
  MK12: {
    name: "MK12",
    category: "SR",
    allowedParts: {
      scope: ["red_dot", "holograpic", "hybrid", "two_scope", "three_scope", "four_scope", "six_scope", "eight_scope", "max_scope"],
      muzzle: ["compensator", "suppressor", "flask_hider"],
      grip: ["half_grip", "vertical_foregrip", "thumb_grip", "lightweight_grip", "laser_sight", "tilted_grip"],
      magazine: ["extended_mag", "ext_quickdraw_mag"],
    }
  },
  qbu: {
    name: "qbu",
    category: "SR",
    allowedParts: {
      scope: ["red_dot", "holograpic", "hybrid", "two_scope", "three_scope", "four_scope", "six_scope", "eight_scope", "max_scope"],
      muzzle: ["compensator", "suppressor", "flask_hider"],
      magazine: ["extended_mag", "ext_quickdraw_mag"],
    }
  },
  VSS: {
    name: "VSS",
    category: "SR",
    allowedParts: {
      magazine: ["extended_mag", "ext_quickdraw_mag"],
      stock: ["cheek_pad"]
    }
  },
  Win94: {
    name: "Win94",
    category: "SR",
    allowedParts: {
      stock: ["bullet_loops"]
    }
  },
  UMP: {
    name: "UMP",
    category: "SMG",
    allowedParts: {
      scope: ["red_dot", "holograpic", "hybrid", "two_scope", "three_scope", "four_scope", "six_scope"],
      muzzle: ["compensator", "suppressor", "flask_hider"],
      grip: ["half_grip", "vertical_foregrip", "thumb_grip", "lightweight_grip", "laser_sight", "tilted_grip"],
      magazine: ["extended_mag", "quickdraw_mag", "ext_quickdraw_mag"],
    }
  },
  MP5K: {
    name: "MP5K",
    category: "SMG",
    allowedParts: {
      scope: ["red_dot", "holograpic", "hybrid", "two_scope", "three_scope", "four_scope", "six_scope"],
      muzzle: ["compensator", "suppressor", "flask_hider"],
      grip: ["half_grip", "vertical_foregrip", "thumb_grip", "lightweight_grip", "laser_sight", "tilted_grip"],
      magazine: ["extended_mag", "quickdraw_mag", "ext_quickdraw_mag"],
      stock: ["tactical_stock", "heavy_stock"]
    }
  },
  Vector: {
    name: "Vector",
    category: "SMG",
    allowedParts: {
      scope: ["red_dot", "holograpic", "hybrid", "two_scope", "three_scope", "four_scope", "six_scope"],
      muzzle: ["compensator", "suppressor", "flask_hider"],
      grip: ["half_grip", "vertical_foregrip", "thumb_grip", "lightweight_grip", "laser_sight", "tilted_grip"],
      magazine: ["extended_mag", "quickdraw_mag", "ext_quickdraw_mag"],
      stock: ["tactical_stock", "heavy_stock"]
    }
  },
  UZI: {
    name: "UZI",
    category: "SMG",
    allowedParts: {
      scope: ["red_dot", "holograpic"],
      muzzle: ["compensator", "suppressor", "flask_hider"],
      magazine: ["extended_mag", "quickdraw_mag", "ext_quickdraw_mag"],
      stock: ["folding_stock"]
    }
  },
  TommyGun: {
    name: "TommyGun",
    category: "SMG",
    allowedParts: {
      scope: ["red_dot", "holograpic"],
      muzzle: ["suppressor"],
      grip: ["vertical_foregrip"],
      magazine: ["extended_mag", "quickdraw_mag", "ext_quickdraw_mag"],
    }
  },
  PP19: {
    name: "PP19",
    category: "SMG",
    allowedParts: {
      scope: ["red_dot", "holograpic", "hybrid", "two_scope", "three_scope", "four_scope", "six_scope"],
      muzzle: ["compensator", "suppressor", "flask_hider"],
    }
  },
  JS9: {
    name: "JS9",
    category: "SMG",
    allowedParts: {
      scope: ["red_dot", "holograpic", "hybrid", "two_scope", "three_scope", "four_scope", "six_scope"],
      muzzle: ["compensator", "suppressor", "flask_hider"],
      magazine: ["extended_mag", "quickdraw_mag", "ext_quickdraw_mag"],
    }
  },
  MP9: {
    name: "MP9",
    category: "SMG",
    allowedParts: {
      scope: ["red_dot", "holograpic"],
      magazine: ["extended_mag", "quickdraw_mag", "ext_quickdraw_mag"],
      stock: ["folding_stock"]
    }
  },
  P90: {
    name: "P90",
    category: "SMG",
    allowedParts: {}
  },
  S12K: {
    name: "S12K",
    category: "SHOT",
    allowedParts: {
      scope: ["red_dot", "holograpic", "two_scope", "three_scope", "four_scope", "six_scope"],
      muzzle: ["muzzle_brake", "compensator", "suppressor", "duckbill", "choke"],
      magazine: ["extended_mag", "quickdraw_mag", "ext_quickdraw_mag"]
    }
  },
  S686: {
    name: "S686",
    category: "SHOT",
    allowedParts: {
      choke: ["choke"],
      bullet_loops: ["bullet_loops"]
    }
  },
  S1897: {
    name: "S1897",
    category: "SHOT",
    allowedParts: {
      choke: ["duckbill", "choke"],
      bullet_loops: ["bullet_loops"]
    }
  },
  DBS: {
    name: "DBS",
    category: "SHOT",
    allowedParts: {
      scope: ["red_dot", "holograpic", "two_scope", "three_scope", "four_scope", "six_scope"]
    }
  },
  O12: {
    name: "O12",
    category: "SHOT",
    allowedParts: {
      scope: ["red_dot", "holograpic", "two_scope", "three_scope", "four_scope", "six_scope"],
      muzzle: ["muzzle_brake", "compensator", "suppressor"],
      grip: ["half_grip", "vertical_foregrip", "thumb_grip", "lightweight_grip", "laser_sight", "tilted_grip"],
    }
  },
  Deagle: {
    name: "Deagle",
    category: "HG",
    allowedParts: {
      scope: ["red_dot", "holograpic"],
      grip: ["laser_sight"],
      magazine: ["extended_mag", "quickdraw_mag", "ext_quickdraw_mag"]
    }
  },
  P18C: {
    name: "P18C",
    category: "HG",
    allowedParts: {
      scope: ["red_dot", "holograpic"],
      muzzle: ["suppressor"],
      grip: ["laser_sight"],
      magazine: ["extended_mag", "quickdraw_mag", "ext_quickdraw_mag"]
    }
  },
  P92: {
    name: "P92",
    category: "HG",
    allowedParts: {
      scope: ["red_dot", "holograpic"],
      muzzle: ["suppressor"],
      grip: ["laser_sight"],
      magazine: ["extended_mag", "quickdraw_mag", "ext_quickdraw_mag"]
    }
  },
  P1911: {
    name: "P1911",
    category: "HG",
    allowedParts: {
      scope: ["red_dot", "holograpic"],
      muzzle: ["suppressor"],
      grip: ["laser_sight"],
      magazine: ["extended_mag", "quickdraw_mag", "ext_quickdraw_mag"]
    }
  },
  R45: {
    name: "R45",
    category: "HG",
    allowedParts: {
      scope: ["red_dot", "holograpic"],
      grip: ["laser_sight"],
    }
  },
  R1895: {
    name: "R1895",
    category: "HG",
    allowedParts: {
      muzzle: ["suppressor"]
    }
  },
  소드오프: {
    name: "소드오프",
    category: "HG",
    allowedParts: {
      choke: ["choke"],
    }
  },
  Skorpion: {
    name: "Skorpion",
    category: "HG",
    allowedParts: {
      scope: ["red_dot", "holograpic"],
      muzzle: ["suppressor"],
      grip: ["half_grip", "vertical_foregrip", "lightweight_grip", "laser_sight"],
      magazine: ["extended_mag", "quickdraw_mag", "ext_quickdraw_mag"],
      stock: ["folding_stock"]
    }
  },
  M249: {
    name: "M249",
    category: "LMG",
    allowedParts: {
      scope: ["red_dot", "holograpic", "hybrid", "two_scope", "three_scope", "four_scope", "six_scope"],
      magazine: ["extended_mag", "quickdraw_mag", "ext_quickdraw_mag"],
      stock: ["tactical_stock", "heavy_stock"]
    }
  },
  MG3: {
    name: "MG3",
    category: "LMG",
    allowedParts: {
      scope: ["red_dot", "holograpic", "hybrid", "two_scope", "three_scope", "four_scope", "six_scope"],
    }
  },
  DP28: {
    name: "DP28",
    category: "LMG",
    allowedParts: {
      scope: ["red_dot", "holograpic", "hybrid", "two_scope", "three_scope", "four_scope", "six_scope"],
    }
  }
};

// 사전 정보 데이터 매핑
const PART_NAMES = {
  muzzle_brake: "제동기", compensator: "보정기", suppressor: "소음기", flask_hider: "소염기", duckbill: "덕빌",
  half_grip: "하프 그립", vertical_foregrip: "수직 손잡이", thumb_grip: "엄지 그립", lightweight_grip: "라이트 그립", tilted_grip: "틸티드 그립", laser_sight: "레이저 사이트",
  extended_mag: "대용량 탄창", quickdraw_mag: "퀵드로우 탄창", ext_quickdraw_mag: "대용량 퀵드로우 탄창",
  heavy_stock: "중량형 개머리판", tactical_stock: "전술 개머리판", cheek_pad: "칙패드", folding_stock: "접이식 개머리판",
  choke: "초크", bullet_loops: "탄띠",
  red_dot: "레드도트 사이트", holograpic: "홀로그램 사이트", hybrid: "캔티드 사이트", two_scope: "2배율 스코프", three_scope: "3배율 스코프", four_scope: "4배율 스코프", six_scope: "6배율 스코프", eight_scope: "8배율 스코프", max_scope: "15배율 스코프"
};

const SLOT_LABELS = { muzzle: "총구 부착물", grip: "손잡이", magazine: "탄창", stock: "개머리판", choke: "초크", bullet_loops: "탄띠", scope: "스코프" };
const CATEGORY_TO_PART_NUM = { AR: "1", SR: "2", SMG: "3", SHOT: "1", HG: "3" };

const DEFAULT_GUN_STATS = {
  vertical: 0, horizontal: 0, adsSpeed: 0, stability: 0,
  pattern: 0, spread: 0, choke: 0, duckbill: 0, oneshot: 0,
  breath: 0, control: 0, first: 0, lazer: 0, recovery: 0, reload: 0, deviation: 0
};

// 시뮬레이션용 스탯 수치 데이터
const GUN_STATS = {
  M416: { ...DEFAULT_GUN_STATS, vertical: 50, horizontal: 45, adsSpeed: 50, stability: 60, pattern: 45, breath: 50, first: 40, control: 20, deviation: 25, spread: 15, lazer: 20, oneshot: 35, recovery: 30, reload: 25 },
  akm: { ...DEFAULT_GUN_STATS, vertical: 65, horizontal: 55, adsSpeed: 45, stability: 40, pattern: 30, breath: 35, first: 60, control: 15, deviation: 35, spread: 10, lazer: 15, oneshot: 25, recovery: 20, reload: 20 },
  aug: { ...DEFAULT_GUN_STATS, vertical: 48, horizontal: 42, adsSpeed: 52, stability: 63, pattern: 50, breath: 55, first: 35, control: 25, deviation: 22, spread: 18, lazer: 22, oneshot: 32, recovery: 35, reload: 22 },
  ace32: { ...DEFAULT_GUN_STATS, vertical: 55, horizontal: 48, adsSpeed: 50, stability: 55, pattern: 42, breath: 45, first: 45, control: 18, deviation: 28, spread: 14, lazer: 18, oneshot: 30, recovery: 28, reload: 24 },
  m762: { ...DEFAULT_GUN_STATS, vertical: 62, horizontal: 52, adsSpeed: 48, stability: 45, pattern: 35, breath: 40, first: 55, control: 12, deviation: 32, spread: 12, lazer: 16, oneshot: 28, recovery: 22, reload: 23 },
  m16a4: { ...DEFAULT_GUN_STATS, vertical: 45, horizontal: 40, adsSpeed: 55, stability: 65, pattern: 10, breath: 60, first: 30, control: 35, deviation: 15, spread: 25, lazer: 25, oneshot: 60, recovery: 55, reload: 26 },
  mk47: { ...DEFAULT_GUN_STATS, vertical: 58, horizontal: 46, adsSpeed: 46, stability: 50, pattern: 15, breath: 52, first: 50, control: 22, deviation: 20, spread: 20, lazer: 20, oneshot: 55, recovery: 50, reload: 21 },
  scar: { ...DEFAULT_GUN_STATS, vertical: 46, horizontal: 38, adsSpeed: 50, stability: 62, pattern: 48, breath: 50, first: 38, control: 24, deviation: 24, spread: 16, lazer: 21, oneshot: 34, recovery: 32, reload: 27 },
  k2: { ...DEFAULT_GUN_STATS, vertical: 52, horizontal: 44, adsSpeed: 48, stability: 58, pattern: 40, breath: 48, first: 42, control: 18, deviation: 26, spread: 13, lazer: 17, oneshot: 33, recovery: 29, reload: 24 },
  qbz: { ...DEFAULT_GUN_STATS, vertical: 49, horizontal: 41, adsSpeed: 50, stability: 61, pattern: 46, breath: 52, first: 36, control: 22, deviation: 23, spread: 16, lazer: 20, oneshot: 36, recovery: 31, reload: 25 },
  g36c: { ...DEFAULT_GUN_STATS, vertical: 50, horizontal: 43, adsSpeed: 49, stability: 60, pattern: 44, breath: 50, first: 41, control: 20, deviation: 25, spread: 15, lazer: 19, oneshot: 35, recovery: 30, reload: 23 },
  famas: { ...DEFAULT_GUN_STATS, vertical: 54, horizontal: 46, adsSpeed: 54, stability: 56, pattern: 38, breath: 46, first: 48, control: 16, deviation: 30, spread: 22, lazer: 24, oneshot: 26, recovery: 25, reload: 15 },
  groza: { ...DEFAULT_GUN_STATS, vertical: 56, horizontal: 42, adsSpeed: 52, stability: 58, pattern: 46, breath: 48, first: 46, control: 26, deviation: 28, spread: 25, lazer: 26, oneshot: 32, recovery: 34, reload: 18 },
  Kar98k: { ...DEFAULT_GUN_STATS, vertical: 30, horizontal: 50, adsSpeed: 30, stability: 20, pattern: 0, breath: 65, first: 90, control: 5, deviation: 5, spread: 5, lazer: 5, oneshot: 15, recovery: 40, reload: 12 },
  M24: { ...DEFAULT_GUN_STATS, vertical: 32, horizontal: 48, adsSpeed: 32, stability: 22, pattern: 0, breath: 70, first: 85, control: 6, deviation: 4, spread: 5, lazer: 5, oneshot: 18, recovery: 45, reload: 16 },
  AWM: { ...DEFAULT_GUN_STATS, vertical: 25, horizontal: 55, adsSpeed: 28, stability: 25, pattern: 0, breath: 75, first: 95, control: 4, deviation: 2, spread: 4, lazer: 4, oneshot: 12, recovery: 50, reload: 14 },
  AMR: { ...DEFAULT_GUN_STATS, vertical: 15, horizontal: 65, adsSpeed: 22, stability: 15, pattern: 0, breath: 80, first: 99, control: 2, deviation: 1, spread: 2, lazer: 2, oneshot: 8, recovery: 30, reload: 10 },
  SKS: { ...DEFAULT_GUN_STATS, vertical: 55, horizontal: 45, adsSpeed: 42, stability: 45, pattern: 5, breath: 55, first: 65, control: 15, deviation: 15, spread: 8, lazer: 10, oneshot: 42, recovery: 45, reload: 22 },
  SLR: { ...DEFAULT_GUN_STATS, vertical: 65, horizontal: 50, adsSpeed: 40, stability: 38, pattern: 5, breath: 50, first: 75, control: 10, deviation: 18, spread: 7, lazer: 8, oneshot: 35, recovery: 38, reload: 21 },
  SVD: { ...DEFAULT_GUN_STATS, vertical: 68, horizontal: 52, adsSpeed: 38, stability: 35, pattern: 5, breath: 48, first: 80, control: 8, deviation: 19, spread: 6, lazer: 7, oneshot: 32, recovery: 35, reload: 20 },
  MK14: { ...DEFAULT_GUN_STATS, vertical: 72, horizontal: 55, adsSpeed: 36, stability: 30, pattern: 25, breath: 45, first: 85, control: 5, deviation: 22, spread: 10, lazer: 9, oneshot: 28, recovery: 32, reload: 17 },
  mini14: { ...DEFAULT_GUN_STATS, vertical: 40, horizontal: 35, adsSpeed: 46, stability: 55, pattern: 8, breath: 62, first: 45, control: 25, deviation: 10, spread: 12, lazer: 14, oneshot: 55, recovery: 58, reload: 25 },
  MK12: { ...DEFAULT_GUN_STATS, vertical: 45, horizontal: 38, adsSpeed: 44, stability: 52, pattern: 8, breath: 60, first: 50, control: 22, deviation: 12, spread: 11, lazer: 13, oneshot: 50, recovery: 54, reload: 24 },
  qbu: { ...DEFAULT_GUN_STATS, vertical: 43, horizontal: 36, adsSpeed: 45, stability: 54, pattern: 8, breath: 61, first: 48, control: 24, deviation: 11, spread: 11, lazer: 13, oneshot: 52, recovery: 56, reload: 23 },
  VSS: { ...DEFAULT_GUN_STATS, vertical: 35, horizontal: 30, adsSpeed: 50, stability: 65, pattern: 35, breath: 55, first: 35, control: 30, deviation: 8, spread: 30, lazer: 35, oneshot: 48, recovery: 50, reload: 20 },
  Win94: { ...DEFAULT_GUN_STATS, vertical: 38, horizontal: 40, adsSpeed: 52, stability: 50, pattern: 0, breath: 58, first: 60, control: 28, deviation: 14, spread: 15, lazer: 15, oneshot: 45, recovery: 48, reload: 35 },
  UMP: { ...DEFAULT_GUN_STATS, vertical: 35, horizontal: 30, adsSpeed: 65, stability: 75, pattern: 60, breath: 55, first: 25, control: 45, deviation: 15, spread: 60, lazer: 55, oneshot: 45, recovery: 48, reload: 30 },
  MP5K: { ...DEFAULT_GUN_STATS, vertical: 38, horizontal: 32, adsSpeed: 62, stability: 70, pattern: 55, breath: 52, first: 30, control: 40, deviation: 18, spread: 55, lazer: 50, oneshot: 42, recovery: 44, reload: 26 },
  Vector: { ...DEFAULT_GUN_STATS, vertical: 32, horizontal: 28, adsSpeed: 70, stability: 80, pattern: 65, breath: 50, first: 20, control: 50, deviation: 12, spread: 65, lazer: 60, oneshot: 50, recovery: 52, reload: 28 },
  UZI: { ...DEFAULT_GUN_STATS, vertical: 28, horizontal: 25, adsSpeed: 75, stability: 85, pattern: 70, breath: 45, first: 15, control: 55, deviation: 10, spread: 75, lazer: 70, oneshot: 55, recovery: 58, reload: 32 },
  TommyGun: { ...DEFAULT_GUN_STATS, vertical: 45, horizontal: 40, adsSpeed: 58, stability: 60, pattern: 40, breath: 48, first: 40, control: 30, deviation: 22, spread: 45, lazer: 40, oneshot: 38, recovery: 36, reload: 24 },
  PP19: { ...DEFAULT_GUN_STATS, vertical: 34, horizontal: 29, adsSpeed: 63, stability: 73, pattern: 58, breath: 54, first: 28, control: 43, deviation: 16, spread: 58, lazer: 53, oneshot: 44, recovery: 46, reload: 22 },
  JS9: { ...DEFAULT_GUN_STATS, vertical: 33, horizontal: 27, adsSpeed: 66, stability: 76, pattern: 62, breath: 53, first: 22, control: 47, deviation: 14, spread: 62, lazer: 58, oneshot: 47, recovery: 50, reload: 27 },
  MP9: { ...DEFAULT_GUN_STATS, vertical: 30, horizontal: 26, adsSpeed: 72, stability: 82, pattern: 68, breath: 47, first: 18, control: 52, deviation: 11, spread: 70, lazer: 65, oneshot: 52, recovery: 55, reload: 30 },
  P90: { ...DEFAULT_GUN_STATS, vertical: 48, horizontal: 40, adsSpeed: 68, stability: 78, pattern: 64, breath: 58, first: 24, control: 48, deviation: 13, spread: 64, lazer: 62, oneshot: 48, recovery: 52, reload: 35 },
  S12K: { ...DEFAULT_GUN_STATS, vertical: 70, horizontal: 60, adsSpeed: 40, stability: 30, pattern: 10, breath: 30, first: 80, control: 5, deviation: 50, spread: 5, lazer: 10, oneshot: 20, recovery: 15, reload: 25 },
  S686: { ...DEFAULT_GUN_STATS, vertical: 60, horizontal: 50, adsSpeed: 45, stability: 40, pattern: 0, breath: 35, first: 70, control: 10, deviation: 40, spread: 8, lazer: 15, oneshot: 40, recovery: 30, reload: 40 },
  S1897: { ...DEFAULT_GUN_STATS, vertical: 65, horizontal: 55, adsSpeed: 35, stability: 35, pattern: 0, breath: 25, first: 75, control: 8, deviation: 45, spread: 6, lazer: 12, oneshot: 10, recovery: 10, reload: 15 },
  DBS: { ...DEFAULT_GUN_STATS, vertical: 55, horizontal: 45, adsSpeed: 48, stability: 45, pattern: 5, breath: 40, first: 65, control: 15, deviation: 35, spread: 12, lazer: 20, oneshot: 35, recovery: 25, reload: 18 },
  O12: { ...DEFAULT_GUN_STATS, vertical: 75, horizontal: 65, adsSpeed: 42, stability: 32, pattern: 15, breath: 32, first: 85, control: 4, deviation: 48, spread: 7, lazer: 11, oneshot: 22, recovery: 18, reload: 22 },
  Deagle: { ...DEFAULT_GUN_STATS, vertical: 80, horizontal: 60, adsSpeed: 60, stability: 30, breath: 40, first: 90, spread: 30, lazer: 20, oneshot: 15, recovery: 15, reload: 30 },
  P18C: { ...DEFAULT_GUN_STATS, vertical: 45, horizontal: 35, adsSpeed: 80, stability: 65, pattern: 40, breath: 45, first: 30, spread: 60, lazer: 55, oneshot: 45, recovery: 40, reload: 35 },
  P92: { ...DEFAULT_GUN_STATS, vertical: 40, horizontal: 30, adsSpeed: 75, stability: 55, breath: 50, first: 40, spread: 50, lazer: 45, oneshot: 50, recovery: 45, reload: 40 },
  P1911: { ...DEFAULT_GUN_STATS, vertical: 50, horizontal: 35, adsSpeed: 72, stability: 50, breath: 48, first: 50, spread: 45, lazer: 40, oneshot: 40, recovery: 38, reload: 38 },
  R45: { ...DEFAULT_GUN_STATS, vertical: 65, horizontal: 45, adsSpeed: 65, stability: 40, breath: 45, first: 75, spread: 35, lazer: 30, oneshot: 25, recovery: 25, reload: 20 },
  R1895: { ...DEFAULT_GUN_STATS, vertical: 75, horizontal: 50, adsSpeed: 55, stability: 35, breath: 42, first: 85, spread: 25, lazer: 20, oneshot: 20, recovery: 20, reload: 10 },
  소드오프: { ...DEFAULT_GUN_STATS, vertical: 85, horizontal: 70, adsSpeed: 50, stability: 20, breath: 20, first: 95, spread: 10, lazer: 10, oneshot: 5, recovery: 5, reload: 15 },
  Skorpion: { ...DEFAULT_GUN_STATS, vertical: 42, horizontal: 32, adsSpeed: 78, stability: 60, pattern: 45, breath: 42, first: 35, spread: 55, lazer: 50, oneshot: 42, recovery: 38, reload: 28 },
  M249: { ...DEFAULT_GUN_STATS, vertical: 58, horizontal: 54, adsSpeed: 35, stability: 50, pattern: 38, breath: 45, first: 65, control: 14, deviation: 30, spread: 20, lazer: 15, oneshot: 25, recovery: 24, reload: 10 },
  MG3: { ...DEFAULT_GUN_STATS, vertical: 54, horizontal: 48, adsSpeed: 38, stability: 55, pattern: 44, breath: 48, first: 58, control: 18, deviation: 26, spread: 22, lazer: 18, oneshot: 28, recovery: 28, reload: 12 },
  DP28: { ...DEFAULT_GUN_STATS, vertical: 46, horizontal: 42, adsSpeed: 32, stability: 52, pattern: 35, breath: 50, first: 45, control: 25, deviation: 24, spread: 15, lazer: 12, oneshot: 40, recovery: 35, reload: 14 }
};

const PART_EFFECTS = {
  flask_hider1: { vertical: 10, horizontal: 10, pattern: 10 },
  flask_hider2: { vertical: 10, horizontal: 10, pattern: 10 },
  flask_hider3: { vertical: 10, horizontal: 10, pattern: 10 },
  compensator1: { vertical: 15, horizontal: 10, pattern: 25, spread: 10 },
  compensator2: { vertical: 20, horizontal: 20, pattern: 25 },
  compensator3: { vertical: 25, horizontal: 20, pattern: 25 },
  suppressor1: { deviation: 10, stability: 5 },
  suppressor2: { deviation: 10, stability: 5 },
  suppressor3: { deviation: 10, stability: 5 },
  muzzle_brake: { vertical: 10, horizontal: 8, stability: 35 },
  choke: { choke: 15, spread: 10 },
  duckbill: { duckbill: 20, vertical: 10 },
  vertical_foregrip: { vertical: 15 },
  thumb_grip: { vertical: 10, adsSpeed: 40, oneshot: 10, breath: 20 },
  half_grip: { vertical: 8, horizontal: 16, breath: -10, oneshot: 10 },
  lightweight_grip: { oneshot: 20, breath: 20, control: 10, first: 30 },
  tilted_grip: { vertical: 12, horizontal: 6, stability: 25 },
  laser_sight: { lazer: 30, spread: 15 },
  quickdraw_mag: { reload: 30 },
  ext_quickdraw_mag: { reload: 30 },
  tactical_stock: { adsSpeed: 10, breath: 10, control: 10, first: 5 },
  heavy_stock: { vertical: 10, horizontal: 10, adsSpeed: -10, oneshot: 5, lazer: -10 },
  cheek_pad: { vertical: 20, horizontal: 10, breath: 15, oneshot: 10, control: 20 },
  bullet_loops: { reload: 30, spread: 10 },
  folding_stock: { vertical: 20, recovery: 15 }
};

const STAT_LABELS = {
  deviation: "탄착군 편차 제어", vertical: "수직 반동 제어", horizontal: "수평 반동 제어", adsSpeed: "조준 속도 (ADS)",
  stability: "사격 시 시야 흔들림 제어", pattern: "총기 반동 패턴 제어", spread: "지향 사격 탄퍼짐 감소", choke: "산탄 탄착군 집탄율",
  duckbill: "산탄 좌우 확산 비율", oneshot: "단발 사격 후 반동 회복 속도", breath: "호흡 흔들림 제어", control: "총구 들림 제어",
  first: "초탄 반동 제어", lazer: "비조준 사격 정확도", recovery: "반동 회복력", reload: "재장전 속도 완료"
};

export default function SimulationPage() {
  const [currentGun, setCurrentGun] = useState("M416");
  const [activeSlot, setActiveSlot] = useState(null);

  const [equippedParts, setEquippedParts] = useState({
    muzzle: "", grip: "", magazine: "", stock: "", choke: "", bullet_loops: "", scope: ""
  });

  const gunConfig = GUN_SETTINGS[currentGun] || { category: "AR", allowedParts: {} };
  const partSuffix = CATEGORY_TO_PART_NUM[gunConfig.category] || "1";
  
  // 현재 총기에서 허용되는 부착물 종류 목록 배열 추출
  const activeSlots = Object.keys(gunConfig.allowedParts);

  const handleGunSelect = (e) => {
    const gunKey = e.target.value;
    setCurrentGun(gunKey);
    // 총 교체 시 장착한 파츠 전체 초기화
    setEquippedParts({ muzzle: "", grip: "", magazine: "", stock: "", choke: "", bullet_loops: "", scope: "" });
    setActiveSlot(null);
  };

  const handlePartSelect = (slotType, partName) => {
    setEquippedParts(prev => ({ ...prev, [slotType]: partName }));
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

  // 실시간 변경 스탯 최종 누적 계산 연산
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

  return (
    <>
      <S.GlobalStyle />
      <S.Container $bg={back_image}>
        <S.HeaderWrapper>
          <Header name="sim" />
        </S.HeaderWrapper>

        <S.Box>
          {/* 상단 타이틀 & 총기 교체 드롭다운 선택 메뉴 */}
          <S.TitleSection>
            <S.GunTitle>
              {currentGun.toUpperCase()}
              <span>{gunConfig.category}</span>
            </S.GunTitle>
            <S.GunSelect value={currentGun} onChange={handleGunSelect}>
              {Object.keys(GUN_SETTINGS).map((k) => (
                <option key={k} value={k}>
                  {k.toUpperCase()}
                </option>
              ))}
            </S.GunSelect>
          </S.TitleSection>

          {/* 메인 레이아웃 구역: 좌측 디스플레이 스페이스 / 우측 장착 전용 칸 리스트 */}
          <S.ContentWrapper>
            
            {/* [왼쪽 영역] 총기 이미지만 정중앙에 깔끔하게 디스플레이 */}
            <S.DisplayArea>
              <S.MainImageWrapper>
                <img src={WeaponImages[currentGun]} alt={currentGun} />
              </S.MainImageWrapper>
            </S.DisplayArea>

            {/* [오른쪽 영역] 총기와 겹치지 않고 세로로 가지런히 배치되는 파츠 장착 전용 칸들 */}
            <S.PartSlotContainer>
              {activeSlots.map((slotType) => {
                const basePartName = equippedParts[slotType];
                const finalPartKey = getFinalPartKey(basePartName);
                const allowedOptions = gunConfig.allowedParts[slotType] || [];
                const hasPart = !!basePartName;

                return (
                  <S.PartSlot 
                    key={slotType} 
                    $hasPart={hasPart} 
                    onClick={() => setActiveSlot(activeSlot === slotType ? null : slotType)}
                  >
                    {/* 파츠의 아이콘 이미지 영역 */}
                    <S.SlotIcon>
                      {hasPart && PartImages[finalPartKey] ? (
                        <img src={PartImages[finalPartKey]} alt={slotType} />
                      ) : (
                        <span className="plus">+</span>
                      )}
                    </S.SlotIcon>

                    {/* 슬롯 타입명 및 실시간 장착된 파츠 명칭 텍스트 */}
                    <S.SlotInfo $hasPart={hasPart}>
                      <span className="type">{SLOT_LABELS[slotType] || slotType}</span>
                      <span className="name">
                        {hasPart ? (PART_NAMES[basePartName] || basePartName) : "비어 있음"}
                      </span>
                    </S.SlotInfo>

                    {/* 클릭 시 아래로 열리는 부착물 옵션 모달 */}
                    {activeSlot === slotType && allowedOptions.length > 0 && (
                      <S.PartSelectModal onClick={(e) => e.stopPropagation()}>
                        {allowedOptions.map((opt) => {
                          const optKey = getFinalPartKey(opt);
                          return (
                            <S.PartItem key={opt} onClick={() => handlePartSelect(slotType, opt)}>
                              {PartImages[optKey] && <img src={PartImages[optKey]} alt={opt} />}
                              <span>{PART_NAMES[opt] || opt}</span>
                            </S.PartItem>
                          );
                        })}
                        {hasPart && (
                          <S.RemovePartItem onClick={() => handlePartSelect(slotType, "")}>
                            장착 해제
                          </S.RemovePartItem>
                        )}
                      </S.PartSelectModal>
                    )}
                  </S.PartSlot>
                );
              })}
            </S.PartSlotContainer>
          </S.ContentWrapper>

          {/* 하단 실시간 시뮬레이션 스펙 테이블 구역 */}
          <S.Stat>
            <S.StatTitle>{currentGun.toUpperCase()} 실시간 시뮬레이션 스펙</S.StatTitle>
            <S.StatGrid>
              {Object.keys(baseStats).map((key) => {
                const baseValue = baseStats[key];
                const changeValue = totalChanges[key] || 0;
                const finalValue = Math.max(0, Math.min(100, baseValue + changeValue));

                let status = "none";
                if (changeValue > 0) status = "up";
                if (changeValue < 0) status = "down";

                return (
                  <S.StatItem key={key} $status={status}>
                    <span className="label">{STAT_LABELS[key] || key}</span>
                    <div>
                      <span className="base-value">{finalValue}</span>
                      {changeValue !== 0 && (
                        <span className="change-value">
                          {changeValue > 0 ? ` (+${changeValue}%)` : ` (${changeValue}%)`}
                        </span>
                      )}
                    </div>
                  </S.StatItem>
                );
              })}
            </S.StatGrid>
          </S.Stat>

          <S.Info>
            * 본 스탯 수치는 비공식적으로 임의로 정한 값으로 대략적인 스탯을 나타내는 수치입니다. (M416 기준으로 스탯을 정했습니다)
          </S.Info>
        </S.Box>
      </S.Container>
    </>
  );
}