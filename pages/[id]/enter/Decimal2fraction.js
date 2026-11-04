import { useEffect, useState } from "react";
import Correct from "@/components/correct";
import Wrong from "@/components/wrong";
import Choice from "@/components/FractionChoice";
import HelpDecimal2Fraction from "@/components/helpDecimal2Fraction";
import Link from "next/link";
import { useRouter } from "next/router";

// simplest-form fractions whose denominator goes into 100, so the decimal has at most 2 places
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

// returns { decimal, num, den, options } where options are 5 shuffled { num, den } fractions
function makeQuestion() {
    const den = DENOMS[Math.floor(Math.random() * DENOMS.length)]
    let num = Math.ceil(Math.random() * (den - 1))
    while (gcd(num, den) !== 1) {
        num = Math.ceil(Math.random() * (den - 1))
    }
    const answer = ALL.find(f => f.num === num && f.den === den)
    const decimal = Number(answer.value.toFixed(2))
    const others = ALL.filter(f => f !== answer)

    // plausible wrong answers: same bottom number, same top number, or a close value
    let pool = others.filter(f => f.den === den || f.num === num || Math.abs(f.value - answer.value) <= 0.12)
    if (pool.length < 4) {
        pool = [...others].sort((a, b) => Math.abs(a.value - answer.value) - Math.abs(b.value - answer.value)).slice(0, 6)
    }
    const wrongs = shuffle(pool).slice(0, 4).map(f => ({ num: f.num, den: f.den }))
    const options = shuffle([{ num, den }, ...wrongs])
    return { decimal, num, den, options }
}

export default function Decimal2Fraction() {
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
    }

    function Add() {
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
        const savedCount = parseInt(window.localStorage.getItem(`${id} Decimal2Fraction`))
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
        if (count > 0) window.localStorage.setItem(`${id} Decimal2Fraction`, count)
    }, [count])

    useEffect(() => {
        if (score > 0) window.localStorage.setItem(`${id} score`, score)
    }, [score])

    return (
        <div className="beige container column">
            <div className="Test sb">
                <div className="double">
                    <div>Score: {loaded && score}</div>
                    <div className="font">Decimal to Fraction: {loaded && count}</div>
                </div>
                <Link href={`/${id}/enter/Decimal2fractionTest`}><button className="green test-btn">Test</button></Link>
            </div>

            <div className=" column">
                {loaded && q && <div className="double center">
                    <div>{q.decimal}</div>
                    <div style={{ padding: '5px' }}>= ?</div>
                </div>}
            </div>

            <div className="box">
                <button className="help" onClick={open}>help</button>
            </div>

            {help && q && <HelpDecimal2Fraction num={q.num} den={q.den} decimal={q.decimal} close={close} />}
            {loaded && correct && <Correct />}
            {loaded && wrong && <Wrong />}

            <div className="box column">
                {loaded && q && <>
                    <div className="row">
                        {q.options.slice(0, 3).map(f => (
                            <Choice key={`${f.num}/${f.den}`} beginning={true} value1={f.num} answer1={q.num} value2={f.den} answer2={q.den} doSomething={Add} Correct={CorrectA} Wrong={WrongA} />
                        ))}
                    </div>
                    <div className="row">
                        {q.options.slice(3).map(f => (
                            <Choice key={`${f.num}/${f.den}`} beginning={true} value1={f.num} answer1={q.num} value2={f.den} answer2={q.den} doSomething={Add} Correct={CorrectA} Wrong={WrongA} />
                        ))}
                    </div>
                </>}
            </div>
        </div>
    )
}