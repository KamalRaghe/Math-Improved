import { useState } from "react"
import Step from "./step"
import HelpAdd from "@/components/HelpAdd"
import StepAdd from "@/components/StepAdd"
import HelpTimes from "@/components/HelpTimes"
import StepTimes from "@/components/stepTimes"
import PythagorasTriangle from "@/components/PythagorasTriangle"
import SqrtCalculator from "./squareRootCalc"

function shuffle(arr) {
    const a = [...arr]
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]]
    }
    return a
}

export default function HelpPythagoras({ a, b, close }) {
    const [done, setDone] = useState(false)
    const [extra, setExtra] = useState(false)
    const [stepNum, setStepNum] = useState(0)
    const [arr, setArr] = useState(() => shuffle([0, 1, -1, 2]))

    const sum = a * a + b * b
    const c = Math.round(Math.sqrt(sum))

    // a x a  ->  b x b  ->  add them  ->  square root
    const steps = [
        { Q1: a, Q2: a, sign: 'x', answer: a * a, label: `${a} x ${a} =` },
        { Q1: b, Q2: b, sign: 'x', answer: b * b, label: `${b} x ${b} =` },
        { Q1: a * a, Q2: b * b, sign: '+', answer: sum, label: `${a * a} + ${b * b} =` },
        { Q1: sum, Q2: null, sign: '√', answer: c, label: `√${sum} =` },
    ]
    const { Q1, Q2, sign, answer, label } = steps[stepNum]

    function Extra() {
        setExtra(false)
    }

    function Count() {
        if (stepNum < steps.length - 1) {
            setStepNum(stepNum + 1)
        } else {
            close()
        }
    }

    function Nothing() { }

    return (
        <div className="Help column" style={{ zIndex: '50' }}>
            {extra && sign === '+' && Q1 < 10 && Q2 < 10 && <HelpAdd close={Extra} num1={Q1} num2={Q2} />}
            {extra && sign === '+' && (Q1 >= 10 || Q2 >= 10) && <StepAdd close={Extra} num1={Q1} num2={Q2} />}
            {extra && sign === 'x' && Q1 < 10 && Q2 < 10 && <HelpTimes close={Extra} num1={Q1} num2={Q2} />}
            {extra && sign === 'x' && (Q1 >= 10 || Q2 >= 10) && <StepTimes close={Extra} num1={Q1} num2={Q2} />}
            {extra && sign === '√' && (Q1 >= 10 || Q2 >= 10) && <SqrtCalculator />}
            
            <div className='cancel'><button className='cancel-btn' onClick = {close}>X</button></div>

            <div style={{position: 'relative',bottom: '40px',right:"-20px"}} >
                <PythagorasTriangle
                    a={a}
                    b={b}
                    aClass={stepNum > 0 ? "Green" : ""}
                    bClass={stepNum > 1 ? "Green" : ""}
                />
            </div>
            <div className="box"></div>
            <div className="box"></div>

            {!done && <div className="double center Green absolute StepQuestion">{label}</div>}
            {!done && <div key={stepNum} className='center wrap absolute StepAnswer'>
                <Step value={answer + arr[1]} answer={answer} Count={Count} done={done} mistake={Nothing} />
                <Step value={answer + arr[3]} answer={answer} Count={Count} done={done} mistake={Nothing} />
                <Step value={answer + arr[0]} answer={answer} Count={Count} done={done} mistake={Nothing} />
                {<button className="choice" style={{ backgroundColor: 'yellow', color: 'black' }} onClick={() => setExtra(true)}>help</button>}
                <Step value={answer + arr[2]} answer={answer} Count={Count} done={done} mistake={Nothing} />
                <button className="choice red" onClick={close}>Close</button>
            </div>}
        </div>
    )
}
