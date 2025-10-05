import { useEffect, useState } from "react";
import Choice from "@/components/choice";
import Correct from "@/components/correct";
import Wrong from "@/components/wrong"; 
import HelpCube from "@/components/cubehelp";
import Link from "next/link";
import { useRouter } from "next/router";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";

export default function DoubleAdd(){
    const [help, setHelp] = useState(false)
    const [loaded, setLoaded] = useState(false)
    const [correct, setCorrect] = useState(false)
    const[ wrong, setWrong] = useState(false)
    const [question, setQ] = useState()
    const [num1, setNum1] = useState(Math.ceil(Math.random()*8+1));
    const [num2, setNum2] = useState(Math.ceil(Math.random()*8+1));
    const [num5, setNum5] = useState(Math.ceil(Math.random()*8+1));
    const [num4, setNum4] = useState(Math.ceil(Math.random()*8+1));
    const [num1E, setNum1E] = useState(Math.ceil(Math.random()*2+7));
    const [num2E, setNum2E] = useState(Math.ceil(Math.random()*2+5));
    const [num5E, setNum5E] = useState(Math.ceil(Math.random()*2+3));
    const [num4E, setNum4E] = useState(Math.ceil(Math.random()*2+1));
    const [num3, setNum3] = useState([0,1,-1])
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
        setTimeout(() => {
            setNum1(Math.ceil(Math.random()*8+1))
            setNum2(Math.ceil(Math.random()*8+1))
            setNum5(Math.ceil(Math.random()*8+1))
            setNum4(Math.ceil(Math.random()*8+1))
            setNum1E(Math.ceil(Math.random()*2+7))
            setNum2E(Math.ceil(Math.random()*2+5))
            setNum5E(Math.ceil(Math.random()*2+3))
            setNum4E(Math.ceil(Math.random()*2+1))
            mix()
            setNum3(prevChange => prevChange.sort((a,b)=>Math.random()-0.5))
        }, 1500)
    }


    useEffect(() =>{
       mix()
       setNum3(prevChange => prevChange.sort((a,b)=>Math.random()-0.5))
    },[num1])

    useEffect(() =>{
        
        setLoaded(true)
        // const ID = window.localStorage.getItem('ID')
        // if(!(ID === id)){
        //     router.push("/")
        // }
    },[])

    const [score, setScore] =useState(0)
    const [count, setCount] =useState(0)
 
     useEffect(() =>{
         setLoaded(true)
         const count = parseInt(window.localStorage.getItem(`${id} Cube`))
         setCount(count ? count : 0)
         const score = parseInt(window.localStorage.getItem(`${id} score`))
         setScore(score ? score : 0)
     },[])
 
     useEffect(() =>{
         if(count > 0){
         window.localStorage.setItem(`${id} Cube`, count)
     }},[count])
 
     useEffect(() =>{
         if(score > 0){
         window.localStorage.setItem(`${id} score` , score)
     }},[score])

    return(
        <div className="beige container column">
            <div className="Test sb"><div className="double" >
                <div>Score: {loaded && score}</div>
                <div className="font" >Cube: {loaded && count} </div>
            </div><Link href={`/${id}/enter/testCube`}><button className="green test-btn">Test</button></Link></div>
            <div className=" box">
                <div className="double center ">{loaded && num1}𝑥</div><span style={{fontSize:'20px',position:'relative', top:"-13px"}}>{loaded && num1E}</span>
                <span style={{padding:"4px"}} className="double center" >+</span>
                <div className="double center ">{loaded && num2}𝑥</div><span style={{fontSize:'20px',position:'relative', top:"-13px"}}>{loaded && num2E}</span>
                <span style={{padding:"4px"}} className="double center" >+</span>
                <div className="double center ">{loaded && num5}𝑥</div><span style={{fontSize:'20px',position:'relative', top:"-13px"}}>{loaded && num5E}</span>
                <span style={{padding:"4px"}} className="double center" >+</span>
                <div className="double center ">{loaded && num4}𝑥</div><span style={{fontSize:'20px',position:'relative', top:"-13px"}}>{loaded && num4E}</span>
            </div>
            <div className="box">
                <button className="help" onClick={open}>help</button>
            </div>
            {help && <HelpCube  num1={num1} close={close}/>}
            {loaded && correct && <Correct></Correct>}
            {loaded && wrong && <Wrong/> }
            <div className="box column">
               <div className="row ">
                    { loaded && <Choice size={'130px'} big={true} 
                    title ={<div>𝑥<span style={{fontSize:'15px',position:'relative',padding:"2px", top:"-7px"}}>2</span></div>} 
                    value ={num3[0]} answer ={0} doSomething = {Add} Correct={CorrectA} Wrong={WrongA}/>}
                    { loaded && <Choice size={'130px'} big={true}  
                    value ={num3[1]} answer ={0} doSomething = {Add} Correct={CorrectA} Wrong={WrongA}/>}
               </div>
               <div className="row">
                    { loaded && <Choice size={'130px'} big={true}  
                    value ={num3[2]} answer ={0} doSomething = {Add} Correct={CorrectA} Wrong={WrongA}/>}
                   
               </div>
            </div>
        </div>
    )
}