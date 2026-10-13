# 데이터레이크 홈페이지

Vite + React + TypeScript + TailwindCSS v4 기반 독립 정적 사이트입니다. 상위 케어원 사이트와 별개로 실행합니다.

## 실행

이 폴더에서 실행합니다.

```powershell
npm ci
npm run dev
npm run build
npm run preview
```

- 개발: http://127.0.0.1:5180/
- 빌드 미리보기: http://127.0.0.1:4180/
- 배포 산출물: dist/. 9개 경로별 HTML을 생성하여 JavaScript 실행 전에도 본문과 검색 메타정보가 있습니다.

## 구성

메인 한 페이지에서 산업 설비 고장예지, AI 솔루션 개발, IoT 디바이스 개발, 핵심 기술, 적용 분야, 회사 소개와 Contact를 탐색합니다. 버튼과 메뉴는 같은 페이지의 해당 위치로 스크롤하며, 자세한 설명과 기술 도표는 펼쳐 볼 수 있습니다. 기존 상세 URL은 직접 방문용으로 유지합니다.

섹션 주소를 직접 열거나 뒤로/앞으로 이동할 때 접힌 상세 내용도 자동으로 열립니다. 모바일 메뉴는 선택 후 닫힙니다. 상단 시점의 세 보드 사진은 제외했으며, 측면 사진은 별 마크를 제거한 보정본을 사용합니다.

펼쳐 보기에는 분야별 썸네일과 약한 확대 효과가 있습니다. AI 알고리즘 비교와 모델 설명은 AI 상세 안에 배치했습니다. 주요 본문은 PC 18px·모바일 16px, 푸터 메뉴는 16px이며 태블릿부터 접이식 메뉴를 사용합니다.

문의는 japark.work@gmail.com으로 보내는 메일 앱 작성 기능입니다. 웹 서버에서 전송하거나 입력을 저장하지 않습니다. 전화번호는 표시하지 않습니다.

원본 기술 도표는 클릭해 확대하고 모바일에서 좌우로 움직일 수 있습니다. 사진·도표 출처 및 생성 기록은 [ASSETS.md](ASSETS.md)에 있습니다.

## GitHub Pages 인계

이 폴더의 내용을 별도 GitHub 저장소 루트에 올리는 구성을 준비했습니다. .github/workflows/deploy.yml은 npm 빌드 후 dist/를 GitHub Pages에 배포합니다. 실제 저장소 업로드·배포는 아직 하지 않았습니다.

public/CNAME과 기본 canonical 도메인은 datalake.ai.kr입니다. 저장소에서 Pages를 활성화하고 도메인의 DNS 및 HTTPS를 설정해야 실제 주소가 연결됩니다. Google Search Console과 네이버 서치어드바이저 소유권 인증·사이트맵 제출도 별도 단계입니다.

공개 주소를 바꿀 때는 .env.example, public/CNAME, 배포 워크플로의 SITE_URL을 함께 확인하세요. 저장소 하위 경로에 올리는 경우 SITE_BASE를 /repository-name/으로 설정하고 canonical도 해당 HTTPS 주소로 맞춥니다.

## 확인 결과

- npm run build: TypeScript, Vite 클라이언트/SSR, 정적 페이지 생성 통과.
- playwright-cli로 9개 페이지 PC·모바일 확인, 320px 추가 넘침 확인.
- 개발 분야 탭/키보드 이동, FAQ, 메뉴, 기술·모델 탐색, 도표 확대/이동/닫기, 문의 폼 유효성 확인.
- 실제 메일 발송 없음. 기록과 화면은 상위 프로젝트 output/test/datalake/에 있습니다.
- 단일 페이지 동작: PC 1440px / 모바일 390px에서 문서 재요청 없이 탐색, 직접 해시 접근·뒤로가기·동일 링크 재열기·도표 확대 검증. 320px / 768px에서 펼친 본문 가로 넘침 없음.
