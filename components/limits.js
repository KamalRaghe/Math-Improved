import { useEffect, useState } from "react"
import Step from "./step"
import HelpDiv from "@/components/PerfectDivision"
import HelpAdd from "@/components/HelpAdd"
import HelpTimes from "@/components/HelpTimes"
import StepTimes from "@/components/stepTimes"
import HelpMinus from "@/components/HelpMinus"
import StepAdd from "@/components/StepAdd"
import StepMinus from "@/components/StepMinus"
import ExponentCalculator from "@/limitCalc"

export default function Limits({c,e,x,close}){
    const [done, setDone] = useState(false)
    const [extra, setExtra] = useState(false)
    const [Q1, setQ1] = useState()
    const [Q2, setQ2] = useState(4)
    const [steps,setSteps] = useState(0)
    const [sign ,setSign] = useState('x')
    const [answer, setAnswer] = useState(4)
    const [arr, setArr]= useState([0,Math.floor(Math.random()*1+2)+1,1,Math.floor(Math.random()*3)-4])
    const [color, setColor] = useState('green')
    const [Begin,setBegin] = useState('carry') 
    const [calc, setCalc] = useState(true)

    useEffect(() => {
        setArr(prevChange => prevChange.sort((a,b)=>Math.random()-0.5)) 
    },[])

    function Count(){
        close()
    }

    function Extra(){
        setExtra(false)
   }

    function Nothing(){}

    return (
        <div className="Help column" style={{zIndex:'50'}}>
          <div className='cancel'><button className='cancel-btn' onClick = {close}>X</button></div>
            {extra && sign === '+' && Q1 < 10 && Q2 < 10 && <HelpAdd close={Extra} num1 ={Q1} num2 = {Q2}/>}
            {extra && sign === '+' && (Q1 >= 10 || Q2 >= 10) && <StepAdd close={Extra} num1 ={Q1} num2 = {Q2}/>}
            {extra && sign === 'x' && Q1 < 10 && Q2 < 10 && <HelpTimes close={Extra} num1 ={Q1} num2 = {Q2}/>}
            {extra && sign === 'x' && (Q1 >= 10 || Q2 >= 10) && <StepTimes close={Extra} num1 ={Q1} num2 = {Q2}/>}
            {extra && sign === '-' && Q1 < 10 && Q2 < 10 && <HelpMinus close={Extra} num1 ={Q1} num2 = {Q2}/>}
            {extra && sign === '-' && (Q1 >= 10 || Q2 >= 10) && <StepMinus close={Extra} num1 ={Q1} num2 = {Q2}/>}
            {extra && sign === '÷' && <HelpDiv close={Extra} num1 ={Q1} num2 = {Q2}/>}
               <div className={Begin} onClick={()=>{setBegin(),setColor('black'),setSteps(1)}} style={{fontSize:"30px",color:color}} > 
                <span style={{ fontSize: "40px"}}>lim</span>
                  <span
                    style={{
                      fontSize: "26px",
                      position: "relative",
                      top: "6px",
                      fontWeight: "500",
                    }}
                  >
                    (x → {x})
                  </span> {c[0]}x <span style={{fontSize:'20px',position:'relative',left:'-5px', top:"-13px"}}>{e[0]}</span>
                + {c[1]}x <span style={{fontSize:'20px',position:'relative',left:'-5px', top:"-13px"}}>{e[1]}</span>
                + {c[2]}x <span style={{fontSize:'20px',position:'relative',left:'-5px', top:"-13px"}}>{e[2]}</span>
               </div>
               <div className="double">
                    {c[0]}x <span style={{fontSize:'20px',position:'relative',left:'-5px', top:"-13px"}}>{e[0]}</span>
                    + {c[1]}x <span style={{fontSize:'20px',position:'relative',left:'-5px', top:"-13px"}}>{e[1]}</span>
                    + {c[2]}x <span style={{fontSize:'20px',position:'relative',left:'-5px', top:"-13px"}}>{e[2]}</span>
               </div>
               <div className="box center" style={{width:"100%",height:"60%",alignItems:"end"}} >
                {calc && <ExponentCalculator close={()=> {setCalc(false)}} ></ExponentCalculator>}
               </div>
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