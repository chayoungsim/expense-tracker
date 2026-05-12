# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 개발 명령어

```bash
npm run dev      # Vite 개발 서버 (http://localhost:5173)
npm run api      # JSON Server 실행 (http://localhost:3001) — 별도 터미널 필요
npm run build    # TypeScript 컴파일 + Vite 빌드
npm run lint     # ESLint 검사
npm run preview  # 빌드 결과물 로컬 미리보기
```

개발 시 `npm run dev`와 `npm run api`를 **동시에 실행**해야 한다. JSON Server 없이는 React Query 데이터 페칭이 실패한다.

## 기술 스택

- **번들러**: Vite 8 + React 19 + TypeScript 6
- **라우팅**: React Router v7
- **서버 상태**: TanStack React Query v5
- **클라이언트 상태**: Zustand v5
- **폼**: React Hook Form v7 + Zod v4 + @hookform/resolvers
- **스타일**: SCSS (SMACSS 7-1 패턴, CSS 변수 기반 테마)
- **차트**: Recharts v3 (Pie, Bar, Line)
- **애니메이션**: GSAP v3
- **날짜**: date-fns v4
- **아이콘**: lucide-react
- **Mock API**: JSON Server v1 beta

## 아키텍처

```
src/
├── api/            # axios 기반 API 함수 (transactions, categories)
├── components/
│   ├── layout/     # AppLayout, Sidebar, Header
│   └── ui/         # Button, Modal, Badge, Spinner, EmptyState, ConfirmDialog
├── hooks/          # useGsapFadeIn, useStatistics, useMonthlyComparison 등
├── pages/          # DashboardPage, TransactionsPage, StatisticsPage
├── routes/         # React Router 라우트 정의
├── store/          # Zustand 스토어 (전역 필터, UI 상태)
├── styles/         # SCSS 7-1 패턴
│   ├── abstracts/  # 변수, 함수, 믹스인
│   ├── base/       # 리셋, 테마 CSS 변수
│   ├── components/ # 컴포넌트별 SCSS
│   └── layout/     # 레이아웃 SCSS
└── types/          # TypeScript 타입 정의
```

## 주요 기술적 결정사항

### JSON Server v1 beta 쿼리 문법
- **내림차순 정렬**: `_sort=-date` (마이너스 접두사 = 내림차순)
- **날짜 범위 필터**: `date_gte=...&date_lte=...`
- 일반 JSON Server v0 문법(`_order=desc`)과 다르므로 혼용 금지

### React Query + Zustand 연동 패턴
- Zustand는 필터 조건(월, 카테고리, 기간) 등 **UI 파생 상태** 저장
- React Query는 해당 필터를 **queryKey**에 포함하여 자동 리페치 트리거
- `useMonthlyComparison`처럼 여러 달 데이터를 병렬 조회할 때는 `useQueries` 사용 — 반복문 안에서 `useQuery` 호출하면 Hook 규칙 위반

### GSAP + React 19 StrictMode
- `gsap.context()` + `ctx.revert()` 패턴으로 이중 실행 방지
- 진입 애니메이션은 `useGsapFadeIn` 훅으로 일원화 (stagger 지원)

### Zod v4 동적 enum
- 동적 배열로 enum 생성 시: `z.enum(['a','b'] as [string, ...string[]])` 형식 필요
- Zod v3 문법과 다름

## SCSS 스타일 가이드

- **색상**: CSS 변수(`--color-primary`, `--color-danger` 등) 사용, 하드코딩 금지
- **반응형**: `respond($breakpoint)` 믹스인 사용 (sm/md/lg/xl/2xl/full)
- **레이아웃**: `flex-c`, `flex-sb`, `flex-col`, `grid`, `auto-grid` 믹스인 활용
- **폰트**: `heading-fluid()` 믹스인으로 유동적 타입 스케일 적용

## 라우트 구조

```
/                 # DashboardPage (홈 — 잔액, 최근 거래)
/transactions     # TransactionsPage (목록, 필터, CRUD)
/statistics       # StatisticsPage (차트, 월별 비교)
```
