const VOWEL_FROM_STROKES = {
  // 1타 모음
  I: "ㅣ",
  H: "ㅡ",

  // 2타 모음
  "I,D": "ㅏ", // ㅣ ·
  "D,I": "ㅓ", // · ㅣ
  "D,H": "ㅗ", // · ㅡ
  "H,D": "ㅜ", // ㅡ ·
  "H,I": "ㅢ", // ㅡ ㅣ

  // 3타 모음 (이중모음 + ㅑ,ㅕ,ㅛ,ㅠ)
  "I,D,I": "ㅐ", // ㅣ · ㅣ
  "D,I,I": "ㅔ", // · ㅣ ㅣ
  "I,D,D": "ㅑ", // ㅣ ··
  "D,D,I": "ㅕ", // ·· ㅣ
  "D,D,H": "ㅛ", // ·· ㅡ
  "H,D,D": "ㅠ", // ㅡ ··
  "D,H,I": "ㅚ", // ㅗ + ㅣ (· ㅡ ㅣ)
  "H,D,I": "ㅟ", // ㅜ + ㅣ (ㅡ · ㅣ)

  // 4타 모음 (ㅘ, ㅝ, ㅒ, ㅖ)
  "D,H,I,D": "ㅘ", // ㅗ + ㅏ (· ㅡ ㅣ ·)
  "H,D,D,I": "ㅝ", // ㅜ + ㅓ (ㅡ · · ㅣ)
  "I,D,D,I": "ㅒ", // ㅣ··ㅣ
  "D,D,I,I": "ㅖ", // ··ㅣㅣ

  // 5타 모음 (ㅙ, ㅞ)
  "D,H,I,D,I": "ㅙ", // ㅘ + ㅣ
  "H,D,D,I,I": "ㅞ", // ㅝ + ㅣ
};

// prevStrokes: 지금까지 누른 stroke 배열 (예: ['I'])
// stroke: 새로 누른 stroke ("I" | "D" | "H")
//
// return: { vowel, strokes }
//  - vowel: 이번까지 조합으로 만들어지는 모음 (없으면 null)
//  - strokes: 다음 입력을 위해 유지할 stroke 버퍼
//
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

// 현재 stroke 버퍼로부터 모음을 다시 계산.
// 백스페이스에서 사용.
export function vowelFromStrokes(strokes) {
  const key = strokes.join(",");
  return VOWEL_FROM_STROKES[key] || null;
}
