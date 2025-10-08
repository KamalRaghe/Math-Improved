import { useState } from "react";

export default function ExponentMiniCalc() {
  const [expression, setExpression] = useState("");
  const [result, setResult] = useState("");

  function handleClick(value) {
    setExpression((prev) => prev + value);
  }

  function handleClear() {
    setExpression("");
    setResult("");
  }

  function handleDelete() {
    setExpression((prev) => prev.slice(0, -1));
  }

  function handleEqual() {
    try {
      // Replace ^ with ** for JS exponentiation
      const safeExpr = expression.replace(/\^/g, "**");
      // eslint-disable-next-line no-eval
      const res = eval(safeExpr);
      setResult(res);
    } catch {
      setResult("Error");
    }
  }

  const buttons = [
    "1", "2", "3",
    "4", "5", "6",
    "7", "8", "9",
    "0", "^"
  ];

  return (
    <div
      style={{
        background: "#f9f9f9",
        borderRadius: "16px",
        padding: "16px",
        width: "220px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.15)",
        textAlign: "center",
        fontFamily: "monospace",
      }}
    >
      <h3 style={{ marginBottom: "10px" }}>Exponent Calc</h3>

      <div
        style={{
          background: "white",
          borderRadius: "8px",
          padding: "8px",
          marginBottom: "12px",
          fontSize: "18px",
          minHeight: "30px",
          overflowX: "auto",
        }}
      >
        {expression || "0"}
      </div>

      {result && (
        <div
          style={{
            marginBottom: "10px",
            fontSize: "16px",
            color: "green",
            fontWeight: "bold",
          }}
        >
          = {result}
        </div>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "6px",
        }}
      >
        {buttons.map((btn) => (
          <button
            key={btn}
            onClick={() => handleClick(btn)}
            style={{
              padding: "10px",
              borderRadius: "8px",
              border: "none",
              background: "#ececec",
              fontSize: "18px",
              cursor: "pointer",
            }}
          >
            {btn}
          </button>
        ))}
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "10px",
          gap: "6px",
        }}
      >
        <button
          onClick={handleClear}
          style={{
            flex: 1,
            padding: "8px",
            background: "#ff7675",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          C
        </button>
        <button
          onClick={handleDelete}
          style={{
            flex: 1,
            padding: "8px",
            background: "#fdcb6e",
            color: "black",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          DEL
        </button>
        <button
          onClick={handleEqual}
          style={{
            flex: 1,
            padding: "8px",
            background: "#55efc4",
            color: "black",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          =
        </button>
      </div>
    </div>
  );
}
