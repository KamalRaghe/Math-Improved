import { useEffect, useState } from "react";
import Choice from "@/components/choice";
import Correct from "@/components/correct";
import Wrong from "@/components/wrong"; 
import StepTimes from '@/components/stepTimes'
import Link from "next/link";
import { useRouter } from "next/router";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { set, ref } from "firebase/database";
import { rdb } from "@/firebase";

export default function DoubleAdd(){
    const [help, setHelp] = useState(false)
    const [loaded, setLoaded] = useState(false)
    const [correct, setCorrect] = useState(false)
    const[ wrong, setWrong] = useState(false)
    const [num1, setNum1] = useState(Math.floor(Math.random()*90+10));
    const [num2, setNum2] = useState(Math.floor(Math.random()*90+10));
    const [num3, setNum3] = useState(([0,Math.ceil(Math.random()*50),-1*Math.ceil(Math.random()*50),Math.ceil(Math.random()*50+50),-1*(Math.ceil(Math.random()*50+50))]))
    const router = useRouter()
    const {username} = router.query 
    const {id} = router.query 
    const [name, setName] =useState()
    const [time, setTime] = useState()
    const [start, setStart] = useState(3)
    const [date, setDate] = useState(Date.now())

    function update(){
        setDate(requestAnimationFrame(update))
      }

    function updateList(){
        let name = window.localStorage.getItem('GameName')
        let id = window.localStorage.getItem('GameId')
        let room = window.localStorage.getItem('GameRoom')
        set(ref(rdb, `${room}/` + id),{
            user: name,
            score: score
        }).then(()=>{
            router.push('/Score')
        })
    }

    function mix(){
        setNum3(([0,Math.ceil(Math.random()*50),-1*Math.ceil(Math.random()*50),Math.ceil(Math.random()*50+50),-1*(Math.ceil(Math.random()*50+50))]))
    }

    function open(){
        setHelp(true)
      }
      function close(){
        setHelp(false)
      }

    function CorrectA(){ 
        setScore(score+1)
        setCorrect(true)
        setTimeout(() => {
            setCorrect(false) 
        }, 1200);
      }
  
      function WrongA(){ 
        setWrong(true)
        setTimeout(() => {
            setWrong(false) 
        }, 1200);
      } 
    function Add(){
        setTimeout(() => {
            setNum1(Math.floor(Math.random()*90+10))
            setNum2(Math.floor(Math.random()*90+10))
            mix()
            setNum3(prevChange => prevChange.sort((a,b)=>Math.random()-0.5)) 
        }, 1200)
    }

    useEffect(() =>{
        mix()
        setNum3(prevChange => prevChange.sort((a,b)=>Math.random()-0.5))
     },[num1])

     const [score, setScore] =useState(0)
     useEffect(() =>{
        let timer = window.localStorage.getItem('Timer')
        setTime(timer)
        setTimeout(() => {
            setStart(2)
        }, 1000); 
        setTimeout(() => {
            setStart(1)
        }, 2000);
        setTimeout(() => {
            setStart()
            setLoaded(true)
            update() 
        }, 3000);
        let name = window.localStorage.getItem('GameName')
        setName(name)
    },[])

     useEffect(() =>{
        if(time - Date.now() < 0 ){
            updateList()
        }
    })

    return(
        <div className="beige container column">
           <div className="Test sb" style={{alignItems:"end"}}><div className="double" >
                {loaded && <div><div>Score: {score}</div><div style={{fontSize:"20px"}} >{name}</div></div>}
            </div>
                <div>
                    {loaded && time-Date.now() > 60 && <span style={{fontSize:"30px",padding:"5px"}}>{Math.floor(((time-Date.now())%(1000*60*60))/60000)}m</span>}
                    {loaded && time-Date.now() > 0 && <span style={{fontSize:"30px"}}>{Math.floor(((time-Date.now())%(1000*60))/1000)}s</span>}
                </div>    
            </div>
            {<div className="countStart" >{start}</div>}
            {loaded && <div className="box column">
                <div className="double top-number">{loaded && num1}</div>
                <div className="double bottom-number">x{loaded && num2}</div>
                {correct && <div className="Green double lower-number">{loaded && num2*num1}</div>}
                {wrong && <div className="Red double lower-number">{loaded && num2*num1}</div>}
            </div>}
            {loaded && <div className="box">
                <button className="help" onClick={open}>Step by step</button>
            </div>}
            {help && <StepTimes num1 ={num1} num2={num2} close={close}/>}
           
            {!wrong && !correct && <div className="box column">
               <div className="row ">
                    { loaded && <Choice value ={num1*num2+num3[0]} answer ={num1*num2} doSomething = {Add} Correct={CorrectA} Wrong={WrongA}/>}
                    { loaded && <Choice value ={num1*num2+num3[1]} answer ={num1*num2} doSomething = {Add} Correct={CorrectA} Wrong={WrongA}/>}
                    { loaded && <Choice value ={num1*num2+num3[2]} answer ={num1*num2} doSomething = {Add} Correct={CorrectA} Wrong={WrongA}/>}
               </div>
               <div className="row">
                    { loaded && <Choice value ={num1*num2+num3[3]} answer ={num1*num2} doSomething = {Add} Correct={CorrectA} Wrong={WrongA}/>}
                    { loaded && <Choice value ={num1*num2+num3[4]} answer ={num1*num2} doSomething = {Add} Correct={CorrectA} Wrong={WrongA}/>}
               </div>
            </div>}
        </div>
    )
}