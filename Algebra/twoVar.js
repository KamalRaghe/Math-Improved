import Step from "@/components/step"
import { useEffect, useState } from "react"
import HelpDiv from "@/components/PerfectDivision"
import HelpAdd from "@/components/HelpAdd"
import HelpTimes from "@/components/HelpTimes"
import StepTimes from "@/components/stepTimes"
import HelpMinus from "@/components/HelpMinus"
import StepAdd from "@/components/StepAdd"
import StepMinus from "@/components/StepMinus"
import Algebra4 from "./Algebra4"
import Algebra from "./Algebra"

export default function TwoVar({num1,num2,num4,num5,num6,num7,close}){  
    const [done,setDone] = useState(true)
    const [extra, setExtra] = useState(false)
    const [arr, setArr] = useState([0,Math.floor(Math.random()*1+2)+1,1,Math.floor(Math.random()*3)-4])
    const [answer, setAnswers] = useState()
    const[Q1, setQ1] = useState() 
    const[Q2, setQ2] = useState()
    const [sign, setSign] = useState('+')
    const [step, setStep] = useState(0) 
    const [step4, setStep4] = useState(0)
    const [C1, setC1] = useState(null)
    const [C2, setC2] = useState(null)
    const [V, setV] = useState()

    function Extra(){
        setExtra(false)
   }
   
   function gcd(a, b) {
    while (b !== 0) {
        let temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}

function lcm(a, b) {
    return Math.abs(a * b) / gcd(a, b);
}

    function Count(){
        console.log(V)
        setArr(prevChange => prevChange.sort((a,b)=>Math.random()-0.5))
        if(step === 0){
            setStep(1)
            setDone(false)
            if(V == 'x'){
                setQ1(num2)
                setQ2(num4)
                setAnswers(lcm(num2,num4))
            }else{
                setQ1(num1)
                setQ2(num5)
                setAnswers(lcm(num1,num5))
            }
            setSign('and')
        }
        if(step == 1){
            setStep(2)
            setQ1(answer)
            if(V == 'x'){
                setQ2(num2)
                 setAnswers(answer/num2)      
            }else{
                setQ2(num1)
                 setAnswers(answer/num1)
            }
            setSign('÷')
        }
         if(step == 2){
            setStep(3)
            setC1(answer)   
            if(V == 'x'){
                setQ1(lcm(num2,num4))
                setQ2(num4)
                 setAnswers(lcm(num2,num4)/num4)
                 
            }else{
                setQ1(lcm(num1,num5))
                setQ2(num5)
                 setAnswers(lcm(num1,num5)/num5)
                 
            }
        } if(step == 3){
            setStep(4)
            setC2(answer)
            setQ2(num2)
            setQ1(C1)
            setSign('x')
            setAnswers(num2*C1)
        }if(step == 4){
            setStep(5)
            setQ2(num1)
            setAnswers(num1*C1)
        }if(step == 5){
            setStep(6)
            setQ2((num2*num6)+(num1*num7))
            setAnswers(((num2*num6)+(num1*num7))*C1)
        }if(step == 6){
            setStep(7)
            setQ2(num4)
            setQ1(C2)
            setAnswers(num4*C2)
        }if(step == 7){
            setStep(8)
            setQ2(num5)
            setAnswers(num5*C2)
        }if(step == 8){
            setStep(9)
            setQ2((num4*num6)+(num5*num7))
            setAnswers(((num4*num6)+(num5*num7))*C2)
        }if (step == 9){
            setStep(10)
            setSign('-')
            setQ1(C1*num2)
            setQ2(C2*num4)
            setAnswers((C1*num2)-(C2*num4))
        }if (step == 10){
            setStep(11)
            setSign('-')
            setQ1(C1*num1)
            setQ2(C2*num5)
            setAnswers((C1*num1)-(C2*num5))
        }if (step == 11){
            setStep(12)
            setSign('-')
            setQ1(C1*((num2*num6)+(num1*num7)))
            setQ2(C2*((num4*num6)+(num5*num7)))
            setAnswers((C1*((num2*num6)+(num1*num7)))-(C2*((num4*num6)+(num5*num7))))

        }if(step == 12){
            setStep(13)
            setSign('=')
            setQ2(((C1*((num2*num6)+(num1*num7)))-(C2*((num4*num6)+(num5*num7)))))
            if(V == 'x'){
                setQ1(((C1*num1)-(C2*num5))+'y')
                setAnswers(((C1*((num2*num6)+(num1*num7)))-(C2*((num4*num6)+(num5*num7))))/((C1*num1)-(C2*num5)))
            }else{
                setQ1(((C1*num2)-(C2*num4))+'𝑥')
                setAnswers(((C1*((num2*num6)+(num1*num7)))-(C2*((num4*num6)+(num5*num7))))/((C1*num2)-(C2*num4)))
            }
        }if(step == 13){
            setStep(14)
            setSign('x')
            if(V == 'x'){
                setQ1(num1)
                setQ2(num7)
                setAnswers((num1*num7))
            }else{
                setQ1(num2)
                setQ2(num6)
                setAnswers((num2*num6))
            }  
        }if(step == 14){
            setStep(15) 
            setSign('=')
            if(V == 'x'){
                setAnswers(num6)
            }else{

                setAnswers(num7)
            }
        }if(step == 15){
            setStep(16)
            setDone(true)
        }
    }
    useEffect(()=>{
        setArr(prevChange => prevChange.sort((a,b)=>Math.random()-0.5))
     },[])

      useEffect(()=>{
        if(V){
            Count()
        }
     },V)

    function Nothing(){}
    return (
        <div className="Help">
             {extra && sign === '+' && Q1 < 10 && Q2 < 10 && <HelpAdd close={Extra} num1 ={Q1} num2 = {Q2}/>}
            {extra && sign === '+' && (Q1 >= 10 || Q2 >= 10) && <StepAdd close={Extra} num1 ={Q1} num2 = {Q2}/>}
            {extra && sign === 'x' && Q1 < 10 && Q2 < 10 && <HelpTimes close={Extra} num1 ={Q1} num2 = {Q2}/>}
            {extra && sign === 'x' && (Q1 >= 10 || Q2 >= 10) && <StepTimes close={Extra} num1 ={Q1} num2 = {Q2}/>}
            {extra && sign === '-' && Q1 < 10 && Q2 < 10 && <HelpMinus close={Extra} num1 ={Q1 > Q2 ? Q1 : Q2} num2 = {Q1 > Q2 ? Q2 : Q1}/>}
            {extra && sign === '-' && (Q1 >= 10 || Q2 >= 10) && <StepMinus close={Extra} num1 ={Q1 > Q2 ? Q1 : Q2} num2 = {Q1 > Q2 ? Q2 : Q1}/>}
            {extra && sign === '÷' && <HelpDiv close={Extra} num1 ={Q1} num2 = {Q2}/>}
            {extra && sign == '=' && step < 15 && <Algebra close={Extra} num1 ={V != 'x' ? (C1*num2 < C2*num4 ? (C1*num2)-(C2*num4) : (C2*num4)-(C1*num2)) : (C1*num1 > C2*num5 ? ((C1*num1)-(C2*num5)) : ((C2*num5)-(C1*num1)))} num2 = {V != 'x' ? num6 : num7}/>}
            {extra && sign == '=' && step  >= 15 && <Algebra4 close={Extra} num1 ={V == 'x' ? num1*num7 : num2*num6} num2 = {V == 'x' ? num6 : num7} num5 = {V == 'x' ? num2 : num1}/>}

            <div className='cancel'><button className='cancel-btn' onClick = {close}>X</button></div>
            <div className="column ">
                {step < 10 && <div className="double">
                     <span className="Green">{C1 && `${C1} (`}</span>
                     {step != 0 ? num2 : 
                     <button onClick={()=>{setV('x')}} 
                        className = 'carry Green' >{num2}</button>}
                        𝑥 + {step != 0 ? num1 : 
                        <button onClick={()=>{Count()}} className = 'carry Green' >
                            {num1}</button>}y = {(num2*num6)+(num1*num7)}
                        <span className="Green">{C1 && ')'}</span>
                </div>}
                { step < 10 && <div className="double">
                     <span className="Green">{C2 && `${C2} (`}</span>
                     {step != 0 ? num4 : 
                     <button onClick={()=>{setV('x')}} 
                        className = 'carry Green' >{num4}</button>}
                        𝑥 + {step != 0 ? num5 : 
                        <button onClick={()=>{Count()}} className = 'carry Green' >
                            {num5}</button>}y = {(num4*num6)+(num5*num7)}
                        <span className="Green">{C2 && ')'}</span>
                </div>}
                { step < 14 &&<div className="double">
                     {step > 4 && C1*num2+'𝑥'} {step > 4 && '+'} {step > 5 && C1*num1+'y'} {step > 5 && '='} {step > 6 && C1*((num2*num6)+(num1*num7))}
                </div>}
                { step < 14 &&<div className="double">
                     {step > 7 && C2*num4+'𝑥'} {step > 7 && '+'}  {step > 8 && C2*num5+'y'} {step > 8 && '='} {step > 9 && C2*((num4*num6)+(num5*num7))}
                </div>}
                { step < 14 &&<div className="double">
                    {step > 10 && ((C1*num2)-(C2*num4))+'𝑥'} {step > 10 && '+'} {step > 11 && ((C1*num1)-(C2*num5))+'y'} {step > 11 && '='} {step > 12 && ((C1*((num2*num6)+(num1*num7)))-(C2*((num4*num6)+(num5*num7))))}
                </div>}
                {step == 14 && V == 'x'  && <div className="double">
                    {num2}x + {`(${num1})(${num7})`} = {(num2*num6)+(num1*num7)}
                </div>}
                {step == 14 && V != 'x'  && <div className="double">
                    {`(${num2})(${num6})`} + {num1}y  = {(num2*num6)+(num1*num7)}
                </div>}
                {step == 15 && V == 'x'  && <div className="double">
                    {num2}x + {`${num1*num7}`} = {(num2*num6)+(num1*num7)}
                </div>}
                {step == 15 && V != 'x'  && <div className="double">
                    {`${num2*num6}`} + {num1}y  = {(num2*num6)+(num1*num7)}
                </div>}
                {step == 16 && <div className="center double Green " >
                     x = {num6} 
                  <div className="center double Green " style={{margin:'25px'}}  >  y = {num7} </div>
                </div>}
            </div>
                {step == 1 && <div className="double Green" style={{position:"relative",top:'30px'}} >What is the Lcm of</div>}
                {!done && step != 13 && step != 15 &&<div className=" double center Green absolute StepQuestion">{Q1} {sign} {Q2} = </div>}
                {!done && step == 13 &&<div className=" double center Green absolute StepQuestion" style={{right:'10px'}}> {V == 'x' ? 'y =' : 'x ='}</div>}
                {!done && step == 15 &&<div className=" double center Green absolute StepQuestion" style={{right:'10px'}}> {V == 'x' ? 'x =' : 'y ='}</div>}

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