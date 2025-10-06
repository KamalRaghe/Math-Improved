import { useState, useEffect } from "react"
import Step from "./step"
import HelpLimit from "./HelpLimit"

export default function StepLimit({ close, num, expression }) {
  const [step1, setStep1] = useState(true)
  const [step2, setStep2] = useState(false)
  const [help, setHelp] = useState(false)
  const [count, setCount] = useState(0)
  const [arr, setArr] = useState([])
  const [answer, setAnswer] = useState(null)
  const [done, setDone] = useState(false)

  function mix() {
    const randoms = [
      Math.floor(Math.random() * 4) + 1,
      Math.floor(Math.random() * 3) - 2,
      Math.floor(Math.random() * 5) - 3,
      Math.floor(Math.random() * 2)
    ]
    setArr(randoms.sort((a, b) => Math.random() - 0.5))
  }

  function evalExpression(x) {
    try {
      // Simple safe evaluation of expression (e.g., "2*x*x + 4*x + 1")
      // eslint-disable-next-line no-new-func
      return Function("x", `return ${expression}`)(x)
    } catch (err) {
      return "Error"
    }
  }

  useEffect(() => {
    mix()
    setAnswer(evalExpression(num))
  }, [num, expression])

  function Next() {
    setCount(count + 1)
    if (count >= 1) {
      setDone(true)
    }
    if (step1) {
      setStep1(false)
      setStep2(true)
    } else {
      close()
    }
  }

  return (
    <div className="Help">
      {help && <HelpLimit close={() => setHelp(false)} expression={expression} num={num} />}

      <div className="cancel" style={{ width: "100%" }}>
        <button className="cancel-btn" onClick={close}>X</button>
      </div>

      <div className="center top-number bold">
        lim <sub>x→{num}</sub> {expression}
      </div>

      {step1 && (
        <div className="center absolute StepQuestion">
          Substitute x = {num}
        </div>
      )}

      {step2 && (
        <div className="center absolute StepQuestion">
          Evaluate → {expression.replaceAll("x", num)} = ?
        </div>
      )}

      {!done && (
        <div className="center wrap absolute StepAnswer">
          <button className="choice yellow" onClick={() => setHelp(true)}>
            help
          </button>

          <Step
            value={answer + arr[0]}
            answer={answer}
            Count={Next}
            done={done}
            mistake={() => {}}
          />
          <Step
            value={answer + arr[1]}
            answer={answer}
            Count={Next}
            done={done}
            mistake={() => {}}
          />
          <Step
            value={answer + arr[2]}
            answer={answer}
            Count={Next}
            done={done}
            mistake={() => {}}
          />
          <Step
            value={answer}
            answer={answer}
            Count={Next}
            done={done}
            mistake={() => {}}
          />

          <button className="choice red" onClick={close}>
            Close
          </button>
        </div>
      )}

      {done && (
        <div className="center bold Green final">
          ✅ The limit is {answer}
        </div>
      )}
    </div>
  )
}
