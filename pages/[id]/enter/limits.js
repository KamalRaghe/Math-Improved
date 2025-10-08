import { useEffect, useState } from "react";
import Choice from "@/components/choice";
import Correct from "@/components/correct";
import Wrong from "@/components/wrong";
 // 👈 you'll create this like your ExtraDerivative
import Link from "next/link";
import { useRouter } from "next/router";
import Limits from "@/components/limits";

export default function LimitDiffExp() {
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
  const [xValue, setXValue] = useState(0);

  const [arrayC, setArrayC] = useState([])
  const [arrayE, setArrayE] = useState([])

  // 🎲 Generate polynomial and limit point
  function generatePolynomial() {
    const usedExponents = new Set();
    const newTerms = [];

    while (newTerms.length < 3) {
      const exp = Math.ceil(Math.random() * 7 + 1); // 2–4 power range
      if (!usedExponents.has(exp)) {
        usedExponents.add(exp);
        const coeff = Math.ceil(Math.random() * 8); // 1–8
        newTerms.push({ coeff, exp });
      }
    }

    // Sort descending
    newTerms.sort((a, b) => b.exp - a.exp);

    // Random x-value for limit
    const value = Math.floor(Math.random() * 6) - 2; // -2 to 3
    setXValue(value);
    setTerms(newTerms);
  }

  // 🧮 Compute limit + wrong choices
  function generateChoices(t, x) {
    if (t.length === 0) return;

    const fx = t.reduce((sum, { coeff, exp }) => sum + coeff * Math.pow(x, exp), 0);
    const correctAnswer = `${fx}`; // ✅ just the number, no "L ="
    setAnswer(correctAnswer);

    const wrongs = new Set();
    while (wrongs.size < 4) { // ✅ 4 wrong + 1 correct = 5 total
        const variation = fx + Math.floor(Math.random() * 10 - 5); // ±5 range
        if (variation !== fx) wrongs.add(`${variation}`);
    }

    const allChoices = [correctAnswer, ...Array.from(wrongs)].sort(() => Math.random() - 0.5);
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
    const c = parseInt(window.localStorage.getItem(`${id} Limit`));
    const s = parseInt(window.localStorage.getItem(`${id} score`));
    setCount(c || 0);
    setScore(s || 0);
    setLoaded(true);
  }, [id]);

  useEffect(() => {
    if (count > 0) window.localStorage.setItem(`${id} Limit`, count);
  }, [count]);

  useEffect(() => {
    if (score > 0) window.localStorage.setItem(`${id} score`, score);
  }, [score]);

  useEffect(() => {
    if (loaded) generatePolynomial();
  }, [loaded]);

  useEffect(() => {
    if (terms.length > 0 && loaded) generateChoices(terms, xValue);
  }, [terms, xValue, loaded]);

  useEffect(() => {
  if (terms.length > 0) {
    const [t1, t2, t3] = terms;
    const { coeff: c1, exp: e1 } = t1;
    const { coeff: c2, exp: e2 } = t2;
    const { coeff: c3, exp: e3 } = t3;

    setArrayC([c1,c2,c3])
    setArrayE([e1,e2,e3])
  }
}, [terms]);


  return (
    <div className="beige container column">
      <div className="Test sb">
        <div className="double">
          <div className="font">{username}</div>
          <div>Score: {score}</div>
          <div className="font">Limits: {count}</div>
        </div>
        <Link href={`/${id}/enter/limitsTest`}>
          <button className="green test-btn">Test</button>
        </Link>
      </div>

      {/* Question */}
    {loaded && terms.length > 0 && (
    <div style={{ marginTop: "8px" }} className="center">
    <div className="center" style={{ fontSize: "30px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <span style={{ fontSize: "40px"}}>lim</span>
        <span
          style={{
            fontSize: "26px",
            position: "relative",
            top: "6px",
            fontWeight: "500",
          }}
        >
          (x → {xValue})
        </span>
        <span style={{ marginLeft: "8px" }}>
          {terms.map((t, i) => (
            <span key={i}>
              {i > 0 && " + "}
              {t.coeff}x{sup(t.exp)}
            </span>
          ))}
        </span>
      </div>
    </div>
  </div>
)}

      <div className="box">
        <button style={{ marginBottom: "16px" }} className="help" onClick={open}>
          help
        </button>
      </div>

      {help && <Limits close={close} c = {arrayC} e = {arrayE} x =  {xValue}/>}
      {correct && <Correct />}
      {wrong && <Wrong />}

    {/* Choices (2 rows, 5 total) */}
{loaded && (
  <div className="box column center">
    <div className="row">
      {choices.slice(0, 3).map((choice, index) => (
        <Choice
          key={index}
          title={choice}
          value={choice}
          answer={answer}
          doSomething={nextQuestion}
          Correct={CorrectA}
          Wrong={WrongA}
        />
      ))}
    </div>
    <div className="row">
      {choices.slice(3, 5).map((choice, index) => (
        <Choice
          key={index + 3}
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
  const map = {
    1: "", 2: "²", 3: "³", 4: "⁴", 5: "⁵",
    6: "⁶", 7: "⁷", 8: "⁸", 9: "⁹"
  };
  return (
    <span style={{ fontSize: "34px", position: "relative", top: "-8px" }}>
      {map[num] || num}
    </span>
  );
}
