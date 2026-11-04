import { useEffect, useState } from "react"
import Step from "@/components/step"

function shuffle(arr) {
    const a = [...arr]
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[a[i], a[j]] = [a[j], a[i]]
    }
    return a
}

// decimal = e.g. 0.15, percent = 15
// Step 1: decimal x 100 = percent   (move the decimal point 2 places to the right)
export default function HelpDecimal2Percent({ decimal, percent, close }) {
    const [step, setStep] = useState(1)
    const [arr, setArr] = useState([0, 1, -1, 10])

    useEffect(() => {
        setArr(shuffle([0, 1, -1, 10]))
    }, [step])

    function Count() {
        setStep(step + 1)
    }
    function Nothing() {}

    const done = step === 2

    return (
        <div className="Help">
            <div className="cancel"><button className="cancel-btn" onClick={close}>X</button></div>

            <div className="double center">
                {!done && <div>{decimal}</div>}
                {done && <div className="Green">{decimal} = {percent}%</div>}
            </div>

            {!done && <div className="double center Green absolute StepQuestion">{decimal} x 100 =</div>}

            {!done && <div className="center wrap absolute StepAnswer">
                <Step value={percent + arr[0]} answer={percent} Count={Count} done={done} mistake={Nothing} />
                <Step value={percent + arr[1]} answer={percent} Count={Count} done={done} mistake={Nothing} />
                <Step value={percent + arr[2]} answer={percent} Count={Count} done={done} mistake={Nothing} />
                <Step value={percent + arr[3]} answer={percent} Count={Count} done={done} mistake={Nothing} />
                <button className="choice red" onClick={close}>Close</button>
            </div>}
        </div>
    )
}