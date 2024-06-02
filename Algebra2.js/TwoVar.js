import Step from "@/components/step"
import { useEffect, useState } from "react"
import HelpDiv from "@/components/PerfectDivision"
import HelpAdd from "@/components/HelpAdd"
import HelpTimes from "@/components/HelpTimes"
import StepTimes from "@/components/stepTimes"
import HelpMinus from "@/components/HelpMinus"
import StepAdd from "@/components/StepAdd"
import StepMinus from "@/components/StepMinus"
import Algebra from "@/Algebra/Algebra"
import AlgebraY from "@/Algebra/AlgebraY"
import Algebra2y from "@/Algebra/Algebra2y"
import Algebra4 from "@/Algebra/Algebra4"
import HelpLcm from "@/components/HelpLcm"

export default function TwoVar({num1,num2,num4,num5,num6,num7,close}){  
    const [done,setDone] = useState(true)
    const [extra, setExtra] = useState(false)
    const [arr, setArr] = useState([0,Math.floor(Math.random()*1+2)+1,1,Math.floor(Math.random()*3)-4])
    const [answer, setAnswers] = useState(num1+num2)
    const[Q1, setQ1] = useState(num1) 
    const[Q2, setQ2] = useState(num2)
    const [count1, setCount1] = useState()
    const [count2, setCount2] = useState()
    const [count3, setCount3] = useState(false)
    const [sign, setSign] = useState('+')
    const [step1, setStep1] = useState(true) 
    const [step2, setStep2] = useState(false) 
    const [step3, setStep3] = useState(false) 
    const [step4, setStep4] = useState(false)
    const [step5, setStep5] = useState(false)
    const [step6, setStep6] = useState(false)
    const [step7, setStep7] = useState(false)
    const [step8, setStep8] = useState(false)
    const [step9, setStep9] = useState(false)
    const [step10, setStep10] = useState(false)
    const [step11, setStep11] = useState(false)
    const [step12, setStep12] = useState(false)
    const [step13, setStep13] = useState(false)
    const [step14, setStep14] = useState(false)
    const [step15, setStep15] = useState(false)
    const [step16, setStep16] = useState(false)
    const [step17, setStep17] = useState(false)
    const [times1,setTimes1] = useState(1) 
    const [times2,setTimes2] = useState(1) 
    const [times3,setTimes3] = useState(1) 
    const [times4,setTimes4] = useState(1) 
    const [times5,setTimes5] = useState(1) 
    const [times6,setTimes6] = useState(1)
    const [Green1,setGreen1] = useState('') 
    const [Green2,setGreen2] = useState('') 
    const [Green3,setGreen3] = useState('') 
    const [Green4,setGreen4] = useState('') 
    const [Green5,setGreen5] = useState('') 
    const [Green6,setGreen6] = useState('')
    const [help1,setHelp1] = useState()
    const [help2,setHelp2] = useState()

    function Extra(){
        setExtra(false)
   }

    function Count(){
        setArr(prevChange => prevChange.sort((a,b)=>Math.random()-0.5))
        if(step2 === true){
            setStep2(false)
            setStep3(true)
            setQ1(answer)
            setSign('÷')
            setQ2(Q1)
            setAnswers(answer/Q1)
        }if(step3 === true){
            setStep3(false)
            setStep4(true)
            setQ1(num2)
            setQ2(answer)
            setSign('x')
            setAnswers(num2*answer)
        }if(step4 === true){
            setStep4(false)
            setStep5(true)
            setQ1(num1)
            setQ2(Q2)
            setSign('x')
            setTimes1(Q2)
            setGreen1('Green')
            setAnswers(num1*Q2)
        }if(step5 === true){
            setStep5(false)
            setStep6(true)
            setQ1((num2*num6)+(num1*num7))
            setQ2(Q2)
            setSign('x')
            setTimes2(Q2)
            setGreen2('Green')
            setAnswers(((num2*num6)+(num1*num7))*Q2)
        }if(step6 === true){
            setStep6(false)
            setStep7(true)
            setQ1(count3 ? count1:count2)
            setQ2(count3 ? num4:num5)
            setSign('÷')
            setTimes5(Q2)
            setGreen5('Green')
            setAnswers(count3 ? count1/num4:count2/num5)
        }if(step7 === true){
            setStep7(false)
            setStep8(true)
            setQ1(num4)
            setQ2(answer)
            setSign('x')
            setAnswers(num4*answer)
        }if(step8 === true){
            setStep8(false)
            setStep9(true)
            setQ1(num5)
            setTimes3(Q2)
            setGreen3('Green')
            setSign('x')
            setAnswers(num5*Q2)
        }if(step9 === true){
            setStep9(false)
            setStep10(true)
            setQ1(((num4*num6)+(num5*num7)))
            setSign('x')
            setTimes4(Q2)
            setGreen4('Green')
            setAnswers(((num4*num6)+(num5*num7))*Q2)
        }if(step10 === true){
            setStep10(false)
            setStep11(true)
            setQ1(num2*times1 > num4*times3 ? num2*times1 : num4*times3)
            setSign('-')
            setQ2(num2*times1 > num4*times3 ? num4*times3 : num2*times1)
            setTimes6(Q2)
            setGreen6('Green')
            setAnswers(num2*times1 > num4*times3 ? ((num2*times1)-(num4*times3)) :-1*((num2*times1)-(num4*times3)))
        }if(step11 === true){
            setStep11(false)
            setStep12(true)
            setQ1(num1*times2 > num5*times4 ? num1*times2 : num5*times4)
            setSign('-')
            setQ2(num1*times2 > num5*times4 ? num5*times4 : num1*times2)
            setAnswers(num1*times2 > num5*times4 ? (num1*times2) - (num5*times4) :-1*((num1*times2)-(num5*times4)))
        }if(step12 === true){
            setStep12(false)
            setStep13(true)
            setQ1((((num2*num6)+(num1*num7))*times5) > (((num4*num6)+(num5*num7))*times6) ? ((num2*num6)+(num1*num7))*times5 : ((num4*num6)+(num5*num7))*times6)
            setSign('-')
            setQ2((((num2*num6)+(num1*num7))*times5) > (((num4*num6)+(num5*num7))*times6) ? ((num4*num6)+(num5*num7))*times6 : ((num2*num6)+(num1*num7))*times5 )
            setAnswers((((num2*num6)+(num1*num7))*times5) > (((num4*num6)+(num5*num7))*times6) ? (((num2*num6)+(num1*num7))*times5)-(((num4*num6)+(num5*num7))*times6) :-1*((((num2*num6)+(num1*num7))*times5)-(((num4*num6)+(num5*num7))*times6)))
        }if(step13 === true){
            setStep13(false)
            setStep14(true)
            setQ1(count3 ? ((num1*times2)-(num5*times4))+'y':((num2*times1)-(num4*times3))+'x')
            setHelp1(count3 ? ((num1*times2)-(num5*times4)):((num2*times1)-(num4*times3)))
            setHelp2((((num2*num6)+(num1*num7))*times5)-(((num4*num6)+(num5*num7))*times6))
            setSign('=')
            setQ2((((num2*num6)+(num1*num7))*times5)-(((num4*num6)+(num5*num7))*times6))
            setAnswers(count3 ? ((((num2*num6)+(num1*num7))*times5)-(((num4*num6)+(num5*num7))*times6))/((num1*times2)-(num5*times4))
            :((((num2*num6)+(num1*num7))*times5)-(((num4*num6)+(num5*num7))*times6))/((num2*times1)-(num4*times3)))
            setGreen1('')
            setGreen2('')
            setGreen3('')
            setGreen4('')
            setGreen5('')
            setGreen6('')
        }if(step14 === true){
            setStep14(false)
            setStep15(true)
            setQ1(!count3 ? num2:num1)
            setQ2(answer)
            setSign('x')
            setAnswers(!count3 ? num2*answer:num1*answer)
            setTimes1(1)
            setTimes2(1)
            setTimes3(1)
            setTimes4(1)
            setTimes5(1)
            setTimes6(1)
        }if(step15 === true){
            setStep16(true)
            setStep15(false)
            setSign('1')
            setAnswers(!count3 ? num7:num6)
        }if(step16 === true){
            setStep17(true)
            setStep16(false)
            setDone(true)   
        }
    }

    useEffect(()=>{
        setArr(prevChange => prevChange.sort((a,b)=>Math.random()-0.5))
        for(let i=1;i<15;i++){
            if(num4*i%num2===0){
                setCount1(i*num4)
                break
            }
        }
        for(let i=1;i<15;i++){
            if(num1*i % num5===0){
                setCount2(i*num1)
                break
            }
        }
        console.log(num1,num2,num4,num5,num6,num7)
     },[])

    function Nothing(){}
    return (
        <div className="Help" style={{border:"10px solid purple"}}>
             {extra && !step2 && sign === '+' && Q1 < 10 && Q2 < 10 && <HelpAdd close={Extra} num1 ={Q1} num2 = {Q2}/>}
            {extra && sign === '+' && (Q1 >= 10 || Q2 >= 10) && <StepAdd close={Extra} num1 ={Q1} num2 = {Q2}/>}
            {extra && sign === 'x' && Q1 < 10 && Q2 < 10 && <HelpTimes close={Extra} num1 ={Q1} num2 = {Q2}/>}
            {extra && sign === 'x' && (Q1 >= 10 || Q2 >= 10) && <StepTimes close={Extra} num1 ={Q1} num2 = {Q2}/>}
            {extra && sign === '-' && Q1 < 10 && Q2 < 10 && <HelpMinus close={Extra} num1 ={Q1} num2 = {Q2}/>}
            {extra && sign === '-' && (Q1 >= 10 || Q2 >= 10) && <StepMinus close={Extra} num1 ={Q1} num2 = {Q2}/>}
            {extra && !count3 && sign === '='  && <Algebra close={Extra} num1 ={help1 > 0 ? help1:-1*help1} num2 = {help2 >= 0 ? help2/help1:-1*help2/help1}/>}
            {extra && count3 && sign === '=' && <AlgebraY close={Extra} num1 ={help1 > 0 ? help1:-1*help1} num2 = {help2 >= 0 ? help2/help1:-1*help2/help1}/>}
            {extra && !count3 && sign === '1' && <Algebra2y close={Extra} num1 ={num2*num6} num2 = {num7} num5={num1}/>}
            {extra && count3 && sign === '1' && <Algebra4 close={Extra} num1 ={num1*num7} num2 = {num6} num5={num2}/>}
            {extra && sign === '÷' && <HelpDiv close={Extra} num1 ={Q1} num2 = {Q2}/>}
            {extra && step2 && <HelpLcm close={Extra} num1 ={Q1} num2 = {Q2} answer={answer} />}
            <div className='cancel'><button className='cancel-btn' onClick = {close}>X</button></div>
                {step1 && <div className="double center">
                     <button className="carry Green" onClick={()=>{setStep2(true);setStep1(false); setQ1(num2);setQ2(num4);setDone(false);setAnswers(count1);setCount3(true)}} >{num2}</button>𝑥 + 
                     <button className=" carry Green" onClick={()=>{setStep2(true);setStep1(false); setQ1(num1);setQ2(num5);setDone(false);setAnswers(count2)}}>{num1}</button>
                     y = {(num2*num6)+(num1*num7)}</div>}
                {step1 && <div className="double center">
                    <button className="carry Green" onClick={()=>{setStep2(true);setStep1(false); setQ1(num2);setQ2(num4);setDone(false);setAnswers(count1);setCount3(true)}} >{num4}</button>𝑥 + 
                     <button className=" carry Green" onClick={()=>{setStep2(true);setStep1(false); setQ1(num1);setQ2(num5);setDone(false);setAnswers(count2)}}>{num5}</button>
                     y = {(num4*num6)+(num5*num7)}</div>}
                {!step1 && <div className="double center">
                    <div className={Green1} >{num2*times1} </div>𝑥 + <div className={Green2} style={{paddingLeft:'5px'}}> {num1*times2} </div>y = <div className={Green5} style={{paddingLeft:'8px'}}>{((num2*num6)+(num1*num7))*times5}</div></div>}
                {!step1 && <div className="double center">
                    <div className={Green3} >{num4*times3} </div>𝑥 + <div className={Green4} style={{paddingLeft:'5px'}}> {num5*times4} </div>y = <div className={Green6} style={{paddingLeft:'8px'}}>{((num4*num6)+(num5*num7))*times6}</div></div>}
                    {!step2 && <br></br>}
                    
                    {(step12|| step13) && <div className="center double" >{(num2*times1-num4*times3) > 0 ? (num2*times1-num4*times3) : -1*(num2*times1-num4*times3)}x + {step13 && (num1*times2-num5*times4 > 0) && (num1*times2-num5*times4)+'y'}{step13 && !(num1*times2-num5*times4 > 0) && (-1*(num1*times2-num5*times4))+'y'} </div>}

                    <div className="center Green double" >{count3 && step14 && `${(num1*times2-num5*times4)> 0 ? (num1*times2-num5*times4):-1*(num1*times2-num5*times4)}y = ${(((num2*num6)+(num1*num7))*times5)-(((num4*num6)+(num5*num7))*times6) > 0 ? (((num2*num6)+(num1*num7))*times5)-(((num4*num6)+(num5*num7))*times6) : -1*((((num2*num6)+(num1*num7))*times5)-(((num4*num6)+(num5*num7))*times6))}`} </div>
                    <div className="center Green double" >{!count3 && step14 && `${(num2*times1-num4*times3) > 0 ? (num2*times1-num4*times3) : -1*(num2*times1-num4*times3)}x = ${(((num2*num6)+(num1*num7))*times5)-(((num4*num6)+(num5*num7))*times6) > 0 ? (((num2*num6)+(num1*num7))*times5)-(((num4*num6)+(num5*num7))*times6):-1*((((num2*num6)+(num1*num7))*times5)-(((num4*num6)+(num5*num7))*times6))}`}</div> 
                    
                    {step15 && count3 && <div className="double center" >{num2}𝑥 + {num1}({num7}) = {((num2*num6)+(num1*num7))}</div>}
                    {step15 && !count3 && <div className="double center" >{num2}({num6}) + {num1}y = {((num2*num6)+(num1*num7))}</div>}

                    {step16 && count3 && <div className="double Green center" >{num2}𝑥 + {num1*num7} = {((num2*num6)+(num1*num7))}</div>}
                    {step16 && !count3 && <div className="double Green center" >{num2*num6} + {num1}y = {((num2*num6)+(num1*num7))}</div>}

                    {step17 && <div className="center double Green " onClick={close}>𝑥 = {num6}</div>}
                    {step17 && <div className="center double Green " onClick={close}>y = {num7}</div>}

                {step2 && <div className="center double" style={{paddingTop:'50px'}} >Lowest Common</div>}
                {step2 && <div className="center double">Multiple</div>}
                {step2 && <div className="center double">{Q1} and {Q2}</div>}                
                {!done&& !step2 && !step14 && !step16 && <div className=" double center Green absolute StepQuestion">{Q1 > 0 ? Q1:-1*Q1} {sign} {Q2 > 0 ? Q2:-1*Q2} {!step14 && '='} </div>}
               {!done &&<div className='center wrap absolute StepAnswer'>
                   <Step value = {(step14 || step16) ? `${((count3 && step14) || (!count3 && step16)) ? 'y':'x'}` +"="+ (answer+arr[0]) : answer+arr[0]}  answer={ (step14 || step16) ? `${((count3 && step14) || (!count3 && step16)) ? 'y':'x'}`+"="+answer :answer} Count ={Count} done = {done} mistake={Nothing}/>
                   <Step value = {(step14 || step16) ? `${((count3 && step14) || (!count3 && step16)) ? 'y':'x'}` +'='+ (answer+arr[2]) : answer+arr[2]}  answer={ (step14 || step16) ? `${((count3 && step14) || (!count3 && step16)) ? 'y':'x'}`+"="+answer :answer} Count ={Count} done = {done} mistake={Nothing}/>
                   <Step value = {(step14 || step16) ? `${((count3 && step14) || (!count3 && step16)) ? 'y':'x'}` +'='+ (answer+arr[3]) : answer+arr[3]}  answer={ (step14 || step16) ? `${((count3 && step14) || (!count3 && step16)) ? 'y':'x'}`+"="+answer :answer} Count ={Count} done = {done} mistake={Nothing}/>
                   <button className="choice" style={{backgroundColor:'yellow',color:'black'}} onClick={()=>{setExtra(true)}} >help</button>
                   <Step value = {(step14 || step16) ? `${((count3 && step14) || (!count3 && step16)) ? 'y':'x'}` +'='+ (answer+arr[1]) : answer+arr[1]}  answer={ (step14 || step16) ? `${((count3 && step14) || (!count3 && step16)) ? 'y':'x'}`+"="+answer :answer} Count ={Count} done = {done} mistake={Nothing}/>
                   <button className="choice red" onClick={close} >Close</button>
               </div>}
        </div>
    )
}