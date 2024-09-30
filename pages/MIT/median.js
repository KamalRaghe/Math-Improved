import { useEffect, useState } from "react";
import Choice from "@/components/choice";
import Correct from "@/components/correct";
import Wrong from "@/components/wrong"; 
import HelpMedian from "@/components/helpMedian";
import Link from "next/link";
import { useRouter } from "next/router";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";

export default function DoubleAdd(){
    const [help, setHelp] = useState(false)
    const [loaded, setLoaded] = useState(false)
    const [correct, setCorrect] = useState(false)
    const [wrong, setWrong] = useState(false)
    const [answer1, setAnswer1] = useState(0)
    const [answer, setAnswer] = useState(0)
    const [num1, setNum1] = useState([Math.ceil(Math.random()*9),Math.ceil(Math.random()*9),Math.ceil(Math.random()*9),Math.ceil(Math.random()*9),Math.ceil(Math.random()*9),Math.ceil(Math.random()*9)])
    const [num2, setNum2] = useState([1,2,4,3,5,0])
    const [num8, setNum8] = useState(Math.ceil(Math.random()*1+5))
    const [num9, setNum9] = useState([0,1,-1,Math.ceil(Math.random()*2+1),-1*Math.ceil(Math.random()*2+1)])
    const [R, setR] = useState()   
    const router = useRouter()
    const {username} = router.query 
    const {id} = router.query 

    function mix(){
        setNum9([0,1,-1,Math.floor(Math.random()*2+2),-1*Math.floor(Math.random()*2+2)])

        setNum9(prevChange => prevChange.sort((a,b)=>Math.random()-0.5))
        setNum2(prevChange => prevChange.sort((a,b)=>Math.random()-0.5)) 
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
            setNum1([Math.ceil(Math.random()*9),Math.ceil(Math.random()*9),Math.ceil(Math.random()*9),Math.ceil(Math.random()*9),Math.ceil(Math.random()*9),Math.ceil(Math.random()*9)])        
            setNum1(prev => prev.sort((a,b)=>a-b))
            mix()
            setNum9(prevChange => prevChange.sort((a,b)=>Math.random()-0.5)) 
        }, 15)
    }

    useEffect(() =>{
        setLoaded(true)
        mix()
        Add()
        const ID = window.localStorage.getItem('ID')
        if(!(ID === id)){
            router.push("/")
        }
    },[])



    useEffect(() =>{
        mix()
        setNum2(num1)
     },[num1])
     
     useEffect(() =>{
        setNum2(prev =>prev.sort((a,b) => a-b))
        setNum1(prev => prev.sort((a,b) => Math.random()-0.5))
        setAnswer1(answer1+1)
     },[num2])
    
     useEffect(() =>{
        mix()
        setAnswer((num1[2]+num1[3])/2)
     },[answer1])
     
     useEffect(() =>{
        mix()
     },[answer])  

     const [score, setScore] =useState(0)
     const [count, setCount] =useState(0)
  
      useEffect(() =>{
          setLoaded(true)
          const count = parseInt(window.localStorage.getItem(`${id} Median`))
          setCount(count ? count : 0)
          const score = parseInt(window.localStorage.getItem(`${id} score`))
          setScore(score ? score : 0)
      },[])
  
      useEffect(() =>{
          if(count > 0){
          window.localStorage.setItem(`${id} Median`, count)
      }},[count])
  
      useEffect(() =>{
          if(score > 0){
          window.localStorage.setItem(`${id} score` , score)
      }},[score])
 
     return(
         <div className="beige container column">
             <div className="Test sb"><div className="double" >
                 <div>Score: {loaded && score}</div>
                 <div className="font" >Median: {loaded && count} </div>
             </div><Link href={`/MIT/testMedian`}><button className="green test-btn">Test</button></Link></div>
            <div className="column">
                <div className="double center" style={{width:'100%'}}>{loaded && num1[0]} {loaded && num1[1]} {loaded && num1[2]} {loaded && num1[3]} {loaded && num1[4]} {loaded && num1[5]}  {loaded && num1[6]}</div>
            </div>
            <div className="box">
                <button className="help" onClick={open}>help</button>
            </div>
            {help && <HelpMedian num1 ={num1} num2={num2} num8 ={num8}  close={close}/>}
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
                    { loaded && <Choice value ={answer - num9[4]} answer ={answer} doSomething = {Add} Correct={CorrectA} Wrong={WrongA}/>}
               </div>
            </div>
        </div>
    )
}