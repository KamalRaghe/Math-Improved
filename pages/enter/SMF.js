import { useEffect, useState } from "react";
import Choice from "@/components/FractionChoice";
import Correct from "@/components/correct";
import Wrong from "@/components/wrong"; 
import Link from "next/link";
import SMF from "@/components/SMF";
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
    const [num3, setNum3] = useState([0,1,-1,2,-2])
    const [num5, setNum5] = useState(Math.ceil(Math.random()*7+2));
    const [num6, setNum6] = useState(Math.ceil(Math.random()*9));
    const [num7, setNum7] = useState(Math.ceil(Math.random()*9));
    const [num8, setNum8] = useState(Math.ceil(Math.random()*7+2))
    const [num9, setNum9] = useState(Math.ceil(Math.random()*7+2))
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
            setNum9(Math.ceil(Math.random()*7+2))
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

    useEffect(()=>{
        setNum8(Math.ceil(Math.random()*(num6-1)))
    },[num6,num9])

    useEffect(() =>{
        setLoaded(true)
        mix()
        setNum3(prevChange => prevChange.sort((a,b)=>Math.random()-0.5))
    },[])

    const [score, setScore] =useState(0)
    const [count, setCount] =useState(0)
 
     useEffect(() =>{
         Add()
         setLoaded(true)
         const count = parseInt(window.localStorage.getItem(`${id} SMF`))
         setCount(count ? count : 0)
         const score = parseInt(window.localStorage.getItem(`${id} score`))
         setScore(score ? score : 0)
     },[])
 
     useEffect(()=>{
        const ID = window.localStorage.getItem('ID')
        if(!(ID === id)){
            router.push("/")
        }
    },[])

     useEffect(() =>{
         if(count > 0){
         window.localStorage.setItem(`${id} SMF`, count)
     }},[count])
 
     useEffect(() =>{
         if(score > 0){
         window.localStorage.setItem(`${id} score` , score)
     }},[score])

    return(
        <div className="beige container column">
            <div className="Test sb"><div className="double" >
                <div>Score: {loaded && score}</div>
                <div className="font" >Subtraction Mixed Fraction: {loaded && count} </div>
            </div><Link href={`/enter/SMFTest`}><button className="green test-btn">Test</button></Link></div>
            <div className="box  ">
                <span className="hide">00000</span>
                {loaded && <div className=" double center"><span style={{padding:'3px'}} >{num6}</span>
                    <div className="column center" >
                        <div className="center" style={{borderBottom:'2px solid black', width:'45px'}} >
                            {num4}</div>
                    {num5}</div></div>}
                    <div className="double" style={{padding:'10px'}} >-</div>
                    {loaded && <div className=" double center"><span style={{padding:'3px'}} >{num8}</span>
                    <div className="column center" >
                        <div className="center" style={{borderBottom:'2px solid black', width:'45px'}} >
                            {num2}</div>
                    {num1}</div></div>}
                    <div className="double" style={{padding:'10px'}} >=</div>
                
            </div>
            <div className="box">
                <button className="help" onClick={open}>help</button>
            </div>
            {help && <SMF num1={num4} num2={num5} close={close} num4={num2} num5={num1} whole1={num6} whole2={num8} />}
            {loaded && correct && <Correct></Correct>}
            {loaded && wrong && <Wrong/> }
            <div className="box column">
               <div className="row ">
                    { loaded && <Choice whole={(num2*(num7/num1)) > (num4*(num7/num5))+num3[0] ? num6-num8-1 : num6-num8} value1 ={(num2*(num7/num1)) > (num4*(num7/num5)) ? (((num4*(num7/num5))+num7)-(num2*(num7/num1))+num3[0]) :((num4*(num7/num5))-(num2*(num7/num1))+num3[0])} answer1 ={(num2*(num7/num1)) > (num4*(num7/num5)) ? (((num4*(num7/num5))+num7)-(num2*(num7/num1))) :((num4*(num7/num5))-(num2*(num7/num1)))} value2={num7} answer2={num7} doSomething = {Add} Correct={CorrectA} Wrong={WrongA}/>}
                    { loaded && <Choice whole={(num2*(num7/num1)) > (num4*(num7/num5))+num3[1] ? num6-num8-1 : num6-num8} value1 ={(num2*(num7/num1)) > (num4*(num7/num5)) ? (((num4*(num7/num5))+num7)-(num2*(num7/num1))+num3[1]) :((num4*(num7/num5))-(num2*(num7/num1))+num3[1])} answer1 ={(num2*(num7/num1)) > (num4*(num7/num5)) ? (((num4*(num7/num5))+num7)-(num2*(num7/num1))) :((num4*(num7/num5))-(num2*(num7/num1)))} value2={num7} answer2={num7} doSomething = {Add} Correct={CorrectA} Wrong={WrongA}/>}
                    { loaded && <Choice whole={(num2*(num7/num1)) > (num4*(num7/num5))+num3[2] ? num6-num8-1 : num6-num8} value1 ={(num2*(num7/num1)) > (num4*(num7/num5)) ? (((num4*(num7/num5))+num7)-(num2*(num7/num1))+num3[2]) :((num4*(num7/num5))-(num2*(num7/num1))+num3[2])} answer1 ={(num2*(num7/num1)) > (num4*(num7/num5)) ? (((num4*(num7/num5))+num7)-(num2*(num7/num1))) :((num4*(num7/num5))-(num2*(num7/num1)))} value2={num7} answer2={num7} doSomething = {Add} Correct={CorrectA} Wrong={WrongA}/>}
               </div>
               <div className="row">
                    { loaded && <Choice whole={(num2*(num7/num1)) > (num4*(num7/num5))+num3[3] ? num6-num8-1 : num6-num8} value1 ={(num2*(num7/num1)) > (num4*(num7/num5)) ? (((num4*(num7/num5))+num7)-(num2*(num7/num1))+num3[3]) :((num4*(num7/num5))-(num2*(num7/num1))+num3[3])} answer1 ={(num2*(num7/num1)) > (num4*(num7/num5)) ? (((num4*(num7/num5))+num7)-(num2*(num7/num1))) :((num4*(num7/num5))-(num2*(num7/num1)))} value2={num7} answer2={num7} doSomething = {Add} Correct={CorrectA} Wrong={WrongA}/>}
                    { loaded && <Choice whole={(num2*(num7/num1)) > (num4*(num7/num5))+num3[4] ? num6-num8-1 : num6-num8} value1 ={(num2*(num7/num1)) > (num4*(num7/num5)) ? (((num4*(num7/num5))+num7)-(num2*(num7/num1))+num3[4]) :((num4*(num7/num5))-(num2*(num7/num1))+num3[4])} answer1 ={(num2*(num7/num1)) > (num4*(num7/num5)) ? (((num4*(num7/num5))+num7)-(num2*(num7/num1))) :((num4*(num7/num5))-(num2*(num7/num1)))} value2={num7} answer2={num7} doSomething = {Add} Correct={CorrectA} Wrong={WrongA}/>}
               </div>
            </div>
        </div>
    )
}