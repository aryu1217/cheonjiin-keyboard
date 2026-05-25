// CheonjiinKeyboard children에서 빈 슬롯 위치를 선언하기 위한 마커 컴포넌트입니다.
// 실제 DOM은 렌더링하지 않고, CheonjiinKeyboard가 children을 읽어 슬롯 설정으로 변환합니다.
export default function KeyboardSlot() {
  return null;
}

KeyboardSlot.displayName = "CheonjiinKeyboard.Slot";
