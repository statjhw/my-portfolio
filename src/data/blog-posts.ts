export interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
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

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Railway 비용 최적화 경험',
    excerpt: 'Railway에서 운영하던 서비스의 비용을 50% 절감한 최적화 경험을 공유합니다. 데이터베이스 쿼리 최적화부터 인프라 구조 개선까지.',
    content: `# Railway 비용 최적화 경험

최근 Railway에서 운영하던 프로젝트의 월 비용이 예상보다 많이 나와서 최적화 작업을 진행했습니다. 결과적으로 **50% 이상의 비용 절감**을 달성할 수 있었고, 그 과정에서 배운 것들을 공유하고자 합니다.

## 문제 상황

- 월 사용량이 예상보다 2배 이상 높음
- 데이터베이스 연결 수 초과
- 불필요한 API 호출 과다

## 해결 과정

### 1. 데이터베이스 쿼리 최적화

가장 큰 문제는 N+1 쿼리 문제였습니다. 특히 사용자 목록을 불러올 때 각 사용자의 프로필 정보를 개별적으로 조회하고 있었습니다.

\`\`\`sql
-- 기존 (N+1 문제)
SELECT * FROM users;
-- 각 user에 대해
SELECT * FROM profiles WHERE user_id = ?;

-- 개선 후
SELECT u.*, p.* FROM users u 
LEFT JOIN profiles p ON u.id = p.user_id;
\`\`\`

### 2. 연결 풀 최적화

데이터베이스 연결 풀 설정을 최적화했습니다:

\`\`\`javascript
// 기존
const pool = {
  max: 20,
  min: 5,
  idle: 10000
}

// 개선 후
const pool = {
  max: 10,
  min: 2,
  idle: 30000,
  acquire: 60000,
  evict: 1000
}
\`\`\`

### 3. 캐싱 전략 도입

Redis를 도입하여 자주 조회되는 데이터를 캐싱했습니다:

\`\`\`javascript
const getCachedUser = async (userId) => {
  const cached = await redis.get(\`user:\${userId}\`);
  if (cached) return JSON.parse(cached);
  
  const user = await db.user.findUnique({ where: { id: userId } });
  await redis.setex(\`user:\${userId}\`, 3600, JSON.stringify(user));
  return user;
}
\`\`\`

## 결과

- **비용 50% 절감**: $120/월 → $60/월
- **응답 시간 30% 개선**: 평균 200ms → 140ms
- **데이터베이스 부하 70% 감소**

## 교훈

1. **모니터링의 중요성**: 초기부터 적절한 모니터링을 설정했다면 더 빨리 문제를 발견할 수 있었을 것
2. **점진적 최적화**: 한 번에 모든 것을 바꾸지 말고 하나씩 측정하며 개선
3. **비용 인식**: 개발 시점부터 비용을 고려한 아키텍처 설계 필요

Railway는 정말 좋은 플랫폼이지만, 적절한 최적화 없이 사용하면 비용이 많이 나올 수 있습니다. 여러분도 비슷한 경험이 있으시다면 댓글로 공유해 주세요!`,
    author: 'John Doe',
    publishedAt: '2024-01-15',
    category: 'DevOps',
    tags: ['Railway', 'Cost Optimization', 'Database', 'Performance'],
    readingTime: 8,
    featured: true,
    published: true,
    slug: 'railway-cost-optimization',
    coverImage: '/blog/railway-optimization.jpg'
  },
  {
    id: '2',
    title: '서버리스 vs 컨테이너 선택 기준',
    excerpt: '프로젝트 특성에 따른 서버리스와 컨테이너 기술 선택 가이드. 실제 프로젝트 경험을 바탕으로 한 의사결정 프레임워크를 제시합니다.',
    content: `# 서버리스 vs 컨테이너 선택 기준

현대 웹 개발에서 인프라 선택은 프로젝트의 성패를 좌우할 수 있는 중요한 결정입니다. 특히 서버리스와 컨테이너 기술 사이에서 선택할 때는 여러 요소를 고려해야 합니다.

## 서버리스의 장단점

### 장점
- **자동 스케일링**: 트래픽에 따라 자동으로 확장/축소
- **비용 효율성**: 사용한 만큼만 지불
- **운영 부담 최소화**: 서버 관리 불필요

### 단점
- **콜드 스타트**: 첫 요청 시 지연 발생
- **실행 시간 제한**: 대부분 15분 내외
- **벤더 종속성**: 특정 플랫폼에 강하게 의존

## 컨테이너의 장단점

### 장점
- **일관된 환경**: 개발부터 운영까지 동일한 환경
- **유연성**: 다양한 언어와 프레임워크 지원
- **포터빌리티**: 다양한 플랫폼에서 실행 가능

### 단점
- **복잡성**: 오케스트레이션과 관리 필요
- **고정 비용**: 사용하지 않아도 리소스 비용 발생
- **운영 부담**: 인프라 관리 필요

## 선택 기준

### 서버리스를 선택해야 하는 경우
1. **불규칙한 트래픽 패턴**
2. **빠른 프로토타이핑 필요**
3. **작은 팀/스타트업**
4. **이벤트 기반 아키텍처**

### 컨테이너를 선택해야 하는 경우
1. **지속적인 트래픽**
2. **복잡한 애플리케이션**
3. **특정 환경 요구사항**
4. **멀티클라우드 전략**

실제 프로젝트에서는 하이브리드 접근 방식도 고려해볼 수 있습니다. API는 서버리스로, 백그라운드 작업은 컨테이너로 구성하는 것처럼 말이죠.`,
    author: 'John Doe',
    publishedAt: '2024-02-20',
    category: 'Architecture',
    tags: ['Serverless', 'Containers', 'Architecture', 'AWS', 'Docker'],
    readingTime: 6,
    featured: true,
    published: true,
    slug: 'serverless-vs-containers',
    coverImage: '/blog/serverless-containers.jpg'
  },
  {
    id: '3',
    title: 'Next.js 성능 개선 사례',
    excerpt: 'Next.js 애플리케이션의 로딩 시간을 3초에서 1초로 줄인 최적화 과정. Core Web Vitals 개선부터 번들 사이즈 최적화까지.',
    content: `# Next.js 성능 개선 사례

이 글에서는 실제 프로덕션 Next.js 애플리케이션의 성능을 대폭 개선한 경험을 공유합니다. 초기 로딩 시간 3초에서 1초로 단축시킨 구체적인 방법들을 다룹니다.

## 초기 상황 분석

Lighthouse 점수가 처참했습니다:
- Performance: 45점
- First Contentful Paint: 2.8초
- Largest Contentful Paint: 3.2초

## 개선 과정

### 1. 번들 분석

\`\`\`bash
npm install @next/bundle-analyzer
\`\`\`

번들 분석 결과, 불필요한 라이브러리들이 메인 번들에 포함되어 있었습니다.

### 2. 동적 임포트 적용

\`\`\`javascript
// 기존
import Chart from 'chart.js';

// 개선
const Chart = dynamic(() => import('chart.js'), {
  ssr: false,
  loading: () => <div>차트 로딩 중...</div>
});
\`\`\`

### 3. 이미지 최적화

Next.js Image 컴포넌트를 적극 활용했습니다:

\`\`\`jsx
import Image from 'next/image';

<Image
  src="/hero-image.jpg"
  alt="Hero"
  width={800}
  height={400}
  priority
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..."
/>
\`\`\`

### 4. 폰트 최적화

Google Fonts를 로컬로 호스팅하여 외부 요청을 줄였습니다:

\`\`\`javascript
// next.config.js
module.exports = {
  experimental: {
    fontLoaders: [
      { loader: '@next/font/google', options: { subsets: ['latin'] } }
    ]
  }
}
\`\`\`

## 최종 결과

- **Performance**: 45점 → 92점
- **FCP**: 2.8초 → 0.9초
- **LCP**: 3.2초 → 1.1초
- **번들 크기**: 2.1MB → 850KB

이러한 최적화를 통해 사용자 경험이 크게 개선되었고, SEO 점수도 함께 상승했습니다.`,
    author: 'John Doe',
    publishedAt: '2024-03-10',
    category: 'Performance',
    tags: ['Next.js', 'Performance', 'Optimization', 'Web Vitals'],
    readingTime: 5,
    featured: false,
    published: true,
    slug: 'nextjs-performance-optimization',
  },
  {
    id: '4',
    title: 'TypeScript 타입 가드 패턴',
    excerpt: 'TypeScript에서 런타임 안정성을 보장하는 타입 가드 패턴들을 실제 사용 사례와 함께 알아봅니다.',
    content: `# TypeScript 타입 가드 패턴

TypeScript의 타입 시스템은 컴파일 타임에만 작동합니다. 런타임에서의 타입 안정성을 보장하려면 타입 가드가 필요합니다.

## 기본 타입 가드

### typeof 타입 가드

\`\`\`typescript
function processValue(value: string | number) {
  if (typeof value === 'string') {
    // 이 블록에서 value는 string 타입
    return value.toUpperCase();
  }
  // 이 블록에서 value는 number 타입
  return value.toFixed(2);
}
\`\`\`

### instanceof 타입 가드

\`\`\`typescript
class Dog {
  bark() { console.log('Woof!'); }
}

class Cat {
  meow() { console.log('Meow!'); }
}

function makeSound(animal: Dog | Cat) {
  if (animal instanceof Dog) {
    animal.bark();
  } else {
    animal.meow();
  }
}
\`\`\`

## 커스텀 타입 가드

### 사용자 정의 타입 가드

\`\`\`typescript
interface User {
  id: number;
  name: string;
  email: string;
}

function isUser(obj: any): obj is User {
  return obj && 
         typeof obj.id === 'number' &&
         typeof obj.name === 'string' &&
         typeof obj.email === 'string';
}

// 사용 예
function processUser(data: unknown) {
  if (isUser(data)) {
    // 이 블록에서 data는 User 타입
    console.log(data.name);
  }
}
\`\`\`

이러한 패턴들을 활용하면 더 안전하고 예측 가능한 코드를 작성할 수 있습니다.`,
    author: 'John Doe',
    publishedAt: '2024-04-05',
    category: 'TypeScript',
    tags: ['TypeScript', 'Type Guards', 'Type Safety'],
    readingTime: 4,
    featured: false,
    published: true,
    slug: 'typescript-type-guards',
  },
  {
    id: '5',
    title: 'React 18 Concurrent Features 실전 활용',
    excerpt: 'React 18의 새로운 동시성 기능들을 실제 프로젝트에 적용해본 경험과 성능 개선 효과를 정리했습니다.',
    content: `# React 18 Concurrent Features 실전 활용

React 18에서 도입된 동시성 기능들을 실제 프로젝트에 적용해보고, 그 효과를 측정해본 경험을 공유합니다.

## Suspense for Data Fetching

### 기존 방식의 문제점

기존에는 loading 상태를 수동으로 관리해야 했습니다:

\`\`\`jsx
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUser(userId).then(user => {
      setUser(user);
      setLoading(false);
    });
  }, [userId]);

  if (loading) return <div>Loading...</div>;
  return <div>{user.name}</div>;
}
\`\`\`

### Suspense 적용 후

\`\`\`jsx
function UserProfile({ userId }) {
  const user = use(fetchUser(userId)); // React 18의 use hook
  return <div>{user.name}</div>;
}

function App() {
  return (
    <Suspense fallback={<div>Loading user...</div>}>
      <UserProfile userId={1} />
    </Suspense>
  );
}
\`\`\`

## Concurrent Rendering

### startTransition 활용

검색 기능에서 startTransition을 사용하여 UI 블로킹을 방지했습니다:

\`\`\`jsx
function SearchResults() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isPending, startTransition] = useTransition();

  const handleSearch = (newQuery) => {
    setQuery(newQuery); // 긴급 업데이트
    
    startTransition(() => {
      // 지연 가능한 업데이트
      setResults(expensiveSearch(newQuery));
    });
  };

  return (
    <div>
      <input onChange={(e) => handleSearch(e.target.value)} />
      {isPending && <div>검색 중...</div>}
      <ResultsList results={results} />
    </div>
  );
}
\`\`\`

## 성능 측정 결과

- **Time to Interactive**: 15% 개선
- **사용자 체감 반응성**: 현저한 개선
- **JavaScript 실행 시간**: 20% 단축

React 18의 동시성 기능들은 사용자 경험을 크게 개선시켜줍니다. 특히 복잡한 UI를 다루는 애플리케이션에서 그 효과가 두드러집니다.`,
    author: 'John Doe',
    publishedAt: '2024-05-15',
    category: 'React',
    tags: ['React 18', 'Concurrent Features', 'Performance', 'Suspense'],
    readingTime: 7,
    featured: false,
    published: true,
    slug: 'react-18-concurrent-features',
  }
]

export const categories = [
  { value: 'all', label: 'All Categories' },
  { value: 'DevOps', label: 'DevOps' },
  { value: 'Architecture', label: 'Architecture' },
  { value: 'Performance', label: 'Performance' },
  { value: 'TypeScript', label: 'TypeScript' },
  { value: 'React', label: 'React' },
]

export const allTags = [
  'Railway', 'Cost Optimization', 'Database', 'Performance',
  'Serverless', 'Containers', 'Architecture', 'AWS', 'Docker',
  'Next.js', 'Optimization', 'Web Vitals',
  'TypeScript', 'Type Guards', 'Type Safety',
  'React 18', 'Concurrent Features', 'Suspense'
]