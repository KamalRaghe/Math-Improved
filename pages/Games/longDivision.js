import { useEffect, useState } from "react";
import Choice from "@/components/choice";
import Correct from "@/components/correct";
import Wrong from "@/components/wrong"; 
import Link from "next/link";
import { useRouter } from "next/router";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";
import LongDivisionHelp from "@/components/longDivisionHelp";
import { set, ref } from "firebase/database";
import { rdb } from "@/firebase";

export default function DoubleAdd(){
    const [help, setHelp] = useState(false)
    const [loaded, setLoaded] = useState(false)
    const [correct, setCorrect] = useState(false)
    const[ wrong, setWrong] = useState(false)
    const [num1, setNum1] = useState(Math.ceil(Math.random()*8+1));
    const [num2, setNum2] = useState(Math.ceil(Math.random()*900 + 99));
    const [num3, setNum3] = useState([0,1,-1,Math.ceil(Math.random()*2+1),-1*Math.ceil(Math.random()*2+1)])
    const router = useRouter()
    const [move,setMove] = useState('0px')
    const {username} = router.query 
    const {id} = router.query 

    function mix(){
        setNum3([0,1,-1,Math.ceil(Math.random()*2+1),-1*Math.ceil(Math.random()*2+1)])
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
        }, 1200);
        setScore(score+1)
    }
  
      function WrongA(){ 
        setWrong(true)
        setTimeout(() => {
            setWrong(false) 
        }, 1200);
      } 
    function Add(){
        setTimeout(() => {
            setNum1(Math.ceil(Math.random()*8+1))
            setNum2(Math.ceil(Math.random()*900+99))   
            mix()
            setNum3(prevChange => prevChange.sort((a,b)=>Math.random()-0.5)) 
        }, 1200)
    }


    useEffect(() =>{
        mix()
        setNum3(prevChange => prevChange.sort((a,b)=>Math.random()-0.5))
        if(!(num2%num1 > 0)){
            setMove('-25px')
        }else{
            setMove('0px')
        }
     },[num1])

     const [score, setScore] =useState(0)
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
            {loaded && <div style={{width:"100%"}}>
                <div className="center double Green" style={{width:"105.5%",position:"relative",left:move}}>{num2/num1 < 100 && <span className="hide">0</span>}{loaded && ((num2-(num2 % num1))/num1)}{num2%num1 > 0 && "R"+ (num2%num1)}</div>
                <div className="center double Red" style={{marginBottom:'15px', width:"105.5%",position:"relative",left:move}}><span></span>{wrong && num2/num1 < 100 && <span className="hide">0</span>}{wrong && loaded && ((num2-(num2 % num1))/num1)}{wrong && num2%num1 > 0 && "R"+ (num2%num1)}</div>
                <div className="double center" style={{ height: '10px'}}>{loaded && num1}<div style={{borderLeft: '3px solid black', borderTop: '3px solid black', margin:'5px', paddingRight:'10px'}}><span className="hide">.</span>{loaded && num2}</div> </div>
            </div>}
            <div className="box">
                {loaded && <button className="help" onClick={open}>help</button>}
                {<div className="countStart" >{start}</div>}
            </div>
            {help && loaded && <LongDivisionHelp num1 ={num1} num2={num2} close={close}/>}
            <div className="box column">
               <div className="row ">
                    { loaded && num2 % num1 > 0 && <Choice big={true} size={'65px'}  value ={`${((num2-(num2 % num1))/num1)-num3[0]} R${(num2%num1)}`} answer ={`${((num2-(num2 % num1))/num1)} R${(num2%num1)}`} doSomething = {Add} Correct={CorrectA} Wrong={WrongA}/>}
                    { loaded && num2 % num1 > 0 && <Choice big={true} size={'65px'}  value ={`${((num2-(num2 % num1))/num1)-num3[1]} R${(num2%num1)}`} answer ={`${((num2-(num2 % num1))/num1)} R${(num2%num1)}`} doSomething = {Add} Correct={CorrectA} Wrong={WrongA}/>}
                    { loaded && num2 % num1 > 0 && <Choice big={true} size={'65px'}  value ={`${((num2-(num2 % num1))/num1)-num3[2]} R${(num2%num1)}`} answer ={`${((num2-(num2 % num1))/num1)} R${(num2%num1)}`} doSomething = {Add} Correct={CorrectA} Wrong={WrongA}/>}
               </div>
               <div className="row">
                    { loaded && num2 % num1 > 0 && <Choice big={true} size={'65px'}  value ={`${((num2-(num2 % num1))/num1)-num3[3]} R${(num2%num1)}`} answer ={`${((num2-(num2 % num1))/num1)} R${(num2%num1)}`} doSomething = {Add} Correct={CorrectA} Wrong={WrongA}/>}
                    { loaded && num2 % num1 > 0 && <Choice big={true} size={'65px'}  value ={`${((num2-(num2 % num1))/num1)-num3[4]} R${(num2%num1)}`} answer ={`${((num2-(num2 % num1))/num1)} R${(num2%num1)}`} doSomething = {Add} Correct={CorrectA} Wrong={WrongA}/>}
               </div>
               <div className="row">
                    { loaded && num2 % num1 === 0 && <Choice  value ={((num2-(num2 % num1))/num1)-num3[0]} answer ={((num2-(num2 % num1))/num1)} doSomething = {Add} Correct={CorrectA} Wrong={WrongA}/>}
                    { loaded && num2 % num1 === 0 && <Choice  value ={((num2-(num2 % num1))/num1)-num3[1]} answer ={((num2-(num2 % num1))/num1)} doSomething = {Add} Correct={CorrectA} Wrong={WrongA}/>}
                    { loaded && num2 % num1 === 0 && <Choice  value ={((num2-(num2 % num1))/num1)-num3[2]} answer ={((num2-(num2 % num1))/num1)} doSomething = {Add} Correct={CorrectA} Wrong={WrongA}/>}
               </div>
               <div className="row">
                    { loaded && num2 % num1 === 0 && <Choice  value ={((num2-(num2 % num1))/num1)-num3[3]} answer ={((num2-(num2 % num1))/num1)} doSomething = {Add} Correct={CorrectA} Wrong={WrongA}/>}
                    { loaded && num2 % num1 === 0 && <Choice  value ={((num2-(num2 % num1))/num1)-num3[4]} answer ={((num2-(num2 % num1))/num1)} doSomething = {Add} Correct={CorrectA} Wrong={WrongA}/>}
               </div>
            </div>
        </div>
    )
}