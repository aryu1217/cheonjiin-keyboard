import Hangul from "./hangul";
import { pushStroke, vowelFromStrokes } from "./cheonjiinVowel";

// state:
// - jamo: 전체 자모/문자 배열 (['ㄷ','ㅑ','.', '1', ...])
// - vowelStrokes: 현재 글자의 모음 조합용 stroke (['I','D','D'] 등)
// - currentVowelIndex: jamo 배열에서 "현재 글자의 모음" 인덱스 (없으면 -1)

export function createInitialState() {
  return {
    jamo: [],
    vowelStrokes: [],
    currentVowelIndex: -1,
  };
}

// 단일 자음 추가용
export function pressConsonant(state, consonant) {
  const jamo = [...state.jamo, consonant];
  return {
    jamo,
    vowelStrokes: [],
    currentVowelIndex: -1,
  };
}

//  자음 그룹 키 (예: ["ㄱ","ㅋ","ㄲ"])
//  - 같은 글자의 초성 상태(currentVowelIndex === -1)에서
//    마지막 자모가 이 그룹 안에 있으면 순환 (ㄱ→ㅋ→ㄲ→ㄱ)
//    아니면 새 자음(그룹 첫 글자)을 추가
export function pressConsonantCycle(state, cycle) {
  const jamo = state.jamo.slice();
  const lastIndex = jamo.length - 1;
  const lastChar = jamo[lastIndex];

  const idxInCycle = cycle.indexOf(lastChar);

  if (idxInCycle !== -1 && state.currentVowelIndex === -1) {
    const nextChar = cycle[(idxInCycle + 1) % cycle.length];
    jamo[lastIndex] = nextChar;

    return {
      ...state,
      jamo,
    };
  }

  // 새 글자 시작
  jamo.push(cycle[0]);

  return {
    jamo,
    vowelStrokes: [],
    currentVowelIndex: -1,
  };
}

// 천지인 모음 stroke (I=ㅣ, D=·, H=ㅡ)
export function pressVowelStroke(state, stroke) {
  const { vowel, strokes } = pushStroke(state.vowelStrokes, stroke);

  let jamo = state.jamo.slice();
  let currentVowelIndex = state.currentVowelIndex;

  if (vowel) {
    if (currentVowelIndex >= 0) {
      jamo[currentVowelIndex] = vowel;
    } else {
      currentVowelIndex = jamo.length;
      jamo.push(vowel);
    }
  }

  return {
    jamo,
    vowelStrokes: strokes,
    currentVowelIndex,
  };
}

// 일반 문자(기호/숫자/스페이스/엔터 등) 추가
export function insertChar(state, ch) {
  const jamo = [...state.jamo, ch];
  return {
    jamo,
    vowelStrokes: [],
    currentVowelIndex: -1,
  };
}

// 일반 문자 사이클 키 (예: ['.', ','], ['?', '!'])
// - 마지막 문자가 cycle 안에 있으면 순환
// - 아니면 cycle[0] 추가
export function insertCharCycle(state, cycle) {
  const jamo = state.jamo.slice();
  const lastIndex = jamo.length - 1;
  const lastChar = jamo[lastIndex];

  const idx = cycle.indexOf(lastChar);

  if (idx !== -1) {
    jamo[lastIndex] = cycle[(idx + 1) % cycle.length];
  } else {
    jamo.push(cycle[0]);
  }

  return {
    jamo,
    vowelStrokes: [],
    currentVowelIndex: -1,
  };
}

// 백스페이스: 천지인 스타일 되돌리기
export function backspace(state) {
  // 1) 모음 조합 중이면 stroke 먼저 되돌리기
  if (state.vowelStrokes.length > 0) {
    const strokes = state.vowelStrokes.slice(0, -1);
    const vowel = vowelFromStrokes(strokes);

    let jamo = state.jamo.slice();
    let currentVowelIndex = state.currentVowelIndex;

    if (vowel) {
      if (currentVowelIndex >= 0) {
        jamo[currentVowelIndex] = vowel;
      } else {
        currentVowelIndex = jamo.length;
        jamo.push(vowel);
      }
    } else {
      if (currentVowelIndex >= 0) {
        jamo.splice(currentVowelIndex, 1);
        currentVowelIndex = -1;
      }
    }

    return {
      jamo,
      vowelStrokes: strokes,
      currentVowelIndex,
    };
  }

  // 2) 모음 조합 아니면 자모/문자 하나 삭제
  if (state.jamo.length > 0) {
    const jamo = state.jamo.slice(0, -1);
    let currentVowelIndex = state.currentVowelIndex;

    if (currentVowelIndex >= jamo.length) {
      currentVowelIndex = -1;
    }

    return {
      jamo,
      vowelStrokes: [],
      currentVowelIndex,
    };
  }

  return state;
}

export function getText(state) {
  return Hangul.assemble(state.jamo);
}
