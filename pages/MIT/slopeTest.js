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



export default function DoubleAdd(){
    const [num4, setNum4] = useState(Math.ceil(Math.random()*4+5));
    const [num5, setNum5] = useState(Math.ceil(Math.random()*4+5));
    const [help, setHelp] = useState(false)
    const [loaded, setLoaded] = useState(false)
    const [correct, setCorrect] = useState(false)
    const[ wrong, setWrong] = useState(false)
    const [num1, setNum1] = useState(Math.ceil(Math.random()*9));
    const [num2, setNum2] = useState(Math.ceil(Math.random()*9));
    const [slope, setSlope] = useState(Math.ceil(Math.random()*9));
    const [num3, setNum3] = useState([0,num1+num1,num1+num1+num1,-1*num1,num1])
    const router = useRouter()
    const {username} = router.query 
    const {id} = router.query 

    function mix(){
        setNum3([0,num1+num1,num1+num1+num1,-1*num1,num1])
    }
    const [again, setAgain] = useState(false)
    const [mistake, setMistake] = useState(0)
    const [count, setCount] = useState(0)
    const [time, setTime] = useState( 600000 + Date.now())
    const [date, setDate] = useState(Date.now()) 
    const [num, setNum] = useState(1)

    function Again(){
        setAgain(true)
        setCount(0)
        setMistake(0)
        setTime(600000 + Date.now())
        setLoaded(true)
    }

    function update(){
        setDate(requestAnimationFrame(update))
      }

    function CorrectA(){ 
        setCorrect(true)
        setTimeout(() => {
            setCorrect(false) 
        }, 1200);
        setCount(count+1)
      }
  
      function WrongA(){ 
        setMistake( mistake + 1)
        setWrong(true)
        Add()
        setTimeout(() => {
            setWrong(false) 
        }, 1200);
      } 
      function Add(){
        setTimeout(() => {
            setNum1(Math.ceil(Math.random()*5))
            setNum2(Math.ceil(Math.random()*5))
            setNum4(Math.ceil(Math.random()*4+5))
            setNum5(Math.ceil(Math.random()*4+5))
            mix()
            setNum3(prevChange => prevChange.sort((a,b)=>Math.random()-0.5))
        }, 1500)
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
        mix()
        setNum3(prevChange => prevChange.sort((a,b)=>Math.random()-0.5))
    },[])

    useEffect(()=>{
        const ID = window.localStorage.getItem('ID')
        if(!(ID === id)){
            router.push("/")
        }
    },[])

    useEffect(() =>{
        setAgain(false)
    },[again])

    useEffect(() =>{
        if(mistake >= 3 || time - Date.now() < 0 || count >= 20){
            setLoaded(false)
            setTime(time)
            cancel()
        }
    })

    return(
        <div className="beige container column">
           <div className="double">Question left : {20 - count}</div>
           <div className="inTest">
            
                <div className="Red relative" > 
                    {mistake === 0 && <Heart/>}
                    {mistake === 1 && <Heart1/>}
                    {mistake === 2 && <Heart2/>}
                    {mistake === 3 && <Heart3/>}
                </div>
                {loaded && time - Date.now() > 0 && count < 20 && <div>{Math.floor(((time - Date.now())%(1000*60*60))/1000/60)}m {""}
                {Math.floor(((time - Date.now())%(1000*60))/1000)}s</div>}
            </div>

            <div>
                <span className="hide">00000</span>
                {loaded && <div style={{width:"340px"}}>
                <div className="double center column ">
                    <div>y = m𝑥  + b</div>
                    <div>𝑥 = {loaded && num1} <span className="hide" >0</span>y = {loaded && num2}</div>  
                    <div>m = {loaded && slope} <span className="hide" >0</span>b = ?</div>
                </div>   
            </div>}
                    <br></br>
                    {correct && <div className="Green center double" > b = {num2-(num1*slope)}</div>} 
                    {wrong && <div className="Red center double" > b = {num2-(num1*slope)} </div>} 
            </div>
            
            <div className="box"></div>
            { time - Date.now() < 0 && <Timeout again ={Again}/>}
            {mistake === 3 && <Mistake again={Again}></Mistake>}
            {count === 20 && <Pass time ={600000 -(time-Date.now())}/>}
            <div className="box column">
                <div className="row ">
                    { loaded && <Choice value ={num2-(num1*slope)+num3[0]} answer ={num2-(num1*slope)} doSomething = {Add} Correct={CorrectA} Wrong={WrongA}/>}
                    { loaded && <Choice value ={num2-(num1*slope)+num3[1]} answer ={num2-(num1*slope)} doSomething = {Add} Correct={CorrectA} Wrong={WrongA}/>}
                    { loaded && <Choice value ={num2-(num1*slope)+num3[2]} answer ={num2-(num1*slope)} doSomething = {Add} Correct={CorrectA} Wrong={WrongA}/>}
               </div>
               <div className="row">
                    { loaded && <Choice value ={num2-(num1*slope)+num3[3]} answer ={num2-(num1*slope)} doSomething = {Add} Correct={CorrectA} Wrong={WrongA}/>}
                    { loaded && <Choice value ={num2-(num1*slope)+num3[4]} answer ={num2-(num1*slope)} doSomething = {Add} Correct={CorrectA} Wrong={WrongA}/>}
               </div>
            </div>
        </div>
    )
}