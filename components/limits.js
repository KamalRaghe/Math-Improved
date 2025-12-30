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
import AddCalculator from "./addCalc"
import TimesCalculator from "./timeCalc"

export default function Limits({c,e,x,close}){
    const [done, setDone] = useState(false)
    const [extra, setExtra] = useState(false)
    const [Q1, setQ1] = useState(e[0])
    const [Q2, setQ2] = useState(x)
    const [steps,setSteps] = useState(0)
    const [sign ,setSign] = useState('x')
    const [answer, setAnswer] = useState(x**e[0])
    const [arr, setArr]= useState([0,Math.floor(Math.random()*1+2)+1,1,Math.floor(Math.random()*3)-4])
    const [color, setColor] = useState('green')
    const [Begin,setBegin] = useState('carry') 
    const [calc, setCalc] = useState(false)

    useEffect(() => {
        setArr(prevChange => prevChange.sort((a,b)=>Math.random()-0.5)) 
    },[steps])

    function Count(){
      if(steps == 1){
        setSteps(2)
        setAnswer(x**e[1])
        setQ1(e[1])
        setQ2[c[1]]
      }
       if(steps == 2){
        setSteps(3)
        setAnswer(x**e[2])
        setQ1(e[2])
        setQ2[c[2]]
      }
       if(steps == 3){
        setSteps(4)
        setAnswer(c[0]*x**e[0])
        setQ1(c[0])
        setQ2(x**e[0])
      }if(steps == 4){
        setSteps(5)
        setAnswer(c[1]*x**e[1])
        setQ1(c[1])
        setQ2(x**e[1])
      }if(steps == 5){
        setSteps(6)
        setAnswer(c[2]*x**e[2])
        setQ1(c[2])
        setQ2(x**e[2])
      }if(steps == 6){
        setSteps(7)
        setAnswer((c[0]*x**e[0])+(c[1]*x**e[1]))
        setSign('+')
        setQ1((c[0]*x**e[0]))
        setQ2((c[1]*x**e[1]))
      }
    }

    function Extra(){
        setExtra(false)
   }

    function Nothing(){}

    return (
        <div className="Help column" style={{zIndex:'50'}}>
          
            <div className='cancel'><button className='cancel-btn' onClick = {close}>X</button></div>
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
              {steps > 0 && <div style={{marginTop:"20px",width:"100%",fontSize:"25px",color:"black"}}>
               =    {steps > 1 ? <span style={{margin:"5px"}} > {c[0]}{`(${x**e[0]})`}</span> : <span>{c[0]}{`(${x})`} <span style={{fontSize:'20px',position:'relative',left:'-5px', top:"-13px"}}>{e[0]}</span></span>}
                    + {steps > 2 ? <span style={{margin:"5px"}} > {c[1]}{`(${x**e[1]})`}</span> : <span>{c[1]}{`(${x})`} <span style={{fontSize:'20px',position:'relative',left:'-5px', top:"-13px"}}>{e[1]}</span></span> }
                    + {steps > 3 ? <span style={{margin:"5px"}} > {c[2]}{`(${x**e[2]})`}</span> : <span> {c[2]}{`(${x})`} <span style={{fontSize:'20px',position:'relative',left:'-5px', top:"-13px"}}>{e[2]}</span></span>}
               </div>}
               {steps > 4 && <div style={{marginTop:"20px",width:"100%",fontSize:"25px",color:"black"}}>
               =    {steps > 4 && <span style={{margin:"5px"}} > {c[0]*(x**e[0])}</span>}
                     {steps > 5 && <span style={{margin:"5px"}} >+ {c[1]*(x**e[1])}</span>}
                     {steps > 6 && <span style={{margin:"5px"}} >+ {c[2]*(x**e[2])}</span>}
               </div>}
               <div className="box center" style={{width:"100%",height:"10%",alignItems:"center"}} >
                {extra && sign == 'x' && <TimesCalculator></TimesCalculator>}
                {extra && sign == '+' && <AddCalculator close={()=> {setExtra(false)}></AddCalculator>}
                {calc && steps < 4 && <ExponentCalculator close={()=> {setCalc(false)}} ></ExponentCalculator>}
               </div>
               <div className="box"></div>
               {!done && steps > 0 && steps <= 3 &&<div className=" double center Green absolute StepQuestion">{Q2} <span style={{fontSize:'20px',position:'relative',left:'0px', top:"-13px"}}>{Q1}</span> = </div>}  
              {!done && steps > 0 && steps > 3 && <div className=" double center Green absolute StepQuestion" >{Q1} {sign} {Q2}</div>}
               {!done &&<div className='center wrap absolute StepAnswer'>
                   <Step value = {((answer))+arr[1]}  answer={(answer)} Count ={Count} done = {done} mistake={Nothing}/>
                   <Step value = {((answer))+arr[3]}  answer={(answer)} Count ={Count} done = {done} mistake={Nothing}/>
                   <Step value = {((answer))+arr[0]}  answer={(answer)} Count ={Count} done = {done} mistake={Nothing}/>
                   <button className="choice" style={{backgroundColor:'yellow',color:'black'}} onClick={()=>{
                    if(steps < 4){
                      setCalc(true) 
                    }else{
                      setExtra(true)
                    }
                    }}>help</button>
                   <Step value = {((answer))+arr[2]}  answer={(answer)} Count ={Count} done = {done} mistake={Nothing}/>
                   <button className="choice red" onClick={close} >Close</button>
               </div>}       
        </div>
    )
}