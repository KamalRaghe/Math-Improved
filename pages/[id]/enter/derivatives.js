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

  const [num1, setNum1] = useState(Math.ceil(Math.random() * 8 + 1));
  const [num2, setNum2] = useState(Math.ceil(Math.random() * 8 + 1));
  const [num3, setNum3] = useState(Math.ceil(Math.random() * 8 + 1));
  const [num4, setNum4] = useState(Math.ceil(Math.random() * 8 + 1));

  const [exp1, setExp1] = useState(Math.ceil(Math.random() * 3 + 1));
  const [exp2, setExp2] = useState(Math.ceil(Math.random() * 3 + 1));
  const [exp3, setExp3] = useState(Math.ceil(Math.random() * 3 + 1));
  const [exp4, setExp4] = useState(Math.ceil(Math.random() * 3 + 1));

  const [choices, setChoices] = useState([]);
  const [answer, setAnswer] = useState("");

  const router = useRouter();
  const { username, id } = router.query;

  const [score, setScore] = useState(0);
  const [count, setCount] = useState(0);

  // 🧮 Compute derivative and generate choices
  function generateQuestion() {
    // derivative: n * coeff * x^(n-1)
    const term1 = `${num1 * exp1}x${supString(exp1 - 1)}`;
    const term2 = `${num2 * exp2}x${supString(exp2 - 1)}`;
    const term3 = `${num3 * exp3}x${supString(exp3 - 1)}`;
    const term4 = `${num4 * exp4}x${supString(exp4 - 1)}`;
    const correctAnswer = `${term1} + ${term2} + ${term3} + ${term4}`;
    setAnswer(correctAnswer);

    // generate wrong answers by small random changes
    const wrongs = [];
    for (let i = 0; i < 3; i++) {
      const delta = () => (Math.random() < 0.5 ? -1 : 1) * Math.ceil(Math.random() * 2);
      const t1 = `${(num1 + delta()) * exp1}x${supString(exp1 - 1)}`;
      const t2 = `${(num2 + delta()) * exp2}x${supString(exp2 - 1)}`;
      const t3 = `${(num3 + delta()) * exp3}x${supString(exp3 - 1)}`;
      const t4 = `${(num4 + delta()) * exp4}x${supString(exp4 - 1)}`;
      wrongs.push(`${t1} + ${t2} + ${t3} + ${t4}`);
    }

    const mixed = [correctAnswer, ...wrongs].sort(() => Math.random() - 0.5);
    setChoices(mixed);
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
      setNum1(Math.ceil(Math.random() * 8 + 1));
      setNum2(Math.ceil(Math.random() * 8 + 1));
      setNum3(Math.ceil(Math.random() * 8 + 1));
      setNum4(Math.ceil(Math.random() * 8 + 1));
      setExp1(Math.ceil(Math.random() * 3 + 1));
      setExp2(Math.ceil(Math.random() * 3 + 1));
      setExp3(Math.ceil(Math.random() * 3 + 1));
      setExp4(Math.ceil(Math.random() * 3 + 1));
    }, 1000);
  }

  // localStorage tracking
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
    if (loaded) generateQuestion();
  }, [num1, num2, num3, num4, exp1, exp2, exp3, exp4, loaded]);

  return (
    <div className="beige container column">
      <div className="Test sb">
        <div className="double">
          <div className="font">{username}</div>
          <div>Score: {score}</div>
          <div className="font">Cube: {count}</div>
        </div>
        <Link href={`/${id}/enter/testCube`}>
          <button className="green test-btn">Test</button>
        </Link>
      </div>

      {/* Equation */}
      {loaded && (
        <div className="box center">
          <div className="double center">
            {num1}x{sup(exp1)} + {num2}x{sup(exp2)} + {num3}x{sup(exp3)} + {num4}x{sup(exp4)}
          </div>
        </div>
      )}

      <div className="box">
        <button className="help" onClick={open}>help</button>
      </div>

      {help && <HelpCube num1={num1} close={close} />}
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

// helper for exponent rendering in JSX
function sup(num) {
  if (num === 0) return "";
  return (
    <span style={{ fontSize: "18px", position: "relative", top: "-8px" }}>
      {num === 1 ? "" : num === 2 ? "²" : num === 3 ? "³" : `^${num}`}
    </span>
  );
}

// helper for text exponents (used in string answer comparisons)
function supString(num) {
  if (num === 0) return "";
  return num === 1 ? "" : num === 2 ? "²" : num === 3 ? "³" : `^${num}`;
}
