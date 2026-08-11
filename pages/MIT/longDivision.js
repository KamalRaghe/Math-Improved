import { useEffect, useState } from "react";
import Choice from "@/components/choice";
import Correct from "@/components/correct";
import Wrong from "@/components/wrong"; 
import Link from "next/link";
import { useRouter } from "next/router";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";
import LongDivisionHelp from "@/components/longDivisionHelp";
import Sign from "@/components/SignUp";
import Sign2 from "@/components/SignUp2";

export default function DoubleAdd(){
    const [help, setHelp] = useState(false)
    const [loaded, setLoaded] = useState(false)
    const [correct, setCorrect] = useState(false)
    const[ wrong, setWrong] = useState(false)
    const [num1, setNum1] = useState(Math.ceil(Math.random()*8+1));
    const [num2, setNum2] = useState(Math.ceil(Math.random()*900 + 99));
    const [num3, setNum3] = useState([0,1,-1,Math.ceil(Math.random()*2+1),-1*Math.ceil(Math.random()*2+1)])
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
            setNum1(Math.ceil(Math.random()*8+1))
            setNum2(Math.ceil(Math.random()*900+99))   
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
         const count = parseInt(window.localStorage.getItem(`${id} longDivision`))
         setCount(count ? count : 0)
         const score = parseInt(window.localStorage.getItem(`${id} score`))
         setScore(score ? score : 0)
         const ID = window.localStorage.getItem('ID')
        
     },[])
 
     useEffect(() =>{
         if(count > 0){
         window.localStorage.setItem(`${id} longDivision`, count)
     }},[count])
 
     useEffect(() =>{
         if(score > 0){
         window.localStorage.setItem(`${id} score` , score)
     }},[score])

    return(
        <div className="beige container column">
            <div className="Test sb"><div className="double" >
                <div>Score: {loaded && score}</div>
                <div className="font" >Long Division: {loaded && count} </div>
            </div><Link href={`/MIT/testLongDivision`}><button className="green test-btn">Test</button></Link></div>
            <div className="box">
                <div className="double center">{loaded && num1}<div style={{borderLeft: '3px solid black', borderTop: '3px solid black', marginLeft:'5px', paddingRight:'10px'}}><span className="hide">.</span>{loaded && num2}</div> </div>
            </div>
            <div className="box">
                <button className="help" onClick={open}>help</button>
            </div>
            {help && <LongDivisionHelp num1 ={num1} num2={num2} close={close}/>}
            {count > 10 && score < 100  && <Sign></Sign>}
            {score > 100  && <Sign2></Sign2>}
            {loaded && correct && <Correct></Correct>}
            {loaded && wrong && <Wrong/> }
            <div className="box column">
               <div className="row ">
                    { loaded && num2 % num1 > 0 && <Choice big={true} size={'75px'}  value ={`${((num2-(num2 % num1))/num1)-num3[0]} R${(num2%num1)}`} answer ={`${((num2-(num2 % num1))/num1)} R${(num2%num1)}`} doSomething = {Add} Correct={CorrectA} Wrong={WrongA}/>}
                    { loaded && num2 % num1 > 0 && <Choice big={true} size={'75px'}  value ={`${((num2-(num2 % num1))/num1)-num3[1]} R${(num2%num1)}`} answer ={`${((num2-(num2 % num1))/num1)} R${(num2%num1)}`} doSomething = {Add} Correct={CorrectA} Wrong={WrongA}/>}
                    { loaded && num2 % num1 > 0 && <Choice big={true} size={'75px'}  value ={`${((num2-(num2 % num1))/num1)-num3[2]} R${(num2%num1)}`} answer ={`${((num2-(num2 % num1))/num1)} R${(num2%num1)}`} doSomething = {Add} Correct={CorrectA} Wrong={WrongA}/>}
               </div>
               <div className="row">
                    { loaded && num2 % num1 > 0 && <Choice big={true} size={'75px'}  value ={`${((num2-(num2 % num1))/num1)-num3[3]} R${(num2%num1)}`} answer ={`${((num2-(num2 % num1))/num1)} R${(num2%num1)}`} doSomething = {Add} Correct={CorrectA} Wrong={WrongA}/>}
                    { loaded && num2 % num1 > 0 && <Choice big={true} size={'75px'}  value ={`${((num2-(num2 % num1))/num1)-num3[4]} R${(num2%num1)}`} answer ={`${((num2-(num2 % num1))/num1)} R${(num2%num1)}`} doSomething = {Add} Correct={CorrectA} Wrong={WrongA}/>}
               </div>
               <div className="row">
                    { loaded && num2 % num1 === 0 && <Choice  value ={((num2-(num2 % num1))/num1)-num3[0]} answer ={((num2-(num2 % num1))/num1)} doSomething = {Add} Correct={CorrectA} Wrong={WrongA}/>}
                    { loaded && num2 % num1 === 0 && <Choice  value ={((num2-(num2 % num1))/num1)-num3[1]} answer ={((num2-(num2 % num1))/num1)} doSomething = {Add} Correct={CorrectA} Wrong={WrongA}/>}
                    { loaded && num2 % num1 === 0 && <Choice  value ={((num2-(num2 % num1))/num1)-num3[2]} answer ={((num2-(num2 % num1))/num1)} doSomething = {Add} Correct={CorrectA} Wrong={WrongA}/>}
               </div>
               <div className="row">
                    { loaded && num2 % num1 === 0 && <Choice  value ={((num2-(num2 % num1))/num1)-num3[3]} answer ={((num2-(num2 % num1))/num1)} doSomething = {Add} Correct={CorrectA} Wrong={WrongA}/>}
                    { loaded && num2 % num1 === 0 && <Choice  value ={((num2-(num2 % num1))/num1)-num3[4]} answer ={((num2-(num2 % num1))/num1)} doSomething = {Add} Correct={CorrectA} Wrong={WrongA}/>}
               </div>
            </div>
        </div>
    )
}