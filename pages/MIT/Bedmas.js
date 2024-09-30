import { useEffect, useState } from "react";
import Choice from "@/components/choice";
import Correct from "@/components/correct";
import Wrong from "@/components/wrong"; 
import Question from "@/Bedmas/Question";
import Question1 from "@/Bedmas/Question1";
import Question2 from "@/Bedmas/Question2";
import Question3 from "@/Bedmas/Question3";
import Question4 from "@/Bedmas/Question4";
import Question5 from "@/Bedmas/Question5";
import Question6 from "@/Bedmas/Question6";
import Question7 from "@/Bedmas/Question7";
import Question8 from "@/Bedmas/Question8";
import Link from "next/link";
import { useRouter } from "next/router";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";

export default function DoubleAdd(){
    const [help, setHelp] = useState(false)
    const [loaded, setLoaded] = useState(false)
    const [correct, setCorrect] = useState(false)
    const[ wrong, setWrong] = useState(false)
    const [num, setNum] = useState(Math.floor(Math.random()*9));
    const [num1, setNum1] = useState(Math.ceil(Math.random()*9));
    const [num2, setNum2] = useState(Math.ceil(Math.random()*9));
    const [num4, setNum4] = useState(Math.ceil(Math.random()*9));
    const [num5, setNum5] = useState(Math.ceil(Math.random()*9));
    const [num6, setNum6] = useState(Math.ceil(Math.random()*9));
    const [num7, setNum7] = useState([
        (num4*num5)+((num1+num2)*(num1+num2)),
        ((num1+num2)*(num1+num2)) + (num4*num5),
        num1+num2+num5 , 
        ((num1+num2)*(num1+num2))+num6-(num4*num5),
        (num1+num2)+num6*num4+num5,
        (num4*num5)+(num6+(num1+num2)),
        (num1+num2)+(num6*num4)+(num5*num5),
        (num6+((num1+num2)*num4))+num5 ,
        (num4*num4)+num5 + ((num1+num2)*num6) 
    ]);
    const [num3, setNum3] = useState([0,num1+num1,num2+num2+num2,-1*num1,num2])
    const router = useRouter()
    const {username} = router.query 
    const {id} = router.query 

    function mix(){
        setNum3([0,num1+num1,num2,-1*num1,num2+num2+num2])
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
            setNum(Math.floor(Math.random()*9))
            setNum1(Math.ceil(Math.random()*9))
            setNum2(Math.ceil(Math.random()*9))
            setNum5(Math.ceil(Math.random()*9))
            setNum4(Math.ceil(Math.random()*9))
            setNum6(Math.ceil(Math.random()*9)) 
            mix()
            setNum3(prevChange => prevChange.sort((a,b)=>Math.random()-0.5))
        }, 1500)
    }


    useEffect(() =>{
       mix()
       setNum3(prevChange => prevChange.sort((a,b)=>Math.random()-0.5))
       setNum7([
        (num4*num5)+((num1+num2)*(num1+num2)),
        ((num1+num2)*(num1+num2)) + (num4*num5),
        num1+num2+num5 , 
        ((num1+num2)*(num1+num2))+num6-(num4*num5),
        (num1+num2)+num6*num4+num5,
        (num4*num5)+(num6+(num1+num2)),
        (num1+num2)+(num6*num4)+(num5*num5),
        (num6+((num1+num2)*num4))+num5 ,
        (num4*num4)+num5 + ((num1+num2)*num6) 
    ])
    },[num1,num2,num4])

    useEffect(() =>{
        setLoaded(true)
    },[])

    const [score, setScore] =useState(0)
    const [count, setCount] =useState(0)
 
     useEffect(() =>{
         setLoaded(true)
         const count = parseInt(window.localStorage.getItem(`${id} Bedmas`))
         setCount(count ? count : 0)
         const score = parseInt(window.localStorage.getItem(`${id} score`))
         setScore(score ? score : 0)
         const ID = window.localStorage.getItem('ID')
        
     },[])
 
     useEffect(() =>{
         if(count > 0){
         window.localStorage.setItem(`${id} Bedmas`, count)
     }},[count])
 
     useEffect(() =>{
         if(score > 0){
         window.localStorage.setItem(`${id} score` , score)
     }},[score])

    return(
        <div className="beige container column">
            <div className="Test sb"><div className="double" >
                <div>Score: {loaded && score}</div>
                <div className="font" >Bedmas: {loaded && count} </div>
            </div><Link href={`/MIT/BedmasTest`}><button className="green test-btn">Test</button></Link></div>
            <div className="column" style={{padding: '35px'}}>
                {/* (num4*num5)+((num1+num2)*(num1+num2)) */}
                {loaded && num === 0 && <div className="double">{num4} x {num5} + ({num1} + {num2})<span style={{fontSize:'20px',position:'relative', top:"-19px"}}>2</span> </div>}
                {/* ((num1+num2)*(num1+num2)) + (num4*num5) */}
                {loaded && num === 1 && <div className="double">({num1} + {num2})<span style={{fontSize:'20px',position:'relative', top:"-19px"}}>2</span> + {num4} x {num5} </div>}
                {/* num1+num2+num5 */}
                {loaded && num === 2 && <div className="double">({num1} + {num2}) + {num5*num4} ÷ {num4} </div>}
                {/* ((num1+num2)*(num1+num2))+num6-(num4*num5) */}
                {loaded && num === 3 && <div className="double">({num1} + {num2})<span style={{fontSize:'20px',position:'relative', top:"-19px"}}>2</span> + {num6}  - {num4} x {num5}  </div>}
                {/* (num1+num2)+num6*num4+num5 */}
                {loaded && num === 4 && <div className="double">({num1} + {num2}) + {num6} x {num4} + {num5} </div>}
                {/* (num4*num5)+(num6+(num1+num2)) */}
                {loaded && num === 5 && <div className="double"> {num4} x {num5} + ({num1} + {num2}) + {num6} </div>}
                {/*(num1+num2)+(num6*num4)+(num5*num5)*/}
                {loaded && num === 6 && <div className="double">({num1} + {num2}) + {num6} x {num4} + {num5}<span style={{fontSize:'20px',position:'relative', top:"-19px"}}>2</span></div>}
                {/* (num6+((num1+num2)*num4))+num5 */}
                {loaded && num === 7 && <div className="double"> {num6} + ({num1} + {num2}) x {num4} + {num5}</div>}
                {/* (num4*num4)+num5 + ((num1+num2)*num6) */}
                {loaded && num === 8 && <div className="double"> {num4}<span style={{fontSize:'20px',position:'relative', top:"-19px"}}>2</span> + {num5} + ({num1} + {num2}) x {num6} </div>}
            </div>
            <div className="box">
                <button className="help" onClick={open}>Step by step</button>
            </div>
            {help && num === 0 && <Question num1 ={num1} num2={num2} num4={num4} num5={num5} close={close}/>}
            {help && num === 1 && <Question1 num1 ={num1} num2={num2} num4={num4} num5={num5} close={close}/>}
            {help && num === 2 && <Question2 num1 ={num1} num2={num2} num4={num4} num5={num5} close={close}/>}
            {help && num === 3 && <Question3 num1 ={num1} num2={num2} num4={num4} num5={num5} num6={num6} close={close}/>}
            {help && num === 4 && <Question4 num1 ={num1} num2={num2} num4={num4} num5={num5} num6={num6} close={close}/>}
            {help && num === 5 && <Question5 num1 ={num1} num2={num2} num4={num4} num5={num5} num6={num6} close={close}/>}
            {help && num === 6 && <Question6 num1 ={num1} num2={num2} num4={num4} num5={num5} num6={num6} close={close}/>}
            {help && num === 7 && <Question7 num1 ={num1} num2={num2} num4={num4} num5={num5} num6={num6} close={close}/>}
            {help && num === 8 && <Question8 num1 ={num1} num2={num2} num4={num4} num5={num5} num6={num6} close={close}/>}
            
            {loaded && correct && <Correct></Correct>}
            {loaded && wrong && <Wrong/> }
            <div className="box column">
               <div className="row ">
                    { loaded && <Choice value ={num7[num]+num3[0]} answer ={num7[num]} doSomething = {Add} Correct={CorrectA} Wrong={WrongA}/>}
                    { loaded && <Choice value ={num7[num]+num3[1]} answer ={num7[num]} doSomething = {Add} Correct={CorrectA} Wrong={WrongA}/>}
                    { loaded && <Choice value ={num7[num]+num3[2]} answer ={num7[num]} doSomething = {Add} Correct={CorrectA} Wrong={WrongA}/>}
               </div>
               <div className="row">
                    { loaded && <Choice value ={num7[num]+num3[3]} answer ={num7[num]} doSomething = {Add} Correct={CorrectA} Wrong={WrongA}/>}
                    { loaded && <Choice value ={num7[num]+num3[4]} answer ={num7[num]} doSomething = {Add} Correct={CorrectA} Wrong={WrongA}/>}
               </div>
            </div>
        </div>
    )
}