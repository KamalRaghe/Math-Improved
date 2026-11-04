import { useEffect, useState } from "react";
import Correct from "@/components/correct";
import Wrong from "@/components/wrong";
import HelpDecimal2Percent from "@/components/helpDecimal2Percent";
import Link from "next/link";
import { useRouter } from "next/router";

function shuffle(arr) {
    const a = [...arr]
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[a[i], a[j]] = [a[j], a[i]]
    }
    return a
}

const reverse = n => Number(String(n).split("").reverse().join(""))

// returns { decimal, answer, options } e.g. { decimal: 0.15, answer: 15, options: [5 shuffled percents] }
function makeQuestion() {
    // 30% of the time a one-decimal question like 0.3, otherwise two decimals like 0.15
    const answer = Math.random() < 0.3 ? 10 * Math.ceil(Math.random() * 9) : Math.ceil(Math.random() * 99)
    const decimal = Number((answer / 100).toFixed(2))

    // plausible wrong answers: close numbers, digits swapped, or the decimal point moved one place
    const pool = [...new Set([
        answer + 1, answer - 1, answer + 2, answer - 2,
        answer + 5, answer - 5, answer + 10, answer - 10,
        reverse(answer),
        answer % 10 === 0 ? answer / 10 : answer + 3,
    ])].filter(v => v > 0 && v <= 100 && v !== answer)

    const options = shuffle([answer, ...shuffle(pool).slice(0, 4)])
    return { decimal, answer, options }
}

export default function Decimal2Percent() {
    const [help, setHelp] = useState(false)
    const [loaded, setLoaded] = useState(false)
    const [correct, setCorrect] = useState(false)
    const [wrong, setWrong] = useState(false)
    const [q, setQ] = useState(null)
    const [score, setScore] = useState(0)
    const [count, setCount] = useState(0)
    const router = useRouter()
    const { id } = router.query

    function open() { setHelp(true) }
    function close() { setHelp(false) }

    function CorrectA() {
        setCorrect(true)
        setTimeout(() => setCorrect(false), 1900)
        setCount(c => c + 1)
        setScore(s => s + 1)
        setQ(makeQuestion())
    }

    function WrongA() {
        setWrong(true)
        setTimeout(() => {
            setWrong(false)
            setHelp(true)
        }, 1900)
    }

    useEffect(() => {
        if (!router.isReady) return
        setQ(makeQuestion())
        const savedCount = parseInt(window.localStorage.getItem(`${id} Decimal2Percent`))
        setCount(savedCount ? savedCount : 0)
        const savedScore = parseInt(window.localStorage.getItem(`${id} score`))
        setScore(savedScore ? savedScore : 0)
        const ID = window.localStorage.getItem('ID')
        if (ID !== id) {
            router.push("/")
        }
        setLoaded(true)
    }, [router.isReady])

    useEffect(() => {
        if (count > 0) window.localStorage.setItem(`${id} Decimal2Percent`, count)
    }, [count])

    useEffect(() => {
        if (score > 0) window.localStorage.setItem(`${id} score`, score)
    }, [score])

    return (
        <div className="beige container column">
            <div className="Test sb">
                <div className="double">
                    <div>Score: {loaded && score}</div>
                    <div className="font">Decimal to Percent: {loaded && count}</div>
                </div>
                <Link href={`/${id}/enter/Decimal2percentTest`}><button className="green test-btn">Test</button></Link>
            </div>

            <div className=" column">
                {loaded && q && <div className="double center">
                    <div>{q.decimal}</div>
                    <div style={{ padding: '5px' }}>= ? %</div>
                </div>}
            </div>

            <div className="box">
                <button className="help" onClick={open}>help</button>
            </div>

            {help && q && <HelpDecimal2Percent decimal={q.decimal} percent={q.answer} close={close} />}
            {loaded && correct && <Correct />}
            {loaded && wrong && <Wrong />}

            <div className="box column">
                {loaded && q && <>
                    <div className="row">
                        {q.options.slice(0, 3).map(v => (
                            <button key={v} className="choice" onClick={() => v === q.answer ? CorrectA() : WrongA()}>{v}%</button>
                        ))}
                    </div>
                    <div className="row">
                        {q.options.slice(3).map(v => (
                            <button key={v} className="choice" onClick={() => v === q.answer ? CorrectA() : WrongA()}>{v}%</button>
                        ))}
                    </div>
                </>}
            </div>
        </div>
    )
}