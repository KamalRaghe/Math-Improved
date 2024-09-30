import { useEffect, useState } from "react";
import Choice from "@/components/choice";
import Correct from "@/components/correct";
import Wrong from "@/components/wrong"; 
import Link from "next/link";
import { useRouter } from "next/router";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";
import Foil from "@/ATopic/Foil/foil";
import Foil1 from "@/ATopic/Foil/foil1";
import Foil2 from "@/ATopic/Foil/foil2"
import Foil3 from "@/ATopic/Foil/foil3";


export default function DoubleAdd(){
    const [help, setHelp] = useState(false)
    const [loaded, setLoaded] = useState(false)
    const [correct, setCorrect] = useState(false)
    const[ wrong, setWrong] = useState(false)
    const [num, setNum] = useState(Math.floor(Math.random()*4))
    const [num1, setNum1] = useState(Math.ceil(Math.random()*7+2));
    const [num2, setNum2] = useState();
    const [num3, setNum3] = useState([0,-1,Math.ceil(Math.random()*2+1)])
    const [power, SetPower] = useState(<span style={{fontSize:'20px',position:'relative',paddingRight:"10px", top:"-13px"}}>2</span>)
    const router = useRouter()
    const [sign1,setSign1] = useState(['+',"-","+","-"])
    const [sign2,setSign2] = useState(['+',"-","-","+"])
    const {username} = router.query 
    const {id} = router.query 

    function mix(){
        setNum3([0,-1,1*Math.ceil(Math.random()*2+1)])
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
            setNum(Math.floor(Math.random()*4))
             mix()
            setNum3(prevChange => prevChange.sort((a,b)=>Math.random()-0.5)) 
            setNum1(Math.ceil(Math.random()*6+3))
        }, 1500)
    }


    useEffect(() =>{
        setLoaded(true)
    },[])

    useEffect(()=>{
        setNum2(Math.ceil(Math.random()*(num1-3)))
    },[num1,num])

    
    const [score, setScore] =useState(0)
    const [count, setCount] =useState(0)
 
     useEffect(() =>{
         setLoaded(true)
         const count = parseInt(window.localStorage.getItem(`${id} Foil`))
         setCount(count ? count : 0)
         const score = parseInt(window.localStorage.getItem(`${id} score`))
         setScore(score ? score : 0)
         const ID = window.localStorage.getItem('ID')
        if(!(ID === id)){
            router.push("/")
        }
     },[])
 
     useEffect(() =>{
         if(count > 0){
         window.localStorage.setItem(`${id} Foil`, count)
     }},[count])
 
     useEffect(() =>{
         if(score > 0){
         window.localStorage.setItem(`${id} score` , score)
     }},[score])

    return(
        <div className="beige container column">
            <div className="Test sb"><div className="double" >
                <div className="font" >{username} </div>
                <div>Score: {loaded && score}</div>
                <div className="font" >Foil: {loaded && count} </div>
            </div><Link href={`/enter/FoilTest`}><button className="green test-btn">Test</button></Link></div>
            <div className="column ">
                { loaded && num === 0 && <div className="double" >(𝑥 + {num1})(𝑥 + {num2})</div> }
                
                { loaded && num === 1 && <div className="double" >(𝑥 - {num1})(𝑥 + {num2})</div> }

                { loaded && num === 2 && <div className="double" >(𝑥 + {num1})(𝑥 - {num2})</div> }

                { loaded && num === 3 && <div className="double" >(𝑥 - {num1})(𝑥 - {num2})</div> }

                
            </div>
            <div className="box">
                <button className="help" onClick={open}>help</button>
            </div>
            {help && num === 0 && <Foil num1 ={num1} num2={num2} close={close}/>}
            {help && num === 1 && <Foil1 num1 ={num1} num2={num2} close={close}/>}
            {help && num === 2 && <Foil2 num1 ={num1} num2={num2} close={close}/>}
            {help && num === 3 && <Foil3 num1 ={num1} num2={num2} close={close}/>}
            {loaded && correct && <Correct></Correct>}
            {loaded && wrong && <Wrong/> }
            <div className="box column">
               <div className="row ">
                    { loaded && <Choice big={true} size={'130px'} 
                    title ={<div>𝑥<span style={{fontSize:'15px',position:'relative',padding:"2px", top:"-7px"}}>2</span> 
                    {sign1[num]} {(num === 2 || num === 1) ? num1-num2+num3[0]:num1+num2-[num3[0]]}𝑥 {sign2[num]} {num1*num2+(num3[0]*num2)}</div>} 
                    value={num3[0]}
                    answer={0} doSomething = {Add} Correct={CorrectA} Wrong={WrongA}/>}
                    
                    { loaded && <Choice big={true} size={'130px'} 
                    title ={<div>𝑥<span style={{fontSize:'15px',position:'relative',padding:"2px", top:"-7px"}}>2</span> 
                    {sign1[num]} {(num === 2 || num === 1) ? num1-num2+num3[1]:num1+num2+num3[1]}𝑥 {sign2[num]} {num1*num2+(num3[1]*num1)}</div>} 
                    value={num3[1]}
                    answer={0} doSomething = {Add} Correct={CorrectA} Wrong={WrongA}/>}
               </div>
               <div className="row">
                    { loaded && <Choice big={true} size={'130px'} 
                    title ={<div>𝑥<span style={{fontSize:'15px',position:'relative',padding:"2px", top:"-7px"}}>2</span> 
                    {sign1[num]} {(num === 2 || num === 1) ? num1-num2+num3[2]:num1+num2+num3[2]}𝑥 {sign2[num]} {num1*num2-(num3[2]*num2)}</div>} 
                    value={num3[2]}
                    answer={0} doSomething = {Add} Correct={CorrectA} Wrong={WrongA}/>}
               </div>
            </div>
        </div>
    )
}