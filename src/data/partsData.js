export const partsData = [
    {
        id: "Muzzle",
        name: "제동기",
        e_name: "muzzle_brake",
        type: ["AR"],
        effect: [
            {name: "수직 반동 제어", per: 10},
            {name: "수평 반동 제어", per: 10},
            {name: "사격시 화면 흔들림 제어", per: 50}
        ],
        feature: "사격 시 화면이 떨리는 렌즈 흔들림을 잡아주어 에임 안정성이 높음"
    },
    {
        id: "Muzzle",
        name: "보정기",
        e_name: "compensator1",
        type: ["AR", "SR", "SMG"],
        effect: [
            {name: "총기 반동 패턴", per: -25},
            {name: "수평 반동", per: -10},
            {name: "수직 반동", per: -10}
        ],
        feature: "반동을 제일 많이 줄여주는 파츠"
    },
    {
        id: "Muzzle",
        name: "소염기",
        e_name: "flask_hider1",
        type: ["AR", "SR", "SMG"],
        effect: [
            {name: "총구 화염 제거"},
            {name: "수평 반동", per: -10},
            {name: "수직 반동", per: -10}
        ],
        feature: "총구 화염을 없애는 파츠, 보정기의 약 70% 수준의 반동 제어 효과 제공"
    },
    {
        id: "Muzzle",
        name: "소음기",
        e_name: "suppressor1",
        type: ["AR", "SR", "SMG"],
        effect: [
            {name: "격발음 대폭 감소"},
            {name: "총구 화염 제거"},
            {name: "탄퍼짐", per: -10},
        ],
        feature: "총소리가 크게 줄지만, 반동 제어가 없기에, SR, DMR에 주로 사용"
    },
    {
        id: "Muzzle",
        name: "초크",
        e_name: "choke",
        effect: [
            {name: "산탄 확산률", per: -18}
        ],
        feature: "탄을 한곳으로 집중시켜 유효 사거리와 데미지 극대화"
    },
    {
        id: "Muzzle",
        name: "덕빌",
        e_name: "duckbill",
        effect: [
            {name: "산탄 상하 확산률", per: -50},
            {name: "좌우 확산률 증가"}
        ],
        feature: "좌우 가로 방향으로 넓게 퍼져 움직이는 적에게 유용"
    },
    {
        id: "Foregrip",
        name: "수직 손잡이",
        e_name: "Vertical_grip",
        effect: [
            {name: "수직 반동", per: -15},
            {name: "격발 시 흔들림", per: -15}
        ],
        feature: "아래로 튀는 반동을 크게 잡아주는 파츠"
    },
    {
        id: "Foregrip",
        name: "틸티드 그립",
        e_name: "tilted_grip",
        effect: [
            {name: "수직 반동 제어", per: 12},
            {name: "수평 반동 제어", per: 6},
            {name: "사격시 시야 흔들림 제어", per: 25},
        ],
        feature: "신규 파츠, 수직,수평, 화면 흔들림 제어로 안정성이 높은 파츠"
    },
    {
        id: "Foregrip",
        name: "하프 그립",
        e_name: "half_grip",
        effect: [
            {name: "수직 반동", per: -8},
            {name: "수평 반동 감소"},
            {name: "반동 회복 속도 증가"},
        ],
        penalty: [
            {name: "조준 호흡 흔들림", per: 20},
            {name: "격발 시 흔들림", per: 5},
        ],
        feature: "좌우 반동을 크게 줄여주는 파츠"
    },
    {
        id: "Foregrip",
        name: "라이트 그립",
        e_name: "lightweight_grip",
        effect: [
            {name: "사격 시 화면 흔들림", per: -30},
            {name: "반동 회복 속도", per: 20},
        ],
        feature: "반동 회복이 높아 DMR에 주로 사용되는 파츠"
    },
    {
        id: "Foregrip",
        name: "엄지 손잡이",
        e_name: "thumb_grip",
        effect: [
            {name: '정조준 속도', per: 30},
            {name: '수직 반동', per: -5},
            {name: "조준 호흡 흔들림", per: -20},
        ],
        feature: "정조준이 빠른 파츠"
    },
    {
        id: "Foregrip",
        name: "레이저 사이트",
        e_name: "laser_sight",
        effect: [
            {name: "지향 사격 시 탄퍼짐", per: -30},
        ],
        feature: "정조준하지 않는 근접 전투에 주로 쓰이는 파츠"
    },
    {
        id: "Scopes",
        name: "하이브리드 스코프",
        e_name: "hybrid",
        feature: "상황에 따라 1배율과 4배율 전환 가능",
    },
    {
        id: "Scopes",
        name: "레드 도트 사이트",
        e_name: "red_dot",
        effect: [
            {name: "정조준 속도", per: 20},
        ],
        feature: "홀로그램보다 넓은 시야 제공"
    },
    {
        id: "Scopes",
        name: "홀로그래픽 사이트",
        e_name: "holograpic",
        effect: [
            {name: "정조준 속도", per: 20},
        ],
        feature: "레드도트보다는 시야가 좀음",
    },
    {
        id: "Scopes",
        name: "2배율 스코프",
        feature: "고정 2배율 스코프",
    },
    {
        id: "Scopes",
        name: "3배율 스코프",
        feature: "고정 3배율 스코프",
    },
    {
        id: "Scopes",
        name: "4배율 스코프",
        feature: "고정 4배율 스코프",
    },
    {
        id: "Scopes",
        name: "6배율 스코프",
        feature: ["가변 스코프", "3배율까지 축소 가능"]
    },
    {
        id: "Scopes",
        name: "8배율 스코프",
        feature: ["가변 스코프", "4배율까지 축소 가능", "SR/DMR 전용 조준경"]
    },
    {
        id: "Scopes",
        name: "15배율 스코프",
        feature: ["가변 스코프 8배율까지 축소 가능", "SR/DMR 전용 조준경", "보급 조준경"]
    },
];
export const magazineData = [
    {
        id: "Magazine",
        type: ["AR", "SMG"],
        name: "퀵드로우 탄창",
        effect: [
            {name: "재장전 시간", num: -30},
        ],
    },
    {
        id: "Magazine",
        type: ["AR", "SR", "SMG"],
        name: "대용량 탄창",
        effect: [
            {name: "장탄수 증가"},
        ],
    },
    {
        id: "Magazine",
        type: ["AR", "SR", "SMG"],
        name: "대용량 퀵드로우 탄창",
        effect: [
            {name: "재장전 시간", num: -30},
            {name: "장탄수 증가"},
        ],
    },
];

