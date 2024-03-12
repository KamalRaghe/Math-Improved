import Step from "@/components/step"
import { useEffect, useState } from "react"
import HelpAdd from "@/components/HelpAdd"
import HelpTimes from "@/components/HelpTimes"
import StepTimes from "@/components/stepTimes"
import HelpMinus from "@/components/HelpMinus"
import StepAdd from "@/components/StepAdd"
import StepMinus from "@/components/StepMinus"

export default function Question6({num1,num2,num4,num5,num6,close}){  
    const [done,setDone] = useState(false)
    const [extra, setExtra] = useState(false)
    const [arr, setArr] = useState([0,Math.floor(Math.random()*1+2)+1,1,Math.floor(Math.random()*3)-4])
    const [answer, setAnswers] = useState(num1+num2)
    const[Q1, setQ1] = useState(num1) 
    const[Q2, setQ2] = useState(num2)
    const [sign, setSign] = useState('+')
    const [step1, setStep1] = useState(true) 
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
        if(step1 === true){
            setStep1(false)
            setStep2(true)
            setQ1(num5)
            setQ2(num5)
            setSign('x')
            setAnswers(num5*num5)
        }if(step2 === true){
            setStep2(false)
            setStep3(true)
            setQ2(num4)
            setQ1(num6)
            setSign("x")
            setAnswers(num4*num6)
        }if(step3=== true){
            setStep3(false)
            setStep4(true)
            setQ1((num1+num2))
            setQ2(num6*num4)
            setSign("+")
            setAnswers((num1+num2)+(num4*num6))
        }if(step4 === true){
            setStep4(false)
            setStep5(true)
            setQ1((num1+num2)+(num4*num6))
            setQ2(num5*num5)
            setSign("+")
            setAnswers((num1+num2)+(num4*num6)+(num5*num5))
        }if(step5 === true){
            setStep5(false)
            setStep6(true)
        }if(step6 === true){
            close()
        }
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
            <div className='cancel'><button className='cancel-btn' onClick = {close}>X</button></div>
            <div className="double center">({num1} + {num2}) + {num6} x {num4} + {num5}<span style={{fontSize:'20px',position:'relative', top:"-19px"}}>2</span>  = </div>
            {!step1 && <div className="double center"> {num1+num2} + {num6} x {num4} + {num5}<span style={{fontSize:'20px',position:'relative', top:"-19px"}}>2</span>  = </div>}
            {!step1 && !step2 &&  <div className="double center">{num1+num2} + {num6} x {num4} + {num5*num5} =</div>}
            {!step1 && !step2 && !step3 && <div className="double center">{num1+num2} + {num6*num4} + {num5*num5} =</div>}
            {!step1 && !step2 && !step3 && !step4 && <div className="double center">{num1+num2+(num6*num4)} + {num5*num5} =</div>}
            {!step1 && !step2 && !step3 && !step4 && !step5 && <div className="double center Green">{num1+num2+(num6*num4)+(num5*num5)}</div>}
            {!(!step1 && !step2 && !step3 && !step4 && !step5) && <div className=" double center Green absolute StepQuestion">{Q1} {sign} {Q2} = </div>}  
            {!done &&<div className='center wrap absolute StepAnswer'>
                   {(sign === 'x' && (Q1 >= 10 || Q2 >= 10)) && <button className="choice" style={{backgroundColor:'yellow',color:'black'}} onClick={()=>{setExtra(true);console.log(extra)}} >help</button>}
                   <Step value = {answer+arr[0]}  answer={answer} Count ={Count} done = {done} mistake={Nothing}/>
                   {(sign === 'x' && (Q1 >= 10 || Q2 >= 10)) && <button className="choice red" onClick={close} >Close</button>} 
                   <Step value = {answer+arr[2]}  answer={answer} Count ={Count} done = {done} mistake={Nothing}/>
                   <Step value = {answer+arr[3]}  answer={answer} Count ={Count} done = {done} mistake={Nothing}/>
                   {!(sign === 'x' && (Q1 >= 10 || Q2 >= 10)) && <button className="choice" style={{backgroundColor:'yellow',color:'black'}} onClick={()=>{setExtra(true);console.log(extra)}} >help</button>}
                   <Step value = {answer+arr[1]}  answer={answer} Count ={Count} done = {done} mistake={Nothing}/>
                   {!(sign === 'x' && (Q1 >= 10 || Q2 >= 10)) && <button className="choice red" onClick={close} >Close</button>} 
               </div>}
        </div>
    )
}