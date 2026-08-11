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
    const [answer, setAnswer] = useState(0)
    const [again, setAgain] = useState(false)
    const [loaded, setLoaded] = useState(false)
    const [correct, setCorrect] = useState(false)
    const[ wrong, setWrong] = useState(false)
    const [num1, setNum1] = useState(Math.ceil(Math.random()*9));
    const [num2, setNum2] = useState(Math.ceil(Math.random()*9));
    const [num3, setNum3] = useState(Math.ceil(Math.random()*9))
    const [num4, setNum4] = useState(Math.ceil(Math.random()*9))
    const [num5, setNum5] = useState(Math.ceil(Math.random()*9))
    const [num8, setNum8] = useState(Math.ceil(Math.random()*2+3))
    const [num9, setNum9] = useState([0,1,-1,Math.ceil(Math.random()*2+1),-1*Math.ceil(Math.random()*2+1)]) 
    const [mistake, setMistake] = useState(0)
    const [count, setCount] = useState(0)
    const [R, setR] = useState()  
    const [time, setTime] = useState( 600000 + Date.now())
    const [date, setDate] = useState(Date.now()) 
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
        setNum9([0,1,-1,Math.ceil(Math.random()*2+1),-1*Math.ceil(Math.random()*2+1)])
        setNum9(prevChange => prevChange.sort((a,b)=>Math.random()-0.5)) 
    }

    function update(){
        setDate(requestAnimationFrame(update))
      }

    function CorrectA(){ 
        setCorrect(true)
        setTimeout(() => {
            setCorrect(false) 
        }, 1500);
        setCount(count+1)
      }
  
      function WrongA(){ 
        setMistake( mistake + 1)
        setWrong(true)
        setTimeout(() => {
            setWrong(false) 
        }, 1500);
      } 
      function Add(){
        setTimeout(() => {
            setNum1(Math.ceil(Math.random()*9))
            setNum2(Math.ceil(Math.random()*9))
            setNum3(Math.ceil(Math.random()*9))
            setNum4(Math.ceil(Math.random()*9))
            setNum5(Math.ceil(Math.random()*9))
            setNum8(Math.ceil(Math.random()*2+3))
            mix()
            setNum9(prevChange => prevChange.sort((a,b)=>Math.random()-0.5)) 
        }, 1500)
    }

    useEffect(() =>{
        mix()
        if(num8 === 4){
            setNum4(4-((num1+num2+num3)%4))
        }if(num8 === 5){
            setNum4(Math.ceil(Math.random()*9))
        }
     },[num1, num2])

     useEffect(() =>{
        mix()
        if(num8 === 5){
            setAnswer(Math.floor((num1+num2+num3+num4+num5)/5))
            setNum5(5-((num1+num2+num3+num4) % 5))
        }
     },[num1,num4,num2])

     useEffect(() =>{
        mix()
        if(num8 === 4){
            setAnswer(Math.floor((num1+num2+num3+num4)/4))
        }if(num8 === 5){
            setAnswer(Math.floor((num1+num2+num3+num4+num5)/5))
        }
     },[num4, num5])

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

    useEffect(() =>{
        if(mistake >= 3 || time - Date.now() < 0 || count >= 25){
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

            <div style={{width:"100%"}}>
            <div className="double center" style={{width:'100%'}}>{loaded && num1} {loaded && num2} {loaded && num3} {loaded && num4} {loaded && num8 > 4 && num5}</div>
            </div>
            <div className="box">
                {correct && <span className="double Green" >{answer}</span>}
                {wrong && <span className="double Red" >{answer}</span>}
            </div>
            { time - Date.now() < 0 && <Timeout again ={Again}/>}
            {mistake === 3 && <Mistake again={Again}></Mistake>}
            {count === 25 && <Pass time ={600000 -(time-Date.now())}/>}
            <div className="box column">
               <div className="row ">
                    { loaded && <Choice value ={answer - num9[0]} answer ={answer} doSomething = {Add} Correct={CorrectA} Wrong={WrongA}/>}
                    { loaded && <Choice value ={answer - num9[1]} answer ={answer} doSomething = {Add} Correct={CorrectA} Wrong={WrongA}/>}
                    { loaded && <Choice value ={answer - num9[2]} answer ={answer} doSomething = {Add} Correct={CorrectA} Wrong={WrongA}/>}
               </div>
               <div className="row">
                    { loaded && <Choice value ={answer - num9[3]} answer ={answer} doSomething = {Add} Correct={CorrectA} Wrong={WrongA}/>}
                    { loaded && <Choice value ={answer - num9[4] } answer ={answer} doSomething = {Add} Correct={CorrectA} Wrong={WrongA}/>}
               </div>
            </div>
        </div>
    )
}