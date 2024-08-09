import { useEffect, useState } from "react";
import Choice from "@/components/choice";
import Correct from "@/components/correct";
import Wrong from "@/components/wrong"; 
import StepAdd from '@/components/StepAdd'
import Link from "next/link";
import { useRouter } from "next/router";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";

export default function DoubleAdd(){
    const [help, setHelp] = useState(false)
    const [loaded, setLoaded] = useState(false)
    const [correct, setCorrect] = useState(false)
    const[ wrong, setWrong] = useState(false)
    const [num1, setNum1] = useState(Math.floor(Math.random()*90+10));
    const [num2, setNum2] = useState(Math.floor(Math.random()*90+10));
    const [num3, setNum3] = useState([0,Math.ceil(Math.random()*10),-1*Math.ceil(Math.random()*10),Math.ceil(Math.random()*20+10),-1*(Math.ceil(Math.random()*10+10))])
    const router = useRouter()
    const {username} = router.query 
    const {id} = router.query 

    function mix(){
        setNum3([0,Math.ceil(Math.random()*10),-1*Math.ceil(Math.random()*10),Math.ceil(Math.random()*20+10),-1*(Math.ceil(Math.random()*10+10))])
    }

    function open(){
        setHelp(true)
      }
      function close(){
        setHelp(false)
      }

    function CorrectA(){ 
        setCount(count+1)
        setScore(score+1)
        setCorrect(true)
        setTimeout(() => {
            setCorrect(false) 
        }, 1900);
      }
  
      function WrongA(){ 
        setWrong(true)
        setTimeout(() => {
            setWrong(false) 
        }, 1900);
      } 
    function Add(){
        setTimeout(() => {
            setNum1(Math.floor(Math.random()*90+10))
            setNum2(Math.floor(Math.random()*90+10))
            mix()
            setNum3(prevChange => prevChange.sort((a,b)=>Math.random()-0.5)) 
        }, 1500)
    }

    useEffect(() =>{
        mix()
        setNum3(prevChange => prevChange.sort((a,b)=>Math.random()-0.5))
     },[num1])

     const [score, setScore] =useState(0)
     const [count, setCount] =useState(0)
 
     useEffect(() =>{
         setLoaded(true)
         const count = parseInt(window.localStorage.getItem(`${id} DoubleAdd`))
         setCount(count ? count : 0)
         const score = parseInt(window.localStorage.getItem(`${id} score`))
         setScore(score ? score : 0)
         const ID = window.localStorage.getItem('ID')
        if(!(ID === id)){
            router.push("/")
        }
     },[])
 
     useEffect(() =>{
         if(count > 0){
         window.localStorage.setItem(`${id} DoubleAdd`, count)
     }},[count])
 
     useEffect(() =>{
         if(score > 0){
         window.localStorage.setItem(`${id} score` , score)
     }},[score])

    return(
        <div className="beige container column">
            <div className="Test sb"><div className="double" >
                <div>Score: {loaded && score}</div>
                <div className="font" >Double digit Addition: {loaded && count} </div>
            </div><Link href={`/${id}/enter/testDoubleAdd`}><button className="green test-btn">Test</button></Link></div>
            <div className="box column">
                <div className="double top-number">{loaded && num1}</div>
                <div className="double bottom-number">+{loaded && num2}</div>
            </div>
            <div className="box">
                <button className="help" onClick={open}>Step by step</button>
            </div>
            {help && <StepAdd num1 ={num1} num2={num2} close={close}/>}
            {loaded && correct && <Correct></Correct>}
            {loaded && wrong && <Wrong/> }
            <div className="box column">
               <div className="row ">
                    { loaded && <Choice value ={num1+num2+num3[0]} answer ={num1+num2} doSomething = {Add} Correct={CorrectA} Wrong={WrongA}/>}
                    { loaded && <Choice value ={num1+num2+num3[1]} answer ={num1+num2} doSomething = {Add} Correct={CorrectA} Wrong={WrongA}/>}
                    { loaded && <Choice value ={num1+num2+num3[2]} answer ={num1+num2} doSomething = {Add} Correct={CorrectA} Wrong={WrongA}/>}
               </div>
               <div className="row">
                    { loaded && <Choice value ={num1+num2+num3[3]} answer ={num1+num2} doSomething = {Add} Correct={CorrectA} Wrong={WrongA}/>}
                    { loaded && <Choice value ={num1+num2+num3[4]} answer ={num1+num2} doSomething = {Add} Correct={CorrectA} Wrong={WrongA}/>}
               </div>
            </div>
        </div>
    )
}