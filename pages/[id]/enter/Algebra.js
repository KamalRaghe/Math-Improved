import { useEffect, useState } from "react";
import Choice from "@/components/choice";
import Correct from "@/components/correct";
import Wrong from "@/components/wrong"; 
import Algebra from "@/Algebra/Algebra";
import Algebra1 from "@/Algebra/Algebra1";
import Algebra2 from "@/Algebra/Algebra2";
import Algebra3 from "@/Algebra/Algebra3";
import Algebra4 from "@/Algebra/Algebra4";
import Link from "next/link";
import { useRouter } from "next/router";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";



export default function DoubleAdd(){
    const [help, setHelp] = useState(false)
    const [loaded, setLoaded] = useState(false)
    const [correct, setCorrect] = useState(false)
    const[ wrong, setWrong] = useState(false)
    const [num, setNum] = useState(Math.floor(Math.random()*5))
    const [num1, setNum1] = useState(Math.ceil(Math.random()*8+1));
    const [num2, setNum2] = useState(Math.ceil(Math.random()*8+1));
    const [num3, setNum3] = useState([0,1,-1,Math.ceil(Math.random()*2+1),-1*Math.ceil(Math.random()*2+1)])
    const [num5, setNum5] = useState(Math.ceil(Math.random()*8+1));
    const router = useRouter()
    const {username} = router.query 
    const {id} = router.query 

    function mix(){
        setNum3([0,1,-1,Math.ceil(Math.random()*2+1),-1*Math.ceil(Math.random()*2+1)])
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
            setNum(Math.floor(Math.random()*5))
            setNum(2)
            setNum2(Math.ceil(Math.random()*7+2))
            mix()
            setNum3(prevChange => prevChange.sort((a,b)=>Math.random()-0.5)) 
            setNum5(Math.ceil(Math.random()*8+1))
        }, 1500)
    }


    useEffect(() =>{
        setLoaded(true)
        const ID = window.localStorage.getItem('ID')
        if(!(ID === id)){
            router.push("/")
        }
    },[])

    useEffect(() =>{
        mix()
        setNum3(prevChange => prevChange.sort((a,b)=>Math.random()-0.5))
        setNum1(Math.ceil(Math.random()*(num2-1)+1))
     },[num5,num2])

   
     const [score, setScore] =useState(0)
     const [count, setCount] =useState(0)
  
      useEffect(() =>{
          setLoaded(true)
          const count = parseInt(window.localStorage.getItem(`${id} Algebra`))
          setCount(count ? count : 0)
          const score = parseInt(window.localStorage.getItem(`${id} score`))
          setScore(score ? score : 0)
      },[])
  
      useEffect(() =>{
          if(count > 0){
          window.localStorage.setItem(`${id} Algebra`, count)
      }},[count])
  
      useEffect(() =>{
          if(score > 0){
          window.localStorage.setItem(`${id} score` , score)
      }},[score])
 
     return(
         <div className="beige container column">
             <div className="Test sb"><div className="double" >
                 <div>Score: {loaded && score}</div>
                 <div className="font" >One Variable: {loaded && count} </div>
             </div><Link href={`/${id}/enter/AlgebraTest`}><button className="green test-btn">Test</button></Link></div>
            <div className="column ">
                { loaded && num === 0  && <div className="double">{num1}𝑥 = {num2*num1}</div>}
                { loaded && num === 1  && <div className="double">𝑥 - {num1} = {num2-num1}</div>}
                { loaded && num === 2  && <div className="double">𝑥 + {num1} = {num2+num1}</div>}
                { loaded && num === 3  && <div className="double"> {num5}𝑥 - {num1} = {(num2*num5)-num1}</div>}
                { loaded && num === 4  && <div className="double"> {num5}𝑥 + {num1} = {loaded && (num2*num5)+num1}</div>}
            </div>
            <div className="box">
                <button className="help" onClick={open}>help</button>
            </div>
            {help && num === 0 && <Algebra num1 ={num1} num2={num2} close={close}/>}
            {help && num === 1 && <Algebra1 num1 ={num1} num2={num2} close={close}/>}
            {help && num === 2 && <Algebra2 num1 ={num1} num2={num2} close={close}/>}
            {help && num === 3 && <Algebra3 num1 ={num1} num2={num2} num5={num5} close={close}/>}
            {help && num === 4 && <Algebra4 num1 ={num1} num2={num2} num5={num5} close={close}/>}
            {loaded && correct && <Correct></Correct>}
            {loaded && wrong && <Wrong/> }
            <div className="box column">
               <div className="row ">
                    { loaded && <Choice big={true} size={'58px'} value ={`𝑥 = ${num2+num3[0]}`} answer ={`𝑥 = ${num2}`} doSomething = {Add} Correct={CorrectA} Wrong={WrongA}/>}
                    { loaded && <Choice big={true} size={'58px'} value ={`𝑥 = ${num2+num3[1]}`} answer ={`𝑥 = ${num2}`} doSomething = {Add} Correct={CorrectA} Wrong={WrongA}/>}
                    { loaded && <Choice big={true} size={'58px'} value ={`𝑥 = ${num2+num3[2]}`} answer ={`𝑥 = ${num2}`} doSomething = {Add} Correct={CorrectA} Wrong={WrongA}/>}
               </div>
               <div className="row">
                    { loaded && <Choice big={true} size={'58px'} value ={`𝑥 = ${num2+num3[3]}`} answer ={`𝑥 = ${num2}`} doSomething = {Add} Correct={CorrectA} Wrong={WrongA}/>}
                    { loaded && <Choice big={true} size={'58px'} value ={`𝑥 = ${num2+num3[4]}`} answer ={`𝑥 = ${num2}`} doSomething = {Add} Correct={CorrectA} Wrong={WrongA}/>}
               </div>
            </div>
        </div>
    )
}