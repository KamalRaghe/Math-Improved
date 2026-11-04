import { useEffect, useState } from "react";
import Correct from "@/components/correct";
import Wrong from "@/components/wrong";
import HelpPercent2Decimal from "@/components/helpPercent2Decimal";
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
const round2 = v => Number(v.toFixed(2))

// returns { percent, answer, options } e.g. { percent: 15, answer: 0.15, options: [5 shuffled decimals] }
function makeQuestion() {
    // 30% of the time a round percent like 30%, otherwise any percent from 1 to 99
    const percent = Math.random() < 0.3 ? 10 * Math.ceil(Math.random() * 9) : Math.ceil(Math.random() * 99)
    const answer = round2(percent / 100)

    // plausible wrong answers: close decimals, digits swapped, or the decimal point in the wrong place
    // (all between 0 and 1 with at most 2 decimal places, so none of them stands out)
    const pool = [...new Set([
        answer + 0.01, answer - 0.01, answer + 0.02, answer - 0.02,
        answer + 0.03, answer - 0.03, answer + 0.05, answer - 0.05,
        answer + 0.1, answer - 0.1,
        reverse(percent) / 100,
        percent % 10 === 0 ? percent / 1000 : percent < 10 ? percent / 10 : answer + 0.04,
    ].map(round2))].filter(v => v > 0 && v < 1 && v !== answer)

    const options = shuffle([answer, ...shuffle(pool).slice(0, 4)])
    return { percent, answer, options }
}

export default function Percent2Decimal() {
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
        const savedCount = parseInt(window.localStorage.getItem(`${id} Percent2Decimal`))
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
        if (count > 0) window.localStorage.setItem(`${id} Percent2Decimal`, count)
    }, [count])

    useEffect(() => {
        if (score > 0) window.localStorage.setItem(`${id} score`, score)
    }, [score])

    return (
        <div className="beige container column">
            <div className="Test sb">
                <div className="double">
                    <div>Score: {loaded && score}</div>
                    <div className="font">Percent to Decimal: {loaded && count}</div>
                </div>
                <Link href={`/${id}/enter/Percent2decimalTest`}><button className="green test-btn">Test</button></Link>
            </div>

            <div className=" column">
                {loaded && q && <div className="double center">
                    <div>{q.percent}%</div>
                    <div style={{ padding: '5px' }}>= ?</div>
                </div>}
            </div>

            <div className="box">
                <button className="help" onClick={open}>help</button>
            </div>

            {help && q && <HelpPercent2Decimal percent={q.percent} decimal={q.answer} close={close} />}
            {loaded && correct && <Correct />}
            {loaded && wrong && <Wrong />}

            <div className="box column">
                {loaded && q && <>
                    <div className="row">
                        {q.options.slice(0, 3).map(v => (
                            <button key={v} className="choice" onClick={() => v === q.answer ? CorrectA() : WrongA()}>{v}</button>
                        ))}
                    </div>
                    <div className="row">
                        {q.options.slice(3).map(v => (
                            <button key={v} className="choice" onClick={() => v === q.answer ? CorrectA() : WrongA()}>{v}</button>
                        ))}
                    </div>
                </>}
            </div>
        </div>
    )
}