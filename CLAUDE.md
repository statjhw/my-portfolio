# 포트폴리오 마크다운 작성 가이드

이 문서는 포트폴리오 웹사이트의 프로젝트와 블로그 포스트를 작성할 때 사용할 마크다운 양식과 스타일 가이드입니다.

## 📋 목차

1. [기본 스타일 가이드](#기본-스타일-가이드)
2. [기술명 강조 방법](#기술명-강조-방법)
3. [제목 계층 구조](#제목-계층-구조)
4. [프로젝트 마크다운 구조](#프로젝트-마크다운-구조)
5. [블로그 포스트 구조](#블로그-포스트-구조)
6. [Mermaid 다이어그램 가이드](#mermaid-다이어그램-가이드)
7. [템플릿 파일 위치](#템플릿-파일-위치)

---

## 📝 기본 스타일 가이드

### 기술명 강조 방법

**⚠️ 중요: 백틱(`) 대신 볼드 강조(**) 사용**

템플릿 리터럴 내에서 백틱 사용 시 이스케이프 문제가 발생하므로, 기술명은 **볼드 강조**를 사용합니다.

```markdown
✅ 권장: **React**, **TypeScript**, **Next.js**
❌ 피하기: `React`, `TypeScript`, `Next.js`
```

**이유:**
- 백틱 사용 시: `\`React\`` → 화면에 리터럴 백틱이 그대로 표시됨
- 볼드 사용 시: **React** → 깔끔한 볼드 강조로 렌더링됨

### 구분선 사용법

섹션 구분을 위해 5개의 대시를 사용합니다:

```markdown
-----
```

### 리스트 작성 방법

```markdown
- **카테고리명**: 설명 내용입니다.
  - 하위 항목은 2칸 들여쓰기
  - **기술명**은 볼드로 강조

- **다음 카테고리**: 또 다른 설명입니다.
```

---

## 🏗️ 제목 계층 구조

```markdown
## 메인 섹션 (H2)
### 서브 섹션 (H3)
#### 세부 항목 (H4)
```

**규칙:**
- H1(#)은 프로젝트 제목에만 사용 (선택사항)
- 일반적으로 H2(##)부터 시작
- 계층을 건너뛰지 않고 순차적으로 사용

---

## 🚀 프로젝트 마크다운 구조

### 기본 템플릿 구조

```markdown
## 프로젝트 개요

간단한 프로젝트 설명과 목적을 작성합니다.

### 나의 역할: [주요 역할명]

구체적인 역할과 책임 범위를 설명합니다.

#### 1. [첫 번째 주요 업무]

- **세부 업무 1**:
  - 구체적인 실행 내용
  - **기술명**과 **도구명**을 볼드로 강조

- **세부 업무 2**:
  - 또 다른 실행 내용
  - 결과와 성과 포함

#### 2. [두 번째 주요 업무]

동일한 형식으로 작성

-----

### 주요 기능

- **기능명 1**: 기능에 대한 설명. **사용된 기술**을 볼드로 강조.
- **기능명 2**: 또 다른 기능 설명.

-----

### 기술 스택

- **Backend**: **Python**, **FastAPI**, **Django**
- **Frontend**: **React**, **TypeScript**, **Next.js**
- **Database**: **PostgreSQL**, **Redis**, **MongoDB**
- **Infra**: **AWS**, **Docker**, **Kubernetes**

-----

### 시스템 아키텍처

\`\`\`mermaid
graph LR
    A[Client] --> B[API Gateway]
    B --> C[Backend Service]
    C --> D[(Database)]
\`\`\`
```

---

## 📰 블로그 포스트 구조

### 기본 템플릿 구조

```markdown
## 문제 상황 / 배경

구체적인 문제나 개선이 필요했던 상황을 설명합니다.

- 문제점 1
- 문제점 2
- 기존 방식의 한계

## 해결 과정

### 1. [첫 번째 해결 단계]

**기존 방식:**
\`\`\`javascript
// 문제가 있던 코드
const oldCode = 'example'
\`\`\`

**개선된 방식:**
\`\`\`javascript
// 개선된 코드
const newCode = 'improved'
\`\`\`

### 2. [두 번째 해결 단계]

동일한 형식으로 작성

-----

## 결과

- **성과 1**: 구체적인 수치나 개선 결과
- **성과 2**: 사용자 경험 개선 등
- **성과 3**: 성능 향상 지표

## 교훈

1. **핵심 교훈 1**: 배운 점이나 인사이트
2. **핵심 교훈 2**: 앞으로 적용할 점
```

---

## 🎨 Mermaid 다이어그램 가이드

### 시스템 아키텍처 다이어그램

```markdown
\`\`\`mermaid
graph LR
    subgraph Frontend["🖥️ Frontend"]
        A[React App]
        B[Next.js]
    end
    
    subgraph Backend["⚙️ Backend"]
        C[API Server]
        D[Auth Service]
    end
    
    subgraph Database["🗄️ Database"]
        E[(PostgreSQL)]
        F[(Redis)]
    end
    
    A --> C
    C --> E
    D --> F
\`\`\`
```

### 플로우 차트

```markdown
\`\`\`mermaid
flowchart TD
    A[시작] --> B{조건 확인}
    B -->|Yes| C[처리 A]
    B -->|No| D[처리 B]
    C --> E[결과]
    D --> E
\`\`\`
```

### 시퀀스 다이어그램

```markdown
\`\`\`mermaid
sequenceDiagram
    participant U as User
    participant F as Frontend
    participant B as Backend
    participant D as Database
    
    U->>F: 로그인 요청
    F->>B: 인증 API 호출
    B->>D: 사용자 정보 조회
    D-->>B: 사용자 데이터
    B-->>F: 인증 토큰
    F-->>U: 로그인 완료
\`\`\`
```

---

## 📁 템플릿 파일 위치

프로젝트 내 템플릿 파일들의 위치와 용도:

```
docs/
└── templates/
    ├── project-template.md     # 프로젝트 상세 페이지용
    ├── blog-template.md        # 블로그 포스트용
    └── mermaid-examples.md     # Mermaid 다이어그램 예시
```

---

## 🔧 실제 사용 방법

### 새 프로젝트 추가하기

1. `src/data/projects.ts` 파일 열기
2. `docs/templates/project-template.md` 참고하여 내용 작성
3. `markdownContent` 필드에 마크다운 내용 추가
4. **기술명은 반드시 볼드 강조(\*\*기술명\*\*)로 작성**

### 새 블로그 포스트 추가하기

1. `src/data/blog-posts.ts` 파일 열기
2. `docs/templates/blog-template.md` 참고하여 내용 작성
3. `content` 필드에 마크다운 내용 추가

---

## ⚠️ 주의사항

1. **백틱 사용 금지**: 템플릿 리터럴 내에서 백틱은 이스케이프 문제 발생
2. **일관된 볼드 사용**: 모든 기술명은 **볼드**로 통일
3. **제목 계층 준수**: H2 → H3 → H4 순서 유지
4. **Mermaid 문법 확인**: 다이어그램 작성 전 문법 검증
5. **구분선 통일**: 섹션 구분은 `-----` 사용

---

📝 **마지막 업데이트**: 2024년 8월 18일
🔗 **관련 파일**: `src/components/ui/markdown-renderer.tsx`, `src/components/ui/mermaid-diagram.tsx`