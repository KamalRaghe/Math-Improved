import { useEffect, useState } from "react";
import Choice from "@/components/choice";
import Correct from "@/components/correct";
import Wrong from "@/components/wrong";
import HelpCube from "@/components/cubehelp";
import Link from "next/link";
import { useRouter } from "next/router";

export default function DerivativeSameExp() {
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

  // 🎲 Generate random polynomial (4 terms, same exponent)
  function generatePolynomial() {
    const exponent = Math.random() < 0.5 ? 2 : 3; // all same exponent: 2 or 3
    const t = [];

    for (let i = 0; i < 4; i++) {
      const coeff = Math.ceil(Math.random() * 8 + 1);
      t.push({ coeff, exp: exponent });
    }

    setTerms(t);
  }

  // 🧮 Compute derivative & choices
  function generateChoices(t) {
    if (t.length === 0) return;

    const exp = t[0].exp;
    const totalCoeff = t.reduce((sum, { coeff }) => sum + coeff, 0);

    const correct =
      exp === 1
        ? `${totalCoeff}`
        : `${totalCoeff * exp}x${supString(exp - 1)}`;

    setAnswer(correct);

    // generate 3 wrong choices (slightly off)
    const wrongs = [];
    for (let i = 0; i < 3; i++) {
      const wrongCoeff = totalCoeff * exp + (Math.random() < 0.5 ? -exp : exp);
      const wrong =
        exp === 1
          ? `${wrongCoeff}`
          : `${wrongCoeff}x${supString(exp - 1)}`;
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

  // 📦 Local storage
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

  // generate choices when polynomial changes
  useEffect(() => {
    if (loaded && terms.length > 0) generateChoices(terms);
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
                size="150px"
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

// Helper: JSX superscript
function sup(num) {
  if (num === 0) return "";
  return (
    <span style={{ fontSize: "18px", position: "relative", top: "-8px" }}>
      {num === 1 ? "" : num === 2 ? "²" : num === 3 ? "³" : `^${num}`}
    </span>
  );
}

// Helper: string superscript
function supString(num) {
  if (num === 0) return "";
  return num === 1 ? "" : num === 2 ? "²" : num === 3 ? "³" : `^${num}`;
}
