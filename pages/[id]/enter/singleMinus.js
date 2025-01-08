import { useEffect, useState } from "react";
import Choice from "@/components/choice";
import Correct from "@/components/correct";
import Wrong from "@/components/wrong"; 
import HelpMinus from '@/components/HelpMinus'
import Link from "next/link";
import { useRouter } from "next/router";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";

export default function DoubleAdd(){

    const [help, setHelp] = useState(false)
    const [loaded, setLoaded] = useState(false)
    const [correct, setCorrect] = useState(false)
    const[ wrong, setWrong] = useState(false)
    const [num1, setNum1] = useState(Math.ceil(Math.random()*4+5));
    const [num2, setNum2] = useState(Math.ceil(Math.random()*4));
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
        setCount(count+1)
        setScore(score+1)
        setTimeout(() => {
            setCorrect(false) 
        }, 1900);
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
            setNum1(Math.ceil(Math.random()*9))
            
            mix()
            setNum3(prevChange => prevChange.sort((a,b)=>Math.random()-0.5)) 
        }, 1500)
    }

    const [score, setScore] =useState(0)
    const [count, setCount] =useState(0)

    useEffect(() =>{
        setLoaded(true)
        const count = parseInt(window.localStorage.getItem(`${id} singleMinus`))
        setCount(count ? count : 0)
        const score = parseInt(window.localStorage.getItem(`${id} score`))
        setScore(score ? score : 0)
    },[])

    useEffect(() =>{
        if(count > 0){
        window.localStorage.setItem(`${id} singleMinus`, count)
    }},[count])

    useEffect(() =>{
        if(score > 0){
        window.localStorage.setItem(`${id} score` , score)
    }},[score])

    useEffect(() =>{
        mix()
        setNum3(prevChange => prevChange.sort((a,b)=>Math.random()-0.5))
        setNum2(Math.ceil(Math.random()*(num1-1)))
     },[num1])

    useEffect(() =>{
        setLoaded(true)
    },[])

    useEffect(()=>{
        const ID = window.localStorage.getItem('ID')
        if(!(ID === id)){
            router.push("/")
        }
    },[])

    return(
        <div className="beige container column">
             <div className="Test sb"><div className="double" >
                <div>Score: {loaded && score}</div>
                <div className="font" >Single digit Subtraction: {loaded && count} </div>
            </div>
            <Link href={`/${id}/enter/testSingleMinus`}>
                <button className="green test-btn">Test</button>
            </Link></div>
            <div className="box column">
                <div className="double">{loaded && num1} - {loaded && num2} =</div>
            </div>
            <div className="box">
               {count%5 != 0 && <button className="help" onClick={open}>help</button>}
            </div>
            {help && <HelpMinus num1 ={num1} num2={num2} close={close}/>}
            {loaded && correct && <Correct></Correct>}
            {loaded && wrong && <Wrong/> }
            <div className="box column">
               <div className="row ">
                    { loaded && <Choice value ={num1-num2+num3[0]} answer ={num1-num2} doSomething = {Add} Correct={CorrectA} Wrong={WrongA}/>}
                    { loaded && <Choice value ={num1-num2+num3[1]} answer ={num1-num2} doSomething = {Add} Correct={CorrectA} Wrong={WrongA}/>}
                    { loaded && <Choice value ={num1-num2+num3[2]} answer ={num1-num2} doSomething = {Add} Correct={CorrectA} Wrong={WrongA}/>}
               </div>
               <div className="row">
                    { loaded && <Choice value ={num1-num2+num3[3]} answer ={num1-num2} doSomething = {Add} Correct={CorrectA} Wrong={WrongA}/>}
                    { loaded && <Choice value ={num1-num2+num3[4]} answer ={num1-num2} doSomething = {Add} Correct={CorrectA} Wrong={WrongA}/>}
               </div>
            </div>
        </div>
    )
}