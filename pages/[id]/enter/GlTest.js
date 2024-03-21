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
import Correct from "@/components/correct";
import Wrong from "@/components/wrong";
 
export default function DoubleAdd(){
    const [again, setAgain] = useState(false)
    const [loaded, setLoaded] = useState(false)
    const [sign,setSign] = useState()
    const [correct, setCorrect] = useState(false)
    const[ wrong, setWrong] = useState(false)
    const [num1, setNum1] = useState(Math.ceil(Math.random()*9));
    const [num2, setNum2] = useState(Math.ceil(Math.random()*9));
    const [num3, setNum3] = useState([0,1,-1,Math.ceil(Math.random()*2+1),-1*Math.ceil(Math.random()*2+1)])
    const [mistake, setMistake] = useState(0)
    const [count, setCount] = useState(0)
    const [time, setTime] = useState( 300000 + Date.now())
    const [date, setDate] = useState(Date.now()) 
    const router = useRouter()
    const {username} = router.query 
    const {id} = router.query
    
    function Again(){
        setAgain(true)
        setCount(0)
        setMistake(0)
        setTime(300000 + Date.now())
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
        }, 1900);
        setCount(count+1)
      }
  
      function WrongA(){ 
        setMistake( mistake + 1)
        console.log(mistake)
        setWrong(true)
        setTimeout(() => {
            setWrong(false) 
        }, 1900);
      } 
    function Add(){
        setTimeout(() => {
            setNum1(Math.ceil(Math.random()*9))
            setNum2(Math.ceil(Math.random()*9))
            mix()
            setNum3(prevChange => prevChange.sort((a,b)=>Math.random()-0.5)) 
        }, 1900)
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
        if(mistake >= 3 || time - Date.now() < 0 || count >= 25){
            setLoaded(false)
            setTime(time)
            console.log(time)
            cancel()
        }
    })

    
    useEffect(() =>{
        mix()
        setNum3(prevChange => prevChange.sort((a,b)=>Math.random()-0.5))
        if(num1>num2){
            setSign('>')
        }if(num1=== num2){
            setSign('=')
        }if(num1<num2){
            setSign('<')
        }
     },[num1])

    return(
        <div className="beige container column">
           <div className="double">Question left : {25 - count}</div>
           <div className="inTest">
            
                <div className="Red relative" > 
                    {mistake === 0 && <Heart/>}
                    {mistake === 1 && <Heart1/>}
                    {mistake === 2 && <Heart2/>}
                    {mistake === 3 && <Heart3/>}
                </div>
                {loaded && time - Date.now() > 0 && count < 25 && <div>{Math.floor(((time - Date.now())%(1000*60*60))/1000/60)}m {""}
                {Math.floor(((time - Date.now())%(1000*60))/1000)}s</div>}
            </div>

            <div className="center">
                <div className="double">{loaded && num1} ? {loaded && num2}</div>
            </div>
            <div className="box">
            </div>
            { time - Date.now() < 0 && <Timeout again ={Again}/>}
            {mistake === 3 && <Mistake again={Again}></Mistake>}
            {count === 25 && <Pass time ={300000 -(time-Date.now())}/>}
            {loaded && correct && <Correct></Correct>}
            {loaded && wrong && <Wrong/> }
            <div className="box column">
            <div className="row ">
                    { loaded && <Choice value ={'>'} answer ={sign} doSomething = {Add} Correct={CorrectA} Wrong={WrongA}/>}
                    { loaded && <Choice value ={'<'} answer ={sign} doSomething = {Add} Correct={CorrectA} Wrong={WrongA}/>}
               </div>
               <div className="row">
                    { loaded && <Choice value ={'='} answer ={sign} doSomething = {Add} Correct={CorrectA} Wrong={WrongA}/>}
               </div>
            </div>
        </div>
    )
}