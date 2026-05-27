const KEYBOARD_MODES = ["common", "hangul", "english", "number"];

// 사용자가 커스텀할 수 있는 물리적 빈칸 위치입니다. index.d.ts의 타입과 같이 관리해야 합니다.
const SUPPORTED_POSITIONS = {
  common: ["row1col1"],
  hangul: ["row3col5"],
  english: ["row2col5", "row4col2", "row4col3"],
  number: ["row2col5", "row3col5"],
};

function createEmptySlots() {
  return {
    common: {},
    hangul: {},
    english: {},
    number: {},
  };
}

// JS 사용자나 동적 props처럼 TypeScript를 우회한 입력을 런타임에서 방어합니다.
function warn(message) {
  if (typeof console !== "undefined") {
    console.warn(`[react-cji-keyboard] ${message}`);
  }
}

function getAvailablePositions(mode) {
  const positions = SUPPORTED_POSITIONS[mode];
  return positions.length > 0 ? positions.join(", ") : "(none)";
}

function isSupportedPosition(mode, position) {
  if (!SUPPORTED_POSITIONS[mode]) {
    warn(
      `Unknown slot mode "${mode}". Available modes: ${KEYBOARD_MODES.join(
        ", "
      )}.`
    );
    return false;
  }

  if (!SUPPORTED_POSITIONS[mode].includes(position)) {
    warn(
      `${mode} mode does not have position "${position}". Available positions: ${getAvailablePositions(
        mode
      )}.`
    );
    return false;
  }

  return true;
}

function isObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function toSlotConfig(keyConfig) {
  if (!isObject(keyConfig)) {
    warn("customKeys value must be an object.");
    return null;
  }

  if (typeof keyConfig.value !== "string") {
    warn("customKeys item requires a string value.");
    return null;
  }

  return {
    value: keyConfig.value,
    label: keyConfig.label ?? keyConfig.value,
    ariaLabel: keyConfig.ariaLabel,
    className: keyConfig.className,
  };
}

// customKeys 설정 객체를 키보드 렌더링에서 바로 쓰는 슬롯 객체로 변환합니다.
export function createKeyboardSlots(customKeys) {
  const slots = createEmptySlots();

  if (!customKeys) return slots;

  if (!isObject(customKeys)) {
    warn("customKeys must be an object.");
    return slots;
  }

  Object.entries(customKeys).forEach(([mode, modeConfig]) => {
    if (!SUPPORTED_POSITIONS[mode]) {
      warn(
        `Unknown customKeys mode "${mode}". Available modes: ${KEYBOARD_MODES.join(
          ", "
        )}.`
      );
      return;
    }

    if (!isObject(modeConfig)) {
      warn(`customKeys.${mode} must be an object.`);
      return;
    }

    Object.entries(modeConfig).forEach(([position, keyConfig]) => {
      if (!isSupportedPosition(mode, position)) return;

      const slotConfig = toSlotConfig(keyConfig);
      if (!slotConfig) return;

      slots[mode][position] = slotConfig;
    });
  });

  return slots;
}

// 공통 슬롯(common)을 먼저 깔고, 현재 모드 전용 슬롯이 있으면 덮어씁니다.
export function getSlotsForMode(slots, mode) {
  return {
    ...slots.common,
    ...(slots[mode] ?? {}),
  };
}
