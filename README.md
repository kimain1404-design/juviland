# 쥬비랜드 section01 – 글로벌 농업 인재 경력패스

PC · 태블릿 · 모바일 반응형 히어로 섹션과 등장 모션입니다. 빌드 과정 없이 정적 파일만으로 동작합니다.

## 파일 구성

```
index.html        마크업 (버튼 링크 포함)
style.css         반응형 레이아웃 + 모션
script.js         화면 진입 시 모션 재생
assets/
  bg.jpg          수채화 배경
  people.webp     가운데 인물 그룹 (위아래 모션)
  scene.webp      주변 일러스트 (고정)
liveklass-embed.html  라이브클래스 에디터에 붙여 넣을 iframe 코드
fonts/            원주체 파일을 넣는 위치 (Wonju-Bold.woff2)
.nojekyll         GitHub Pages가 파일을 그대로 서빙하도록 하는 빈 파일
```

## GitHub Pages 배포

1. GitHub에서 새 저장소를 만들고 이 폴더의 파일을 모두 올립니다.
   ```bash
   git init
   git add .
   git commit -m "section01 hero"
   git branch -M main
   git remote add origin https://github.com/<계정>/<저장소>.git
   git push -u origin main
   ```
2. 저장소의 **Settings → Pages**에서 Source를 **Deploy from a branch**, Branch를 **main / (root)** 로 선택하고 저장합니다.
3. 1~2분 뒤 `https://<계정>.github.io/<저장소>/` 에서 확인할 수 있습니다.

## 라이브클래스에 넣기

라이브클래스 에디터의 HTML(`<>`) 모드에 `liveklass-embed.html` 의 코드를 붙여 넣습니다. 저장소 이름이 `juvi-hero` 가 아니면 `src` 주소를 실제 GitHub Pages 주소로 바꾸세요.

- iframe은 안쪽 내용 높이를 스스로 따라가지 못하므로, `height` 에 화면 폭별 섹션 높이를 계산하는 식이 들어 있습니다.
  - PC(1200px 이상): `46.35vw`, 1600px 이상은 `741.6px`
  - 태블릿(768~1199px): `211.2px + 35.46vw`
  - 모바일(767px 이하): `100.05vw`, 540px 이상은 `540.3px`
- 섹션의 글자 크기, 여백, 버튼 크기를 바꾸면 높이도 바뀌므로 이 식도 함께 수정해야 합니다.
- `margin-top/bottom: -50px` 은 에디터 문단 여백을 없애기 위한 값입니다. 위아래에 빈 공간이나 겹침이 보이면 이 값을 조정하세요.

## 반응형 기준

| 구간 | 폭 | 동작 |
|---|---|---|
| PC | 1200px 이상 | 1600 시안을 화면 폭에 맞춰 텍스트·버튼·일러스트 모두 같은 비율로 축소 (1600px 이상은 원본 크기로 가운데 정렬) |
| 태블릿 | 768 ~ 1199px | 글자는 읽기 좋은 고정 크기, 일러스트는 버튼 아래 20px 지점부터 배치 |
| 모바일 | 767px 이하 | 1080 시안 비율 그대로 (540px에서 상한), 인물 그룹만 표시. 글자·버튼도 최소 크기 없이 시안 비율로 축소 |

## 모션

| 요소 | 시작 | 길이 | 내용 |
|---|---|---|---|
| 배경 | 0s | 1.2s | 살짝 줌아웃되며 나타남 |
| 제목 1줄 / 2줄 | 0.15s / 0.27s | 0.9s | 아래에서 밀려 올라옴 |
| 설명 문구 | 0.55s | 0.8s | 페이드 업 |
| 버튼 | 0.7s / 0.8s | 0.7s | 페이드 업 |
| 인물 그룹 | 0.85s | 1.2s | 아래에서 올라온 뒤, 2.1s부터 3초 주기로 위아래 반복 |
| 주변 일러스트 | – | – | 고정 |

타이밍은 `style.css`의 **Motion** 영역에서, 위아래 움직임 폭은 `@keyframes bob`의 `3%` 값으로 조절합니다. OS의 "동작 줄이기" 설정을 켠 사용자에게는 모션 없이 완성된 화면이 표시됩니다.

## 폰트

- 본문: Pretendard (jsDelivr CDN)
- 제목: 원주체. `fonts/Wonju-Bold.woff2` 를 넣으면 적용되며, 파일 이름이 다르면 `style.css` 상단 `@font-face`의 경로를 수정하세요. 파일이 없으면 Pretendard로 표시됩니다.
