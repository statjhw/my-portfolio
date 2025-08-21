# Mermaid 다이어그램 예시 가이드

포트폴리오에서 자주 사용되는 Mermaid 다이어그램 패턴들을 정리한 가이드입니다.

---

## 📊 시스템 아키텍처 다이어그램

### 기본 웹 애플리케이션 구조

```mermaid
graph LR
    subgraph Frontend["🖥️ Frontend"]
        A[React App]
        B[Next.js Router]
    end
    
    subgraph Backend["⚙️ Backend"]
        C[API Server]
        D[Auth Service]
        E[Business Logic]
    end
    
    subgraph Database["🗄️ Database"]
        F[(PostgreSQL)]
        G[(Redis Cache)]
    end
    
    A --> B
    B --> C
    C --> D
    C --> E
    D --> F
    E --> F
    C --> G
```

### 마이크로서비스 아키텍처

```mermaid
graph TD
    subgraph Client["클라이언트"]
        U[사용자]
        W[웹 앱]
        M[모바일 앱]
    end
    
    subgraph Gateway["API 게이트웨이"]
        G[API Gateway]
        L[로드 밸런서]
    end
    
    subgraph Services["마이크로서비스"]
        S1[사용자 서비스]
        S2[상품 서비스]
        S3[주문 서비스]
        S4[결제 서비스]
    end
    
    subgraph Storage["데이터 저장소"]
        D1[(사용자 DB)]
        D2[(상품 DB)]
        D3[(주문 DB)]
        D4[(결제 DB)]
    end
    
    U --> W
    U --> M
    W --> L
    M --> L
    L --> G
    G --> S1
    G --> S2
    G --> S3
    G --> S4
    S1 --> D1
    S2 --> D2
    S3 --> D3
    S4 --> D4
```

### 클라우드 인프라 구조

```mermaid
graph TB
    subgraph AWS["🌤️ AWS Cloud"]
        subgraph VPC["VPC"]
            subgraph Public["Public Subnet"]
                ALB[Application Load Balancer]
                NAT[NAT Gateway]
            end
            
            subgraph Private["Private Subnet"]
                EC2[EC2 Instances]
                RDS[(RDS Database)]
                Redis[(ElastiCache)]
            end
        end
        
        S3[S3 Storage]
        CF[CloudFront]
    end
    
    Internet[인터넷] --> CF
    CF --> ALB
    ALB --> EC2
    EC2 --> RDS
    EC2 --> Redis
    EC2 --> S3
    Private --> NAT
    NAT --> Internet
```

---

## 🔄 플로우차트

### 사용자 인증 플로우

```mermaid
flowchart TD
    A[로그인 시도] --> B{이메일 형식 유효?}
    B -->|No| C[에러 메시지 표시]
    B -->|Yes| D[서버로 인증 요청]
    D --> E{인증 성공?}
    E -->|No| F[인증 실패 메시지]
    E -->|Yes| G[JWT 토큰 발급]
    G --> H[사용자 정보 조회]
    H --> I[대시보드 리다이렉트]
    C --> A
    F --> A
```

### 데이터 처리 플로우

```mermaid
flowchart LR
    A[원본 데이터] --> B[데이터 검증]
    B --> C{유효한 데이터?}
    C -->|No| D[에러 로그]
    C -->|Yes| E[데이터 변환]
    E --> F[비즈니스 로직 적용]
    F --> G[데이터베이스 저장]
    G --> H[결과 반환]
    D --> I[처리 종료]
```

### CI/CD 파이프라인

```mermaid
flowchart TD
    A[코드 푸시] --> B[GitHub Actions 트리거]
    B --> C[의존성 설치]
    C --> D[린트 검사]
    D --> E{린트 통과?}
    E -->|No| F[빌드 실패]
    E -->|Yes| G[테스트 실행]
    G --> H{테스트 통과?}
    H -->|No| F
    H -->|Yes| I[빌드 생성]
    I --> J[도커 이미지 생성]
    J --> K[배포 환경으로 전송]
    K --> L[서비스 배포]
    L --> M[배포 완료 알림]
```

---

## 📝 시퀀스 다이어그램

### API 호출 시퀀스

