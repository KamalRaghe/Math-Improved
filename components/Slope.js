import { useEffect, useState } from "react"
import Step from "./step"
import HelpAdd from "./HelpAdd"
import ExtraAdd from "./ExtraAdd"

function Slope({close, num1 , num2 , num4 , num5}){
    const [extra, setExtra] = useState(false)
    const [step1, setStep1] = useState(true)
    const [step2, setStep2] = useState(false)
    const [x1, setX1] = useState(false)
    const [y1, setY1] = useState(false)
    const [x2, setX2] = useState(false)
    const [y2, setY2] = useState(false)
    const [number1, setNumber1] = useState([(num1 % 10),((num1-(num1%10))/10),num1])
    const [number2, setNumber2] = useState([(num2 % 10),((num2-(num2%10))/10),num2])
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

   function click(){
       toOne(1)
       setNum4(1)
       setNum5(1)
       setSign2('+')
       setStep2(true)
       setDone(false)
   }
   
   function Count(){
       setArr(prevChange => prevChange.sort((a,b)=>Math.random()-0.5)) 
       setCount(count+1)
       
       if(count === 2){
           close()
       }
   
       if((num1 % 10) + (num2 % 10) >= 10 && step1 === true){
           theOne(true)
           setDone(true)    
       }
   
       if(step1 === true && carry === false){
           setStep2(true)
       }     
       if(step1 === true){
           setStep1(false)
           setNumber3(((num1 % 10) + (num2 % 10) )% 10)
       }else{
           setStep1(true)
           setNumber3(num1 + num2)
           setNum5()
           setSign2()
           setNum4(0)
           toOne()
       }
   }
   useEffect(() =>{
    mix()
   },[])
        return(
           <div className="Help" style={{zIndex:'20', border:'10px solid orange'}}>
                <div className='cancel' style={{width:"100%"}} ><button className='cancel-btn' onClick = {close}>X</button></div>
                <div className="single center" ><button className="carry" >x1<span className="hide" >0.</span>y1<span className="hide" >000000</span> <div style={{position:"relative",left:"0px"}} >x2 <span className="hide" >0</span> y2</div></div>
               <div className="double center" >({num1},{num2})<span className="hide" >0</span>({num4},{num5})</div>
               <br></br>
               <div className="double center" style={{padding:"5px"}} >y2 - y1</div>
               <div className="center" ><div className="double center" style={{borderTop:"2px solid black",width:"128px"}} >x2 - x1</div></div>
               {!done &&<div className='center wrap absolute StepAnswer'>
                   <Step value = { num4 + number1[count] + number2[count]+arr[1]}  answer={ num4 + number1[count] + number2[count]} Count ={Count} done = {done} mistake={Nothing}/>
                   <Step value = { num4 + number1[count] + number2[count]+arr[2]}  answer={ num4 + number1[count] + number2[count]} Count ={Count} done = {done} mistake={Nothing}/>
                   <Step value = { num4 + number1[count] + number2[count]+arr[0]}  answer={ num4 + number1[count] + number2[count]} Count ={Count} done = {done} mistake={Nothing}/>
                   {<button className="choice" style={{backgroundColor:'yellow',color:'black'}} onClick={()=>{setExtra(true);console.log(extra)}} >help</button>}
                   <Step value = { num4 + number1[count] + number2[count]+arr[3]}  answer={ num4 + number1[count] + number2[count]} Count ={Count} done = {done} mistake={Nothing}/>
                   {<button className="choice red" onClick={close} >Close</button>}                   
               </div>}
           </div>
        )}
export default Slope