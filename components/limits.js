import { useEffect, useState } from "react";
import Choice from "@/components/choice";
import Correct from "@/components/correct";
import Wrong from "@/components/wrong";
import Link from "next/link";
import { useRouter } from "next/router";

export default function IntegralDiffExp() {
  const [help, setHelp] = useState(false);           // existing help toggle
  const [helpIndex, setHelpIndex] = useState(0);     // which help step is showing
  const [helpSteps, setHelpSteps] = useState([]);    // prepared help steps

  const [loaded, setLoaded] = useState(false);
  const [correct, setCorrect] = useState(false);
  const [wrong, setWrong] = useState(false);
  const [terms, setTerms] = useState([]);
  const [choices, setChoices] = useState([]);
  const [answer, setAnswer] = useState("");

  const router = useRouter();
  const { username, id } = router.query;
  const [score, setScore] = useState(0);
  const [count, setCount] = useState(0);

  // 🎲 Generate 3-term polynomial (keeps your original logic)
  function generatePolynomial() {
    const usedExponents = new Set();
    const newTerms = [];
    while (newTerms.length < 3) {
      const exp = Math.ceil(Math.random() * 7 + 2); // 2–9
      if (!usedExponents.has(exp)) {
        usedExponents.add(exp);
        const coeff = (Math.ceil(Math.random() * 5 + 1)) * (exp + 1); // multiple of exp+1
        newTerms.push({ coeff, exp });
      }
    }
    newTerms.sort((a, b) => b.exp - a.exp);
    setTerms(newTerms);
  }

  // Helper: gcd + fraction string
  function gcd(a, b) {
    a = Math.abs(a);
    b = Math.abs(b);
    if (b === 0) return a;
    return gcd(b, a % b);
  }
  function fracStr(num, den) {
    const g = gcd(num, den);
    const n = num / g;
    const d = den / g;
    return d === 1 ? `${n}` : `${n}/${d}`;
  }

  // Build a display string for an integrated term
  function integratedTermString(coeff, exp) {
    const newExp = exp + 1;
    const numer = coeff;
    const denom = newExp;
    const coeffStr = numer % denom === 0 ? `${numer / denom}` : fracStr(numer, denom);
    if (newExp === 1) return `${coeffStr}x`;
    return `${coeffStr}x${supString(newExp)}`;
  }

  // 🧮 Generate correct integral + wrong answers (keeps your original logic)
  function generateChoices(t) {
    if (t.length === 0) return;

    const integrateTerm = (c, e) => {
      const newExp = e + 1;
      const newCoeff = c / newExp;
      if (newExp === 1) return `${newCoeff}x`;
      return `${newCoeff}x${supString(newExp)}`;
    };

    const integral = "f(x) = " + t.map(({ coeff, exp }) => integrateTerm(coeff, exp)).join(" + ") + " + C";
    setAnswer(integral);

    const wrongs = [];
    for (let i = 0; i < 3; i++) {
      const variant =
        "f(x) = " +
        t
          .map(({ coeff, exp }) => {
            const newExp = exp + 1;
            const offset = Math.floor(Math.random() * 3) - 1;
            const newCoeff = (coeff + offset * newExp) / newExp;
            if (newExp === 1) return `${newCoeff}x`;
            return `${newCoeff}x${supString(newExp)}`;
          })
          .join(" + ") +
        " + C";
      wrongs.push(variant);
    }

    const allChoices = [integral, ...wrongs].sort(() => Math.random() - 0.5);
    setChoices(allChoices);
  }

  // --- Step-by-step help builder (NEW) ---
  function buildHelpSteps(t) {
    if (!t || t.length === 0) return [];

    const steps = [];

    // Step 0: show original polynomial (integrand)
    steps.push({
      title: "Original",
      content: (
        <div style={{ fontSize: 18 }}>
          <div>We start with the integrand:</div>
          <div style={{ marginTop: 8 }}>
            ∫ f(x) dx =&nbsp;
            {t.map((term, i) => (
              <span key={i}>
                {i > 0 && " + "}
                {term.coeff}x{sup(term.exp)}
              </span>
            ))}
          </div>
        </div>
      ),
    });

    // For each term: show the integration step for that single term
    t.forEach((term, i) => {
      const { coeff, exp } = term;
      const newExp = exp + 1;
      const numer = coeff;
      const denom = newExp;
      const coeffDisplay = numer % denom === 0 ? `${numer / denom}` : fracStr(numer, denom);

      steps.push({
        title: `Integrate term ${i + 1}`,
        content: (
          <div style={{ fontSize: 18 }}>
            <div>
              Take the term: <strong>{coeff}x{sup(exp)}</strong>
            </div>
            <div style={{ marginTop: 8 }}>
              1) Increase the exponent: {exp} → <strong>{newExp}</strong>
            </div>
            <div style={{ marginTop: 6 }}>
              2) Divide the coefficient by the new exponent: {coeff} ÷ {newExp} = <strong>{coeffDisplay}</strong>
            </div>
            <div style={{ marginTop: 8 }}>
              So this term becomes: <strong>{coeffDisplay}x{sup(newExp)}</strong>
            </div>
          </div>
        ),
      });
    });

    // Final assembled result
    steps.push({
      title: "Combine terms",
      content: (
        <div style={{ fontSize: 18 }}>
          <div>Combine the integrated terms and add the constant of integration:</div>
          <div style={{ marginTop: 8 }}>
            ∫ f(x) dx ={" "}
            {t.map((term, i) => (
              <span key={i}>
                {i > 0 && " + "}
                {integratedTermString(term.coeff, term.exp)}
              </span>
            ))}
            {" "}+ C
          </div>
          <div style={{ marginTop: 10, color: "#666" }}>
            Note: each term was integrated individually and then summed — that's term-by-term integration.
          </div>
        </div>
      ),
    });

    // Optional short note about +C
    steps.push({
      title: "Why +C?",
      content: (
        <div style={{ fontSize: 16 }}>
          The +C stands for an arbitrary constant. Differentiation of a constant is 0, so any constant could have been
          present before integration — we include +C to represent that family of antiderivatives.
        </div>
      ),
    });

    return steps;
  }

  // ✅ Buttons and feedback (keeps your original)
  function open() {
    setHelp(true);
    setHelpIndex(0);
  }
  function close() {
    setHelp(false);
  }

  function CorrectA() {
    setCorrect(true);
    setTimeout(() => setCorrect(false), 1200);
    setCount((p) => p + 1);
    setScore((p) => p + 1);
  }

  function WrongA() {
    setWrong(true);
    setTimeout(() => setWrong(false), 1200);
  }

  function nextQuestion() {
    setTimeout(() => generatePolynomial(), 1000);
  }

  // 🗂 localStorage tracking (keeps your original behavior)
  useEffect(() => {
    const c = parseInt(window.localStorage.getItem(`${id} intergal`));
    const s = parseInt(window.localStorage.getItem(`${id} score`));
    setCount(c || 0);
    setScore(s || 0);
    setLoaded(true);
  }, [id]);

  useEffect(() => {
    if (count > 0) window.localStorage.setItem(`${id} intergal`, count);
  }, [count]);
  useEffect(() => {
    if (score > 0) window.localStorage.setItem(`${id} score`, score);
  }, [score]);

  useEffect(() => {
    if (loaded) generatePolynomial();
  }, [loaded]);
  useEffect(() => {
    if (terms.length > 0 && loaded) {
      generateChoices(terms);
      // build step-by-step help once terms are ready
      setHelpSteps(buildHelpSteps(terms));
    }
  }, [terms, loaded]);

  return (
    <div className="beige container column">
      <div className="Test sb">
        <div className="double">
          <div className="font">{username}</div>
          <div>Score: {score}</div>
          <div className="font">Integrals: {count}</div>
        </div>
        <Link href={`/${id}/enter/intergalTest`}>
          <button className="green test-btn">Test</button>
        </Link>
      </div>

      {/* Question */}
      {loaded && terms.length > 0 && (
        <div style={{ marginTop: "8px" }} className="center">
          <div style={{ fontSize: "25px" }} className="center">
            ∫f(x)dx = &nbsp;
            {terms.map((t, i) => (
              <span key={i}>
                {i > 0 && " + "}
                {t.coeff}x{sup(t.exp)}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="box">
        <button style={{ marginBottom: "16px" }} className="help" onClick={open}>
          help
        </button>
      </div>

      {correct && <Correct />}
      {wrong && <Wrong />}

      {/* Choices */}
      {loaded && (
        <div className="box column">
          <div className="row wrap">
            {choices.map((choice, index) => (
              <Choice
                key={index}
                size="260px"
                big
                title={choice}
                value={choice}
                answer={answer}
                doSomething={nextQuestion}
                Correct={CorrectA}
                Wrong={WrongA}
              />
            ))}
          </div>
        </div>
      )}

      {/* --- HELP MODAL (step-by-step) --- */}
      {help && helpSteps.length > 0 && (
        <div className="Help" style={{ position: "fixed", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 60 }}>
          <div style={{ width: 760, maxWidth: "95%", background: "white", padding: 22, borderRadius: 8, boxShadow: "0 10px 30px rgba(0,0,0,0.2)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ fontWeight: 700 }}>{helpSteps[helpIndex].title}</div>
              <div>
                <button className="cancel-btn" onClick={close} style={{ marginLeft: 8 }}>Close</button>
              </div>
            </div>

            <div style={{ marginTop: 14 }}>{helpSteps[helpIndex].content}</div>

            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 18 }}>
              <div>
                <button
                  className="choice"
                  onClick={() => setHelpIndex((i) => Math.max(0, i - 1))}
                  disabled={helpIndex === 0}
                  style={{ opacity: helpIndex === 0 ? 0.5 : 1 }}
                >
                  ◀ Prev
                </button>
              </div>

              <div style={{ display: "flex", gap: 8 }}>
                <div style={{ alignSelf: "center", color: "#666" }}>{helpIndex + 1} / {helpSteps.length}</div>
                <button
                  className="choice green"
                  onClick={() => {
                    if (helpIndex < helpSteps.length - 1) setHelpIndex((i) => i + 1);
                    else close();
                  }}
                >
                  {helpIndex < helpSteps.length - 1 ? "Next ▶" : "Done"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Superscript display (kept from your file)
function sup(num) {
  const map = { 1: "", 2: "²", 3: "³", 4: "⁴", 5: "⁵", 6: "⁶", 7: "⁷", 8: "⁸", 9: "⁹", 10: "¹⁰" };
  return <span style={{ fontSize: "30px", position: "relative", top: "-8px" }}>{map[num] || map[num]}</span>;
}

function supString(num) {
  const map = { 1: "", 2: "²", 3: "³", 4: "⁴", 5: "⁵", 6: "⁶", 7: "⁷", 8: "⁸", 9: "⁹", 10: "¹⁰" };
  return map[num] || map[num];
}
