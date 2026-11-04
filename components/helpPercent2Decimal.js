import { useEffect, useState } from "react"

function shuffle(arr) {
    const a = [...arr]
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[a[i], a[j]] = [a[j], a[i]]
    }
    return a
}

const round2 = v => Number(v.toFixed(2))

// percent = e.g. 15, decimal = 0.15
// Step 1: percent ÷ 100 = decimal   (move the decimal point 2 places to the left)
// (plain buttons are used instead of Step because the answers are decimals)
export default function HelpPercent2Decimal({ percent, decimal, close }) {
    const [done, setDone] = useState(false)
    const [wrongPick, setWrongPick] = useState(null)
    const [options, setOptions] = useState([])

    useEffect(() => {
        const pool = [0.01, -0.01, 0.1, -0.1, 0.02, -0.02]
            .map(o => round2(decimal + o))
            .filter(v => v > 0 && v < 1)
        setOptions(shuffle([decimal, ...shuffle(pool).slice(0, 3)]))
    }, [decimal])

    function pick(v) {
        if (v === decimal) {
            setDone(true)
        } else {
            setWrongPick(v)
        }
    }

    return (
        <div className="Help">
            <div className="cancel"><button className="cancel-btn" onClick={close}>X</button></div>

            <div className="double center">
                {!done && <div>{percent}%</div>}
                {done && <div className="Green">{percent} ÷ 100 = {decimal}</div>}
            </div>

            {!done && <div className="double center Green absolute StepQuestion">{percent} ÷ 100 =</div>}

            {!done && <div className="center wrap absolute StepAnswer">
                {options.map(v => (
                    <button
                        key={v}
                        className="choice"
                        style={wrongPick === v ? { backgroundColor: 'red' } : undefined}
                        onClick={() => pick(v)}
                    >{v}</button>
                ))}
                <button className="choice red" onClick={close}>Close</button>
            </div>}
        </div>
    )
}