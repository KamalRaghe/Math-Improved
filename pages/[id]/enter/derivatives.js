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

  const [num1, setNum1] = useState(Math.ceil(Math.random() * 8 + 1));
  const [num2, setNum2] = useState(Math.ceil(Math.random() * 8 + 1));
  const [num3, setNum3] = useState(Math.ceil(Math.random() * 8 + 1));
  const [num4, setNum4] = useState(Math.ceil(Math.random() * 8 + 1));

  const [ex1, setEx1] = useState(Math.ceil(Math.random() * 2 + 1));
  const [ex2, setEx2] = useState(Math.ceil(Math.random() * 2 + 1));
  const [ex3, setEx3] = useState(Math.ceil(Math.random() * 2 + 1));
  const [ex4, setEx4] = useState(Math.ceil(Math.random() * 2 + 1));

  const [choices, setChoices] = useState([]);
  const [answer, setAnswer] = useState("");
  const router = useRouter();
  const { username, id } = router.query;

  const [score, setScore] = useState(0);
  const [count, setCount] = useState(0);

  // ✅ Calculate correct total and generate choices
  function generateQuestion() {
    const total = num1 + num2 + num3 + num4;
    const exp = ex1; // all same for simplicity

    const correctAnswer = `${total}𝑥${exp > 1 ? `ⁿ(${exp})` : ""}`; 
    setAnswer(correctAnswer);

    // make 3 random offsets
    const wrong1 = `${total + (Math.floor(Math.random() * 3) + 1)}𝑥${exp > 1 ? `ⁿ(${exp})` : ""}`;
    const wrong2 = `${total - (Math.floor(Math.random() * 3) + 1)}𝑥${exp > 1 ? `ⁿ(${exp})` : ""}`;
    const wrong3 = `${total + (Math.floor(Math.random() * 4) - 2)}𝑥${exp > 1 ? `ⁿ(${exp})` : ""}`;

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
  }

  function WrongA() {
    setWrong(true);
    setTimeout(() => setWrong(false), 1500);
  }

  // next question
  function nextQuestion() {
    setTimeout(() => {
      setNum1(Math.ceil(Math.random() * 8 + 1));
      setNum2(Math.ceil(Math.random() * 8 + 1));
      setNum3(Math.ceil(Math.random() * 8 + 1));
      setNum4(Math.ceil(Math.random() * 8 + 1));
      setEx1(Math.ceil(Math.random() * 2 + 1));
      setEx2(Math.ceil(Math.random() * 2 + 1));
      setEx3(Math.ceil(Math.random() * 2 + 1));
      setEx4(Math.ceil(Math.random() * 2 + 1));
    }, 1200);
  }

  // localStorage tracking
  useEffect(() => {
    const c = parseInt(window.localStorage.getItem(`${id} Cube`));
    const s = parseInt(window.localStorage.getItem(`${id} score`));
    setCount(c ? c : 0);
    setScore(s ? s : 0);
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
  }, [num1, num2, num3, num4, ex1, ex2, ex3, ex4]);

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
      {loaded && <div className="box">
        <div className="double center">
          {num1}𝑥{sup(ex1)} + {num2}𝑥{sup(ex2)} + {num3}𝑥{sup(ex3)} + {num4}𝑥{sup(ex4)}
        </div>
      </div>}

      <div className="box">
        <button className="help" onClick={open}>help</button>
      </div>

      {help && <HelpCube num1={num1} close={close} />}
      {correct && <Correct />}
      {wrong && <Wrong />}

      {/* Choices */}
      {<div className="box column">
        <div className="row wrap">
          {choices.map((choice, index) => (
            <Choice
              key={index}
              size="130px"
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
      </div>}
    </div>
  );
}

// helper to render exponent
function sup(num) {
  return <span style={{ fontSize: "20px", position: "relative", top: "-10px" }}>{num}</span>;
}
