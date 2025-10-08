import { useEffect, useState } from "react";
import Choice from "@/components/choice";
import Correct from "@/components/correct";
import Wrong from "@/components/wrong";
import Link from "next/link";
import { useRouter } from "next/router";
import StepLimit from "@/components/limits";

export default function LimitDiffExp() {
  const [help, setHelp] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [correct, setCorrect] = useState(false);
  const [wrong, setWrong] = useState(false);

  const router = useRouter();
  const { username, id } = router.query;

  const [score, setScore] = useState(0);
  const [count, setCount] = useState(0);

  // Explicit term variables
  const [num1, setNum1] = useState(0); // coeff1
  const [num2, setNum2] = useState(0); // exp1
  const [num3, setNum3] = useState(0); // coeff2
  const [num4, setNum4] = useState(0); // exp2
  const [num5, setNum5] = useState(0); // coeff3
  const [num6, setNum6] = useState(0); // exp3
  const [xValue, setXValue] = useState(0);

  const [choices, setChoices] = useState([]);
  const [answer, setAnswer] = useState("");

  // 🎲 Generate explicit variables
  function generateQuestion() {
    setNum1(Math.ceil(Math.random() * 8)); // 1–8
    setNum2(Math.ceil(Math.random() * 3 + 1)); // 2–4
    setNum3(Math.ceil(Math.random() * 8));
    setNum4(Math.ceil(Math.random() * 3 + 1));
    setNum5(Math.ceil(Math.random() * 8));
    setNum6(Math.ceil(Math.random() * 3 + 1));
    setXValue(Math.floor(Math.random() * 6) - 2); // -2 to 3
  }

  // 🧮 Compute limit + random wrongs
  function generateChoices() {
    const fx =
      num1 * Math.pow(xValue, num2) +
      num3 * Math.pow(xValue, num4) +
      num5 * Math.pow(xValue, num6);
    const correctAnswer = `${fx}`;
    setAnswer(correctAnswer);

    const wrongs = new Set();
    while (wrongs.size < 4) {
      const variation = fx + Math.floor(Math.random() * 10 - 5);
      if (variation !== fx) wrongs.add(`${variation}`);
    }
    const allChoices = [correctAnswer, ...Array.from(wrongs)].sort(
      () => Math.random() - 0.5
    );
    setChoices(allChoices);
  }

  function open() { setHelp(true); }
  function close() { setHelp(false); }

  function CorrectA() {
    setCorrect(true);
    setTimeout(() => setCorrect(false), 1000);
    setCount((p) => p + 1);
    setScore((p) => p + 1);
  }

  function WrongA() {
    setWrong(true);
    setTimeout(() => setWrong(false), 1000);
  }

  function nextQuestion() {
    setTimeout(() => generateQuestion(), 1000);
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
    if (loaded) generateQuestion();
  }, [loaded]);

  useEffect(() => {
    if (loaded && num1 && num3 && num5) generateChoices();
  }, [num1, num2, num3, num4, num5, num6, xValue, loaded]);

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
      {loaded && (
        <div className="center" style={{ marginTop: "8px" }}>
          <div className="center" style={{ fontSize: "30px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ fontSize: "40px" }}>lim</span>
              <span style={{ fontSize: "26px", position: "relative", top: "6px" }}>
                (x → {xValue})
              </span>
              <span style={{ marginLeft: "8px" }}>
                {num1}x{sup(num2)} + {num3}x{sup(num4)} + {num5}x{sup(num6)}
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

      {/* Step-by-step help */}
      {help && (
        <StepLimit
          close={close}
          num1={num1}
          num2={num2}
          num3={num3}
          num4={num4}
          num5={num5}
          num6={num6}
          xValue={xValue}
        />
      )}

      {correct && <Correct />}
      {wrong && <Wrong />}

      {/* Choices */}
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

// Superscript display
function sup(num) {
  const map = {
    1: "", 2: "²", 3: "³", 4: "⁴", 5: "⁵",
    6: "⁶", 7: "⁷", 8: "⁸", 9: "⁹"
  };
  return <span style={{ fontSize: "34px", position: "relative", top: "-8px" }}>{map[num] || num}</span>;
}
