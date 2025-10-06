import { useEffect, useState } from "react";

function ExtraDerivative({ close }) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [options, setOptions] = useState([]);
  const [count, setCount] = useState(0);

  const expMap = {
    1: "",
    2: "²",
    3: "³",
    4: "⁴",
    5: "⁵",
    6: "⁶",
    7: "⁷",
    8: "⁸",
    9: "⁹",
  };

  // Create polynomial
  function generateQuestion() {
    const terms = [];
    const used = new Set();
    while (terms.length < 4) {
      const exp = Math.floor(Math.random() * 8) + 2; // 2–9
      if (!used.has(exp)) {
        used.add(exp);
        const coeff = Math.floor(Math.random() * 9) + 1; // 1–9
        terms.push({ coeff, exp });
      }
    }
    terms.sort((a, b) => b.exp - a.exp);
    setQuestion(formatPoly(terms));

    const correct = derivative(terms);
    const correctStr = formatPoly(correct);
    setAnswer(correctStr);
    makeOptions(correct);
  }

  // Turn terms into string
  function formatPoly(terms) {
    return terms
      .map(
        (t, i) =>
          `${i !== 0 ? " + " : ""}${t.coeff}x${expMap[t.exp] || ""}`
      )
      .join("");
  }

  // Derivative rule: d/dx(axⁿ) = a·n·xⁿ⁻¹
  function derivative(terms) {
    return terms.map((t) => ({
      coeff: t.coeff * t.exp,
      exp: t.exp - 1,
    }));
  }

  // Random options
  function makeOptions(correct) {
    const correctStr = formatPoly(correct);
    const wrongs = [];

    for (let i = 0; i < 3; i++) {
      const offset = Math.floor(Math.random() * 3) - 1;
      const wrong = correct.map((t) => ({
        coeff: Math.max(1, t.coeff + offset),
        exp: t.exp,
      }));
      wrongs.push(formatPoly(wrong));
    }

    const all = [correctStr, ...wrongs].sort(() => Math.random() - 0.5);
    setOptions(all);
  }

  function handleSelect(opt) {
    if (opt === answer) {
      alert("✅ Correct!");
      if (count >= 2) close();
      else {
        setCount(count + 1);
        generateQuestion();
      }
    } else {
      alert("❌ Try again!");
    }
  }

  useEffect(() => {
    generateQuestion();
  }, []);

  return (
    <div className="Help">
      <div className="cancel" style={{ width: "100%" }}>
        <button className="cancel-btn" onClick={close}>X</button>
      </div>

      <div className="center" style={{ fontSize: "36px", margin: "20px" }}>
        <strong>Find the derivative of:</strong>
        <br />
        <span style={{ fontSize: "42px", color: "green" }}>{question}</span>
      </div>

      <div className="center">
        {options.map((opt, i) => (
          <button
            key={i}
            className="choice"
            style={{
              display: "block",
              margin: "10px auto",
              fontSize: "22px",
              padding: "10px 20px",
              borderRadius: "10px",
            }}
            onClick={() => handleSelect(opt)}
          >
            {opt}
          </button>
        ))}

        <button className="choice red" onClick={close}>
          Close
        </button>
      </div>
    </div>
  );
}

export default ExtraDerivative;
