function getSlotKeyClassName(className) {
  return ["cheon-key", className].filter(Boolean).join(" ");
}

// 빈칸으로 남겨둘지, 사용자가 선언한 커스텀 키로 채울지 결정하는 슬롯 셀입니다.
export default function KeyboardSlotCell({ mode, name, slot, onInsertChar }) {
  if (!slot) {
    return (
      <div
        className="cheon-key cheon-key--empty"
        data-cji-mode={mode}
        data-cji-slot={name}
        aria-hidden="true"
      />
    );
  }

  return (
    <button
      type="button"
      className={getSlotKeyClassName(slot.className)}
      data-cji-key
      data-cji-mode={mode}
      data-cji-slot={name}
      data-cji-action="slot"
      aria-label={slot.ariaLabel}
      onClick={() => onInsertChar(slot.value)}
    >
      {slot.label}
    </button>
  );
}
