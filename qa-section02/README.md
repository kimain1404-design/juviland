# 쥬비랜드 qa-section02 – 문의 바로가기

지자체 상담 신청 · 투자 및 협력 문의 · Investment or Partner with Us, 세 개의 바로가기 카드입니다.

- 피그마: qa-section02(pc) `49:2420` · qa-section02(mob) `49:3230`
- 배포 주소: https://kimain1404-design.github.io/juviland/qa-section02/

## 파일 구성

```
qa-section02/
├─ index.html                            (주소로 바로 열리도록 이름 유지)
├─ qa-section02.css                      반응형 레이아웃 + 모션 + 마우스 반응
├─ qa-section02.js                       순서대로 등장
├─ qa-section02-liveklass.html           라이브클래스에 붙여 넣을 iframe 코드
├─ README.md
└─ assets/
   ├─ qa-section02-icon-message.png      말풍선 아이콘 (pc·mob 공통)
   ├─ qa-section02-icon-handshake.png    악수 아이콘
   ├─ qa-section02-icon-globe.png        지구 아이콘
   └─ qa-section02-icon-arrow.png        화살표 (색은 CSS로 바뀜)
```

## 링크 (모두 새 탭)

| 카드 | 주소 |
|---|---|
| 지자체 상담 신청 | https://zuviland.liveklass.com/forms/cfBSdTVSrAgpXcufGgXf |
| 투자 및 협력 문의 | https://zuviland.liveklass.com/forms/rZFHNFGr3zg7F7dBjXGt |
| Investment or Partner with Us | https://zuviland.liveklass.com/forms/RvXQDsnTrhmqVzvscG4Y |

## 배포

`juviland` 저장소 맨 위에 `qa-section02` 폴더를 통째로 올립니다 (`.nojekyll`은 저장소 맨 위에 이미 있음).

## 반응형

| 구간 | 폭 | 동작 |
|---|---|---|
| qa-section02(pc) | 1200px 이상 | 1600 시안 비율로 축소, 카드 3열 (1600px 이상은 원본 크기) |
| 태블릿 | 768 ~ 1199px | (mob) 배치. 글자 크기는 648px 화면 기준에서 고정, 카드는 화면 폭을 채움 (좌우 여백 = 화면 폭의 5.6%) |
| qa-section02(mob) | 767px 이하 | 1080 시안 비율 그대로, 세로 3줄 |

## 모션

- 등장: 화면에 들어오면 카드가 0.12초 간격으로 올라옴 → 제목·설명 → 화살표가 대각선에서 들어옴. 아이콘은 카드와 함께 움직임(크기 변화 없음).
- 마우스를 올리면(PC): 카드가 살짝 떠오르며 그림자, 아이콘 타일이 살짝 커지며 기울어짐, 화살표 동그라미가 남색으로 바뀌고 화살표가 오른쪽 위로 빠졌다 다시 들어옴.
- 누를 때: 카드가 살짝 눌림.
- "동작 줄이기" 설정 사용자는 모션 없이 바로 보입니다.

## 라이브클래스에 넣기

에디터 HTML(`<>`) 모드에 `qa-section02-liveklass.html` 코드를 붙여 넣습니다. 높이 식이 계산하는 값:

- PC(1200px 이상): `16vw`, 1600px 이상은 `256px`
- 1199px 이하: `71.4667vw + 5.97px`, 648px 이상은 `469.16px`
- 끝의 `+ 1px`은 바닥이 잘리지 않게 하는 여유분입니다.

320~2560px 24가지 폭에서 iframe 높이와 실제 섹션 높이 차이 0.2px 이내로 검증했습니다.
