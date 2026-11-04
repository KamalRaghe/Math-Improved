import { useEffect, useState } from "react";
import Timeout from "@/components/timeout";
import Heart from "@/components/heart";
import Heart1 from "@/components/heart1";
import Heart2 from "@/components/heart2";
import Heart3 from "@/components/heart3";
import Mistake from "@/components/mistake";
import Pass from "@/components/pass";
import { useRouter } from "next/router";

const TEST_LENGTH = 600000 // 10 minutes
const QUESTIONS = 25

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

export default function Decimal2PercentTest() {
    const [loaded, setLoaded] = useState(false)
    const [correct, setCorrect] = useState(false)
    const [wrong, setWrong] = useState(false)
    const [q, setQ] = useState(null)
    const [count, setCount] = useState(0)
    const [mistake, setMistake] = useState(0)
    const [time, setTime] = useState(TEST_LENGTH + Date.now())
    const [now, setNow] = useState(Date.now())
    const router = useRouter()
    const { id } = router.query

    const timedOut = time - now < 0
    const finished = mistake >= 3 || timedOut || count >= QUESTIONS

    function Again() {
        setCount(0)
        setMistake(0)
        setCorrect(false)
        setWrong(false)
        setQ(makeQuestion())
        setTime(TEST_LENGTH + Date.now())
        setNow(Date.now())
    }

    function nextQuestion() {
        setTimeout(() => {
            setCorrect(false)
            setWrong(false)
            setQ(makeQuestion())
        }, 500)
    }

    function CorrectA() {
        setCount(c => c + 1)
        setCorrect(true)
        nextQuestion()
    }

    function WrongA() {
        setMistake(m => m + 1)
        setWrong(true)
        nextQuestion()
    }

    function check(v) {
        if (correct || wrong) return // ignore clicks while the answer is showing
        if (v === q.answer) {
            CorrectA()
        } else {
            WrongA()
        }
    }

    useEffect(() => {
        if (!router.isReady) return
        setQ(makeQuestion())
        setTime(TEST_LENGTH + Date.now())
        const ID = window.localStorage.getItem('ID')
        if (ID !== id) {
            router.push("/")
        }
        setLoaded(true)
    }, [router.isReady])

    // clock tick
    useEffect(() => {
        if (finished) return
        const t = setInterval(() => setNow(Date.now()), 250)
        return () => clearInterval(t)
    }, [finished])

    const showResult = correct || wrong

    return (
        <div className="beige container column">
            <div className="double">Question left : {QUESTIONS - count}</div>
            <div className="inTest">
                <div className="Red relative">
                    {mistake === 0 && <Heart />}
                    {mistake === 1 && <Heart1 />}
                    {mistake === 2 && <Heart2 />}
                    {mistake >= 3 && <Heart3 />}
                </div>
                {loaded && !finished && <div>
                    {Math.floor(((time - now) % (1000 * 60 * 60)) / 1000 / 60)}m {""}
                    {Math.floor(((time - now) % (1000 * 60)) / 1000)}s
                </div>}
            </div>

            {loaded && q && !finished && <div className="column">
                <div className="double center">
                    <div>{q.decimal}</div>
                    <div style={{ padding: '5px' }}>=</div>
                    {!showResult && <div> ? %</div>}
                    {showResult && <div className={correct ? "Green" : "Red"}>{q.answer}%</div>}
                </div>
            </div>}

            <div className="box"></div>

            {timedOut && mistake < 3 && count < QUESTIONS && <Timeout again={Again} />}
            {mistake >= 3 && <Mistake again={Again} />}
            {count >= QUESTIONS && <Pass time={TEST_LENGTH - (time - now)} />}

            <div className="box column" style={{ pointerEvents: showResult ? "none" : "auto" }}>
                {loaded && q && !finished && <>
                    <div className="row">
                        {q.options.slice(0, 3).map(v => (
                            <button key={`${q.decimal}-${v}`} className="choice" onClick={() => check(v)}>{v}%</button>
                        ))}
                    </div>
                    <div className="row">
                        {q.options.slice(3).map(v => (
                            <button key={`${q.decimal}-${v}`} className="choice" onClick={() => check(v)}>{v}%</button>
                        ))}
                    </div>
                </>}
            </div>
        </div>
    )
}