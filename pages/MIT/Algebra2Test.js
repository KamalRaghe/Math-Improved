import { useEffect, useState } from "react";
import Choice from "@/components/choice";
import { useRouter } from "next/router";
import Heart from "@/components/heart";
import Heart1 from "@/components/heart1";
import Heart2 from "@/components/heart2";
import Heart3 from "@/components/heart3";
import Timeout from "@/components/timeout";
import Pass from "@/components/passTiral"; 
import Mistake from "@/components/mistake";



export default function DoubleAdd(){
    const [again, setAgain] = useState(false)
    const [loaded, setLoaded] = useState(false)
    const [correct, setCorrect] = useState(false)
    const[ wrong, setWrong] = useState(false)
    const [num, setNum] = useState(Math.floor(Math.random()*5))
    const [num1, setNum1] = useState(Math.ceil(Math.random()*8+1));
    const [num2, setNum2] = useState(Math.ceil(Math.random()*8+1));
    const [num3, setNum3] = useState([0,-1,Math.ceil(Math.random()*2+1)])
    const [num5, setNum5] = useState(Math.ceil(Math.random()*8+1));
    const [num4, setNum4] = useState(Math.ceil(Math.random()*8+1));
    const [num6, setNum6] = useState(Math.ceil(Math.random()*5));
    const [num7, setNum7] = useState(Math.ceil(Math.random()*5));
    const [mistake, setMistake] = useState(0)
    const [count, setCount] = useState(0)
    const [time, setTime] = useState( 600000 + Date.now())
    const [date, setDate] = useState(Date.now()) 
    const [help, setHelp] = useState(false)
    const router = useRouter()
    const {username} = router.query 
    const {id} = router.query
    
    function Again(){
        setAgain(true)
        setCount(0)
        setMistake(0)
        setTime(600000 + Date.now())
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
            setNum(Math.floor(Math.random()*5))
            setNum2(Math.ceil(Math.random()*7+2))
            mix()
            setNum3(prevChange => prevChange.sort((a,b)=>Math.random()-0.5)) 
            setNum5(Math.ceil(Math.random()*8+1))
            setNum4(Math.ceil(Math.random()*8+1))
            setNum7(Math.ceil(Math.random()*5))
            setNum6(Math.ceil(Math.random()*5))
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
        const ID = window.localStorage.getItem('ID')
        if(!(ID === id)){
            router.push("/")
        }
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

            <div className="column ">
                { loaded && <div className="double"> {num2}𝑥 + {num1}y = {loaded && (num2*num6)+(num1*num7)}</div>}
                { loaded && <div className="double"> {num4}𝑥 + {num5}y = {loaded && (num4*num6)+(num5*num7)}</div>}
            </div>
            <div className="box column">
                {correct && <div className="Green double" >𝑥 = {num6}</div>}
                {wrong && <div className="Red double" >𝑥 = {num6}</div>}
                {correct && <div className="Green double" >y = {num7}</div>}
                {wrong && <div className="Red double" >y = {num7}</div>}
            </div>
            { time - Date.now() < 0 && <Timeout again ={Again}/>}
            {mistake === 3 && <Mistake again={Again}></Mistake>}
            {count === 10 && <Pass time ={600000 -(time-Date.now())}/>}
            <div className="box column">
            <div className="row ">
                    { loaded && <Choice big={true} size={'115px'} value ={`𝑥 = ${num6+num3[0]}, y = ${num7-num3[0]}`} answer ={`𝑥 = ${num6}, y = ${num7}`} doSomething = {Add} Correct={CorrectA} Wrong={WrongA}/>}
                    { loaded && <Choice big={true} size={'115px'} value ={`𝑥 = ${num6+num3[1]}, y = ${num7+num3[1]}`} answer ={`𝑥 = ${num6}, y = ${num7}`} doSomething = {Add} Correct={CorrectA} Wrong={WrongA}/>}
               </div>
               <div className="row">
                    { loaded && <Choice big={true} size={'115px'} value ={`𝑥 = ${num6-num3[2]}, y = ${num7+num3[2]}`} answer ={`𝑥 = ${num6}, y = ${num7}`} doSomething = {Add} Correct={CorrectA} Wrong={WrongA}/>}
               </div>
            </div>
        </div>
    )
}