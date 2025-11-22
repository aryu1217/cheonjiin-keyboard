// src/utils/cheonjiinComposer.test.js
import { describe, it, expect } from "vitest";
import {
  createInitialState,
  pressConsonant,
  pressVowelStroke,
  insertChar,
  backspace,
  getText,
} from "./cheonjiinComposer";

// 헬퍼: 자음/모음 입력을 조금 더 읽기 쉽게
const typeConsonant = (state, c) => pressConsonant(state, c);
const typeVowel = (state, strokes) =>
  strokes.reduce((s, st) => pressVowelStroke(s, st), state);

describe("기본 조합", () => {
  it("ㄱ + ㅏ + ㄴ + ㅏ => 가나", () => {
    let s = createInitialState();

    s = typeConsonant(s, "ㄱ");
    s = typeVowel(s, ["I", "D"]); // ㅏ (I,D)
    s = typeConsonant(s, "ㄴ");
    s = typeVowel(s, ["I", "D"]); // ㅏ (I,D)

    expect(getText(s)).toBe("가나");
  });
});

describe("이중 모음(ㅘ / ㅝ / ㅞ / ㅢ)", () => {
  it("ㄱ + ㅘ => 과", () => {
    let s = createInitialState();

    s = typeConsonant(s, "ㄱ");
    // "D,H,I,D": "ㅘ"
    s = typeVowel(s, ["D", "H", "I", "D"]);

    expect(getText(s)).toBe("과");
  });

  it("ㅂ + ㅝ => 붜", () => {
    let s = createInitialState();

    s = typeConsonant(s, "ㅂ");
    // "H,D,D,I": "ㅝ"
    s = typeVowel(s, ["H", "D", "D", "I"]);

    expect(getText(s)).toBe("붜");
  });

  it("ㅂ + ㅞ => 붸", () => {
    let s = createInitialState();

    s = typeConsonant(s, "ㅂ");
    // "H,D,D,I,I": "ㅞ"
    s = typeVowel(s, ["H", "D", "D", "I", "I"]);

    expect(getText(s)).toBe("붸");
  });

  it("ㅇ + ㅢ => 의", () => {
    let s = createInitialState();

    s = typeConsonant(s, "ㅇ");
    // "H,I": "ㅢ"
    s = typeVowel(s, ["H", "I"]);

    expect(getText(s)).toBe("의");
  });
});

describe("백스페이스 동작", () => {
  it("3타 모음(ㅑ) 조합 중 stroke 하나씩 되돌리기", () => {
    let s = createInitialState();

    s = typeConsonant(s, "ㅇ");
    s = pressVowelStroke(s, "I"); // ㅣ
    s = pressVowelStroke(s, "D"); // ㅏ
    s = pressVowelStroke(s, "D"); // ㅑ (I,D,D)

    expect(getText(s)).toBe("야");

    // 1번 백스페이스 → stroke 하나 제거 → ㅏ
    s = backspace(s);
    expect(getText(s)).toBe("아");

    // 2번 백스페이스 → stroke 하나 더 제거 → ㅣ
    s = backspace(s);
    expect(getText(s)).toBe("이");

    // 3번 백스페이스 → 모음 삭제, 자음만 남음
    s = backspace(s);
    expect(getText(s)).toBe("ㅇ");

    // 4번 백스페이스 → 자음도 삭제
    s = backspace(s);
    expect(getText(s)).toBe("");
  });

  it("이중 모음(ㅘ) 조합 중 백스페이스 단계", () => {
    let s = createInitialState();

    s = typeConsonant(s, "ㄱ");
    // "D,H,I,D": "ㅘ" → 과
    s = typeVowel(s, ["D", "H", "I", "D"]);
    expect(getText(s)).toBe("과");

    // 1번 백스페이스 → "D,H,I" → ㅚ → 괴
    const s1 = backspace(s);
    expect(getText(s1)).toBe("괴");

    // 2번 백스페이스 → "D,H" → ㅗ → 고
    const s2 = backspace(s1);
    expect(getText(s2)).toBe("고");

    // 3번 백스페이스 → 모음 삭제, 자음만 남음 → ㄱ
    const s3 = backspace(s2);
    expect(getText(s3)).toBe("ㄱ");
  });

  it("일반 문자(숫자/기호) 백스페이스", () => {
    let s = createInitialState();

    s = typeConsonant(s, "ㄱ");
    s = typeVowel(s, ["I", "D"]); // ㅏ -> 가
    s = insertChar(s, "1");
    s = insertChar(s, "2");

    expect(getText(s)).toBe("가12");

    s = backspace(s); // 2 삭제
    expect(getText(s)).toBe("가1");

    s = backspace(s); // 1 삭제
    expect(getText(s)).toBe("가");

    s = backspace(s); // 모음 삭제 → 자음만 남음
    expect(getText(s)).toBe("ㄱ");

    s = backspace(s); // 자음 삭제 → 빈 문자열
    expect(getText(s)).toBe("");
  });
});
