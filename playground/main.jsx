import React from "react";
import ReactDOM from "react-dom/client";
import CheonjiinKeyboard from "../src";

export function Playground() {
  return (
    <CheonjiinKeyboard
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
    />
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Playground />
  </React.StrictMode>,
);
