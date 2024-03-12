import Step from "@/components/step"
import StepF from "./fractionStep"
import { useEffect, useState } from "react"
import Question1 from "./SimplifyHelp"
import Improper from "./HelpImproper"
import HelpLcm from "./HelpLcm"
import HelpDiv from "@/components/PerfectDivision"
import HelpAdd from "@/components/HelpAdd"
import HelpTimes from "@/components/HelpTimes"
import StepTimes from "@/components/stepTimes"
import HelpMinus from "@/components/HelpMinus"
import StepAdd from "@/components/StepAdd"
import StepMinus from "@/components/StepMinus"

export default function DMF({num1,num2,close,num4,num5,whole1,whole2}){  
    const [done,setDone] = useState(false)
    const [add,setAdd] = useState(true)
    const [ready, setReady] = useState(false)
    const [extra, setExtra] = useState(false)
    const [count, setCount] = useState(1)
    const [arr, setArr] = useState([0,Math.floor(Math.random()*1+2)+1,1,Math.floor(Math.random()*3)-4])
    const [answer, setAnswers] = useState(num2*whole1)
    const[Q1, setQ1] = useState(whole1) 
    const[Q2, setQ2] = useState(num2)
    const [sign, setSign] = useState('x')
    const [step1, setStep1] = useState(false) 
    const [step2, setStep2] = useState(false) 
    const [step3, setStep3] = useState(false) 
    const [step4, setStep4] = useState(false)
    const [step5, setStep5] = useState(false)
    const [step6, setStep6] = useState(false)
    const [before1,setBefore1] = useState(true)    
    const [before2,setBefore2] = useState(false)
    const [before3,setBefore3] = useState(false)
    const [before4,setBefore4] = useState(false)
    const [before5,setBefore5] = useState(false)
    const [before6,setBefore6] = useState(false)
    function Extra(){
        setExtra(false)
   }

    function Count(){
        setArr(prevChange => prevChange.sort((a,b)=>Math.random()-0.5))
        if(before1 === true){
            setBefore1(false)
            setBefore2(true)
            setSign('+')
            setQ1(num1)
            setQ2(whole1*num2)
            setAnswers((whole1*num2)+num1)
        }if(before2 === true){
            setBefore2(false)
            setBefore3(true)
            setSign('x')
            setQ1(whole2)
            setQ2(num5)
            setAnswers(whole2*num5)
        }if(before3 === true){
            setBefore3(false)
            setBefore4(true)
            setSign('+')
            setQ1(num4)
            setQ2(whole2*num5)
            setAnswers((whole2*num5)+num4)
        }if(before4 === true){
            setBefore4(false)
            setBefore5(true)
            setDone(true)
            setAdd(false)
        }
        if(step1 === true){
            setStep1(false)
            setStep2(true)
            setQ1(num2)
            setQ2(num4)
            setAnswers(num4*num2)
        }if(step2 === true){
            setStep2(false)
            setStep3(true)
            setQ1(num2)
            setQ2(num4+(num5*whole2))
            setAnswers((num4+(num5*whole2))*num2)   
        }if(step3 === true){
            setStep3(false)
            setStep4(true)
            setDone(true)
        }if(step4 === true){
            close()
        }
    }

    useEffect(() => {
        for(let i=num4;i>0;i--){
          if((num1+num2) % i === 0 && num4 % i === 0 && num1+num2 !== num4){
              setCount(i)
              break
          }
      }
      },[num1,num2,num4])

    function Nothing(){}
    return (
        <div className="Help">
            {extra && !done && sign === '-' && (Q1 >= 10 || Q2 >= 10) && <StepMinus close={Extra} num1 ={Q1} num2 = {Q2}/>} 
            {done && (num1+(whole1*num2))*num5 < (num4+(whole2*num5))*num2 && extra && <Question1 num1={(num1+(whole1*num2))*num5} num2={(num4+(whole2*num5))*num2} close={Extra}/>}
            {done && (num1+(whole1*num2))*num5 >= (num4+(whole2*num5))*num2 && extra && <Improper whole={Math.floor(((num1+(whole1*num2))*num5)/((num4+(whole2*num5))*num2))} num1={((num1+(whole1*num2))*num5)%((num4+(whole2*num5))*num2)} num2={(num4+(whole2*num5))*num2} close={Extra}/>}
            {extra && !done && sign === '+' && Q1 < 10 && Q2 < 10 && <HelpAdd close={Extra} num1 ={Q1} num2 = {Q2}/>}
            {extra && !done && sign === '+' && (Q1 >= 10 || Q2 >= 10) && <StepAdd close={Extra} num1 ={Q1} num2 = {Q2}/>}
            {extra && !done && sign === 'x' && Q1 < 10 && Q2 < 10 && <HelpTimes close={Extra} num1 ={Q1} num2 = {Q2}/>}
            {extra && !done && sign === 'x' && (Q1 >= 10 || Q2 >= 10) && <StepTimes close={Extra} num1 ={Q1} num2 = {Q2}/>}
            {extra && !done && sign === '-' && Q1 < 10 && Q2 < 10 && <HelpMinus close={Extra} num1 ={Q1} num2 = {Q2}/>}
            {extra && !done && sign === 'and' && <HelpLcm close={Extra} num1 ={num2} num2 = {num5}/>}
            {extra && !done && sign === '÷' && <HelpDiv close={Extra} num1 ={Q1} num2 = {Q2}/>}

            <div className='cancel'><button className='cancel-btn' onClick = {close}>X</button></div>
            <div className=" double center">
                    {before1 && <span style={{padding:'3px'}} >{whole1}</span>}
                    <div className="column center" >
                        <div className="center" style={{borderBottom:'2px solid black',padding:"0px 10px"}} >
                            {before1 && num1}
                            {before2 && <div>{num1} + {whole1*num2}</div>}
                            {!before1 && !before2 && num1+(whole1*num2) }
                        </div>
                        <div className="center" >
                           {num2}
                        </div>
                    </div>
                    <div className="double" style={{padding:'10px'}}>
                        {!before5 && !before6 && '÷'}
                        {before5 && <button className="carry Red" onClick={()=>{setBefore5(false);setBefore6(true);setStep1(true)}} >÷</button>}
                        {before6 && 'x'}
                    </div>
                    {(before1 || before2 || before3 ) && <span style={{padding:'3px'}} >{whole2}</span>}
                    <div className="column center" >
                        <div className="center" style={{borderBottom:'2px solid black',padding:"0px 10px"}} >
                            {(before1 || before2 || before3 ) && num4}
                            {before4 && <div>{num4} + {whole2*num5}</div>}
                            {!(before1 || before2 || before3 || before4 || before6) && num4+(whole2*num5)}
                            {step1 && <button className="carry Red" onClick={()=>{setStep2(true);setStep1(false);setAdd(true);setDone(false);setBefore2(false);setSign('x') ;setQ1(num1+(num2*whole1));setQ2(num5);setAnswers((num1+(whole1*num2))*num5)}} >{num4+(whole2*num5)}</button>}
                            {step2 && <div className="DivSwitch1" >{num5}</div>}
                            {(step3 || step4) && num5}

                        </div>
                        <div className="center" >
                            {(before1 || before2 || before3 || before4 || before5) && num5}
                            {step1 && <button className="carry Red" onClick={()=>{setStep2(true);setStep1(false);setAdd(true);setDone(false);setBefore2(false);setSign('x') ;setQ1(num1+(num2*whole1));setQ2(num5);setAnswers((num1+(whole1*num2))*num5)}} >{num5}</button>}
                            {step2 && <div className="DivSwitch2" >{num4+(whole2*num5)}</div>}
                            {(step3 || step4) && num4+(whole2*num5)}
                        </div>
                    </div>
                    <div className="double" style={{padding:'10px'}}>=</div>

                    {(step3 || step4) && <div className="column center Green" >
                        <div className="center" style={{borderBottom:'2px solid green',padding:"0px 10px"}} >
                            {(num1+(whole1*num2))*num5}
                        </div>
                        <div className="center" >
                            {!step4 && <span className="hide" >0</span>}
                            {step4 && (num4+(whole2*num5))*num2}
                        </div>
                    </div>}
                    
                </div>

            {!done && <div className=" double center Green absolute StepQuestion">{Q1} {sign} {Q2} = </div>}  
            {!done && <div className='center wrap absolute StepAnswer'>
                   {(sign === 'x' && (Q1 >= 10 || Q2 >= 10)) && <button className="choice" style={{backgroundColor:'yellow',color:'black'}} onClick={()=>{setExtra(true);console.log(extra)}} >help</button>}
                   <Step value = {answer+arr[0]}  answer={answer} Count ={Count} done = {done} mistake={Nothing}/>
                   {(sign === 'x' && (Q1 >= 10 || Q2 >= 10)) && <button className="choice red" onClick={close} >Close</button>} 
                   <Step value = {answer+arr[2]}  answer={answer} Count ={Count} done = {done} mistake={Nothing}/>
                   <Step value = {answer+arr[3]}  answer={answer} Count ={Count} done = {done} mistake={Nothing}/>
                   {!(sign === 'x' && (Q1 >= 10 || Q2 >= 10)) && <button className="choice" style={{backgroundColor:'yellow',color:'black'}} onClick={()=>{setExtra(true);console.log(extra)}} >help</button>}
                   <Step value = {answer+arr[1]}  answer={answer} Count ={Count} done = {done} mistake={Nothing}/>
                   {!(sign === 'x' && (Q1 >= 10 || Q2 >= 10)) && <button className="choice red" onClick={close} >Close</button>} 
               </div>}

               {done && add && <div className='center wrap absolute StepAnswer' style={{width:'100%',top:"340px"}} >
                   <StepF whole={Math.floor(((num1+(whole1*num2))*num5)/((num4+(whole2*num5))*num2))} value1 = {(((num1+(whole1*num2))*num5)%((num4+(whole2*num5))*num2))+arr[0]}  answer1={((num1+(whole1*num2))*num5)%((num4+(whole2*num5))*num2)} value2 = {((num4+(whole2*num5))*num2)+arr[0]}  answer2={(num4+(whole2*num5))*num2}  Count ={Count} mistake={Nothing}/>
                   <StepF whole={Math.floor(((num1+(whole1*num2))*num5)/((num4+(whole2*num5))*num2))} value1 = {(((num1+(whole1*num2))*num5)%((num4+(whole2*num5))*num2))+arr[2]}  answer1={((num1+(whole1*num2))*num5)%((num4+(whole2*num5))*num2)} value2 = {((num4+(whole2*num5))*num2)+arr[2]}  answer2={(num4+(whole2*num5))*num2}  Count ={Count} mistake={Nothing}/>
                   <StepF whole={Math.floor(((num1+(whole1*num2))*num5)/((num4+(whole2*num5))*num2))} value1 = {(((num1+(whole1*num2))*num5)%((num4+(whole2*num5))*num2))+arr[3]}  answer1={((num1+(whole1*num2))*num5)%((num4+(whole2*num5))*num2)} value2 = {((num4+(whole2*num5))*num2)+arr[3]}  answer2={(num4+(whole2*num5))*num2}  Count ={Count} mistake={Nothing}/>
                   <StepF whole={Math.floor(((num1+(whole1*num2))*num5)/((num4+(whole2*num5))*num2))} value1 = {(((num1+(whole1*num2))*num5)%((num4+(whole2*num5))*num2))+arr[1]}  answer1={((num1+(whole1*num2))*num5)%((num4+(whole2*num5))*num2)} value2 = {((num4+(whole2*num5))*num2)+arr[1]}  answer2={(num4+(whole2*num5))*num2}  Count ={Count} mistake={Nothing}/>
                   {<button className="choice" style={{backgroundColor:'yellow',color:'black'}} onClick={()=>{setExtra(true);console.log(extra)}} >help</button>}
               </div>}
        </div>
    )
}