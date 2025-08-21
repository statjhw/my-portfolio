# 🚀 Developer Portfolio

현대적이고 반응형 개발자 포트폴리오 웹사이트입니다. Next.js 15, TypeScript, Tailwind CSS로 구축되었습니다.

## ✨ 주요 기능

- 🎯 **반응형 디자인** - 모든 디바이스에서 완벽하게 작동
- 🌙 **다크모드 지원** - 자동 테마 전환
- 🎨 **부드러운 애니메이션** - Framer Motion 기반
- 📝 **마크다운 블로그** - 코드 하이라이팅 지원
- 🔍 **검색 및 필터링** - 프로젝트, 블로그 포스트 필터링
- 📬 **연락처 폼** - 유효성 검사 및 스팸 방지
- ⚡ **성능 최적화** - Next.js App Router, Turbopack

## 🛠️ 기술 스택

- **Framework**: Next.js 15.4.6 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Animation**: Framer Motion
- **Forms**: react-hook-form + zod
- **Theme**: next-themes
- **Markdown**: react-markdown

## 🚀 빠른 시작

### 1. 의존성 설치
```bash
npm install
```

### 2. 개발 서버 실행
```bash
npm run dev
```

### 3. 브라우저에서 확인
[http://localhost:3000](http://localhost:3000)에서 결과를 확인하세요.

## 📁 프로젝트 구조

```
src/
├── app/                # Next.js App Router
├── components/         # React 컴포넌트
│   ├── ui/            # 재사용 가능한 UI 컴포넌트
│   ├── sections/      # 페이지 섹션
│   └── layout/        # 레이아웃 컴포넌트
├── data/              # 정적 데이터
├── lib/               # 유틸리티 함수
└── types/             # TypeScript 타입
```

## 🎯 페이지 구성

- **홈페이지** (`/`) - Hero 섹션, Featured Projects
- **프로젝트** (`/projects`) - 프로젝트 쇼케이스, 필터링
- **블로그** (`/blog`) - 개발 블로그, 카테고리별 분류
- **연락처** (`/contact`) - 연락처 폼, 소셜 링크

## ⚙️ 스크립트

```bash
# 개발 서버 (Turbopack)
npm run dev

# 프로덕션 빌드
npm run build

# 프로덕션 서버
npm run start

# 린팅
npm run lint

# 타입 체크
npx tsc --noEmit
```

## 📝 커스터마이징

프로젝트를 개인화하려면 다음 가이드를 참고하세요:

- **[CUSTOMIZATION_GUIDE.md](./CUSTOMIZATION_GUIDE.md)** - 콘텐츠 수정 방법
- **[DEVELOPMENT_GUIDE.md](./DEVELOPMENT_GUIDE.md)** - 기술적 구조 및 개발 가이드

### 주요 수정 사항

1. **개인 정보**: `src/components/sections/hero-section.tsx`
2. **프로젝트 데이터**: `src/data/projects.ts`
3. **블로그 포스트**: `src/data/blog-posts.ts`
4. **연락처 정보**: `src/components/sections/contact-section.tsx`

## 🌍 배포

### Vercel (권장)
```bash
# Vercel CLI 설치
npm i -g vercel

# 배포
vercel --prod
```

### 환경 변수
`.env.local` 파일을 생성하고 다음 변수들을 설정하세요:

```bash
# 이메일 서비스
RESEND_API_KEY=your_resend_api_key
CONTACT_EMAIL=your.email@domain.com

# 분석
NEXT_PUBLIC_GA_ID=your_google_analytics_id

# 사이트 URL
NEXT_PUBLIC_SITE_URL=https://yourportfolio.com
```

## 🎨 테마 커스터마이징

색상 테마는 `src/app/globals.css`에서 CSS 변수를 수정하여 변경할 수 있습니다:

```css
:root {
  --primary: your-primary-color;
  --background: your-background-color;
  /* ... */
}
```

## 📱 반응형 지원

- **Mobile**: 320px+
- **Tablet**: 768px+
- **Desktop**: 1024px+
- **Large**: 1280px+

## 🔧 개발 도구

- **ESLint + Prettier**: 코드 품질 및 포맷팅
- **TypeScript**: 타입 안전성
- **Tailwind CSS**: 유틸리티 기반 스타일링
- **shadcn/ui**: 고품질 UI 컴포넌트

## 📄 라이선스

MIT License - 자유롭게 사용, 수정, 배포 가능합니다.

## 🤝 기여

이슈 리포트나 개선 제안은 언제나 환영합니다!

---

**Built with ❤️ using Next.js, TypeScript, and Tailwind CSS**
