<p align="center">
  <a href="https://muroom.kr">
    <img src="https://res.cloudinary.com/dpzexzf44/image/upload/c_fill,ar_21:9,w_1200,r_30/v1771330572/KakaoTalk_Photo_2026-02-17-21-14-25_1_nkmulb.png" 
         width="100%" 
         height="100%"
         alt="muroom-thumbnail" />
  </a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Status-DEVELOPING-blue?style=for-the-badge" alt="Status" />
  <img src="https://img.shields.io/badge/Featured-Amber?style=for-the-badge&color=FFBF00" alt="Featured" />
</p>

<h1 align="center">뮤룸 (Muroom)</h1>

<p align="center">
  <b>뮤지션을 위한 위치 기반(LBS) 작업실 탐색 및 큐레이션 플랫폼</b><br />
  사용자 경험의 완결성을 위한 뷰 통제와 견고한 네트워크 레이어 설계를 지향합니다.
</p>

<p align="center">
  <a href="https://muroom.kr">
    <img src="https://img.shields.io/badge/라이브_데모-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Live Demo" />
  </a>
  <a href="https://github.com/muroom-studio/muroom-frontend-handel">
    <img src="https://img.shields.io/badge/GitHub_저장소-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub Repo" />
  </a>
</p>

---

### ℹ️ Project Info

| 📅 진행 기간 | 🛠 핵심 기술 |
| :--- | :--- |
| **2024.11 - 현재** | `Next.js 15`, `React 19`, `TypeScript`, `Turborepo`, `TanStack Query`, `nuqs`, `Zustand`, `Tailwind CSS`, `Naver Maps API` |

---

## 1. 🏗️ 프로젝트 아키텍처 (Core Architecture)

> **"1인 개발의 효율을 극대화하는 지속 가능한 시스템 설계"**
> 코드 중복을 최소화하고, 런타임 성능과 데이터 정합성을 보장하는 견고한 아키텍처를 구축하는 데 집중했습니다.

### 🛠 Tech Stack Overview
| 분류 | 기술 스택 | 핵심 역할 |
| :--- | :--- | :--- |
| **Monorepo** | `Turborepo`, `pnpm` | 멀티 앱 운영 및 공통 패키지(`ui`, `util`) 격리 관리 |
| **Framework** | `Next.js 15 (App Router)` | 서버 컴포넌트(RSC) 중심의 번들 최적화 및 Vercel 배포 |
| **State** | `nuqs`, `Zustand` | URL 기반 단방향 데이터 흐름(SSOT) 및 전역 상태 관리 |
| **Network** | **`customFetch`**, `TQ` | **표준 API 기반 통신 계층 내재화** 및 선언적 데이터 호출 |
| **Responsive** | `Custom Hook` | 브레이크포인트 기반의 모바일/웹 뷰 시스템 통제 |

---

### 🔍 Architecture Deep-Dive

#### **[구조] 효율적인 멀티 앱 환경 구축**
* **Internal Packages 전략**: `Musician`과 `Manager` 앱을 분리하되, `packages/ui`와 `packages/util`을 통해 핵심 로직과 UI를 공유합니다. 수정 사항이 모든 앱에 즉각 반영되어 **관리 비용을 최소화**했습니다.

#### **[보안] Edge 단계에서의 요청 가로채기 (Middleware)**
* **Middleware Guard**: 서버 로직이 실행되기 전인 **Edge 단계(요청의 최전방)**에서 `JSESSIONID`를 검증합니다. 인가되지 않은 접근을 페이지 렌더링 전에 차단하여 보안 성능과 서버 자원 효율을 동시에 확보했습니다.

#### **[통신] 독자적인 네트워크 추상화 계층**
* **customFetch 설계**: 외부 라이브러리(Axios 등) 의존성을 낮추기 위해 Native Fetch를 래핑한 전용 레이어를 구축했습니다. **AbortSignal 기반 타임아웃**, 환경별 엔드포인트 자동 분기, **Generic 기반의 응답 타입 추론**을 표준화하여 시스템의 예측 가능성을 높였습니다.
* **Data Integration**: `TanStack Query`를 결합해 URL 변화가 즉각적인 데이터 호출로 이어지는 파이프라인을 구축했습니다.

