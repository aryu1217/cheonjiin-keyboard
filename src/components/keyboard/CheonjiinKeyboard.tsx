import type { CSSProperties, ReactNode } from "react";
import "./CheonjiinKeyboard.css";
import KeyboardInputProvider from "./input/KeyboardInputProvider";
import KeyboardSlotProvider from "./slots/KeyboardSlotProvider";
import { KeyboardView } from "./view/KeyboardView";

type CustomKeyConfig = {
  value: string;
  label?: ReactNode;
  ariaLabel?: string;
  className?: string;
};

type CustomKeys = {
  common?: {
    row1col1?: CustomKeyConfig;
  };
  hangul?: {
    row3col5?: CustomKeyConfig;
  };
  english?: {
    row2col5?: CustomKeyConfig;
    row4col2?: CustomKeyConfig;
    row4col3?: CustomKeyConfig;
  };
  number?: {
    row2col5?: CustomKeyConfig;
    row3col5?: CustomKeyConfig;
  };
};

type CustomStyleValue = string | number;

type CustomStyle = Partial<
  Record<
    | "keyboard-bg"
    | "keyboard-padding"
    | "keyboard-margin-top"
    | "grid-gap"
    | "key-bg"
    | "key-color"
    | "key-border-color"
    | "key-radius"
    | "key-height"
    | "key-font-size"
    | "key-active-bg"
    | "function-bg"
    | "function-color"
    | "enter-bg"
    | "enter-color"
    | "space-bg"
    | "space-color"
    | "empty-bg"
    | "empty-border-color"
    | "shift-on-bg"
    | "hangul-bg"
    | "hangul-color"
    | "hangul-border-color"
    | "english-bg"
    | "english-color"
    | "english-border-color"
    | "number-bg"
    | "number-color"
    | "number-border-color"
    | "symbol-bg"
    | "symbol-color"
    | "symbol-border-color",
    CustomStyleValue
  >
>;

type CheonjiinKeyboardProps = {
  onChange?: (value: string) => void;
  customKeys?: CustomKeys;
  customStyle?: CustomStyle;
  className?: string;
  style?: CSSProperties;
};

type KeyboardRootStyle = CSSProperties &
  Record<`--cheon-${string}`, CustomStyleValue | undefined>;

// 라이브러리 전용 스타일 토큰을 CSS 변수로 변환합니다.
// 예: { "keyboard-bg": "#111" } -> { "--cheon-keyboard-bg": "#111" }
function toCssVariableStyle(customStyle?: CustomStyle): KeyboardRootStyle {
  if (!customStyle) return {};

  return Object.entries(customStyle).reduce<KeyboardRootStyle>(
    (cssVariables, [name, value]) => {
      if (value === undefined) return cssVariables;

      cssVariables[`--cheon-${name}`] = value;
      return cssVariables;
    },
    {},
  );
}

// 라이브러리 사용자가 가져다 쓰는 최상위 컴포넌트입니다.
// 입력 상태, 슬롯 설정, 화면 모드 레이어를 조립합니다.
function CheonjiinKeyboard({
  onChange,
  customKeys,
  customStyle,
  className,
  style,
}: CheonjiinKeyboardProps) {
  const rootClassName = ["cheon-keyboard", className].filter(Boolean).join(" ");
  const rootStyle = {
    ...toCssVariableStyle(customStyle),
    ...style,
  };

  return (
    <div className={rootClassName} style={rootStyle}>
      <KeyboardInputProvider onChange={onChange}>
        <KeyboardSlotProvider customKeys={customKeys}>
          <KeyboardView />
        </KeyboardSlotProvider>
      </KeyboardInputProvider>
    </div>
  );
}

export default CheonjiinKeyboard;
