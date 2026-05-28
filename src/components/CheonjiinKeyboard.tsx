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

type CustomStyleToken =
  | "keyboard-bg"
  | "keyboard-padding"
  | "keyboard-margin"
  | "keyboard-border"
  | "keyboard-radius"
  | "grid-gap"
  | "key-bg"
  | "key-color"
  | "key-border"
  | "key-radius"
  | "key-height"
  | "key-font-size"
  | "key-active-bg";

type CustomStyle = Partial<Record<CustomStyleToken, CustomStyleValue>>;

type CheonjiinKeyboardProps = {
  onChange?: (value: string) => void;
  customKeys?: CustomKeys;
  customStyle?: CustomStyle;
  className?: string;
  style?: CSSProperties;
};

type KeyboardRootStyle = CSSProperties &
  Record<`--cheon-${string}`, string | undefined>;

const PX_TOKENS = new Set<CustomStyleToken>([
  "keyboard-padding",
  "keyboard-margin",
  "keyboard-radius",
  "grid-gap",
  "key-radius",
  "key-height",
  "key-font-size",
]);

function normalizeCustomStyleValue(
  name: CustomStyleToken,
  value: CustomStyleValue,
) {
  if (typeof value === "number" && PX_TOKENS.has(name)) {
    return `${value}px`;
  }

  return String(value);
}

// 라이브러리 전용 스타일 토큰을 CSS 변수로 변환합니다.
// 예: { "keyboard-bg": "#111" } -> { "--cheon-keyboard-bg": "#111" }
function toCssVariableStyle(customStyle?: CustomStyle): KeyboardRootStyle {
  if (!customStyle) return {};

  return Object.entries(customStyle).reduce<KeyboardRootStyle>(
    (cssVariables, [name, value]) => {
      if (value === undefined) return cssVariables;

      const tokenName = name as CustomStyleToken;
      cssVariables[`--cheon-${tokenName}`] = normalizeCustomStyleValue(
        tokenName,
        value,
      );
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
