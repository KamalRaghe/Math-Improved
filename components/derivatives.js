import { useEffect, useState } from "react";
import Step from "./step";

export default function DerivativeHelp({ terms, close }) {
  // which term are we differentiating
  const [termIndex, setTermIndex] = useState(0);

  // which step inside that term
  const [step, setStep] = useState(0);

  // MCQ answers
  const [choices, setChoices] = useState([]);

  const term = terms[termIndex];
  if (!term) return null;

  const { coeff, exp } = term;

  // ---------------------------
  // Step answers (LIKE LIMITS)
  // ---------------------------
  function getAnswer() {
    if (step === 1) return exp;                 // identify exponent
    if (step === 2) return coeff * exp;         // multiply coeff × exp
    if (step === 3) return exp - 1;             // subtract 1
    if (step === 4) return `${coeff * exp}x${sup(exp - 1)}`; // final term
    return null;
  }

  // ---------------------------
  // Step question text
  // ---------------------------
  function getQuestion() {
    if (step === 0) return "Click to start";
    if (step === 1) return `What is the exponent of ${coeff}x${sup(exp)} ?`;
    if (step === 2) return `${coeff} × ${exp} =`;
    if (step === 3) return `${exp} − 1 =`;
    if (step === 4) return "Final derivative of this term:";
    return "";
  }

  // ---------------------------
  // Generate MCQ (LIKE LIMITS)
  // ---------------------------
  useEffect(() => {
    if (step < 1 || step > 3) return;

    const correct = getAnswer();
    const wrongs = new Set();

    while (wrongs.size < 3) {
      const offset = Math.floor(Math.random() * 5) - 2;
      if (offset !== 0) wrongs.add(correct + offset);
    }

    setChoices(
      [correct, ...Array.from(wrongs)].sort(() => Math.random() - 0.5)
    );
  }, [step]);

  // ---------------------------
  // Progress logic
  // ---------------------------
  function next() {
    if (step < 4) {
      setStep(step + 1);
    } else {
      // move to next term
      if (termIndex < terms.length - 1) {
        setTermIndex(termIndex + 1);
        setStep(1);
      } else {
        close(); // finished all terms
      }
    }
  }

  // ---------------------------
  // Render
  // ---------------------------
  return (
    <div className="Help column" style={{ zIndex: 50 }}>

      {/* Close */}
      <div className="cancel">
        <button className="cancel-btn" onClick={close}>X</button>
      </div>

      {/* Header */}
      <div className="center" style={{ fontSize: "34px", marginBottom: "10px" }}>
        Differentiate:
        <br />
        <span style={{ color: "green" }}>
          {coeff}x{sup(exp)}
        </span>
      </div>

      {/* Progress */}
      <div className="center" style={{ opacity: 0.7 }}>
        Term {termIndex + 1} of {terms.length}
      </div>

      {/* Question */}
      {step > 0 && (
        <div className="double center Green StepQuestion">
          {getQuestion()}
        </div>
      )}

      {/* Final term display */}
      {step === 4 && (
        <div className="center" style={{ fontSize: "30px", marginTop: "15px" }}>
          = {getAnswer()}
        </div>
      )}

      {/* MCQ answers */}
      {step >= 1 && step <= 3 && (
        <div className="center wrap StepAnswer">
          {choices.map((c, i) => (
            <Step
              key={i}
              value={c}
              answer={getAnswer()}
              Count={next}
              done={false}
              mistake={() => {}}
            />
          ))}
        </div>
      )}

      {/* Start button */}
      {step === 0 && (
        <button
          className="choice"
          style={{ marginTop: "20px" }}
          onClick={() => setStep(1)}
        >
          Start
        </button>
      )}

    </div>
  );
}

// ---------------------------
// Superscript helper
// ---------------------------
function sup(n) {
  const map = {
    0: "",
    1: "¹",
    2: "²",
    3: "³",
    4: "⁴",
    5: "⁵",
    6: "⁶",
    7: "⁷",
    8: "⁸",
    9: "⁹",
  };
  return <span style={{ fontSize: "20px", top: "-10px", position: "relative" }}>{map[n]}</span>;
}
