import { useEffect, useState } from "react"
import Step from "./step"
import HelpDiv from "@/components/PerfectDivision"
import HelpAdd from "@/components/HelpAdd"
import HelpTimes from "@/components/HelpTimes"
import StepTimes from "@/components/stepTimes"
import HelpMinus from "@/components/HelpMinus"
import StepAdd from "@/components/StepAdd"
import StepMinus from "@/components/StepMinus"

export default function Area4({num1,num2,close}){
    const [done, setDone] = useState(true)
    const [extra, setExtra] = useState(false)
    const [step1, setStep1] = useState(true)
    const [step2, setStep2] = useState(false)
    const [step3, setStep3] = useState(false)
    const [pi, setPi] = useState(true)
    const [Q1, setQ1] = useState(num1)
    const [Q2, setQ2] = useState(num1)
    const [sign ,setSign] = useState('x')
    const [answer, setAnswer] = useState(num1*num1)
    const [arr, setArr]=useState([0,Math.floor(Math.random()*1+2)+1,1,Math.floor(Math.random()*3)-4])

    function Extra(){
        setExtra(false)
   }

    useEffect(() => {
        setArr(prevChange => prevChange.sort((a,b)=>Math.random()-0.5)) 
    },[])

    function Count(){
        if(step1 === true){
            setStep1(false)
            setStep2(true)
            setQ1(num1*num1)
            setQ2('π')
            setAnswer(num1*num1)
            setSign('x')
        }else if(step2 === true){
            close()
        }
    }

    function Nothing(){}

    return (
        <div className="Help center column" style={{zIndex:'50'}}>
             {extra && sign === '+' && Q1 < 10 && Q2 < 10 && <HelpAdd close={Extra} num1 ={Q1} num2 = {Q2}/>}
            {extra && sign === '+' && (Q1 >= 10 || Q2 >= 10) && <StepAdd close={Extra} num1 ={Q1} num2 = {Q2}/>}
            {extra && sign === 'x' && Q1 < 10 && Q2 < 10 && <HelpTimes close={Extra} num1 ={Q1} num2 = {Q2}/>}
            {extra && sign === 'x' && (Q1 >= 10 || Q2 >= 10) && <StepTimes close={Extra} num1 ={Q1} num2 = {Q2}/>}
            {extra && sign === '-' && Q1 < 10 && Q2 < 10 && <HelpMinus close={Extra} num1 ={Q1} num2 = {Q2}/>}
            {extra && sign === '-' && (Q1 >= 10 || Q2 >= 10) && <StepMinus close={Extra} num1 ={Q1} num2 = {Q2}/>}
            {extra && sign === '÷' && <HelpDiv close={Extra} num1 ={Q1} num2 = {Q2}/>}
            <button className=" absolute choice red"  style={{top:'0',left:'0px'}} onClick={close}>Close</button>
            <div className="double center" style={{display:'flex',justifyContent:'end',alignItems:'center',width:'100px', height:"100px",border:"3px solid black",backgroundColor:'black', borderRadius:"50%"}}>
                    <div className="relative center" style={{top:'-10px',fontSize:'20px',width:'50%',color:"white",borderBottom:"2px solid white"}} >{num1}</div>
                </div>
               <div className="double center" style={{width:"100%"}}>
                A = π {pi ? <button className="carry Green" onClick={()=>{setPi(false);setDone(false)}} >r<span style={{fontSize:'20px',position:'relative', top:"-18px"}}>2</span></button>:num1}{!pi && <span style={{fontSize:'20px',position:'relative', top:"-13px"}}>2</span>}
                </div>

               <div className="box"></div>
               {!done && !pi && <div className=" double center Green absolute StepQuestion">{Q1} {sign} {Q2} = </div>}  
               {!done && !pi &&<div className='center wrap absolute StepAnswer'>
                   <Step value = {step2 ? answer+arr[1]+'π':(answer)+arr[1]}  answer={step2 ? answer+'π': answer} Count ={Count} done = {done} mistake={Nothing}/>
                   <Step value = {step2 ? answer+arr[3]+'π':(answer)+arr[3]}  answer={step2 ? answer+'π': answer} Count ={Count} done = {done} mistake={Nothing}/>
                   <Step value = {step2 ? answer+arr[0]+'π':(answer)+arr[0]}  answer={step2 ? answer+'π': answer} Count ={Count} done = {done} mistake={Nothing}/>
                   <button className="choice" style={{backgroundColor:'yellow',color:'black'}} onClick={()=>{setExtra(true);console.log(extra)}} >help</button>
                   <Step value = {step2 ? answer+arr[2]+'π':(answer)+arr[2]}  answer={step2 ? answer+'π': answer} Count ={Count} done = {done} mistake={Nothing}/>
                   <button className="choice red" onClick={close} >Close</button>
               </div>}

           
           
        </div>
    )
}