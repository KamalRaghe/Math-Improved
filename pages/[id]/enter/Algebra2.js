import { useEffect, useState } from "react";
import Choice from "@/components/choice";
import Correct from "@/components/correct";
import Wrong from "@/components/wrong"; 
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
    const [num1, setNum1] = useState(Math.ceil(Math.random()*7+2));
    const [num2, setNum2] = useState(Math.ceil(Math.random()*7+2));
    const [num3, setNum3] = useState([0,-1,Math.ceil(Math.random()*2+1)])
    const [num5, setNum5] = useState();
    const [num4, setNum4] = useState();
    const [num6, setNum6] = useState(Math.ceil(Math.random()*5));
    const [num7, setNum7] = useState(Math.ceil(Math.random()*5));
    const router = useRouter()
    const {username} = router.query 
    const {id} = router.query 

    function mix(){
        setNum3([0,1,-1*Math.ceil(Math.random()*2+1)])
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
            setNum2(Math.ceil(Math.random()*7+2))
            mix()
            setNum3(prevChange => prevChange.sort((a,b)=>Math.random()-0.5)) 
            setNum1(Math.ceil(Math.random()*7+2))
            setNum7(Math.ceil(Math.random()*5))
            setNum6(Math.ceil(Math.random()*5))
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
        setNum4(Math.ceil(Math.random()*(num2-2)+1))
        setNum5(Math.ceil(Math.random()*(num1-2)+1))
     },[num1,num2])

    
     const [score, setScore] =useState(0)
     const [count, setCount] =useState(0)
  
      useEffect(() =>{
          setLoaded(true)
          const count = parseInt(window.localStorage.getItem(`${id} Two Variable`))
          setCount(count ? count : 0)
          const score = parseInt(window.localStorage.getItem(`${id} score`))
          setScore(score ? score : 0)
      },[])
  
      useEffect(() =>{
          if(count > 0){
          window.localStorage.setItem(`${id} Two Variable`, count)
      }},[count])
  
      useEffect(() =>{
          if(score > 0){
          window.localStorage.setItem(`${id} score` , score)
      }},[score])
 
     return(
         <div className="beige container column">
             <div className="Test sb"><div className="double" >
                 <div>Score: {loaded && score}</div>
                 <div className="font" >Two Variable: {loaded && count} </div>
             </div><Link href={`/${id}/enter/Algebra2Test`}><button className="green test-btn">Test</button></Link></div>
            <div className="column ">
                { loaded && <div className="double"> {num2}𝑥 + {num1}y = {loaded && (num2*num6)+(num1*num7)}</div>}
                { loaded && <div className="double"> {num4}𝑥 + {num5}y = {loaded && (num4*num6)+(num5*num7)}</div>}
            </div>
            <div className="box">
                <button className="help" style={{opacity:"0.3"}} onClick={open}>help</button>
            </div>
            {/* {help && <TwoVar num1 ={num1} num2={num2} num4={num4} num5 ={num5} num6={num6} num7={num7} close={close}/>} */}
            {loaded && correct && <Correct></Correct>}
            {loaded && wrong && <Wrong/> }
            <div className="box column">
               <div className="row ">
                    { loaded && <Choice big={true} size={'115px'} value ={`𝑥 = ${num6+num3[0]}, y = ${num7-num3[0]}`} answer ={`𝑥 = ${num6}, y = ${num7}`} doSomething = {Add} Correct={CorrectA} Wrong={WrongA}/>}
                    { loaded && <Choice big={true} size={'115px'} value ={`𝑥 = ${num6+num3[1]}, y = ${num7+num3[1]}`} answer ={`𝑥 = ${num6}, y = ${num7}`} doSomething = {Add} Correct={CorrectA} Wrong={WrongA}/>}
               </div>
               <div className="row">
                    { loaded && <Choice big={true} size={'115px'} value ={`𝑥 = ${num6-num3[2]}, y = ${num7+num3[2]}`} answer ={`𝑥 = ${num6}, y = ${num7}`} doSomething = {Add} Correct={CorrectA} Wrong={WrongA}/>}
               </div>
            </div>
        </div>
    )
}