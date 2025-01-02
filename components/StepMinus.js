import { useEffect, useState } from "react"
import Step from "./step"
import HelpMinus from "./HelpMinus"
import ExtraMinus from "./ExtraMinus"

function StepMinus({close, num1 , num2}){
    const [extra, setExtra] = useState(false)
    const [step1, setStep1] = useState(true)
    const [step2, setStep2] = useState(false)
    const [number1, setNumber1] = useState([(num1 % 10),((num1-(num1%10))/10),num1])
    const [number2, setNumber2] = useState([(num2 % 10),((num2-(num2%10))/10),num2])
    const [done, setDone]= useState(num1%10 < num2%10)
    const [slice, setSlice] = useState(false)
    const [redNum,setRedNum] = useState('158px')
    const [red, setRed] = useState('150px')
    const [ten, setTen] = useState(0)
    const [sign2, setSign2] = useState()
    const [number3, setNumber3] = useState()
    const [arr, setArr] = useState([0,Math.floor(Math.random()*3)+1,-1,Math.floor(Math.random()*3)-4])
    const [count, setCount] = useState(0)
   
   function mix(){
    setArr([0,Math.floor(Math.random()*3)+1,-1,Math.floor(Math.random()*3)-4])
    setArr(prevChange => prevChange.sort((a,b)=>Math.random()-0.5)) 
   }

   function Nothing(){}

   function Extra(){
    setExtra(false)
    }

   function click(){
        setTen(10)
       setStep2(true)
       setSlice(true)
       setDone(false)
   }
   
   function Count(){
       setArr(prevChange => prevChange.sort((a,b)=>Math.random()-0.5)) 
       setCount(count+1)
       
       if(count === 2){
           close()
       }
       
       if(slice === true){
        setTen(-1)
       }

       if(step1 === true){
           setStep1(false)
           setStep2(true)
           setNumber3(((num1 % 10 + ten) - (num2 % 10) ))
           setRed("160px")
           setRedNum("168px")
           
       }else{
           setStep1(true)
           setSlice(false)
           setNumber3(num1 - num2)
           setSign2()
           setTen(0)
       }
   }
   useEffect(() =>{
    mix()
   },[])
        return(
           <div className="Help" style={{zIndex:'20',border:'10px solid orange'}}>
                {extra && (number1[count] >= 10 || number2[count] >= 10) && <ExtraMinus close={Extra} num1 ={number1[count]+ten} num2 = {number2[count]}/>}
               {extra && number2[count] < 10 && number1[count] < 10 && <HelpMinus close={Extra} num1 ={number1[count]+ten} num2 = {number2[count]} />}
               <div className='cancel' style={{width:"100%"}} ><button className='cancel-btn' onClick = {close}>X</button></div>
               <span className='center'>{num1%10 + ten< num2%10 && !step2 && <button className='carry absolute Red center' style={{fontSize:"30px",left:'145px',bottom:"450px"}} onClick={click}>Click</button>}</span>
               <span className='center'>{num1%10 + ten< num2%10 && !step2 && <button className='carry  absolute Red' style={{left:'168px'}} onClick={click}>{'-'}</button>}</span>
               <span className='center'>{slice && <button className=' back2Step2 absolute Red' style={{left: redNum}} onClick={click}>{Math.floor(num1/10)-1}</button>}</span>
               <div className='double top-number center'>
                    {slice && <span className="absolute Red bold" style={{left: red}}>/</span>}                
                   {step2 ? <span className='Green'>{(num1-(num1%10))/10}</span>:<span>{(num1-(num1%10))/10}</span>} 
                   {step1 ? <span className='Green'>{num1%10+ten}</span>:<span>{num1%10}</span>}
               </div>
               <div className=' double center'>
                       <span className="bottom-number fonts">-<span className="hide">.</span></span>{step2 ? <span className='Green bottom-number'>{(num2-(num2%10))/10}</span>:<span className="bottom-number">{(num2-(num2%10))/10}</span>} 
                       {step1 ? <span className='Green bottom-number'>{num2%10}</span>:<span className="bottom-number">{num2%10}</span>}
               </div>
               <div className='double center '><div className="lower-number">{number3}</div></div>                  
               {!done && <div className=" double center Green absolute StepQuestion">{ten +number1[count]} - {number2[count]} = </div>}  
               {!done &&<div className='center wrap absolute StepAnswer'>
                   {count < 2 && <button className="choice" style={{backgroundColor:'yellow',color:'black'}} onClick={()=>{setExtra(true);console.log(extra)}} >help</button>}
                   <Step value = { ten + number1[count] - number2[count]+arr[1]}  answer={ ten + number1[count] - number2[count]} Count ={Count} done = {done} mistake ={Nothing}/>
                   {count< 2 &&<button className="choice red" onClick={close} >Close</button>}
                   <Step value = { ten + number1[count] - number2[count]+arr[2]}  answer={ ten + number1[count] - number2[count]} Count ={Count} done = {done} mistake ={Nothing}/>
                   <Step value = { ten + number1[count] - number2[count]+arr[0]}  answer={ ten + number1[count] - number2[count]} Count ={Count} done = {done} mistake ={Nothing}/>
                   <Step value = { ten + number1[count] - number2[count]+arr[3]}  answer={ ten + number1[count] - number2[count]} Count ={Count} done = {done} mistake ={Nothing}/>
               </div>}
           </div>
        )}
export default StepMinus