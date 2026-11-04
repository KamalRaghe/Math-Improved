import { useEffect, useState } from "react";
import Correct from "@/components/correct";
import Wrong from "@/components/wrong";
import HelpFraction2Decimal from "@/components/helpFraction2Decimal";
import Link from "next/link";
import { useRouter } from "next/router";

// denominators that go into 100 evenly, so every answer has at most 2 decimal places
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
    // wrong answers: one step off, off by 0.1 / 0.05 / 0.01, or the decimal point in the wrong place
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

export default function Fraction2Decimal() {
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
        const savedCount = parseInt(window.localStorage.getItem(`${id} Decimal`))
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
        if (count > 0) window.localStorage.setItem(`${id} Decimal`, count)
    }, [count])

    useEffect(() => {
        if (score > 0) window.localStorage.setItem(`${id} score`, score)
    }, [score])

    return (
        <div className="beige container column">
            <div className="Test sb">
                <div className="double">
                    <div>Score: {loaded && score}</div>
                    <div className="font">Fraction to Decimal: {loaded && count}</div>
                </div>
                <Link href={`/${id}/enter/Fraction2decimalTest`}><button className="green test-btn">Test</button></Link>
            </div>

            <div className=" column">
                {loaded && q && <div className="double center">
                    <div className="column center">
                        <div className="center" style={{ borderBottom: '2px solid black', width: '45px' }}>{q.num}</div>
                        {q.den}
                    </div>
                    <div style={{ padding: '5px' }}>= ?</div>
                </div>}
            </div>

            <div className="box">
                <button className="help" onClick={open}>help</button>
            </div>

            {help && q && <HelpFraction2Decimal num={q.num} den={q.den} close={close} />}
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