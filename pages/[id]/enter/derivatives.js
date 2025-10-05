import { useEffect, useState } from "react";
import Choice from "@/components/choice";
import Correct from "@/components/correct";
import Wrong from "@/components/wrong";
import HelpCube from "@/components/cubehelp";
import Link from "next/link";
import { useRouter } from "next/router";

export default function DerivativeDiffExp() {
  const [help, setHelp] = useState(false);
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

  // 🎲 Generate polynomial (4 terms, last exponent = 2)
  function generatePolynomial() {
    const usedExponents = new Set();
    const newTerms = [];

    // Ensure we include exponents 2–5 range, last fixed at 2
    while (newTerms.length < 3) {
      const exp = Math.ceil(Math.random() * 3 + 2); // 3–5
      if (!usedExponents.has(exp) && exp !== 2) {
        usedExponents.add(exp);
        const coeff = Math.ceil(Math.random() * 8 + 1);
        newTerms.push({ coeff, exp });
      }
    }

    // Add last term with exponent 2
    newTerms.push({ coeff: Math.ceil(Math.random() * 8 + 1), exp: 2 });

    // Sort descending by exponent
    newTerms.sort((a, b) => b.exp - a.exp);
    setTerms(newTerms);
  }

  // 🧮 Compute derivative + wrong answers
  function generateChoices(t) {
    if (t.length === 0) return;

    const deriveTerm = (c, e) => {
      const newCoeff = c * e;
      const newExp = e - 1;
      if (newExp === 0) return `${newCoeff}`;
      if (newExp === 1) return `${newCoeff}x`;
      return `${newCoeff}x${supString(newExp)}`;
    };

    const derivative = t.map(({ coeff, exp }) => deriveTerm(coeff, exp)).join(" + ");
    setAnswer(derivative);

    const wrongs = [];
    for (let i = 0; i < 3; i++) {
      const variant = t
        .map(({ coeff, exp }) => {
          const offset = Math.floor(Math.random() * 3) - 1;
          const newCoeff = (coeff + offset) * exp;
          const newExp = exp - 1;
          if (newExp === 0) return `${newCoeff}`;
          if (newExp === 1) return `${newCoeff}x`;
          return `${newCoeff}x${supString(newExp)}`;
        })
        .join(" + ");
      wrongs.push(variant);
    }

    const allChoices = [derivative, ...wrongs].sort(() => Math.random() - 0.5);
    setChoices(allChoices);
  }

  function open() { setHelp(true); }
  function close() { setHelp(false); }

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
    setTimeout(() => {
      generatePolynomial();
    }, 1000);
  }

  // 🗂 localStorage tracking
  useEffect(() => {
    const c = parseInt(window.localStorage.getItem(`${id} Cube`));
    const s = parseInt(window.localStorage.getItem(`${id} score`));
    setCount(c || 0);
    setScore(s || 0);
    setLoaded(true);
  }, [id]);

  useEffect(() => {
    if (count > 0) window.localStorage.setItem(`${id} Cube`, count);
  }, [count]);

  useEffect(() => {
    if (score > 0) window.localStorage.setItem(`${id} score`, score);
  }, [score]);

  useEffect(() => {
    if (loaded) generatePolynomial();
  }, [loaded]);

  useEffect(() => {
    if (terms.length > 0 && loaded) generateChoices(terms);
  }, [terms, loaded]);

  return (
    <div className="beige container column">
      <div className="Test sb">
        <div className="double">
          <div className="font">{username}</div>
          <div>Score: {score}</div>
          <div className="font">Derivatives: {count}</div>
        </div>
        <Link href={`/${id}/enter/testCalc`}>
          <button className="green test-btn">Test</button>
        </Link>
      </div>

      {/* Question */}
      {loaded && terms.length > 0 && (
        <div style={{margin:"8px"}} className="center">
          <div className="double center">
            {terms.map((t, i) => (
              <span key={i}>
                {i > 0 && " + "}
                {t.coeff}x{sup(t.exp)}
              </span>
            ))}
          </div>
        </div>
      )}

      <div style={{marginBottom:"8px"}} className="box">
        <button className="help" onClick={open}>help</button>
      </div>

      {help && <HelpCube close={close} />}
      {correct && <Correct />}
      {wrong && <Wrong />}

      {/* Choices */}
      {loaded && (
        <div className="box column">
          <div className="row wrap">
            {choices.map((choice, index) => (
              <Choice
                key={index}
                size="250px"
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
    </div>
  );
}

// Superscript for JSX
function sup(num) {
  const map = { 1: "", 2: "²", 3: "³", 4: "⁴", 5: "⁵" };
  return (
    <span style={{ fontSize: "18px", position: "relative", top: "-8px" }}>
      {map[num] || `^${num}`}
    </span>
  );
}

// Superscript for string display
function supString(num) {
  const map = { 1: "", 2: "²", 3: "³", 4: "⁴", 5: "⁵" };
  return map[num] || `^${num}`;
}
