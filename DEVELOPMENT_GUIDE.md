# 개발자 가이드

이 문서는 포트폴리오 프로젝트의 기술적 구조와 개발 방법을 설명합니다.

## 🏗️ 프로젝트 구조

```
my-portfolio/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx         # 루트 레이아웃
│   │   ├── page.tsx           # 홈페이지
│   │   ├── projects/          # 프로젝트 페이지
│   │   ├── blog/              # 블로그 페이지
│   │   ├── contact/           # 연락처 페이지
│   │   └── api/               # API 라우트
│   ├── components/
│   │   ├── ui/                # 재사용 가능한 UI 컴포넌트
│   │   ├── sections/          # 페이지 섹션 컴포넌트
│   │   └── layout/            # 레이아웃 컴포넌트
│   ├── lib/                   # 유틸리티 함수
│   ├── data/                  # 정적 데이터 파일
│   └── types/                 # TypeScript 타입 정의
├── public/                    # 정적 파일
└── 설정 파일들
```

## 🛠️ 기술 스택

### 핵심 기술
- **Framework**: Next.js 15.4.6 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Animation**: Framer Motion
- **Form**: react-hook-form + zod
- **Theme**: next-themes

### 주요 라이브러리
- **Markdown**: react-markdown, remark-gfm, rehype-highlight
- **Icons**: @radix-ui/react-icons
- **Toast**: sonner
- **Validation**: zod

## 🎯 개발 명령어

```bash
# 개발 서버 실행 (Turbopack 사용)
npm run dev

# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm run start

# 린팅
npm run lint

# 타입 체크
npx tsc --noEmit

# 코드 포맷팅
npx prettier --write .
```

## 📁 주요 파일 설명

### 데이터 파일

#### `src/data/projects.ts`
```typescript
// 프로젝트 데이터 구조
interface Project {
  id: string
  title: string
  description: string
  longDescription: string
  image: string
  technologies: string[]
  category: 'web' | 'mobile' | 'desktop' | 'api'
  githubUrl?: string
  liveUrl?: string
  featured: boolean
  startDate: string
  endDate?: string
  status: 'completed' | 'in-progress' | 'maintenance'
}
```

#### `src/data/blog-posts.ts`
```typescript
// 블로그 포스트 데이터 구조
interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string  // Markdown 형식
  author: string
  publishedAt: string
  updatedAt?: string
  category: string
  tags: string[]
  readingTime: number
  featured: boolean
  published: boolean
  slug: string
  coverImage?: string
}
```

### 핵심 컴포넌트

#### `src/components/sections/hero-section.tsx`
- 메인 페이지 Hero 섹션
- 타이핑 애니메이션
- Featured Projects 미리보기
- 소셜 링크

#### `src/components/sections/projects-grid.tsx`
- 프로젝트 목록 표시
- 필터링 및 검색 기능
- 페이지네이션

#### `src/components/sections/blog-grid.tsx`
- 블로그 포스트 목록
- 카테고리/태그 필터링
- 마크다운 렌더링

#### `src/components/sections/contact-form.tsx`
- react-hook-form 기반 폼
- zod 스키마 검증
- 스팸 방지 (honeypot)

### API 라우트

#### `src/app/api/contact/route.ts`
- 연락처 폼 제출 처리
- 데이터 검증
- 이메일 전송 (시뮬레이션)

## 🎨 스타일링 시스템

### Tailwind CSS 설정
- CSS Variables를 통한 테마 시스템
- 다크모드 지원
- 반응형 디자인

### 컴포넌트 스타일링 패턴
```typescript
// 스타일 변형을 위한 패턴
const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: index * 0.1 }
  }
}
```

## 🚀 애니메이션 시스템

### Framer Motion 사용 패턴

#### 페이지 전환
```typescript
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: 20 }}
  transition={{ duration: 0.5 }}
>
```

#### 순차 애니메이션
```typescript
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
}
```

