import { Children, isValidElement } from "react";
import KeyboardSlot from "./KeyboardSlot";
import KeyboardSlotKey from "./KeyboardSlotKey";

const KEYBOARD_MODES = ["hangul", "english", "number", "symbol"];

const SUPPORTED_SLOT_NAMES = {
  all: ["controlTop"],
  hangul: ["controlTop", "mainExtra"],
  english: ["controlTop", "topRight", "bottomLeft", "bottomMiddle"],
  number: ["controlTop", "rightTop", "rightMiddle"],
  symbol: ["controlTop"],
};

function createEmptySlots() {
  return {
    all: {},
    hangul: {},
    english: {},
    number: {},
    symbol: {},
  };
}

function warn(message) {
  if (typeof console !== "undefined") {
    console.warn(`[react-cji-keyboard] ${message}`);
  }
}

function getAvailableSlotNames(mode) {
  return SUPPORTED_SLOT_NAMES[mode].join(", ");
}

function isSupportedSlot(mode, name) {
  if (!SUPPORTED_SLOT_NAMES[mode]) {
    warn(
      `Unknown slot mode "${mode}". Available modes: ${KEYBOARD_MODES.join(
        ", "
      )}.`
    );
    return false;
  }

  if (!SUPPORTED_SLOT_NAMES[mode].includes(name)) {
    warn(
      `${mode} mode does not have slot "${name}". Available slots: ${getAvailableSlotNames(
        mode
      )}.`
    );
    return false;
  }

  return true;
}

function getSlotKeyElement(children) {
  return Children.toArray(children).find(
    (child) => isValidElement(child) && child.type === KeyboardSlotKey
  );
}

function toSlotConfig(slotElement) {
  const keyElement = getSlotKeyElement(slotElement.props.children);

  if (!keyElement) {
    warn("Slot requires one CheonjiinKeyboard.Key child.");
    return null;
  }

  if (typeof keyElement.props.value !== "string") {
    warn("CheonjiinKeyboard.Key requires a string value prop.");
    return null;
  }

  return {
    value: keyElement.props.value,
    label: keyElement.props.children,
    ariaLabel: keyElement.props.ariaLabel,
    className: keyElement.props.className,
  };
}

export function collectKeyboardSlots(children) {
  const slots = createEmptySlots();

  Children.forEach(children, (child) => {
    if (!isValidElement(child) || child.type !== KeyboardSlot) return;

    const mode = child.props.mode ?? "all";
    const { name } = child.props;

    if (!name) {
      warn("Slot requires a name prop.");
      return;
    }

    if (!isSupportedSlot(mode, name)) return;

    const slotConfig = toSlotConfig(child);
    if (!slotConfig) return;

    slots[mode][name] = slotConfig;
  });

  return slots;
}

export function getSlotsForMode(slots, mode) {
  return {
    ...slots.all,
    ...slots[mode],
  };
}
