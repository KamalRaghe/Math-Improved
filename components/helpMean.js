import { use, useEffect, useState } from "react"
import Step from "./step"
import HelpAdd from "./HelpAdd"
import StepAdd from "./StepAdd"
import HelpDiv from "./PerfectDivision"

export default function HelpMean({num1,num2,num3,num4,num5,num8,close}){
    const [done,setDone] = useState(false)
    const [extra, setExtra] = useState(false)
    const [arr, setArr] = useState([0,Math.floor(Math.random()*1+2)+1,1,Math.floor(Math.random()*3)-4])
    const [step1, setStep1] = useState(true)
    const [step2, setStep2] = useState(false)
    const [step3, setStep3] = useState(false)
    const [step4, setStep4] = useState(false)
    const [step5, setStep5] = useState(false)
    const [step6, setStep6] = useState(false)
    const [green ,setGreen] = useState(false)
    const [sign, setSign] = useState('+')
    const [number1, setNumber1] = useState(num1)
    const [number2, setNumber2] = useState(num2)
    const [answer, setAnswer] = useState(number1+number2)
    function Nothing(){}
    function Count(){
        setArr(prevChange => prevChange.sort((a,b)=>Math.random()-0.5)) 
        if(step1 === true){
            setStep2(true)
            setStep1(false)
            setNumber1(num1+num2)
            setNumber2(num3)
            setAnswer(num1+num2+num3)
        }else if(step2 === true){
            setStep4(true)
            setStep2(false)
            setNumber1(num1+num2+num3)
            setNumber2(num4)
            setAnswer(num1+num2+num3+num4)
        }else if(step4 === true && num8 === 5){
            setStep5(true)
            setStep4(false)
            setNumber1(num1+num2+num3+num4)
            setNumber2(num5)
            setGreen(true)
            setAnswer(num1+num2+num3+num4+num5)
        }else if(step4 === true && num8 === 4){
            setStep5(true)
            setStep4(false)
            setNumber1(num1+num2+num3+num4)
            setNumber2(4)
            setSign('÷')
            setAnswer((num1+num2+num3+num4)/4)
        }else if(step5 === true && num8 === 5){
            setStep6(true)
            setStep5(false)
            setNumber1(num1+num2+num3+num4+num5)
            setNumber2(5)
            setSign('÷')
            setAnswer(((num1+num2+num3+num4+num5)/5))
        }else if(step5 === true && num8 === 4){
            close()
        }else if(step6 === true){
            close()
        }
        
    }

    function Extra(){
        setExtra(false)
    }

    useEffect(() => {
        setArr(prevChange => prevChange.sort((a,b)=>Math.random()-0.5)) 
    },[])

    return (
        <div className="Help">
            {extra && sign == '+' && number1 <= 9 && <HelpAdd close={Extra} num1 ={number1} num2 = {number2}/>}
            {extra && sign == '+' && number1 > 9 && <StepAdd close={Extra} num1 ={number1} num2 = {number2} />}
            {extra && sign === '÷' && <HelpDiv close={Extra} num1 ={number1} num2 = {number2}/>}
            <div className='cancel'><button className='cancel-btn' onClick = {close}>X</button></div>
            <div className="double center">
                {<span className="Green">{num1}<span className="hide" >.</span></span>}  
                {<span className="Green">{num2}<span className="hide" >.</span></span>} 
                {!step1 ? <span className="Green">{num3}<span className="hide" >.</span></span> :<span>{num3}<span className="hide" >.</span></span>} 
                {!step1 && !step2 ? <span className="Green">{num4}<span className="hide" >.</span></span> : <span>{num4}<span className="hide" >.</span></span>}
                {num8 === 5 && !green && num5} {num8 === 5 && green && <span className="Green">{num5}</span>} 
            </div> 
                
            <div className=" double center Green absolute StepQuestion">{number1} {sign} {number2} = </div>  
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