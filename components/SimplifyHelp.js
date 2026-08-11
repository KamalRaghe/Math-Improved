import Step from "@/components/step"
import StepF from "./fractionStep"
import { useEffect, useState } from "react"
import HelpDiv from "./PerfectDivision"
import HelpHcf from "./HelpHcf"
import LongDivisionHelp from "./longDivisionHelp"
import ShortDivisionHelp from "./shortDivison"



export default function Question1({num1,num2,whole, close}){  
    const [done,setDone] = useState(false)
    const [extra, setExtra] = useState(false)
    const [count, setCount] = useState(1)
    const [arr, setArr] = useState([0,Math.floor(Math.random()*1+2)+1,1,Math.floor(Math.random()*3)-4])
    const [answer, setAnswers] = useState(num1+num2)
    const[Q1, setQ1] = useState(num1 > 0 ? num1:-1*num1) 
    const[Q2, setQ2] = useState(num2 > 0 ? num2:-1*num2)
    const [sign, setSign] = useState('and')
    const [step1, setStep1] = useState(true) 
    const [step2, setStep2] = useState(false) 
    const [step3, setStep3] = useState(false) 
    const [step4, setStep4] = useState(false)
    const [step5, setStep5] = useState(false) 

    function Extra(){
        setExtra(false)
        console.log('LJHG8OU    3')
   }

    function Count(){
        setArr(prevChange => prevChange.sort((a,b)=>Math.random()-0.5))
        if(step1 === true){
           setStep1(false)
           setStep2(true) 
           setQ1(num1 > 0 ? num1:-1*num1) 
           setQ2(count)
           setSign('÷')
           setAnswers(num1 > 0 ? num1/count:-1*num1/count) 
        }if(step2 === true){
            setStep2(false)
            setStep3(true)
            setQ1(num2 > 0 ? num2:-1*num2) 
            setQ2(count)
            setSign('÷')
            setAnswers(num2> 0 ? num2/count:-1*num2/count) 
        }if(step3 === true){
            setStep3(false)
            setStep4(true)
            setDone(true)
        }if(step4 === true){
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
        setAnswers(count)
        setArr(prevChange => prevChange.sort((a,b)=>Math.random()-0.5))
      },[count])

      useEffect(() => {
        console.log(extra);
     }, [extra]);

    function Nothing(){}
    return (
        <div className="Help"  >
            {extra && sign === 'and' && <HelpHcf close={ () => Extra()} num1 ={Q1} num2 = {Q2}/>}
            {extra && sign === '÷' && Q1 > 99 && Q2 < 10  && <LongDivisionHelp close={ () => Extra()} num1 ={Q2} num2 = {Q1}/>}
            {extra && sign === '÷' && Q1 < 100 && Q2 < 10  && <HelpDiv close={ () => Extra()} num1 ={Q1} num2 = {Q2}/>}
            
            <div className='cancel'><button className='cancel-btn' onClick = {close}>X</button></div>
            <div className=" double center"><div className="Green" style={{padding:'5px'}} >{whole > 0 && whole}</div>
                    <div className="column center" >
                        {step1 && <div className="center" style={{borderBottom:'2px solid black', width:'45px'}} >
                            {num1 > 0 ? num1:-1*num1}
                        </div>}
                        {step2 && <div style={{borderBottom:'2px solid black'}} >
                            {step2 && <div >{num1 > 0 ? num1:-1*num1} ÷ {count}</div>}
                        </div>}
                        {step3 && <div className="center" style={{borderBottom:'2px solid black', width:'45px'}} >
                            {num1 > 0 ? num1/count:-1*num1/count}
                        </div>}
                        {step4 && <div className="center Green " style={{borderBottom:'2px solid Green', width:'45px'}} >
                            {num1 > 0 ? num1/count:-1*num1/count}
                        </div>}
                        {step1 && num2 > 0 && num2}{step1 && num2 < 0 && -1*num2}{(step2 || step3)&& !step4 && <div>{num2 > 0 ? num2:-1*num2} ÷ {count}</div>}
                        {step4 && <div className="Green" >{num2> 0 ? num2/count:-1*num2/count}</div>}
                        {extra && sign === '÷' && Q1 > 99 && Q2 >= 10  && <ShortDivisionHelp close={ () => Extra()} num1 ={Q2} num2 = {Q1}/>}
                    </div>
                </div>
            
            {!done && sign === 'and' && <div className=" double center" style={{paddingTop:'20px'}}  >Highest common </div>}
            {!done && sign === 'and' && <div className=" double center" >factor of</div>}
            {!done && sign === 'and' && <div className=" double center" >{num1> 0 ? num1:-1*num1} and {num2 > 0 ? num2:-1*num2} </div>}
            {!done && sign !== 'and' && <div className=" double center Green absolute StepQuestion">{Q1} {sign} {Q2} = </div>}  
            {!done &&<div className='center wrap absolute StepAnswer'>
                   {(sign === 'x' && (Q1 >= 10 || Q2 >= 10)) && <button className="choice" style={{backgroundColor:'yellow',color:'black'}} onClick={()=>{setExtra(true)}} >help</button>}
                   <Step value = {answer+arr[0]}  answer={answer} Count ={Count} done = {done} mistake={Nothing}/>
                   {(sign === 'x' && (Q1 >= 10 || Q2 >= 10)) && <button className="choice red" onClick={close} >Close</button>} 
                   <Step value = {answer+arr[2]}  answer={answer} Count ={Count} done = {done} mistake={Nothing}/>
                   <Step value = {answer+arr[3]}  answer={answer} Count ={Count} done = {done} mistake={Nothing}/>
                   {!(sign === 'x' && (Q1 >= 10 || Q2 >= 10)) && <button className="choice" style={{backgroundColor:'yellow',color:'black'}} onClick={()=>{setExtra(true)}} >help</button>}
                   <Step value = {answer+arr[1]}  answer={answer} Count ={Count} done = {done} mistake={Nothing}/>
                   {!(sign === 'x' && (Q1 >= 10 || Q2 >= 10)) && <button className="choice red" onClick={close} >Close</button>} 
               </div>}
               {done &&<div className='center wrap absolute' style={{width:'100%',top:"325px"}} >
                   <StepF whole={whole} value1 = {num1/count > 0 ? num1/count+arr[0] : -1*(num1/count+arr[0])}  answer1={num1/count > 0 ? num1/count : -1*(num1/count)} value2 = {num2/count > 0 ? num2/count+arr[0] : -1*(num2/count+arr[0])}  answer2={num2/count > 0 ? num2/count+arr[0] : -1*(num2/count+arr[0])}  Count ={Count} mistake={Nothing}/>
                   <StepF whole={whole} value1 = {num1/count > 0 ? num1/count+arr[2] : -1*(num1/count+arr[2])}  answer1={num1/count > 0 ? num1/count : -1*(num1/count)} value2 = {num2/count > 0 ? num2/count+arr[2] : -1*(num2/count+arr[2])}  answer2={num2/count > 0 ? num2/count+arr[2] : -1*(num2/count+arr[2])}  Count ={Count} mistake={Nothing}/>
                   <StepF whole={whole} value1 = {num1/count > 0 ? num1/count+arr[3] : -1*(num1/count+arr[3])}  answer1={num1/count > 0 ? num1/count : -1*(num1/count)} value2 = {num2/count > 0 ? num2/count+arr[3] : -1*(num2/count+arr[3])}  answer2={num2/count > 0 ? num2/count+arr[3] : -1*(num2/count+arr[3])}  Count ={Count} mistake={Nothing}/>
                   <StepF whole={whole} value1 = {num1/count > 0 ? num1/count+arr[1] : -1*(num1/count+arr[1])}  answer1={num1/count > 0 ? num1/count : -1*(num1/count)} value2 = {num2/count > 0 ? num2/count+arr[1] : -1*(num2/count+arr[1])}  answer2={num2/count > 0 ? num2/count+arr[1] : -1*(num2/count+arr[1])}  Count ={Count} mistake={Nothing}/>
               </div>}
        </div>
    )
}