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
const DENOMS = [2, 4, 5, 10, 20, 25, 50]

function shuffle(arr) {
    const a = [...arr]
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[a[i], a[j]] = [a[j], a[i]]
    }
    return a
}

const round2 = v => Number(v.toFixed(2))

function makeQuestion() {
    const den = DENOMS[Math.floor(Math.random() * DENOMS.length)]
    const num = Math.ceil(Math.random() * (den - 1))
    const step = 100 / den
    const answer = round2(num * step / 100)
    const wrongs = [...new Set([
        answer + step / 100, answer - step / 100,
        answer + 0.1, answer - 0.1,
        answer + 0.05, answer - 0.05,
        answer + 0.01, answer - 0.01,
        answer * 10,
    ].map(round2))].filter(v => v > 0 && v < 1 && v !== answer)
    const options = shuffle([answer, ...shuffle(wrongs).slice(0, 4)])
    return { num, den, answer, options }
}

export default function Fraction2DecimalTest() {
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
        nextQuestion()
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
                    <div className="column center">
                        <div className="center" style={{ borderBottom: '2px solid black', width: '45px' }}>{q.num}</div>
                        {q.den}
                    </div>
                    <div style={{ padding: '5px' }}>=</div>
                    {!showResult && <div>?</div>}
                    {correct && <div className="Green">{q.answer}</div>}
                    {wrong && <div className="Red">{q.answer}</div>}
                </div>
            </div>}

            <div className="box"></div>

            {timedOut && mistake < 3 && count < QUESTIONS && <Timeout again={Again} />}
            {mistake >= 3 && <Mistake again={Again} />}
            {count >= QUESTIONS && <Pass time={TEST_LENGTH - (time - now)} />}

            <div className="box column">
                {loaded && q && !finished && <>
                    <div className="row">
                        {q.options.slice(0, 3).map(v => (
                            <button key={`${q.num}-${q.den}-${v}`} className="choice" onClick={() => v === q.answer ? CorrectA() : WrongA()}>{v}</button>
                        ))}
                    </div>
                    <div className="row">
                        {q.options.slice(3).map(v => (
                            <button key={`${q.num}-${q.den}-${v}`} className="choice" onClick={() => v === q.answer ? CorrectA() : WrongA()}>{v}</button>
                        ))}
                    </div>
                </>}
            </div>
        </div>
    )
}