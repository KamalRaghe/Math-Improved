import Step from "@/components/step"
import { useEffect, useState } from "react"
import HelpDiv from "@/components/PerfectDivision"
import HelpAdd from "@/components/HelpAdd"
import HelpTimes from "@/components/HelpTimes"
import StepTimes from "@/components/stepTimes"
import HelpMinus from "@/components/HelpMinus"
import StepAdd from "@/components/StepAdd"
import StepMinus from "@/components/StepMinus"
import helpSquareRoots from "@/components/helpSquareRoots"
import HelpSquare from "@/components/helpSquareRoots"

export default function Quad({num1,num2,close}){  
    const [done,setDone] = useState(false)
    const [length, setLength] =useState('200px')
    const [almost, setAlmost] = useState(true)
    const [nearly, setNearly] = useState(false)
    const [split, setSpilt] = useState(false)
    const [extra, setExtra] = useState(false)
    const [arr, setArr] = useState([0,Math.floor(Math.random()*1+2)+1,1,Math.floor(Math.random()*3)-4])
    const [answer, setAnswers] = useState(num1+num2)
    const[Q1, setQ1] = useState(num1+num2) 
    const[Q2, setQ2] = useState(num2+num1)
    const [sign, setSign] = useState('x')
    const[Q3, setQ3] = useState(-1*(num1+num2)) 
    const[Q4, setQ4] = useState(Math.sqrt(((num1+num2)*(num2+num1))-(4*num1*num2)))
    const [sign2, setSign2] = useState('+')
    const [count, setCount] = useState([])
    const [count1, setCount1] = useState([])
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
    const [a, setA] = useState(false)
    const [b, setB] = useState(true)
    const [c, setC] = useState(false)
    const [c1, setC1] = useState(<div className="Green carry">b</div>)
    const [c2, setC2] = useState('b')
    const [c3, setC3] = useState('a')
    const [c4, setC4] = useState('c')
    const [c5, setC5] = useState('a')
    const [times, stepTimes] = useState(1)

    function Extra(){
        setExtra(false)
   }

    function Count(){
        setArr(prevChange => prevChange.sort((a,b)=>Math.random()-0.5))
        if(step1 === true){
            setStep1(false)
            setC1(num1+num2)
            setC2(<div className="Green carry">b</div>)
            setStep2(true)
        }if(step2 === true){
            setStep3(true)
            setStep2(false)
            setC2(num1+num2)
            setC3(<div className="Green carry">a</div>)
            setA(true)
            setB(false)
            setAnswers(1)
        }if(step3 === true){
            setStep4(true)
            setStep3(false)
            setC3(<div>(1)</div>)
            setC4(<div className="Green carry">c</div>)
            setC(true)
            setA(false)
            setAnswers(num1*num2)
            
        }if(step4 === true){
            setStep5(true)
            setStep4(false)
            setC4(<div>({num1*num2})</div>)
            setC5(<div className="Green carry">a</div>)
            setA(true)
            setC(false)
            setAnswers(1)
            setLength('230px')
        }if(step5 === true){
            setAlmost(false)
            setC5(<div>(1)</div>)
            setStep5(false)
            setStep6(true)
            setAnswers((num1+num2)*(num2+num1))
        }if(step6 === true){
            setStep6(false)
            setStep7(true)
            setQ1(4)
            setQ2(1)
            setAnswers(4)
            setC2((num1+num2)*(num2+num1))
        }if(step7 === true){
            setStep7(false)
            setStep8(true)
            setQ1(4)
            setQ2(num1*num2)
            setAnswers(4*num1*num2)
            setC3()
            setLength('230px')
        }if(step8 === true){
            setStep8(false)
            setStep9(true)
            setQ1(2)
            setQ2(1)
            setAnswers(2)
            setC4()
            stepTimes((num2*num1))
        }if(step9 === true){
            setStep9(false)
            setStep10(true)
            setSign('-')
            setQ1((num1+num2)*(num2+num1))
            setQ2(4*num1*num2)
            setAnswers(((num1+num2)*(num2+num1))-(4*num1*num2))
            setC5()
        }if(step10 === true){
            setStep10(false)
            setStep11(true)
            setNearly(true)
            setAlmost(true)
            setSign('s')
            setAnswers(Math.sqrt(answer))
        }if(step11 === true){
            setSpilt(true)
            setQ1(num1+num2)
            setQ2(answer)
            setSign('-')
            setAnswers(-1*(num1+num2-answer))
        }if(step12 === true){
            setStep12(false)
            setStep13(true)
            setQ1(-1*answer)
            setQ2(2)
            setSign('÷')
            setSign2('÷')
            setQ3(answer)
            setQ4(2)
            setAnswers(answer/2)
        }if(step13 === true){
            setStep13(false)
            setStep14(true)
            setQ1(c1)
            setQ2(Math.sqrt(((num1+num2)*(num2+num1))-(4*num1*num2)))
            setSign('+')
            setSign2('-')
            setQ3(-1*c1)
            setQ4((Math.sqrt(((num1+num2)*(num2+num1))-(4*num1*num2))))
            setAnswers(-1*(Math.sqrt(((num1+num2)*(num2+num1))-(4*num1*num2))+c1))
        }if(step14 === true){
            setStep14(false)
            setStep15(true)
            setQ1(-1*answer)
            setQ2(2)
            setSign('÷')
            setSign2('÷')
            setQ3(answer)
            setQ4(2)
            setAnswers(answer/2)
        }if(step15 === true){
            setStep15(false)
            setDone(true)
        }
    }
    useEffect(()=>{
        setArr(prevChange => prevChange.sort((a,b)=>Math.random()-0.5))
        for(let i = 1; i <= num1*num2 ; i++){
            if(num1*num2 % i === 0){
              setCount(prev => [...prev, i ])
            }
        } 
     },[])

     useEffect(()=>{
        console.log(count)
        setExtra(false)
     },[Q2])

     useEffect(() => {

        if(count[Math.floor(count.length/2)] === 1){
          for(let i = 0; i < count.length/4; i++){
            setCount1(prev => [...prev, count[i]])
        }
        }else{
          for(let i = 0; i < (count.length/2); i++){
            setCount1(prev => [...prev, count[i] ])
        }
        }
    
      },[count])
      
    function Nothing(){}
    return (
        <div className="Help">
            {extra && sign === '+' && Q1 < 10 && Q2 < 10 && <HelpAdd close={Extra} num1 ={Q1} num2 = {Q2}/>}
            {extra && sign === '+' && (Q1 >= 10 || Q2 >= 10) && <StepAdd close={Extra} num1 ={Q1} num2 = {Q2}/>}
            {extra && !step1 && sign === 'x' && Q1 < 10 && Q2 < 10 && <HelpTimes close={Extra} num1 ={Q1} num2 = {Q2}/>}
            {extra && sign === 'x' && (Q1 >= 10 || Q2 >= 10) && <StepTimes close={Extra} num1 ={Q1} num2 = {Q2}/>}
            {extra && sign === '-' && Q1 < 10 && Q2 < 10 && <HelpMinus close={Extra} num1 ={Q1} num2 = {Q2}/>}
            {extra && sign === '-' && (Q1 >= 10 || Q2 >= 10) && <StepMinus close={Extra} num1 ={Q1} num2 = {Q2}/>}
            {extra && sign === '÷' && <HelpDiv close={Extra} num1 ={Q1} num2 = {Q2}/>}
            {extra && sign === 's' && <HelpSquare close={Extra} num1 ={Q1} num2 = {Q2}/>}
            <div className='cancel '><button className='cancel-btn' onClick = {close}>X</button></div>
            { done && <div className="double center" >𝑥<span style={{fontSize:'20px',position:'relative',padding:"2px", top:"-13px",paddingLeft:"2px",paddingRight:"5px"}}>2</span>
                    + {num1+num2}𝑥 + {num1*num2} = 0
                </div>}

                {almost && !nearly && <div className="double center" >{a && <div className=" carry Green" >1</div>}𝑥<span style={{fontSize:'20px',position:'relative',padding:"2px", top:"-13px",paddingLeft:"2px",paddingRight:"5px"}}>2</span>
                    + {b ?<div className=" carry Green" style={{paddingLeft:"3px"}}> {num1+num2}</div>:`${num1+num2}`}𝑥 + {c ?<div className=" carry Green" style={{paddingLeft:"2px"}}> {num1*num2}</div>:`${num1*num2}`} = 0
                </div>}
                {almost && !nearly && <br></br>}
                {almost && !nearly && <div className="double center" >{a ? <div className=" carry Green" >a</div>:'a'}𝑥<span style={{fontSize:'20px',position:'relative',padding:"2px", top:"-13px",paddingLeft:"2px",paddingRight:"5px"}}>2</span>
                     {b ? <div className="Green center">+ <span className="carry" >b</span></div>:'+ b'}𝑥 + {c ? <div className=" carry Green" >c</div>:'c'}
                </div>}
                
                {!almost && !nearly && <div className=" Gone absolute double center" style={{left:"70px"}} >{a && <div className="Green" >1</div>}𝑥<span style={{fontSize:'20px',position:'relative',padding:"2px", top:"-13px",paddingLeft:"2px",paddingRight:"5px"}}>2</span>
                    + {b ?<div className="Green" style={{paddingLeft:"3px"}}> {num1+num2}</div>:`${num1+num2}`}𝑥 + {c ?<div className="Green" style={{paddingLeft:"2px"}}> {num1*num2}</div>:`${num1*num2}`}
                </div>}
                {!almost && !nearly && <br></br>}
                {!almost && !nearly && <div className="Gone absolute double center"style={{left:"85px", top:'170px'}} >{a ? <div className="Green" >a</div>:'a'}𝑥<span style={{fontSize:'20px',position:'relative',padding:"2px", top:"-13px",paddingLeft:"2px",paddingRight:"5px"}}>2</span>
                     {b ? <div className="Green">+ b</div>:'+ b'}𝑥 + {c ? <div className="Green" >c</div>:'c'}
                </div>}
                {almost && !nearly && <br></br>}
                {almost && !nearly && <br></br>}
                { almost && !nearly && <div className="center" style={{fontSize:"30px"}}>
                    -{c1}<div style={{paddingRight:"30px",fontSize:"30px",paddingLeft:"10px"}} >±</div>
                    <div className="center root-top" style={{fontSize:"30px",paddingTop:"2px"}} ><span className="root-tip" style={{left:'-16px'}}></span><span className="root-right" style={{left:'-6px'}} ></span><span className="root-left" style={{left:'-14px'}}></span>
                    {c2}<span style={{fontSize:'20px',position:'relative',padding:"2px", top:"-13px",paddingLeft:"2px",paddingRight:"5px"}}>2</span> - 4{c3}{c4}</div>
                </div>}
                {almost && !nearly && <div className="center"><div className="center" style={{fontSize:"30px",borderTop:"2px solid",width:length}} >2{c5}</div></div>}
                {!almost && !nearly && <div className="center relative MoveUp" style={{top:"-20px",fontSize:"30px"}}>
                    -{c1}<div style={{paddingRight:"30px",paddingLeft:"10px"}} >±</div>
                    <div className=" center root-top" style={{paddingTop:"2px"}}><span className="root-tip" style={{left:'-16px'}}></span><span className="root-right" style={{left:'-6px'}} ></span><span className="root-left" style={{left:'-14px'}}></span>
                    {(!(c2 === (num1+num2)*(num1+num2))|| step10) ?<div className="Green">{c2}</div>: c2}{!(c2 === (num1+num2)*(num1+num2))  && <span className="Green" style={{fontSize:'20px',position:'relative',padding:"2px", top:"-13px",paddingLeft:"2px",paddingRight:"5px"}}>2</span>} - {(((c2 === (num1+num2)*(num1+num2)) && times === 1) || step10 )? <div className="Green" >{4*times}</div>:4*times}{Q2 === 1 ? <div className="Green" >{c3}</div> : c3}{Q2 === num1*num2 ? <div className="Green" >{c4}</div> :c4}</div>
                </div>}
                {!almost && !nearly && <div className="center MoveUp relative" style={{top:"-20px"}} ><div className="center " style={{fontSize:"30px",borderTop:"2px solid",width:length}} >{step9 ? <div className="Green" >2</div> : 2}{step9 ? <div className="Green" >{c5}</div> : c5}</div></div>}

                {nearly && !split && <div className="center relative double" style={{top:"-20px"}}>
                    -{c1}<div style={{paddingRight:"30px",paddingLeft:"10px"}} >±</div>
                    <div className="double Green center root-top"><span className="root-tip" style={{left:'-16px'}}></span><span className="root-right" style={{left:'-6px'}} ></span><span className="root-left" style={{left:'-14px'}}></span>
                        {((num1+num2)*(num2+num1))-(4*num1*num2)}
                    </div>
                </div>}
                {nearly && !split && <div className="center relative" style={{top:"-20px"}} ><div className="center double" style={{borderTop:"2px solid",width:'150px'}} >2</div></div>}
 
                {split && !done && <div className="center relative double" style={{top:"-20px",left:"30px"}}>
                   -{c1}<div style={{paddingRight:"10px",paddingLeft:"10px"}} >{ step11 ? <button className="carry Green" onClick={()=>{setStep11(false);setStep12(true)}} >±</button> :<div>±</div>}</div>
                    {Math.sqrt(((num1+num2)*(num2+num1))-(4*num1*num2))}
                </div>}
                {split && !done && <div className="center relative" style={{top:"-20px",left:"30px"}} ><div className="center double" style={{borderTop:"2px solid",width:'150px'}} >2</div></div>}
                {split && !done && <div className="relative double" style={{top:'-90px',left:"65px"}} >𝑥 =</div>}

                {split && done && <div className="center relative double" style={{top:"30px",left:"30px"}}>
                   -{c1}<div style={{paddingRight:"10px",paddingLeft:"10px"}} >{ step11 ? <button className="carry Green" onClick={()=>{setStep11(false);setStep12(true)}} >±</button> :<div>±</div>}</div>
                    {Math.sqrt(((num1+num2)*(num2+num1))-(4*num1*num2))}
                </div>}
                {split && done && <div className="center relative" style={{top:"30px",left:"30px"}} ><div className="center double" style={{borderTop:"2px solid",width:'150px'}} >2</div></div>}
                {split && done && <div className="relative double" style={{top:'-40px',left:"65px"}} >𝑥 =</div>}

                {step12 && <div className="center relative double Green" style={{top:"-50px",left:"30px"}}>
                   -{c1}<div style={{paddingRight:"10px",paddingLeft:"10px"}} >+</div>
                    {Math.sqrt(((num1+num2)*(num2+num1))-(4*num1*num2))}
                </div>}
                {step12 && <div className="center relative" style={{top:"-50px",left:"30px"}} ><div className="center double" style={{borderTop:"2px solid",width:'150px'}} >2</div></div>}
                {step12 && <div className="relative double" style={{top:'-120px',left:"65px"}} >𝑥 =</div>}

                {step13 && <div className="center relative Green double" style={{top:"-50px",left:"-15px"}}>
                   {-c1+Math.sqrt(((num1+num2)*(num2+num1))-(4*num1*num2))}
                </div>}
                {step13 && <div className="center relative Green" style={{top:"-50px",left:"-10px"}} ><div className="center double" style={{borderTop:"2px solid",width:'50px'}} >2</div></div>}
                {step13 && <div className="relative double" style={{top:'-120px',left:"65px"}} >𝑥 =</div>}

                {step14 && <div className="center relative double Green" style={{top:"-50px",left:"30px"}}>
                   -{c1}<div style={{paddingRight:"10px",paddingLeft:"10px"}} >-</div>
                    {Math.sqrt(((num1+num2)*(num2+num1))-(4*num1*num2))}
                </div>}
                {step14 && <div className="center relative" style={{top:"-50px",left:"30px"}} ><div className="center double" style={{borderTop:"2px solid",width:'150px'}} >2</div></div>}
                {step14 && <div className="relative double" style={{top:'-120px',left:"65px"}} >𝑥 =</div>}

                {step15 && <div className="center relative double Green" style={{top:"-50px",left:"-15px"}}>
                   {-c1-Math.sqrt(((num1+num2)*(num2+num1))-(4*num1*num2))}
                </div>}
                {step15 && <div className="center relative Green" style={{top:"-50px",left:"-10px"}} ><div className="center double" style={{borderTop:"2px solid",width:'50px'}} >2</div></div>}
                {step15 && <div className="relative double" style={{top:'-120px',left:"65px"}} >𝑥 =</div>}
                
                {done && <div className="Green center double" >𝑥 = {-1*num1} or 𝑥 = {-1*num2}</div>}

            {(step12 || step13 || step14) && <div className=" double center Green absolute StepQuestion">{Q3} {sign2} {Q4} = </div>}
            {!done && !almost && <div className=" double center Green absolute StepQuestion">{Q1} {sign} {Q2} = </div>}
               {!done  && !(step11 && sign !== 's') &&<div className='center wrap absolute StepAnswer'>
                   <Step value = {(answer+arr[0])}  answer={answer} Count ={Count} done = {done} mistake={Nothing}/>
                   <Step value = {(answer+arr[2])}  answer={answer} Count ={Count} done = {done} mistake={Nothing}/>
                   <Step value = {(answer+arr[3])}  answer={answer} Count ={Count} done = {done} mistake={Nothing}/>
                   {(!almost || step11 || step12 || step13 || step14 || step15) && <button className="choice" style={{backgroundColor:'yellow',color:'black'}} onClick={()=>{setExtra(true);console.log(extra)}} >help</button>}
                   <Step value = {(answer+arr[1])}  answer={answer} Count ={Count} done = {done} mistake={Nothing}/>
                   {(!almost || step11 || step12 || step13 || step14 || step15) && <button className="choice red" onClick={close} >Close</button>}
               </div>}
        </div>
    )
}