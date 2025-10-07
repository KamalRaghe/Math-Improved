import { useEffect, useState } from "react";
import Choice from "@/components/choice";
import Heart from "@/components/heart";
import Heart1 from "@/components/heart1";
import Heart2 from "@/components/heart2";
import Heart3 from "@/components/heart3";
import Timeout from "@/components/timeout";
import Pass from "@/components/pass";
import Mistake from "@/components/mistake";
import { useRouter } from "next/router";
import StepLimit from "@/components/limits";

export default function LimitTest() {
  const [loaded, setLoaded] = useState(false);
  const [correct, setCorrect] = useState(false);
  const [wrong, setWrong] = useState(false);
  const [mistake, setMistake] = useState(0);
  const [count, setCount] = useState(0);
  const [score, setScore] = useState(0);
  const [help, setHelp] = useState(false);
  const [again, setAgain] = useState(false);

  const [terms, setTerms] = useState([]);
  const [xValue, setXValue] = useState(0);
  const [choices, setChoices] = useState([]);
  const [answer, setAnswer] = useState("");
  const [time, setTime] = useState(300000 + Date.now()); // 5 minutes
  const [date, setDate] = useState(Date.now());

  const router = useRouter();
  const { id, username } = router.query;

  // 🎲 Generate polynomial & limit point
  function generatePolynomial() {
    const usedExp = new Set();
    const newTerms = [];
    while (newTerms.length < 3) {
      const exp = Math.ceil(Math.random() * 3 + 1);
      if (!usedExp.has(exp)) {
        usedExp.add(exp);
        const coeff = Math.ceil(Math.random() * 8);
        newTerms.push({ coeff, exp });
      }
    }
    newTerms.sort((a, b) => b.exp - a.exp);
    const val = Math.floor(Math.random() * 6) - 2; // -2 to 3
    setXValue(val);
    setTerms(newTerms);
  }

  // 🧮 Generate choices (5 total)
  function generateChoices(t, x) {
    const fx = t.reduce((sum, { coeff, exp }) => sum + coeff * Math.pow(x, exp), 0);
    const correctAns = `${fx}`;
    setAnswer(correctAns);
    const wrongs = new Set();
    while (wrongs.size < 4) {
      const variation = fx + Math.floor(Math.random() * 10 - 5);
      if (variation !== fx) wrongs.add(`${variation}`);
    }
    const all = [correctAns, ...Array.from(wrongs)].sort(() => Math.random() - 0.5);
    setChoices(all);
  }

  function update() {
    setDate(requestAnimationFrame(update));
  }

  function cancel() {
    setDate(cancelAnimationFrame(date));
  }

  // ✅ Correct answer
  function CorrectA() {
    setCorrect(true);
    setTimeout(() => setCorrect(false), 1000);
    setCount((p) => p + 1);
    setScore((p) => p + 1);
    nextQuestion();
  }

  // ❌ Wrong answer
  function WrongA() {
    setWrong(true);
    setMistake((m) => m + 1);
    setTimeout(() => setWrong(false), 1000);
  }

  function nextQuestion() {
    setTimeout(() => {
      generatePolynomial();
    }, 800);
  }

  function Again() {
    setAgain(true);
    setMistake(0);
    setCount(0);
    setScore(0);
    setTime(300000 + Date.now());
    setLoaded(true);
  }

  function open() { setHelp(true); }
  function close() { setHelp(false); }

  // 🧠 Setup
  useEffect(() => {
    setLoaded(true);
    update();
  }, []);

  useEffect(() => {
    if (loaded) generatePolynomial();
  }, [loaded]);

  useEffect(() => {
    if (terms.length > 0) generateChoices(terms, xValue);
  }, [terms, xValue]);

  useEffect(() => {
    if (mistake >= 3 || time - Date.now() < 0 || count >= 25) {
      setLoaded(false);
      cancel();
    }
  });

  useEffect(() => {
    if (again) setAgain(false);
  }, [again]);

  return (
    <div className="beige container column">
      <div className="double">Questions left: {25 - count}</div>

      <div className="inTest">
        <div className="Red relative">
          {mistake === 0 && <Heart />}
          {mistake === 1 && <Heart1 />}
          {mistake === 2 && <Heart2 />}
          {mistake === 3 && <Heart3 />}
        </div>
        {loaded && time - Date.now() > 0 && count < 25 && (
          <div>
            {Math.floor(((time - Date.now()) % (1000 * 60 * 60)) / 1000 / 60)}m{" "}
            {Math.floor(((time - Date.now()) % (1000 * 60)) / 1000)}s
          </div>
        )}
      </div>

      {/* Question */}
    {loaded && terms.length > 0 && (
  <div className="center" style={{ marginTop: "12px", textAlign: "center" }}>
    <div style={{ fontSize: "42px", fontWeight: "600", lineHeight: "1" }}>
      lim
    </div>
    <div style={{ fontSize: "26px", marginTop: "-6px" }}>
      (x → {xValue})
    </div>
    <div style={{ fontSize: "34px", marginTop: "6px" }}>
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

      {help && <StepLimit close={close} terms={terms} xValue={xValue} />}

      {/* Feedback overlays */}
      {correct && <div className="Green center bold">✅ Correct</div>}
      {wrong && <div className="Red center bold">❌ Wrong</div>}
      {time - Date.now() < 0 && <Timeout again={Again} />}
      {mistake === 3 && <Mistake again={Again} />}
      {count === 25 && <Pass time={300000 - (time - Date.now())} />}

      {/* Choices */}
      <div className="box column center">
        <div className="row">
          {loaded &&
            choices.slice(0, 3).map((c, i) => (
              <Choice
                key={i}
                value={c}
                answer={answer}
                doSomething={nextQuestion}
                Correct={CorrectA}
                Wrong={WrongA}
              />
            ))}
        </div>
        <div className="row">
          {loaded &&
            choices.slice(3, 5).map((c, i) => (
              <Choice
                key={i + 3}
                value={c}
                answer={answer}
                doSomething={nextQuestion}
                Correct={CorrectA}
                Wrong={WrongA}
              />
            ))}
        </div>
      </div>
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
