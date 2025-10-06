import { useEffect, useState } from "react";
import Step from "./step";
import HelpAdd from "./HelpAdd"; // You can rename this later to HelpDerivative if needed

function ExtraDerivative({ close }) {
  const [extra, setExtra] = useState(false);
  const [done, setDone] = useState(false);
  const [count, setCount] = useState(0);
  const [arr, setArr] = useState([]);
  const [poly, setPoly] = useState([]);
  const [answer, setAnswer] = useState("");
  const [options, setOptions] = useState([]);

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
    10: "¹⁰",
  };

  // 🧮 Generate random polynomial
  function generatePolynomial() {
    const used = new Set();
    const newTerms = [];

    while (newTerms.length < 4) {
      const exp = Math.floor(Math.random() * 8) + 2; // exponent 2–9
      if (!used.has(exp)) {
        used.add(exp);
        const coeff = Math.floor(Math.random() * 9) + 1; // coefficient 1–9
        newTerms.push({ coeff, exp });
      }
    }

    // Sort by exponent (largest to smallest)
    newTerms.sort((a, b) => b.exp - a.exp);

    setPoly(newTerms);
  }

  // 🧾 Convert polynomial to readable string
  function formatPoly(terms) {
    return terms
      .map(
        (t, i) =>
          `${i !== 0 ? " + " : ""}${t.coeff}x${expMap[t.exp] || t.exp}`
      )
      .join("");
  }

  // ⚡ Compute derivative
  function derivative(terms) {
    return terms
      .map((t) => {
        if (t.exp === 0) return null;
        const newCoeff = t.coeff * t.exp;
        const newExp = t.exp - 1;
        return { coeff: newCoeff, exp: newExp };
      })
      .filter(Boolean);
  }

  // 🧩 Mix options
  function shuffleOptions(correct) {
    const wrongs = [];
    for (let i = 0; i < 3; i++) {
      const offset = Math.floor(Math.random() * 3) - 1; // small variation
      wrongs.push(
        correct
          .map((t) => ({
            coeff: Math.max(1, t.coeff + offset),
            exp: t.exp,
          }))
          .filter(Boolean)
      );
    }

    const all = [correct, ...wrongs]
      .map((terms) => formatPoly(terms))
      .sort(() => Math.random() - 0.5);

    setOptions(all);
  }

  // 🟩 Handle answer selection
  function handleSelect(val) {
    if (val === answer) {
      setDone(true);
      setCount(count + 1);
      if (count >= 2) close();
      else {
        setTimeout(() => {
          setDone(false);
          generatePolynomial();
        }, 800);
      }
    } else {
      console.log("Try again!");
    }
  }

  useEffect(() => {
    generatePolynomial();
  }, []);

  useEffect(() => {
    if (poly.length) {
      const d = derivative(poly);
      const formatted = formatPoly(d);
      setAnswer(formatted);
      shuffleOptions(d);
    }
  }, [poly]);

  return (
    <div className="Help">
      {extra && (
        <HelpAdd
          close={() => setExtra(false)}
          num1={0}
          num2={0}
          num3={0}
          text="Use the power rule: d/dx(axⁿ) = n·a·xⁿ⁻¹"
        />
      )}

      <div className="cancel" style={{ width: "100%" }}>
        <button className="cancel-btn" onClick={close}>
          X
        </button>
      </div>

      <div className="center" style={{ fontSize: "40px", marginBottom: "20px" }}>
        <strong>Find the derivative of:</strong>
        <br />
        <span style={{ fontSize: "45px", color: "green" }}>
          {poly.length ? formatPoly(poly) : ""}
        </span>
      </div>

      <div className="center wrap absolute StepAnswer">
        <button
          className="choice"
          style={{ backgroundColor: "yellow", color: "black" }}
          onClick={() => setExtra(true)}
        >
          help
        </button>

        {options.map((opt, i) => (
          <Step
            key={i}
            value={opt}
            answer={answer}
            Count={() => handleSelect(opt)}
            done={done}
            mistake={() => {}}
          />
        ))}

        <button className="choice red" onClick={close}>
          Close
        </button>
      </div>
    </div>
  );
}

export default ExtraDerivative;
