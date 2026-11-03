import { useEffect, useState } from "react"
import Step from "@/components/step"
import HelpTimes from "@/components/HelpTimes"
import StepTimes from "@/components/stepTimes"
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

// num = numerator, den = denominator
// Step 1: 100 ÷ den = k   (what do we multiply the bottom by to get 100?)
// Step 2: num x k = answer (multiply the top by the same number)
// Step 3: num x k / 100 = answer %
export default function HelpFraction2Percent({ num, den, close }) {
    const k = 100 / den
    const [step, setStep] = useState(1)
    const [extra, setExtra] = useState(false)
    const [arr, setArr] = useState([0, 1, -1, 2])

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

    const question = step === 1 ? `100 ÷ ${den} =` : `${num} x ${k} =`
    const answer = step === 1 ? k : num * k
    const done = step === 3

    return (
        <div className="Help">
            {extra && step === 1 && (100/den < 10 ? <HelpDiv close={Extra} num1={100} num2={den} />
        :<ShortDivisionHelp close={Extra} base={100} exponent={den} />)}
            {extra && step === 2 && (num < 10 && k < 10
                ? <HelpTimes close={Extra} num1={num} num2={k} />
                : <StepTimes close={Extra} num1={num} num2={k} />)}

            <div className="cancel"><button className="cancel-btn" onClick={close}>X</button></div>

            <div className="double center">
                <div className="column center">
                    <div className="center" style={{ borderBottom: '2px solid black', width: `${step === 2 ? 150: 70}px` }}>
                        {step === 1 && num}
                        {step === 2 && `${num} x ${k}`}
                        {done && num * k}
                    </div>
                    {step === 1 && den}
                    {step === 2 && `${den} x ${k}`}
                    {done && 100}
                </div>
                {done && <div className="Green" style={{ padding: '5px' }}>= {num * k}%</div>}
            </div>

            {!done && <div className="double center Green absolute StepQuestion">{question}</div>}

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