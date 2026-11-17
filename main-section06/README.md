# 쥬비랜드 main-section06 – OUR PEOPLE

"변화를 만드는 사람들" 섹션. 대표 카드, 이력 4개, 함께하는 전문가가 스크롤에 맞춰 순서대로 나타납니다.

- 피그마: main-section06(pc) `22:1617` · main-section06(mob) `38:1560`
- 배포 주소: https://kimain1404-design.github.io/juviland/main-section06/

## 파일 구성

```
main-section06/
├─ index.html                             (주소로 바로 열리도록 이름 유지)
├─ main-section06.css                     반응형 레이아웃 + 모션
├─ main-section06.js                      순서대로 등장
├─ main-section06-liveklass.html          라이브클래스에 붙여 넣을 iframe 코드
├─ README.md
└─ assets/
   ├─ main-section06(pc)-founder.webp     대표 사진 (pc, 카드 전체에 깔림)
   └─ main-section06(mob)-founder.webp    대표 사진 (mob·태블릿, 카드 위쪽)
```

인용 문장의 원주체는 `main-section01/fonts/Wonju-Bold.woff2`를 함께 씁니다. 파일이 없으면 Pretendard로 표시됩니다.

## 배포

`juviland` 저장소 맨 위에 `main-section06` 폴더를 통째로 올립니다 (`.nojekyll`은 저장소 맨 위에 이미 있음).

## 반응형

| 구간 | 폭 | 동작 |
|---|---|---|
| main-section06(pc) | 1200px 이상 | 1600 시안 비율로 축소. 대표 카드 + 이력 2×2 + 전문가 2열 (1600px 이상은 원본 크기) |
| 태블릿 | 768 ~ 1199px | (mob) 배치. 글자 크기는 648px 화면 기준에서 고정, 콘텐츠는 화면 폭을 채움 (좌우 여백 = 화면 폭의 5.6%). 사진은 높이 460px까지 |
| main-section06(mob) | 767px 이하 | 1080 시안 비율 그대로 |

모바일·태블릿의 줄바꿈은 모바일 시안과 똑같이 고정되어 있어, 섹션 높이가 화면 폭에 따라 일정하게 변합니다.

## 모션

1. 머리말: `OUR PEOPLE` → 제목 → 설명
2. 대표 카드: 카드가 올라오며 사진이 걷히듯 드러남 (pc 오른쪽→왼쪽, mob 위→아래) + 살짝 줌아웃 → 이름 → 인용 문장(줄 단위) → 소개
3. 이력 카드 4개: 0.14초 간격으로 올라오고, 안의 항목이 한 줄씩
4. 함께하는 전문가: 박스가 올라오고 두 카드가 모여듦 (pc 좌우에서, mob 아래에서)

라이브클래스 iframe 안에서도 부모 페이지 스크롤에 맞춰 동작합니다. "동작 줄이기" 설정 사용자는 모션 없이 완성 화면이 보입니다.

## 라이브클래스에 넣기

에디터 HTML(`<>`) 모드에 `main-section06-liveklass.html` 코드를 붙여 넣습니다. 높이 식이 계산하는 값:

- PC(1200px 이상): `91.4375vw + 4.08px`, 1600px 이상은 `1467.08px`
- 1199px 이하: `415.575vw + 8.49px`, `51.2vw + 2369.92px`, `2829.91px` 중 가장 작은 값 (모바일 → 태블릿 사진 커짐 → 사진 상한)
- 끝의 `+ 1px`은 바닥이 잘리지 않게 하는 여유분입니다.

320~2560px 26가지 폭에서 iframe 높이와 실제 섹션 높이 차이 0.4px 이내로 검증했습니다. 글자, 여백, 사진 높이를 바꾸면 이 식도 수정해야 합니다.
