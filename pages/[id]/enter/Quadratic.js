import { useEffect, useState } from "react";
import Choice from "@/components/choice";
import Correct from "@/components/correct";
import Wrong from "@/components/wrong"; 
import Link from "next/link";
import { useRouter } from "next/router";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";
import Quad from "@/ATopic/Quad/Quad";
import Quad1 from "@/ATopic/Quad/Quad1";
import Quad2 from "@/ATopic/Quad/Quad2";
import Quad3 from "@/ATopic/Quad/Quad3";

export async function getServerSideProps(context){
    return{
        props: {
           
        }
    }
}

export default function DoubleAdd({Count}){
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
    const [sign3,setSign3] = useState(['-',"-","+","+"])
    const {username} = router.query 
    const {id} = router.query 

    function mix(){
        setNum3([0,-1,1*Math.ceil(Math.random()*2+1)])
    }

    function open(){
        setHelp(true)
        console.log(help)
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
         const count = parseInt(window.localStorage.getItem(`${id} Quadratic Formula`))
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
         window.localStorage.setItem(`${id} Quadratic Formula`, count)
     }},[count])
 
     useEffect(() =>{
         if(score > 0){
         window.localStorage.setItem(`${id} score` , score)
     }},[score])

    return(
        <div className="beige container column">
            <div className="Test sb"><div className="double" >
                <div>Score: {loaded && score}</div>
                <div className="font" >Quadratic Formula: {loaded && count} </div>
            </div><Link href={`/${id}/enter/QuadtricTest`}><button className="green test-btn">Test</button></Link></div>
            <div className="column box relative tooBig" style={{width:'340px'}}>
                {loaded &&<div className="double" >𝑥<span style={{fontSize:'20px',position:'relative',padding:"2px", top:"-13px",paddingLeft:"2px",paddingRight:"10px"}}>2</span>
                    {sign1[num]} {(num ===2 || num === 1) ? num1-num2 : num1+num2}x {sign2[num]} {num1*num2} = 0
                </div>} 
                
            </div>
            <div className="box relative tooBig">
                <button className="help" onClick={open}>help</button>
            </div>
            {help && num === 0 && <Quad num1 ={num1} num2={num2} close={close}/>}
            {help && num === 1 && <Quad1 num1 ={num1} num2={num2} close={close}/>}
            {help && num === 2 && <Quad2 num1 ={num1} num2={num2} close={close}/>}
            {help && num === 3 && <Quad3 num1 ={num1} num2={num2} close={close}/>}
            {loaded && correct && <Correct></Correct>}
            {loaded && wrong && <Wrong/> }
            <div className="box column center relative tooBig">
               <div className="row " >
                    { loaded && <Choice big={true} size={'160px'} 
                    title ={<div>𝑥 = {(num === 0 || num === 2) ?-1*(num1+num3[0]) :num1-num3[0]} or 𝑥 = {(num === 0 || num === 1) ? -1*num2+num3[0]:num2+num3[0]}</div>} 
                    value={num3[0]}
                    answer={0} doSomething = {Add} Correct={CorrectA} Wrong={WrongA}/>}
                    
                    { loaded && <Choice big={true} size={'160px'} 
                    title ={<div>𝑥 = {(num === 0 || num === 2) ?-1*(num1+num3[1]) :num1+num3[1]} or 𝑥 = {(num === 0 || num === 1) ? -1*num2+num3[1]:num2+num3[1]}</div>} 
                    value={num3[1]}
                    answer={0} doSomething = {Add} Correct={CorrectA} Wrong={WrongA}/>}
               </div>
               <div className="row">
                    { loaded && <Choice big={true} size={'160px'} 
                    title ={<div>𝑥 = {(num === 0 || num === 2) ?-1*(num1+num3[2]) :num1+num3[2]} or 𝑥 = {(num === 0 || num === 1) ? -1*num2+num3[2]:num2+num3[2]}</div>}
                    value={num3[2]}
                    answer={0} doSomething = {Add} Correct={CorrectA} Wrong={WrongA}/>}
               </div>
            </div>
        </div>
    )
}