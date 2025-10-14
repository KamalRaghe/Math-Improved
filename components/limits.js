import { useEffect, useState } from "react"
import Step from "./step"
import HelpDiv from "@/components/PerfectDivision"
import HelpAdd from "@/components/HelpAdd"
import HelpTimes from "@/components/HelpTimes"
import StepTimes from "@/components/stepTimes"
import HelpMinus from "@/components/HelpMinus"
import StepAdd from "@/components/StepAdd"
import StepMinus from "@/components/StepMinus"
import ExponentCalculator from "@/limitCalc"

export default function Limits({ c, e, x, close }) {
  const [done, setDone] = useState(false)
  const [extra, setExtra] = useState(false)
  const [Q1, setQ1] = useState(0)
  const [Q2, setQ2] = useState(0)
  const [sign, setSign] = useState('+')
  const [answer, setAnswer] = useState(0)
  const [arr, setArr] = useState([])
  const [color, setColor] = useState('green')
  const [begin, setBegin] = useState(false)
  const [calc, setCalc] = useState(true)

  // compute the limit result
  useEffect(() => {
    const result =
      c[0] * Math.pow(x, e[0]) +
      c[1] * Math.pow(x, e[1]) +
      c[2] * Math.pow(x, e[2])

    setAnswer(result)
    setQ1(c[0] * Math.pow(x, e[0]))
    setQ2(c[1] * Math.pow(x, e[1]))
    setSign('+')

    // random offsets for choices
    const newArr = [0, 1, -1, 2].sort(() => Math.random() - 0.5)
    setArr(newArr)
  }, [c, e, x])

  function Count() {
    setDone(true)
    setTimeout(() => close(), 700)
  }

  function Extra() {
    setExtra(false)
  }

  function Nothing() {}

  function handleBegin() {
    setBegin(true)
    setColor("black")
  }

  return (
    <div className="Help column" style={{ zIndex: "50" }}>
      <div className="cancel">
        <button className="cancel-btn" onClick={close}>X</button>
      </div>

      {/* --- HELP COMPONENTS --- */}
      {extra && sign === '+' && Q1 < 10 && Q2 < 10 && <HelpAdd close={Extra} num1={Q1} num2={Q2} />}
      {extra && sign === '+' && (Q1 >= 10 || Q2 >= 10) && <StepAdd close={Extra} num1={Q1} num2={Q2} />}
      {extra && sign === 'x' && Q1 < 10 && Q2 < 10 && <HelpTimes close={Extra} num1={Q1} num2={Q2} />}
      {extra && sign === 'x' && (Q1 >= 10 || Q2 >= 10) && <StepTimes close={Extra} num1={Q1} num2={Q2} />}
      {extra && sign === '-' && Q1 < 10 && Q2 < 10 && <HelpMinus close={Extra} num1={Q1} num2={Q2} />}
      {extra && sign === '-' && (Q1 >= 10 || Q2 >= 10) && <StepMinus close={Extra} num1={Q1} num2={Q2} />}
      {extra && sign === '÷' && <HelpDiv close={Extra} num1={Q1} num2={Q2} />}

      {/* --- LIMIT EXPRESSION --- */}
      <div
        className="carry"
        onClick={handleBegin}
        style={{
          fontSize: "30px",
          color: color,
          cursor: "pointer",
          textAlign: "center",
          marginBottom: "20px",
        }}
      >
        <span style={{ fontSize: "40px" }}>lim</span>
        <span style={{ fontSize: "26px", position: "relative", top: "6px", fontWeight: "500" }}>
          (x → {x})
        </span>{" "}
        {c[0]}x<sup>{e[0]}</sup> + {c[1]}x<sup>{e[1]}</sup> + {c[2]}x<sup>{e[2]}</sup>
      </div>

      {/* --- EXPONENT CALCULATOR --- */}
      <div className="box center" style={{ width: "100%", height: "60%", alignItems: "end" }}>
        {calc && <ExponentCalculator close={() => setCalc(false)} />}
      </div>

      {/* --- MULTIPLE CHOICE --- */}
      {!done && begin && (
        <>
          <div className="double center Green absolute StepQuestion">
            What is the value of this limit?
          </div>
          <div className="center wrap absolute StepAnswer">
            <Step value={answer + arr[0]} answer={answer} Count={Count} done={done} mistake={Nothing} />
            <Step value={answer + arr[1]} answer={answer} Count={Count} done={done} mistake={Nothing} />
            <Step value={answer + arr[2]} answer={answer} Count={Count} done={done} mistake={Nothing} />
            <Step value={answer + arr[3]} answer={answer} Count={Count} done={done} mistake={Nothing} />
            <button
              className="choice"
              style={{ backgroundColor: "yellow", color: "black" }}
              onClick={() => setExtra(true)}
            >
              help
            </button>
            <button className="choice red" onClick={close}>
              Close
            </button>
          </div>
        </>
      )}

      {/* --- FINAL RESULT --- */}
      {done && (
        <div className="center Green" style={{ fontSize: "35px", marginTop: "15px" }}>
          ✅ Limit = {answer}
        </div>
      )}
    </div>
  )
}
