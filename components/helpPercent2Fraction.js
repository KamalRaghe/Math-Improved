import { useEffect, useState } from "react"
import Step from "@/components/step"
import HelpHcf from "./HelpHcf"
import HelpDiv from "./PerfectDivision"
import ShortDivisionHelp from "./shortDivison"

function shuffle(arr) {
    const a = [...arr]
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[a[i], a[j]] = [a[j], a[i]]
    }
    return a
}

// num/den = the simplest fraction, percent = e.g. 15 (so 15% = 15/100 = 3/20)
// Step 1: highest common factor of percent and 100
// Step 2: percent ÷ hcf = top
// Step 3: 100 ÷ hcf = bottom
export default function HelpPercent2Fraction({ num, den, percent, close }) {
    const [hcf, setHcf] = useState(1)
    const [step, setStep] = useState(1)
    const [extra, setExtra] = useState(false)
    const [arr, setArr] = useState([0, 1, -1, 2])

    useEffect(() => {
        for (let i = percent; i > 0; i--) {
            if (percent % i === 0 && 100 % i === 0) {
                setHcf(i)
                break
            }
        }
    }, [percent])

    useEffect(() => {
        setArr(shuffle([0, 1, -1, 2]))
    }, [step])

    function Count() {
        setStep(step + 1)
        setExtra(false)
    }
    function Extra() {
        setExtra(false)
    }
    function Nothing() {}

    const questions = {
        2: `${percent} ÷ ${hcf} =`,
        3: `100 ÷ ${hcf} =`,
    }
    const answers = { 1: hcf, 2: num, 3: den }
    const answer = answers[step]
    const done = step === 4

    function divHelp(a, b) {
        return a / b < 10
            ? <HelpDiv close={Extra} num1={a} num2={b} />
            : <ShortDivisionHelp close={Extra} base={a} exponent={b} />
    }

    return (
        <div className="Help">
            {extra && step === 1 && <HelpHcf close={Extra} num1={percent} num2={100} />}
            {extra && step === 2 && divHelp(percent, hcf)}
            {extra && step === 3 && divHelp(100, hcf)}

            <div className="cancel"><button className="cancel-btn" onClick={close}>X</button></div>

            <div className="double center">
                <div className="column center">
                    <div className="center" style={{ borderBottom: '2px solid black', width: `${step === 2 || step === 3 ? 130 : 60}px` }}>
                        {step === 1 && percent}
                        {step === 2 && `${percent} ÷ ${hcf}`}
                        {step === 3 && num}
                        {done && <span className="Green">{num}</span>}
                    </div>
                    {step <= 2 && 100}
                    {step === 3 && `100 ÷ ${hcf}`}
                    {done && <span className="Green">{den}</span>}
                </div>
            </div>

            {step === 1 && <>
                <div className="double center" style={{ paddingTop: '20px' }}>Highest common</div>
                <div className="double center">factor of</div>
                <div className="double center">{percent} and 100</div>
            </>}
            {!done && step !== 1 && <div className="double center Green absolute StepQuestion">{questions[step]}</div>}

            {!done && <div className="center wrap absolute StepAnswer">
                <Step value={answer + arr[0]} answer={answer} Count={Count} done={done} mistake={Nothing} />
                <Step value={answer + arr[1]} answer={answer} Count={Count} done={done} mistake={Nothing} />
                <Step value={answer + arr[2]} answer={answer} Count={Count} done={done} mistake={Nothing} />
                <button className="choice" style={{ backgroundColor: 'yellow', color: 'black' }} onClick={() => setExtra(true)}>help</button>
                <Step value={answer + arr[3]} answer={answer} Count={Count} done={done} mistake={Nothing} />
                <button className="choice red" onClick={close}>Close</button>
            </div>}
        </div>
    )
}