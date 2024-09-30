import { useEffect, useState } from "react";
import Choice from "@/components/FractionChoice";
import Correct from "@/components/correct";
import Wrong from "@/components/wrong"; 
import Question1 from "@/components/helpMixed";
import Link from "next/link";
import { useRouter } from "next/router";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";

export default function DoubleAdd(){
    const [help, setHelp] = useState(false)
    const [loaded, setLoaded] = useState(false)
    const [correct, setCorrect] = useState(false)
    const[ wrong, setWrong] = useState(false)
    const [num, setNum] = useState(1)
    const [num1, setNum1] = useState(Math.ceil(Math.random()*7+2));
    const [num2, setNum2] = useState(Math.ceil(Math.random()*9));
    const [num4, setNum4] = useState(Math.ceil(Math.random()*9));
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
            setNum1(Math.ceil(Math.random()*7+2))
            setNum2(Math.ceil(Math.random()*9))
            mix()
            setNum3(prevChange => prevChange.sort((a,b)=>Math.random()-0.5))
    }


    useEffect(() =>{
       mix()
       setNum3(prevChange => prevChange.sort((a,b)=>Math.random()-0.5))
       setNum4(Math.ceil(Math.random()*(num1-1)))
    },[num1])

    const [score, setScore] =useState(0)
    const [count, setCount] =useState(0)
 
     useEffect(() =>{
         Add()
         setLoaded(true)
         const count = parseInt(window.localStorage.getItem(`${id} Mixed`))
         setCount(count ? count : 0)
         const score = parseInt(window.localStorage.getItem(`${id} score`))
         setScore(score ? score : 0)
         const ID = window.localStorage.getItem('ID')
        
     },[])
 
     useEffect(() =>{
         if(count > 0){
         window.localStorage.setItem(`${id} Mixed`, count)
     }},[count])
 
     useEffect(() =>{
         if(score > 0){
         window.localStorage.setItem(`${id} score` , score)
     }},[score])

    return(
        <div className="beige container column">
            <div className="Test sb"><div className="double" >
                <div>Score: {loaded && score}</div>
                <div className="font" >Mixed to Improper: {loaded && count} </div>
            </div><Link href={`/MIT/MixedTest`}><button className="green test-btn">Test</button></Link></div>
            <div className="box column">
                {loaded && <div className=" double center">
                    <div style={{padding:'5px'}} >{num2}</div>
                    <div className="column center" ><div className="center" style={{borderBottom:'2px solid black', width:'45px'}} >{num4}</div>
                    {num1}</div></div>}
                
            </div>
            <div className="box">
                <button className="help" onClick={open}>help</button>
            </div>
            {help && <Question1  num1={num4} num2={num1} whole={num2} close={close}/>}
            {loaded && correct && <Correct></Correct>}
            {loaded && wrong && <Wrong/> }
            <div className="box column">
               <div className="row ">
                    { loaded && <Choice  beginning={true}  value1 ={num2*num1+num4+num3[0]} answer1 ={num2*num1+num4}  value2={num1}  answer2={num1}  doSomething = {Add} Correct={CorrectA} Wrong={WrongA}/>}
                    { loaded && <Choice  beginning={true}  value1 ={num2*num1+num4+num3[1]} answer1 ={num2*num1+num4}  value2={num1}  answer2={num1}  doSomething = {Add} Correct={CorrectA} Wrong={WrongA}/>}
                    { loaded && <Choice  beginning={true}  value1 ={num2*num1+num4+num3[2]} answer1 ={num2*num1+num4}  value2={num1}  answer2={num1}  doSomething = {Add} Correct={CorrectA} Wrong={WrongA}/>}
               </div>
               <div className="row">
                    { loaded && <Choice  beginning={true}  value1 ={num2*num1+num4+num3[3]} answer1 ={num2*num1+num4}  value2={num1}  answer2={num1}  doSomething = {Add} Correct={CorrectA} Wrong={WrongA}/>}
                    { loaded && <Choice  beginning={true}  value1 ={num2*num1+num4+num3[4]} answer1 ={num2*num1+num4}  value2={num1}  answer2={num1}  doSomething = {Add} Correct={CorrectA} Wrong={WrongA}/>}
               </div>
            </div>
        </div>
    )
}