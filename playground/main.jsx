import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import CheonjiinKeyboard from "../src";

export function Playground() {
  const [text, setText] = useState("");

  return (
    <main
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
          boxSizing: "border-box",
        }}
        placeholder="여기에 입력 내용이 반영됩니다"
      />

      <CheonjiinKeyboard
        onChange={setText}
        customKeys={{
          common: {
            row1col1: { value: "@" },
          },
          hangul: {
            row3col5: { value: "#" },
          },
        }}
      />
    </main>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Playground />
  </React.StrictMode>,
);
