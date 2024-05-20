import { useEffect, useState } from "react";
import Choice from "@/components/choice";
import Correct from "@/components/correct";
import Wrong from "@/components/wrong"; 
import CircumOne from "@/components/CircumOne";
import CircumTwo from "@/components/CircumTwo";
import Link from "next/link";
import { useRouter } from "next/router";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";

export default function DoubleAdd(){
    const [help, setHelp] = useState(false)
    const [loaded, setLoaded] = useState(false)
    const [correct, setCorrect] = useState(false)
    const[ wrong, setWrong] = useState(false)
    const [num1, setNum1] = useState(Math.ceil(Math.random()*9));
    const [num4, setNum4] = useState(Math.floor(Math.random()*2));
    const [num5, setNum5] = useState([num1*22,num1*44])
    const [num6, setNum6] = useState(num5[num4])
    const [num3, setNum3] = useState([0,num1+num1,num1+num1+num1,-1*num1,num1])
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
            setNum1(Math.ceil(Math.random()*9))
            setNum4(Math.floor(Math.random()*2))
            mix()
            setNum3(prevChange => prevChange.sort((a,b)=>Math.random()-0.5)) 
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
        setNum5([num1*22,44*num1])
     },[num1,num4])

     useEffect(()=>{
        setNum6(num5[num4])
     },[num5])

     const [score, setScore] =useState(0)
    const [count, setCount] =useState(0)
 
     useEffect(() =>{
         setLoaded(true)
         const count = parseInt(window.localStorage.getItem(`${id} Circumference`))
         setCount(count ? count : 0)
         const score = parseInt(window.localStorage.getItem(`${id} score`))
         setScore(score ? score : 0)
     },[])
 
     useEffect(() =>{
         if(count > 0){
         window.localStorage.setItem(`${id} Circumference`, count)
     }},[count])
 
     useEffect(() =>{
         if(score > 0){
         window.localStorage.setItem(`${id} score` , score)
     }},[score])

    return(
        <div className="beige container column">
            <div className="Test sb" style={{padding:"20px"}}><div className="double" >
                <div>Score: {loaded && score}</div>
                <div className="font" >Factor Circumference: {loaded && count} </div>
            </div><Link href={`/${id}/enter/CircumferenceTest`}><button className="green test-btn">Test</button></Link></div>
            <div className="box column center relative" style={{top:"30px"}} >
                
                <div className="double absolute " style={{top:"-40px"}} >C =</div>

                {loaded && num4 === 0 && <div className="double center " style={{width:'100px', height:"100px",border:"3px solid black",backgroundColor:'black', borderRadius:"50%"}}>
                    <div className="relative center" style={{top:'-10px',fontSize:'20px',width:'100%',color:"white",borderBottom:"2px solid white"}} >{loaded && num1*7}</div>
                </div>}

                {loaded && num4 === 1 && <div className="double center" style={{display:'flex',justifyContent:'end',alignItems:'center',width:'100px', height:"100px",border:"3px solid black",backgroundColor:'black', borderRadius:"50%"}}>
                    <div className="relative center" style={{top:'-10px',fontSize:'20px',width:'50%',color:"white",borderBottom:"2px solid white"}} >{loaded && num1*7}</div>
                </div>}
                
            </div>
            <div className="box">
                <button className="help" onClick={open}>help</button>
            </div>
            {help && num4 === 0 && <CircumOne num1 ={num1} close={close}/>}
            {help && num4 === 1 && <CircumTwo num1 ={num1} close={close}/>}
            {loaded && correct && <Correct></Correct>}
            {loaded && wrong && <Wrong/> }
            <div className="box column">
               <div className="row ">
                    { loaded && <Choice value ={num6+num3[0]} answer ={num6} doSomething = {Add} Correct={CorrectA} Wrong={WrongA}/>}
                    { loaded && <Choice value ={num6+num3[1]} answer ={num6} doSomething = {Add} Correct={CorrectA} Wrong={WrongA}/>}
                    { loaded && <Choice value ={num6+num3[2]} answer ={num6} doSomething = {Add} Correct={CorrectA} Wrong={WrongA}/>}
               </div>
               <div className="row">
                    { loaded && <Choice value ={num6+num3[3]} answer ={num6} doSomething = {Add} Correct={CorrectA} Wrong={WrongA}/>}
                    { loaded && <Choice value ={num6+num3[4]} answer ={num6} doSomething = {Add} Correct={CorrectA} Wrong={WrongA}/>}
               </div>
            </div>
        </div>
    )
}