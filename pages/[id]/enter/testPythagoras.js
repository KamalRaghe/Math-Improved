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

// legs of right triangles whose hypotenuse is a whole number
const TRIPLES = [[3,4],[6,8],[5,12],[9,12],[8,15],[12,16]]

export default function TestPythagoras(){
    const [again, setAgain] = useState(false)
    const [loaded, setLoaded] = useState(false)
    const [correct, setCorrect] = useState(false)
    const[ wrong, setWrong] = useState(false)
    const [num1, setNum1] = useState(3);
    const [num2, setNum2] = useState(4);
    const [num3, setNum3] = useState([0,1,-1,Math.ceil(Math.random()*2+1),-1*Math.ceil(Math.random()*2+1)])
    const [mistake, setMistake] = useState(0)
    const [count, setCount] = useState(0)
    const [time, setTime] = useState( 300000 + Date.now())
    const [date, setDate] = useState(Date.now())
    const router = useRouter()
    const {username} = router.query
    const {id} = router.query

    // c = the hypotenuse (always a whole number with these triangles)
    const c = Math.round(Math.sqrt(num1*num1 + num2*num2))

    function newLegs(){
        const [x, y] = TRIPLES[Math.floor(Math.random()*TRIPLES.length)]
        if(Math.random() < 0.5){
            setNum1(x)
            setNum2(y)
        }else{
            setNum1(y)
            setNum2(x)
        }
    }

    function Again(){
        setAgain(true)
        setCount(0)
        setMistake(0)
        setTime(300000 + Date.now())
        newLegs()
        setLoaded(true)
    }

    function mix(){
        setNum3([0,1,-1,Math.ceil(Math.random()*2+1),-1*Math.ceil(Math.random()*2+1)])
    }

    function update(){
        setDate(requestAnimationFrame(update))
      }

    function CorrectA(){
        setCorrect(true)
        setTimeout(() => {
            setCorrect(false)
        }, 1510);
        setCount(count+1)
      }

      function WrongA(){
        setMistake( mistake + 1)
        setWrong(true)
        setTimeout(() => {
            setWrong(false)
        }, 1510);
      }
    function Add(){
        setTimeout(() => {
            newLegs()
            mix()
            setNum3(prevChange => prevChange.sort((a,b)=>Math.random()-0.5))
        }, 1510)
    }

    function cancel(){
        setDate(cancelAnimationFrame(date))
      }

    useEffect(() =>{
        mix()
        setNum3(prevChange => prevChange.sort((a,b)=>Math.random()-0.5))
     },[num1])

    useEffect(() =>{
        newLegs()
        setLoaded(true)
        update()
    },[])


    useEffect(() =>{
        setAgain(false)
    },[again])

    useEffect(() =>{
        if(mistake >= 3 || time - Date.now() < 0 || count >= 10){
            setLoaded(false)
            setTime(time)
            cancel()
        }
    })

    useEffect(()=>{
        const ID = window.localStorage.getItem('ID')
        if(!(ID === id)){
            router.push("/")
        }
    },[])

    return(
        <div className="beige container column">
           <div className="double">Question left : {10 - count}</div>
           <div className="inTest">

                <div className="Red relative" >
                    {mistake === 0 && <Heart/>}
                    {mistake === 1 && <Heart1/>}
                    {mistake === 2 && <Heart2/>}
                    {mistake === 3 && <Heart3/>}
                </div>
                {loaded && time - Date.now() > 0 && count < 10 && <div>{Math.floor(((time - Date.now())%(1000*60*60))/1000/60)}m {""}
                {Math.floor(((time - Date.now())%(1000*60))/1000)}s</div>}
            </div>

            <div style={{width:"100%"}}>
                <div className="double center column">
                    {loaded && <svg viewBox="0 0 240 190" width="240" height="190">
                        <polygon points="40,150 200,150 40,30" fill="none" stroke="black" strokeWidth="3" strokeLinejoin="round" />
                        <polyline points="40,132 58,132 58,150" fill="none" stroke="black" strokeWidth="2" />
                        <text x="120" y="178" textAnchor="middle" fontSize="22" fill="currentColor">{num1}</text>
                        <text x="16" y="96" textAnchor="middle" fontSize="22" fill="currentColor">{num2}</text>
                    </svg>}
                    <div style={{height:"40px"}}>{correct && <span className="Green">{c}</span> }{wrong && <span className="Red">{c}</span> }</div>
                </div>
            </div>
            <div className="box">
            </div>
            { time - Date.now() < 0 && <Timeout again ={Again}/>}
            {mistake === 3 && <Mistake again={Again}></Mistake>}
            {count === 10 && <Pass time ={300000 -(time-Date.now())}/>}
            <div className="box column">
               <div className="row ">
                    { loaded && <Choice value ={c+num3[0]} answer ={c} doSomething = {Add} Correct={CorrectA} Wrong={WrongA}/>}
                    { loaded && <Choice value ={c+num3[1]} answer ={c} doSomething = {Add} Correct={CorrectA} Wrong={WrongA}/>}
                    { loaded && <Choice value ={c+num3[2]} answer ={c} doSomething = {Add} Correct={CorrectA} Wrong={WrongA}/>}
               </div>
               <div className="row">
                    { loaded && <Choice value ={c+num3[3]} answer ={c} doSomething = {Add} Correct={CorrectA} Wrong={WrongA}/>}
                    { loaded && <Choice value ={c+num3[4]} answer ={c} doSomething = {Add} Correct={CorrectA} Wrong={WrongA}/>}
               </div>
            </div>
        </div>
    )
}
