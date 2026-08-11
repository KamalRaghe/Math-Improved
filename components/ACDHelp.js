import Step from "@/components/step"
import StepF from "./fractionStep"
import { useEffect, useState } from "react"
import HelpAdd from "./HelpAdd"
import Question1 from "./SimplifyHelp"
import HelpMinus from "./HelpMinus"


export default function ACD({num1,num2,close,num4}){  
    const [done,setDone] = useState(true)
    const [add,setAdd] = useState(false)
    const [ready, setReady] = useState(false)
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
    const [below, setBelow] = useState('400px')

    function Extra(){
        setExtra(false)
   }

    function Count(){
        setArr(prevChange => prevChange.sort((a,b)=>Math.random()-0.5))
        if(step1 === true){
           setStep1(false)
           setStep2(true) 
           setDone(num1+num2 < num4 )
        }if(step2 === true && done === true){
            close()
        }if(step3 === true){
            setStep3(false)
            setSign('x')
            setStep4(true)
        }if(step5 === true){
            close()
        }
    }

    
    useEffect(()=>{
        setArr(prevChange => prevChange.sort((a,b)=>Math.random()-0.5))
     },[])


    function Nothing(){}
    return (
        <div className="Help">
            {((step2 && num1+num2 < num4) || step5 ) && extra && <Question1  whole={num1+num2 > num4 && 1} num1={num1+num2 > num4 ? num2-num4+num1 : num2+num1} num2={num4} close={Extra} />}
            {extra && sign === '+' && <HelpAdd close={Extra} num1 ={Q1} num2 = {Q2}/>}
            {extra && sign === '-' && <HelpMinus close={Extra} num1 ={Q1} num2 = {Q2}/>}
            <div className='cancel'><button className='cancel-btn' onClick = {close}>X</button></div>
            <div className=" double center">
                    <div className="column center" >
                        <div className="center" style={{borderBottom:'2px solid black', width:'45px'}} >
                            {num1}
                        </div>
                        {num4}
                    </div>
                    <div className="double" style={{padding:'10px'}}>+</div>
                    <div className="column center" >
                        <div className="center" style={{borderBottom:'2px solid black', width:'45px'}} >
                            {num2}
                        </div>
                        {num4}
                    </div>
                    <div className="double" style={{padding:'10px'}}>=</div>
                    {step4 && !step5 && <button className="carry Green double" onClick={()=>{setStep5(true);setDone(true)}} >+</button>}
                    {step5 && <span className="Green" >1</span>}
                    {!add && <div className="carry Green double" onClick={()=>{setAdd(true);setDone(false)}} style={{fontWeight:'bold'}} >+</div>}
                    {add && step1 && <div className="column center" >
                         <div className="center Green " style={{borderBottom:'2px solid green', width:'45px'}} >
                            <span className="hide" >0</span>
                        </div>
                        <div className="Green" onClick={()=>setAdd(true)} >{num4}</div>
                    </div>}
                    {(step2 || step3) && <div className="column center" >
                         <div className="center Green " style={{borderBottom:'2px solid green', width:'45px'}} >
                            {num1+num2 < num4 && num2+num1}
                            {!step3 && !step4 && num1+num2 >= num4 && <button className="carry Red" onClick={()=>{setStep2(false);setQ1(num1+num2);setQ2(num4);setSign('-');setAnswers(num2+num1-num4);setStep3(true)}} >{num2+num1}</button>}
                            {step3 && <span className="hide">0</span>}
                        </div>
                        <div className="Green" onClick={()=>setAdd(true)} >{num4}</div>
                    </div>}
                    {step4 && num1+num2 !== num4 && <div className="column center" >
                         <div className="center Green " style={{borderBottom:'2px solid green', width:'45px'}} >
                            {num1-num4+num2}
                        </div>
                        <div className="Green" onClick={()=>setAdd(true)} >{num4}</div>
                    </div>}
                </div>
            
            {!done && !step2 && !step4 && <div className=" double center Green absolute StepQuestion">{Q1} {sign} {Q2} = </div>}  
            {!done && !step2 && !step4 && <div className='center wrap absolute StepAnswer'>
                   {(sign === 'x' && (Q1 >= 10 || Q2 >= 10)) && <button className="choice" style={{backgroundColor:'yellow',color:'black'}} onClick={()=>{setExtra(true);console.log(extra)}} >help</button>}
                   <Step value = {answer+arr[0]}  answer={answer} Count ={Count} done = {done} mistake={Nothing}/>
                   {(sign === 'x' && (Q1 >= 10 || Q2 >= 10)) && <button className="choice red" onClick={close} >Close</button>} 
                   <Step value = {answer+arr[2]}  answer={answer} Count ={Count} done = {done} mistake={Nothing}/>
                   <Step value = {answer+arr[3]}  answer={answer} Count ={Count} done = {done} mistake={Nothing}/>
                   {!(sign === 'x' && (Q1 >= 10 || Q2 >= 10)) && <button className="choice" style={{backgroundColor:'yellow',color:'black'}} onClick={()=>{setExtra(true);console.log(extra)}} >help</button>}
                   <Step value = {answer+arr[1]}  answer={answer} Count ={Count} done = {done} mistake={Nothing}/>
                   {!(sign === 'x' && (Q1 >= 10 || Q2 >= 10)) && <button className="choice red" onClick={close} >Close</button>} 
               </div>}

               {done && add && <div className='center wrap absolute StepAnswer' style={{width:'100%',top:"350px"}} >
                   <StepF whole={num1+num2 >= num4 && 1} value1 = {((num1+num2)%num4)+arr[0]}  answer1={(num1+num2)%num4} value2 = {num4}  answer2={num4}  Count ={Count} mistake={Nothing}/>
                   <StepF whole={num1+num2 >= num4 && 1} value1 = {((num1+num2)%num4)+arr[2]}  answer1={(num1+num2)%num4} value2 = {num4}  answer2={num4}  Count ={Count} mistake={Nothing}/>
                   <StepF whole={num1+num2 >= num4 && 1} value1 = {((num1+num2)%num4)+arr[3]}  answer1={(num1+num2)%num4} value2 = {num4}  answer2={num4}  Count ={Count} mistake={Nothing}/>
                   <StepF whole={num1+num2 >= num4 && 1} value1 = {((num1+num2)%num4)+arr[1]}  answer1={(num1+num2)%num4} value2 = {num4}  answer2={num4}  Count ={Count} mistake={Nothing}/>
                   {<button className="choice" style={{backgroundColor:'yellow',color:'black'}} onClick={()=>{setExtra(true);console.log(extra)}} >help</button>}
               </div>}
        </div>
    )
}