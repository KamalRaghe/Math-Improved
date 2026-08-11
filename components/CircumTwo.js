import { useEffect, useState } from "react"
import Step from "./step"
import HelpDiv from "@/components/PerfectDivision"
import HelpAdd from "@/components/HelpAdd"
import HelpTimes from "@/components/HelpTimes"
import StepTimes from "@/components/stepTimes"
import HelpMinus from "@/components/HelpMinus"
import StepAdd from "@/components/StepAdd"
import StepMinus from "@/components/StepMinus"

export default function CircumOne({num1,num2,close}){
    const [extra, setExtra] = useState(false)
    const [done, setDone] = useState(true)
    const [step1, setStep1] = useState(true)
    const [step2, setStep2] = useState(false)
    const [step3, setStep3] = useState(false)
    const [pi, setPi] = useState(true)
    const [Q1, setQ1] = useState(num1*7)
    const [Q2, setQ2] = useState(7)
    const [sign ,setSign] = useState('÷')
    const [answer, setAnswer] = useState(num1)
    const [arr, setArr]=useState([0,Math.floor(Math.random()*1+2)+1,1,Math.floor(Math.random()*3)-4])

    useEffect(() => {
        setArr(prevChange => prevChange.sort((a,b)=>Math.random()-0.5)) 
    },[])

    function Extra(){
        setExtra(false)
   }

    function Count(){
        if(step1 === true){
            setStep1(false)
            setStep2(true)
            setQ1(22)
            setQ2(2)
            setAnswer(44)
            setSign('x')
        }else if (step2 === true){
            setStep2(false)
            setStep3(true)
            setQ1(44)
            setQ2(num1)
            setAnswer(44*num1)
            setSign('x')
        }else if(step3 === true){
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

            <div className="double center" style={{margin:"20px",display:'flex',justifyContent:'end',alignItems:'center',width:'100px', height:"100px",border:"3px solid black",backgroundColor:'black', borderRadius:"50%"}}>
                    <div className="relative center" style={{top:'-10px',fontSize:'20px',width:'50%',color:"white",borderBottom:"2px solid white"}} >{num1*7}</div>
                </div>
               {step1 && <div className="double center" style={{width:"100%"}}>
                C = {pi ? 2 :  '2 x'}
                {pi ? <button onClick={()=>{setPi(false)}} className="carry Green">π</button>
                :<div className="column center" style={{padding:'5px'}} >
                    <div style={{borderBottom:'2px solid black'}} >22</div>7</div>}
                    {done ? <button onClick={()=>{setDone(false)}} className="carry Green">r</button>:
                    <span> x {num1*7}</span>}</div>}

                {step2 && <div className="double center" style={{width:"100%"}}>
                C = <div className="center">2 x 22 x {num1}</div></div>}

                {step3 && <div className="double center" style={{width:"100%"}}>
                C = <div className="center">44 x {num1}</div></div>}

               <div className="box"></div>
               {!done && !pi && <div className=" double center Green absolute StepQuestion">{Q1} {sign} {Q2} = </div>}  
               {!done && !pi &&<div className='center wrap absolute StepAnswer'>
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