import { useEffect, useState } from "react";
import Choice from "@/components/choice";
import Correct from "@/components/correct";
import Wrong from "@/components/wrong"; 
import HelpMode from "@/components/helpMode";
import Link from "next/link";
import { useRouter } from "next/router";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";
import Sign from "@/components/SignUp";
import Sign2 from "@/components/SignUp2";

export default function DoubleAdd(){
    const [help, setHelp] = useState(false)
    const [loaded, setLoaded] = useState(false)
    const [correct, setCorrect] = useState(false)
    const[ wrong, setWrong] = useState(false)
    const [num1, setNum1] = useState(Math.ceil(Math.random()*9))
    const [num2, setNum2] = useState(Math.ceil(Math.random()*4*2))
    const [num3, setNum3] = useState(Math.ceil(Math.random()*4*2))
    const [num4, setNum4] = useState(Math.ceil(Math.random()*4*2+1))
    const [num5, setNum5] = useState(Math.ceil(Math.random()*4*2+1))
    const [num8, setNum8] = useState([num1,num2,num1,num3,num5,num4,num1])
    const [num9, setNum9] = useState([num1,num1+1,num1-1,num1-Math.ceil(Math.random()*2+1),num1+Math.ceil(Math.random()*2+1)]) 
    const [R, setR] = useState()   
    const router = useRouter()
    const {username} = router.query 
    const {id} = router.query 

    function mix(){
        setNum8([num1,num2,num1,num3,num5,num4,num1])
        setNum9([num1,num1+1,num1-1,num1-Math.ceil(Math.random()*2+1),num1+Math.ceil(Math.random()*2+1)])
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
            setNum2(Math.ceil(Math.random()*4*2))
            setNum3(Math.ceil(Math.random()*4*2))
            setNum4(Math.ceil(Math.random()*4*2+1))
            setNum5(Math.ceil(Math.random()*4*2+1))
            setNum8(Math.ceil(Math.random()*2+3))
            mix()
            setNum9(prevChange => prevChange.sort((a,b)=>Math.random()-0.5)) 
        }, 1500)
    }


    useEffect(() =>{
        setLoaded(true)
        mix()
        const ID = window.localStorage.getItem('ID')
        
    },[])

    useEffect(() =>{
        mix() 
        setNum8(prevChange => prevChange.sort((a,b)=>Math.random()-0.5))
     },[num1, num2])

     const [score, setScore] =useState(0)
     const [count, setCount] =useState(0)
  
      useEffect(() =>{
          setLoaded(true)
          const count = parseInt(window.localStorage.getItem(`${id} Mode`))
          setCount(count ? count : 0)
          const score = parseInt(window.localStorage.getItem(`${id} score`))
          setScore(score ? score : 0)
      },[])
  
      useEffect(() =>{
          if(count > 0){
          window.localStorage.setItem(`${id} Mode`, count)
      }},[count])
  
      useEffect(() =>{
          if(score > 0){
          window.localStorage.setItem(`${id} score` , score)
      }},[score])
 
     return(
         <div className="beige container column">
             <div className="Test sb"><div className="double" >
                 <div>Score: {loaded && score}</div>
                 <div className="font" >Mode: {loaded && count} </div>
             </div><Link href={`/MIT/testMode`}><button className="green test-btn">Test</button></Link></div>
            <div className="column">
                <div className="double center" style={{width:'100%'}}>{loaded && num8[0]} {loaded && num8[1]} {loaded && num8[2]} {loaded && num8[3]} {loaded && num8[4]} {loaded && num8[5]} {loaded && num8[6]}</div>
            </div>
            <div className="box">
                <button className="help" onClick={open}>help</button>
            </div>
            {help && <HelpMode num1 ={num1} num8 ={num8}  close={close}/>}
            {loaded && correct && <Correct></Correct>}
            {loaded && wrong && <Wrong/> }
            {count > 10 && score < 100  && <Sign></Sign>}
            {score > 100  && <Sign2></Sign2>}
            <div className="box column">
               <div className="row ">
                    { loaded && <Choice value ={num9[0]} answer ={num1} doSomething = {Add} Correct={CorrectA} Wrong={WrongA}/>}
                    { loaded && <Choice value ={num9[1]} answer ={num1} doSomething = {Add} Correct={CorrectA} Wrong={WrongA}/>}
                    { loaded && <Choice value ={num9[2]} answer ={num1} doSomething = {Add} Correct={CorrectA} Wrong={WrongA}/>}
               </div>
               <div className="row">
                    { loaded && <Choice value ={num9[3]} answer ={num1} doSomething = {Add} Correct={CorrectA} Wrong={WrongA}/>}
                    { loaded && <Choice value ={num9[4]} answer ={num1} doSomething = {Add} Correct={CorrectA} Wrong={WrongA}/>}
               </div>
               
            </div>
        </div>
    )
}