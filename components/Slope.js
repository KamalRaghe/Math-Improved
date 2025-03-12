import { useEffect, useState } from "react"
import Step from "./step"
import HelpAdd from "./HelpAdd"
import ExtraAdd from "./ExtraAdd"
import { set } from "firebase/database"

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
    const [carry, theOne] = useState(false)
  
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
       
       if(count === 909){
           close()
       }

       setStep2(true)
       setQ1(num4)
       setQ2(num1)
       setAn(num4-num1)
      
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
           <div className="Help" style={{zIndex:'20', border:'10px solid orange'}}>
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
                <div className="double center" style={{padding:"5px"}}> 
                    {!y2 ? <span>y2</span> : num5} - {!y1 ? <span>y1</span> : num2}
                </div>
                <div className="center" >
                     <div className="double center" style={{borderTop:"2px solid black",width:"128px"}} >{!x2 ? <span>x2</span> : num4} - {!x1 ? <span>x1</span> : num1}
                </div>
               
               </div>
               {step1 && <div className="center double"> {q1} - {q2} = </div> }
               {!done && step1 &&<div className='center wrap absolute StepAnswer'>
                   <Step value = {an}  answer={an} Count ={Count} done = {done} mistake={Nothing}/>
                   <Step value = {an}  answer={an} Count ={Count} done = {done} mistake={Nothing}/>
                   <Step value = {an}  answer={an} Count ={Count} done = {done} mistake={Nothing}/>
                   {<button className="choice" style={{backgroundColor:'yellow',color:'black'}} onClick={()=>{setExtra(true);console.log(extra)}} >help</button>}
                   <Step value = {an}  answer={an} Count ={Count} done = {done} mistake={Nothing}/>
                   {<button className="choice red" onClick={close} >Close</button>}                   
               </div>}
           </div>
        )}
export default Slope