import { useEffect, useState } from "react";
import Choice from "@/components/choice";
import Correct from "@/components/correct";
import Wrong from "@/components/wrong"; 
import HelpAdd from '@/components/HelpAdd'
import Link from "next/link";
import { useRouter } from "next/router";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";
import axios from "axios";
import { set, ref } from "firebase/database";
import { rdb } from "@/firebase";


export default function DoubleAdd(){

    const [help, setHelp] = useState(false)
    const [loaded, setLoaded] = useState(false)
    const [ready, setReady] = useState(true)
    const [correct, setCorrect] = useState(false)
    const[ wrong, setWrong] = useState(false)
    const [num1, setNum1] = useState(Math.ceil(Math.random()*9));
    const [num2, setNum2] = useState(Math.ceil(Math.random()*9));
    const [num3, setNum3] = useState([0,1,-1,Math.ceil(Math.random()*2+1),-1*Math.ceil(Math.random()*2+1)])
    const router = useRouter()
    const [score, setScore] =useState(0)
    const [name, setName] =useState()
    const [time, setTime] = useState(60000+Date.now())
    const [date, setDate] = useState(Date.now())
    const {username} = router.query 
    const {id} = router.query 

    function mix(){
        setNum3([0,1,-1,Math.ceil(Math.random()*2+1),-1*Math.ceil(Math.random()*2+1)])
    }

    function update(){
        setDate(requestAnimationFrame(update))
      }

    function open(){
        setHelp(true)
      }
      function close(){
        setHelp(false)
      }

    function CorrectA(){ 
        setCorrect(true)
        setScore(score+1)
        setTimeout(() => {
            setCorrect(false)
            setReady(true) 
        }, 1200);
      }
      
      function WrongA(){ 
        setWrong(true)
        setTimeout(() => {
            setReady(true)
            setWrong(false) 
        }, 1200);
      } 
    function Add(){
        setTimeout(() => {
            setNum1(Math.ceil(Math.random()*9))
            setNum2(Math.ceil(Math.random()*9))
            mix()
            setNum3(prevChange => prevChange.sort((a,b)=>Math.random()-0.5)) 
        }, 1200)
    }

    function updateList(){
        let name = window.localStorage.getItem('GameName')
        let id = window.localStorage.getItem('GameId')
        set(ref(rdb, 'users/' + id),{
            user: name,
            score: score
        }).then(()=>{
            router.push('/Score')
        })
    }

    
    useEffect(() =>{
        setLoaded(true)
        update()
        let name = window.localStorage.getItem('GameName')
        setName(name)
    },[])

    useEffect(() =>{
        mix()
        setNum3(prevChange => prevChange.sort((a,b)=>Math.random()-0.5))
     },[num1])

     useEffect(() =>{
        if(time - Date.now() < 0 ){
            updateList()
        }
    })

    return(
        <div className="beige container column" >
            <div className="Test sb" style={{alignItems:"end"}}><div className="double" >
                {loaded && <div><div>Score: {score}</div><div style={{fontSize:"20px"}} >{name}</div></div>}
            </div>
                {loaded && time-Date.now() > 0 && <span style={{fontSize:"30px"}}>{Math.floor(((time-Date.now())%(1000*60))/1000)}s</span>}
            </div>
            {<div className="center column" >
                <div className="box column" style={{width:'300px'}}>
                    {loaded && <div className="double">{num1} + {num2} =
                        {loaded && correct && <span className="Green" style={{padding:"10px"}} >{num1+num2}</span>}
                        {loaded && wrong && <span className="Red" style={{padding:"10px"}} >{num1+num2}</span>}
                    </div>}
                </div>
                {help && <HelpAdd num1 ={num1} num2={num2} close={close}/>}
                {loaded && <button className="help" style={{zIndex:"20"}} onClick={open}>help</button>}
                <div style={{height:"30px"}} ></div>
                <div className="box column">
                <div className="row ">
                        { loaded && <Choice value ={num1+num2+num3[0]} answer ={num1+num2} doSomething = {Add} Correct={CorrectA} Wrong={WrongA}/>}
                        { loaded && <Choice value ={num1+num2+num3[1]} answer ={num1+num2} doSomething = {Add} Correct={CorrectA} Wrong={WrongA}/>}
                        { loaded && <Choice value ={num1+num2+num3[2]} answer ={num1+num2} doSomething = {Add} Correct={CorrectA} Wrong={WrongA}/>}
                </div>
                <div className="row">
                        { loaded && <Choice value ={num1+num2+num3[3]} answer ={num1+num2} doSomething = {Add} Correct={CorrectA} Wrong={WrongA}/>}
                        { loaded && <Choice value ={num1+num2+num3[4]} answer ={num1+num2} doSomething = {Add} Correct={CorrectA} Wrong={WrongA}/>}
                </div>
                </div>
            </div>}
        </div>
    )
}