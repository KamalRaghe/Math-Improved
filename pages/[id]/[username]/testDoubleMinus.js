import { useEffect, useState } from "react";
import Choice from "@/components/choice";
import TestStepMinus from "@/components/testStepMinus";
import Timeout from "@/components/timeout";
import Heart from "@/components/heart";
import Heart1 from "@/components/heart1";
import Heart2 from "@/components/heart2";
import Heart3 from "@/components/heart3";
import Mistake from "@/components/mistake";
import Pass from "@/components/pass";
import { useRouter } from "next/router";

export async function getServerSideProps(context){
    return{
        props: {
        }
    }
}

export default function testDoubleMinus(){
    const [help, setHelp] = useState(false)
    const [loaded, setLoaded] = useState(false)
    const [correct, setCorrect] = useState(false)
    const[ wrong, setWrong] = useState(false)
    const [time, setTime] = useState( 600000 + Date.now())
    const [date, setDate] = useState(Date.now()) 
    const [again, setAgain] = useState(false)
    const [count, setCount] = useState(0)
    const [mistake, setMistake] = useState(0)
    const router = useRouter()
    const {username} = router.query 
    const {id} = router.query
    const [num1, setNum1] = useState(Math.floor(Math.random()*50+50));
    const [num2, setNum2] = useState(Math.floor(Math.random()*40+10));
    const [num3, setNum3] = useState([0,Math.ceil(Math.random()*10),-1*Math.ceil(Math.random()*10),Math.ceil(Math.random()*20+10),-1*(Math.ceil(Math.random()*10+10))])
    function mix(){
        setNum3([0,Math.ceil(Math.random()*10),-1*Math.ceil(Math.random()*10),Math.ceil(Math.random()*20+10),-1*(Math.ceil(Math.random()*10+10))])
    }

    function Again(){
        setAgain(true)
        setCount(0)
        setMistake(0)
        setTime(600000 + Date.now())
        setLoaded(true)
    }

    function open(){
        setHelp(true)
      }
      function close(){
        setHelp(false)
      }

    function CorrectA(){
        setCount(count + 1) 
        setCorrect(true)
        setTimeout(() => {
            setCorrect(false) 
        }, 1500);
      }
  
      function WrongA(){
        setMistake(mistake + 1)
        console.log(mistake)
        setWrong(true)
        setTimeout(() => {
            setWrong(false) 
        }, 1500);
      } 
    function Add(){
        setTimeout(() => {
            setNum1(Math.floor(Math.random()*50+50))
            setNum2(Math.floor(Math.random()*40+10))
            mix()
            setNum3(prevChange => prevChange.sort((a,b)=>Math.random()-0.5)) 
        }, 1500)
    }

    function update(){
        setDate(requestAnimationFrame(update))
      }

      function cancel(){
        setDate(cancelAnimationFrame(date))
      }

    useEffect(() =>{
        setLoaded(true)
        update()
    },[])

    useEffect(() =>{
        setAgain(false)
    },[again])

    useEffect(()=>{
        const ID = window.localStorage.getItem('ID')
        if(!(ID === id)){
            router.push("/")
        }
    },[])

    useEffect(() =>{
        mix()
        setNum3(prevChange => prevChange.sort((a,b)=>Math.random()-0.5))
     },[num1])

    useEffect(() =>{
        if(mistake >= 3 || time - Date.now() < 0 || count >= 25){
            setLoaded(false)
            setTime(time)
            cancel()
            console.log(time)
        }
    })

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
            <div className="box column">
                <div className="double top-number">{loaded && num1}</div>
                <div className="double bottom-number" >-<span className="hide">.</span>{loaded && num2}</div>
                {correct && <div className="Green double lower-number">{loaded && num1-num2}</div>}{wrong && <div className="Red double lower-number``">{loaded && num2+num1}</div>}
            </div>
            <div className="box">
               
            </div>
            
            { time - Date.now() < 0 && <Timeout again ={Again}/>}
            {mistake === 3 && <Mistake again={Again}></Mistake>}
            {count === 25 && <Pass time ={600000 -(time-Date.now())}/>}
            <div className="box column">
               <div className="row ">
                    { loaded && <Choice value ={num1-num2+num3[0]} answer ={num1-num2} doSomething = {Add} Correct={CorrectA} Wrong={WrongA}/>}
                    { loaded && <Choice value ={num1-num2+num3[1]} answer ={num1-num2} doSomething = {Add} Correct={CorrectA} Wrong={WrongA}/>}
                    { loaded && <Choice value ={num1-num2+num3[2]} answer ={num1-num2} doSomething = {Add} Correct={CorrectA} Wrong={WrongA}/>}
               </div>
               <div className="row">
                    { loaded && <Choice value ={num1-num2+num3[3]} answer ={num1-num2} doSomething = {Add} Correct={CorrectA} Wrong={WrongA}/>}
                    { loaded && <Choice value ={num1-num2+num3[4]} answer ={num1-num2} doSomething = {Add} Correct={CorrectA} Wrong={WrongA}/>}
               </div>
            </div>
        </div>
    )
}