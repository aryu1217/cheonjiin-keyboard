
# react-cji-keyboard

> **React용 천지인 + 영문 + 숫자 + 기호 커스텀 키보드 컴포넌트**

스마트폰 천지인 키보드를 **웹앱, PWA** 같은 환경에서도 쓸 수 있도록 만든 가상 키보드입니다.  
<sub>(공모전 파트너 단체에서 “수중에서 모바일 키보드가 너무 작아 기록이 힘들다”는 피드백을 받고 시작한 프로젝트입니다.)</sub>
- 장갑을 끼거나, 물속/현장 환경처럼 **작은 쿼티 키보드를 누르기 어려운 상황**,  
- 모바일 브라우저에서 **기본 키보드를 숨기고 화면 안에 큰 키보드를 띄우고 싶은 경우**,  
- 특정 입력 칸에서만 **천지인 전용 입력 UX**를 제공하고 싶은 경우

에 기본 키패드 대신 사용할 수 있도록 설계되었습니다.


<table>
  <tr>
    <td>
      <img
        width="260"
        alt="천지인 키보드 - 한글 모드"
        src="https://github.com/user-attachments/assets/b5176711-f6b6-4ef3-9a2b-093e0c27ec08"
      />
    </td>
    <td>
      <img
        width="260"
        alt="천지인 키보드 - 영문 모드"
        src="https://github.com/user-attachments/assets/e74dd263-632a-4515-93d5-3dfa4b10a0e3"
      />
    </td>
  </tr>
  <tr>
    <td>
      <img
        width="260"
        alt="천지인 키보드 - 숫자/기호 모드1"
        src="https://github.com/user-attachments/assets/acfb0633-b05e-4c90-9b7a-f14b41034d94"
      />
    </td>
    <td>
      <img
        width="260"
        alt="천지인 키보드 - 숫자/기호 모드2"
        src="https://github.com/user-attachments/assets/8564312b-f880-486f-9dc7-15390e78f7b2"
      />
    </td>
  </tr>
</table>


---

## 설치

```bash
npm install react-cji-keyboard
# 또는
yarn add react-cji-keyboard
```

---

## 기본 사용법

이 라이브러리는 **입력 상태를 내부에서 관리하면서** `onChange(text: string)` 콜백으로 완성된 문자열을 돌려줍니다.  
TypeScript 프로젝트에서는 `index.d.ts`를 통해 자동으로 타입이 인식되고, JS/JSX 환경에서도 동일한 코드로 사용할 수 있습니다.

```tsx
import { useState } from "react";
import CheonjiinKeyboard from "react-cji-keyboard";
import "react-cji-keyboard/style.css"; // ★ 기본 CSS

function App() {
  const [value, setValue] = useState("");

  return (
    <div style={{ maxWidth: 420, margin: "0 auto", padding: 16 }}>
      <h1>천지인 키보드 데모</h1>

      {/* 실제 입력을 보여줄 필드 (readOnly로 두고 onChange로만 갱신) */}
      <textarea
        value={value}
        readOnly
        rows={3}
        style={{
          width: "100%",
          borderRadius: 8,
          border: "1px solid #ddd",
          padding: "8px 10px",
          marginBottom: 12,
          whiteSpace: "pre-wrap",
        }}
        placeholder="천지인 키보드로 입력해보세요"
      />

      {/* 가상 키보드 */}
      <CheonjiinKeyboard onChange={setValue} />
    </div>
  );
}

export default App;
```

> JS/JSX 프로젝트에서도 **동일한 코드**를 사용할 수 있고,  
> TypeScript에서는 `onChange` 인자와 `value`가 자동으로 `string` 타입으로 추론됩니다.

---

## 컴포넌트 API

### `<CheonjiinKeyboard />`

```ts
export interface CheonjiinKeyboardProps {
  /**
   * (선택) 외부에서 현재 값을 제어하고 싶을 때 사용합니다.
   * 지정하지 않으면 내부 상태로만 관리됩니다.
   */
  value?: string;

  /**
   * 키보드 입력이 변경될 때마다 호출됩니다.
   * 한글/영문/숫자/기호를 모두 포함한 전체 문자열이 넘어옵니다.
   */
  onChange?: (text: string) => void;

  /**
   * (선택) 최상위 래퍼에 추가할 className
   */
  className?: string;
}

declare const CheonjiinKeyboard: React.FC<CheonjiinKeyboardProps>;

export default CheonjiinKeyboard;
```

