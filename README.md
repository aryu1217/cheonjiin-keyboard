# react-cji-keyboard

React에서 사용할 수 있는 천지인 기반 모바일 키보드 라이브러리입니다.

한글 천지인 입력, 영문, 숫자, 기호 키보드를 제공하고, 비어 있는 키 위치와 주요 스타일 토큰을 사용하는 쪽에서 설정할 수 있습니다.

<p>
  <img width="413" height="219" alt="천지인 키보드 한글 화면"
    src="https://github.com/user-attachments/assets/0231541c-2411-4300-b808-7713dbdd089c" />
</p>

<p>
  <img width="402" height="207" alt="천지인 키보드 영문 화면"
    src="https://github.com/user-attachments/assets/42c1af70-4277-4243-ae80-aee095e590ee" />
</p>

<p>
  <img width="407" height="207" alt="천지인 키보드 숫자 화면"
    src="https://github.com/user-attachments/assets/403f90e3-4f7d-47c5-adf4-8b7bc227d64a" />
</p>

## 설치

```bash
npm install react-cji-keyboard
```

```bash
yarn add react-cji-keyboard
```

## 기본 사용법

```tsx
import { useState } from "react";
import CheonjiinKeyboard from "react-cji-keyboard";
import "react-cji-keyboard/style.css";

export default function App() {
  const [value, setValue] = useState("");

  return (
    <div style={{ maxWidth: 420, margin: "0 auto", padding: 16 }}>
      <textarea
        value={value}
        readOnly
        rows={4}
        placeholder="천지인 키보드로 입력해보세요"
        style={{
          width: "100%",
          boxSizing: "border-box",
          marginBottom: 12,
          padding: 10,
          border: "1px solid #ddd",
          borderRadius: 8,
          resize: "none",
        }}
      />

      <CheonjiinKeyboard onChange={setValue} />
    </div>
  );
}
```

`CheonjiinKeyboard`는 입력 상태를 내부에서 관리합니다. 키 입력이 바뀔 때마다 `onChange`로 전체 문자열을 전달하므로, 사용하는 쪽에서는 이 값을 input, textarea, 바텀시트 등에 연결하면 됩니다.

## API

```ts
type CheonjiinKeyboardProps = {
  onChange?: (value: string) => void;
  customKeys?: CheonjiinKeyboardCustomKeys;
  customStyle?: CheonjiinKeyboardCustomStyle;
  className?: string;
  style?: React.CSSProperties;
};
```

| prop | 타입 | 설명 |
| --- | --- | --- |
| `onChange` | `(value: string) => void` | 키보드 입력값이 바뀔 때마다 전체 문자열을 전달합니다. |
| `customKeys` | `CheonjiinKeyboardCustomKeys` | 기본 레이아웃의 빈칸에 커스텀 키를 추가합니다. |
| `customStyle` | `CheonjiinKeyboardCustomStyle` | 키보드 배경/테두리, 버튼 배경/테두리, 글자색, 글자 크기, 간격 등을 변경합니다. |
| `className` | `string` | 키보드 루트 요소에 추가할 클래스입니다. |
| `style` | `React.CSSProperties` | 키보드 루트 요소에 직접 적용할 인라인 스타일입니다. |

## 커스텀 키 추가

기본 키보드 배치는 유지하고, 정해진 빈칸에 자주 쓰는 문자를 추가할 수 있습니다.

```tsx
<CheonjiinKeyboard
  onChange={setValue}
  customKeys={{
    common: {
      row1col1: { value: "@" },
    },
    hangul: {
      row3col5: { value: "ㅋ" },
    },
    english: {
      row2col5: { value: ".com" },
      row4col2: { value: "." },
      row4col3: { value: "," },
    },
    number: {
      row2col5: { value: "-" },
      row3col5: { value: "%" },
    },
  }}
/>
```

`customKeys`는 `mode -> position -> keyConfig` 구조입니다. 버튼 DOM과 클릭 처리는 라이브러리가 만들고, 사용자는 어떤 위치에 어떤 값이 입력될지만 설정합니다.

### customKeys 위치

| mode | position | 위치 |
| --- | --- | --- |
| `common` | `row1col1` | 모든 모드의 1행 1열 |
| `hangul` | `row3col5` | 한글 모드 3행 5열 |
| `english` | `row2col5` | 영어 모드 2행 5열 |
| `english` | `row4col2` | 영어 모드 4행 2열 |
| `english` | `row4col3` | 영어 모드 4행 3열 |
| `number` | `row2col5` | 숫자 모드 2행 5열 |
| `number` | `row3col5` | 숫자 모드 3행 5열 |

