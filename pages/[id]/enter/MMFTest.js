import { useEffect, useState } from "react";
import Choice from "@/components/FractionChoice";
import MMF from "@/components/MMF";
import { useRouter } from "next/router";
import Heart from "@/components/heart";
import Heart1 from "@/components/heart1";
import Heart2 from "@/components/heart2";
import Heart3 from "@/components/heart3";
import Timeout from "@/components/timeout";
import Pass from "@/components/pass";
import Mistake from "@/components/mistake";

export default function DoubleAdd(){

    const [again, setAgain] = useState(false)
    const [loaded, setLoaded] = useState(false)
    const [correct, setCorrect] = useState(false)
    const[ wrong, setWrong] = useState(false)
    const [num1, setNum1] = useState(Math.ceil(Math.random()*7+2));
    const [num2, setNum2] = useState(Math.ceil(Math.random()*9));
    const [num4, setNum4] = useState(Math.ceil(Math.random()*9));
    const [num3, setNum3] = useState([0,1,-1,2,-2])
    const [num5, setNum5] = useState(Math.ceil(Math.random()*5+4));
    const [num6, setNum6] = useState(Math.ceil(Math.random()*9));
    const [num7, setNum7] = useState(Math.ceil(Math.random()*9));
    const [num8, setNum8] = useState(Math.ceil(Math.random()*7+2))
    const [mistake, setMistake] = useState(0)
    const [count, setCount] = useState(0)
    const [time, setTime] = useState( 1200000 + Date.now())
    const [date, setDate] = useState(Date.now()) 
    const [help, setHelp] = useState(false)
    const [num, setNum] = useState(1)
    const router = useRouter()
    const {username} = router.query 
    const {id} = router.query
    
    function open(){
        setHelp(true)
        console.log(help)
      }
      function close(){
        setHelp(false)
      }

    function Again(){
        setAgain(true)
        setCount(0)
        setMistake(0)
        setTime(1200000 + Date.now())
        setLoaded(true)
    }

    function mix(){
        setNum3([0,1,-1,2,-2])
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
            setNum1(Math.ceil(Math.random()*7+2))
            setNum5(Math.ceil(Math.random()*5+4))
            setNum6(Math.ceil(Math.random()*7+2))
            setNum8(Math.ceil(Math.random()*7+2))
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
        setNum1(Math.ceil(Math.random()*7+2))
        mix()
        setNum3(prevChange => prevChange.sort((a,b)=>Math.random()-0.5))
        const ID = window.localStorage.getItem('ID')
        if(!(ID === id)){
            router.push("/")
        }
    },[])

 

    useEffect(()=>{
        setNum7(Math.floor(((num4+(num5*num6))*num1)/(num5*(num2+(num8*num1)))))
        for(let i= (num1*num5)  ; i > 0 ;i--){
            if (((num2+(num1*num8))*(num4+(num6*num5)))%(num5*num1)  % i === 0 && num1*num5 % i === 0){
                console.log(i,'worked')
                setNum(i)
                break
            }
        }
     },[num2,num4])


    useEffect(() =>{
       mix()
       setNum3(prevChange => prevChange.sort((a,b)=>Math.random()-0.5))
       setNum4(Math.ceil(Math.random()*(num5-1)))
       setNum2(Math.ceil(Math.random()*(num1-1)))
    },[num8,num5,num6])

    useEffect(() =>{
        setAgain(false)
    },[again])

    useEffect(() =>{
        if(mistake >= 3 || time - Date.now() < 0 || count >= 10){
            setLoaded(false)
            setTime(time)
            console.log(time)
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

            <div className="box">
                <span className="hide">00000</span>
                {loaded && <div className=" double center"><span style={{padding:'3px'}} >{num6}</span>
                    <div className="column center" >
                        <div className="center" style={{borderBottom:'2px solid black', width:'45px'}} >
                            {num4}</div>
                    {num5}</div></div>}
                    <div className="double" style={{padding:'10px'}} >x</div>
                    {loaded && <div className=" double center"><span style={{padding:'3px'}} >{num8}</span>
                    <div className="column center" >
                        <div className="center" style={{borderBottom:'2px solid black', width:'45px'}} >
                            {num2}</div>
                    {num1}</div></div>}
                    <div className="double" style={{padding:'10px'}} >=</div>
                    {correct && num7 > 0  && <div className="Green double" style={{padding:'3px'}} >{num7}</div>}
                    {wrong && num7 > 0  && <div className="Red double" style={{padding:'3px'}} >{num7}</div>}
                    {loaded && correct && (((num4+(num6*num5))*(num2+(num1*num8))) % (num1*num5)) > 0 && <div className=" Green double center">
                    <div className="column center" >
                        <div className="center" style={{borderBottom:'2px solid green', width:'45px'}} >
                            {((num2+(num1*num8))*(num4+(num6*num5)))%(num5*num1)/num}</div>
                    {(num1*num5)/num}</div></div>}
                    {loaded && wrong && (((num4+(num6*num5))*(num2+(num1*num8))) % (num1*num5)) > 0 && <div className="Red double center">
                    <div className="column center" >
                        <div className="center" style={{borderBottom:'2px solid red', width:'45px'}} >
                            {((num2+(num1*num8))*(num4+(num6*num5)))%(num5*num1)/num}</div>
                    {(num1*num5)/num}</div></div>}
                     
            </div>
           
            <div className="box">
            
                
            </div>
            { time - Date.now() < 0 && <Timeout again ={Again}/>}
            {mistake === 3 && <Mistake again={Again}></Mistake>}
            {count === 10 && <Pass time ={600000 -(time-Date.now())}/>}
            <div className="box column">
            <div className="row ">
                    { loaded && <Choice whole={Math.floor((num4+(num5*num6))*(num2+(num1*num8))/(num5*num1))} value1 ={(((num2+(num1*num8))*(num4+(num5*num6)))+num3[0])%(num5*num1)} answer1 ={((num2+(num1*num8))*(num4+(num6*num5)))%(num5*num1)} value2={num1*num5} answer2={num1*num5} doSomething = {Add} Correct={CorrectA} Wrong={WrongA}/>}
                    { loaded && <Choice whole={Math.floor((num4+(num5*num6))*(num2+(num1*num8))/(num5*num1))} value1 ={(((num2+(num1*num8))*(num4+(num5*num6)))+num3[1])%(num5*num1)} answer1 ={((num2+(num1*num8))*(num4+(num6*num5)))%(num5*num1)} value2={num1*num5} answer2={num1*num5} doSomething = {Add} Correct={CorrectA} Wrong={WrongA}/>}
                    { loaded && <Choice whole={Math.floor((num4+(num5*num6))*(num2+(num1*num8))/(num5*num1))} value1 ={(((num2+(num1*num8))*(num4+(num5*num6)))+num3[2])%(num5*num1)} answer1 ={((num2+(num1*num8))*(num4+(num6*num5)))%(num5*num1)} value2={num1*num5} answer2={num1*num5} doSomething = {Add} Correct={CorrectA} Wrong={WrongA}/>}
               </div>
               <div className="row">
                    { loaded && <Choice whole={Math.floor((num4+(num5*num6))*(num2+(num1*num8))/(num5*num1))} value1 ={(((num2+(num1*num8))*(num4+(num5*num6)))+num3[3])%(num5*num1)} answer1 ={((num2+(num1*num8))*(num4+(num6*num5)))%(num5*num1)} value2={num1*num5} answer2={num1*num5} doSomething = {Add} Correct={CorrectA} Wrong={WrongA}/>}
                    { loaded && <Choice whole={Math.floor((num4+(num5*num6))*(num2+(num1*num8))/(num5*num1))} value1 ={(((num2+(num1*num8))*(num4+(num5*num6)))+num3[4])%(num5*num1)} answer1 ={((num2+(num1*num8))*(num4+(num6*num5)))%(num5*num1)} value2={num1*num5} answer2={num1*num5} doSomething = {Add} Correct={CorrectA} Wrong={WrongA}/>}
               </div>
            </div>
        </div>
    )
}