import { useEffect, useState } from "react";
import Choice from "@/components/choice";
import Correct from "@/components/correct";
import Wrong from "@/components/wrong";
import HelpCube from "@/components/cubehelp";
import Link from "next/link";
import { useRouter } from "next/router";

export default function DoubleAdd() {
  const [help, setHelp] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [correct, setCorrect] = useState(false);
  const [wrong, setWrong] = useState(false);

  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [num3, setNum3] = useState(0);
  const [num4, setNum4] = useState(0);

  const [ex1, setEx1] = useState(0);
  const [ex2, setEx2] = useState(0);
  const [ex3, setEx3] = useState(0);
  const [ex4, setEx4] = useState(0);

  const [choices, setChoices] = useState([]);
  const [answer, setAnswer] = useState("");
  const router = useRouter();
  const { username, id } = router.query;

  const [score, setScore] = useState(0);
  const [count, setCount] = useState(0);

  // ✅ Generate question with increasing exponents
  function generateQuestion() {
    const n1 = Math.ceil(Math.random() * 8 + 1);
    const n2 = Math.ceil(Math.random() * 8 + 1);
    const n3 = Math.ceil(Math.random() * 8 + 1);
    const n4 = Math.ceil(Math.random() * 8 + 1);

    // Exponents: biggest one is double the smallest
    const baseExp = Math.ceil(Math.random() * 2 + 1); // 2–3
    const e1 = baseExp;
    const e2 = e1 + 1;
    const e3 = e1 + 2;
    const e4 = e1 * 2; // last one is double

    setNum1(n1); setNum2(n2); setNum3(n3); setNum4(n4);
    setEx1(e1); setEx2(e2); setEx3(e3); setEx4(e4);

    // derivative for each term
    const d1 = `${n1 * e1}x${superscript(e1 - 1)}`;
    const d2 = `${n2 * e2}x${superscript(e2 - 1)}`;
    const d3 = `${n3 * e3}x${superscript(e3 - 1)}`;
    const d4 = `${n4 * e4}x${superscript(e4 - 1)}`;

    const correctAnswer = `${d1} + ${d2} + ${d3} + ${d4}`;
    setAnswer(correctAnswer);

    // random wrong answers
    const wrong1 = `${n1 * e1 + 1}x${superscript(e1 - 1)} + ${n2 * e2}x${superscript(e2 - 1)} + ${n3 * e3}x${superscript(e3 - 1)} + ${n4 * e4}x${superscript(e4 - 1)}`;
    const wrong2 = `${n1 * e1}x${superscript(e1)} + ${n2 * e2}x${superscript(e2 - 1)} + ${n3 * e3}x${superscript(e3 - 1)} + ${n4 * e4}x${superscript(e4 - 1)}`;
    const wrong3 = `${n1 * e1}x${superscript(e1 - 1)} + ${n2 * e2}x${superscript(e2 - 1)} + ${n3 * e3 + 2}x${superscript(e3 - 1)} + ${n4 * e4}x${superscript(e4 - 1)}`;

    const mixed = [correctAnswer, wrong1, wrong2, wrong3].sort(() => Math.random() - 0.5);
    setChoices(mixed);
  }

  function open() { setHelp(true); }
  function close() { setHelp(false); }

  function CorrectA() {
    setCorrect(true);
    setTimeout(() => setCorrect(false), 1500);
    setCount(prev => prev + 1);
    setScore(prev => prev + 1);
    nextQuestion();
  }

  function WrongA() {
    setWrong(true);
    setTimeout(() => setWrong(false), 1500);
    nextQuestion();
  }

  function nextQuestion() {
    setTimeout(() => generateQuestion(), 1500);
  }

  // localStorage
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
  }, [loaded]);

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

      {loaded && (
        <div className="box center">
          <div className="font large">
            {num1}x{superscript(ex1)} + {num2}x{superscript(ex2)} + {num3}x{superscript(ex3)} + {num4}x{superscript(ex4)}
          </div>
        </div>
      )}

      <div className="box">
        <button className="help" onClick={open}>help</button>
      </div>

      {help && <HelpCube num1={num1} close={close} />}
      {correct && <Correct />}
      {wrong && <Wrong />}

      <div className="box column">
        <div className="row wrap center">
          {choices.map((choice, index) => (
            <Choice
              key={index}
              size="150px"
              big
              title={choice}
              value={choice}
              answer={answer}
              doSomething={() => {}}
              Correct={CorrectA}
              Wrong={WrongA}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// helper for superscript
function superscript(num) {
  const map = { 0: "⁰", 1: "¹", 2: "²", 3: "³", 4: "⁴", 5: "⁵", 6: "⁶", 7: "⁷", 8: "⁸", 9: "⁹" };
  return num.toString().split("").map(n => map[n] || "").join("");
}
