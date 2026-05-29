import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import CheonjiinKeyboard from "../src";

const keyboardTheme = {
  "keyboard-bg": "#172027",
  "keyboard-border": "1px solid rgba(125, 211, 252, 0.2)",
  "keyboard-radius": 18,
  "keyboard-margin": "0",
  "keyboard-padding": 12,
  "grid-gap": 8,
  "key-bg": "#f8fafc",
  "key-color": "#111827",
  "key-border": "1px solid rgba(15, 23, 42, 0.16)",
  "key-height": 54,
  "key-radius": 14,
  "key-font-size": 17,
  "key-active-bg": "#facc15",
};

export function Playground() {
  const [text, setText] = useState("");

  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "18px",
        justifyContent: "flex-end",
        boxSizing: "border-box",
        background:
          "linear-gradient(180deg, #0f172a 0%, #12313f 48%, #f8fafc 48%, #e2e8f0 100%)",
      }}
    >
      <section
        style={{
          width: "100%",
          maxWidth: 440,
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: 14,
        }}
      >
        <div
          style={{
            border: "1px solid rgba(148, 163, 184, 0.24)",
            borderRadius: 18,
            padding: 14,
            background: "rgba(15, 23, 42, 0.76)",
            boxShadow: "0 18px 60px rgba(15, 23, 42, 0.28)",
            backdropFilter: "blur(10px)",
          }}
        >
          <textarea
            value={text}
            readOnly
            rows={5}
            style={{
              width: "100%",
              minHeight: 128,
              border: "1px solid rgba(125, 211, 252, 0.28)",
              borderRadius: 14,
              padding: "14px 15px",
              boxSizing: "border-box",
              resize: "none",
              outline: "none",
              background: "#f8fafc",
              color: "#0f172a",
              fontSize: 17,
              lineHeight: 1.55,
              boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.9)",
            }}
            placeholder="기록을 입력하세요"
          />
        </div>

        <CheonjiinKeyboard
          onChange={setText}
          customStyle={keyboardTheme}
          customKeys={{
            common: {
              row1col1: { value: "@", label: "@" },
            },
            hangul: {
              row3col5: { value: "#", label: "#" },
            },
            english: {
              row2col5: { value: ".com", label: ".com" },
              row4col2: { value: ".", label: "." },
              row4col3: { value: ",", label: "," },
            },
            number: {
              row2col5: { value: "-", label: "-" },
              row3col5: { value: "%", label: "%" },
            },
          }}
          style={{
            boxShadow: "0 18px 50px rgba(15, 23, 42, 0.22)",
          }}
        />
      </section>
    </main>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Playground />
  </React.StrictMode>,
);
