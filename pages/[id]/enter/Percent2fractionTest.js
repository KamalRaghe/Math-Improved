import { useEffect, useState } from "react";
import Timeout from "@/components/timeout";
import Heart from "@/components/heart";
import Heart1 from "@/components/heart1";
import Heart2 from "@/components/heart2";
import Heart3 from "@/components/heart3";
import Mistake from "@/components/mistake";
import Pass from "@/components/pass";
import Choice from "@/components/FractionChoice";
import { useRouter } from "next/router";

const TEST_LENGTH = 600000 // 10 minutes
const QUESTIONS = 25

// simplest-form fractions whose denominator goes into 100, so every percent is a whole number
const DENOMS = [2, 4, 5, 10, 20, 25, 50]

function shuffle(arr) {
    const a = [...arr]
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[a[i], a[j]] = [a[j], a[i]]
    }
    return a
}

function gcd(a, b) {
    return b === 0 ? a : gcd(b, a % b)
}

// every simplest-form proper fraction whose bottom number goes into 100
// (the right answer and the wrong answers all come from this same list, so none of them stands out)
const ALL = []
for (const d of DENOMS) {
    for (let n = 1; n < d; n++) {
        if (gcd(n, d) === 1) ALL.push({ num: n, den: d, value: n / d })
    }
}

// returns { percent, num, den, options } where options are 5 shuffled { num, den } fractions
function makeQuestion() {
    const den = DENOMS[Math.floor(Math.random() * DENOMS.length)]
    let num = Math.ceil(Math.random() * (den - 1))
    while (gcd(num, den) !== 1) {
        num = Math.ceil(Math.random() * (den - 1))
    }
    const answer = ALL.find(f => f.num === num && f.den === den)
    const percent = Math.round(answer.value * 100)
    const others = ALL.filter(f => f !== answer)

    // plausible wrong answers: same bottom number, same top number, or a close value
    let pool = others.filter(f => f.den === den || f.num === num || Math.abs(f.value - answer.value) <= 0.12)
    if (pool.length < 4) {
        pool = [...others].sort((a, b) => Math.abs(a.value - answer.value) - Math.abs(b.value - answer.value)).slice(0, 6)
    }
    const wrongs = shuffle(pool).slice(0, 4).map(f => ({ num: f.num, den: f.den }))
    const options = shuffle([{ num, den }, ...wrongs])
    return { percent, num, den, options }
}

export default function Percent2FractionTest() {
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
        }, 1500)
    }

    function CorrectA() {
        setCount(c => c + 1)
        setCorrect(true)
        // the next question comes from doSomething={nextQuestion} on Choice
    }

    function WrongA() {
        setMistake(m => m + 1)
        setWrong(true)
        nextQuestion()
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

            {loaded && q && !finished && <div className="box column">
                <div className="double center">
                    <div>{q.percent}%</div>
                    <div style={{ padding: '5px' }}>=</div>
                    {!showResult && <div>?</div>}
                    {showResult && <div className="column center">
                        <div className="center" style={{ borderBottom: '2px solid black', width: '45px' }}>
                            <div className={correct ? "Green" : "Red"}>{q.num}</div>
                        </div>
                        <div className={correct ? "Green" : "Red"}>{q.den}</div>
                    </div>}
                </div>
            </div>}

            <div className="box"></div>

            {timedOut && mistake < 3 && count < QUESTIONS && <Timeout again={Again} />}
            {mistake >= 3 && <Mistake again={Again} />}
            {count >= QUESTIONS && <Pass time={TEST_LENGTH - (time - now)} />}

            <div className="box column" style={{ pointerEvents: showResult ? "none" : "auto" }}>
                {loaded && q && !finished && <>
                    <div className="row">
                        {q.options.slice(0, 3).map(f => (
                            <Choice key={`${q.percent}-${f.num}/${f.den}`} beginning={true} value1={f.num} answer1={q.num} value2={f.den} answer2={q.den} doSomething={nextQuestion} Correct={CorrectA} Wrong={WrongA} />
                        ))}
                    </div>
                    <div className="row">
                        {q.options.slice(3).map(f => (
                            <Choice key={`${q.percent}-${f.num}/${f.den}`} beginning={true} value1={f.num} answer1={q.num} value2={f.den} answer2={q.den} doSomething={nextQuestion} Correct={CorrectA} Wrong={WrongA} />
                        ))}
                    </div>
                </>}
            </div>
        </div>
    )
}