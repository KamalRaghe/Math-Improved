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

// num/den = the simplest fraction, decimal = num/den (e.g. 3/20 = 0.15)
// Step 1: decimal x 100 = digits      (0.15 x 100 = 15, so the fraction is 15/100)
// Step 2: highest common factor of digits and 100
// Step 3: digits ÷ hcf = top
// Step 4: 100 ÷ hcf = bottom
export default function HelpDecimal2Fraction({ num, den, decimal, close }) {
    const digits = Math.round(decimal * 100)
    const [hcf, setHcf] = useState(1)
    const [step, setStep] = useState(1)
    const [extra, setExtra] = useState(false)
    const [arr, setArr] = useState([0, 1, -1, 2])

    useEffect(() => {
        for (let i = digits; i > 0; i--) {
            if (digits % i === 0 && 100 % i === 0) {
                setHcf(i)
                break
            }
        }
    }, [digits])

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
        1: `${decimal} x 100 =`,
        2: `Highest common factor of ${digits} and 100 =`,
        3: `${digits} ÷ ${hcf} =`,
        4: `100 ÷ ${hcf} =`,
    }
    const answers = { 1: digits, 2: hcf, 3: num, 4: den }
    const answer = answers[step]
    const done = step === 5
    const hasHelp = step >= 2

    function DivHelp({ a, b }) {
        return a / b < 10
            ? <HelpDiv close={Extra} num1={a} num2={b} />
            : <ShortDivisionHelp close={Extra} base={a} exponent={b} />
    }

    return (
        <div className="Help">
            {extra && step === 2 && <HelpHcf close={Extra} num1={digits} num2={100} />}
            {extra && step === 3 && <DivHelp a={digits} b={hcf} />}
            {extra && step === 4 && <DivHelp a={100} b={hcf} />}

            <div className="cancel"><button className="cancel-btn" onClick={close}>X</button></div>

            <div className="double center">
                {step === 1 && <div>{decimal}</div>}
                {step >= 2 && <div className="column center">
                    <div className="center" style={{ borderBottom: '2px solid black', width: `${step >= 3 && step <= 4 ? 130 : 60}px` }}>
                        {step === 2 && digits}
                        {step === 3 && `${digits} ÷ ${hcf}`}
                        {step === 4 && num}
                        {done && <span className="Green">{num}</span>}
                    </div>
                    {step <= 3 && 100}
                    {step === 4 && `100 ÷ ${hcf}`}
                    {done && <span className="Green">{den}</span>}
                </div>}
            </div>

            {step === 2 && <>
                <div className="double center" style={{ paddingTop: '20px' }}>Highest common</div>
                <div className="double center">factor of</div>
                <div className="double center">{digits} and 100</div>
            </>}
            {!done && step !== 2 && <div className="double center Green absolute StepQuestion">{questions[step]}</div>}

            {!done && <div className="center wrap absolute StepAnswer">
                <Step value={answer + arr[0]} answer={answer} Count={Count} done={done} mistake={Nothing} />
                <Step value={answer + arr[1]} answer={answer} Count={Count} done={done} mistake={Nothing} />
                <Step value={answer + arr[2]} answer={answer} Count={Count} done={done} mistake={Nothing} />
                {hasHelp && <button className="choice" style={{ backgroundColor: 'yellow', color: 'black' }} onClick={() => setExtra(true)}>help</button>}
                <Step value={answer + arr[3]} answer={answer} Count={Count} done={done} mistake={Nothing} />
                <button className="choice red" onClick={close}>Close</button>
            </div>}
        </div>
    )
}