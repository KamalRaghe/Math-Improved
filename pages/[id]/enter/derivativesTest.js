import { useEffect, useState } from "react";
import Choice from "@/components/choice";
import Correct from "@/components/correct";
import Wrong from "@/components/wrong";
import ExtraDerivative from "@/components/derivatives";
import Timeout from "@/components/timeout";
import Pass from "@/components/pass";
import Mistake from "@/components/mistake";
import Heart from "@/components/heart";
import Heart1 from "@/components/heart1";
import Heart2 from "@/components/heart2";
import Heart3 from "@/components/heart3";
import { useRouter } from "next/router";

export default function DerivativeTest() {
  const [help, setHelp] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [correct, setCorrect] = useState(false);
  const [wrong, setWrong] = useState(false);

  const [terms, setTerms] = useState([]);
  const [choices, setChoices] = useState([]);
  const [answer, setAnswer] = useState("");

  const [score, setScore] = useState(0);
  const [count, setCount] = useState(0);
  const [mistake, setMistake] = useState(0);

  const [xTime, setXTime] = useState(300000 + Date.now()); // 5 min timer
  const [date, setDate] = useState(Date.now());

  const router = useRouter();
  const { username, id } = router.query;

  // 🎲 Generate polynomial (3 terms)
  function generatePolynomial() {
    const usedExponents = new Set();
    const newTerms = [];
    while (newTerms.length < 3) {
      const exp = Math.ceil(Math.random() * 7 + 2); // 2–9
      if (!usedExponents.has(exp)) {
        usedExponents.add(exp);
        const coeff = Math.ceil(Math.random() * 7 + 1); // 1–8
        newTerms.push({ coeff, exp });
      }
    }
    newTerms.sort((a, b) => b.exp - a.exp);
    setTerms(newTerms);
  }

  // 🧮 Generate derivative choices
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
    const correctAnswer = `f'(x) = ${derivative}`;
    setAnswer(correctAnswer);

    const wrongs = [];
    for (let i = 0; i < 4; i++) {
      const variant = t
        .map(({ coeff, exp }) => {
          const offset = Math.floor(Math.random() * 3) - 1; // small variation
          const newCoeff = (coeff + offset) * exp;
          const newExp = exp - 1;
          if (newExp === 0) return `${newCoeff}`;
          if (newExp === 1) return `${newCoeff}x`;
          return `${newCoeff}x${supString(newExp)}`;
        })
        .join(" + ");
      wrongs.push(`f'(x) = ${variant}`);
    }

    const allChoices = [correctAnswer, ...wrongs].sort(() => Math.random() - 0.5);
    setChoices(allChoices);
  }

  // ✅ Correct
  function CorrectA() {
    setCorrect(true);
    setTimeout(() => setCorrect(false), 1000);
    setCount((p) => p + 1);
    setScore((p) => p + 1);
    nextQuestion();
  }

  // ❌ Wrong
  function WrongA() {
    setWrong(true);
    setMistake((m) => m + 1);
    setTimeout(() => setWrong(false), 1000);
    nextQuestion();
  }

  function nextQuestion() {
    setTimeout(() => {
      generatePolynomial();
    }, 800);
  }

  // Timer
  useEffect(() => {
    const interval = setInterval(() => setDate(Date.now()), 1000);
    return () => clearInterval(interval);
  }, []);

  // Setup
  useEffect(() => {
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) generatePolynomial();
  }, [loaded]);

  useEffect(() => {
    if (terms.length > 0) generateChoices(terms);
  }, [terms]);

  // End conditions
  useEffect(() => {
    if (mistake >= 3 || xTime - Date.now() < 0 || count >= 10) {
      setLoaded(false);
    }
  }, [mistake, count, xTime]);

  function open() { setHelp(true); }
  function close() { setHelp(false); }

  return (
    <div className="beige container column">
      <div className="double">Questions left: {10 - count}</div>

      <div className="inTest">
        <div className="Red relative">
          {mistake === 0 && <Heart />}
          {mistake === 1 && <Heart1 />}
          {mistake === 2 && <Heart2 />}
          {mistake === 3 && <Heart3 />}
        </div>
        {loaded && xTime - Date.now() > 0 && count < 10 && (
          <div>
            {Math.floor(((xTime - Date.now()) % (1000 * 60 * 60)) / 1000 / 60)}m{" "}
            {Math.floor(((xTime - Date.now()) % (1000 * 60)) / 1000)}s
          </div>
        )}
      </div>

      {/* Question */}
      {loaded && terms.length > 0 && (
        <div style={{ marginTop: "8px" }} className="center">
          <div className="center" style={{ fontSize: "30px" }}>
            f(x) = {terms.map((t, i) => (
              <span key={i}>
                {i > 0 && " + "}
                {t.coeff}x{sup(t.exp)}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="box">
        <button className="help" onClick={open}>Help</button>
      </div>

      {help && <ExtraDerivative close={close} />}
      {correct && <Correct />}
      {wrong && <Wrong />}
      {xTime - Date.now() < 0 && <Timeout again={() => setLoaded(true)} />}
      {mistake >= 3 && <Mistake again={() => {
        setMistake(0);
        setCount(0);
        setScore(0);
        setLoaded(true);
        setXTime(300000 + Date.now());
      }} />}
      {count >= 10 && <Pass time={300000 - (xTime - Date.now())} />}

      {/* Choices */}
      <div className="box column center">
        <div className="row wrap">
          {loaded && choices.map((choice, i) => (
            <Choice
              title={choice}
               size="250px"
               big  
              key={i}
              value={choice}
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

// Superscript helpers
function sup(num) {
  const map = {1:"",2:"²",3:"³",4:"⁴",5:"⁵",6:"⁶",7:"⁷",8:"⁸",9:"⁹"};
  return <span style={{ fontSize:"26px", top:"-6px", position:"relative" }}>{map[num] || num}</span>;
}
function supString(num) {
  const map = {1:"",2:"²",3:"³",4:"⁴",5:"⁵",6:"⁶",7:"⁷",8:"⁸",9:"⁹"};
  return map[num] || num;
}
