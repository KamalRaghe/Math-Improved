import { useEffect, useState } from "react"
import Step from "./step"
import HelpMinus from "./HelpMinus"

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

function StepMinusDecimal({ close, num1, num2 }) {
    const places = Math.max(decimalPlaces(num1), decimalPlaces(num2), 1)
    const scale = Math.pow(10, places)
    const int1 = Math.round(num1 * scale)
    const int2 = Math.round(num2 * scale)

    const wholeLen = 2
    const totalLen = places + wholeLen

    const [digits2] = useState(() => digitsLS(int2, totalLen))
    const [adjDigits1, setAdjDigits1] = useState(() => digitsLS(int1, totalLen))
    const [result, setResult] = useState(Array(totalLen).fill(null))
    const [stepIndex, setStepIndex] = useState(0)
    const [extra, setExtra] = useState(false)
    const [done, setDone] = useState(false)
    const [arr, setArr] = useState([0, Math.floor(Math.random() * 3) + 1, -1, Math.floor(Math.random() * 3) - 4])

    // borrow-click state, reset every time stepIndex advances
    const [ten, setTen] = useState(0)          // 0 normally, 10 once you click to borrow
    const [slice, setSlice] = useState(false)  // true once the borrow-from digits are struck through
    const [borrowChain, setBorrowChain] = useState([]) // indices of columns being struck through (the zeros chained past, plus the one that loses 1)

    const rawA = adjDigits1[stepIndex]
    const b = digits2[stepIndex]
    const needsClick = rawA < b && ten === 0
    const a = rawA + ten
    const diff = a - b

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

    function click() {
        // find the borrow chain: skip over any 0 columns (they become 9), then take 1 from the first nonzero
        const chain = []
        let p = stepIndex + 1
        while (adjDigits1[p] === 0) { chain.push(p); p++ }
        chain.push(p)
        setBorrowChain(chain)
        setTen(10)
        setSlice(true)
    }

    function Count() {
        const nextResult = [...result]
        nextResult[stepIndex] = diff

        let nextAdj = adjDigits1
        if (slice) {
            nextAdj = [...adjDigits1]
            borrowChain.forEach((idx, i) => {
                nextAdj[idx] = (i === borrowChain.length - 1) ? nextAdj[idx] - 1 : 9
            })
        }
        mix()

        let nextIndex = stepIndex + 1
        while (nextIndex < totalLen && nextAdj[nextIndex] === 0 && digits2[nextIndex] === 0) {
            nextResult[nextIndex] = 0
            nextIndex++
        }

        setAdjDigits1(nextAdj)
        setResult(nextResult)
        setTen(0)
        setSlice(false)
        setBorrowChain([])

        if (nextIndex < totalLen) {
            setStepIndex(nextIndex)
        } else {
            setDone(true)
        }
    }

    return (
        <div className="Help">
            {extra && <HelpMinus close={Extra} num1={a} num2={b} />}
            <div className='cancel'><button className='cancel-btn' onClick={close}>X</button></div>

            <div className="double top-number center" style={{ position: "relative", left: "18px" }}>
                {[...adjDigits1].reverse().map((d, i) => {
                    const idx = adjDigits1.length - 1 - i
                    const hideLeading = idx === totalLen - 1 && d === 0
                    const chainPos = borrowChain.indexOf(idx)
                    const struck = slice && chainPos !== -1
                    const reducedValue = chainPos === -1 ? null : (chainPos === borrowChain.length - 1 ? d - 1 : 9)
                    return (
                        <span key={i} style={{ position: "relative" }}>
                            {struck && (
                                <span className="double" style={{ position: "absolute", top: "-32px", left: 0, ...colStyle, color: "red" }}>
                                    {reducedValue}
                                </span>
                            )}
                            <span style={colStyle} className={idx === stepIndex ? "Green" : ""}>
                                {struck && <span className="bold" style={{ color: "red",position:"relative",right:"-12px" }}>/</span>}
                                {hideLeading ? "" : (idx === stepIndex ? a : d)}
                            </span>
                            {idx === places && idx !== 0 && <span style={dotStyle}>.</span>}
                        </span>
                    )
                })}
            </div>
            <div className="double center">
                <span className="bottom-number" style={colStyle}>-</span>
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

            {needsClick && (
                <span className='center'>
                    <button className='carry absolute Red center' style={{ fontSize: "30px", left: '165px', bottom: "420px" }} onClick={click}>Click</button>
                </span>
            )}
            {needsClick && (
                <span className='center'>
                    <button className='carry absolute Red' style={{ left: '188px', top: "80px" }} onClick={click}>{'-'}</button>
                </span>
            )}

            {!needsClick && !done && <div className="double center Green absolute StepQuestion">
                {ten > 0 ? `${rawA+10}` : a} - {b} =
            </div>}

            {!needsClick && !done && <div className='center wrap absolute StepAnswer'>
                <Step value={diff + arr[1]} answer={diff} Count={Count} done={done} mistake={Nothing} />
                <Step value={diff + arr[2]} answer={diff} Count={Count} done={done} mistake={Nothing} />
                <Step value={diff + arr[0]} answer={diff} Count={Count} done={done} mistake={Nothing} />
                 <button className="choice" style={{ backgroundColor: 'yellow', color: 'black' }} onClick={() => setExtra(true)}>help</button>
                <Step value={diff + arr[3]} answer={diff} Count={Count} done={done} mistake={Nothing} />
                <button className="choice red" onClick={close}>Close</button>
            </div>}
        </div>
    )
}
export default StepMinusDecimal