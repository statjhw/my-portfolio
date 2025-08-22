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
    title: 'Parallel Consumer를 이용한 파티션 증가 없이 동시 처리량 늘리기',
    excerpt: 'Kafka의 Parallel Consumer를 이용하여 파티션 증가 없이 동시 처리량을 늘리는 방법을 공유합니다.',
    content: `

[https://d2.naver.com/helloworld/7181840](https://d2.naver.com/helloworld/7181840)

네이버의 기술 블로그를 보던 중 Kafka를 사용하면서 파티션 증가없이 동시처리량을 늘리는 글을 보게 되었다.

바로 Confluent Inc.에서 만든 오픈소스 **Parallel Consumer** 라이브러리를 이용하는 것이다. 

## Parallel Comsumer의 메세지 단위 처리

기존의 Kafka 컨슈머는 토픽의 파티션 단위로 스레드를 생성하여 각 파티션을 메세지를 순차적으로 읽고 offset을 커밋한다. 따라서 파티션을 늘리면 동시에 처리할 수 있는 메세지량이 늘어 동시 처리량이 증가한다. 

하지만 블로그 글을 보면 단순히 파티션을 증가시키는 것에는 단점이 있다. 여러 메타 데이터를 저장하는 파일들이 증가하여 여러 비용이 증가한다. 

**Parallel Comsumer**는 파티션 안에 메세지를 동시에 처리할 수 있다. 아래 그럼에서 볼 수 있듯이 **Parallel Comsumer**는 하나의 파티션에서 3개의 메세지를 병렬적으로 처리한다. 

![Parallel Consumer 메시지 병렬 처리 다이어그램](/blog/blog1-1.png)

    그림 출처 - https://d2.naver.com/helloworld/7181840

## Parallel Comsumer의 오프셋 관리

기존 Kafka에서는 오프셋 정보를 마지막으로 처리한 데이터 정보를 커밋하여 오프셋을 관리한다.

**Parallel Comsumer**는 같은 파티션의 여러 데이터를 동시에 처리하기 때문에 오프셋을 세심히 관리해야 한다. 

**Parallel Comsumer**는 오프셋 갱신을 비동기적으로 처리한다. 처리 결과를 임시 스토리지에 저장하고 주기적으로 오프셋을 갱신하여 병목현상이 발생하지 않도록 방지한다.

하지만 **Parallel Comsumer**는 메시지를 동시에 처리하기 때문에 11, 12, 13 번 오프셋을 처리하는 중 11, 13은 처리되고 12가 처리 중인 문제가 발생할 수 있다. 

이때 **Parallel Comsumer**는 12번 오프셋이 처리 중이기 때문에 11번 오프셋을 커밋을 한다. 

즉, 연속된 가장 높은 오프셋을 커밋한다. 

![Parallel Consumer 오프셋 관리 다이어그램](/blog/blog1-2.png)

    그림 출처 - https://d2.naver.com/helloworld/7181840

## Parallel Comsumer의 순서 보장 방식

만약 메세지의 순서가 중요한 경우에는 메세지를 동시에 처리하는 경우 문제가 발생할 수 있다.

내가 진행했던 프로젝트 중 가상화폐의 정보를 티커 단위로 메세지에 저장한다. 

저장 후, 지수이동평균 등을 계산하기 때문에 만약 먼저 들어온 메세지보다 같은 티커의 메세지가 먼저 처리된다면 정확한 지수이동평균을 계산할 수 없는 오류가 발생한다. 

따라서 **Parallel Comsumer**는 이를 위해 Partition, Key, Unordered의 세 가지 순서 보장 방식을 제공한다.

### Partition

**Partition** 방식은 Kafka의 파티션 단위로 순서를 보장한다. 원래의 방식과 큰 차이는 없다.

### key

먼저 kafka에서는 key에 따라 파티션의 위치가 정해진다. 같은 key를 가진 메세지는 같은 파티션에 들어간다. **Parallel Comsumer**는 **key 방식**의 순서 보장으로 파티션 안의 같은 key의 메세지를 순차적으로 처리한다.  

또한 같은 파티션 안에 다른 key는 여전히 병렬 처리하여 동시 처리를 보장한다.  ****

### Unordered

**Unordered** 방식은 순서를 보장하기 않는다.앞서 들어온 메세지의 완료 결과를 기다리지 않는다. 즉, 특별한 제약없이 메세지들이 병렬처리되기 때문에 세 방식 중 성능이 가장 뛰어나다.

## Kafka Comsumer vs Parallel Comsumer

실제 환경에서 데이터 처리 속도가 빨라지는 확인해보기 위해 위키피디아 실시간 데이터를 처리해보는 실험을 진행했다. 

과거 진행했던 binance 거래소의 가상화폐 정보를 저장한 토픽을 이용하여 실험을 진행했다.

![Binance 토픽 구조 다이어그램](/blog/blog1-3.png)

가상화폐의 각 티커가 key가 되어 3개의 파티션에 저장됩니다.

하나의 binance에 대해 순서 보장 단위 별로 컨슈머 그룹을 생성하여 처리 속도 실험을 진행했습니다.

### **실험 결과**

**Partition**

![Partition 모드 실험 결과 (단순 읽기)](/blog/blog1-4.png)

**Key**

![Key 모드 실험 결과 (단순 읽기)](/blog/blog1-5.png)

**UnOrdered**

![UnOrdered 모드 실험 결과 (단순 읽기)](/blog/blog1-6.png)

| **순서 보장 단위** | **속도** |
| --- | --- |
| Partition(2개의 partition) | 8.86s |
| Key(2개의 partition) | 45.45s |
| UnOrdered(2개의 partition) | 37.64s |

실제 실행 결과, 당황스러운 결과를 발견했다. Partition 단위 > Unordered 단위 > Key 단위 순으로 Partition 단위의 순서 보장이 가장 빠르게 처리되었다. 

이유를 생각해보니, 위 실험에서는 데이터를 처리하는 로직없이 데이터를 읽는 속도를 측정했다. 병렬 처리의 이점을 얻기 위해서는 계산 로직 등의 병렬 처리 오버헤드를 상쇄시킬 계산 로직이 필요한 것으로 판단하였다. 

따라서 JSON 파싱 + 간단한 계산 코드를 추가하여 실험을 진행했다.

**Partition**

![Partition 모드 실험 결과 (JSON 파싱 + 계산)](/blog/blog1-7.png)

**Key**

![Key 모드 실험 결과 (JSON 파싱 + 계산)](/blog/blog1-8.png)

**UnOrdered**

![UnOrdered 모드 실험 결과 (JSON 파싱 + 계산)](/blog/blog1-9.png)

**실험 결과**

| **순서 보장 단위** | **처리 속도** |
| --- | --- |
| Partition(3개의 partition) | 1244s |
| Key(3개의 partition) | 131s |
| UnOrdered(3개의 partition) | 133s |

실험 결과 Key > UnOrdered > Partition 순서로 처리 속도가 빨랐다. 같은 파티션의 갯수에서 메세지 처리 속도를 크게 향상된 볼 수 있다. 

UnOrdered 단위 보다 Key 단위 보장이 조금 더 빠르게 처리된 것을 볼 수 있었다. 먼저 Key 단위 처리 시에는 같은 Key는 같은 스레드에 할당된다는 조건이 붙는다. 같은 스레드안에서는 먼저 온 것이 먼저 처리되기 때문에 같은 Key 메세지의 순서가 보장이 된다. 

현재 실험의 Topic을 보면 Key의 갯수가 많고 각 Key 별 메세지 수도 균등하다. 여러 가상화폐의 티커가 key로 저장된다. 따라서 여러 스레드에 균등하게 할당되기 때문에 위 실험에는 Key와 UnOrdered의 성능 차이가 없었던 것으로 보인다.

## 마치며

동일한 파티션을 환경에서 **Parallel Consumer**를 사용하면 데이터 동시처리 속도를 향상시키는 것을 확인했다.

파티션을 증가시키기 어려운 환경에서 **Parallel Consumer**는 좋은 선택지가 될 수 있을 것 같다.


실험 코드는 [여기](https://github.com/statjhw/Parallel_Comsumer_Test)에서 확인하실 수 있습니다.

## 참고
- [https://d2.naver.com/helloworld/7181840](https://d2.naver.com/helloworld/7181840)

    `,
    author: 'HyeonWu Jang',
    publishedAt: '2025-08-22',
    category: 'data pipeline',
    tags: ['Kafka', 'Performance'],
    readingTime: 8,
    featured: true,
    published: true,
    slug: 'parallel-consumer',
    coverImage: '/blog/blog1-1.png'
  }
]

export const categories = [
  { value: 'all', label: 'All Categories' },
  { value: 'data pipeline', label: 'Data Pipeline' },
  
]

export const allTags = [
  'Kafka', 'Performance'
]