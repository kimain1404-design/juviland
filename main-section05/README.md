# 쥬비랜드 main-section05 – 더 나은 내일을 약속합니다

약속 3가지(빚 부담 없는 출발 · 경험이 경력이 되는 성장 · 어느 길이든 성장하는 미래)를 카드로 보여주는 섹션. 모션 없이 시안 이미지 그대로의 레이아웃이 화면 크기에만 반응합니다.

- 피그마: main-section05(pc) `21:1592` (1600×512) · main-section05(mob) `38:1534` (1080×1080)
- 배포 주소: https://kimain1404-design.github.io/juviland/main-section05/

## 파일 구성

```
main-section05/
├─ index.html                               (주소로 바로 열리도록 이름 유지)
├─ main-section05.css                       반응형 레이아웃 (스크립트 없음)
├─ main-section05-liveklass.html            라이브클래스에 붙여 넣을 iframe 코드
├─ README.md
└─ assets/
   ├─ main-section05-icon-plane.svg         빚 부담 없는 출발
   ├─ main-section05-icon-cloud-stairs.svg  경험이 경력이 되는 성장
   └─ main-section05-icon-stars.svg         어느 길이든 성장하는 미래
```

## 반응형

| 구간 | 폭 | 동작 |
|---|---|---|
| main-section05(pc) | 1200px 이상 | 1600×512 시안 비율로 축소 (1600px 이상은 원본 크기). 카드 3열 (아이콘 → 제목 → 설명) |
| 태블릿 | 768 ~ 1199px | (mob) 배치. 글자·높이는 648px 화면 기준에서 고정, 콘텐츠는 화면 폭을 채움 |
| main-section05(mob) | 767px 이하 | 1080×1080 시안 비율 그대로. 카드 3줄 (아이콘·제목 │ 구분선 │ 설명 3줄) |

- 섹션 높이는 시안 프레임 높이로 고정입니다 (pc 512, mob 1080 → 화면 폭의 32% / 100%).
- 모바일 제목·설명 줄바꿈은 시안대로 `<br class="mo-only">`로 고정했습니다.

## 라이브클래스에 넣기

에디터 HTML(`<>`) 모드에 `main-section05-liveklass.html` 코드를 붙여 넣습니다. 높이 식이 계산하는 값:

- PC(1200px 이상): `32vw`, 1600px 이상은 `512px`
- 1199px 이하: `100vw`, 648px 이상은 `648px`
- 끝의 `+ 1px`은 바닥이 잘리지 않게 하는 여유분입니다.

주소 끝의 `?v=날짜-번호`는 캐시 방지용입니다. 파일을 고친 뒤 예전 화면이 계속 보이면 `index.html`의 CSS 링크와 라이브클래스 코드의 `?v=` 값을 함께 바꿔 주세요.
