import Step from "@/components/step"
import StepF from "./fractionStep"
import { useEffect, useState } from "react"
import Question1 from "./SimplifyHelp"
import HelpLcm from "./HelpLcm"
import HelpDiv from "@/components/PerfectDivision"
import HelpAdd from "@/components/HelpAdd"
import HelpTimes from "@/components/HelpTimes"
import StepTimes from "@/components/stepTimes"
import HelpMinus from "@/components/HelpMinus"
import StepAdd from "@/components/StepAdd"
import StepMinus from "@/components/StepMinus"

export default function AUD({num1,num2,close,num4,num5, whole1, whole2}){  
    const [done,setDone] = useState(false)
    const [add,setAdd] = useState(true)
    const [ready, setReady] = useState(false)
    const [extra, setExtra] = useState(false)
    const [count, setCount] = useState(1)
    const [arr, setArr] = useState([0,Math.floor(Math.random()*1+2)+1,1,Math.floor(Math.random()*3)-4])
    const [answer, setAnswers] = useState(num1+num2)
    const[Q1, setQ1] = useState(num1) 
    const[Q2, setQ2] = useState(num2)
    const [sign, setSign] = useState('and')
    const [before1,setBefore1] = useState(true)
    const [before2,setBefore2] = useState(false)
    const [before3,setBefore3] = useState(false)
    const [before4,setBefore4] = useState(false)
    const [before5,setBefore5] = useState(false)
    const [before6,setBefore6] = useState(false)
    const [before7,setBefore7] = useState(false)
    const [before8,setBefore8] = useState(false)
    const [step1, setStep1] = useState(false) 
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
        if(before1 === true){
            setBefore1(false)
            setBefore2(true)
            setQ1(answer)
            setQ2(num2)
            setSign('÷')
            setAnswers(answer/num2)
        }if(before2 === true){
            setBefore2(false)
            setBefore3(true)
            setQ1(num1)
            setQ2(answer)
            setSign('x')
            setAnswers(answer*num1)
        }if(before3 === true){
            setBefore3(false)
            setBefore4(true)
            setQ1(num2)
            setQ2(count/num2)
            setSign('x')
            setAnswers(count)
        }if(before4 === true){
            setBefore4(false)
            setBefore5(true)
            setQ1(count)
            setQ2(num5)
            setSign('÷')
            setAnswers(count/num5)
        }if(before5 === true){
            setBefore5(false)
            setBefore6(true)
            setQ1(num4)
            setQ2(answer)
            setSign('x')
            setAnswers(answer*num4)
        }if(before6 === true){
            setBefore6(false)
            setBefore7(true)
            setQ1(num5)
            setQ2(count/num5)
            setSign('x')
            setAnswers(count)
        }if(step6 === true){
            setStep6(false)
            setStep1(true)
            setQ1(num1*count/num2)
            setQ2(num4*count/num5)
            setSign('+')
            setAnswers(num1*count/num2+num4*count/num5)
        }if(before7 === true){
            setBefore7(false)
            setBefore8(true)
            setStep6(true)
            setQ1(whole1)
            setQ2(whole2)
            setSign('+')
            setAnswers(whole1+whole2)
        }if(step1 === true){
           setStep1(false)
           setStep2(true) 
           setDone(num1*count/num2+num4*count/num5 < count )
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

    useEffect(() => {
        for(let i=num4;i>0;i--){
          if((num1+num2) % i === 0 && num4 % i === 0 && num1+num2 !== num4){
              setCount(i)
              break
          }
      }
      },[num1,num2,num4])

    useEffect(()=>{
        setArr(prevChange => prevChange.sort((a,b)=>Math.random()-0.5))
        for(let i=1;i<15;i++){
            if(num2*i%num5===0){
                setAnswers(i*num2)
                setCount(i*num2)
                break
            }
        }
     },[])



    function Nothing(){}
    return (
        <div className="Help">
            {extra && !done && sign === '-' && (Q1 >= 10 || Q2 >= 10) && <StepMinus close={Extra} num1 ={Q1} num2 = {Q2}/>} 
            {((step2 &&  num1*count/num2+num4*count/num5 < count) || step5 ) && extra && <Question1  whole={num1*count/num2+num4*count/num5 > count ? whole1+whole2+1 : whole1+whole2} num1={(num1*count/num2+num4*count/num5)%count} num2={count} close={Extra} />}
            {extra && !done && sign === '+' && Q1 < 10 && Q2 < 10 && <HelpAdd close={Extra} num1 ={Q1} num2 = {Q2}/>}
            {extra && !done && sign === '+' && (Q1 >= 10 || Q2 >= 10) && <StepAdd close={Extra} num1 ={Q1} num2 = {Q2}/>}
            {extra && !done && sign === 'x' && Q1 < 10 && Q2 < 10 && <HelpTimes close={Extra} num1 ={Q1} num2 = {Q2}/>}
            {extra && !done && sign === 'x' && (Q1 >= 10 || Q2 >= 10) && <StepTimes close={Extra} num1 ={Q1} num2 = {Q2}/>}
            {extra && !done && sign === '-' && Q1 < 10 && Q2 < 10 && <HelpMinus close={Extra} num1 ={Q1} num2 = {Q2}/>}
            {extra && !done && sign === 'and' && <HelpLcm close={Extra} num1 ={num2} num2 = {num5} answer={answer}/>}
            {extra && !done && sign === '÷' && <HelpDiv close={Extra} num1 ={Q1} num2 = {Q2}/>}

            <div className='cancel'><button className='cancel-btn' onClick = {close}>X</button></div>
            <div className=" double center"><span style={{padding:'3px'}} >{whole1}</span>
                    <div className="column center" >
                        <div className="center" style={{borderBottom:'2px solid black',padding:"0px 10px"}} >
                            {(before1 || before2 || before3) && num1}
                            {before3 && <div style={{paddingLeft:'10px'}} > x {count/num2}</div>}
                            {!(before1 || before2 || before3) && num1*count/num2}

                        </div>
                        <div className="center" >
                            {(before1 || before2 || before3 || before4) && num2}
                            {(before3 || before4) && <div style={{paddingLeft:'10px'}} > x {count/num2}</div>}
                            {!(before1 || before2 || before3 || before4) && count}
                        </div>
                    </div>
                    <div className="double" style={{padding:'10px'}}>+</div>
                    <span style={{padding:'3px'}} >{whole2}</span> 
                    <div className="column center" >
                        <div className="center" style={{borderBottom:'2px solid black',padding:"0px 10px"}} >
                            {!(before7 || before8) && num4}
                            {before6 && <div style={{paddingLeft:'10px'}} > x {count/num5}</div>}
                            {(before7 || before8 ) && num4*count/num5}
                        </div>
                        <div className="center" >
                            {!before8 && num5}
                            {(before6 || before7) && <div style={{paddingLeft:'10px'}} > x {count/num5}</div>}
                            {(before8) && count}
                        </div>
                    </div>
                    <div className="double" style={{padding:'10px'}}>=</div>
                    {step4 && !step5 && <button className="carry Green double" onClick={()=>{setStep5(true);setDone(true)}} >+</button>}
                    {step5 && <span className="Green" >{whole1+whole2+1}</span>}
                    
                    {add && (step1 || step2 || step3) &&<span className="Green" style={{padding:'3px'}} >{whole2+whole1}</span>}
                    {add && step1 && <div className="column center" >
                         <div className="center Green " style={{borderBottom:'2px solid green', width:'45px'}} >
                            <span className="hide" >0</span>
                        </div>
                        <div className="Green" onClick={()=>setAdd(true)} >{count}</div>
                    </div>}
                    {(step2 || step3) && <div className="column center" >
                         <div className="center Green " style={{borderBottom:'2px solid green', width:'45px'}} >
                            {num1*count/num2+num4*count/num5 < count && num1*count/num2+num4*count/num5}
                            {!step3 && !step4 && num1*count/num2+num4*count/num5 >= count && 
                            <button className="carry Red" onClick={()=>{setStep2(false);setQ1(num1*count/num2+num4*count/num5)
                            ;setQ2(count);setSign('-');setAnswers(num1*count/num2+num4*count/num5-count);setStep3(true)}}>
                                {num1*count/num2+num4*count/num5}</button>}
                            {step3 && <span className="hide">0</span>}
                        </div>
                        <div className="Green" onClick={()=>setAdd(true)} >{count}</div>
                    </div>}
                    {step4 && num1*count/num2+num4*count/num5 !== count && <div className="column center" >
                         <div className="center Green " style={{borderBottom:'2px solid green', width:'45px'}} >
                            {(num1*count/num2+num4*count/num5)%count}
                        </div>
                        <div className="Green" onClick={()=>setAdd(true)} >{count}</div>
                    </div>}
                </div>
            
            {before1 && <div className="center double" style={{paddingTop:'50px'}} >Lowest Common</div>}
            {before1 && <div className="center double">Multiple</div>}
            {before1 && <div className="center double">{num2} and {num5}</div>}
            {!done && !step2 && !step4 && !before1 && <div className=" double center Green absolute StepQuestion">{Q1} {sign} {Q2} = </div>}  
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

               {done && add && <div className='center wrap absolute StepAnswer' style={{width:'100%',top:"330px"}} >
                   <StepF whole={num1*count/num2+num4*count/num5 >= count ? 1+whole1+whole2 : whole1+whole2} value1 = {((num1*count/num2+num4*count/num5)%count)+arr[0]}  answer1={(num1*count/num2+num4*count/num5)%count} value2 = {count}  answer2={count}  Count ={Count} mistake={Nothing}/>
                   <StepF whole={num1*count/num2+num4*count/num5 >= count ? 1+whole1+whole2 : whole1+whole2} value1 = {((num1*count/num2+num4*count/num5)%count)+arr[2]}  answer1={(num1*count/num2+num4*count/num5)%count} value2 = {count}  answer2={count}  Count ={Count} mistake={Nothing}/>
                   <StepF whole={num1*count/num2+num4*count/num5 >= count ? 1+whole1+whole2 : whole1+whole2} value1 = {((num1*count/num2+num4*count/num5)%count)+arr[3]}  answer1={(num1*count/num2+num4*count/num5)%count} value2 = {count}  answer2={count}  Count ={Count} mistake={Nothing}/>
                   <StepF whole={num1*count/num2+num4*count/num5 >= count ? 1+whole1+whole2 : whole1+whole2} value1 = {((num1*count/num2+num4*count/num5)%count)+arr[1]}  answer1={(num1*count/num2+num4*count/num5)%count} value2 = {count}  answer2={count}  Count ={Count} mistake={Nothing}/>
                   {<button className="choice" style={{backgroundColor:'yellow',color:'black'}} onClick={()=>{setExtra(true);console.log(extra)}} >help</button>}
               </div>}
        </div>
    )
}