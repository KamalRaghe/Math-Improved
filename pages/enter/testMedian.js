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
    const [answer1, setAnswer1] = useState(0)
    const [answer, setAnswer] = useState(0)
    const [num1, setNum1] = useState([Math.ceil(Math.random()*9),Math.ceil(Math.random()*9),Math.ceil(Math.random()*9),Math.ceil(Math.random()*9),Math.ceil(Math.random()*9),Math.ceil(Math.random()*9)])
    const [num2, setNum2] = useState([1,2,4,3,5,0])
    const [num8, setNum8] = useState(Math.ceil(Math.random()*1+5))
    const [num9, setNum9] = useState([0,1,-1,Math.ceil(Math.random()*2+1),-1*Math.ceil(Math.random()*2+1)])
    const [mistake, setMistake] = useState(0)
    const [count, setCount] = useState(0)
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
        setNum9([0,1,-1,Math.floor(Math.random()*2+2),-1*Math.floor(Math.random()*2+2)])

        setNum9(prevChange => prevChange.sort((a,b)=>Math.random()-0.5))
        setNum2(prevChange => prevChange.sort((a,b)=>Math.random()-0.5)) 
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
        console.log(mistake)
        setWrong(true)
        setTimeout(() => {
            setWrong(false) 
        }, 1500);
      } 
    function Add(){
        setTimeout(() => {
            setNum1([Math.ceil(Math.random()*9),Math.ceil(Math.random()*9),Math.ceil(Math.random()*9),Math.ceil(Math.random()*9),Math.ceil(Math.random()*9),Math.ceil(Math.random()*9)])        
            setNum1(prev => prev.sort((a,b)=>a-b))
            mix()
            setNum9(prevChange => prevChange.sort((a,b)=>Math.random()-0.5)) 
        }, 1500)
    }

    function cancel(){
        setDate(cancelAnimationFrame(date))
      }

    useEffect(() =>{
        mix()
        setNum9(prevChange => prevChange.sort((a,b)=>Math.random()-0.5))
     },[num1])

    useEffect(() =>{
        setLoaded(true)
        update()
    },[])


    useEffect(() =>{
        setAgain(false)
    },[again])

    useEffect(() =>{
        if(mistake >= 3 || time - Date.now() < 0 || count >= 50){
            setLoaded(false)
            setTime(time)
            cancel()
        }
    })

    
    useEffect(() =>{
        mix()
        setNum2(num1)
     },[num1])
     
     useEffect(() =>{
        setNum2(prev =>prev.sort((a,b) => a-b))
        setNum1(prev => prev.sort((a,b) => Math.random()-0.5))
        setAnswer1(answer1+1)
     },[num2])
    
     useEffect(() =>{
        mix()
        setAnswer((num1[2]+num1[3])/2)
     },[answer1])
     
     useEffect(() =>{
        mix()
     },[answer])

     useEffect(()=>{
        const ID = window.localStorage.getItem('ID')
        if(!(ID === id)){
            router.push("/")
        }
    },[])

    return(
        <div className="beige container column">
           <div className="double">Question left : {50 - count}</div>
           <div className="inTest">
            
                <div className="Red relative" > 
                    {mistake === 0 && <Heart/>}
                    {mistake === 1 && <Heart1/>}
                    {mistake === 2 && <Heart2/>}
                    {mistake === 3 && <Heart3/>}
                </div>
                {loaded && time - Date.now() > 0 && count < 50 && <div>{Math.floor(((time - Date.now())%(1000*60*60))/1000/60)}m {""}
                {Math.floor(((time - Date.now())%(1000*60))/1000)}s</div>}
            </div>

            <div style={{width:"100%"}}>
                <div className="double center" style={{width:'100%'}}>{loaded && num1[0]} {loaded && num1[1]} {loaded && num1[2]} {loaded && num1[3]} {loaded && num1[4]} {loaded && num1[5]}  {loaded && num1[6]}</div>
            </div>
            <div className="box">
                {correct && <div className="Green double" >{answer}</div>}{wrong && <div className="double Red">{answer}</div>}
            </div>
            { time - Date.now() < 0 && <Timeout again ={Again}/>}
            {mistake === 3 && <Mistake again={Again}></Mistake>}
            {count === 50 && <Pass time ={600000 -(time-Date.now())}/>}
            <div className="box column">
                <div className="row ">
                        { loaded && <Choice value ={answer - num9[0]} answer ={answer} doSomething = {Add} Correct={CorrectA} Wrong={WrongA}/>}
                        { loaded && <Choice value ={answer - num9[1]} answer ={answer} doSomething = {Add} Correct={CorrectA} Wrong={WrongA}/>}
                        { loaded && <Choice value ={answer - num9[2]} answer ={answer} doSomething = {Add} Correct={CorrectA} Wrong={WrongA}/>}
                </div>
                <div className="row">
                        { loaded && <Choice value ={answer - num9[3]} answer ={answer} doSomething = {Add} Correct={CorrectA} Wrong={WrongA}/>}
                        { loaded && <Choice value ={answer - num9[4]} answer ={answer} doSomething = {Add} Correct={CorrectA} Wrong={WrongA}/>}
                </div>
            </div>
        </div>
    )
}