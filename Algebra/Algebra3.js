import Step from "@/components/step"
import { useEffect, useState } from "react"
import HelpDiv from "@/components/PerfectDivision"
import HelpAdd from "@/components/HelpAdd"
import HelpTimes from "@/components/HelpTimes"
import StepTimes from "@/components/stepTimes"
import HelpMinus from "@/components/HelpMinus"
import StepAdd from "@/components/StepAdd"
import StepMinus from "@/components/StepMinus"

export default function Algebra3({num1,num2,num5,close}){  
    const [done,setDone] = useState(true)
    const [extra, setExtra] = useState(false)
    const [arr, setArr] = useState([0,Math.floor(Math.random()*1+2)+1,1,Math.floor(Math.random()*3)-4])
    const [answer, setAnswers] = useState((num2*num5))
    const[Q1, setQ1] = useState((num2*num5)-num1) 
    const[Q2, setQ2] = useState(num1)
    const [sign, setSign] = useState('+')
    const [step1, setStep1] = useState(true) 
    const [step2, setStep2] = useState(false) 
    const [step3, setStep3] = useState(false) 
    const [step4, setStep4] = useState(false)
    const [step5, setStep5] = useState(false) 
    const [step6, setStep6] = useState(false)
    const [step7, setStep7] = useState(false) 

    function Extra(){
        setExtra(false)
   }


    function Count(){
        setArr(prevChange => prevChange.sort((a,b)=>Math.random()-0.5))
        if(step3 === true){
            setStep3(false)
            setStep4(true)
            setAnswers(num2)
            setDone(true)
        }if(step5 === true){
            setStep5(false)
            setStep6(true)
            setQ1(num5*num2)
            setQ2(num5)
            setAnswers(num2)
        }if(step6 === true){
            setStep6(false)
            setStep7(true)
            setSign(1)
        } if(step7 === true){
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
            {step1 && <div className="double center" >{num5}𝑥 - <button onClick={() => {setStep1(false);setStep2(true)}} className="carry Green" >{num1} </button> = {(num2*num5)-num1}</div>}
            
            {step2 && <div className="double center" >{num5}𝑥 <span className="hide" >.</span><span className="across2" > = {(num2*num5)-num1}</span> <span className="hide" >.</span> <span className="across" ><button  onClick={() => {setStep2(false);setStep3(true);setDone(false)}} className="carry Red" > - </button></span> <span className="hide" >.</span> <span className="across" >{num1}</span> </div>}

            {step3 && <div className="double center" >{num5}𝑥 = {(num2*num5)-num1} <span className="hide" >.</span> + <span className="hide" >.</span> {num1} </div>}

            {step4 && <div className="double center" ><button className="carry Green" onClick={() => 
                {setStep4(false);setStep5(true);setDone(false);setSign('÷'); setQ2(num5); setQ1(num5);setAnswers(1)}} >
                {num5}</button>𝑥 = {(num2*num5)}</div>}

            {!done&& !step7 && <div className=" double center Green absolute StepQuestion">{Q1} {sign} {Q2} = </div>}
            
            {step5 && <div className="double center"><span className="center column">
                <span style={{borderBottom:'2px solid black'}}>
                <span className="hide">.</span>
                {num5}<span className="hide">.</span>
                </span>{num5}</span>𝑥 = <span className="hide">.</span> <span className="center column">
                <span style={{borderBottom:'2px solid black'}} >
                <span className="hide">.</span>
                {num2*num5}<span className="hide">.</span></span>{num5}</span></div>}

                {step6 && <div className="double center">
               𝑥 = <span className="hide">.</span> <span className="center column">
                <span style={{borderBottom:'2px solid black'}} >
                <span className="hide">.</span>
                {num2*num5}<span className="hide">.</span></span>{num5}</span></div>}    

                {step7 && <div className="double Green center">
               𝑥 = <span className="hide">.</span> {num2}</div>}  

               {!done &&<div className='center wrap absolute StepAnswer'>
                   <Step value = {step7 ? "x"+"="+ (answer+arr[0]) :answer+arr[0]}  answer={ step7 ? "x"+"="+answer :answer} Count ={Count} done = {done} mistake={Nothing}/>
                   <Step value = {step7 ? 'x'+'='+ (answer+arr[2]) : answer+arr[2]}  answer={ step7 ? "x"+"="+answer :answer} Count ={Count} done = {done} mistake={Nothing}/>
                   <Step value = {step7 ? 'x'+'='+ (answer+arr[3]) : answer+arr[3]}  answer={ step7 ? "x"+"="+answer :answer} Count ={Count} done = {done} mistake={Nothing}/>
                   <button className="choice" style={{backgroundColor:'yellow',color:'black'}} onClick={()=>{setExtra(true);console.log(extra)}} >help</button>
                   <Step value = {step7 ? 'x'+'='+ (answer+arr[1]) : answer+arr[1]}  answer={ step7 ? "x"+"="+answer :answer} Count ={Count} done = {done} mistake={Nothing}/>
                   <button className="choice red" onClick={close} >Close</button>
               </div>}
        </div>
    )
}