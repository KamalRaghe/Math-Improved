import Step from "@/components/step"
import { useEffect, useState } from "react"
import HelpDiv from "@/components/PerfectDivision"
import HelpAdd from "@/components/HelpAdd"
import HelpTimes from "@/components/HelpTimes"
import StepTimes from "@/components/stepTimes"
import HelpMinus from "@/components/HelpMinus"
import StepAdd from "@/components/StepAdd"
import StepMinus from "@/components/StepMinus"

export default function Foil1({num1,num2,close}){  
    const [done,setDone] = useState(false)
    const [extra, setExtra] = useState(false)
    const [arr, setArr] = useState([0,Math.floor(Math.random()*1+2)+1,1,Math.floor(Math.random()*3)-4])
    const [answer, setAnswers] = useState(<div>𝑥<span style={{fontSize:'13px',position:'relative',padding:"2px", top:"-5px"}}>2</span></div>)
    const[Q1, setQ1] = useState(num1) 
    const[Q2, setQ2] = useState(num2)
    const [sign, setSign] = useState('*')
    const [step1, setStep1] = useState(true) 
    const [step2, setStep2] = useState(false) 
    const [step3, setStep3] = useState(false) 
    const [step4, setStep4] = useState(false)
    const [step5, setStep5] = useState(false)
    const [Green1,setGreen1] = useState('Green') 
    const [Green2,setGreen2] = useState('') 
    const [Green3,setGreen3] = useState('Green') 
    const [Green4,setGreen4] = useState('')  
    const [Green5,setGreen5] = useState('')  

    function Extra(){
        setExtra(false)
   }

    function Count(){
        setArr(prevChange => prevChange.sort((a,b)=>Math.random()-0.5))
        if(step1 === true){
            setStep1(false)
            setStep2(true)
            setGreen4('Green')
            setGreen3('')
            setQ1('𝑥')
            setQ2(num2)
            setAnswers(num2)
        }if(step2 === true){
            setStep2(false)
            setStep3(true)
            setGreen2('Green')
            setGreen1('')
            setGreen3('Green')
            setGreen4('')
            setQ1('𝑥')
            setQ2(-1*num1)
            setAnswers(-1*num1)
        }if(step3 === true){
            setStep3(false)
            setStep4(true)
            setGreen2('Green')
            setGreen1('')
            setGreen4('Green')
            setGreen3('')
            setSign('x')
            setQ1(-1*num1)
            setQ2(num2)
            setAnswers(-1*num2*num1)
        }if(step4 === true){
            setGreen2('')
            setGreen4('')
            setStep4(false)
            setStep5(true)
            setGreen5('Green')
            setSign('+')
            setAnswers(num2-num1)
        }if(step5 === true){
            setDone(true)
        }
    }

    useEffect(()=>{
        setArr(prevChange => prevChange.sort((a,b)=>Math.random()-0.5))
     },[])

     useEffect(()=>{
        setExtra(false)
     },[Q2])

    function Nothing(){}
    return (
        <div className="Help">
            {extra && !step1 && sign === 'x' && Q1 < 10 && Q2 < 10 && <HelpTimes close={Extra} num1 ={-1*Q1} num2 = {Q2}/>}
            {extra && sign === 'x' && (Q1 >= 10 || Q2 >= 10) && <StepTimes close={Extra} num1 ={Q1} num2 = {Q2}/>}
            {extra && sign === '+' && Q1 < 10 && Q2 < 10 && <HelpMinus close={Extra} num1 ={-1*Q1} num2 = {Q2}/>}
            {extra && sign === '-' && (Q1 >= 10 || Q2 >= 10) && <StepMinus close={Extra} num1 ={Q1} num2 = {Q2}/>}
            {extra && sign === '÷' && <HelpDiv close={Extra} num1 ={Q1} num2 = {Q2}/>}
            <div className='cancel'><button className='cancel-btn' onClick = {close}>X</button></div>
            <br></br>
            <br></br>
            { step1 && <div className="center" style={{width:"80%"}} ><div className="absolute" style={{top:'90px',borderTop:'2px solid Green',borderRight:'2px solid Green',width:"70px",height:'70px',rotate:'-45deg'}} ></div></div>}
            { step2 && <div className="center" ><div className="absolute" style={{top:'75px',borderTop:'2px solid Green',borderRight:'2px solid Green',width:"120px",height:'120px',rotate:'-45deg'}} ></div></div>}
            { step3 && <div className="center" ><div className="absolute" style={{top:'120px',borderTop:'2px solid Green',borderRight:'2px solid Green',width:"30px",height:'30px',rotate:'-45deg'}} ></div></div>}
            { step4 && <div className="center" style={{width:"120%"}} ><div className="absolute" style={{top:'90px',borderTop:'2px solid Green',borderRight:'2px solid Green',width:"70px",height:'70px',rotate:'-45deg'}} ></div></div>}
            {<div className="double center" >(<div className={Green1} >𝑥</div> <span className="hide" >.</span> <div className={Green2}> - {num1}</div>)(<div className={Green3} >𝑥</div> <span className="hide" >.</span> <div className={Green4}> + {num2}</div>)</div> }
             <br></br>
             <br></br>
             { !done &&  <div className="center double" >
                {!step1 && <div>𝑥<span style={{fontSize:'20px',position:'relative',paddingRight:"10px", top:"-13px"}}>2</span></div>} {!step1 && !step2 && '+'} <div className= {Green5} style={{paddingLeft:"10px"}} >{!step1 && !step2 && num2 > 1 && num2}</div>{!step1 && !step2 && <div className={Green5} style={{paddingRight:"10px"}}>𝑥</div>} {!step1 && !step2 && !step3 && '-'} <div className= {Green5} style={{paddingLeft:"10px"}} >{!step1 && !step2 && !step3 && num1}</div>{!step1 && !step2 && !step3 && <div className={Green5} style={{paddingRight:"10px"}}>𝑥</div>} {!step1 && !step2 && !step3 && !step4 && '-'} { !step1 && !step2 && !step3 && !step4 && num1*num2} {!step1 && !step2 && !step3 && !step4 && '='}</div>}   
            { done && <div className="center Green double" >𝑥<span style={{fontSize:'20px',position:'relative', top:"-13px"}}>2</span> - {num1-num2}𝑥 - {num1*num2} </div>}   
            {step1 && <div className=" double center Green absolute StepQuestion">{'𝑥'} {sign} {'𝑥'} = </div>} 

            {!done&& !step1 && <div className=" double center Green absolute StepQuestion">{Q1} {sign} {Q2} = {extra && answer+'𝑥'}</div>}
               {!done && !step1 &&<div className='center wrap absolute StepAnswer'>
                   <Step value = {(step4 || step5) ? (answer+arr[0]) : answer+arr[0]+'𝑥'}  answer={ (step4 || step5) ? answer :answer+'𝑥'} Count ={Count} done = {done} mistake={Nothing}/>
                   <Step value = {(step4 || step5) ? (answer+arr[2]) : answer+arr[2]+'𝑥'}  answer={ (step4 || step5) ? answer :answer+'𝑥'} Count ={Count} done = {done} mistake={Nothing}/>
                   <Step value = {(step4 || step5) ? (answer+arr[3]) : answer+arr[3]+'𝑥'}  answer={ (step4 || step5) ? answer :answer+'𝑥'} Count ={Count} done = {done} mistake={Nothing}/>
                   <button className="choice" style={{backgroundColor:'yellow',color:'black'}} onClick={()=>{setExtra(true);console.log(extra)}} >help</button>
                   <Step value = {(step4 || step5) ? (answer+arr[1]) : answer+arr[1]+'𝑥'}  answer={ (step4 || step5) ? answer :answer+'𝑥'} Count ={Count} done = {done} mistake={Nothing}/>
                   <button className="choice red" onClick={close} >Close</button>
               </div>}
               {step1 &&<div className='center wrap absolute StepAnswer'>
                    {extra ? <button className="choice green" ></button> :<Step value = {answer}  answer={answer} Count ={Count} done = {done} mistake={Nothing}/>}
                   <Step value = {'𝑥𝑥'}  answer={answer} Count ={Count} done = {done} mistake={Nothing}/>
                   <Step value = {'2𝑥'}  answer={answer} Count ={Count} done = {done} mistake={Nothing}/>
                   <button className="choice" style={{backgroundColor:'yellow',color:'black'}} onClick={()=>{setExtra(true);setTimeout(()=>{setExtra(false)},750)}} >help</button>
                   <Step value = {'𝑥'}  answer={answer} Count ={Count} done = {done} mistake={Nothing}/>
                   <button className="choice red" onClick={close} >Close</button>
               </div>}
        </div>
    )
}