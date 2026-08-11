import { useEffect, useState } from "react";
import Choice from "@/components/choice";
import Heart from "@/components/heart";
import Heart1 from "@/components/heart1";
import Heart2 from "@/components/heart2";
import Heart3 from "@/components/heart3";
import Timeout from "@/components/timeout";
import Pass from "@/components/pass";
import Mistake from "@/components/mistake";
import Correct from "@/components/correct";
import Wrong from "@/components/wrong"; 
import Link from "next/link";
import { useRouter } from "next/router";


export default function DoubleAdd(){
    const [sign1,setSign1] = useState(['+',"-","+","-"])
    const [sign2,setSign2] = useState(['+',"-","-","+"])
    const [sign3,setSign3] = useState(['+',"+","-","-"])
    const [again, setAgain] = useState(false)
    const [loaded, setLoaded] = useState(false)
    const [correct, setCorrect] = useState(false)
    const[ wrong, setWrong] = useState(false)
    const [num, setNum] = useState(Math.floor(Math.random()*4))
    const [num1, setNum1] = useState(Math.ceil(Math.random()*6+3));
    const [num2, setNum2] = useState();
    const [num3, setNum3] = useState([0,-1,Math.ceil(Math.random()*2+1)])
    const [power, SetPower] = useState(<span style={{fontSize:'20px',position:'relative',paddingRight:"10px", top:"-13px"}}>2</span>)
    const [mistake, setMistake] = useState(0)
    const [count, setCount] = useState(0)
    const [time, setTime] = useState( 600000 + Date.now())
    const [date, setDate] = useState(Date.now()) 
    const router = useRouter()
    const {username} = router.query 
    const {id} = router.query
    
    function Again(){
        setAgain(true)
        setCount(0)
        setMistake(0)
        setTime(600000 + Date.now())
        setLoaded(true)
    }

    function mix(){
        setNum3([0,-1,1*Math.ceil(Math.random()*2+1)])
    }

    function update(){
        setDate(requestAnimationFrame(update))
      }

    function CorrectA(){ 
        setCorrect(true)
        setTimeout(() => {
            setCorrect(false) 
        }, 1510);
        setCount(count+1)
      }
  
      function WrongA(){ 
        setMistake( mistake + 1)
        setWrong(true)
        setTimeout(() => {
            setWrong(false) 
        }, 1510);
      } 
    function Add(){
        setTimeout(() => {
            setNum(Math.floor(Math.random()*4))
             mix()
            setNum3(prevChange => prevChange.sort((a,b)=>Math.random()-0.5)) 
            setNum1(Math.ceil(Math.random()*6+3))
        }, 1510)
    }

    function cancel(){
        setDate(cancelAnimationFrame(date))
      }

    useEffect(() =>{
        mix()
        setNum3(prevChange => prevChange.sort((a,b)=>Math.random()-0.5))
     },[num1])

     useEffect(()=>{
        setNum2(Math.ceil(Math.random()*(num1-3)))
    },[num1,num])

    useEffect(() =>{
        setLoaded(true)
        update()
    },[])


    useEffect(() =>{
        setAgain(false)
    },[again])

    useEffect(() =>{
        if(mistake >= 3 || time - Date.now() < 0 || count >= 25){
            setLoaded(false)
            setTime(time)
            cancel()
        }
    })

    useEffect(()=>{
        const ID = window.localStorage.getItem('ID')
        if(!(ID === id)){
            router.push("/")
        }
    },[])

    return(
        <div className="beige container column">
           <div className="double">Question left : {25 - count}</div>
           <div className="inTest">
            
                <div className="Red relative" > 
                    {mistake === 0 && <Heart/>}
                    {mistake === 1 && <Heart1/>}
                    {mistake === 2 && <Heart2/>}
                    {mistake === 3 && <Heart3/>}
                </div>
                {loaded && time - Date.now() > 0 && count < 25 && <div>{Math.floor(((time - Date.now())%(1000*60*60))/1000/60)}m {""}
                {Math.floor(((time - Date.now())%(1000*60))/1000)}s</div>}
            </div>

            <div className="center"  style={{width:"100%"}}>
                {loaded &&<div className="double" >𝑥<span style={{fontSize:'20px',position:'relative',padding:"2px", top:"-13px",paddingLeft:"2px",paddingRight:"10px"}}>2</span>
                    {sign1[num]} {(num ===2 || num === 1) ? num1-num2 : num1+num2}x {sign2[num]} {num1*num2}
                </div>} 
            </div>
            <div className="box"  style={{width:"340px"}}>
                {correct && <div className="double Green" >(x {sign1[num]} {num1})(x {sign3[num]} {num2})</div>}
                {wrong && <div className="double Red" >(x {sign1[num]} {num1})(x {sign3[num]} {num2})</div>}
            </div>
            { time - Date.now() < 0 && <Timeout again ={Again}/>}
            {mistake === 3 && <Mistake again={Again}></Mistake>}
            {count === 25 && <Pass time ={600000 -(time-Date.now())}/>}
            <div className="box column">
            <div className="box column">
               <div className="row ">
                    { loaded && <Choice big={true} size={'140px'} 
                    title ={<div>(x {sign1[num]} {num1+num3[0]})(x {sign3[num]} {num2+num3[0]})</div>} 
                    value={num3[0]}
                    answer={0} doSomething = {Add} Correct={CorrectA} Wrong={WrongA}/>}
                    
                    { loaded && <Choice big={true} size={'140px'} 
                    title ={<div>(x {sign1[num]} {num1+num3[1]})(x {sign3[num]} {num2+num3[1]})</div>} 
                    value={num3[1]}
                    answer={0} doSomething = {Add} Correct={CorrectA} Wrong={WrongA}/>}
               </div>
               <div className="row">
                    { loaded && <Choice big={true} size={'140px'} 
                    title ={<div>(x {sign1[num]} {num1+num3[2]})(x {sign3[num]} {num2+num3[2]})</div>}
                    value={num3[2]}
                    answer={0} doSomething = {Add} Correct={CorrectA} Wrong={WrongA}/>}
               </div>
            </div>
            </div>
        </div>
    )
}