import { useEffect, useState } from "react"
import Step from "./step"
import HelpAdd from "./HelpAdd"

export default function LT({num9,num1,num8,num,close}){
    const [done,setDone] = useState(false)
    const [extra, setExtra] = useState(false)
    const [arr, setArr] = useState([0,Math.floor(Math.random()*1+2)+1,1,Math.floor(Math.random()*3)-4])
    const [answer, setAnswer] = useState(num1+num[3])
    const [Q1, setQ1] = useState(num1)
    const [Q2, setQ2] = useState(num[3])
    const [sign ,setSign] = useState('+')
    const [x, setX] = useState(true)
    const [y, setY] = useState(false)
    const [z, setZ] = useState(false)
    const [xDone, setXD] = useState(false)
    const [yDone, setYD] = useState(false)
    const [zDone, setZD] = useState(false)


    function Count(){
        if(x === true){
            setX(false)
            setY(true)
            setXD(true)
            setQ1(num[0])
            setQ2(num[1])
            setAnswer(num[0]+num[1])
        } if(y === true){
            setY(false)
            setZ(true)
            setYD(true)
            setQ1(num[2])
            setQ2(num8)
            setAnswer(num8+num[2])
        } if(z === true){
            setZD(true)
            setDone(true)
        }
    }

    function Extra(){
        setExtra(false)
    }

    function Nothing(){}

    return (
        <div className="Help">
            {extra && sign == '+' && <HelpAdd close={Extra} num9 ={Q1} num2 = {Q2}/>}
            <div className='cancel'><button className='cancel-btn' onClick = {close}>X</button></div>
            <div className="center" style={{fontSize:"25px",paddingBottom:'30px'}}>
            <div style={{fontSize:"25px"}}>{num1}𝑥 + {num9[0]} + {num9[1]} + {num9[2]} + {num9[3]} + {num8}z </div>
             </div>
            <div className="double center" style={{paddingBottom:'30px'}}>
                {y && !x && !z && <div className="Green">{num[0]+'y'} + {num[1]+'y'} = </div>} 
                {!y && x && !z && <div className="Green">{num1+'x'} + {num[3]+'x'} = </div>} 
                {!y && !x && z && <div className="Green">{num[2]+'z'} + {num8+'z'} = </div>} 
            </div>

            { zDone && <button className="double carry Green center" onClick={close}  style={{width:"100%",fontSize:"40px"}} >
               {xDone && (num1+num[3])+'x'} {yDone && '+'} {yDone && (num[0]+num[1])+'y'} {zDone && '+'} {zDone && (num8+num[2])+'z'}
            </button>}

            { !zDone && <div className="double center">
               {xDone && (num1+num[3])+'x'} {yDone && '+'} {yDone && (num[0]+num[1])+'y'} {zDone && '+'}
            </div>}

               {!done && <div className=" double center Green absolute StepQuestion">{Q1} {sign} {Q2} =</div>}  
               {!done &&<div className='center wrap absolute StepAnswer'>
                   <Step value = {answer+arr[0]}  answer={answer} Count ={Count} done = {done} mistake={Nothing}/>
                   <Step value = {answer+arr[2]}  answer={answer} Count ={Count} done = {done} mistake={Nothing}/>
                   <Step value = {answer+arr[3]}  answer={answer} Count ={Count} done = {done} mistake={Nothing}/>
                   <button className="choice" style={{backgroundColor:'yellow',color:'black'}} onClick={()=>{setExtra(true)}} >help</button>
                   <Step value = {answer+arr[1]}  answer={answer} Count ={Count} done = {done} mistake={Nothing}/>
                   <button className="choice red" onClick={close} >Close</button>
               </div>}
        </div>
    )
}