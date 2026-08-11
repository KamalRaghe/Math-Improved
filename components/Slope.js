import { useEffect, useState } from "react"
import Step from "./step"
import StepF from "./fractionStep"
import HelpMinus from "./HelpMinus"
import { set } from "firebase/database"
import { im } from "mathjs"
import Question1 from "./SimplifyHelp"
import Improper from "./HelpImproper"

function Slope({close, num1 , num2 , num4 , num5}){
    const [extra, setExtra] = useState(false)
    const [step1, setStep1] = useState(false)
    const [step2, setStep2] = useState(false)
    const [x1, setX1] = useState(false)
    const [y1, setY1] = useState(false)
    const [x2, setX2] = useState(false)
    const [y2, setY2] = useState(false)
    const [q1, setQ1] = useState(false)
    const [q2, setQ2] = useState(false)
    const [an, setAn] = useState()
    const [done, setDone]= useState(false)
    const [help, setHelp] = useState(false)
  
    const [arr, setArr] = useState([0,Math.floor(Math.random()*3)+1,-1,Math.floor(Math.random()*3)-4])
    const [count, setCount] = useState(0)
   
   function mix(){
    setArr([0,Math.floor(Math.random()*3)+1,-1,Math.floor(Math.random()*3)-4])
    setArr(prevChange => prevChange.sort((a,b)=>Math.random()-0.5)) 
   }

   function Extra(){
        setExtra(false)
   }

   function Nothing(){}

   
   function Count(){
       setArr(prevChange => prevChange.sort((a,b)=>Math.random()-0.5)) 
       setCount(count+1)
       
       if(extra){
           close()
       }

       if(step1 && !step2 ){
        setStep2(true)
        setQ1(num4)
        setQ2(num1)
        setAn(num4-num1)
       }if(step2){
         setExtra(true)
       }
      
   }
   useEffect(() =>{
    mix()
   },[])

   useEffect(() => {
    if(x1 && x2 && y1 && y2){
        setStep1(true)
        setQ2(num2)
        setQ1(num5)
        setAn(num5-num2)
      }
   },[x1,x2,y1,y2])
        return(
           <div className="Help" style={{zIndex:'20'}}>
                {extra && help && num5 -num2 < num4 - num1 && <Question1 num1={num5-num2} num2={num4-num1} close={()=>setHelp(false)} />}
                {extra && help && num5-num2 > num4-num1 && <Improper whole={Math.floor((num5-num2)/(num4-num1))} num1={(num5-num2)%(num4-num1)} num2={num4-num1} close={()=>{setHelp(false)}}></Improper>}
                { help && !extra && <HelpMinus num1={q1} num2={q2} close={()=>{setHelp(false)}}></HelpMinus>}
                <div className='cancel' style={{width:"100%"}} ><button className='cancel-btn' onClick = {close}>X</button></div>
                <div style={{fontSize:"32px",padding:"10px"}} className="center" >
                (x1,y1)
                <span className="hide" >0</span>
                (x2,y2)</div>
               <div className="double center" >
                ({!x1 ? <button className="carry Green" onClick={()=>{setX1(true),Count()}} >{num1}</button>:num1}
                ,{!y1 ? <button className="carry Green" onClick={()=>{setY1(true),Count()}} >{num2}</button>:num2})
                <span className="hide" >0</span>
                ({!x2 ? <button className="carry Green" onClick={()=>{setX2(true),Count()}} >{num4}</button>:num4},
                {!y2 ? <button className="carry Green" onClick={()=>{setY2(true),Count()}} >{num5}</button>:num5})</div>
               <br></br>
                {!step2 && <div className="double center" style={{padding:"5px"}}> 
                    {!y2 ? <span>y2</span> : num5} - {!y1 ? <span>y1</span> : num2}
                </div>}{step2 && <div className="center Green double">{num5-num2}</div>}
                {!extra && <div className="center" >
                     <div className="double center" style={{borderTop:"2px solid black",width:"128px"}} >{!x2 ? <span>x2</span> : num4} - {!x1 ? <span>x1</span> : num1}</div>
               </div>}{extra && <div className="center Green double" ><div className="center" style={{borderTop:"2px solid green" ,width:"50px"}} >{num4-num1}</div></div>}
               
               {step1 && !extra && <div className="center double" style={{padding:"10px"}} > {q1} - {q2} = </div> }
               {!done && step1 && !extra && <div className='center wrap absolute StepAnswer'>
                   <Step value = {an+arr[0]}  answer={an} Count ={Count} done = {done} mistake={Nothing}/>
                   <Step value = {an+arr[1]}  answer={an} Count ={Count} done = {done} mistake={Nothing}/>
                   <Step value = {an+arr[2]}  answer={an} Count ={Count} done = {done} mistake={Nothing}/>
                   {<button className="choice" style={{backgroundColor:'yellow',color:'black'}} onClick={()=>{setHelp(true);console.log(extra)}} >help</button>}
                   <Step value = {an+arr[3]}  answer={an} Count ={Count} done = {done} mistake={Nothing}/>
                   {<button className="choice red" onClick={close} >Close</button>}                   
               </div>}
               {extra && <div className='center wrap absolute StepAnswer' style={{width:'100%',top:"340px"}} >
                   <StepF whole={Math.floor((num5-num2)/(num4-num1))} value1 = {((num5-num2)%(num4-num1))+arr[0]}  answer1={(num5-num2)%(num4-num1)} value2 = {(num4-num1)}  answer2={num4-num1}  Count ={Count} mistake={Nothing}/>
                   <StepF whole={Math.floor((num5-num2)/(num4-num1))} value1 = {((num5-num2)%(num4-num1))+arr[2]}  answer1={(num5-num2)%(num4-num1)} value2 = {(num4-num1)}  answer2={num4-num1}  Count ={Count} mistake={Nothing}/>
                   <StepF whole={Math.floor((num5-num2)/(num4-num1))} value1 = {((num5-num2)%(num4-num1))+arr[3]}  answer1={(num5-num2)%(num4-num1)} value2 = {(num4-num1)}  answer2={num4-num1}  Count ={Count} mistake={Nothing}/>
                   <StepF whole={Math.floor((num5-num2)/(num4-num1))} value1 = {((num5-num2)%(num4-num1))+arr[1]}  answer1={(num5-num2)%(num4-num1)} value2 = {(num4-num1)}  answer2={num4-num1}  Count ={Count} mistake={Nothing}/>
                   { num5-num2 != num4-num1 && <button className="choice" style={{backgroundColor:'yellow',color:'black'}} onClick={()=>{setHelp(true)}} >help</button>}
               </div>}
           </div>
        )}
export default Slope