// DeciMinus.jsx — decimal subtraction practice page
import { useEffect, useState } from "react";
import Choice from "@/components/choice";
import Correct from "@/components/correct";
import Wrong from "@/components/wrong";
import StepMinusDecimal from "@/components/deciMinushelp";
import Link from "next/link";
import { useRouter } from "next/router";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";

// random number from 0.1 to 9.999, with 1, 2 or 3 decimal digits
function randDecimal(){
    const places = Math.ceil(Math.random()*3) // 1, 2 or 3
    const min = Math.round(0.1*Math.pow(10,places))
    const max = Math.round(9.999*Math.pow(10,places))
    const n = Math.floor(Math.random()*(max-min+1)+min)
    return n/Math.pow(10,places)
}

// always returns [bigger, smaller] so the answer is never negative or zero
function makePair(){
    let x = randDecimal()
    let y = randDecimal()
    while (x === y) { y = randDecimal() }
    return x > y ? [x, y] : [y, x]
}

function round(n){
    return Math.round(n*1000)/1000
}

function splitParts(n){
    const s = n.toString()
    const [whole, frac] = s.split('.')
    return { whole, frac: frac || "" }
}

export default function DeciMinus(){
    const [help, setHelp] = useState(false)
    const [loaded, setLoaded] = useState(false)
    const [correct, setCorrect] = useState(false)
    const [wrong, setWrong] = useState(false)
    const [[num1, num2], setPair] = useState(() => makePair());
    const [num3, setNum3] = useState([0,round(Math.random()*1),round(-1*Math.random()*1),round(Math.random()*2+1),round(-1*(Math.random()*2+1))])
    const router = useRouter()
    const {username} = router.query
    const {id} = router.query

    const part1 = splitParts(num1)
    const part2 = splitParts(num2)

    function mix(){
        setNum3([0,round(Math.random()*1),round(-1*Math.random()*1),round(Math.random()*2+1),round(-1*(Math.random()*2+1))])
    }

    function open(){
        setHelp(true)
      }
      function close(){
        setHelp(false)
      }

    function CorrectA(){
        setCount(count+1)
        setScore(score+1)
        setCorrect(true)
        setTimeout(() => {
            setCorrect(false)
        }, 1900);
      }

      function WrongA(){
        setWrong(true)
        setTimeout(() => {
            setWrong(false)
            setHelp(true)
        }, 1900);
      }
    function Add(){
        setTimeout(() => {
            setPair(makePair())
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
         const count = parseInt(window.localStorage.getItem(`${id} DeciMinus`))
         setCount(count ? count : 0)
         const score = parseInt(window.localStorage.getItem(`${id} score`))
         setScore(score ? score : 0)
         const ID = window.localStorage.getItem('ID')
     },[])

     useEffect(() =>{
         if(count > 0){
         window.localStorage.setItem(`${id} DeciMinus`, count)
     }},[count])

     useEffect(() =>{
         if(score > 0){
         window.localStorage.setItem(`${id} score` , score)
     }},[score])

    return(
        <div className="beige container column">
            <div className="Test sb"><div className="double" >
                <div>Score: {loaded && score}</div>
                <div className="font" >Decimal Subtraction: {loaded && count} </div>
            </div><Link href={`/${id}/enter/DeciMinusTest`}><button className="green test-btn">Test</button></Link></div>
            {loaded && <div className="column" style={{fontFamily:"monospace",padding:'10px'}}>
                <div className="double" style={{display:"flex", justifyContent:"flex-end"}}>
                    <span style={{display:"inline-block", textAlign:"right"}}>{part1.whole}</span>
                    <span style={{display:"inline-block", width:"14px", textAlign:"center"}}>{part1.frac && "."}</span>
                    <span style={{display:"inline-block", textAlign:"left"}}>{part1.frac}</span>
                </div>
                <div className="double bottom-number" style={{display:"flex", justifyContent:"flex-end"}}>
                    <span style={{display:"inline-block", textAlign:"right"}}>- {part2.whole}</span>
                    <span style={{display:"inline-block", width:"14px", textAlign:"center"}}>{part2.frac && "."}</span>
                    <span style={{display:"inline-block", textAlign:"left"}}>{part2.frac}</span>
                </div>
            </div>}
            <div className="box">
                <button className="help" onClick={open}>Step by step</button>
            </div>
            {help && <StepMinusDecimal num1={num1} num2={num2} close={close}/>}
            {loaded && correct && <Correct></Correct>}
            {loaded && wrong && <Wrong/> }
            <div className="box column">
               <div className="row ">
                    { loaded && <Choice value ={round(num1-num2+num3[0])} answer ={round(num1-num2)} doSomething = {Add} Correct={CorrectA} Wrong={WrongA}/>}
                    { loaded && <Choice value ={round(num1-num2+num3[1])} answer ={round(num1-num2)} doSomething = {Add} Correct={CorrectA} Wrong={WrongA}/>}
                    { loaded && <Choice value ={round(num1-num2+num3[2])} answer ={round(num1-num2)} doSomething = {Add} Correct={CorrectA} Wrong={WrongA}/>}
               </div>
               <div className="row">
                    { loaded && <Choice value ={round(num1-num2+num3[3])} answer ={round(num1-num2)} doSomething = {Add} Correct={CorrectA} Wrong={WrongA}/>}
                    { loaded && <Choice value ={round(num1-num2+num3[4])} answer ={round(num1-num2)} doSomething = {Add} Correct={CorrectA} Wrong={WrongA}/>}
               </div>
            </div>
        </div>
    )
}