import { useEffect, useState } from "react";
import Choice from "@/components/FractionChoice";
import Correct from "@/components/correct";
import Wrong from "@/components/wrong"; 
import Link from "next/link";
import MPF from "@/components/MPF";
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
    const [num, setNum] = useState(1)
    const [num1, setNum1] = useState(Math.ceil(Math.random()*7+2));
    const [num2, setNum2] = useState(Math.ceil(Math.random()*9));
    const [num4, setNum4] = useState(Math.ceil(Math.random()*9));
    const [num3, setNum3] = useState([0,1,-1,2,-2])
    const [num5, setNum5] = useState(Math.ceil(Math.random()*7+2));
    const [num6, setNum6] = useState(Math.ceil(Math.random()*9));
    const [num7, setNum7] = useState(Math.ceil(Math.random()*9));
    const [num8, setNum8] = useState(Math.ceil(Math.random()*7+2))
    const router = useRouter()
    const {username} = router.query 
    const {id} = router.query 

    function mix(){
        setNum3([0,1,-1,2,-2])
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
        
            setNum1(Math.ceil(Math.random()*7+2))
            setNum6(Math.ceil(Math.random()*7+2))
            setNum8(Math.ceil(Math.random()*7+2))
            mix()
            setNum3(prevChange => prevChange.sort((a,b)=>Math.random()-0.5))
        
    }

    useEffect(()=>{
        if(num1 >= 5){
            setNum5(Math.ceil(Math.random()*3+1))
        }else{setNum5(Math.ceil(Math.random()*5+4))}
    },[num1,num8,num6])

    useEffect(() =>{
       mix()
       setNum3(prevChange => prevChange.sort((a,b)=>Math.random()-0.5))
       setNum4(Math.ceil(Math.random()*(num5-1)))
       setNum2(Math.ceil(Math.random()*(num1-1)))
       for(let i=1;i<15;i++){
        if(num1*i%num5===0){
            setNum7(i*num1)
            break
        }
    }
    },[num8,num5,num6])

    useEffect(() =>{
        setLoaded(true)
        mix()
        setNum3(prevChange => prevChange.sort((a,b)=>Math.random()-0.5))
        const ID = window.localStorage.getItem('ID')
        
    },[])

    const [score, setScore] =useState(0)
    const [count, setCount] =useState(0)
 
     useEffect(() =>{
         Add()
         setLoaded(true)
         const count = parseInt(window.localStorage.getItem(`${id} MPF`))
         setCount(count ? count : 0)
         const score = parseInt(window.localStorage.getItem(`${id} score`))
         setScore(score ? score : 0)
     },[])
 
     useEffect(() =>{
         if(count > 0){
         window.localStorage.setItem(`${id} MPF`, count)
     }},[count])
 
     useEffect(() =>{
         if(score > 0){
         window.localStorage.setItem(`${id} score` , score)
     }},[score])

    return(
        <div className="beige container column">
            <div className="Test sb"><div className="double" >
                <div>Score: {loaded && score}</div>
                <div className="font" >Multiplication Proper Fraction: {loaded && count} </div>
            </div><Link href={`/MIT/MPFTest`}><button className="green test-btn">Test</button></Link></div>
            <div className="box">
                <span className="hide">00000</span>
                {loaded && <div className=" double center">
                    <div className="column center" >
                        <div className="center" style={{borderBottom:'2px solid black', width:'45px'}} >
                            {num4}</div>
                    {num5}</div></div>}
                    <div className="double" style={{padding:'10px'}} >x</div>
                    {loaded && <div className=" double center">
                    <div className="column center" >
                        <div className="center" style={{borderBottom:'2px solid black', width:'45px'}} >
                            {num2}</div>
                    {num1}</div></div>}
                    <div className="double" style={{padding:'10px'}} >=</div>
                
            </div>
            <div className="box">
                <button className="help" onClick={open}>help</button>
            </div>
            {help && <MPF num1={num4} num2={num5} close={close} num4={num2} num5={num1} />}
            {loaded && correct && <Correct></Correct>}
            {loaded && wrong && <Wrong/> }
            {count > 10 && score < 100  && <Sign></Sign>}
            {score > 100  && <Sign2></Sign2>}
            <div className="box column">
               <div className="row ">
                    { loaded && <Choice whole={Math.floor((num4*num2)/(num5*num1))} value1 ={(((num2)*(num4))+num3[0])%(num5*num1) } answer1 ={(((num2)*(num4)))%(num5*num1)} value2={num1*num5} answer2={num1*num5} doSomething = {Add} Correct={CorrectA} Wrong={WrongA}/>}
                    { loaded && <Choice whole={Math.floor((num4*num2)/(num5*num1))} value1 ={(((num2)*(num4))+num3[1])%(num5*num1) } answer1 ={(((num2)*(num4)))%(num5*num1)} value2={num1*num5} answer2={num1*num5} doSomething = {Add} Correct={CorrectA} Wrong={WrongA}/>}
                    { loaded && <Choice whole={Math.floor((num4*num2)/(num5*num1))} value1 ={(((num2)*(num4))+num3[2])%(num5*num1) } answer1 ={(((num2)*(num4)))%(num5*num1)} value2={num1*num5} answer2={num1*num5} doSomething = {Add} Correct={CorrectA} Wrong={WrongA}/>}
               </div>
               <div className="row">
                    { loaded && <Choice whole={Math.floor((num4*num2)/(num5*num1))} value1 ={(((num2)*(num4))+num3[3])%(num5*num1) } answer1 ={(((num2)*(num4)))%(num5*num1)} value2={num1*num5} answer2={num1*num5} doSomething = {Add} Correct={CorrectA} Wrong={WrongA}/>}
                    { loaded && <Choice whole={Math.floor((num4*num2)/(num5*num1))} value1 ={(((num2)*(num4))+num3[4])%(num5*num1) } answer1 ={(((num2)*(num4)))%(num5*num1)} value2={num1*num5} answer2={num1*num5} doSomething = {Add} Correct={CorrectA} Wrong={WrongA}/>}
               </div>
            </div>
        </div>
    )
}