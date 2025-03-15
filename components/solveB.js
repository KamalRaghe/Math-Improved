import { useEffect, useState } from "react"
import Step from "./step"
import HelpDiv from "@/components/PerfectDivision"
import HelpAdd from "@/components/HelpAdd"
import HelpTimes from "@/components/HelpTimes"
import StepTimes from "@/components/stepTimes"
import HelpMinus from "@/components/HelpMinus"
import StepAdd from "@/components/StepAdd"
import StepMinus from "@/components/StepMinus"
import Algebra1 from "@/Algebra/Algebra2"

export default function SolveB({num1,num2,slope,close}){
    const [done, setDone] = useState(true)
    const [extra, setExtra] = useState(false)
    const [step, setStep] = useState(1)
    const [Q1, setQ1] = useState(slope)
    const [Q2, setQ2] = useState(num1)
    const [x, setX] = useState('𝑥')
    const [y, setY] = useState('y')
    const [m, setM] = useState('m')
    const [Class, setClass] = useState()
    const [ClassS, setClassS] = useState()
    const [sign ,setSign] = useState('x')
    const [answer, setAnswer] = useState(num1*slope)
    const [arr, setArr]=useState([0,Math.floor(Math.random()*1+2)+1,1,Math.floor(Math.random()*3)-4])

    useEffect(() => {
        setArr(prevChange => prevChange.sort((a,b)=>Math.random()-0.5)) 
    },[])

    function Count(){
        if(step === 1){
            setStep(0)
        }
    }

    function Extra(){
        setExtra(false)
   }

   function One2(){
        // setDone(false)
        setClass('move')
        // setStep(2)
   }

    function Nothing(){}

    useEffect(()=>{
        if(x !== '𝑥' && y !== 'y' && m !== 'm' ){
            setDone(false)
        }
    },[x,y,m])

    return (
        <div className="Help center column" style={{zIndex:'50'}}>
            <div className='cancel' style={{width:"100%",bottom:'40px',margin:"0px"}} ><button className='cancel-btn' onClick = {close}>X</button></div>
            {extra && step === 1 && <HelpTimes close={Extra} num1 ={Q1} num2 = {Q2}/>}
            {extra && step === 0 && <Algebra1 num1 = {m*num1} num2 = {y-(num1*m)} close={Extra}></Algebra1> }
               <div> 
               <div className="double center column ">
                    {step === 1 && <div style={{margin:"20px",marginTop:"50px"}} >{y} = {m}{x} + b</div>}
                    {step === 0 & x !== '𝑥' && y !== 'y' && m !== 'm' ? <div cla ssName="center" >{y} = {slope*num1} + b</div>: ''}
                    {step === 2 && <div className="center"  style={{margin:"20px",marginTop:"50px"}} >{y} - {m*num1} = b</div>}
                    <div className="Green carry" >{x === '𝑥' && <span onClick={()=>{setX(`(${num1})`)}} >𝑥  = {num1}</span>} {y === 'y' &&<span onClick={()=>{setY(num2)}} >{x === '𝑥' &&<span className="hide" >0</span>}y = {num2}</span> } </div> 
                    { m === 'm' && <div className="Green carry" onClick={()=>{setM(slope)}}>m = {slope} </div>}
                    <div className="hide" >1</div>
                    {step === 0 && <div className="hide" >1</div>}
                </div>    
               </div>
               <div className="box" ></div>
               <div className="box"></div>
               {!done && step !== 0 && <div className=" double center Green absolute StepQuestion">{Q1} {sign} {Q2} = </div>}  
               {!done && step === 1&&<div className='center wrap absolute StepAnswer'>
                   <Step value = {((answer))+arr[1]}  answer={(answer)} Count ={Count} done = {done} mistake={Nothing}/>
                   <Step value = {((answer))+arr[3]}  answer={(answer)} Count ={Count} done = {done} mistake={Nothing}/>
                   <Step value = {((answer))+arr[0]}  answer={(answer)} Count ={Count} done = {done} mistake={Nothing}/>
                   <button className="choice" style={{backgroundColor:'yellow',color:'black'}} onClick={()=>{setExtra(true);console.log(extra)}} >help</button>
                   <Step value = {((answer))+arr[2]}  answer={(answer)} Count ={Count} done = {done} mistake={Nothing}/>
                   <button className="choice red" onClick={close} >Close</button>
               </div>}
               {!done && step === 0 &&<div className='center wrap absolute StepAnswer'>
                   <Step value = { `b=${(y-m*num1+arr[1])}`}  answer={(answer)} Count ={Count} done = {done} mistake={Nothing}/>
                   <Step value = { `b=${(y-m*num1+arr[3])}`}  answer={(answer)} Count ={Count} done = {done} mistake={Nothing}/>
                   <Step value = { `b=${(y-m*num1+arr[0])}`}  answer={(answer)} Count ={Count} done = {done} mistake={Nothing}/>
                   <button className="choice" style={{backgroundColor:'yellow',color:'black'}} onClick={()=>{setExtra(true);console.log(extra)}} >help</button>
                   <Step value = { `b=${(y-m*num1+arr[2])}`}  answer={(answer)} Count ={Count} done = {done} mistake={Nothing}/>
                   <button className="choice red" onClick={close} >Close</button>
               </div>}

           
           
        </div>
    )
}