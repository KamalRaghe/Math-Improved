import { useEffect, useState } from "react";
import Choice from "@/components/choice";
import Correct from "@/components/correct";
import Wrong from "@/components/wrong"; 
import Log from "@/components/LOG";
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
    const [num, setNum] = useState(Math.floor(Math.random()*29));
    const [num1, setNum1] = useState([2,2,2,2,2,3,3,3,3,3,4,4,4,4,5,5,5,6,6,6,7,7,7,8,8,8,9,9,9]);
    const [num2, setNum2] = useState([2,4,8,16,32,3,9,27,81,243,4,16,64,256,5,25,125,6,36,216,7,49,343,8,64,512,9,81,729]);
    const [answer, setAnswer] = useState([1,2,3,4,5,1,2,3,4,5,1,2,3,4,1,2,3,1,2,3,1,2,3,1,2,3,1,2,3])
    const [num3, setNum3] = useState([1,2,3,4,5])
    const router = useRouter()
    const {username} = router.query 
    const {id} = router.query 

    function mix(){
        setNum3([1,2,3,4,5])
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
            setNum(Math.floor(Math.random()*29))
            mix()
            setNum3(prevChange => prevChange.sort((a,b)=>Math.random()-0.5)) 
        }, 1500)
    }


    useEffect(() =>{
        setLoaded(true)
        const ID = window.localStorage.getItem('ID')
        
    },[])

    useEffect(() =>{
        mix()
        setNum3(prevChange => prevChange.sort((a,b)=>Math.random()-0.5))
     },[num1])

     const [score, setScore] =useState(0)
     const [count, setCount] =useState(0)
  
      useEffect(() =>{
          setLoaded(true)
          const count = parseInt(window.localStorage.getItem(`${id} Logarithm`))
          setCount(count ? count : 0)
          const score = parseInt(window.localStorage.getItem(`${id} score`))
          setScore(score ? score : 0)
      },[])
  
      useEffect(() =>{
          if(count > 0){
          window.localStorage.setItem(`${id} Logarithm`, count)
      }},[count])
  
      useEffect(() =>{
          if(score > 0){
          window.localStorage.setItem(`${id} score` , score)
      }},[score])
 
     return(
         <div className="beige container column">
             <div className="Test sb"><div className="double" >
                 <div>Score: {loaded && score}</div>
                 <div className="font" >Logarithm: {loaded && count} </div>
             </div><Link href={`/MIT/LogarithmTest`}><button className="green test-btn">Test</button></Link></div>
            <div className="column" style={{paddingTop:"10px"}}>
            <div className="double">log<span style={{fontSize:'20px',padding:'1px',position:'relative', top:"13px"}}>{loaded && num1[num]}</span>{loaded && num2[num]} =</div>
            </div>
            <div className="box">
                <button className="help" onClick={open}>help</button>
            </div>
            {help && <Log num1 ={num1[num]} num2={num2[num]} Answer={answer[num]} close={close}/>}
            {loaded && correct && <Correct></Correct>}
            {loaded && wrong && <Wrong/> }
            <div className="box column">
               <div className="row ">
                    { loaded && <Choice value ={loaded && num3[0]} answer ={loaded && answer[num]} doSomething = {Add} Correct={CorrectA} Wrong={WrongA}/>}
                    { loaded && <Choice value ={loaded && num3[1]} answer ={loaded && answer[num]} doSomething = {Add} Correct={CorrectA} Wrong={WrongA}/>}
                    { loaded && <Choice value ={loaded && num3[2]} answer ={loaded && answer[num]} doSomething = {Add} Correct={CorrectA} Wrong={WrongA}/>}
               </div>
               <div className="row">
                    { loaded && <Choice value ={loaded && num3[3]} answer ={loaded && answer[num]} doSomething = {Add} Correct={CorrectA} Wrong={WrongA}/>}
                    { loaded && <Choice value ={loaded && num3[4]} answer ={loaded && answer[num]} doSomething = {Add} Correct={CorrectA} Wrong={WrongA}/>}
               </div>
            </div>
        </div>
    )
}