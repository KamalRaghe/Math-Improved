import Step from "@/components/step"
import StepF from "./fractionStep"
import { useEffect, useState } from "react"
import HelpTimes from "@/components/HelpTimes"
import StepTimes from "@/components/stepTimes"
import HelpMinus from "@/components/HelpMinus"
import StepMinus from "@/components/StepMinus"
import HelpDiv from "./PerfectDivision"
import HelpHcf from "./HelpHcf"
import LongDivisionHelp from "./longDivisionHelp"
import ShortDivisionHelp from "./shortDivison"

export default function Improper({num1,num2,whole,close}){  
    const [done,setDone] = useState(true)
    const [fraction,setFraction] = useState(false)
    const [Number,setNumber] = useState(false)
    const[count,setCount] = useState(1)
    const [extra, setExtra] = useState(false)
    const [arr, setArr] = useState([0,-1,1,Math.floor(Math.random()*3)-5])
    const [answer, setAnswers] = useState()
    const[Q1, setQ1] = useState() 
    const[Q2, setQ2] = useState(num2)
    const [sign, setSign] = useState('x')
    const [step1, setStep1] = useState(true) 
    const [step2, setStep2] = useState(false) 
    const [step3, setStep3] = useState(false) 
    const [step4, setStep4] = useState(false)
    const [step5, setStep5] = useState(false) 
    const [step6, setStep6] = useState(false) 
    const [big, setBig] = useState(false)
    const [small, setSmall] = useState(false)

    function Extra(){
        setExtra(false)
   }

    function Count(){
        setArr(prevChange => prevChange.sort((a,b)=>Math.random()-0.5))
        if(step1 === true && answer > whole*num2+num1){
            setBig(true)
            setTimeout(()=>{
                setBig(false)
            },2200)
            setTimeout(()=>{
                setDone(true)
            },2000)
         }
        if(step1 === true && answer < whole*num2+num1){
           setStep1(false)
           setStep2(true)
           setQ1(num2*whole+num1) 
           setQ2(Q1*Q2)
           setSign('-')
           setAnswers((whole*num2+num1)-(Q1*Q2)) 
        }if(step2 === true && Q1-Q2 >= num2 ){
            setStep2(false)
            setStep1(true)
            setSign('x')
            setQ2(num2) 
            setSmall(true)
            setTimeout(()=>{
                setSmall(false)
            },2200)
            setTimeout(()=>{
                setDone(true)
            },2000)
        }if(step2 === true && Q1-Q2 < num2 ){
            setStep2(false)
            setStep3(true)
            setFraction(count === 1)
            setDone(count === 1)
            setQ1(num1) 
            setQ2(num2)
            setSign('and')
            setAnswers(count)
        }if (step3 === true && done === true){
            close()
        }if (step3 === true && done !== true){
            setStep3(false)
            setStep4(true) 
            setQ1(num1) 
            setQ2(count)
            setSign('÷')
            setAnswers(num1/count)
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
            setFraction(true)
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
        <div className="Help" >
            {extra && sign === 'and' && <HelpHcf close={Extra} num1 ={Q1} num2 = {Q2}/>}
            {extra && sign === 'x' && <HelpTimes close={Extra} num1 ={Q2} num2 = {Q1}/>}
            {extra && sign === '-' && Q1 < 10 && Q2 < 10 && <HelpMinus close={Extra} num1 ={Q1} num2 = {Q2}/>}
            {extra && sign === '-' && (Q1 >= 10 || Q2 >= 10) && <StepMinus close={Extra} num1 ={Q1} num2 = {Q2}/>}
            {extra && sign === '÷' && Q1 <= Q2*9 && <HelpDiv close={Extra} num1 ={Q1} num2 = {Q2}/>}
            {extra && sign === '÷' && Q1 > 99 && Q2 < 10  && <LongDivisionHelp close={Extra} num1 ={Q2} num2 = {Q1}/>}
            {extra && sign === '÷' && Q1 > 99 && Q2 >= 10  && <ShortDivisionHelp close={Extra} num1 ={Q2} num2 = {Q1}/>}
            {extra && sign === '÷' && Q1 < 100 && Q2 < 10  && <ShortDivisionHelp close={Extra} num1 ={Q2} num2 = {Q1}/>}
            <div className='cancel'><button className='cancel-btn' onClick = {close}>X</button></div>
            <div className=" double center"><div style={{padding:'3px'}} >{!step1 && !step2 && whole}{step2 && Number}</div>
                    <div className="column center" >
                        {step1 && <div className="center" style={{borderBottom:'2px solid black', width:'45px'}} >
                            {whole*num2+num1}
                        </div>}
                        {step2 && <div className="center" style={{borderBottom:'2px solid black', width:'170px'}} >
                           {whole*num2+num1}  - {Q2}
                        </div>}
                        {step3 && <div className="center" style={{borderBottom:'2px solid black', width:'60px'}} >
                           {num1}
                        </div>}
                        {step4 && <div className="center" style={{borderBottom:'2px solid black', width:'130px'}} >
                           {num1} ÷ {count}
                        </div>}
                        {(step5 || step6) && <div className="center" style={{borderBottom:'2px solid black', width:'60px'}} >
                           {(num1)/count}
                        </div>}
                        {!step4 && !step5 && !step6 && num2}{(step4 || step5) && <div>{num2} ÷ {count}</div>}
                        {step6 && num2/count}
                        
                    </div>
                    {big && <div className="double center absolute Pop Red " style={{top:"200px",left:'100px', fontSize:"60px"}}>Too big</div>}
                    {small && <div className="double center absolute Pop Red " style={{top:"200px",left:'100px', fontSize:"60px"}}>Too Small</div>}
                </div>
                

                {!done && sign === 'and' && <div className=" double center" style={{paddingTop:'20px'}}  >Highest common </div>}
                {!done && sign === 'and' && <div className=" double center" >factor of</div>}
                {!done && sign === 'and' && <div className=" double center" >{Q1} and {Q2} </div>}
                {!done && sign !== 'and' && <div className=" double center Green absolute StepQuestion">{Q1} {sign} {Q2} = </div>}   
                
                    {done && !fraction && <div style={{display:'flex', justifyContent:'center', alignItems:'end', height:'200px'  }}>
                        <button className="choice-stretch" onClick = {() => {setDone(false);setNumber(1);setQ1(1);setAnswers(1*Q2) }}>{1}</button>
                        <button className="choice-stretch" onClick = {() => {setDone(false);setNumber(2);setQ1(2);setAnswers(2*Q2) }}>{2}</button>
                        <button className="choice-stretch" onClick = {() => {setDone(false);setNumber(3);setQ1(3);setAnswers(3*Q2) }}>{3}</button>
                   </div>} {done && !fraction && <div style={{display:'flex', justifyContent:'center', alignItems:'end'}}>
                        <button className="choice-stretch" onClick = {() => {setDone(false);setNumber(4);setQ1(4);setAnswers(4*Q2) }}>{4}</button>
                        <button className="choice-stretch" onClick = {() => {setDone(false);setNumber(5);setQ1(5);setAnswers(5*Q2) }}>{5}</button>
                        <button className="choice-stretch" onClick = {() => {setDone(false);setNumber(6);setQ1(6);setAnswers(6*Q2) }}>{6}</button>
                   </div>}{done && !fraction && <div style={{display:'flex', justifyContent:'center', alignItems:'end'}}>
                        <button className="choice-stretch" onClick = {() => {setDone(false);setNumber(7);setQ1(7);setAnswers(7*Q2) }}>{7}</button>
                        <button className="choice-stretch" onClick = {() => {setDone(false);setNumber(8);setQ1(8);setAnswers(8*Q2) }}>{8}</button>
                        <button className="choice-stretch" onClick = {() => {setDone(false);setNumber(9);setQ1(9);setAnswers(9*Q2) }}>{9}</button>
                   </div>}

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
               {fraction && (whole+arr[0] >= 10 || whole+arr[1] >= 10 || whole+arr[2] >= 10 || whole+arr[3] >= 10 ) &&
               <div className='center wrap absolute' style={{top:'330px',width:'100%'}} >
                   <StepF  whole2={1} whole={whole+arr[0]} value1 = {num1+arr[0]}  answer1={num1} value2 = {num2}  answer2={num2}  Count ={Count} mistake={Nothing}/>
                   <StepF  whole2={1} whole={whole+arr[2]} value1 = {num1+arr[2]}  answer1={num1} value2 = {num2}  answer2={num2}  Count ={Count} mistake={Nothing}/>
                   <StepF  whole2={1} whole={whole+arr[3]} value1 = {num1+arr[3]}  answer1={num1} value2 = {num2}  answer2={num2}  Count ={Count} mistake={Nothing}/>
                   <StepF  whole2={1} whole={whole+arr[1]} value1 = {num1+arr[1]}  answer1={num1} value2 = {num2}  answer2={num2}  Count ={Count} mistake={Nothing}/>
               </div>}
               {fraction && !(whole+arr[0] >= 10 || whole+arr[1] >= 10 || whole+arr[2] >= 10 || whole+arr[3] >= 10 ) &&
               <div className='center wrap relative' style={{width:'100%',top:'140px'}} >
                   <StepF  whole2={1} whole={whole+arr[0]} value1 = {num1+arr[0]}  answer1={num1} value2 = {num2}  answer2={num2}  Count ={Count} mistake={Nothing}/>
                   <StepF  whole2={1} whole={whole+arr[2]} value1 = {num1+arr[2]}  answer1={num1} value2 = {num2}  answer2={num2}  Count ={Count} mistake={Nothing}/>
                   <StepF  whole2={1} whole={whole+arr[3]} value1 = {num1+arr[3]}  answer1={num1} value2 = {num2}  answer2={num2}  Count ={Count} mistake={Nothing}/>
                   <StepF  whole2={1} whole={whole+arr[1]} value1 = {num1+arr[1]}  answer1={num1} value2 = {num2}  answer2={num2}  Count ={Count} mistake={Nothing}/>
               </div>}
        </div>
    )
}