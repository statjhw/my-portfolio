# 배포 가이드 (Deployment Guide)

이 문서는 포트폴리오 웹사이트를 Vercel에 배포하는 방법을 설명합니다.

## 📋 배포 전 체크리스트

### 1. 프로젝트 준비 상태 확인
```bash
# 의존성 설치 확인
npm install

# 빌드 테스트
npm run build

# 로컬 서버 테스트
npm run start
```

### 2. 환경 변수 설정
- `.env.example` 파일을 참고하여 필요한 환경 변수들을 확인
- Vercel 대시보드에서 환경 변수 설정 예정

## 🚀 Vercel 배포 방법

### 방법 1: GitHub 연동을 통한 자동 배포 (권장)

1. **GitHub Repository 연결**
   - GitHub에 프로젝트 푸시
   - [Vercel](https://vercel.com) 로그인
   - "New Project" 클릭
   - GitHub repository 선택

2. **프로젝트 설정**
   ```
   Framework Preset: Next.js
   Root Directory: ./
   Build Command: npm run build
   Output Directory: .next
   Install Command: npm install
   ```

3. **환경 변수 설정**
   - Vercel 대시보드에서 Settings → Environment Variables
   - 필요한 환경 변수들 추가:
     ```
     NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
     NEXT_PUBLIC_SITE_NAME=HyeonWu Jang Portfolio
     ```

4. **배포 완료**
   - 자동으로 빌드 및 배포 시작
   - 생성된 URL로 접속하여 확인

### 방법 2: Vercel CLI를 통한 배포

1. **Vercel CLI 설치**
   ```bash
   npm install -g vercel
   ```

2. **로그인 및 초기 설정**
   ```bash
   vercel login
   vercel
   ```

3. **배포 실행**
   ```bash
   # 프리뷰 배포
   vercel

   # 프로덕션 배포
   vercel --prod
   ```

## 🔧 Vercel 설정 파일

프로젝트 루트의 `vercel.json` 파일에 다음 설정들이 포함되어 있습니다:

- **보안 헤더**: XSS 보호, 콘텐츠 타입 보호 등
- **CORS 설정**: API 엔드포인트를 위한 CORS 헤더
- **라우팅 설정**: 동적 라우팅 지원
- **서버리스 함수 설정**: API 라우트 최적화

## 📊 성능 최적화

### 자동 최적화 기능
- **Next.js Image Optimization**: 자동 이미지 최적화
- **Code Splitting**: 페이지별 코드 분할
- **Static Generation**: 정적 페이지 생성
- **Edge Functions**: 빠른 응답을 위한 엣지 배포

### 모니터링
- **Vercel Analytics**: 사용자 분석 데이터
- **Web Vitals**: 성능 지표 모니터링
- **Real User Monitoring**: 실제 사용자 경험 측정

## 🌐 커스텀 도메인 설정

1. **Vercel 대시보드에서 도메인 추가**
   - Settings → Domains
   - 원하는 도메인 입력

2. **DNS 설정**
   - 도메인 제공업체에서 DNS 레코드 설정
   - CNAME 또는 A 레코드 추가

3. **SSL 인증서**
   - Vercel에서 자동으로 Let's Encrypt SSL 인증서 발급

## 🔄 지속적 배포 (CI/CD)

### 자동 배포 트리거
- `main` 브랜치에 푸시 시 프로덕션 배포
- 다른 브랜치에 푸시 시 프리뷰 배포
- Pull Request 생성 시 프리뷰 URL 자동 생성

### 배포 상태 확인
```bash
# 배포 상태 확인
vercel list

# 로그 확인
vercel logs
```

## 🐛 문제 해결

### 일반적인 문제들

1. **빌드 실패**
   ```bash
   # 로컬에서 빌드 테스트
   npm run build
   # 타입 에러 확인
   npx tsc --noEmit
   ```

2. **환경 변수 오류**
   - Vercel 대시보드에서 환경 변수 확인
   - `NEXT_PUBLIC_` 프리픽스 확인

3. **이미지 로딩 오류**
   - `next.config.ts`의 이미지 설정 확인
   - 이미지 경로 및 도메인 설정 확인

4. **API 라우트 오류**
   - 서버리스 함수 제한 사항 확인
   - CORS 설정 확인

## 📈 배포 후 체크리스트

- [ ] 모든 페이지 로딩 확인
- [ ] 반응형 디자인 테스트
- [ ] SEO 메타데이터 확인
- [ ] 연락처 폼 테스트
- [ ] 외부 링크 동작 확인
- [ ] 성능 점수 측정 (Lighthouse)
- [ ] 접근성 테스트

## 🔗 유용한 링크

- [Vercel 공식 문서](https://vercel.com/docs)
- [Next.js 배포 가이드](https://nextjs.org/docs/deployment)
- [Vercel CLI 문서](https://vercel.com/docs/cli)
- [성능 최적화 가이드](https://nextjs.org/docs/advanced-features/measuring-performance)

---

배포 관련 문제가 발생하면 이 문서를 참고하거나 Vercel 지원팀에 문의하세요.