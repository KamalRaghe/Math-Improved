import { useEffect, useState } from "react";
import Choice from "@/components/choice";
import Correct from "@/components/correct";
import Wrong from "@/components/wrong"; 
import SolveB from "@/components/solveB";
import Link from "next/link";
import { useRouter } from "next/router";
import Sign from "@/components/SignUp";
import Sign2 from "@/components/SignUp2";

export default function DoubleAdd(){
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
            setNum1(Math.ceil(Math.random()*10))
            setNum2(Math.ceil(Math.random()*10))
            setSlope(Math.ceil(Math.random()*10))
            mix()
            setNum3(prevChange => prevChange.sort((a,b)=>Math.random()-0.5))
        }, 1500)
    }


    useEffect(() =>{
       mix()
       setNum3(prevChange => prevChange.sort((a,b)=>Math.random()-0.5))
    },[num1])

    useEffect(() =>{
        setLoaded(true)
        const ID = window.localStorage.getItem('ID')
        
    },[])

    const [score, setScore] =useState(0)
    const [count, setCount] =useState(0)
 
     useEffect(() =>{
         setLoaded(true)
         const count = parseInt(window.localStorage.getItem(`${id} Cube`))
         setCount(count ? count : 0)
         const score = parseInt(window.localStorage.getItem(`${id} score`))
         setScore(score ? score : 0)
     },[])
 
     useEffect(() =>{
         if(count > 0){
         window.localStorage.setItem(`${id} Cube`, count)
     }},[count])
 
     useEffect(() =>{
         if(score > 0){
         window.localStorage.setItem(`${id} score` , score)
     }},[score])

    return(
        <div className="beige container column">
            <div className="Test sb"><div className="double" >
                <div>Score: {loaded && score}</div>
                <div className="font" >Cube: {loaded && count} </div>
            </div><Link href={`/MIT/testCube`}><button className="green test-btn">Test</button></Link></div>
            <div style={{width:"340px"}}>
                <div className="double center column ">
                    <div>y = m𝑥  + b</div>
                    <div>𝑥 = {loaded && num1} <span className="hide" >0</span>y = {loaded && num2}</div>  
                    <div>m = {loaded && slope} <span className="hide" >0</span>b = ?</div>
                </div>
                {/* <div className="double">m = {loaded && slope}</div> */}
            </div>
            <div className="box">
                <button className="help" onClick={open}>help</button>
            </div>
            {help && <SolveB  num1={num1} num2={num2} slope={slope} close={close}/>}
            {loaded && correct && <Correct></Correct>}
            {loaded && wrong && <Wrong/> }
            {count > 10 && score < 100  && <Sign></Sign>}
            {score > 100  && <Sign2></Sign2>}
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