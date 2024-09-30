import { useEffect, useState } from "react";
import Choice from "@/components/choice";
import Correct from "@/components/correct";
import Wrong from "@/components/wrong"; 
import HelpMean from "@/components/helpMean";
import Link from "next/link";
import { useRouter } from "next/router";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";

export default function DoubleAdd(){
    const [help, setHelp] = useState(false)
    const [loaded, setLoaded] = useState(false)
    const [correct, setCorrect] = useState(false)
    const[ wrong, setWrong] = useState(false)
    const [answer, setAnswer] = useState(0)
    const [num1, setNum1] = useState(Math.ceil(Math.random()*9))
    const [num2, setNum2] = useState(Math.ceil(Math.random()*9))
    const [num3, setNum3] = useState(Math.ceil(Math.random()*9))
    const [num4, setNum4] = useState(Math.ceil(Math.random()*9))
    const [num5, setNum5] = useState(5-((num1+num2+num3+num4) % 5))
    const [num8, setNum8] = useState(5)
    const [num9, setNum9] = useState([0,1,-1,Math.ceil(Math.random()*2+1),-1*Math.ceil(Math.random()*2+1)]) 
    const [R, setR] = useState()   
    const router = useRouter()
    const {username} = router.query 
    const {id} = router.query 

    function mix(){
        setNum9([0,1,-1,Math.floor(Math.random()*2+2),-1*Math.floor(Math.random()*2+2)])
        setNum9(prevChange => prevChange.sort((a,b)=>Math.random()-0.5)) 
    }

    function open(){
        setHelp(true)
      }
      function close(){
        setHelp(false)
      }

    function CorrectA(){ 
        setCorrect(true)
        setTimeout(() => {
            setCorrect(false) 
        }, 1900);
        setCount(count+1)
        setScore(score+1)
      }
  
      function WrongA(){ 
        setWrong(true)
        setTimeout(() => {
            setWrong(false) 
        }, 1900);
      } 
    function Add(){
        setTimeout(() => {
            setNum1(Math.ceil(Math.random()*9))
            setNum2(Math.ceil(Math.random()*9))
            setNum3(Math.ceil(Math.random()*9))
            setNum4(Math.ceil(Math.random()*9))
            setNum8(Math.ceil(Math.random()*2+3))
            mix()
            setNum9(prevChange => prevChange.sort((a,b)=>Math.random()-0.5)) 
        }, 1500)
    }


    useEffect(() =>{
        setLoaded(true)
        mix()
        const ID = window.localStorage.getItem('ID')
        if(!(ID === id)){
            router.push("/")
        }
    },[])

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

     const [score, setScore] =useState(0)
     const [count, setCount] =useState(0)
  
      useEffect(() =>{
          setLoaded(true)
          const count = parseInt(window.localStorage.getItem(`${id} Mean`))
          setCount(count ? count : 0)
          const score = parseInt(window.localStorage.getItem(`${id} score`))
          setScore(score ? score : 0)
      },[])
  
      useEffect(() =>{
          if(count > 0){
          window.localStorage.setItem(`${id} Mean`, count)
      }},[count])
  
      useEffect(() =>{
          if(score > 0){
          window.localStorage.setItem(`${id} score` , score)
      }},[score])
 
     return(
         <div className="beige container column">
             <div className="Test sb"><div className="double" >
                 <div>Score: {loaded && score}</div>
                 <div className="font" >Mean: {loaded && count} </div>
             </div><Link href={`/enter/TestMean`}><button className="green test-btn">Test</button></Link></div>
            <div className="column">
                <div className="double center" style={{width:'100%'}}>{loaded && num1} {loaded && num2} {loaded && num3} {loaded && num4} {loaded && num8 > 4 && num5}</div>
            </div>
            <div className="box">
                <button className="help" onClick={open}>help</button>
            </div>
            {help && <HelpMean num1 ={num1} num2 ={num2} num3 ={num3} num4 ={num4} num5 ={num5} num8 ={num8}  close={close}/>}
            {loaded && correct && <Correct></Correct>}
            {loaded && wrong && <Wrong/> }
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