import { useEffect, useState } from "react"
import Step from "./step"

function StepAdd({close, num1 , num2, mistake}){
    const [step1, setStep1] = useState(true)
    const [step2, setStep2] = useState(false)
    const [number1, setNumber1] = useState([(num1 % 10),((num1-(num1%10))/10),num1])
    const [number2, setNumber2] = useState([(num2 % 10),((num2-(num2%10))/10),num2])
    const [done, setDone]= useState(num1%10 < num2%10)
    const [slice, setSlice] = useState(false)
    const [redNum,setRedNum] = useState('170px')
    const [red, setRed] = useState('165px')
    const [ten, setTen] = useState(0)
    const [one, setOne] = useState(false)
    const [sign2, setSign2] = useState()
    const [number3, setNumber3] = useState()
    const [arr, setArr] = useState([0,Math.floor(Math.random()*3)+1,-1,Math.floor(Math.random()*3)-4])
    const [count, setCount] = useState(0)
   
   function mix(){
    setArr([0,Math.floor(Math.random()*3)+1,-1,Math.floor(Math.random()*3)-4])
    setArr(prevChange => prevChange.sort((a,b)=>Math.random()-0.5)) 
   }

   function click(){
        setTen(10)
       setSlice(true)
       setDone(false)
       setOne(true)
   }
   
   function Count(){
       setArr(prevChange => prevChange.sort((a,b)=>Math.random()-0.5)) 
       setCount(count+1)
       
       if(count === 2){
           close()
       }
       
       if(slice === true){
        setTen(-1)
        setOne(false)
       }

       if(step1 === true){
           setStep1(false)
           setStep2(true)
           setNumber3(((num1 % 10 + ten) - (num2 % 10) ))
           setRed("175px")
           setRedNum("185px")
           
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
           <div className="Help">
               <div className='cancel'><button className='cancel-btn' onClick = {close}>X</button></div>
               <span>1</span>
               <span className='center'>{num1%10 + ten< num2%10 && !step2 && <button className='carry  absolute Red' style={{left:'185px'}} onClick={click}>{'-'}</button>}</span>
               <span className='center'>{slice && <button className=' back2Step2 absolute Red' style={{left: redNum}} onClick={click}>{Math.floor(num1/10)-1}</button>}</span>
               <div className='double top-number center'>
                    {slice && <span className="absolute Red bold" style={{left: red}}>/</span>}                
                   <span>{(num1-(num1%10))/10}</span>
                   <span>{one && <span>1</span>}{num1%10}</span>
               </div>
               <div className=' double center'>
                       <span className="bottom-number">-</span><span className="hideline">.</span><span className="bottom-number">{(num2-(num2%10))/10}</span>
                       <span className="bottom-number">{num2%10}</span>
               </div>
               <div className='double center '><div className="lower-number">{number3}</div></div>                  
               <div className=" double center Green absolute StepQuestion">{step1 && !step2 && 'Step 1'} { !step1 && step2 && 'Step 2'}  </div>  
               <div className='center wrap absolute StepAnswer'>
                   <Step disable = {done} value = { ten + number1[count] - number2[count]+arr[1]}  answer={ ten + number1[count] - number2[count]} Count ={Count} done = {done} mistake= {mistake}/>
                   <Step disable = {done} value = { ten + number1[count] - number2[count]+arr[2]}  answer={ ten + number1[count] - number2[count]} Count ={Count} done = {done} mistake= {mistake}/>
                   <Step disable = {done} value = { ten + number1[count] - number2[count]+arr[0]}  answer={ ten + number1[count] - number2[count]} Count ={Count} done = {done} mistake= {mistake}/>
                   <Step disable = {done} value = { ten + number1[count] - number2[count]+arr[3]}  answer={ ten + number1[count] - number2[count]} Count ={Count} done = {done} mistake= {mistake}/>
               </div>
           </div>
        )}
export default StepAdd