import Step from "@/components/step"
import { useEffect, useState } from "react"
import HelpDiv from "@/components/PerfectDivision"
import HelpAdd from "@/components/HelpAdd"
import HelpTimes from "@/components/HelpTimes"
import StepTimes from "@/components/stepTimes"
import HelpMinus from "@/components/HelpMinus"
import StepAdd from "@/components/StepAdd"
import StepMinus from "@/components/StepMinus"

export default function AlgebraY({num1,num2,close}){  
    const [done,setDone] = useState(true)
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

    function Extra(){
        setExtra(false)
   }

    function Count(){
        setArr(prevChange => prevChange.sort((a,b)=>Math.random()-0.5))
        if(step2 === true){
            setStep2(false)
            setStep3(true)
            setQ1(num2*num1>0 ? num1*num2:-1*num1*num2)
            setQ2(num1)
            setAnswers(num2>0?num2:-1*num2)
        }if(step3 === true){
            setStep3(false)
            setStep4(true)
            setQ1(num2*num1)
            setQ2(num1)
            setSign('a')
            setAnswers(answer)
        }if(step4 === true){
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
            {extra && sign === '÷' && <HelpDiv close={Extra} num1 ={Q1} num2 = {Q2}/>}
            <div className='cancel'><button className='cancel-btn' onClick = {close}>X</button></div>
            {step1 && <div className="double center"> <button className="carry Green" onClick={() => {setAnswers(1);setSign('÷');setQ2(num1);setQ1(num1);setDone(false);setStep2(true);setStep1(false)}} >{num1}</button>y = {num2*num1 > 0 ? num1*num2:-1*(num2*num1)} </div>}
            {step2 && <div className="double center"><span className="center column">
                <span style={{borderBottom:'2px solid black'}}>
                <span className="hide">.</span>
                {num1}<span className="hide">.</span>
                </span>{num1}</span>y = <span className="hide">.</span> <span className="center column">
                <span style={{borderBottom:'2px solid black'}} >
                <span className="hide">.</span>
                {num2*num1 > 0 ? num1*num2:-1*(num2*num1)}<span className="hide">.</span></span>{num1}</span></div>}

                {step3 && <div className="double center">
                y = <span className="hide">.</span> <span className="center column">
                <span style={{borderBottom:'2px solid black'}} >
                <span className="hide">.</span>
                {num2*num1 > 0 ? num1*num2:-1*(num2*num1)}<span className="hide">.</span></span>{num1}</span></div>}

                {step4 && <div className="double Green center">
                y = <span className="hide">.</span>{num2>0?num2:-1*num2}</div>}

                {!done&& !step4 && <div className=" double center Green absolute StepQuestion">{Q1} {sign} {Q2} = </div>}
               {!done && !step4 &&<div className='center wrap absolute StepAnswer'>
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