export const stockData = [
    {
        id: "Stock",
        name: "접이식 개머리판",
        e_name: "folding_stock",
        effect: [
            {name: "총기 반동 패턴", per: -20},
            {name: "수평 반동", per: -20},
            {name: "반동 회복 속도", per: 20},
        ],
        feature: "우지,스콜피온에 장착",
    },
    {
        id: "Stock",
        name: "전술 개머리판",
        e_name: "tactical_stock",
        effect: [
            {name: "반동 회복 속도", per: 20},
            {name: "정조준 속도", per: 10},
            {name: "조준 호흡 흔들림", per: -10},
            {name: "사격 시 화면 흔들림", per: -10},
        ],
        feature: "AR 및 일부 SMG의 범용 개머리판",
    },
    {
        id: "Stock",
        name: "중형 개머리판",
        e_name: "heavy_stock",
        effect: [
            {name: "수직 반동 제어", per: 5},
            {name: "수평 반동 제어", per: 5},
            {name: "조준 호흡 흔들림", per: -10},
        ],
        penalty: [
            {name: "정조준 속도", per: -10},
        ],
        feature: "줌이 느리지만 반동을 제어해줌"
    },
    {
        id: "Stock",
        name: "칙패드",
        e_name: "cheek_pad",
        effect: [
            {name: "조준 호흡 흔들림", per: -20},
            {name: "사격 시 화면 흔들림", per: -20},
            {name: "수직 반동", per: -15},
        ],
        feature: "SR/DMR에 중요한 부품",
    },
    {
        id: "Stock",
        name: "탄띠",
        e_name: "bullet_loops",
        effect: [
            {name: "재장전 속도", per: 30},
        ],
        feature: "특정 총기에만 장착 가능",
    },
];