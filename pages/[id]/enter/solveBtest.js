import { useEffect, useState } from "react";
import Choice from "@/components/FractionChoice";
import { useRouter } from "next/router";
import Heart from "@/components/heart";
import Heart1 from "@/components/heart1";
import Heart2 from "@/components/heart2";
import Heart3 from "@/components/heart3";
import Timeout from "@/components/timeout";
import Pass from "@/components/pass";
import Mistake from "@/components/mistake";



export default function DoubleAdd(){
    const [help, setHelp] = useState(false)
    const [loaded, setLoaded] = useState(false)
    const [correct, setCorrect] = useState(false)
    const[ wrong, setWrong] = useState(false)
    const [num1, setNum1] = useState(Math.ceil(Math.random()*9));
    const [num2, setNum2] = useState(Math.ceil(Math.random()*9));
    const [slope, setSlope] = useState(Math.ceil(Math.random()*9));
    const [num3, setNum3] = useState([0,num1+num1,num1+num1+num1,-1*num1,num1])
    const router = useRouter()
    const {username} = router.query 
    const {id} = router.query 

    function mix(){
        setNum3([0,num1+num1,num1+num1+num1,-1*num1,num1])
    }
    const [again, setAgain] = useState(false)
    const [mistake, setMistake] = useState(0)
    const [count, setCount] = useState(0)
    const [time, setTime] = useState( 600000 + Date.now())
    const [date, setDate] = useState(Date.now()) 
    const [num, setNum] = useState(1)

    
    function open(){
        setHelp(true)
      }
      function close(){
        setHelp(false)
      }

    function Again(){
        setAgain(true)
        setCount(0)
        setMistake(0)
        setTime(600000 + Date.now())
        setLoaded(true)
    }

    function mix(){
        setNum3([0,1,-1,2,-2])
    }

    function update(){
        setDate(requestAnimationFrame(update))
      }

    function CorrectA(){ 
        setCorrect(true)
        setTimeout(() => {
            setCorrect(false) 
        }, 1200);
        setCount(count+1)
      }
  
      function WrongA(){ 
        setMistake( mistake + 1)
        setWrong(true)
        setTimeout(() => {
            setWrong(false) 
        }, 1200);
      } 
      function Add(){
        setTimeout(() => {
            setNum1(Math.ceil(Math.random()*7+2))
            setNum6(Math.ceil(Math.random()*7+2))
            setNum9(Math.ceil(Math.random()*7+2))
            mix()
            setNum3(prevChange => prevChange.sort((a,b)=>Math.random()-0.5))
        }, 1200)
    }

    useEffect(()=>{
        setNum8(Math.ceil(Math.random()*(num6-1)))
    },[num6,num9])

    function cancel(){
        setDate(cancelAnimationFrame(date))
      }

    useEffect(() =>{
        mix()
        setNum3(prevChange => prevChange.sort((a,b)=>Math.random()-0.5))
     },[num1])

    useEffect(() =>{
        setLoaded(true)
        update()
        setNum1(Math.ceil(Math.random()*7+2))
        setNum6(Math.ceil(Math.random()*7+2))
        mix()
        setNum3(prevChange => prevChange.sort((a,b)=>Math.random()-0.5))
    },[])

    useEffect(()=>{
        const ID = window.localStorage.getItem('ID')
        if(!(ID === id)){
            router.push("/")
        }
    },[])

    useEffect(()=>{
        if(num1 >= 5){
            setNum5(Math.ceil(Math.random()*3+1))
        }else{setNum5(Math.ceil(Math.random()*5+4))}
    },[num1,num8,num6])
    
    useEffect(() =>{
       mix()
       setNum3(prevChange => prevChange.sort((a,b)=>Math.random()-0.5))
       setNum4(Math.ceil(Math.random()*(num5-1)))
       setNum2(Math.ceil(Math.random()*(num1-1)))
       for(let i=1;i<15;i++){
        if(num1*i%num5===0){
            setNum7(i*num1)
            break
        }
    }
    },[num8,num5,num6])

    useEffect(() =>{
        setAgain(false)
    },[again])

    useEffect(() =>{
        if(mistake >= 3 || time - Date.now() < 0 || count >= 20){
            setLoaded(false)
            setTime(time)
            cancel()
        }
    })

    return(
        <div className="beige container column">
           <div className="double">Question left : {20 - count}</div>
           <div className="inTest">
            
                <div className="Red relative" > 
                    {mistake === 0 && <Heart/>}
                    {mistake === 1 && <Heart1/>}
                    {mistake === 2 && <Heart2/>}
                    {mistake === 3 && <Heart3/>}
                </div>
                {loaded && time - Date.now() > 0 && count < 20 && <div>{Math.floor(((time - Date.now())%(1000*60*60))/1000/60)}m {""}
                {Math.floor(((time - Date.now())%(1000*60))/1000)}s</div>}
            </div>

            <div className="box">
                <span className="hide">00000</span>
                {loaded && <div className=" double center"><span style={{padding:'3px'}} >{num6}</span>
                    <div className="column center" >
                        <div className="center" style={{borderBottom:'2px solid black', width:'45px'}} >
                            {num4}</div>
                    {num5}</div></div>}
                    <div className="double" style={{padding:'10px'}} >-</div>
                    {loaded && <div className=" double center"><span style={{padding:'3px'}} >{num8}</span>
                    <div className="column center" >
                        <div className="center" style={{borderBottom:'2px solid black', width:'45px'}} >
                            {num2}</div>
                    {num1}</div></div>}
                    <div className="double" style={{padding:'10px'}} >=</div>
                    {loaded && correct && (num2*(num7/num1)) > (num4*(num7/num5)) && num6-1 !== num8 && <span className="double" style={{padding:'3px',color:'green'}} >{num6-num8-1}</span>}
                    {loaded && wrong && (num2*(num7/num1)) > (num4*(num7/num5)) && num6-1 !== num8 && <span className="double" style={{padding:'3px',color:"red"}} >{num6-num8-1}</span>}
                    {loaded && correct && (num2*(num7/num1)) <= (num4*(num7/num5)) && num6 !== num8 && <span className="double" style={{padding:'3px',color:'green'}} >{num6-num8}</span>}
                    {loaded && wrong && (num2*(num7/num1)) <= (num4*(num7/num5)) && num6 !== num8 && <span className="double" style={{padding:'3px',color:"red"}} >{num6-num8}</span>}
           
                    {loaded && correct && (num2*(num7/num1)) !== (num4*(num7/num5)) && <div className=" Green column center" >
                        <div className=" double center" style={{borderBottom:'2px solid green', width:'45px'}} >
                            {(num2*(num7/num1)) > (num4*(num7/num5)) ? ((((num4*(num7/num5))+num7)-(num2*(num7/num1)))/num) :(((num4*(num7/num5))-(num2*(num7/num1)))/num)}
                            </div>
                    <div className="double" >{num7/num}</div></div>}

                    {loaded && wrong && num7 !== (num2*(num7/num1))+(num4*(num7/num5)) && <div className=" double Red column center" >
                        <div className="double center" style={{borderBottom:'2px solid red', width:'45px'}} >
                            {(num2*(num7/num1)) > (num4*(num7/num5)) ? ((((num4*(num7/num5))+num7)-(num2*(num7/num1)))/num) :(((num4*(num7/num5))-(num2*(num7/num1)))/num)}</div>
                    <div className="double" >{num7/num}</div></div>} 
            </div>
            
            <div className="box">
                
                
            </div>
            { time - Date.now() < 0 && <Timeout again ={Again}/>}
            {mistake === 3 && <Mistake again={Again}></Mistake>}
            {count === 20 && <Pass time ={600000 -(time-Date.now())}/>}
            <div className="box column">
                <div className="row ">
                    { loaded && <Choice whole={(num2*(num7/num1)) > (num4*(num7/num5))+num3[0] ? num6-num8-1 : num6-num8} value1 ={(num2*(num7/num1)) > (num4*(num7/num5)) ? (((num4*(num7/num5))+num7)-(num2*(num7/num1))+num3[0]) :((num4*(num7/num5))-(num2*(num7/num1))+num3[0])} answer1 ={(num2*(num7/num1)) > (num4*(num7/num5)) ? (((num4*(num7/num5))+num7)-(num2*(num7/num1))) :((num4*(num7/num5))-(num2*(num7/num1)))} value2={num7} answer2={num7} doSomething = {Add} Correct={CorrectA} Wrong={WrongA}/>}
                    { loaded && <Choice whole={(num2*(num7/num1)) > (num4*(num7/num5))+num3[1] ? num6-num8-1 : num6-num8} value1 ={(num2*(num7/num1)) > (num4*(num7/num5)) ? (((num4*(num7/num5))+num7)-(num2*(num7/num1))+num3[1]) :((num4*(num7/num5))-(num2*(num7/num1))+num3[1])} answer1 ={(num2*(num7/num1)) > (num4*(num7/num5)) ? (((num4*(num7/num5))+num7)-(num2*(num7/num1))) :((num4*(num7/num5))-(num2*(num7/num1)))} value2={num7} answer2={num7} doSomething = {Add} Correct={CorrectA} Wrong={WrongA}/>}
                    { loaded && <Choice whole={(num2*(num7/num1)) > (num4*(num7/num5))+num3[2] ? num6-num8-1 : num6-num8} value1 ={(num2*(num7/num1)) > (num4*(num7/num5)) ? (((num4*(num7/num5))+num7)-(num2*(num7/num1))+num3[2]) :((num4*(num7/num5))-(num2*(num7/num1))+num3[2])} answer1 ={(num2*(num7/num1)) > (num4*(num7/num5)) ? (((num4*(num7/num5))+num7)-(num2*(num7/num1))) :((num4*(num7/num5))-(num2*(num7/num1)))} value2={num7} answer2={num7} doSomething = {Add} Correct={CorrectA} Wrong={WrongA}/>}
               </div>
               <div className="row">
                    { loaded && <Choice whole={(num2*(num7/num1)) > (num4*(num7/num5))+num3[3] ? num6-num8-1 : num6-num8} value1 ={(num2*(num7/num1)) > (num4*(num7/num5)) ? (((num4*(num7/num5))+num7)-(num2*(num7/num1))+num3[3]) :((num4*(num7/num5))-(num2*(num7/num1))+num3[3])} answer1 ={(num2*(num7/num1)) > (num4*(num7/num5)) ? (((num4*(num7/num5))+num7)-(num2*(num7/num1))) :((num4*(num7/num5))-(num2*(num7/num1)))} value2={num7} answer2={num7} doSomething = {Add} Correct={CorrectA} Wrong={WrongA}/>}
                    { loaded && <Choice whole={(num2*(num7/num1)) > (num4*(num7/num5))+num3[4] ? num6-num8-1 : num6-num8} value1 ={(num2*(num7/num1)) > (num4*(num7/num5)) ? (((num4*(num7/num5))+num7)-(num2*(num7/num1))+num3[4]) :((num4*(num7/num5))-(num2*(num7/num1))+num3[4])} answer1 ={(num2*(num7/num1)) > (num4*(num7/num5)) ? (((num4*(num7/num5))+num7)-(num2*(num7/num1))) :((num4*(num7/num5))-(num2*(num7/num1)))} value2={num7} answer2={num7} doSomething = {Add} Correct={CorrectA} Wrong={WrongA}/>}
               </div>
            </div>
        </div>
    )
}