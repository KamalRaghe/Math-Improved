import { useEffect, useState } from "react";
import Step from "./step";
import HelpMinus from "./HelpMinus";
import HelpTimes from "./HelpTimes";

export default function IntegralHelp({ terms, close }) {
  const [done, setDone] = useState(false)
  const [step, setStep] =useState(0)
  const [c, setC] = useState(terms[0].exp)
  const [e, setE] = useState(1)
  const [sign, setSign] = useState("+")
  const [answer,setAnswer] = useState(terms[0].exp+1)
  const [arr, setArr] = useState([0,Math.floor(Math.random()*3)+1,-1,Math.floor(Math.random()*3)-4])
  const [extra, setExtra] = useState()

  function Count(){
    if(step === 0){
      setC(terms[0].coeff)
      setE(terms[0].exp+1)
      setSign("÷")
      setStep(1)
      setAnswer(terms[0].coeff/(terms[0].exp+1))
    }if(step === 1){
      setC(terms[1].exp)
      setE(1)
      setSign("+")
      setAnswer(terms[1].exp+1)
      setStep(2)
    }if(step === 2){
      setC(terms[1].coeff)
      setE(terms[1].exp+1)
      setSign("÷")
      setStep(3)
      setAnswer(terms[1].coeff/(terms[1].exp+1))
    }if(step === 3){
      setC(terms[2].exp)
      setE(1)
      setSign("+")
      setAnswer(terms[2].exp+1)
      setStep(4)
    }if(step === 4){
      setC(terms[2].coeff)
      setE(terms[2].exp+1)
      setSign("÷")
      setStep(5)
      setAnswer(terms[2].coeff/(terms[2].exp+1))
    }if(step === 5){
      setDone(true)
      setStep(6)
    }
  }

  useEffect(()=>{
    setArr(prevChange => prevChange.sort((a,b)=>Math.random()-0.5)) 
  },[])

  useEffect(()=>{  
    setArr(prevChange => prevChange.sort((a,b)=>Math.random()-0.5)) 
  })


  return (
    <div className="Help column" style={{ zIndex: 50 }}>
      {extra && sign == "-" && <HelpMinus close = {()=>setExtra()} num1= {c} num2 = {e} />}
      {extra && sign == "x" && <HelpTimes close = {()=>setExtra()} num1= {c} />}
      <div className="cancel">
        <button className="cancel-btn" onClick={close}>
          X
        </button>
      </div>

      <div className=" center" style={{ fontSize: "26px" }}>
        <span style={{position:"relative",top:"5px",right:"8px"}} >∫f(x)dx =</span> {" "}
        {terms.map((t, i) => (
          <span key={i}>
            {i > 0 && " + "}
            {t.coeff}x<sup>{t.exp}</sup>
          </span>
        ))}
      </div>
      <br></br>
       <div className="double center" style={{ fontSize: "26px" }}>
        <span style={{position:"relative",top:"0.5px",right:"8px",color:"green"}} >
          f(x) =
        </span>
        {step >= 1 && <span>
          <span className="Green" >
            {step>= 2 && terms[0].coeff/(terms[0].exp+1)}</span>
            x
            {<span className="Green" style={{position:"relative",bottom:"10px",scale:"0.6"}}>
          {terms[0].exp+1}
            </span>}
        </span>}
        {step >= 3 && <span>
          <span className="Green" >
            + {step>= 4 && terms[1].coeff/(terms[1].exp+1)}</span>
            x
            {<span className="Green" style={{position:"relative",bottom:"10px",scale:"0.7"}}>
          {terms[1].exp+1}
            </span>}
        </span>}
        {step >= 5 && <span>
          <span className="Green" >
            + {step >= 6 && terms[2].coeff/(terms[2].exp+1)}</span>
            x
            {<span className="Green" style={{position:"relative",bottom:"10px",scale:"0.7"}}>
          {terms[2].exp+1}
            </span>}
            {done && <span className="Green" > + C</span>}
        </span>}
      </div>
      
      {!done && <div className="double" style={{position:"relative",top:"100px"}} >{c} {sign} {e} =</div>}
      {!done && <div className='center wrap absolute StepAnswer'>
                   <Step value = {answer+arr[0]}  answer={answer} Count ={Count} done = {done} mistake={()=>{}}/>
                   <Step value = {answer+arr[1]}  answer={answer} Count ={Count} done = {done} mistake={()=>{}}/>
                   <Step value = {answer+arr[2]}  answer={answer} Count ={Count} done = {done} mistake={()=>{}}/>                  
                  {<button className="choice" style={{backgroundColor:'yellow',color:'black'}} onClick={()=>{setExtra(true)}} >help</button>}
                   <Step value = {answer+arr[3]}  answer={answer} Count ={Count} done = {done} mistake={()=>{}}/>
                   {<button className="choice red" onClick={close} >Close</button>} 
               </div>}
    </div>
  );
}