```mermaid
sequenceDiagram
    participant C as Client
    participant G as API Gateway
    participant A as Auth Service
    participant S as Business Service
    participant D as Database
    
    C->>G: API 요청 (토큰 포함)
    G->>A: 토큰 검증 요청
    A->>A: JWT 토큰 검증
    A-->>G: 검증 결과
    
    alt 토큰 유효
        G->>S: 비즈니스 로직 호출
        S->>D: 데이터 조회
        D-->>S: 결과 반환
        S-->>G: 처리 결과
        G-->>C: API 응답
    else 토큰 무효
        G-->>C: 401 Unauthorized
    end
```

### 결제 처리 시퀀스

```mermaid
sequenceDiagram
    participant U as 사용자
    participant F as Frontend
    participant B as Backend
    participant P as 결제 서비스
    participant D as Database
    
    U->>F: 결제 요청
    F->>B: 주문 생성 요청
    B->>D: 주문 정보 저장
    D-->>B: 주문 ID 반환
    
    B->>P: 결제 요청
    P->>P: 결제 처리
    P-->>B: 결제 결과
    
    alt 결제 성공
        B->>D: 주문 상태 업데이트
        B-->>F: 결제 성공 응답
        F-->>U: 성공 페이지 표시
    else 결제 실패
        B->>D: 주문 취소
        B-->>F: 결제 실패 응답
        F-->>U: 실패 메시지 표시
    end
```

---

## 🏗️ ER 다이어그램

### 기본 사용자-게시물 관계

```mermaid
erDiagram
    USER {
        int id PK
        string email UK
        string name
        string password_hash
        datetime created_at
        datetime updated_at
    }
    
    POST {
        int id PK
        int user_id FK
        string title
        text content
        boolean published
        datetime created_at
        datetime updated_at
    }
    
    COMMENT {
        int id PK
        int post_id FK
        int user_id FK
        text content
        datetime created_at
    }
    
    TAG {
        int id PK
        string name UK
        string slug UK
    }
    
    POST_TAG {
        int post_id FK
        int tag_id FK
    }
    
    USER ||--o{ POST : "작성"
    USER ||--o{ COMMENT : "작성"
    POST ||--o{ COMMENT : "포함"
    POST ||--o{ POST_TAG : "연결"
    TAG ||--o{ POST_TAG : "연결"
```

---

## 🎯 간단한 다이어그램 패턴

### 기본 클라이언트-서버 구조

```mermaid
graph LR
    A[클라이언트] --> B[API 서버]
    B --> C[(데이터베이스)]
```

### 3-Tier 아키텍처

```mermaid
graph TD
    A[프레젠테이션 계층] --> B[비즈니스 로직 계층]
    B --> C[데이터 액세스 계층]
```

### 마이크로프론트엔드

```mermaid
graph TD
    A[Shell Application] --> B[Header Module]
    A --> C[Navigation Module]
    A --> D[Content Module]
    A --> E[Footer Module]
```

---

## 📋 사용 가이드

### 색상과 아이콘 활용

```mermaid
graph LR
    subgraph Frontend["🖥️ 프론트엔드"]
        A[React]
    end
    
    subgraph Backend["⚙️ 백엔드"]
        B[Node.js]
    end
    
    subgraph Database["🗄️ 데이터베이스"]
        C[(MongoDB)]
    end
    
    A --> B --> C
```

### 조건부 플로우 표현

```mermaid
flowchart TD
    A[시작] --> B{조건 확인}
    B -->|조건1| C[처리 A]
    B -->|조건2| D[처리 B]
    B -->|기타| E[기본 처리]
    C --> F[종료]
    D --> F
    E --> F
```

---

## ⚠️ 주의사항

1. **백틱 이스케이프**: 템플릿 리터럴에서는 `\`\`\`mermaid`로 시작
2. **다이어그램 타입**: `graph`, `flowchart`, `sequenceDiagram`, `erDiagram` 등
3. **방향 지정**: `LR` (좌→우), `TD` (위→아래), `BT` (아래→위), `RL` (우→좌)
4. **서브그래프**: 관련 요소들을 그룹화할 때 사용
5. **스타일링**: 이모지와 색상을 활용하여 가독성 향상

---

## 🔗 참고 링크

- [Mermaid 공식 문서](https://mermaid-js.github.io/mermaid/)
- [Mermaid Live Editor](https://mermaid.live/)
- [GitHub Mermaid 지원](https://docs.github.com/en/get-started/writing-on-github/working-with-advanced-formatting/creating-diagrams)