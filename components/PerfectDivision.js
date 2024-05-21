import { use, useEffect, useState } from "react"
import Step from "./step"
import HelpMinus from "./HelpMinus"
import StepMinus from "./StepMinus"
import HelpTimes from "./HelpTimes"

export default function HelpDiv({num1,num2,close,num3}){
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
        <div className="Help" style={{zIndex:'30', border:'10px solid red'}}>
        <button className="choice red" onClick={close} >Close</button>
        <br></br>
        <br></br>
        <div className="center" style={{width:'90%'}} >{num1/num2 === 0 && <div className="Green" style={{fontSize: "30px", paddingBottom: '3px',position:"relative"}}>0 ÷ {num1} = <span className="absolute"><span className="hide">0</span>{num1*0}</span> </div>}</div>
        
        <div className="center" style={{width:'90%'}} >{num1/num2 === 1 ? <div className="Green" style={{fontSize: "30px", paddingBottom: '3px', position:"relative"}}>{1*num2} ÷ {num2} {num3 > 0 && <span>+</span>} {num3 > 0 && num3} = <span className="absolute"><span className="hide">0</span>{!(num3 > 0) && 1}{num3 > 0 && num1*num2+num3} </span></div>:
        <div style={{fontSize: "30px", paddingBottom: '3px', position: 'relative'}}>{num2*1} ÷ {num2} = <span className="absolute"><span className="hide">0</span>{1}</span></div>}</div>
        
        <div className="center" style={{width:'90%'}} >{num1/num2 === 2 ? <div className="Green" style={{fontSize: "30px", paddingBottom: '3px', position:"relative"}}>{2*num2} ÷ {num2} {num3 > 0 && <span>+</span>} {num3 > 0 && num3} = <span className="absolute"><span className="hide">0</span>{!(num3 > 0) && 2}{num3 > 0 && num1*num2+num3} </span></div>:
        <div style={{fontSize: "30px", paddingBottom: '3px', position: 'relative'}}>{num2*2} ÷ {num2} = <span className="absolute"><span className="hide">0</span>{2}</span></div>}</div>
        
        <div className="center" style={{width:'90%'}} >{num1/num2 === 3 ? <div className="Green" style={{fontSize: "30px", paddingBottom: '3px', position:"relative"}}>{3*num2} ÷ {num2} {num3 > 0 && <span>+</span>} {num3 > 0 && num3} = <span className="absolute"><span className="hide">0</span>{!(num3 > 0) && 3}{num3 > 0 && num1*num2+num3} </span></div>:
        <div style={{fontSize: "30px", paddingBottom: '3px', position: 'relative'}}>{num2*3} ÷ {num2} = <span className="absolute"><span className="hide">0</span>{3}</span></div>}</div>
        
        <div className="center" style={{width:'90%'}} >{num1/num2 === 4 ? <div className="Green" style={{fontSize: "30px", paddingBottom: '3px', position:"relative"}}>{4*num2} ÷ {num2} {num3 > 0 && <span>+</span>} {num3 > 0 && num3} = <span className="absolute"><span className="hide">0</span>{!(num3 > 0) && 4}{num3 > 0 && num1*num2+num3} </span></div>:
        <div style={{fontSize: "30px", paddingBottom: '3px', position: 'relative'}}>{num2*4} ÷ {num2} = <span className="absolute"><span className="hide">0</span>{4}</span></div>}</div>
        
        <div className="center" style={{width:'90%'}} >{num1/num2 === 5 ? <div className="Green" style={{fontSize: "30px", paddingBottom: '3px', position:"relative"}}>{5*num2} ÷ {num2} {num3 > 0 && <span>+</span>} {num3 > 0 && num3} = <span className="absolute"><span className="hide">0</span>{!(num3 > 0) && 5}{num3 > 0 && num1*num2+num3} </span></div>:
        <div style={{fontSize: "30px", paddingBottom: '3px', position: 'relative'}}>{num2*5} ÷ {num2} = <span className="absolute"><span className="hide">0</span>{5}</span></div>}</div>
        
        <div className="center" style={{width:'90%'}} >{num1/num2 === 6 ? <div className="Green" style={{fontSize: "30px", paddingBottom: '3px', position:"relative"}}>{6*num2} ÷ {num2} {num3 > 0 && <span>+</span>} {num3 > 0 && num3} = <span className="absolute"><span className="hide">0</span>{!(num3 > 0) && 6}{num3 > 0 && num1*num2+num3} </span></div>:
        <div style={{fontSize: "30px", paddingBottom: '3px', position: 'relative'}}>{num2*6} ÷ {num2} = <span className="absolute"><span className="hide">0</span>{6}</span></div>}</div>
        
        <div className="center" style={{width:'90%'}} >{num1/num2 === 7 ? <div className="Green" style={{fontSize: "30px", paddingBottom: '3px', position:"relative"}}>{7*num2} ÷ {num2} {num3 > 0 && <span>+</span>} {num3 > 0 && num3} = <span className="absolute"><span className="hide">0</span>{!(num3 > 0) && 7}{num3 > 0 && num1*num2+num3} </span></div>:
        <div style={{fontSize: "30px", paddingBottom: '3px', position: 'relative'}}>{num2*7} ÷ {num2} = <span className="absolute"><span className="hide">0</span>{7}</span></div>}</div>
        
        <div className="center" style={{width:'90%'}} >{num1/num2 === 8 ? <div className="Green" style={{fontSize: "30px", paddingBottom: '3px', position:"relative"}}>{8*num2} ÷ {num2} {num3 > 0 && <span>+</span>} {num3 > 0 && num3} = <span className="absolute"><span className="hide">0</span>{!(num3 > 0) && 8}{num3 > 0 && num1*num2+num3} </span></div>:
        <div style={{fontSize: "30px", paddingBottom: '3px', position: 'relative'}}>{num2*8} ÷ {num2} = <span className="absolute"><span className="hide">0</span>{8}</span></div>}</div>
        
        <div className="center" style={{width:'90%'}} >{num1/num2 === 9 ? <div className="Green" style={{fontSize: "30px", paddingBottom: '3px', position:"relative"}}>{9*num2} ÷ {num2} {num3 > 0 && <span>+</span>} {num3 > 0 && num3} = <span className="absolute"><span className="hide">0</span>{!(num3 > 0) && 9}{num3 > 0 && num1*num2+num3} </span></div>:
        <div style={{fontSize: "30px", paddingBottom: '3px', position: 'relative'}}>{num2*9} ÷ {num2} = <span className="absolute"><span className="hide">0</span>{9}</span></div>}</div>
    </div>
        
    )
}