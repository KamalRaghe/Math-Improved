import Step from "@/components/step"
import { useEffect, useState } from "react"
import HelpDiv from "@/components/PerfectDivision"
import HelpAdd from "@/components/HelpAdd"
import HelpTimes from "@/components/HelpTimes"
import StepTimes from "@/components/stepTimes"
import HelpMinus from "@/components/HelpMinus"
import StepAdd from "@/components/StepAdd"
import StepMinus from "@/components/StepMinus"

export default function TwoVar({num1,num2,num4,num5,num6,num7,close}){  
    const [done,setDone] = useState(true)
    const [extra, setExtra] = useState(false)
    const [arr, setArr] = useState([0,Math.floor(Math.random()*1+2)+1,1,Math.floor(Math.random()*3)-4])
    const [answer, setAnswers] = useState(num1+num2)
    const[Q1, setQ1] = useState(num1) 
    const[Q2, setQ2] = useState(num2)
    const [sign, setSign] = useState('+')
    const [step, setStep] = useState(0) 

    function Extra(){
        setExtra(false)
   }

    function Count(){
        setArr(prevChange => prevChange.sort((a,b)=>Math.random()-0.5))
    }

    useEffect(()=>{
        setArr(prevChange => prevChange.sort((a,b)=>Math.random()-0.5))
     },[])

    function Nothing(){}
    return (
        <div className="Help">
             {extra && sign === '+' && Q1 < 10 && Q2 < 10 && <HelpAdd close={Extra} num1 ={Q1} num2 = {Q2}/>}
            {extra && sign === '+' && (Q1 >= 10 || Q2 >= 10) && <StepAdd close={Extra} num1 ={Q1} num2 = {Q2}/>}
            {extra && sign === 'x' && Q1 < 10 && Q2 < 10 && <HelpTimes close={Extra} num1 ={Q1} num2 = {Q2}/>}
            {extra && sign === 'x' && (Q1 >= 10 || Q2 >= 10) && <StepTimes close={Extra} num1 ={Q1} num2 = {Q2}/>}
            {extra && sign === '-' && Q1 < 10 && Q2 < 10 && <HelpMinus close={Extra} num1 ={Q1} num2 = {Q2}/>}
            {extra && sign === '-' && (Q1 >= 10 || Q2 >= 10) && <StepMinus close={Extra} num1 ={Q1} num2 = {Q2}/>}
            {extra && sign === '÷' && <HelpDiv close={Extra} num1 ={Q1} num2 = {Q2}/>}
            <div className='cancel'><button className='cancel-btn' onClick = {close}>X</button></div>
            <div className="column ">
                <div className="double"> {step != 0 ? num2 : <button onClick={()=>{setStep(1)}} className = 'carry Green' >{num2}</button>}𝑥 + {step != 0 ? num1 : <button onClick={()=>{setStep(1)}} className = 'carry Green' >{num1}</button>}y = {(num2*num6)+(num1*num7)}</div>
                <div className="double"> {step != 0 ? num4 : <button onClick={()=>{setStep(1)}} className = 'carry Green' >{num4}</button>}𝑥 + {step != 0 ? num5 : <button onClick={()=>{setStep(1)}} className = 'carry Green' >{num5}</button>}y = {(num4*num6)+(num5*num7)}</div>
            </div>

                {!done && <div className=" double center Green absolute StepQuestion">{Q1} {sign} {Q2} = </div>}
               {!done && <div className='center wrap absolute StepAnswer'>
                   <Step value = {step4 ? "y"+"="+ (answer+arr[0]) :answer+arr[0]}  answer={ step4 ? "y"+"="+answer :answer} Count ={Count} done = {done} mistake={Nothing}/>
                   <Step value = {step4 ? 'y'+'='+ (answer+arr[2]) : answer+arr[2]}  answer={ step4 ? "y"+"="+answer :answer} Count ={Count} done = {done} mistake={Nothing}/>
                   <Step value = {step4 ? 'y'+'='+ (answer+arr[3]) : answer+arr[3]}  answer={ step4 ? "y"+"="+answer :answer} Count ={Count} done = {done} mistake={Nothing}/>
                   <button className="choice" style={{backgroundColor:'yellow',color:'black'}} onClick={()=>{setExtra(true);console.log(extra)}} >help</button>
                   <Step value = {step4 ? 'y'+'='+ (answer+arr[1]) : answer+arr[1]}  answer={ step4 ? "y"+"="+answer :answer} Count ={Count} done = {done} mistake={Nothing}/>
                   <button className="choice red" onClick={close} >Close</button>
               </div>}
        </div>
    )
}