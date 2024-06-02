import Step from "@/components/step"
import StepF from "./fractionStep"
import { useEffect, useState } from "react"
import HelpTimes from "@/components/HelpTimes"
import StepTimes from "@/components/stepTimes"
import StepAdd from "@/components/StepAdd"
import HelpHcf from "./HelpHcf"
import HelpDiv from "./PerfectDivision"

export default function Question1({num1,num2,whole,close}){  
    const [done,setDone] = useState(false)
    const[count,setCount] = useState(1)
    const [extra, setExtra] = useState(false)
    const [arr, setArr] = useState([0,Math.floor(Math.random()*1+2)+1,1,Math.floor(Math.random()*3)-4])
    const [answer, setAnswers] = useState(whole*num2)
    const[Q1, setQ1] = useState(whole) 
    const[Q2, setQ2] = useState(num2)
    const [sign, setSign] = useState('x')
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
        if(step1 === true){
           setStep1(false)
           setStep2(true)
           setQ1(num2*whole) 
           setQ2(num1)
           setSign('+')
           setAnswers(num1+(whole*num2)) 
        }if(step2 === true){
            setStep2(false)
            setStep3(true)
            setDone(count === 1)
            setQ1((num1+(whole*num2))) 
            setQ2(num2)
            setSign('and')
            setAnswers(count)
        }if (step3 === true && done === true){
            close()
        }if (step3 === true && done !== true){
            setStep3(false)
            setStep4(true) 
            setQ1((num1+(whole*num2))) 
            setQ2(count)
            setSign('÷')
            setAnswers((num1+(whole*num2))/count)
        }if (step4 === true && done !== true){
            setStep4(false)
            setStep5(true) 
            setQ1(num2) 
            setQ2(count)
            setSign('÷')
            setAnswers(num2/count)
        }if (step5 === true && done !== true){
            setStep5(false)
            setStep6(true) 
            setDone(true)
        }if (step6 === true){
            close()
        }
    }


    useEffect(() => {
        for(let i=num2;i>0;i--){
          if(num1 % i === 0 && num2 % i === 0){
              setCount(i)
              break
          }
      }
      },[num1,num2])

    useEffect(()=>{
        setArr(prevChange => prevChange.sort((a,b)=>Math.random()-0.5))
     },[])

     useEffect(() => {
        setArr(prevChange => prevChange.sort((a,b)=>Math.random()-0.5))
      },[count])

    function Nothing(){}
    return (
        <div className="Help">
            {extra && sign === 'and' && <HelpHcf close={Extra} num1 ={Q1} num2 = {Q2}/>}
            {extra && sign === '+' && Q1 < 10 && Q2 < 10 && <HelpAdd close={Extra} num1 ={Q1} num2 = {Q2}/>}
            {extra && sign === '+' && (Q1 >= 10 || Q2 >= 10) && <StepAdd close={Extra} num1 ={Q1} num2 = {Q2}/>}
            {extra && sign === 'x' && Q1 < 10 && Q2 < 10 && <HelpTimes close={Extra} num1 ={Q1} num2 = {Q2}/>}
            {extra && sign === 'x' && (Q1 >= 10 || Q2 >= 10) && <StepTimes close={Extra} num1 ={Q1} num2 = {Q2}/>}
            {extra && sign === '÷' && Q1 <= 9*Q2 && Q2 < 10 && <HelpDiv close={Extra} num1 ={Q1} num2 = {Q2}/>}
            <div className='cancel'><button className='cancel-btn' onClick = {close}>X</button></div>
            <div className=" double center">
                <div style={{padding:'3px'}} >{step1 && whole}</div>
                    <div className="column center" >
                        {step1 && <div className="center" style={{borderBottom:'2px solid black', width:'45px'}} >
                            {num1}
                        </div>}
                        {step2 && <div className="center" style={{borderBottom:'2px solid black', width:'135px'}} >
                           {whole*num2}  + {num1}
                        </div>}
                        {step3 && <div className="center" style={{borderBottom:'2px solid black', width:'60px'}} >
                           {whole*num2+num1}
                        </div>}
                        {step4 && <div className="center" style={{borderBottom:'2px solid black', width:'130px'}} >
                           {whole*num2+num1} ÷ {count}
                        </div>}
                        {(step5 || step6) && <div className="center" style={{borderBottom:'2px solid black', width:'60px'}} >
                           {(whole*num2+num1)/count}
                        </div>}
                        {!step4 && !step5 && !step6 && num2}{(step4 || step5) && <div>{num2} ÷ {count}</div>}
                        {step6 && num2/count}
                        
                    </div>
                </div>
                
                {!done && sign === 'and' && <div className=" double center" style={{paddingTop:'20px'}}  >Highest common </div>}
                {!done && sign === 'and' && <div className=" double center" >factor of</div>}
                {!done && sign === 'and' && <div className=" double center" >{Q1} and {Q2} </div>}
                {!done && sign !== 'and' && <div className=" double center Green absolute StepQuestion">{Q1} {sign} {Q2} = </div>}   
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
               {done &&<div className='center wrap absolute StepAnswer' style={{width:'100%'}} >
                   <StepF value1 = {num2*whole+num1+arr[0]}  answer1={num2*whole+num1} value2 = {num2}  answer2={num2}  Count ={Count} mistake={Nothing}/>
                   <StepF value1 = {num2*whole+num1+arr[2]}  answer1={num2*whole+num1} value2 = {num2}  answer2={num2}  Count ={Count} mistake={Nothing}/>
                   <StepF value1 = {num2*whole+num1+arr[3]}  answer1={num2*whole+num1} value2 = {num2}  answer2={num2}  Count ={Count} mistake={Nothing}/>
                   <StepF value1 = {num2*whole+num1+arr[1]}  answer1={num2*whole+num1} value2 = {num2}  answer2={num2}  Count ={Count} mistake={Nothing}/>
               </div>}
        </div>
    )
}