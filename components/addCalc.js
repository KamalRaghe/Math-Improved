import { useState } from "react";

export default function AddCalculator({close}) {
  const [base, setBase] = useState("");
  const [exponent, setExponent] = useState("");
  const [result, setResult] = useState(null);

  function calculate() {
    if (base === "" || exponent === "") return;
    const res = (Number(base)+Number(exponent));
    setResult(res);
  }

  return (
    <div className="mini-calc" style={{
      background: "#f8f8f8",
      padding: "16px",
      borderRadius: "12px",
      width: "240px",
      boxShadow: "0 0 10px rgba(0,0,0,0.1)",
      textAlign: "center",
      zIndex:"19",
      position:"relative",
      top:"-20px"
    }}>
       <div className='cancel'><button style={{background:"none",border:"none"}} onClick = {close}>X</button></div>
      
      
      <div style={{ display: "flex", justifyContent: "center", gap: "8px" }}>
        <input
          type="number"
          value={base}
          onChange={(e) => setBase(e.target.value)}
          placeholder=""
          style={{ width: "70px", padding: "6px", textAlign: "center" }}
        />
        <span style={{ fontSize: "22px", position: "relative", top: "4px" }}>+</span>
        <input
          type="number"
          value={exponent}
          onChange={(e) => setExponent(e.target.value)}
          placeholder=""
          style={{ width: "70px", padding: "6px", textAlign: "center" }}
        />
      </div>

      <button
        onClick={calculate}
        style={{
          marginTop: "12px",
          padding: "6px 14px",
          background: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        Calculate
      </button>

      {result !== null && (
        <div style={{ marginTop: "10px", fontSize: "18px", fontWeight: "bold" }}>
          Answer: {result}
        </div>
      )}
    </div>
  );
}
