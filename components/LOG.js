import { useEffect, useState } from "react"
import Step from "./step"
import HelpDiv from "@/components/PerfectDivision"
import HelpAdd from "@/components/HelpAdd"
import HelpTimes from "@/components/HelpTimes"
import StepTimes from "@/components/stepTimes"
import HelpMinus from "@/components/HelpMinus"
import StepAdd from "@/components/StepAdd"
import StepMinus from "@/components/StepMinus"

export default function Log({num1,num2,Answer,close}){
    const [done, setDone] = useState(false)
    const [extra, setExtra] = useState(false)
    const [Q1, setQ1] = useState(num1)
    const [Q2, setQ2] = useState(1)
    const [sign ,setSign] = useState('x')
    const [answer, setAnswer] = useState(num1)
    const [arr, setArr]=useState([0,Math.floor(Math.random()*1+2)+1,1,Math.floor(Math.random()*3)-4])
    const [step1, setStep1] = useState(true)
    const [count, setCount] = useState(0)

    function Extra(){
        setExtra(false)
   }

    useEffect(() => {
        setArr(prevChange => prevChange.sort((a,b)=>Math.random()-0.5)) 
    },[])

    function Count(){
        if(step1 === true){
            setQ1(num1)
            setQ2(num1)
            setSign('x')
            setAnswer(num1*num1)
            setStep1(false)
        }else{
            setQ1(answer)
            setQ2(num1)
            setSign('x')
            setAnswer(answer*num1)
            setStep1(false)
        }   
    }

    function Nothing(){}

    useEffect(()=>{
        setCount(count+1)
    },[answer])

    return (
        <div className="Help" style={{zIndex:'50'}}>
            {extra && sign === '+' && Q1 < 10 && Q2 < 10 && <HelpAdd close={Extra} num1 ={Q1} num2 = {Q2}/>}
            {extra && sign === '+' && (Q1 >= 10 || Q2 >= 10) && <StepAdd close={Extra} num1 ={Q1} num2 = {Q2}/>}
            {extra && sign === 'x' && Q1 < 10 && Q2 < 10 && <HelpTimes close={Extra} num1 ={Q1} num2 = {Q2}/>}
            {extra && sign === 'x' && (Q1 >= 10 || Q2 >= 10) && <StepTimes close={Extra} num1 ={Q1} num2 = {Q2}/>}
            {extra && sign === '-' && Q1 < 10 && Q2 < 10 && <HelpMinus close={Extra} num1 ={Q1} num2 = {Q2}/>}
            {extra && sign === '-' && (Q1 >= 10 || Q2 >= 10) && <StepMinus close={Extra} num1 ={Q1} num2 = {Q2}/>}
            {extra && sign === '÷' && <HelpDiv close={Extra} num1 ={Q1} num2 = {Q2}/>}
            <div className='cancel'><button className='cancel-btn' onClick = {close}>X</button></div>
            <div className="double center">log<span style={{fontSize:'20px',padding:'1px',position:'relative', top:"13px"}}>{num1}</span>{num2} = 𝑥 </div>
               <div className="double center" style={{padding:'40px 19px'}}>
                    {num1}<div style={{fontSize:'20px',position:'relative', top:"-13px",paddingRight:'2px'}}>𝑥 </div> = {num2} 
                </div>
                {!((count-1) >= Answer) ? <div className="double Red center" >𝑥  {'?'}  {count}</div> : <div className="double Green center" >𝑥  {'='}  {Answer}</div> } 
               <div className="box "></div>
               <br></br>
               {!((count-1) >= Answer) && <div className=" double center Green absolute StepQuestion">{Q1} {sign} {Q2} = </div>}  
               {!((count-1) >= Answer) && <div className='center wrap absolute StepAnswer'>
                   <Step value = {((answer))+arr[1]}  answer={(answer)} Count ={Count} done = {done} mistake={Nothing}/>
                   <Step value = {((answer))+arr[3]}  answer={(answer)} Count ={Count} done = {done} mistake={Nothing}/>
                   <Step value = {((answer))+arr[0]}  answer={(answer)} Count ={Count} done = {done} mistake={Nothing}/>
                   <button className="choice" style={{backgroundColor:'yellow',color:'black'}} onClick={()=>{setExtra(true);console.log(extra)}} >help</button>
                   <Step value = {((answer))+arr[2]}  answer={(answer)} Count ={Count} done = {done} mistake={Nothing}/>
                   <button className="choice red" onClick={close} >Close</button>
               </div>}

           
           
        </div>
    )
}