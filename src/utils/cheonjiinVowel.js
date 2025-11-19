// src/utils/cheonjiinVowel.js

// 천지인 stroke 정의
// I = ㅣ, D = ·, H = ㅡ
// src/utils/cheonjiinVowel.js

// I = ㅣ, D = ·, H = ㅡ
// src/utils/cheonjiinVowel.js

// I = ㅣ, D = ·, H = ㅡ
const VOWEL_FROM_STROKES = {
  // 1타 모음
  I: "ㅣ",
  H: "ㅡ",
  // D 하나는 단독 모음으로 쓰지 않고 조합용으로만 사용

  // 2타 모음 (기본)
  "I,D": "ㅏ", // ㅣ ·
  "D,I": "ㅓ", // · ㅣ
  "D,H": "ㅗ", // · ㅡ
  "H,D": "ㅜ", // ㅡ ·

  // 3타 모음 (이중모음 ㅐ, ㅔ)
  "I,D,I": "ㅐ", // ㅣ · ㅣ
  "D,I,I": "ㅔ", // · ㅣ ㅣ

  // 3타 모음 (기존 ㅑ, ㅕ, ㅛ, ㅠ)
  "I,D,D": "ㅑ", // ㅣ ··
  "D,D,I": "ㅕ", // ·· ㅣ
  "D,D,H": "ㅛ", // ·· ㅡ
  "H,D,D": "ㅠ", // ㅡ ··

  // 4타 모음 (ㅒ, ㅖ)
  "I,D,D,I": "ㅒ", // ㅣ··ㅣ
  "D,D,I,I": "ㅖ", // ··ㅣㅣ

  // 5타 모음 (ㅙ, ㅞ)
  "D,H,I,D,I": "ㅙ", // . ㅡ ㅣ . ㅣ
  "H,D,D,I,I": "ㅞ", // ㅡ . . ㅣ ㅣ
};

/**
 * prevStrokes: 지금까지 누른 stroke 배열 (예: ['I'])
 * stroke: 새로 누른 stroke ("I" | "D" | "H")
 *
 * return: { vowel, strokes }
 *  - vowel: 이번까지 조합으로 만들어지는 모음 (없으면 null)
 *  - strokes: 다음 입력을 위해 유지할 stroke 버퍼
 */
export function pushStroke(prevStrokes, stroke) {
  const strokes = [...prevStrokes, stroke];
  const key = strokes.join(",");

  const vowel = VOWEL_FROM_STROKES[key] || null;

  // 아직 완성은 아니지만 향후 조합 가능하면 prefix로 인정
  const hasPrefix = Object.keys(VOWEL_FROM_STROKES).some((k) =>
    k.startsWith(key)
  );

  if (vowel || hasPrefix) {
    return { vowel, strokes };
  }

  // 말이 안 되는 조합이면 새로 시작 (stroke 하나만 남김)
  const singleKey = stroke;
  const singleVowel = VOWEL_FROM_STROKES[singleKey] || null;
  const singleHasPrefix = Object.keys(VOWEL_FROM_STROKES).some((k) =>
    k.startsWith(singleKey)
  );

  if (singleVowel || singleHasPrefix) {
    return { vowel: singleVowel, strokes: [stroke] };
  }

  // 이것도 아니면 모음 조합 리셋
  return { vowel: null, strokes: [] };
}

/**
 * 현재 stroke 버퍼(strokes)로부터 모음을 다시 계산.
 * 백스페이스에서 사용.
 */
export function vowelFromStrokes(strokes) {
  const key = strokes.join(",");
  return VOWEL_FROM_STROKES[key] || null;
}
