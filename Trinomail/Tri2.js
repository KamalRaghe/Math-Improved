import Step from "@/components/step"
import { useEffect, useState } from "react"
import HelpDiv from "@/components/PerfectDivision"
import HelpAdd from "@/components/HelpAdd"
import HelpTimes from "@/components/HelpTimes"
import StepTimes from "@/components/stepTimes"
import HelpMinus from "@/components/HelpMinus"
import StepAdd from "@/components/StepAdd"
import StepMinus from "@/components/StepMinus"

export default function Tri2({num1,num2,close}){  
    const [done,setDone] = useState(true)
    const [extra, setExtra] = useState(false)
    const [arr, setArr] = useState([0,Math.floor(Math.random()*1+2)+1,1,Math.floor(Math.random()*3)-4])
    const [answer, setAnswers] = useState()
    const[Q1, setQ1] = useState(num1) 
    const[Q2, setQ2] = useState(num2)
    const [sign, setSign] = useState('*')
    const [count, setCount] = useState([])
    const [count1, setCount1] = useState([])
    const [before1,setBefore1] = useState(true)
    const [before2,setBefore2] = useState(false)
    const [step1, setStep1] = useState(false) 
    const [step2, setStep2] = useState(false) 
    const [step3, setStep3] = useState(false) 
    const [step4, setStep4] = useState(false)
    const [step5, setStep5] = useState(false)
    const [step6, setStep6] = useState(false)  

    function Extra(){
        setExtra(false)
   }

    function Count(){
        setArr(prevChange => prevChange.sort((a,b)=>Math.random()-0.5))
        if(step1 === true && answer !== num1-num2){
            setStep1(false)
            setBefore2(true)
        }
        if(step1 === true && answer === num1-num2){
            setStep1(false)
            setStep2(true)
            setDone(true)
        }if(step2 === true){
            setStep3(true)
            setStep2(false)
        }
    }
    useEffect(()=>{
        setArr(prevChange => prevChange.sort((a,b)=>Math.random()-0.5))
        for(let i = 1; i <= num1*num2 ; i++){
            if(num1*num2 % i === 0){
              setCount(prev => [...prev, i ])
            }
        } 
     },[])

     useEffect(()=>{
        setExtra(false)
     },[Q2])

     useEffect(() => {

        if(count[Math.floor(count.length/2)] === 1){
          for(let i = 0; i < count.length/4; i++){
            setCount1(prev => [...prev, count[i]])
        }
        }else{
          for(let i = 0; i < (count.length/2); i++){
            setCount1(prev => [...prev, count[i] ])
        }
        }
    
      },[count])
      
    function Nothing(){}
    return (
        <div className="Help">
            {extra && sign === '+' && Q1 < 10 && Q2 < 10 && <HelpAdd close={Extra} num1 ={Q1} num2 = {Q2}/>}
            {extra && sign === '+' && (Q1 >= 10 || Q2 >= 10) && <StepAdd close={Extra} num1 ={Q1} num2 = {Q2}/>}
            {extra && !step1 && sign === 'x' && Q1 < 10 && Q2 < 10 && <HelpTimes close={Extra} num1 ={Q1} num2 = {Q2}/>}
            {extra && sign === 'x' && (Q1 >= 10 || Q2 >= 10) && <StepTimes close={Extra} num1 ={Q1} num2 = {Q2}/>}
            {extra && sign === '-' && Q1 < 10 && Q2 < 10 && <HelpMinus close={Extra} num1 ={Q1} num2 = {Q2}/>}
            {extra && sign === '-' && (Q1 >= 10 || Q2 >= 10) && <StepMinus close={Extra} num1 ={Q1} num2 = {Q2}/>}
            {extra && sign === '÷' && <HelpDiv close={Extra} num1 ={Q1} num2 = {Q2}/>}
            <div className='cancel'><button className='cancel-btn' onClick = {close}>X</button></div>
                <div className="double center" >𝑥<span style={{fontSize:'20px',position:'relative',padding:"2px", top:"-13px",paddingLeft:"2px",paddingRight:"10px"}}>2</span>
                    + {num1-num2}x {before1 && <button className="Green carry" onClick={()=>{setBefore1(false);setBefore2(true)}} style={{padding:'5px'}} >-</button>}{!before1 && '-'} {num1*num2}
                </div>
                {before2 && <div className="center double" > <div className="border" style={{width:'50px', height:"50px",margin:"5px"}} ></div> x <div className="border" style={{width:'50px', height:"50px",margin:"5px"}} ></div> = {num1*num2}</div>}                       
                {before2 && <div className="center double" > <div className="border" style={{width:'50px', height:"50px",margin:"5px"}} ></div> - <div className="border" style={{width:'50px', height:"50px",margin:"5px"}} ></div> = {num1-num2}</div>} 
                {step2 && <div className="center double" style={{padding:'60px'}} >(𝑥  <div className="Red" style={{padding:'10px'}} >?</div> {Q2})(𝑥  <div className="Red" style={{padding:'10px'}}>?</div> {Q1})</div>}
                {step3 && <div className="center double" style={{padding:'60px'}} ><div className="Green" >(𝑥 + {Q2})</div>(𝑥  <div className="Red" style={{padding:'10px'}}>?</div> {Q1})</div>}
                {step4 && <div className="center double Green" style={{padding:'60px'}} >(𝑥 + {Q2})(𝑥 - {Q1})</div>}
                 
                    
            {before2 && <div className=" wrap double Green center" style={{padding:'60px'}} >{count1.map( num =>{
            return <div className="carry" style={{padding:'10px'}} onClick={()=>{setDone(false);setSign('-'); setAnswers((num1*num2/num)-num); setBefore2(false);setQ2(num1*num2/num);setQ1(num);setStep1(true)}}>{num}:{num1*num2/num}</div>
          })}</div>}

            {!done && !before2 &&<div className=" double center Green absolute StepQuestion">{Q2} {sign} {Q1} = {extra && answer+'𝑥'}</div>}
               {!done && !before2  &&<div className='center wrap absolute StepAnswer'>
                   <Step value = {(answer+arr[0])}  answer={answer} Count ={Count} done = {done} mistake={Nothing}/>
                   <Step value = {(answer+arr[2])}  answer={answer} Count ={Count} done = {done} mistake={Nothing}/>
                   <Step value = {(answer+arr[3])}  answer={answer} Count ={Count} done = {done} mistake={Nothing}/>
                   <button className="choice" style={{backgroundColor:'yellow',color:'black'}} onClick={()=>{setExtra(true);console.log(extra)}} >help</button>
                   <Step value = {(answer+arr[1])}  answer={answer} Count ={Count} done = {done} mistake={Nothing}/>
                   <button className="choice red" onClick={close} >Close</button>
               </div>}
               { done && !before1 && !before2 && !step4 &&<div className='center wrap absolute StepAnswer' style={{width:"100%"}}>

                   { !step5 ? <button className="choice" onClick={()=>{setStep2(false);setStep3(true);setStep5( step2 ? false:true);setTimeout(() => {
                        setStep5(false)
                   }, 500)}} >+</button>: <button className="choice red" >+</button>} 
                   {!step6 ? <button className="choice" onClick={()=>{;setStep3(false);setStep4(step3? true:false);setStep6( step3 ? false:true);setTimeout(() => {
                        setStep6(false)
                   }, 500)}} >-</button>
                   : <button className="choice red" >-</button>}
                  
               </div>}
        </div>
    )
}