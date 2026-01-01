import { useEffect, useMemo, useState } from "react";
import Step from "./step";

export default function DerivativeHelp({ terms, close }) {
  /**
   * terms = [{ coeff, exp }, ...]
   */

  const [step, setStep] = useState(0);        // step inside one term
  const [index, setIndex] = useState(0);      // which term
  const [choices, setChoices] = useState([]); // MCQ choices

  const term = terms[index];

  // -----------------------------
  // Derived values (IMPORTANT)
  // -----------------------------
  const correctAnswer = useMemo(() => {
    if (!term) return null;

    switch (step) {
      case 1:
        return term.exp;
      case 2:
        return term.coeff * term.exp;
      case 3:
        return term.exp - 1;
      case 4:
        return {
          coeff: term.coeff * term.exp,
          exp: term.exp - 1,
        };
      default:
        return null;
    }
  }, [step, term]);

  // -----------------------------
  // Question text
  // -----------------------------
  function questionText() {
    if (!term) return "";

    switch (step) {
      case 0:
        return "Click to start derivative steps";
      case 1:
        return `What is the exponent of ${term.coeff}x^${term.exp}?`;
      case 2:
        return `${term.coeff} × ${term.exp} = ?`;
      case 3:
        return `${term.exp} − 1 = ?`;
      case 4:
        return "Final derivative of this term:";
      default:
        return "";
    }
  }

  // -----------------------------
  // Generate MCQ choices
  // -----------------------------
  useEffect(() => {
    if (step === 0 || step === 4) return;

    const correct =
      typeof correctAnswer === "number" ? correctAnswer : null;

    if (correct === null) return;

    const wrongs = new Set();

    while (wrongs.size < 3) {
      const offset = Math.floor(Math.random() * 5) - 2;
      if (offset !== 0) wrongs.add(correct + offset);
    }

    setChoices(
      [correct, ...Array.from(wrongs)].sort(() => Math.random() - 0.5)
    );
  }, [step, correctAnswer]);

  // -----------------------------
  // Step progression
  // -----------------------------
  function nextStep() {
    if (step < 4) {
      setStep(step + 1);
    } else {
      if (index < terms.length - 1) {
        setIndex(index + 1);
        setStep(1);
      } else {
        close(); // done with all terms
      }
    }
  }

  // -----------------------------
  // Handle answer click
  // -----------------------------
  function handleChoice(val) {
    if (val === correctAnswer) {
      nextStep();
    }
  }

  // -----------------------------
  // Formatting helpers
  // -----------------------------
  function formatTerm(t) {
    if (t.exp === 0) return `${t.coeff}`;
    if (t.exp === 1) return `${t.coeff}x`;
    return `${t.coeff}x${sup(t.exp)}`;
  }

  // -----------------------------
  // Render
  // -----------------------------
  return (
    <div className="Help column" style={{ zIndex: 50 }}>
      <div className="cancel">
        <button className="cancel-btn" onClick={close}>
          X
        </button>
      </div>

      {/* Current term */}
      <div className="center" style={{ fontSize: "32px", marginBottom: "15px" }}>
        d/dx&nbsp;
        <span style={{ color: "green" }}>
          {term && `${term.coeff}x${sup(term.exp)}`}
        </span>
      </div>

      {/* Question */}
      <div className="center Green StepQuestion">
        {questionText()}
      </div>

      {/* Step 4: show final derivative term */}
      {step === 4 && (
        <div className="center" style={{ fontSize: "30px", marginTop: "15px" }}>
          = {formatTerm(correctAnswer)}
        </div>
      )}

      {/* Choices */}
      {step > 0 && step < 4 && (
        <div className="center wrap StepAnswer">
          {choices.map((c, i) => (
            <Step
              key={i}
              value={c}
              answer={correctAnswer}
              Count={() => handleChoice(c)}
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
          onClick={() => setStep(1)}
          style={{ marginTop: "20px" }}
        >
          Start
        </button>
      )}
    </div>
  );
}
