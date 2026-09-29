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

// random number from 0.1 to 9.999, with 1, 2 or 3 decimal digits
function randDecimal(){
    const places = Math.ceil(Math.random()*3) // 1, 2 or 3
    const min = Math.round(0.1*Math.pow(10,places))
    const max = Math.round(9.999*Math.pow(10,places))
    const n = Math.floor(Math.random()*(max-min+1)+min)
    return n/Math.pow(10,places)
}

function round(n){
    return Math.round(n*1000)/1000
}

// splits a number into its whole and fractional parts so both rows can
// line up on the decimal point, regardless of how many digits each has
function splitParts(n){
    const s = n.toString()
    const [whole, frac] = s.split('.')
    return { whole, frac: frac || "" }
}

export default function TestAddDecimal(){
    const [again, setAgain] = useState(false)
    const [loaded, setLoaded] = useState(false)
    const [correct, setCorrect] = useState(false)
    const [wrong, setWrong] = useState(false)
    const [num1, setNum1] = useState(randDecimal());
    const [num2, setNum2] = useState(randDecimal());
    const [num3, setNum3] = useState([0,round(Math.random()*1),round(-1*Math.random()*1),round(Math.random()*2+1),round(-1*(Math.random()*2+1))])
    const [mistake, setMistake] = useState(0)
    const [count, setCount] = useState(0)
    const [time, setTime] = useState( 300000 + Date.now())
    const [date, setDate] = useState(Date.now())
    const router = useRouter()
    const {username} = router.query
    const {id} = router.query

    const part1 = splitParts(num1)
    const part2 = splitParts(num2)

    function Again(){
        setAgain(true)
        setCount(0)
        setMistake(0)
        setTime(300000 + Date.now())
        setNum1(randDecimal())
        setNum2(randDecimal())
        setLoaded(true)
    }

    function mix(){
        setNum3([0,round(Math.random()*1),round(-1*Math.random()*1),round(Math.random()*2+1),round(-1*(Math.random()*2+1))])
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
            setNum1(randDecimal())
            setNum2(randDecimal())
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

            {loaded && <div className="column" style={{fontFamily:"monospace",padding:'10px',alignSelf:"center"}}>
                <div className="double" style={{display:"flex", justifyContent:"flex-end"}}>
                    <span style={{display:"inline-block", textAlign:"right"}}>{part1.whole}</span>
                    <span style={{display:"inline-block", width:"14px", textAlign:"center"}}>{part1.frac && "."}</span>
                    <span style={{display:"inline-block", textAlign:"left"}}>{part1.frac}</span>
                </div>
                <div className="double bottom-number" style={{display:"flex", justifyContent:"flex-end"}}>
                    <span style={{display:"inline-block", textAlign:"right"}}>+ {part2.whole}</span>
                    <span style={{display:"inline-block", width:"14px", textAlign:"center"}}>{part2.frac && "."}</span>
                    <span style={{display:"inline-block", textAlign:"left"}}>{part2.frac}</span>
                </div>
            </div>}
            {correct && <span className="Green double" style={{paddingLeft:"10px"}}>{round(num1+num2)}</span> }
            {wrong && <span className="Red double" style={{paddingLeft:"10px"}}>{round(num1+num2)}</span> }
            <div className="box">
            </div>
            { time - Date.now() < 0 && <Timeout again ={Again}/>}
            {mistake === 3 && <Mistake again={Again}></Mistake>}
            {count === 10 && <Pass time ={300000 -(time-Date.now())}/>}
            <div className="box column">
               <div className="row ">
                    { loaded && <Choice value ={round(num1+num2+num3[0])} answer ={round(num1+num2)} doSomething = {Add} Correct={CorrectA} Wrong={WrongA}/>}
                    { loaded && <Choice value ={round(num1+num2+num3[1])} answer ={round(num1+num2)} doSomething = {Add} Correct={CorrectA} Wrong={WrongA}/>}
                    { loaded && <Choice value ={round(num1+num2+num3[2])} answer ={round(num1+num2)} doSomething = {Add} Correct={CorrectA} Wrong={WrongA}/>}
               </div>
               <div className="row">
                    { loaded && <Choice value ={round(num1+num2+num3[3])} answer ={round(num1+num2)} doSomething = {Add} Correct={CorrectA} Wrong={WrongA}/>}
                    { loaded && <Choice value ={round(num1+num2+num3[4])} answer ={round(num1+num2)} doSomething = {Add} Correct={CorrectA} Wrong={WrongA}/>}
               </div>
            </div>
        </div>
    )
}