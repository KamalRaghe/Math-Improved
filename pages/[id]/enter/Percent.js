import { useEffect, useState } from "react";
import Choice from "@/components/choice";
import Correct from "@/components/correct";
import Wrong from "@/components/wrong";
import HelpPercent from "@/components/HelpPercent";
import Link from "next/link";
import { useRouter } from "next/router";

const PERCENTS = [5, 10, 15, 20, 25, 30, 40, 50, 60, 75, 80, 90]

function shuffle(arr){
    const a = [...arr]
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]]
    }
    return a
}

// base is a multiple of 20 and percent a multiple of 5, so the answer is always a whole number
function newQuestion(){
    const percent = PERCENTS[Math.floor(Math.random() * PERCENTS.length)]
    const base = 20 * (Math.floor(Math.random() * 10) + 1)
    const answer = percent * base / 100
    const offsets = shuffle([1, -1, 2, -2, 3, -3, 5, -5]).filter(o => answer + o > 0).slice(0, 4)
    const options = shuffle([answer, ...offsets.map(o => answer + o)])
    return { percent, base, answer, options }
}

export default function Percent(){
    const [help, setHelp] = useState(false)
    const [loaded, setLoaded] = useState(false)
    const [correct, setCorrect] = useState(false)
    const [wrong, setWrong] = useState(false)
    const [q, setQ] = useState(() => newQuestion())
    const [score, setScore] = useState(0)
    const [count, setCount] = useState(0)
    const router = useRouter()
    const {username} = router.query
    const {id} = router.query

    function open(){
        setHelp(true)
    }
    function close(){
        setHelp(false)
    }

    function CorrectA(){
        setCount(count + 1)
        setScore(score + 1)
        setCorrect(true)
        setTimeout(() => {
            setCorrect(false)
        }, 1900);
    }

    function WrongA(){
        setWrong(true)
        setTimeout(() => {
            setWrong(false)
            setHelp(true)
        }, 1900);
    }

    function Add(){
        setTimeout(() => {
            setQ(newQuestion())
        }, 1500)
    }

    useEffect(() => {
        setLoaded(true)
        const count = parseInt(window.localStorage.getItem(`${id} Percent`))
        setCount(count ? count : 0)
        const score = parseInt(window.localStorage.getItem(`${id} score`))
        setScore(score ? score : 0)
        const ID = window.localStorage.getItem('ID')
    },[])

    useEffect(() => {
        if(count > 0){
            window.localStorage.setItem(`${id} Percent`, count)
        }
    },[count])

    useEffect(() => {
        if(score > 0){
            window.localStorage.setItem(`${id} score`, score)
        }
    },[score])

    return(
        <div className="beige container column">
            <div className="Test sb"><div className="double">
                <div>Score: {loaded && score}</div>
                <div className="font">Percentage of a number: {loaded && count}</div>
            </div><Link href={`/${id}/enter/percentTest`}><button className="green test-btn">Test</button></Link></div>
            <div className="box column" style={{width:'300px'}}>
                <div className="double center">{loaded && q.percent}% of {loaded && q.base} =</div>
            </div>
            <div className="box">
                <button className="help" onClick={open}>help</button>
            </div>
            {help && <HelpPercent percent={q.percent} base={q.base} close={close}/>}
            {loaded && correct && <Correct></Correct>}
            {loaded && wrong && <Wrong/>}
            <div className="box column">
                <div className="row">
                    {loaded && q.options.slice(0, 3).map(v => (
                        <Choice key={v} value={v} answer={q.answer} doSomething={Add} Correct={CorrectA} Wrong={WrongA}/>
                    ))}
                </div>
                <div className="row">
                    {loaded && q.options.slice(3).map(v => (
                        <Choice key={v} value={v} answer={q.answer} doSomething={Add} Correct={CorrectA} Wrong={WrongA}/>
                    ))}
                </div>
            </div>
        </div>
    )
}