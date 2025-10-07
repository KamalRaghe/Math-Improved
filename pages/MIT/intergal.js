import { useEffect, useState } from "react";
import Choice from "@/components/choice";
import Correct from "@/components/correct";
import Wrong from "@/components/wrong";
import Link from "next/link";
import { useRouter } from "next/router";

export default function IntegralDiffExp() {
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

  // 🎲 Generate 3-term polynomial
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

  // 🧮 Generate correct integral + wrong answers
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

  // ✅ Buttons and feedback
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
    setTimeout(() => generatePolynomial(), 1000);
  }

  // 🗂 localStorage tracking
  useEffect(() => {
    const c = parseInt(window.localStorage.getItem(`${id} Cube`));
    const s = parseInt(window.localStorage.getItem(`${id} score`));
    setCount(c || 0);
    setScore(s || 0);
    setLoaded(true);
  }, [id]);

  useEffect(() => { if (count > 0) window.localStorage.setItem(`${id} Cube`, count); }, [count]);
  useEffect(() => { if (score > 0) window.localStorage.setItem(`${id} score`, score); }, [score]);

  useEffect(() => { if (loaded) generatePolynomial(); }, [loaded]);
  useEffect(() => { if (terms.length > 0 && loaded) generateChoices(terms); }, [terms, loaded]);

  return (
    <div className="beige container column">
      <div className="Test sb">
        <div className="double">
          <div className="font">{username}</div>
          <div>Score: {score}</div>
          <div className="font">Integrals: {count}</div>
        </div>
        <Link href={`/MIT/intergalTest`}>
          <button className="green test-btn">Test</button>
        </Link>
      </div>

      {/* Question */}
      {loaded && terms.length > 0 && (
        <div style={{ marginTop: "8px" }} className="center">
          <div style={{fontSize:"25px"}} className="center">
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
        <button style={{ marginBottom: "16px" }} className="help" onClick={open}>help</button>
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
    </div>
  );
}

// Superscript display
function sup(num) {
  const map = { 1: "", 2: "²", 3: "³", 4: "⁴", 5: "⁵", 6: "⁶", 7: "⁷", 8: "⁸", 9: "⁹", 10: "¹⁰" };
  return <span style={{ fontSize: "30px", position: "relative", top: "-8px" }}>{map[num] || map[num]}</span>;
}

function supString(num) {
  const map = { 1: "", 2: "²", 3: "³", 4: "⁴", 5: "⁵", 6: "⁶", 7: "⁷", 8: "⁸", 9: "⁹", 10: "¹⁰" };
  return map[num] || map[num];
}