`symbol` 모드는 별도 빈칸이 없습니다. 다만 `common.row1col1`에 넣은 키는 기호 모드를 포함한 모든 모드의 1행 1열에 표시됩니다.

### customKeys 값

```ts
type CheonjiinKeyboardCustomKey = {
  value: string;
  label?: React.ReactNode;
  ariaLabel?: string;
  className?: string;
};
```

| 속성 | 타입 | 설명 |
| --- | --- | --- |
| `value` | `string` | 키를 눌렀을 때 입력될 값입니다. 필수입니다. |
| `label` | `React.ReactNode` | 키에 표시할 내용입니다. 생략하면 `value`가 표시됩니다. |
| `ariaLabel` | `string` | 접근성 라벨입니다. |
| `className` | `string` | 해당 커스텀 키에 추가할 클래스입니다. |

지원하지 않는 mode나 position을 넘기면 개발 환경 콘솔에 경고를 출력하고 해당 키는 무시합니다.

## 스타일 커스터마이징

`customStyle`은 키보드 전체와 버튼 공통 스타일만 다룹니다.
한글/영어/숫자/기호처럼 모드별로 색상을 따로 나누거나, Enter/Space 같은 특정 키만 위한 스타일 prop은 제공하지 않습니다.

커스터마이징 범위는 아래 정도로 제한합니다.

| 범위 | 바꿀 수 있는 것 |
| --- | --- |
| 키보드 레이아웃 | 배경, padding, margin, border, border-radius |
| 키 간격 | 버튼 사이 gap |
| 버튼 | 배경, 글자색, border, border-radius, 높이 |
| 텍스트 | 글자 크기 |
| 인터랙션 | 누르는 동안의 버튼 배경 |

```tsx
<CheonjiinKeyboard
  onChange={setValue}
  customStyle={{
    "keyboard-bg": "#111827",
    "keyboard-border": "1px solid #374151",
    "keyboard-radius": "12px",
    "keyboard-margin": "16px 0 0",
    "keyboard-padding": "10px",
    "grid-gap": "6px",
    "key-bg": "#1f2937",
    "key-color": "#f9fafb",
    "key-border": "1px solid #4b5563",
    "key-height": "48px",
    "key-radius": "10px",
    "key-font-size": "15px",
  }}
/>
```

`customStyle`의 키는 내부에서 CSS 변수로 변환됩니다.

```txt
"keyboard-bg" -> --cheon-keyboard-bg
"key-border"  -> --cheon-key-border
```

### customStyle 속성

| 속성 | 대상 | 설명 |
| --- | --- | --- |
| `keyboard-bg` | 키보드 | 키보드 전체 배경 |
| `keyboard-padding` | 키보드 | 키보드 내부 여백 |
| `keyboard-margin` | 키보드 | 키보드 외부 여백 |
| `keyboard-border` | 키보드 | 키보드 전체 테두리 |
| `keyboard-radius` | 키보드 | 키보드 전체 모서리 둥글기 |
| `grid-gap` | 레이아웃 | 버튼 사이 간격 |
| `key-bg` | 버튼 | 버튼 배경 |
| `key-color` | 버튼 | 버튼 글자색 |
| `key-border` | 버튼 | 버튼 테두리 |
| `key-radius` | 버튼 | 버튼 모서리 둥글기 |
| `key-height` | 버튼 | 버튼 높이 |
| `key-font-size` | 버튼 | 버튼 글자 크기 |
| `key-active-bg` | 버튼 | 버튼을 누르는 동안의 배경 |

더 세밀하게 제어해야 한다면 `className`을 넘겨 루트 클래스를 추가하고 CSS에서 직접 덮어쓸 수 있습니다.

```tsx
<CheonjiinKeyboard className="my-keyboard" onChange={setValue} />
```

```css
.my-keyboard .cheon-key--enter {
  font-weight: 700;
}
```

## 입력창과 함께 사용하기

키보드는 입력 로직과 키보드 UI만 제공합니다. 실제 입력창 포커스, 바텀시트 노출 여부, 커서 UI 등은 사용하는 애플리케이션에서 제어하는 것을 권장합니다.

```tsx
function BottomSheetKeyboard({ open, value, onChange }) {
  return (
    <div
      className={open ? "keyboard-sheet open" : "keyboard-sheet"}
      aria-hidden={!open}
    >
      <textarea value={value} readOnly rows={3} />
      <CheonjiinKeyboard onChange={onChange} />
    </div>
  );
}
```

## 개발

```bash
npm run dev
npm run lint
npm run build
npm run test:ci
```

## 라이선스

MIT
