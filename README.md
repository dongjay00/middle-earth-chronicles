# 중간계 연대기

반지의 제왕의 전설적인 세계를 탐험하세요. 이 웹 애플리케이션은 사랑받는 프랜차이즈의 영화, 캐릭터, 인용문, 책에 대한 포괄적인 데이터베이스를 제공합니다.

## 주요 기능

- **영화 탐색:** 영화를 탐색하고 상영 시간, 예산, 박스 오피스 수익 및 Rotten Tomatoes 점수와 같은 세부 정보를 볼 수 있습니다.
- **캐릭터 발견:** 영웅, 악당 및 그 사이의 모든 사람을 알 수 있습니다.
- **기억에 남는 인용문:** 영화에서 유명한 인용문 모음을 읽을 수 있습니다.
- **책 정보:** 시리즈의 책에 대한 세부 정보를 찾을 수 있습니다.
- **모던 UI:** Tailwind CSS 및 Framer Motion으로 구축된 부드러운 애니메이션이 포함된 세련되고 현대적인 인터페이스를 제공합니다.

## 사용된 기술

- [Next.js](https://nextjs.org/) - 리액트 프레임워크
- [React](https://reactjs.org/) - 사용자 인터페이스 구축을 위한 자바스크립트 라이브러리
- [TypeScript](https://www.typescriptlang.org/) - 타입스크립트
- [TanStack Query](https://tanstack.com/query/latest) - 강력한 비동기 상태 관리 라이브러리
- [Axios](https://axios-http.com/) - 프로미스 기반 HTTP 클라이언트
- [Tailwind CSS](https://tailwindcss.com/) - 유틸리티 우선 CSS 프레임워크
- [Framer Motion](https://www.framer.com/motion/) - 리액트를 위한 프로덕션 준비가 된 모션 라이브러리
- [Zustand](https://zustand-demo.pmnd.rs/) - 리액트를 위한 작고 빠르고 확장 가능한 상태 관리 라이브러리

## 시작하기

### 요구 사항

- Node.js (v20 이상)
- npm, yarn 또는 pnpm

### 설치

1.  저장소 복제:
    ```bash
    git clone https://github.com/your-username/middle-earth-chronicles.git
    cd middle-earth-chronicles
    ```

2.  의존성 설치:
    ```bash
    npm install
    ```

3.  환경 변수 설정. 프로젝트 루트에 `.env.local` 파일을 만들고 다음 변수를 추가합니다:

    ```
    NEXT_PUBLIC_API_BASE_URL=<your_api_base_url>
    NEXT_PUBLIC_API_KEY=<your_api_key>
    ```

    이 프로젝트는 데이터를 가져오기 위해 [The One API](https://the-one-api.dev/)를 사용합니다.

4.  개발 서버 실행:
    ```bash
    npm run dev
    ```

    브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 결과를 확인하세요.

## 사용 가능한 스크립트

- `dev`: 개발 모드에서 앱을 실행합니다.
- `build`: 프로덕션을 위해 앱을 빌드합니다.
- `start`: 프로덕션 서버를 시작합니다.
- `lint`: 린터를 실행합니다.
