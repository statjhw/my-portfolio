export interface Project {
  id: string
  title: string
  description: string
  longDescription: string
  markdownContent?: string
  image: string
  technologies: string[]
  category: 'web' | 'mobile' | 'desktop' | 'api' | 'data pipeline' | 'ai' | 'tool' | 'statistics'
  githubUrl?: string
  liveUrl?: string
  featured: boolean
  startDate: string
  endDate?: string
  status: 'completed' | 'in-progress' | 'maintenance'
  teamSize: number
}

export const projects: Project[] = [
  {
    id: '1',
    title: '망망대 AI 프로젝트',
    description: 'RAG 기반 사용자 채용 추천 서비스 웹 애플리케이션',
    longDescription: 'A comprehensive e-commerce platform featuring user authentication, product management, shopping cart functionality, and secure payment processing. Built with modern technologies and best practices for scalability and performance.',
    markdownContent: `## RAG 기반 사용자 채용 추천 시스템

-----

### 프로젝트 개요

이 프로젝트는 채용 플랫폼의 공고를 자동으로 수집하고, AI 기반의 하이브리드 검색 및 추천 서비스를 제공하는 시스템입니다. 사용자의 프로필과 대화의 맥락을 깊이 이해하여, 
사용자가 원하는 채용 공고를 추천하고, 심층 분석, 합격 전략 제시까지 수행하는 고도로 지능화된 멀티턴(Multi-turn) 대화형 취업 어드바이저를 목표로 합니다.

### 나의 역할: Data Collection 및 인프라 구성

저는 프로젝트의 기반이 되는 **데이터를 수집, 처리, 저장**하고 **인프라를 구성**하는 역할을 담당했습니다.

#### 1. 데이터 수집 (Data Collection)

- **채용 공고 크롤링**:
  - Python 기반의 크롤링 시스템을 구축하여 채용 사이트의 공고 데이터를 자동으로 수집했습니다.
  - **Selenium**과 **BeautifulSoup**을 활용한 하이브리드 방식을 채택하여 동적 콘텐츠까지 안정적으로 수집하고, 수집된 원본 데이터는 **AWS DynamoDB**에 저장했습니다.

- **임베딩 및 저장**:
  - 수집된 데이터를 AI가 이해할 수 있는 벡터 형태로 변환하는 임베딩 파이프라인을 구축했습니다.
  - **intfloat/multilingual-e5-large** 모델을 사용하여 텍스트를 벡터로 임베딩했습니다.
  - 처리된 데이터와 벡터는 키워드 검색(BM25)과 의미 기반 벡터 검색이 모두 가능한 **OpenSearch**에 저장하여 하이브리드 검색의 기반을 마련했습니다.
  - 전체 데이터 파이프라인은 **Airflow**를 통해 주기적으로 자동 실행되도록 구성했습니다.

#### 2. 배포 (Deployment)

- **Frontend**: **React**와 **Vite**로 구축된 프론트엔드 애플리케이션을 **Vercel**을 통해 배포하여 전 세계 사용자들이 빠르고 안정적으로 접근할 수 있도록 했습니다.
- **Backend**: **FastAPI**로 구축된 백엔드 API 서버를 **Railway**에 배포했습니다. **Docker**를 사용하여 서버 환경을 컨테이너화함으로써 개발 환경과 프로덕션 환경의 일관성을 유지하고, 안정적인 서비스 운영을 보장했습니다.

-----

### 주요 기능

- **데이터 수집 자동화**: 채용 사이트 공고를 주기적으로 크롤링하여 **DynamoDB**에 수집 후, **OpenSearch**에 키워드 및 벡터 인덱스를 구축합니다.
- **하이브리드 검색**: **OpenSearch** 내에서 키워드 기반 검색(BM25)과 의미 기반 벡터 검색을 결합하여 검색 정확도를 극대화합니다.
- **AI 에이전트 워크플로우**: **LangGraph** 기반의 자율 에이전트가 검색된 정보를 바탕으로 사용자 질의에 대한 심층적인 답변을 생성합니다.
- **RESTful API**: **FastAPI**를 사용하여 프로젝트의 모든 기능을 외부에서 활용할 수 있도록 안정적인 API를 제공합니다.

-----

### 기술 스택

- **Backend**: **Python**, **FastAPI**, **LangChain**, **LangGraph**, **SQLAlchemy**
- **Frontend**: **React**, **TypeScript**, **Vite**, **Tailwind CSS**, **Axios**, **Recharts**
- **Data**: **Selenium**, **BeautifulSoup**, **Sentence-Transformers**
- **Infra**: **AWS DynamoDB**, **OpenSearch**, **Redis**, **Airflow**, **Docker**, **Vercel**, **Railway**

-----

### 시스템 아키텍처

\`\`\`mermaid
graph LR
    subgraph Airflow["Airflow 데이터 파이프라인"]
        direction LR
        B[Crawler] --> C[(DynamoDB)]
        C --> D[전처리] --> E[임베딩]
        D --> F[(OpenSearch<br/>BM25 + Dense)]
        E --> F
    end
    
    G[사용자 쿼리] --> H[FastAPI on Railway] <--> J[LangGraph AI]
    F --> I[하이브리드 검색] <--> J
    H <--> K[(Redis<br/>대화 캐시)]
    
    L[React 앱 on Vercel] <--> H
    L --> M[대시보드]
    L --> N[채팅]
\`\`\``,
    image: '/placeholder-project-1.png',
    technologies: ['Python','Airflow', 'AWS', 'DynamoDB', 'OpenSearch', 'LangGraph', 'Sentence-Transformers', 'FastAPI', 'Redis', 'Vite', 'React', 'TypeScript', 'Docker', 'Railway', 'Vercel'],
    category: 'ai',
    githubUrl: 'https://github.com/statjhw/MangMangDae-AI',
    liveUrl: 'https://example.com',
    featured: true,
    startDate: '2025-04',
    endDate: '2025-08',
    status: 'in-progress',
    teamSize: 4,
  },
  {
    id: '2',
    title: '가상화폐 데이터 파이프라인 구축',
    description: '여러 거래소의 데이터를 실시간으로 수집 후, 데이터를 처리하고, 데이터를 저장하여 대시보드로 확인하는 파이프라인을 구축',
    longDescription: 'A comprehensive e-commerce platform featuring user authentication, product management, shopping cart functionality, and secure payment processing. Built with modern technologies and best practices for scalability and performance.',
    markdownContent: `## 실시간 암호화폐 데이터 파이프라인 및 시각화 대시보드

-----
### 프로젝트 개요

이 프로젝트는 여러 암호화폐 거래소에서 실시간으로 자산 데이터를 수집하고, 스트림 처리를 통해 가격 변동률 및 거래소 간 괴리율과 같은 주요 지표를 계산하여 대시보드에 시각화하는 시스템입니다. 데이터 엔지니어링의 핵심 요소인 **데이터 수집, 처리, 저장, 시각화**의 전 과정을 경험하고 End-to-End 데이터 파이프라인을 직접 구축하는 것을 목표로 했습니다.

#### 1. 데이터 수집 시스템 구축

- **다중 거래소 API 연동**:
  - **Python**으로 5개 주요 암호화폐 거래소(Binance, Bithumb, Bybit, Upbit, Coinone) API를 동시에 연동하는 Producer 시스템을 구축했습니다.
  - 거래소별 수집기 스레드를 생성하여 병렬 처리로 데이터 수집 성능을 최적화하고, 실시간으로 **Apache Kafka** 토픽에 데이터를 전송하도록 구현했습니다.

- **실시간 데이터 스트리밍**:
  - 안정적인 데이터 처리를 위해 **Apache Kafka**를 메시지 큐로 활용하여 안정적인 데이터 스트리밍 환경을 구축했습니다.
  - 거래소별 토픽을 생성하여 데이터를 분리하여 처리하고, 가상화폐의 ticker를 key로 설정하는 파티셔닝을 적용하여 데이터를 효율적으로 분산 처리하도록 구현했습니다.

#### 2. 실시간 스트림 처리 구현

- **스트림 데이터 처리**:
  - **Apache Flink**를 활용하여 **Kafka**에서 들어오는 대규모 데이터 스트림을 실시간으로 처리하는 시스템을 구축했습니다.
  - 실시간 처리에 강력한 **Apache Flink**를 사용하여 데이터의 정확성을 보장하기 위해 노력했습니다. 
  - 가격 변동률과 EMA(지수이동평균) 기반 괴리율을 계산하는 알고리즘을 구현하여 의미있는 금융 지표를 생성했습니다.
  - 처리된 데이터는 **Kafka**의 토픽에 거래소가 통합된 하나의 토픽으로 저장됩니다. 이때는 데이터의 스키마를 통합하여 하나의 스키마로 저장합니다.

- **데이터 저장 파이프라인**:
  - **Kafka**에 들어오는 데이터를 **Telegraf**를 통해 시계열 데이터베이스인 **InfluxDB**에 효율적으로 저장하는 파이프라인을 구축했습니다.
  - 시계열 데이터 특성에 맞는 스키마 설계와 인덱싱 전략을 적용했습니다.

#### 3. 시각화 및 인프라 구축

- **실시간 대시보드 개발**:
  - **Grafana**를 사용하여 사용자가 인터랙티브하게 데이터를 탐색할 수 있는 실시간 대시보드를 구축했습니다.
  - 가격, 변동률, 괴리율 등 핵심 지표를 직관적으로 시각화하여 사용자 경험을 최적화했습니다.

- **컨테이너 기반 배포**:
  - 모든 시스템 구성 요소를 **Docker** 컨테이너화하고 **Docker Compose**로 관리하여 원클릭 배포가 가능한 환경을 구축했습니다.
  - 개발환경과 운영환경의 일관성을 보장하고 확장성과 유지보수성을 향상시켰습니다.

-----

### 주요 기능

- **실시간 데이터 수집**: 5개 주요 암호화폐 거래소 API를 통한 병렬 데이터 수집. **Python** Producer가 거래소별 스레드로 **Apache Kafka**에 실시간 전송.
- **대용량 스트림 처리**: **Apache Flink**를 활용한 실시간 데이터 처리. 가격 변동률과 EMA 기반 괴리율 계산으로 의미있는 금융 지표 생성.
- **시계열 데이터 저장**: **Telegraf**를 통한 **InfluxDB** 저장. 시계열 데이터 특성에 최적화된 스키마와 인덱싱 적용.
- **실시간 대시보드**: **Grafana**를 사용한 인터랙티브 시각화. 가격, 변동률, 괴리율 등 핵심 지표의 직관적 모니터링 제공.

-----

### 기술 스택

- **Data Collection**: **Python**, **Threading**, **REST API**
- **Message Queue**: **Apache Kafka**, **Kafka Topics**
- **Stream Processing**: **Apache Flink**, **Real-time Analytics**
- **Database**: **InfluxDB**, **Time Series DB**
- **Data Pipeline**: **Telegraf**, **Data Ingestion**
- **Visualization**: **Grafana**, **Interactive Dashboard**
- **Infrastructure**: **Docker**, **Docker Compose**, **Container Orchestration**

-----

### 시스템 아키텍처

\`\`\`mermaid
graph TB
    subgraph Sources["📊 데이터 소스"]
        A1[Binance API]
        A2[Upbit API]
        A3[Bybit API]
        A4[Bithumb API]
        A5[Coinone API]
    end
    
    subgraph Collection["🔄 데이터 수집"]
        B[Python Producers<br/>Multi-Threading]
    end
    
    subgraph Queue["📨 메시지 큐"]
        C[Apache Kafka<br/>Topics & Partitions]
    end
    
    subgraph Processing["⚡ 스트림 처리"]
        D[Apache Flink Processor<br/>변동률 & 괴리율 계산]
    end
    
    subgraph Storage["🗄️ 데이터 저장"]
        E[Telegraf<br/>Data Ingestion]
        F[InfluxDB<br/>Time Series DB]
    end
    
    subgraph Visualization["📈 시각화"]
        G[Grafana Dashboard<br/>Real-time Monitoring]
    end
    
    A1 --> B
    A2 --> B
    A3 --> B
    A4 --> B
    A5 --> B
    B --> C
    C --> D
    D --> C
    C --> E
    E --> F
    F --> G
\`\`\`

-----

### 성과 및 결과

- **실시간 처리 성능**: 5개 거래소에서 동시 데이터 수집 및 실시간 스트림 처리 구현
- **시스템 안정성**: **Docker** 컨테이너화를 통한 원클릭 배포 및 운영 환경 일관성 확보
- **데이터 정확성**: EMA 기반 괴리율 계산 알고리즘으로 의미있는 금융 지표 생성
- **기술적 성장**: End-to-End 데이터 파이프라인 구축 경험을 통한 데이터 엔지니어링 역량 강화

-----

### 배운 점과 개선사항

**핵심 인사이트:**
- **데이터 통합의 중요성**: 여러 거래소 데이터의 스키마 통합 과정에서 초기 데이터 설계의 중요성을 깨달았습니다. 도메인 지식을 바탕으로 한 데이터 구조 이해가 효율적인 파이프라인 구축의 핵심임을 학습했습니다.
- **호환성 관리**: **Apache Flink**와 **InfluxDB** 간 jar 파일 호환성 문제를 해결하기 위해 중간 저장소로 **Kafka**를 활용하는 대안적 아키텍처를 설계했습니다.

**향후 개선 방안:**
- 통합 데이터 스키마 설계를 통한 효율적인 데이터 처리 파이프라인 구축
- 라이브러리 호환성 사전 검증을 통한 안정적인 시스템 아키텍처 설계

    `,
    image: '/placeholder-project-2.jpg',
    technologies: ['Python', 'Apache Kafka', 'Apache Flink', 'InfluxDB', 'Telegraf', 'Grafana', 'Docker', 'Docker Compose', 'Shell Script'],
    category: 'data pipeline',
    githubUrl: 'https://github.com/statjhw/real-time-asset-tracker/',
    featured: true,
    startDate: '2025-07',
    endDate: '2025-08',
    status: 'completed',
    teamSize: 1,
  },
  {
    id: '3',
    title: 'Apache Spark 병렬 분산 처리 플랫폼',
    description: 'GCP와 AWS를 활용한 Apache Spark를 활용한 병렬 분산 처리 플랫폼',
    longDescription: 'A comprehensive e-commerce platform featuring user authentication, product management, shopping cart functionality, and secure payment processing. Built with modern technologies and best practices for scalability and performance.',
    markdownContent: `## Apache Spark 병렬 분산 처리 플랫폼

-----

### 프로젝트 개요

이 프로젝트는 클라우드 환경의 데이터셋에 대한 고속 분산 처리를 목표로 구축된 **Apache Spark 클러스터 시스템**입니다. 
**Docker** 컨테이너 환경에서 **Apache Spark 클러스터**를 구성하고, **Google BigQuery**의 공개 데이터를 분석하여 그 결과를 **Amazon S3**에 저장하는 멀티 클라우드 아키텍처를 구현했습니다.
데이터 엔지니어링의 핵심인 데이터 처리 파이프라인을 직접 설계하고 운영하는 경험을 쌓는 것을 목표로 했습니다.

### 분산 시스템 설계 및 멀티 클라우드 아키텍처 구축

저는 프로젝트의 **전체 분산 시스템 아키텍처 설계**부터 **멀티 클라우드 데이터 파이프라인 구축**, **컨테이너 기반 배포 환경 구성**까지 End-to-End 대용량 데이터 처리 시스템의 모든 과정을 진행했습니다.

#### 1. Apache Spark 클러스터 구축

- **분산 처리 환경 설계**:
  - **Apache Spark** 클러스터(Master 1대, Worker 2대)를 **Docker Compose**로 구성하여 대용량 데이터의 병렬 처리 환경을 구축했습니다.
  - 클러스터 간 통신과 작업 분산을 위한 네트워크 설정과 리소스 할당 전략을 수립했습니다.

- **컨테이너 기반 인프라 구성**:
  - 모든 서비스를 **Docker** 컨테이너화하여 개발 환경의 복잡성을 줄이고 배포 일관성을 확보했습니다.
  - **run.sh** 스크립트를 작성하여 원클릭 배포, 관리 및 확장이 가능한 자동화 환경을 구축했습니다.

#### 2. 멀티 클라우드 데이터 파이프라인 개발

- **데이터 소스 연동**:
  - **Google BigQuery**의 NYC 택시 데이터셋을 활용하여 대용량 공개 데이터를 분석할 수 있는 파이프라인을 구축했습니다.
  - **BigQuery Connector**를 통한 안정적인 데이터 추출 로직을 구현했습니다.

- **결과 저장 시스템**:
  - 분석 결과를 **Amazon S3**에 **Parquet** 형식으로 저장하여 데이터 압축률과 쿼리 성능을 최적화했습니다.
  - 서로 다른 클라우드 플랫폼에서의 데이터 연계를 경험하기 위해 **Google BigQuery**와 **Amazon S3**를 활용한 멀티 클라우드 데이터 파이프라인을 구축했습니다.

- **데이터 분석 로직 구현**:
  - **PySpark**를 활용하여 '승객 수별 평균 요금' 계산 등 대용량 데이터 분석 알고리즘을 구현했습니다.

-----

### 주요 기능

- **분산 데이터 처리**: **Apache Spark** 클러스터를 통한 대용량 NYC 택시 데이터셋의 병렬 처리. Master-Worker 구조로 작업 분산 및 성능 최적화.
- **멀티 클라우드 통합**: **Google BigQuery**에서 **Amazon S3**로의 데이터 파이프라인. 서로 다른 클라우드 플랫폼 간 원활한 데이터 연동.
- **컨테이너 기반 배포**: **Docker Compose**를 활용한 전체 시스템 컨테이너화. 개발 환경 복잡성 감소 및 배포 일관성 확보.

-----

### 기술 스택

- **Computing Engine**: **Apache Spark 3.4.0**, **PySpark**
- **Data Source**: **Google BigQuery**, **NYC Taxi Dataset**
- **Data Storage**: **Amazon S3**, **Parquet Format**
- **Programming**: **Python**, **Shell Script**
- **Infrastructure**: **Docker**, **Docker Compose**
- **Cloud Integration**: **Multi-Cloud Architecture**

-----

### 시스템 아키텍처

\`\`\`mermaid
graph TB
    subgraph Cluster["🖥️ Spark 클러스터"]
        Master[Spark Master<br/>:8080, :7077]
        Worker1[Worker 1<br/>:8081]
        Worker2[Worker 2<br/>:8082]
        
        Master --> Worker1
        Master --> Worker2
    end
    
    subgraph App["📊 분석 애플리케이션"]
        Spark[PySpark Application<br/>분산 데이터 분석]
    end
    
    subgraph Sources["☁️ 데이터 소스"]
        BQ[Google BigQuery<br/>NYC 택시 데이터셋]
    end
    
    subgraph Storage["💾 결과 저장소"]
        S3[Amazon S3<br/>Parquet 파일]
    end
    
    BQ --> Spark
    Spark --> Cluster
    Cluster --> Spark
    Spark --> S3
\`\`\`

-----

### 성과 및 결과

- **분산 처리 성능**: Master-Worker 구조를 통한 대용량 데이터 병렬 처리 구현
- **멀티 클라우드 연동**: Google과 Amazon 클라우드 서비스 간 안정적인 데이터 파이프라인 구축
- **시스템 자동화**: Docker 컨테이너화와 Shell Script를 통한 원클릭 배포 환경 구현
- **데이터 최적화**: Parquet 형식 활용으로 데이터 압축률 및 쿼리 성능 향상

-----

### 배운 점과 개선사항

**핵심 인사이트:**
- **분산 시스템의 이해**: **Apache Spark**의 Master-Worker 아키텍처를 통해 분산 컴퓨팅의 핵심 개념과 작업 분산 메커니즘을 학습했습니다.
- **멀티 클라우드 전략**: 서로 다른 클라우드 플랫폼의 장점을 활용한 하이브리드 아키텍처 설계 경험을 쌓았습니다.

**아쉬웠던 점과 개선 방안:**
- **로컬 환경의 한계**: 컴퓨팅 자원의 제약으로 모든 Worker가 같은 로컬 환경에서 실행되었습니다. 실제 운영환경에서는 별도 서버에 Worker를 분산 배치하여 진정한 분산 처리 환경을 구현할 예정입니다.
- **확장성 고려**: 향후 **Kubernetes** 기반의 클러스터 오케스트레이션을 도입하여 동적 스케일링과 리소스 효율성을 개선하고자 합니다.
    `,
    image: '/placeholder-project-3.png',
    technologies: ['Apache Spark', 'PySpark', 'Python', 'AWS', 'GCP', 'S3', 'BigQuery','Docker', 'Docker Compose', 'Parquet', 'Shell Script'],
    category: 'data pipeline',
    githubUrl: 'https://github.com/statjhw/spark-parallel',
    featured: true,
    startDate: '2025-07',
    endDate: '2025-07',
    status: 'completed',
    teamSize: 1,
  },
  {
    id: '4',
    title: '클로드 코드 학습 선생님 에이전트 템플릿',
    description: '데이터 분야 학습을 위한 클로드 코드 에이전트 npx 설치 툴',
    longDescription: '데이터 분야 학습을 위한 클로드 코드 에이전트 npx 설치 툴',
    markdownContent: `
## 프로젝트 개요

**Claude Data Academy**는 Claude Code 개발 환경에 데이터 분야의 전문 AI 선생님들을 설치하여, **AI를 활용한 새로운 학습 경험을 제공**하는 NPX CLI 도구입니다. 사용자는 마치 실제 멘토와 대화하듯 AI 선생님과 상호작용하며 데이터 엔지니어링, 분석, 과학 등 전문 분야의 실무 역량을 키울 수 있습니다.

이 프로젝트의 핵심은 단순히 지식을 전달하는 AI가 아닌, 학습자가 **스스로 문제를 정의하고 해결책을 찾아나갈 수 있도록 돕는 **멘토**를 구현하는 데 있습니다.

- **GitHub Repository**: [https://github.com/statjhw/claude-data-academy](https://github.com/statjhw/claude-data-academy)
- **NPM Package**: [https://www.npmjs.com/package/claude-data-academy](https://www.npmjs.com/package/claude-data-academy)

---

## 프로젝트 목적 및 동기

클로드 코드, 커서, 코파일럿 등의 AI 챗봇은 정답을 바로 알려주며 학습자가 깊게 고민할 기회를 빼앗기도 합니다.

이러한 문제의식에서 출발하여, **"AI를 어떻게 하면 더 효과적인 학습 도구로 활용할 수 있을까?"** 라는 생각으로 프로젝트를 진행했습니다.

1.  **능동적 학습 유도**: 정답을 알려주는 대신, 올바른 방향으로 이끄는 질문을 던지는 AI 멘토를 구현하여 학습자의 비판적 사고와 문제 해결 능력을 자극합니다.
2.  **개인화된 학습 경험**: 학습자의 수준(초급, 중급, 고급)과 관심사에 맞춰 맞춤형 학습 로드맵과 과제를 제공하여 학습 효율을 극대화합니다.
3.  **실무 중심의 지식 습득**: 현업에서 사용하는 기술 스택과 문제 해결 방식을 **TODO 기반의 실습 코드**에 녹여내어, 이론과 실무의 간극을 줄입니다.

결론적으로, 이 프로젝트는 클로드 코드 환경에서 에이전트를 **정답 자판기가 아닌 학습 파트너**로 활용하는 것을 목표로 합니다.

---

## 설치 및 실행

\`\`\`bash
npx claude-data-academy #대화형 설치
npx claude-data-academy --all #모든 에이전트 설치
npx claude-data-academy --list #설치된 에이전트 목록
npx claude-data-academy --teacher <teacher_name> #특정 에이전트 설치
\`\`\`

## 주요 기능

- **🤖 5명의 전문 AI 선생님**: 데이터 엔지니어, 분석가, 과학자, 아키텍트, AI 엔지니어 등 세분화된 5명의 AI 멘토를 제공합니다.
- **💬 대화형 설치 프로세스**: **npx claude-data-academy** 명령어 하나로 사용자와 상호작용하며 필요한 선생님과 학습 수준을 설정하고 설치를 진행합니다.
- **🎯 소크라테스식 교육 방식**: AI 선생님은 정답 대신 "왜 그렇게 생각했나요?", "다른 방법은 없을까요?" 와 같은 질문을 통해 학습자의 사고를 유도합니다.
- **📝 TODO 기반 실습**: 핵심 로직이 비워진 코드 템플릿(**TODO**)을 제공하여 학습자가 직접 코드를 완성하며 실무 역량을 강화합니다.
- **🗺️ 맞춤형 학습 로드맵 생성**: 설치된 선생님과 설정된 학습 수준에 따라 개인화된 학습 목표, 경로, 주차별 계획이 담긴 **LEARNING_ROADMAP.md** 파일을 자동 생성합니다.
- **📊 학습 진도 추적**: **progress.json** 파일을 통해 선생님별 학습 진행률, 현재 주제, 완료 과제 등을 체계적으로 관리합니다.

---

## 기술 스택

- **언어**: JavaScript (Node.js)
- **프레임워크**: Commander.js (CLI 구축)
- **주요 라이브러리**:
    - **inquirer**: 대화형 CLI 인터페이스 구현
    - **chalk**: 터미널 출력 스타일링
    - **fs-extra**: 파일 시스템 처리
- **테스트**: Jest
- **린팅**: ESLint

---

## 아키텍처 및 핵심 로직

1.  **CLI 실행 (**bin/cli.js)**: **npx**를 통해 CLI가 실행되면, **commander**를 사용해 명령어 옵션(**--all**, **--list** 등)을 파싱하고, 옵션이 없으면 **interactive.js**의 대화형 설치 모드를 실행합니다.

2.  **프로젝트 환경 검증 (**lib/validator.js)**: 현재 디렉토리에 **.claude/agents** 경로가 있는지 확인하고, 없으면 자동으로 생성하여 Claude Code 프로젝트 환경을 구성합니다. 이미 설치된 선생님이 있는지 파악하여 충돌을 방지합니다.

3.  **AI 선생님 설치 (**lib/installer.js)**: 사용자가 선택한 선생님의 마크다운(**teachers/*.md**) 파일을 **.claude/agents** 디렉토리로 복사합니다. 이 마크다운 파일 자체가 AI 선생님의 역할, 교육 방식, 대화 패턴 등을 정의하는 **'페르소나 프롬프트'** 역할을 합니다.

4.  **학습 자료 생성 (**lib/teachers-manager.js)**: 설치된 선생님 정보와 학습자 레벨을 조합하여 **templates/learning-roadmap.md** 템플릿을 기반으로 개인화된 로드맵을 생성합니다. 또한 **progress.json** 파일을 생성하거나 업데이트하여 학습 상태를 초기화합니다.

이 구조의 핵심은 **AI의 행동 지침(페르소나)을 마크다운 파일로 분리**하여 쉽게 추가하거나 수정할 수 있게 만든 것입니다. 개발자는 복잡한 코드가 아닌, 교육 철학이 담긴 문서를 수정함으로써 AI 멘토의 행동을 변경하고 발전시킬 수 있습니다.

    `,
    image: '/placeholder-project-4.png',
    technologies: ['Node.js', 'javascript', 'FS-Extra', 'Jest', 'ESLint'],
    category: 'tool',
    githubUrl: 'https://github.com/statjhw/claude-data-academy',
    liveUrl: 'https://www.npmjs.com/package/claude-data-academy',
    featured: false,
    startDate: '2025-08',
    endDate: '2025-08',
    status: 'completed',
    teamSize: 1,
  },
  {
    id: '5',
    title: 'AI 프롬프트 엔지니어링 실험계획법',
    description: 'AI 프롬프트에 미치는 특성을 통계적으로 실험계획하여 분석',
    longDescription: 'AI 프롬프트 엔지니어링 실험계획법',
    markdownContent: `
## 프로젝트 개요

이 프로젝트는 직관과 경험에 의존하던 기존의 프롬프트 엔지니어링을 **통계적으로** 검증하기 위한 시도입니다.
**실험계획법**이라는 통계적 방법론을 적용하여, 다양한 프롬프트 구성 요소들이 대규모 언어 모델(LLM)의 응답에 미치는 영향을 
**정량적으로 분석하고 통계적으로 검증**하는 것을 목표로 합니다.

본 프로젝트는 단순히 더 나은 프롬프트를 찾는 것을 넘어, 어떤 요소가 **왜, 그리고 얼마나** AI 응답의 **일관성(Consistency)**에 영향을 미치는지 통계적으로 규명하는 데 중점을 둡니다.

## 실험 설계 및 분석

본 연구는 두 가지 주요 실험 설계를 통해 프롬프트의 특성을 체계적으로 분석했습니다.

### 1. 요인 설계 실험 (2^k Factorial Design)

LLM 응답에 영향을 미칠 것으로 예상되는 핵심 요인들을 선정하고, 이 요인들의 개별적인 효과(주효과)와 요인 간의 상호작용 효과를 통계적으로 분석했습니다.

-   **실험 목표**: 프롬프트 구성 요소가 AI 응답의 일관성에 미치는 주효과 및 교호작용 효과를 식별하고 정량화합니다.
-   **실험 요인 (Factors)**:
    -   **언어 (prompt_language)**: 프롬프트 작성에 사용된 언어 (한국어 vs 영어)
    -   **모델 (model)**: 응답을 생성하는 LLM (GPT-3.5-Turbo vs GPT-4o-mini)
    -   **역할 부여 (role_assignment)**: 프롬프트에 전문가 역할을 부여했는지 여부 (역할 부여 vs 미부여)
    -   **명시성 (explicitness)**: 지시사항의 구체성 수준 (높음 vs 낮음)
-   **반응 변수 (Response)**: AI 응답의 일관성. 동일한 조건의 프롬프트에 대해 여러 번(n=5) 응답을 생성한 후, 응답들 간의 의미적 유사도를 **BERT Score**로 측정하여 계량화했습니다.
-   **통계 분석**: 수집된 데이터를 바탕으로 **분산 분석(ANOVA)**을 수행하여 각 요인의 통계적 유의성을 검증하고, 효과 크기를 분석했습니다.

### 2. 랜덤화 완전 블록 설계 (Randomized Complete Block Design, RCBD)

프롬프트의 감정적인 표현 방식(프레이밍)이 응답 일관성에 미치는 영향을 분석하되, 질문 자체의 특성(주제)이 결과에 미치는 영향을 통제하기 위해 RCBD 설계를 도입했습니다.

-   **실험 목표**: 질문의 '주제'라는 외적 요인의 효과를 통제한 상태에서, 프롬프트의 **감정적 프레이밍(Emotional Framing)**이 AI 응답 일관성에 미치는 영향을 정밀하게 측정합니다.
-   **처리 요인 (Treatment Factor)**:
    -   **프레이밍 수준**: 중립적, 정서적, 자극적 표현
-   **블록 요인 (Block Factor)**:
    -   **질문 카테고리**: 인성, 창의성, 논리적 추론
-   **반응 변수 (Response)**: 요인 설계 실험과 동일하게 **BERT Score** 기반의 응답 일관성을 사용했습니다.
-   **통계 분석**: **RCBD 분산 분석**을 통해 처리(프레이밍)와 블록(카테고리)의 효과를 분리하여 프레이밍의 순수한 영향을 통계적으로 검증했습니다.

## 결론 및 의의

이 프로젝트는 실험계획법을 통해 프롬프트 엔지니어링을 '감'이 아닌 '데이터'의 영역으로 가져왔다는 점에서 의의가 있습니다. 통계적으로 검증된 결과를 바탕으로, 우리는 다음과 같은 질문에 대한 통계적 근거를 마련할 수 있습니다.

-   "AI에게 역할을 부여하는 것은 정말 응답 품질에 유의미한 영향을 주는가?"
-   "어떤 모델이 특정 유형의 질문에 더 일관적인 답변을 하는가?"
-   "프롬프트의 언어와 명확성 수준 사이에는 어떤 상호작용이 존재하는가?"

이러한 접근 방식은 향후 더욱 신뢰성 높고 안정적인 AI 시스템을 구축하는 데 중요한 통계적 토대를 제공할 것이라고 기대합니다.

    `,
    image: '/placeholder-project-5.png',
    technologies: ['Python', 'Prompt Engineering', 'Statistics', 'Data Analysis', 'OpenAI', 'BERT Score'],
    category: 'statistics',
    githubUrl: 'https://github.com/statjhw/DOE',
    liveUrl: 'https://github.com/statjhw/DOE/blob/master/DOE_AI%20%EC%9D%91%EB%8B%B5%20%EC%9D%BC%EA%B4%80%EC%84%B1%EC%97%90%20%EC%98%81%ED%96%A5%EC%9D%84%20%EB%AF%B8%EC%B9%98%EB%8A%94%20%ED%94%84%EB%A1%AC%ED%94%84%ED%8A%B8%20%EC%9A%94%EC%9D%B8%20%EB%B6%84%EC%84%9D%20%EB%B3%B4%EA%B3%A0%EC%84%9C.pdf',
    featured: false,
    startDate: '2025-05',
    endDate: '2025-06',
    status: 'completed',
    teamSize: 4,
  },
]

export const technologies = [
  'Airflow', 'Apache Flink', 'Apache Kafka', 'AWS', 'BigQuery', 'Docker', 'Docker Compose', 'DynamoDB', 
  'FastAPI', 'GCP', 'Grafana', 'InfluxDB', 'LangGraph', 'OpenSearch', 
  'Python', 'React', 'Redis', 'Sentence-Transformers', 'S3','Telegraf', 'TypeScript', 'Vercel', 'Vite', 
  'Node.js', 'Commander.js', 'Inquirer.js', 'Chalk.js', 'FS-Extra', 'Jest', 'ESLint',
  'Prompt Engineering', 'Statistics', 'Data Analysis', 'OpenAI', 'BERT Score'
]

export const categories = [
  { value: 'all', label: 'All Projects' },
  {value: 'ai', label: "AI"},
  {value: 'data pipeline', label: "Data Pipeline"},
  {value: 'tool', label: "Tool"},
  {value: 'statistics', label: "Statistics"}
]