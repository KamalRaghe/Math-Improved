import Step from "@/components/step"
import { useEffect, useState } from "react"
import HelpDiv from "@/components/PerfectDivision"
import HelpAdd from "@/components/HelpAdd"
import HelpTimes from "@/components/HelpTimes"
import StepTimes from "@/components/stepTimes"
import HelpMinus from "@/components/HelpMinus"
import StepAdd from "@/components/StepAdd"
import StepMinus from "@/components/StepMinus"

export default function TriH({num1,num2,close}){  
    return (
        <div className="Help">
             <div className='cancel'><button className='cancel-btn' onClick = {close}>X</button></div>
            <div className="double" >{num2} + {num1} = {num1+num2} </div>
            <div className="double" >{num2} - {num1} = {num2-num1} </div>
            <div className="double" >-{num2} + {num1} = {num1-num2} </div>
            <div className="double" >-{num2} - {num1} = -{num1+num2} </div>
            <br></br>
            <div className="double" >{num2} x {num1} = {num1*num2} </div>
            <div className="double" >{num2} x -{num1} = -{num2*num1} </div>
            <div className="double" >-{num2} x {num1} = -{num1*num2} </div>
            <div className="double" >-{num2} x -{num1} = {num1*num2} </div>
        </div>
    )
}