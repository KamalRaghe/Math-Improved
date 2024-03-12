import { useEffect, useState } from "react";
import Choice from "@/components/choice";
import Correct from "@/components/correct";
import Wrong from "@/components/wrong"; 
import LT from "@/components/liketerm";
import Link from "next/link";
import { useRouter } from "next/router";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";

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
    const [num, setNum] = useState(Math.floor(Math.random()*5))
    const [num1, setNum1] = useState(Math.ceil(Math.random()*8+1));
    const [num2, setNum2] = useState(Math.ceil(Math.random()*8+1));
    const [num3, setNum3] = useState([0,1,-1*Math.ceil(Math.random()*2+1)])
    const [num5, setNum5] = useState(Math.ceil(Math.random()*8+1));
    const [num6, setNum6] = useState(Math.ceil(Math.random()*8+1));
    const [num7, setNum7] = useState(Math.ceil(Math.random()*8+1));
    const [num8, setNum8] = useState(Math.ceil(Math.random()*8+1));
    const [arrNum, setArrNum] = useState([num2, num5,num6,num7])
    const [arrLet, setArrLet] = useState(['y','y','z','x'])
    const [num9, setNum9] = useState([arrNum[0]+arrLet[0],arrNum[1]+arrLet[1],arrNum[2]+arrLet[2],arrNum[3]+arrLet[3]])
    const router = useRouter()
    const {username} = router.query 
    const {id} = router.query 

    function mix(){
        setNum3([0,-1,Math.ceil(Math.random()*2+1)])
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
            setNum(Math.floor(Math.random()*5))
            setNum2(Math.ceil(Math.random()*7+2))
            mix()
            setNum3(prevChange => prevChange.sort((a,b)=>Math.random()-0.5)) 
            setNum5(Math.ceil(Math.random()*8+1))
            setNum7(Math.ceil(Math.random()*8+1))
            setNum6(Math.ceil(Math.random()*8+1))
            setNum8(Math.ceil(Math.random()*8+1))
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
        setNum1(Math.ceil(Math.random()*(num2-1)+1))
        setArrNum([num2, num5,num6,num7]) 
     },[num5,num2])

     useEffect(()=>{
        setNum9([arrNum[0]+arrLet[0],arrNum[1]+arrLet[1],arrNum[2]+arrLet[2],arrNum[3]+arrLet[3]])
     },[arrNum])

     useEffect(()=>{
        setNum9(prevChange => prevChange.sort((a,b)=>Math.random()-0.5))
     },[num9])

     const [score, setScore] =useState(0)
     const [count, setCount] =useState(0)
  
      useEffect(() =>{
          setLoaded(true)
          const count = parseInt(window.localStorage.getItem(`${id} Like terms`))
          setCount(count ? count : 0)
          const score = parseInt(window.localStorage.getItem(`${id} score`))
          setScore(score ? score : 0)
      },[])
  
      useEffect(() =>{
          if(count > 0){
          window.localStorage.setItem(`${id} Like terms`, count)
      }},[count])
  
      useEffect(() =>{
          if(score > 0){
          window.localStorage.setItem(`${id} score` , score)
      }},[score])
 
     return(
         <div className="beige container column">
             <div className="Test sb"><div className="double" >
                 <div>Score: {loaded && score}</div>
                 <div className="font" >Like terms: {loaded && count} </div>
             </div><Link href={`/${id}/enter/LikeTermTest`}><button className="green test-btn">Test</button></Link></div>
            <div className="column center" style={{width:"300px"}}>
                { loaded && <div style={{fontSize:"25px"}}>{num1}𝑥 + {num9[0]} + {num9[1]} + {num9[2]} + {num9[3]} + {num8}z </div>}
            </div>
            <div className="box">
                <button className="help" onClick={open}>help</button>
            </div>
            {help && <LT num9={num9} close={close} num={arrNum}  num1={num1} num8={num8} ></LT>}
            {loaded && correct && <Correct></Correct>}
            {loaded && wrong && <Wrong/> }
            <div className="box column">
               <div className="row ">
                    { loaded && <Choice big={true} size={'120px'} value ={`${num1+num7-num3[0]}x+${num2+num5+num3[0]}y+${num6+num8+num3[0]}z`} answer ={`${num1+num7}x+${num2+num5}y+${num6+num8}z`} doSomething = {Add} Correct={CorrectA} Wrong={WrongA}/>}
                    { loaded && <Choice big={true} size={'120px'} value ={`${num1+num7-num3[1]}x+${num2+num5+num3[1]}y+${num6+num8+num3[1]}z`} answer ={`${num1+num7}x+${num2+num5}y+${num6+num8}z`} doSomething = {Add} Correct={CorrectA} Wrong={WrongA}/>}
               </div>
               <div className="row">
                    { loaded && <Choice big={true} size={'120px'} value ={`${num1+num7-num3[2]}x+${num2+num5+num3[2]}y+${num6+num8+num3[2]}z`} answer ={`${num1+num7}x+${num2+num5}y+${num6+num8}z`} doSomething = {Add} Correct={CorrectA} Wrong={WrongA}/>}
               </div>
            </div>
        </div>
    )
}