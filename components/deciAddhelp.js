import { useEffect, useState } from "react"
import Step from "./step"
import HelpAdd from "./HelpAdd"

// digits of a whole number, least-significant first, padded to `len` with zeros
function digitsLS(n, len) {
    const d = []
    let v = n
    for (let i = 0; i < len; i++) {
        d.push(v % 10)
        v = Math.floor(v / 10)
    }
    return d
}

function decimalPlaces(n) {
    const s = n.toString()
    return s.includes('.') ? s.split('.')[1].length : 0
}

const colStyle = { display: "inline-block", width: "1em", textAlign: "center" }
const dotStyle = { display: "inline-block", width: "0.5em", textAlign: "center" }

function StepAddDecimal({ close, num1, num2 }) {
    const places = Math.max(decimalPlaces(num1), decimalPlaces(num2), 1)
    const scale = Math.pow(10, places)
    const int1 = Math.round(num1 * scale)
    const int2 = Math.round(num2 * scale)

    const wholeLen = 2
    const totalLen = places + wholeLen

    const [digits1] = useState(() => digitsLS(int1, totalLen))
    const [digits2] = useState(() => digitsLS(int2, totalLen))
    const [result, setResult] = useState(Array(totalLen).fill(null))
    const [stepIndex, setStepIndex] = useState(0)
    const [carry, setCarry] = useState(0)
    const [extra, setExtra] = useState(false)
    const [done, setDone] = useState(false)
    const [arr, setArr] = useState([0, Math.floor(Math.random() * 3) + 1, -1, Math.floor(Math.random() * 3) - 4])

    const a = digits1[stepIndex]
    const b = digits2[stepIndex]
    const sum = a + b + carry

    function mix() {
        setArr(prevChange => [...prevChange].sort((x, y) => Math.random() - 0.5))
    }

    useEffect(() => {
        mix()
    }, [])

    function Extra() {
        setExtra(false)
    }

    function Nothing() { }

    function Count() {
        const nextResult = [...result]
        nextResult[stepIndex] = sum % 10
        let runningCarry = sum >= 10 ? 1 : 0
        mix()

        // skip any remaining columns that are just 0 + 0 — drop the carry straight in and stop
        let nextIndex = stepIndex + 1
        while (nextIndex < totalLen && digits1[nextIndex] === 0 && digits2[nextIndex] === 0) {
            nextResult[nextIndex] = runningCarry
            runningCarry = 0
            nextIndex++
        }

        setResult(nextResult)
        setCarry(runningCarry)

        if (nextIndex < totalLen) {
            setStepIndex(nextIndex)
        } else {
            setDone(true)
        }
    }

    return (
        <div className="Help">
            {extra && <HelpAdd close={Extra} num1={a} num2={b + carry} />}
            <div className='cancel'><button className='cancel-btn' onClick={close}>X</button></div>

            <div className="double center" style={{ minHeight: "18px", position: "relative", left: "18px" }}>
                {[...digits1].reverse().map((d, i) => {
                    const idx = digits1.length - 1 - i
                    return (
                        <span key={i}>
                            <span style={{ ...colStyle, color: "green" }}>
                                {idx === stepIndex && carry > 0 ? "1" : ""}
                            </span>
                            {idx === places && idx !== 0 && <span style={dotStyle}></span>}
                        </span>
                    )
                })}
            </div>

            <div className="double top-number center" style={{ position: "relative", left: "18px" }}>
                {[...digits1].reverse().map((d, i) => {
                    const idx = digits1.length - 1 - i
                    const hideLeading = idx === totalLen - 1 && d === 0
                    return (
                        <span key={i}>
                            <span style={colStyle} className={idx === stepIndex ? "Green" : ""}>{hideLeading ? "" : d}</span>
                            {idx === places && idx !== 0 && <span style={dotStyle}>.</span>}
                        </span>
                    )
                })}
            </div>
            <div className="double center">
                <span className="bottom-number" style={colStyle}>+</span>
                {[...digits2].reverse().map((d, i) => {
                    const idx = digits2.length - 1 - i
                    const hideLeading = idx === totalLen - 1 && d === 0
                    return (
                        <span key={i} className="bottom-number">
                            <span style={colStyle} className={idx === stepIndex ? "Green" : ""}>{hideLeading ? "" : d}</span>
                            {idx === places && idx !== 0 && <span style={dotStyle}>.</span>}
                        </span>
                    )
                })}
            </div>

            <div className="double center" style={{ position: "relative", left: "18px" }}>
                {[...result].reverse().map((d, i) => {
                    const idx = result.length - 1 - i
                    const hideLeading = idx === totalLen - 1 && (d === 0 || d === null)
                    return (
                        <span key={i}>
                            <span style={colStyle}>{hideLeading ? "" : (d !== null ? d : "")}</span>
                            {idx === places && idx !== 0 && <span style={dotStyle}>.</span>}
                        </span>
                    )
                })}
            </div>

            {!done && <div className="double center Green absolute StepQuestion">
                {carry > 0 ? `${carry} + ` : ""}{a} + {b} =
            </div>}

            {!done && <div className='center wrap absolute StepAnswer'>
                <button className="choice" style={{ backgroundColor: 'yellow', color: 'black' }} onClick={() => setExtra(true)}>help</button>
                <Step value={sum + arr[1]} answer={sum} Count={Count} done={done} mistake={Nothing} />
                <Step value={sum + arr[2]} answer={sum} Count={Count} done={done} mistake={Nothing} />
                <Step value={sum + arr[0]} answer={sum} Count={Count} done={done} mistake={Nothing} />
                <Step value={sum + arr[3]} answer={sum} Count={Count} done={done} mistake={Nothing} />
                <button className="choice red" onClick={close}>Close</button>
            </div>}
        </div>
    )
}
export default StepAddDecimal