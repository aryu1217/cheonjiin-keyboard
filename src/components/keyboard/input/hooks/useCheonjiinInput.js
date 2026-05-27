import { useEffect, useState } from "react";
import {
  createInitialState,
  pressConsonantCycle as applyConsonantCycle,
  pressVowelStroke as applyVowelStroke,
  backspace as applyBackspace,
  getText,
  insertChar as applyInsertChar,
  insertCharCycle as applyInsertCharCycle,
} from "../../../../utils/cheonjiinComposer";

// 천지인 입력 조합 상태를 React state로 관리하는 hook입니다.
// 버튼 배치나 키보드 모드는 알지 않고, 입력 액션과 최종 text 변경 알림만 책임집니다.
export default function useCheonjiinInput({ onChange } = {}) {
  const [state, setState] = useState(() => createInitialState());
  const text = getText(state);

  // 조합 결과가 바뀔 때마다 외부 사용자에게 현재 전체 문자열을 전달합니다.
  useEffect(() => {
    if (onChange) onChange(text);
  }, [text, onChange]);

  // 모드 전환 시 현재 글자의 모음 조합만 끊고, 이미 입력된 문자열은 유지합니다.
  const resetComposition = () => {
    setState((prev) => ({
      ...prev,
      vowelStrokes: [],
      currentVowelIndex: -1,
    }));
  };

  const pressConsonantCycle = (cycle) => {
    setState((prev) => applyConsonantCycle(prev, cycle));
  };

  const pressVowelStroke = (stroke) => {
    setState((prev) => applyVowelStroke(prev, stroke));
  };

  const backspace = () => {
    setState((prev) => applyBackspace(prev));
  };

  const insertChar = (ch) => {
    setState((prev) => applyInsertChar(prev, ch));
  };

  const insertCharCycle = (cycle) => {
    setState((prev) => applyInsertCharCycle(prev, cycle));
  };

  // 영어 shift처럼 마지막 입력 문자만 후처리해야 하는 경우에 사용합니다.
  const updateLastJamo = (updater) => {
    setState((prev) => {
      const jamo = prev.jamo.slice();
      const lastIndex = jamo.length - 1;

      if (lastIndex < 0) return prev;

      jamo[lastIndex] =
        typeof updater === "function" ? updater(jamo[lastIndex]) : updater;

      return {
        ...prev,
        jamo,
      };
    });
  };

  return {
    text,
    pressConsonantCycle,
    pressVowelStroke,
    backspace,
    insertChar,
    insertCharCycle,
    resetComposition,
    updateLastJamo,
  };
}
