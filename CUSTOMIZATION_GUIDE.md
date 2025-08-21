# 포트폴리오 커스터마이징 가이드

이 문서는 포트폴리오 웹사이트의 콘텐츠와 설정을 수정하는 방법을 안내합니다.

## 📋 목차

1. [개인 정보 수정](#개인-정보-수정)
2. [프로젝트 데이터 관리](#프로젝트-데이터-관리)
3. [블로그 포스트 관리](#블로그-포스트-관리)
4. [연락처 정보 수정](#연락처-정보-수정)
5. [스타일 및 테마 커스터마이징](#스타일-및-테마-커스터마이징)
6. [환경 변수 설정](#환경-변수-설정)

---

## 🙋‍♂️ 개인 정보 수정

### Hero 섹션 (홈페이지)

**파일 위치**: `src/components/sections/hero-section.tsx`

```typescript
// 이름 변경
<TypingAnimation
  text="Your Name"  // 여기에 본인 이름 입력
  duration={100}
  className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent"
/>

// 직책 변경
<motion.h2
  variants={itemVariants}
  className="text-xl md:text-3xl font-medium text-muted-foreground mb-4"
>
  Your Job Title  // 직책 수정
</motion.h2>

// 소개 문구 변경
<motion.p
  variants={itemVariants}
  className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl leading-relaxed"
>
  Your introduction text here...  // 소개 문구 수정
</motion.p>
```

### 소셜 링크 수정

**파일 위치**: `src/components/ui/social-links.tsx`

```typescript
const socialLinks = [
  {
    name: 'GitHub',
    href: 'https://github.com/yourusername',  // GitHub URL 수정
    icon: GitHubLogoIcon,
    hoverColor: 'hover:text-gray-900 dark:hover:text-white',
  },
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com/in/yourusername',  // LinkedIn URL 수정
    icon: LinkedInLogoIcon,
    hoverColor: 'hover:text-blue-600',
  },
  {
    name: 'Email',
    href: 'mailto:your.email@domain.com',  // 이메일 주소 수정
    icon: EnvelopeClosedIcon,
    hoverColor: 'hover:text-red-500',
  },
]
```

---

## 🚀 프로젝트 데이터 관리

**파일 위치**: `src/data/projects.ts`

### 새 프로젝트 추가

```typescript
export const projects: Project[] = [
  // 기존 프로젝트들...
  {
    id: '9',  // 고유 ID
    title: '새 프로젝트 제목',
    description: '프로젝트 간단 설명 (카드에 표시)',
    longDescription: '프로젝트 상세 설명 (상세 페이지에 표시)',
    image: '/placeholder-project-9.jpg',  // 이미지 경로
    technologies: ['React', 'TypeScript', 'Node.js'],  // 기술 스택
    category: 'web',  // 'web', 'mobile', 'desktop', 'api'
    githubUrl: 'https://github.com/username/project',  // GitHub URL (선택)
    liveUrl: 'https://project-demo.com',  // 라이브 데모 URL (선택)
    featured: false,  // 메인 페이지 featured 섹션에 표시 여부
    startDate: '2024-01',  // 시작 날짜
    endDate: '2024-06',  // 종료 날짜 (진행 중이면 생략)
    status: 'completed',  // 'completed', 'in-progress', 'maintenance'
  }
]
```

### 기술 스택 목록 수정

```typescript
export const technologies = [
  'React', 'Vue.js', 'Angular',  // 프론트엔드
  'Node.js', 'Python', 'Java',  // 백엔드
  'TypeScript', 'JavaScript',   // 언어
  // 새로운 기술 추가...
]
```

### 카테고리 수정

```typescript
export const categories = [
  { value: 'all', label: 'All Projects' },
  { value: 'web', label: 'Web Applications' },
  { value: 'mobile', label: 'Mobile Apps' },
  { value: 'desktop', label: 'Desktop Apps' },
  { value: 'api', label: 'APIs & Backend' },
  // 새로운 카테고리 추가 가능
]
```

---

## 📝 블로그 포스트 관리

**파일 위치**: `src/data/blog-posts.ts`

### 새 블로그 포스트 추가

```typescript
export const blogPosts: BlogPost[] = [
  // 기존 포스트들...
  {
    id: '6',  // 고유 ID
    title: '새 블로그 포스트 제목',
    excerpt: '포스트 요약 (목록 페이지에 표시되는 내용)',
    content: `# 포스트 제목

마크다운으로 작성된 본문 내용...

## 소제목

내용을 여기에 작성하세요.

\`\`\`javascript
// 코드 블록 예시
const example = "Hello World";
\`\`\`

- 리스트 아이템 1
- 리스트 아이템 2

**굵은 글씨** 및 *기울임체*도 사용 가능합니다.
`,
    author: 'Your Name',  // 작성자 이름
    publishedAt: '2024-08-15',  // 발행일 (YYYY-MM-DD 형식)
    updatedAt: '2024-08-16',  // 수정일 (선택사항)
    category: 'Technology',  // 카테고리
    tags: ['React', 'Performance', 'Web Development'],  // 태그 배열
    readingTime: 5,  // 예상 읽기 시간 (분)
    featured: true,  // 추천 포스트 여부
    published: true,  // 발행 상태 (false면 비공개)
    slug: 'new-blog-post-slug',  // URL에 사용될 슬러그 (고유해야 함)
    coverImage: '/blog/post-image.jpg',  // 커버 이미지 (선택사항)
  }
]
```

### 카테고리 및 태그 관리

```typescript
export const categories = [
  { value: 'all', label: 'All Categories' },
  { value: 'Technology', label: 'Technology' },
  { value: 'Tutorial', label: 'Tutorial' },
  { value: 'Experience', label: 'Experience' },
  // 새로운 카테고리 추가...
]

export const allTags = [
  'React', 'Vue.js', 'JavaScript', 'TypeScript',
  'Performance', 'SEO', 'Web Development',
  // 새로운 태그 추가...
]
```

---

## 📞 연락처 정보 수정

### 연락처 섹션

**파일 위치**: `src/components/sections/contact-section.tsx`

```typescript
const contactInfo = [
  {
    icon: EnvelopeClosedIcon,
    label: 'Email',
    value: 'your.email@domain.com',  // 이메일 주소 수정
    href: 'mailto:your.email@domain.com',
  },
  {
    icon: GitHubLogoIcon,
    label: 'GitHub',
    value: 'github.com/yourusername',  // GitHub 사용자명 수정
    href: 'https://github.com/yourusername',
  },
  {
    icon: LinkedInLogoIcon,
    label: 'LinkedIn',
    value: 'linkedin.com/in/yourusername',  // LinkedIn 사용자명 수정
    href: 'https://linkedin.com/in/yourusername',
  },
]

const workingHours = [
  'Monday - Friday: 9:00 AM - 6:00 PM',  // 근무 시간 수정
  'Saturday: 10:00 AM - 2:00 PM',
  'Sunday: Closed',
]
```

### 푸터 연락처

**파일 위치**: `src/components/layout/footer.tsx`

```typescript
const socialLinks = [
  {
    name: 'GitHub',
    href: 'https://github.com/yourusername',  // URL 수정
    icon: GitHubLogoIcon,
  },
  // 다른 소셜 링크들...
]
```

---

## 🎨 스타일 및 테마 커스터마이징

### 색상 테마 수정

**파일 위치**: `src/app/globals.css`

```css
:root {
  --background: oklch(1 0 0);  /* 배경색 */
  --foreground: oklch(0.145 0 0);  /* 전경색 */
  --primary: oklch(0.205 0 0);  /* 기본 색상 */
  /* 다른 색상 변수들... */
}

.dark {
  --background: oklch(0.145 0 0);  /* 다크모드 배경색 */
  --foreground: oklch(0.985 0 0);  /* 다크모드 전경색 */
  /* 다른 다크모드 색상들... */
}
```

### 폰트 변경

**파일 위치**: `src/app/layout.tsx`

```typescript
import { Inter, Roboto_Mono } from "next/font/google";  // 원하는 폰트로 변경

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
});
```

---

## 🔧 환경 변수 설정

**파일**: `.env.local` (생성 필요)

```bash
# 이메일 서비스 (실제 이메일 전송을 위해)
RESEND_API_KEY=your_resend_api_key
CONTACT_EMAIL=your.email@domain.com

# 노션 API (블로그를 노션과 연동하려면)
NOTION_API_KEY=your_notion_api_key
NOTION_DATABASE_ID=your_database_id

# 분석 도구
NEXT_PUBLIC_GA_ID=your_google_analytics_id

# 사이트 설정
NEXT_PUBLIC_SITE_URL=https://yourportfolio.com
```

---

## 🚀 배포 전 체크리스트

### 1. 개인 정보 확인
- [ ] 이름, 직책, 소개 문구 수정
- [ ] 소셜 링크 URL 확인
- [ ] 연락처 정보 업데이트

### 2. 콘텐츠 확인
- [ ] 프로젝트 데이터 업데이트
- [ ] 블로그 포스트 작성
- [ ] 이미지 파일 추가 (`public/` 폴더)

### 3. 설정 확인
- [ ] 환경 변수 설정
- [ ] 메타데이터 수정 (`src/app/layout.tsx`)
- [ ] favicon 교체 (`src/app/favicon.ico`)

### 4. 테스트
- [ ] 모든 페이지 동작 확인
- [ ] 연락처 폼 테스트
- [ ] 반응형 디자인 확인
- [ ] 다크모드 테스트

---

## 💡 유용한 팁

### 이미지 최적화
- 프로젝트 이미지: `public/` 폴더에 저장
- 권장 크기: 1200x630px (2:1 비율)
- 형식: WebP 또는 JPEG

### SEO 최적화
- 메타 제목과 설명 수정
- Open Graph 이미지 추가
- sitemap.xml 생성 고려

### 성능 최적화
- 이미지 압축
- 불필요한 라이브러리 제거
- 코드 분할 활용

---

## 🛠️ 문제 해결

### 개발 서버 실행
```bash
npm run dev
```

### 빌드 테스트
```bash
npm run build
npm run start
```

### 타입 체크
```bash
npx tsc --noEmit
```

### 린팅
```bash
npm run lint
```

---

이 가이드를 참고하여 포트폴리오를 자유롭게 커스터마이징하세요!
추가 질문이나 도움이 필요하시면 언제든 연락해 주세요.