import { useEffect, useState } from "react";
import Choice from "@/components/choice";
import Correct from "@/components/correct";
import Wrong from "@/components/wrong";
import HelpCube from "@/components/cubehelp";
import Link from "next/link";
import { useRouter } from "next/router";

export default function DerivativeAdd() {
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

  // 🎲 Generate random polynomial (4 terms)
  function generatePolynomial() {
    const t = [];
    const usedExponents = new Set();

    // make sure all exponents are unique
    while (t.length < 4) {
      const coeff = Math.ceil(Math.random() * 8 + 1);
      const exp = Math.ceil(Math.random() * 4 + 1);
      if (!usedExponents.has(exp)) {
        usedExponents.add(exp);
        t.push({ coeff, exp });
      }
    }

    // sort from biggest exponent → smallest
    t.sort((a, b) => b.exp - a.exp);
    setTerms(t);
  }

  // 🧮 Compute derivative & generate 3 wrong choices
  function generateChoices(t) {
    // compute correct derivative
    const correct = t
      .map(({ coeff, exp }) => {
        if (exp === 0) return null;
        const newCoeff = coeff * exp;
        const newExp = exp - 1;
        if (newExp === 0) return `${newCoeff}`;
        return `${newCoeff}x${supString(newExp)}`;
      })
      .filter(Boolean)
      .join(" + ");

    setAnswer(correct);

    // generate wrong answers
    const wrongs = [];
    for (let i = 0; i < 3; i++) {
      const wrong = t
        .map(({ coeff, exp }) => {
          if (exp === 0) return null;
          const newCoeff = (coeff + (Math.random() < 0.5 ? -1 : 1)) * exp;
          const newExp = exp - 1;
          if (newExp === 0) return `${newCoeff}`;
          return `${newCoeff}x${supString(newExp)}`;
        })
        .filter(Boolean)
        .join(" + ");
      wrongs.push(wrong);
    }

    const mixed = [correct, ...wrongs].sort(() => Math.random() - 0.5);
    setChoices(mixed);
  }

  function open() {
    setHelp(true);
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
    setTimeout(() => {
      generatePolynomial();
    }, 1000);
  }

  // 📦 Local storage tracking
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

  // 🔁 Generate new question when polynomial changes
  useEffect(() => {
    if (loaded && terms.length > 0) {
      generateChoices(terms);
    }
  }, [terms, loaded]);

  useEffect(() => {
    if (loaded) generatePolynomial();
  }, [loaded]);

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
        <div className="box center">
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

      <div className="box">
        <button className="help" onClick={open}>
          help
        </button>
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
                size="270px"
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

// Helper to render exponent in JSX
function sup(num) {
  if (num === 0) return "";
  return (
    <span style={{ fontSize: "18px", position: "relative", top: "-8px" }}>
      {num === 1 ? "" : num === 2 ? "²" : num === 3 ? "³" : `^${num}`}
    </span>
  );
}

// Helper for string-based answers
function supString(num) {
  if (num === 0) return "";
  return num === 1 ? "" : num === 2 ? "²" : num === 3 ? "³" : `^${num}`;
}
