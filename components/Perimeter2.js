import { useEffect, useState } from "react"
import Step from "./step"
import HelpDiv from "@/components/PerfectDivision"
import HelpAdd from "@/components/HelpAdd"
import HelpTimes from "@/components/HelpTimes"
import StepTimes from "@/components/stepTimes"
import HelpMinus from "@/components/HelpMinus"
import StepAdd from "@/components/StepAdd"
import StepMinus from "@/components/StepMinus"

export default function Pm2({num1,num2,close}){
    const [done, setDone] = useState(false)
    const [extra, setExtra] = useState(false)
    const [Q1, setQ1] = useState(num1)
    const [Q2, setQ2] = useState(num2)
    const [sign ,setSign] = useState('+')
    const [answer, setAnswer] = useState(num1+num2)
    const [arr, setArr]=useState([0,Math.floor(Math.random()*1+2)+1,1,Math.floor(Math.random()*3)-4])
    const [step1, setStep1] = useState(true)

    function Extra(){
        setExtra(false)
   }

    useEffect(() => {
        setArr(prevChange => prevChange.sort((a,b)=>Math.random()-0.5)) 
    },[])

    function Count(){
        if(step1 === true){
            setQ1(num1+num2)
            setQ2(num1+num2-1)
            setSign('+')
            setAnswer(num1+num2+num1+num2-1)
            setStep1(false)
        }else{
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
               <div> 
                    <div className="double relative" style={{top:'50px',left:"3px",color:'white',zIndex:'10'}} >P =</div>
                    <div><div className="double" style={{borderBottom:"100px solid black",borderRight:'100px solid transparent',rotate:'120deg'}}></div>
                    <div className="relative center" style={{top:"-45px",fontSize:'20px'}} >{step1 ? num1+num2-1: <span className="Green" >{num1+num2-1}</span> }</div>
                    <div className="relative center Green" style={{top:"-140px",left:"30px",fontSize:'20px'}} >{ num2}</div>
                    <div className="relative center Green" style={{top:"-140px",left:"-55px",fontSize:'20px'}} >{ num1}</div>
                </div>
                </div>
               <div className="box" ></div>
               <div className="box"></div>
               {!done && <div className=" double center Green absolute StepQuestion">{Q1} {sign} {Q2} = </div>}  
               {!done &&<div className='center wrap absolute StepAnswer'>
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