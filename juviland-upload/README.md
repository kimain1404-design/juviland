# 쥬비랜드 (juviland)

라이브클래스 페이지에 iframe으로 넣는 섹션들을 한 저장소에서 관리합니다.
빌드 과정 없이 정적 파일만으로 동작하며, GitHub Pages로 배포됩니다.

- 섹션 관리 페이지: https://kimain1404-design.github.io/juviland/
- 각 섹션 주소: `https://kimain1404-design.github.io/juviland/<폴더>/`

## 구성

```
juviland/
├─ index.html        섹션 관리 페이지 (전체 미리보기 + 라이브클래스 코드 복사)
├─ README.md
├─ .nojekyll         GitHub Pages가 파일을 그대로 서빙하도록 하는 빈 파일
├─ juvi-hero/        section 01 · 히어로
│   ├─ index.html · style.css · script.js · assets/
│   ├─ liveklass-embed.html
│   └─ README.md
└─ juvi-why/         section 02 · WHY ZUVILAND (연결 문장)
    ├─ index.html
    ├─ liveklass-embed.html
    └─ README.md
```

## 섹션 목록

| 순서 | 폴더 | 내용 |
|---|---|---|
| 01 | `juvi-hero/` | 글로벌 농업 인재 경력패스 (히어로) |
| 02 | `juvi-why/` | 왜 농업 인재의 여정을 끝까지 연결해야 할까요? |

## 새 섹션 추가하기

1. 저장소에서 **Add file → Create new file** (또는 Upload files)로 `juvi-새이름/index.html` 을 만듭니다.
   파일 이름 칸에 `폴더이름/index.html` 처럼 슬래시를 넣으면 폴더가 함께 만들어집니다.
2. 같은 폴더에 `liveklass-embed.html` (라이브클래스용 iframe 코드)을 둡니다.
3. 루트 `index.html` 의 `SECTIONS` 목록에 한 줄을 추가합니다.
4. 1~2분 뒤 섹션 관리 페이지에서 확인합니다.

## 규칙

- **이미 라이브클래스에 넣은 폴더 이름은 바꾸지 않습니다.** 주소가 바뀌면 라이브클래스에서 섹션이 사라집니다.
- 섹션 파일은 반드시 각 폴더 안에 `index.html` 이름으로 둡니다. 루트에 올리면 404가 납니다.
- 섹션의 글자 크기·여백·문구를 바꾸면 높이가 달라지므로 iframe `height` 계산식도 함께 고쳐야 합니다.
  계산식은 각 폴더의 `liveklass-embed.html` 과 루트 `index.html` 의 `SECTIONS` 두 곳에 있습니다.
- `margin-top/bottom: -50px` 은 라이브클래스 에디터의 문단 여백을 없애기 위한 값입니다.
