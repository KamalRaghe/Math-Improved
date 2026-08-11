import { useEffect, useState } from "react";
import Choice from "@/components/choice";
import Correct from "@/components/correct";
import Wrong from "@/components/wrong"; 
import HelpTimes from '@/components/HelpTimes'
import HelpDiv from "@/components/PerfectDivision";
import Link from "next/link";
import { useRouter } from "next/router";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";

export default function DoubleAdd(){

    const [help, setHelp] = useState(false)
    const [loaded, setLoaded] = useState(false)
    const [correct, setCorrect] = useState(false)
    const[ wrong, setWrong] = useState(false)
    const [ready, setReady] = useState(true)
    const [num1, setNum1] = useState(Math.ceil(Math.random()*9));
    const [num2, setNum2] = useState(Math.ceil(Math.random()*9));
    const [num3, setNum3] = useState([0,1,2,-1,-3])
    const router = useRouter()
    const {username} = router.query 
    const {id} = router.query 

    function mix(){
        setNum3([0,1,3,-1,-2])
    }

    function open(){
        setHelp(true)
      }
      function close(){
        setHelp(false)
      }

    function CorrectA(){ 
        setReady(true)
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
        setReady(true)
        setWrong(true)
        setTimeout(() => {
            setWrong(false) 
        }, 1900);
      } 
    function Add(){
        setTimeout(() => {
            setNum1(Math.ceil(Math.random()*9))
            setNum2(Math.ceil(Math.random()*9)) 
            mix()
            setNum3(prevChange => prevChange.sort((a,b)=>Math.random()-0.5))
        }, 1900)
    }


    useEffect(() =>{
       mix()
       setNum3(prevChange => prevChange.sort((a,b)=>Math.random()-0.5))
    },[num1])

    const [score, setScore] =useState(0)
    const [count, setCount] =useState(0)

    useEffect(() =>{
        setLoaded(true)
        const count = parseInt(window.localStorage.getItem(`${id} shortDivision`))
        setCount(count ? count : 0)
        const score = parseInt(window.localStorage.getItem(`${id} score`))
        setScore(score ? score : 0)
    },[])

    useEffect(() =>{
        if(count > 0){
        window.localStorage.setItem(`${id} shortDivision`, count)
    }},[count])

    useEffect(() =>{
        if(score > 0){
        window.localStorage.setItem(`${id} score` , score)
    }},[score])

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
                <div className="font" >Short Division: {loaded && count} </div>
            </div>
            <Link href={`/${id}/enter/shortDivTest`}>
                <button className="green test-btn">Test</button>
            </Link></div>
          <div className="center column" >
                <div className="box column" style={{width:"200px"}}>
                      <div className="double">{loaded && num1*num2} ÷ {loaded && num2} =</div>
                </div>
                <div className="box column" style={{height:"30px",paddingBottom:"20px"}}>
                {<button className="help" onClick={open}>help</button>}
                </div>
           </div>
            {help && <HelpDiv num1 ={num1} num2={num2} close={close}/>}
            {loaded && correct && <Correct></Correct>}
            {loaded && wrong && <Wrong/> }
            {<div className="box column">
               <div className="row ">
                    { loaded && <Choice value ={num1+num3[0]} answer ={num1} doSomething = {Add} Correct={CorrectA} Wrong={WrongA}/>}
                    { loaded && <Choice value ={num1+num3[1]} answer ={num1} doSomething = {Add} Correct={CorrectA} Wrong={WrongA}/>}
                    { loaded && <Choice value ={num1+num3[2]} answer ={num1} doSomething = {Add} Correct={CorrectA} Wrong={WrongA}/>}
               </div>
               <div className="row">
                    { loaded && <Choice value ={num1+num3[3]} answer ={num1} doSomething = {Add} Correct={CorrectA} Wrong={WrongA}/>}
                    { loaded && <Choice value ={num1+num3[4]} answer ={num1} doSomething = {Add} Correct={CorrectA} Wrong={WrongA}/>}
               </div>
            </div>}
        </div>
    )
}