import { useEffect, useState } from "react";
import Step from "@/components/step";


export default function StepLimit({ close, terms, xValue }) {
  const [step1, setStep1] = useState(true);
  const [step2, setStep2] = useState(false);
  const [done, setDone] = useState(false);
  const [choices, setChoices] = useState([]);
  const [answer, setAnswer] = useState(0);
  const [help, setHelp] = useState(false);
  const [anim, setAnim] = useState(false);

  // 🧮 Evaluate polynomial
  function evalLimit(t, x) {
    return t.reduce((sum, { coeff, exp }) => sum + coeff * Math.pow(x, exp), 0);
  }

  // 🎲 Generate 4 wrong + 1 correct
  function generateChoices(ans) {
    const wrongs = new Set();
    while (wrongs.size < 4) {
      const variation = ans + Math.floor(Math.random() * 10 - 5);
      if (variation !== ans) wrongs.add(variation);
    }
    const all = [ans, ...Array.from(wrongs)].sort(() => Math.random() - 0.5);
    setChoices(all);
  }

  useEffect(() => {
    const val = evalLimit(terms, xValue);
    setAnswer(val);
    generateChoices(val);
  }, [terms, xValue]);

  function Next() {
    if (step1) {
      setStep1(false);
      setStep2(true);
      setTimeout(() => setAnim(true), 300);
    } else if (step2) {
      setDone(true);
    }
  }

  return (
    <div className="Help fadeIn">

      <div className="cancel" style={{ width: "100%" }}>
        <button className="cancel-btn" onClick={close}>X</button>
      </div>

      {/* Expression display */}
      <div className="center top-number bold" style={{ fontSize: "28px" }}>
        <span className="Green">lim</span>{" "}
        <sub style={{ fontSize: "20px" }}>x → {xValue}</sub>{" "}
        {terms.map((t, i) => (
          <span key={i}>
            {i > 0 && " + "}
            {t.coeff}x{sup(t.exp)}
          </span>
        ))}
      </div>

      {/* Step 1: Substitution */}
      {step1 && (
        <div className="center absolute StepQuestion fadeIn">
          Step 1: Substitute <span className="Green">x = {xValue}</span>
        </div>
      )}

      {step1 && (
        <div className="center absolute StepWork fadeIn" style={{ top: "320px" }}>
          {terms.map((t, i) => (
            <span key={i} style={{ margin: "0 4px" }}>
              {i > 0 && " + "}
              <span className="Green">
                {t.coeff}({xValue}
                {sup(t.exp)})
              </span>
            </span>
          ))}
        </div>
      )}

      {/* Step 2: Simplify */}
      {step2 && (
        <>
          <div className="center absolute StepQuestion fadeIn">
            Step 2: Simplify each term
          </div>

          <div className="center absolute StepWork fadeIn" style={{ top: "320px" }}>
            {terms.map((t, i) => {
              const val = t.coeff * Math.pow(xValue, t.exp);
              return (
                <span key={i} style={{ margin: "0 4px" }}>
                  {i > 0 && " + "}
                  <span className="Green">
                    {t.coeff}({xValue}
                    {sup(t.exp)}) = {val}
                  </span>
                </span>
              );
            })}
          </div>
        </>
      )}

      {/* Choices */}
      {!done && (
        <div className="center wrap absolute StepAnswer fadeIn" style={{ top: "420px" }}>
          <button className="choice yellow" onClick={() => setHelp(true)}>
            help
          </button>

          {choices.map((val, idx) => (
            <Step
              key={idx}
              value={val}
              answer={answer}
              Count={Next}
              done={done}
              mistake={() => {}}
            />
          ))}

          <button className="choice red" onClick={close}>
            Close
          </button>
        </div>
      )}

      {/* ✅ Final answer */}
      {done && (
        <div
          className="center bold Green final fadeIn"
          style={{ top: "440px", fontSize: "24px" }}
        >
          ✅ The limit is {answer}
        </div>
      )}
    </div>
  );
}

// Superscript
function sup(num) {
  const map = {
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
  return (
    <span style={{ fontSize: "26px", position: "relative", top: "-6px" }}>
      {map[num] || num}
    </span>
  );
}
