import { useEffect, useState } from "react"
import Step from "./step"
import HelpAdd from "./HelpAdd"
import ExtraAdd from "./ExtraAdd"

function StepAdd({close, num1 , num2}){
    const [extra, setExtra] = useState(false)
    const [step1, setStep1] = useState(true)
    const [step2, setStep2] = useState(false)
    const [number1, setNumber1] = useState([(num1 % 10),((num1-(num1%10))/10),num1])
    const [number2, setNumber2] = useState([(num2 % 10),((num2-(num2%10))/10),num2])
    const [done, setDone]= useState(false)
    const [carry, theOne] = useState(false)
    const [sign,toOne] = useState('+')
    const [num4, setNum4] = useState(0)
    const [num5, setNum5] = useState()
    const [sign2, setSign2] = useState()
    const [number3, setNumber3] = useState()
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
               {extra && (number1[count] >= 10 || number2[count] >= 10) && <ExtraAdd close={Extra} num1 ={number1[count]+num5} num2 = {number2[count]}/>}
               {extra && number2[count] < 10 && number1[count] < 10 && <HelpAdd close={Extra} num1 ={number1[count]%10} num2 = {number2[count]%10} num3={num4} />}
               <div className='cancel absolute' style={{width:"100%"}} ><button className='cancel-btn' onClick = {close}>X</button></div>
               <div className='cancel'><button className='cancel-btn hide'>X</button></div>
               <span className='center'>{carry && done && <button className='carry  absolute Green' style={{left:'162px'}} onClick={click}>{sign}</button>}</span>
               <span className='center'>{carry && !done && <button className=' back2Step2 absolute Green' style={{left:'165px'}} onClick={click}>{sign}</button>}</span>
               <div className='double top-number center'>
                   {step2 ? <span className='Green'>{(num1-(num1%10))/10}</span>:<span>{(num1-(num1%10))/10}</span>} 
                   {step1 ? <span className='Green'>{num1%10}</span>:<span>{num1%10}</span>}
               </div>
               <div className=' double center'>
                       <span className="bottom-number">+</span>{step2 ? <span className='Green bottom-number'>{(num2-(num2%10))/10}</span>:<span className="bottom-number">{(num2-(num2%10))/10}</span>} 
                       {step1 ? <span className='Green bottom-number'>{num2%10}</span>:<span className="bottom-number">{num2%10}</span>}
               </div>

               <div className='double center '><div className="lower-number">{number3}</div></div>
                                
               {!done && <div className=" double center Green absolute StepQuestion"> {num5} {sign2} {number1[count]} + {number2[count]} = </div>}  
              
              
              
               {!done &&<div className='center wrap absolute StepAnswer'>
                   {count < 2 && <button className="choice" style={{backgroundColor:'yellow',color:'black'}} onClick={()=>{setExtra(true);console.log(extra)}} >help</button>}
                   <Step value = { num4 + number1[count] + number2[count]+arr[1]}  answer={ num4 + number1[count] + number2[count]} Count ={Count} done = {done} mistake={Nothing}/>
                   {count< 2 &&<button className="choice red" onClick={close} >Close</button>} 
                   <Step value = { num4 + number1[count] + number2[count]+arr[2]}  answer={ num4 + number1[count] + number2[count]} Count ={Count} done = {done} mistake={Nothing}/>
                   <Step value = { num4 + number1[count] + number2[count]+arr[0]}  answer={ num4 + number1[count] + number2[count]} Count ={Count} done = {done} mistake={Nothing}/>
                   <Step value = { num4 + number1[count] + number2[count]+arr[3]}  answer={ num4 + number1[count] + number2[count]} Count ={Count} done = {done} mistake={Nothing}/>                  
               </div>}
           </div>
        )}
export default StepAdd