### `onChange`

- 키 하나 입력할 때마다 호출됩니다.
- 천지인 조합(예: ㄷ + ㅣ + · + · → "댜")이 완료되면  
  조합된 문자열 전체(`"댜"`)가 포함된 텍스트가 인자로 넘어옵니다.
- 상위 컴포넌트에서는 보통 `useState`와 함께 textarea, input 등에 바인딩해서 사용합니다.

### `value` (선택)

- **완전 제어 컴포넌트**로 사용하고 싶을 때 지정합니다.
- 예를 들어, 상위에서 `value`를 관리하면서 `onChange`에서 다시 세팅하는 패턴:

```tsx
const [text, setText] = useState("");

return (
  <CheonjiinKeyboard
    value={text}
    onChange={setText}
  />
);
```

- `value`를 지정하지 않으면 내부에서만 상태를 관리하는 **반제어(uncontrolled) 모드**로 동작합니다.

### `className` (선택)

- 키보드 최상위 래퍼 요소에 추가 className을 부여할 때 사용합니다.
- 예: 바텀시트 안에서 margin/padding을 제어하거나, 반응형 레이아웃에서 위치를 조정할 때.

```tsx
<CheonjiinKeyboard
  onChange={setText}
  className="mt-4 border-t border-gray-200"
/>
```

---

## 스타일 커스터마이징

기본 스타일은 `style.css` 에 정의된 **CSS 클래스 기반**입니다.  
프로젝트에서 **같은 클래스 이름을 다시 정의하면** 손쉽게 테마를 변경할 수 있습니다.

### 기본 클래스 목록 (일부)

- `.cheon-keyboard` – 키보드 전체 래퍼
- `.cheon-grid` – 5열(또는 4열) 그리드 레이아웃
- `.cheon-grid--english` – 영문 모드에서 4열 그리드
- `.cheon-key` – 기본 키 스타일
- `.cheon-key--func` – 기능 키 (한/영, 123, 기호, 백스페이스 등)
- `.cheon-key--space` – 스페이스 키
- `.cheon-key--enter` – 엔터 키
- `.cheon-key--empty` – 비워두는 자리용 키

### 예시 1) 다크 테마로 바꾸기 (CSS 덮어쓰기)

```css
/* global.css 또는 App 전체에 적용되는 CSS에서 */
.cheon-keyboard {
  background: #020617;
  padding: 12px;
  border-radius: 16px 16px 0 0;
}

/* 모든 키 공통 스타일 */
.cheon-key {
  background: #111827;
  color: #e5e7eb;
  border-radius: 10px;
  border: 1px solid #1f2937;
  font-size: 16px;
}

/* 기능 키(한/영, 123, 기호, 백스페이스 등) 강조 */
.cheon-key--func {
  background: #1f2937;
  color: #f9fafb;
}

/* 스페이스바 크게/연하게 */
.cheon-key--space {
  background: #0f172a;
  color: #e5e7eb;
  font-size: 14px;
}
```

이렇게 하면 라이브러리 기본 스타일 위에 덮어씌워져,  
레이아웃 구조는 그대로 유지하면서 색감/테마만 바꿀 수 있습니다.

### 예시 2) 입력창 + 바텀시트 형태로 사용하기 (Tailwind)
```tsx
import CheonjiinKeyboard from "react-cji-keyboard";
import "react-cji-keyboard/style.css";

function BottomSheetKeyboard({ open, value, onChange }) {
  return (
    <div
      className={`fixed inset-x-0 bottom-0 transition-transform duration-200
      ${open ? "translate-y-0" : "translate-y-full"}`}
    >
      <div className="mx-auto max-w-sm bg-white rounded-t-2xl shadow-xl p-3">
        <textarea
          value={value}
          readOnly
          className="w-full mb-2 p-2 rounded-md border text-sm"
        />
        <CheonjiinKeyboard onChange={onChange} />
      </div>
    </div>
  );
}
```
