// src/App.jsx
import { useState } from "react";
import CheonjiinKeyboard from "./index"; // 라이브러리 엔트리
import "./index.css"; // 키보드 스타일 (src 쪽 CSS 경로에 맞게 수정)

export default function App() {
  const [text, setText] = useState("");

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "16px",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        justifyContent: "flex-end",
        boxSizing: "border-box",
      }}
    >
      <textarea
        value={text}
        readOnly
        rows={4}
        style={{
          width: "100%",
          border: "1px solid #ddd",
          borderRadius: 8,
          padding: 8,
        }}
        placeholder="여기에 입력 내용이 반영됩니다"
      />

      <CheonjiinKeyboard onChange={setText} />
    </div>
  );
}