#### 호버 효과
```typescript
<motion.div
  whileHover={{ y: -5, scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
>
```

## 📱 반응형 디자인

### 브레이크포인트
- `sm`: 640px
- `md`: 768px  
- `lg`: 1024px
- `xl`: 1280px

### 그리드 시스템
```typescript
// 반응형 그리드 예시
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
```

## 🧪 폼 검증 시스템

### Zod 스키마 예시
```typescript
const contactFormSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
  message: z.string().min(10).max(1000),
  honeypot: z.string().max(0) // 스팸 방지
})
```

### React Hook Form 통합
```typescript
const { register, handleSubmit, formState: { errors } } = useForm({
  resolver: zodResolver(contactFormSchema),
  mode: 'onChange'
})
```

## 🎯 성능 최적화

### 이미지 최적화
- Next.js Image 컴포넌트 사용
- lazy loading 적용
- WebP 형식 권장

### 코드 분할
```typescript
// 동적 임포트 예시
const Chart = dynamic(() => import('chart.js'), {
  ssr: false,
  loading: () => <div>로딩 중...</div>
})
```

### 메모이제이션
```typescript
// 필터링 로직 메모이제이션
const filteredProjects = useMemo(() => {
  return projects.filter(project => /* 필터 로직 */)
}, [searchTerm, selectedCategory, selectedTechnology])
```

## 🔒 보안 고려사항

### API 보안
- 입력 데이터 검증 (zod)
- Rate limiting 준비
- Honeypot 스팸 방지

### 클라이언트 보안
- XSS 방지 (react-markdown 사용)
- CSRF 보호 (Next.js 기본 제공)

## 📊 SEO 최적화

### 메타데이터
```typescript
export const metadata: Metadata = {
  title: "Portfolio | Developer",
  description: "Modern developer portfolio",
  openGraph: {
    title: "Portfolio",
    description: "Developer portfolio",
    images: ["/og-image.jpg"],
  },
}
```

### 구조화된 데이터
- JSON-LD 스키마 준비
- sitemap.xml 생성 가능

## 🧪 테스트 전략

### 권장 테스트 도구
- Jest + React Testing Library
- Playwright (E2E)
- 시각적 회귀 테스트

### 테스트 우선순위
1. Contact form 검증
2. Navigation 동작
3. API 엔드포인트
4. 반응형 레이아웃

## 🚀 배포 가이드

### Vercel 배포
```bash
# Vercel CLI 설치
npm i -g vercel

# 배포
vercel --prod
```

### 환경 변수 설정
```bash
# Vercel 환경 변수 설정
vercel env add RESEND_API_KEY
vercel env add CONTACT_EMAIL
```

### 도메인 연결
1. Vercel 대시보드에서 도메인 추가
2. DNS 설정 (A/CNAME 레코드)
3. SSL 인증서 자동 설정

## 🔧 문제 해결

### 일반적인 문제

#### 1. 타입 에러
```bash
# TypeScript 에러 확인
npx tsc --noEmit
```

#### 2. 스타일 적용 안됨
- Tailwind CSS 클래스명 확인
- CSS 변수 설정 확인

#### 3. 애니메이션 동작 안함
- Framer Motion variants 확인
- initial/animate 속성 확인

#### 4. API 호출 실패
- Network 탭에서 요청 확인
- 서버 로그 확인

### 디버깅 도구
- React Developer Tools
- Tailwind CSS IntelliSense
- Next.js 개발자 도구

## 📚 추가 자료

### 공식 문서
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)
- [shadcn/ui](https://ui.shadcn.com/)

### 유용한 도구
- [Tailwind CSS Playground](https://play.tailwindcss.com/)
- [Framer Motion Examples](https://www.framer.com/motion/examples/)
- [React Hook Form DevTools](https://react-hook-form.com/dev-tools)

---

이 가이드를 참고하여 프로젝트를 효율적으로 개발하고 유지보수하세요!