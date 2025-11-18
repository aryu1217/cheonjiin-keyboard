# cheonjiin-keyboard

> **React용 천지인 + 영문 + 숫자 + 기호 커스텀 키보드 컴포넌트**

스마트폰 천지인 키보드 느낌을 웹에서도 그대로 쓰고 싶은 사람을 위한  
커스텀 가상 키보드입니다.

- ✅ **천지인 한글 입력 로직** (점 / 가로 / 세로 조합)
- ✅ 한글 자음 멀티키 (ㄱㅋㄲ, ㄷㅌㄸ …) 순환 입력
- ✅ 영문 T9 스타일 키보드 + Shift(↑)로 대/소문자 토글
- ✅ 숫자 키패드, 기호 키패드
- ✅ 한/영/숫자/기호 모드 전환 버튼
- ✅ 스페이스 / 엔터 / 백스페이스 지원
- 🎨 CSS 클래스 기반 → 프로젝트에서 스타일 자유롭게 커스텀 가능

---

## 설치

```bash
npm install cheonjiin-keyboard
# 또는
yarn add cheonjiin-keyboard
```

---

## 기본 사용법

### 1. 컴포넌트 & 기본 스타일 불러오기

```tsx
import { useState } from "react";
import CheonjiinKeyboard from "cheonjiin-keyboard";
import "cheonjiin-keyboard/style.css"; // ★ 기본 CSS

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

> `CheonjiinKeyboard` 내부에서 입력 상태를 관리하고,  
> **`onChange(text: string)`** 로 최종 문자열을 계속 전달합니다.

---

## 컴포넌트 API

### `<CheonjiinKeyboard />`

```ts
type CheonjiinKeyboardProps = {
  /**
   * 키보드 입력이 변경될 때마다 호출됩니다.
   * 한글/영문/숫자/기호를 모두 포함한 전체 문자열이 넘어옵니다.
   */
  onChange?: (text: string) => void;
};
```

#### `onChange`

- 키 하나 입력할 때마다 호출됩니다.
- 천지인 조합(예: ㄷ + ㅣ + · + · → "댜") 이 완료되면  
  조합된 문자열 전체(`"댜"`)가 포함된 텍스트가 인자로 넘어옵니다.
- 일반적으로 상위 컴포넌트에서 `useState`로 관리하면서 textarea, input 등에 바인딩해서 사용합니다.

---

## 모드 / 키 배치 설명

키보드는 내부적으로 여러 모드로 나뉩니다.

### 1. 한글(천지인) 모드

대표적인 버튼들:

- 상단: `123` / `ㅣ` / `·` / `ㅡ` / `⌫`
- 중간 자음 키(한 버튼 여러 번 누르면 순환):
  - `ㄱㅋ` → `ㄱ` → `ㅋ` → `ㄲ`
  - `ㄴㄹ` → `ㄴ` → `ㄹ`
  - `ㄷㅌ` → `ㄷ` → `ㅌ` → `ㄸ`
  - `ㅂㅍ` → `ㅂ` → `ㅍ` → `ㅃ`
  - `ㅅㅎ` → `ㅅ` → `ㅎ` → `ㅆ`
  - `ㅈㅊ` → `ㅈ` → `ㅊ` → `ㅉ`
- 하단:
  - `한` (현재 한글 모드 표시)
  - `.,` / `SPACE` / `?!` / `↵(엔터)`

천지인 모음 조합 예시는 다음과 같이 동작합니다. (일부 예시)

- `·` → ㅏ
- `· ·` → ㅑ
- `· ㅡ` → ㅓ
- `· ㅡ ·` → ㅕ
- `ㅡ ·` → ㅗ
- `· · ㅡ` → ㅛ
- `ㅡ` → ㅜ
- `ㅡ · ·` → ㅠ
- `ㅣ ·` / `· ㅣ` → ㅐ
- `ㅣ · · ㅣ` → ㅒ
- `· · ㅣ` / `ㅣ · ·` → ㅖ
- `ㅡ ㅣ` / `ㅣ ㅡ` → ㅚ
- `· ㅡ ㅣ · ㅣ` → ㅙ
- `ㅡ · · ㅣ ㅣ` → ㅞ

※ 실제 조합 규칙은 구현에 따라 조금씩 달라질 수 있습니다.

### 2. 영문 모드

- 버튼 예시: `ABC`, `DEF`, `GHI`, `JKL`, `MNO`, `PQRS`, `TUV`, `WXYZ`
- 한 버튼을 여러 번 눌러 같은 그룹 안의 알파벳을 순환 입력합니다.
  - 예: `ABC` 버튼 → `a` → `b` → `c` → 다시 `a` …
- Shift(↑) 버튼을 누르면 **대문자 모드로 전환**됩니다.
  - 라벨도 `abc` ↔ `ABC` 로 바뀝니다.

하단 줄에는:

- `한/영` → 다시 천지인 한글 모드로 전환
- `SPACE` → 공백 입력

### 3. 숫자 모드

- `123` 버튼으로 진입
- 0–9 숫자와 자주 쓰는 기호가 배치되어 있습니다.
- `한글` 버튼으로 다시 한글 모드로 돌아갑니다.

### 4. 기호 모드

- `기호` 버튼으로 진입
- 예: `@ # & ( ) [ ] { } " ' ? ! , .` 등 기호들이 배치되어 있습니다.
- `한글` 또는 `123` 버튼으로 원래 모드로 복귀합니다.

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

### 예시 2) 입력창 + 바텀시트 형태로 사용하기

Tailwind 같은 걸 쓴다고 가정했을 때:

```tsx
import CheonjiinKeyboard from "cheonjiin-keyboard";
import "cheonjiin-keyboard/style.css";

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

- 키보드는 **“입력 로직 + 레이아웃”**만 제공하고,
- 실제로 언제/어떻게 등장할지는 위처럼 프로젝트에서 바텀시트/모달로 감싸서 제어하는 패턴이 일반적입니다.

---

## 라이센스

MIT © 2025 Ryu Tae Hyun
