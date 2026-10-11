import { useEffect, useState } from "react";
import Choice from "@/components/choice";
import { useRouter } from "next/router";
import Heart from "@/components/heart";
import Heart1 from "@/components/heart1";
import Heart2 from "@/components/heart2";
import Heart3 from "@/components/heart3";
import Timeout from "@/components/timeout";
import Pass from "@/components/pass";
import Mistake from "@/components/mistake";

const PERCENTS = [5, 10, 15, 20, 25, 30, 40, 50, 60, 75, 80, 90]

function shuffle(arr){
    const a = [...arr]
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]]
    }
    return a
}

function newQuestion(){
    const percent = PERCENTS[Math.floor(Math.random() * PERCENTS.length)]
    const base = 20 * (Math.floor(Math.random() * 10) + 1)
    const answer = percent * base / 100
    const offsets = shuffle([1, -1, 2, -2, 3, -3, 5, -5]).filter(o => answer + o > 0).slice(0, 4)
    const options = shuffle([answer, ...offsets.map(o => answer + o)])
    return { percent, base, answer, options }
}

export default function PercentTest(){
    const [again, setAgain] = useState(false)
    const [loaded, setLoaded] = useState(false)
    const [correct, setCorrect] = useState(false)
    const [wrong, setWrong] = useState(false)
    const [q, setQ] = useState(() => newQuestion())
    const [mistake, setMistake] = useState(0)
    const [count, setCount] = useState(0)
    const [time, setTime] = useState(300000 + Date.now())
    const [date, setDate] = useState(Date.now())
    const router = useRouter()
    const {username} = router.query
    const {id} = router.query

    function Again(){
        setAgain(true)
        setCount(0)
        setMistake(0)
        setTime(300000 + Date.now())
        setQ(newQuestion())
        setLoaded(true)
    }

    function update(){
        setDate(requestAnimationFrame(update))
    }

    function CorrectA(){
        setCorrect(true)
        setTimeout(() => {
            setCorrect(false)
        }, 1510);
        setCount(count + 1)
    }

    function WrongA(){
        setMistake(mistake + 1)
        setWrong(true)
        setTimeout(() => {
            setWrong(false)
        }, 1510);
    }

    function Add(){
        setTimeout(() => {
            setQ(newQuestion())
        }, 1510)
    }

    function cancel(){
        setDate(cancelAnimationFrame(date))
    }

    useEffect(() => {
        setLoaded(true)
        update()
    },[])

    useEffect(() => {
        setAgain(false)
    },[again])

    useEffect(() => {
        if(mistake >= 3 || time - Date.now() < 0 || count >= 10){
            setLoaded(false)
            setTime(time)
            cancel()
        }
    })

    useEffect(() => {
        const ID = window.localStorage.getItem('ID')
        if(!(ID === id)){
            router.push("/")
        }
    },[])

    return(
        <div className="beige container column">
            <div className="double">Question left : {10 - count}</div>
            <div className="inTest">
                <div className="Red relative">
                    {mistake === 0 && <Heart/>}
                    {mistake === 1 && <Heart1/>}
                    {mistake === 2 && <Heart2/>}
                    {mistake === 3 && <Heart3/>}
                </div>
                {loaded && time - Date.now() > 0 && count < 10 && <div>{Math.floor(((time - Date.now())%(1000*60*60))/1000/60)}m {""}
                {Math.floor(((time - Date.now())%(1000*60))/1000)}s</div>}
            </div>

            <div style={{width:"100%"}}>
                <div className="double center">{loaded && q.percent}% of {loaded && q.base} ={correct && <span className="Green" style={{paddingLeft:"10px"}}>{q.answer}</span>}{wrong && <span className="Red" style={{paddingLeft:"10px"}}>{q.answer}</span>}</div>
            </div>
            <div className="box">
            </div>
            { time - Date.now() < 0 && <Timeout again={Again}/>}
            {mistake === 3 && <Mistake again={Again}></Mistake>}
            {count === 10 && <Pass time={300000 -(time-Date.now())}/>}
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