export const itemData = [
    {
      "name": "구급상자",
      "category": "회복 아이템",
      "castTime": 6,
      "weight": 10,
      "effect": [
        { "name": "체력 즉시 회복", "num": 75 }
      ],
      "description": "체력이 75% 미만일 때 사용 가능하며, 즉시 체력을 75%까지 회복시킵니다."
    },
    {
      "name": "의료용 키트",
      "category": "회복 아이템",
      "castTime": 8,
      "weight": 20,
      "effect": [
        { "name": "체력 100% 회복", "num": 100 }
      ],
      "description": "현재 체력 상태와 상관없이 즉시 100% 풀 피로 회복시켜 주는 최상위 회복 아이템입니다."
    },
    {
      "name": "붕대",
      "category": "회복 아이템",
      "castTime": 4,
      "weight": 2,
      "effect": [
        { "name": "지속 회복 (개당)", "num": 10 }
      ],
      "description": "사용 시 체력을 10%씩 점진적으로 회복시키며, 최대 75%까지만 회복할 수 있습니다."
    },
    {
      "name": "에너지 드링크",
      "category": "부스트 아이템",
      "castTime": 4,
      "weight": 4,
      "effect": [
        { "name": "부스트 게이지 증가", "per": 40 }
      ],
      "description": "부스트 게이지를 40% 채워주며 지속적인 체력 회복 효과를 줍니다."
    },
    {
      "name": "진통제",
      "category": "부스트 아이템",
      "castTime": 6,
      "weight": 10,
      "effect": [
        { "name": "부스트 게이지 증가", "per": 60 }
      ],
      "description": "부스트 게이지를 즉시 60% 채워주며, 게이지가 50%를 넘으면 이동 속도가 상승합니다."
    },
    {
      "name": "아드레날린 주사",
      "category": "부스트 아이템",
      "castTime": 6,
      "weight": 20,
      "effect": [
        { "name": "부스트 게이지 증가", "per": 100 }
      ],
      "description": "주사 한 방으로 부스트 게이지를 100% 가득 채워 체력 재생과 이동 속도를 최대로 올립니다."
    },
    {
      "name": "자가 제세동기",
      "category": "특수 아이템",
      "castTime": 10,
      "weight": 20,
      "effect": [
        { "name": "스스로 부활", "num": 100 }
      ],
      "description": "기절(DBNO) 상태일 때 팀원의 도움 없이 스스로 부활할 수 있습니다. (가방에 소지 시 작동)"
    },
    {
      "name": "수류탄",
      "category": "투척 무기",
      "castTime": null,
      "weight": 18,
      "effect": [
        { "name": "최대 폭발 피해", "num": 100 }
      ],
      "description": "핀을 뽑고 5초 뒤에 강력한 폭발을 일으키며, 엄폐물 뒤에 숨은 적을 타격하는 표준 투척 무기입니다."
    },
    {
      "name": "화염병",
      "category": "투척 무기",
      "castTime": null,
      "weight": 16,
      "effect": [
        { "name": "지속 화염 피해", "num": 15 }
      ],
      "description": "지면에 닿는 순간 깨지며 넓은 범위에 불을 지릅니다. 불길 내부 및 접촉한 적에게 치명적인 도트 데미지를 줍니다."
    },
    {
      "name": "섬광탄",
      "category": "투척 무기",
      "castTime": null,
      "weight": 12,
      "effect": [
        { "name": "시각 및 청각 마비", "num": 100 }
      ],
      "description": "폭발 시 전방의 적에게 최대 5.5초 동안 눈이 멀고 귀가 먹먹해지는 실명 효과를 부여합니다."
    },
    {
      "name": "블루존 수류탄",
      "category": "투척 무기",
      "castTime": null,
      "weight": 14,
      "effect": [
        { "name": "자기장 피해 초당", "num": 10 }
      ],
      "description": "착지한 지점을 중심으로 서서히 커졌다가 줄어드는 구형 전자기장 장벽을 생성해 내부의 적을 공격합니다."
    },
    {
      "name": "C4",
      "category": "폭발물",
      "castTime": null,
      "weight": 20,
      "effect": [
        { "name": "초강력 건물 관통 피해", "num": 200 }
      ],
      "description": "설치 후 16초 뒤에 폭발하며, 벽과 건물을 관통하는 거대한 폭발 반경(25m)과 압도적인 피해량을 가집니다."
    },
    {
      "name": "점착 폭탄",
      "category": "폭발물",
      "castTime": null,
      "weight": 10,
      "effect": [
        { "name": "구조물 파괴 피해", "num": 100 }
      ],
      "description": "벽이나 바닥에 부착할 수 있는 소형 폭탄으로, 카라킨 등 특정 맵의 파괴 가능한 벽을 뚫을 때 사용됩니다."
    }
  ]