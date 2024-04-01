import { use, useEffect, useState } from "react"
import Step from "./step"
import HelpMinus from "./HelpAdd"
import StepMinus from "./StepMinus"
import HelpTimes from "./HelpTimes"
import StepTimes from "./stepTimes"

export default function HelpDiv({num1,num2,close}){
    const [done,setDone] = useState(true)
    const [number4 ,setNumber4] = useState(0)
    const [extra, setExtra] = useState(false)
    const [arr, setArr] = useState([0,Math.floor(Math.random()*1+2)+1,1,Math.floor(Math.random()*3)-4])
    const [step1, setStep1] = useState(true)
    const [step2, setStep2] = useState(false)
    const [step3, setStep3] = useState(false)
    const [step4, setStep4] = useState(false)
    const [step5, setStep5] = useState(false)
    const [step6, setStep6] = useState(false)
    const [green ,setGreen] = useState(false)
    const [sign, setSign] = useState('x')
    const [number1, setNumber1] = useState(number4)
    const [number2, setNumber2] = useState(num2)
    const [answer, setAnswer] = useState(number1+number2)
    const [big, setBig] = useState(false)
    const [small, setSmall] = useState(false)

    function Nothing(){}
    
    function Small(){
        setSmall(true)
        setTimeout(()=>{
            setSign('x')
            setNumber2(num2)
            setSmall(false)
            setStep1(true)
            setStep2(false)
        },2000)
        setTimeout(()=>{
            setDone(true)
        },2000)
    }

    function Count(){
        setArr(prevChange => prevChange.sort((a,b)=>Math.random()-0.5)) 
        if(step2 === false && answer > num1){
            setBig(true)
                setTimeout(()=>{
            setBig(false)
            },2000)
            setTimeout(()=>{
                setDone(true)
            },2000)
        }if(step2 === false && answer <= num1){
            setSign('-')
            setNumber1(num1)
            setNumber2(num2*number4)
            setAnswer(num1-(num2*number1))
            setStep2(true)
        }if (step2 === true){
            setDone(true)
            setStep1(false)
        }
    }

    function Extra(){
        setExtra(false)
    }

    useEffect(() => {
        setArr(prevChange => prevChange.sort((a,b)=>Math.random()-0.5)) 
    },[])

    useEffect(()=>{
        if(done === false){
        setNumber1(number4)
        setAnswer(number4*num2)
    }
    },[done])

    return (
        <div className="Help" style={{border:'10px solid yellow'}} >
            {extra && sign == '-' && number1 <= 9 && <HelpMinus close={Extra} num1 ={number1} num2 = {number2}/>}
            {extra && sign == '-' && number1 > 9 && <StepMinus close={Extra} num1 ={number1} num2 = {number2} />}
            {extra && sign == 'x' && <HelpTimes close={Extra} num1 ={number2} num2 = {number1}/>}
            
            <div className='cancel'><button className='cancel-btn' onClick = {close}>X</button></div>
            <div className="double center column">
                <div>{num1} ÷ {num2} = {!step1 && answer == 0 && <button className="carry Green" onClick={close} >{num1/num2}</button>}</div>
                {sign === '-'&& !(!step1 && answer == 0) && <div>{num1} - {number4*num2} = {!step1 && answer > 0 && <button className="carry Red" onClick={Small} >{answer}</button> }{!step1 && answer === 0 && answer } </div>}
            </div> 
            {small && <div className=" center Red double Pop">Too Small</div>}    
            {big && <div className=" center Red double Pop">Too big</div>}    
            {done && step1 && <div style={{display:'flex', justifyContent:'center', alignItems:'end', height:'250px'  }}>
                        <button className="choice-stretch" onClick = {() => {setDone(false);setNumber4(1) }}>{1}</button>
                        <button className="choice-stretch" onClick = {() => {setDone(false);setNumber4(2) }}>{2}</button>
                        <button className="choice-stretch" onClick = {() => {setDone(false);setNumber4(3) }}>{3}</button>
                   </div>} {done && step1 && <div style={{display:'flex', justifyContent:'center', alignItems:'end'}}>
                        <button className="choice-stretch" onClick = {() => {setDone(false);setNumber4(4) }}>{4}</button>
                        <button className="choice-stretch" onClick = {() => {setDone(false);setNumber4(5) }}>{5}</button>
                        <button className="choice-stretch" onClick = {() => {setDone(false);setNumber4(6) }}>{6}</button>
                   </div>}{done && step1 && <div style={{display:'flex', justifyContent:'center', alignItems:'end'}}>
                        <button className="choice-stretch" onClick = {() => {setDone(false);setNumber4(7) }}>{7}</button>
                        <button className="choice-stretch" onClick = {() => {setDone(false);setNumber4(8) }}>{8}</button>
                        <button className="choice-stretch" onClick = {() => {setDone(false);setNumber4(9) }}>{9}</button>
                   </div>}    
            {!done && <div className=" double center Green absolute StepQuestion">{number1} {sign} {number2} = </div>}  
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