#### **[반응형] 하이드레이션을 고려한 절대적 뷰 통제**
* **useResponsiveLayout**: 1080px 브레이크포인트를 기준으로 모바일과 웹 레이아웃을 엄격히 분리합니다. 
* **Hydration Issue 해결**: `isMounted` 상태를 추적하여 클라이언트와 서버 간의 미스매치를 방지하고, 런타임 시 디바이스 환경에 맞는 정확한 UI를 렌더링하도록 강제합니다.

---

### 📊 프론트엔드 시스템 구조도 (Library & Request Lifecycle)

![Next.js Entry & Security-2026-02-18-110212.png](https://res.cloudinary.com/dpzexzf44/image/upload/v1771412581/blog/sk8v7zdiqtxtg6lcfjem.png)

> Middleware 보안 계층부터 nuqs 기반의 단방향 데이터 흐름까지 아우르는 muroom 프론트엔드 시스템 아키텍처


---
## 2. 📱 주요 기능 및 서비스 (Key Features)

> **"사용자 경험의 완결성을 위한 뷰 통제와 커뮤니티 아키텍처"**

### 🗺️ 공간 탐색 및 절대적 뷰 통제 (Map & View Control)
* **커스텀 지도 엔진**: 네이버 지도 SDK를 리액트 환경에 최적화하여 구현했습니다. 현재 위치 기반의 실시간 데이터 동기화를 통해 연습실 정보를 시각화합니다.
* **useResponsiveLayout 기반의 뷰 통제**: 1080px 브레이크포인트를 기준으로 **모바일과 웹 레이아웃을 엄격히 분리**합니다. 하이드레이션 이슈를 방지하기 위해 `isMounted` 상태를 추적하며, 디바이스별로 최적화된 UI를 렌더링하도록 시스템적으로 통제합니다.

### 💬 커뮤니티 및 계층형 데이터 구조 (Community)
* **나의 작업실 자랑하기**: 뮤지션들이 본인의 작업 공간을 공유하는 이미지 중심의 커뮤니티입니다.
* **무한 계층형 댓글 시스템**: 댓글-대댓글-답글로 이어지는 다중 중첩 구조를 구현했습니다. 
  * **재귀적 컴포넌트 설계**: 데이터의 깊이에 상관없이 선언적으로 렌더링을 수행하도록 설계했습니다.
  * **인터페이스 최적화**: 복잡한 계층 구조에서도 모바일과 웹 각각의 환경에 맞는 가독성을 유지하는 데 집중했습니다.

---

### 🎥 기능 시연 (Feature Showcase)

| Desktop View (Web) | Mobile View (App) |
| :---: | :---: |
| [화면 기록 영상](https://res.cloudinary.com/dpzexzf44/video/upload/v1771429249/%E1%84%92%E1%85%AA%E1%84%86%E1%85%A7%E1%86%AB_%E1%84%80%E1%85%B5%E1%84%85%E1%85%A9%E1%86%A8_2026-02-19_%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB_12.37.47_w5crv3.mp4) |[화면 기록 영상](https://res.cloudinary.com/dpzexzf44/video/upload/v1771429574/%E1%84%92%E1%85%AA%E1%84%86%E1%85%A7%E1%86%AB_%E1%84%80%E1%85%B5%E1%84%85%E1%85%A9%E1%86%A8_2026-02-19_%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB_12.44.12_ilbzle.mp4) |

> 지도 탐색부터 복합 필터링, 커뮤니티 인터랙션까지 이어지는 핵심 서비스 플로우

---

## 3. 🛠️ 주요 해결 과제 (Technical Challenges)

개발 과정에서 마주한 기술적 고민들과 이를 해결하기 위해 시도한 접근 방식입니다. 상세 내용은 개별 회고록에 정리되어 있습니다.

#### **1. 지도 SDK의 선언적 추상화**
* **고민**: 리액트 생명주기와 어긋나는 지도 SDK의 명령형 호출 방식 및 자원 관리의 어려움
* **해결**: SDK 제어 로직을 별도 엔진으로 분리하고, 리액트 컴포넌트 환경에서 다루기 쉬운 선언적 인터페이스로 추상화
* 🔗 **[[ 🗺️ 네이버 지도 API와 리액트, 명령형 SDK를 선언적으로 길들이기]](https://www.const-tommy.dev/blog/fbca7186-4004-4d0f-9a72-f35334f93757)**

#### **2. 다중 필터 업데이트 성능 최적화**
* **고민**: 20여 개의 상태값이 동시에 변경될 때 발생하는 브라우저 렌더링 지연 및 화면 끊김 현상
* **해결**: 상태 업데이트 타이밍을 조절하고 불필요한 리렌더링 요인을 제거하여 유저가 느끼는 체감 성능을 개선
* 🔗 **[[ 📁 URL은 데이터베이스다: nuqs와 TanStack Query로 구현한 극한의 필터 시스템]](https://www.const-tommy.dev/blog/0bf25c8d-6be8-41c2-b16c-4ba2c03a4cfa)**

#### **3. 라우팅 기반의 모달 구조 설계**
* **고민**: 새로고침이나 브라우저 뒤로 가기 시 유저의 탐색 맥락(Context)이 유지되지 않고 끊기는 문제
* **해결**: 모달의 상태를 URL 라우트와 동기화하여, 어떤 진입 경로에서도 일관된 사용자 경험을 제공하도록 설계
* 🔗 **[[🛰️ 상태(State)를 넘어 주소(URL)로 관리하는 모달: Next.js 가로채기 라우트 전략]](https://www.const-tommy.dev/blog/53dee0e6-a359-4efb-9d44-7f5b5c900a5b)**

#### **4. 전용 네트워크 레이어(customFetch) 구축**
* **고민**: 외부 라이브러리 의존성을 줄이면서 타임아웃, 에러 로깅 등 통신 전반에 대한 직접적인 제어권 확보 필요성
* **해결**: Native Fetch를 래핑한 전용 함수를 통해 프로젝트 규격을 표준화하고, 제네릭을 활용한 타입 안정성 확보
* 🔗 **[[🏗️ Axios 없이 구축한 Next.js 전용 네트워크 레이어: customFetch 설계기]](https://www.const-tommy.dev/blog/a02cb4f9-d267-40d9-8229-6d37de06fa95)**

---

## 4. 📊 서비스 안정성 및 품질 관리 (Service Stability)

> **"예외 상황을 통제하고 시스템의 예측 가능성을 높이는 데 집중했습니다."**

### 🛡️ 에러 모니터링 및 복구 (Monitoring & Recovery)
* **데이터 기반의 에러 트래킹**: 공통 `error.tsx`와 GA4를 연동하여 예외 발생 시 상세 로그(description, digest 등)를 데이터화합니다. 장애 발생 빈도를 실시간으로 모니터링하며, 배포 후 안정성을 객관적 지표로 관리합니다.
* **사용자 친화적 복구 UI**: 404/500 에러 상황에서 `useResponsiveLayout`을 통해 디바이스별로 최적화된 복구 경로를 제공하여 서비스 이탈을 최소화했습니다.

### ⚡ 네트워크 무결성 및 자원 관리 (Resiliency & Efficiency)
* **타입 안정성 확보 (Generic)**: `customFetch`에 제네릭을 적용하여 API 응답 규격을 컴파일 단계에서 검증합니다. 런타임 데이터 구조 불일치 에러를 차단하여 시스템의 견고함을 확보했습니다.
* **2,000ms 타임아웃 제어**: `AbortSignal.timeout`을 적용하여 2초 이상의 지연 요청을 강제 종료합니다. 불필요한 네트워크 대기를 방지하여 시스템의 반응성을 일정하게 유지합니다.
* **메모리 무결성 검증**: 크롬 힙 스냅샷(Heap Snapshot) 분석을 통해 페이지 전환 간 메모리 누수 지점을 제거했습니다. 반복적인 라우팅 상황에서도 메모리 점유율을 일정하게 유지하며 저사양 기기에서의 안정성을 높였습니다.

**[Stability Proof]**
<details>
  <summary>📉 <b>Network Resiliency</b>: 2.0s 타임아웃 강제 종료를 통한 무한 로딩 방지 (Network Waterfall 기반)</summary>
  <div style="display: flex; justify-content: space-between; gap: 10px; margin-top: 10px;">
    <div style="width: 49%;">
      <img src="https://res.cloudinary.com/dpzexzf44/image/upload/v1771417407/blog/yve3edzn0lreko2zcsp1.png" alt="Network Canceled Status" style="width: 100%; height: auto; border-radius: 8px; border: 1px solid #eee;">
      <p align="center" style="font-size: 12px; color: #666;">[Network 탭] 2.0s 지점 Abort에 의한 canceled 상태 확인</p>
    </div>
    <div style="width: 49%;">
      <img src="https://res.cloudinary.com/dpzexzf44/image/upload/v1771417420/blog/cx0h48by3xttwdwp8g7m.png" alt="Console Timeout Logs" style="width: 100%; height: auto; border-radius: 8px; border: 1px solid #eee;">
      <p align="center" style="font-size: 12px; color: #666;">[Console 탭] 커스텀 에러 핸들러에 의한 Timeout 로그 수집</p>
    </div>
  </div>
</details>

<details>
  <summary>🧠 <b>Memory Integrity</b>: 페이지 이동 10회 반복 시 메모리 점유 편차 최소화 관리 (Heap Snapshot 분석)</summary>
  <div style="margin-top: 10px;">
    <img src="https://res.cloudinary.com/dpzexzf44/image/upload/v1771430987/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2026-02-19_%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB_1.09.36_bw3yls.png" alt="Heap Snapshot Comparison" style="width: 100%; height: auto; border-radius: 8px; border: 1px solid #eee;">
    <p align="center" style="font-size: 12px; color: #666;">[Heap Snapshot] Comparison 모드 분석 결과: 라우팅 반복 후에도 Delta 값이 안정적으로 유지되며 자원 해제가 정상 작동함을 확인</p>
  </div>
</details>

---

## 5. 📈 엔지니어링 가치 및 회고 (Engineering Value)

기술적 화려함보다는 **서비스의 지속 가능성**과 **예측 가능한 코드**를 작성하는 데 집중했습니다.

#### **✅ 제어권 내재화를 통한 시스템 안정성**
* 기성 라이브러리에 의존하기보다 `customFetch`를 직접 구현하여 시스템 통제권을 확보했습니다. 
* 네트워크 불확실성을 코드로 제어하고, 에러를 분석 가능한 데이터로 전환하여 **운영 가시성**을 확보한 것이 가장 큰 수확입니다.

#### **✅ 본질적인 UX 가치에 집중**
* "지도 조작의 매끄러움", "공유 링크의 일관성" 등 유저가 체감하는 실질적 가치를 최우선했습니다. 
* `nuqs`와 `useResponsiveLayout`을 활용해 어떤 환경에서도 유저의 **탐색 맥락이 끊기지 않는 설계**를 지향했습니다.

#### **✅ 협업과 확장을 고려한 구조**
* 1인 개발임에도 모노레포 아키텍처와 표준화된 환경 설정을 도입했습니다. 
* 이는 단순한 효율을 넘어, 언제든 팀 단위로 전환하거나 서비스를 확장할 수 있는 **견고한 기반**을 마련하는 과정이었습니다.

#### **🚀 향후 과제 (Roadmap)**
* **성능 고도화**: 대량 마커 렌더링 부하를 줄이기 위한 '마커 클러스터링' 도입
* **최적화**: 서버 사이드 렌더링(SSR) 성능 개선을 통한 초기 로딩 속도 단축
