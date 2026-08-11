import { useEffect, useState } from "react"
import Step from "./step"
import HelpMinus from "./HelpMinus"
import HelpTimes from "./HelpTimes"
import StepMinus from "./StepMinus"

function LongDivisionHelp({close, num1 , num2}){
  const [main, setMain] = useState()
  const [extra, setExtra] = useState(false)
  const [digit, setDigit] = useState(false)
  const [done, setDone] = useState(true)
  const [remainder, setRemainder] = useState(false)
  const [number1, setNumber1] = useState(Math.floor(num2/100))
  const [number2, setNumber2] = useState(Math.floor((num2/10)%10))
  const [number3, setNumber3] = useState(Math.floor(num2%10))
  const [number4, setNumber4] = useState()
  const [number5, setNumber5] = useState()
  const [number6, setNumber6] = useState()
  const [arr, setArr] = useState([0,Math.floor(Math.random()*1+2)+1,1,Math.floor(Math.random()*3)-4])
  const [minus, setMinus] = useState(false)
  const [step1, setStep1] = useState(true)
  const [step2, setStep2] = useState(false)
  const [step3, setStep3] = useState(false)
  const [step4, setStep4] = useState(false)
  const [step5, setStep5] = useState(false)
  const [step6, setStep6] = useState(false)
  const [step7, setStep7] = useState(false)
  const [step8, setStep8] = useState(false)
  const [Minus1, letMinus1] = useState(false)
  const [minus1, setMinus1] = useState()
  const [minus2, setMinus2] = useState()
  const [minus3, setMinus3] = useState()
  const [Minus2, letMinus2] = useState(false)
  const [Minus3, letMinus3] = useState(false)
  const [answer1, setAnswer1] = useState()
  const [answer2, setAnswer2] = useState()
  const [answer3, setAnswer3] = useState()
  const [right1, setRight1] = useState(false)
  const [right2, setRight2] = useState(false)
  const [right3, setRight3] = useState(false)
  const [right4, setRight4] = useState(false)
  const [big, setBig] = useState(false)
  const [small, setSmall] = useState(false)

  function Count(){
    setArr(prevChange => prevChange.sort((a,b)=>Math.random()-0.5))
    if(step1 === true && number1 < number4*num1){
        setBig(true)
        setTimeout(()=>{
            setBig(false)
        },2200)
        setTimeout(()=>{
            setDone(true)
        },2000)
    }
    else if(step1 === true && number1 >= number4*num1){
        setMinus1(number4*num1)
        letMinus1(true)
        setMinus(true)
        setNumber5(number1)
        setNumber6(number4*num1)
        setStep1(false)
        setStep2(true)
    }else if(step2 === true && num1 > (number1 - number4*num1) && ((number1 >= 10 && num1 < 10) || (number1 >= 100 && num1 >=10))){
        setAnswer1(number5-number6)
        setRight1(true)
        setStep2(false)
        setStep3(true)
        setMain(Math.floor(num2/num1/10))

    }else if(step2 === true && num1 > (number1 - number4*num1) && ((number1 < 10 && num1 < 10) || (number1 < 100 && num1 >=10))){
        setAnswer1(number5-number6)
        setRight1(true)
        setStep2(false)
        setStep3(true)
        setMain(Math.floor(num2/num1/100))
    }else if(step2 === true && num1 <= (number1 - number4*num1)){
        setAnswer1(number5-number6)
        setRight1(true)
        setSmall(true)
        setTimeout(()=>{
            setSmall(false)
        },1500)
        setTimeout(()=>{
            setDone(true)
        },1500)
        setAnswer1()
        setMinus(false)
        setMinus1()
        letMinus1(false)
        setStep2(false)
        setStep1(true)
    }else if(step4 === true && answer1 > num1 && answer1 >= number4*num1){
        setStep4(false)
        setStep5(true)
        setMinus2(number4*num1)
        letMinus2(true)
        setNumber5(answer1)
        setNumber6(number4*num1)
        setMinus(true)
    }else if(step4 === true && answer1 > num1 && answer1 < number4*num1){
        setBig(true)
        setTimeout(()=>{
            setBig(false)
        },2000)
        setTimeout(()=>{
            setDone(true)
        },2000)
    }else if(step5 === true && num1 >= (answer1 - number4*num1) && ((number1 >= 10 && num1 < 10) || (number1 >= 100 && num1 >=10))){
        setAnswer2(number5-number6)
        setRight3(true)
        setStep5(false)
        setStep6(true)
        setMain(Math.floor(num2/num1))
    }else if(step5 === true && num1 >= (answer1 - number4*num1) && ((number1 < 10 && num1 < 10) || (number1 < 100 && num1 >=10))){
        setAnswer2(number5-number6)
        setRight3(true)
        setStep5(false)
        setStep6(true)
        setMain(Math.floor(num2/num1/10))
        console.log('step5')
    }else if(step5 === true && num1 <= (answer1 - number4*num1)){
        setSmall(true)
        setTimeout(()=>{
            setSmall(false)
        },1500)
        setTimeout(()=>{
            setDone(true)
        },2000)
        setAnswer2()
        setMinus(false)
        setMinus2()
        letMinus2(false)
        setStep5(false)
        setStep4(true)
    }else if(step7 === true && answer2 >= num1 && answer2 < number4*num1){
        setBig(true)
        setTimeout(()=>{
            setBig(false)
        },2000)
        setTimeout(()=>{
            setDone(true)
        },2000)
    }else if(step7 === true && ((number1 < 10 && num1 < 10) || (number1 < 100 && num1 >=10))){
        setMinus3(number4*num1)
        letMinus3(true)
        setNumber5(answer2)
        setNumber6(number4*num1)
        setMinus(true)
        setStep7(false)
        setStep8(true)    
    }else if(step8 === true && number5 - number6 < num1){
        setMain(Math.floor(num2/num1))
        setAnswer3(number5-number6)
    }else if(step8 === true && number5 - number6 >= num1){
        setMain(Math.floor(num2/num1))
        setSmall(true)
        setTimeout(()=>{
            setSmall(false)
        },1500)
        setTimeout(()=>{
            setDone(true)
        },2000)
        setAnswer3()
        setMinus3(false)
        letMinus3(false)
        setStep8(false)
        setStep7(true)
        setMinus(false)
        setMinus3()
    }
  }

 function Nothing(){}

 function Extra(){
    setExtra(false)
}

useEffect(()=>{
    setArr(prevChange => prevChange.sort((a,b)=>Math.random()-0.5))
},[])

  return(
        <div className="Help">
             {extra && !minus && <HelpTimes close={Extra} num1 ={num1} num2 = {number4}  />}
             {extra && minus &&  number5 >= 10 && <StepMinus close={Extra} num1 ={number5} num2 = {number6}  />}
             {extra && minus && number5 < 10 && <HelpMinus close={Extra} num1 ={number5} num2 = {number6}/>}
            <div className='cancel'><button className='cancel-btn' onClick={()=> close()} >X</button></div>
            {(!remainder || num2%num1 === 0)  && <span className="center absolute Green"  style={{fontSize: '30px',width:'106%',top:'65px'}}>{digit && 0}{main}</span>}
            { remainder && num2%num1 != 0 && <span className="center absolute Green"  style={{fontSize:'30px',width:'120%',top:'65px'}}>{num1 > 9 && <span className="hide" >00.</span>}{digit && 0}{main} R {num2%num1}</span>}
            <div className="center" style={{fontSize: '30px'}}>
                {num1}<div style={{borderLeft: '3px solid black', borderTop: '3px solid black', marginLeft:'5px', paddingRight:'10px'}}>
                    <span className="hide">.</span>
                    {number1 >= num1 && !right1 && !right2 && <span className="Green">{number1}</span>}{number1 >= num1 && (right1 || right2) && <span>{number1}</span>}{number1 < num1 && <button style={{fontSize:'30px'}} onClick={() =>{setDigit(true);setNumber1(number1*10+number2);setNumber2(number3);setNumber3()}} className="Red carry">{number1}</button>}
                    {!step3 && number2}{step3 && <button className="carry Green"  style={{fontSize:'30px'}} onClick={() => {setStep3(false);setStep4(true);setAnswer1(answer1*10+number2);setRight1(false);setRight2(true);setMinus(false);setDone(true)}}>{number2}</button>}
                    {!(answer1 < num1 && right2) && !step6 && number3}{step6 && ((number1 < 10 && num1 < 10) || (number1 < 100 && num1 >=10)) && <button className="carry Green"  style={{fontSize:'30px'}} onClick={() => {setStep6(false);setStep7(true);setAnswer2(answer2*10+number3);setMinus(false);setDone(true)}}>{number3}</button>}
                    {answer1 < num1 && right2 && <button className="carry Green"  style={{fontSize:'30px'}} onClick={() => {setMain(main*10);setAnswer1(answer1*10+number3);setNumber1(number1*10+number2);setNumber2(number3);setNumber3()}}>{number3}</button>}
                </div> 
            </div>
            {((number1 < 10 && num1 < 10) || (number1 < 100 && num1 >=10)) && Minus1 &&
            <div className="center absolute" style={{fontSize: '30px',width:'93.5%'}}>
                {num1 >= 10 && <span className="hide" >0</span>}
                <span style={{borderBottom:'2px solid black'}}>-{minus1}</span>
                </div>}

            {((number1 >= 10 && num1 < 10) || (number1 >= 100 && num1 >=10)) && Minus1 &&<div className="center absolute" style={{fontSize: '30px',width:'97.5%'}}>{num1 >= 10 && <span className="hide" >0</span>}<span style={{borderBottom:'2px solid black'}}>-{minus1}</span></div>}

            {((number1 < 10 && num1 < 10) || (number1 < 100 && num1 >=10)) && right1 && <div className="center absolute " style={{fontSize: '30px',width:'96%',top:'170px'}}>{num1 >= 10 &&<span className="hide" >00</span>}<span>{answer1}</span></div>}
            {((number1 >= 10 && num1 < 10) || (number1 >= 100 && num1 >=10)) && right1 && <div className="center absolute" style={{fontSize: '30px',width:'103.5%',top:'170px'}}><span>{answer1}</span></div>}

            {((number1 < 10 && num1 < 10) || (number1 < 100 && num1 >=10)) && number1 === minus1  && right2 && <div className="center absolute" style={{fontSize: '30px',width:'100%',top:'170px'}}><span>{answer1}</span></div>}
            {((number1 >= 10 && num1 < 10) || (number1 >= 100 && num1 >=10)) && number1 === minus1 && answer1 >= num1 && right2 && <div className="center absolute" style={{fontSize: '30px',width:'109%',top:'170px'}}><span>0{answer1}</span></div>}
            {!remainder && ((number1 >= 10 && num1 < 10) || (number1 >= 100 && num1 >=10)) && number1 === minus1 && answer1 < num1 && right2 && <div className="center absolute" style={{fontSize: '30px',width:'109%',top:'170px'}}><button className="carry Green" onClick={()=>{setRemainder(true);setDone(true);setMain(main*10)}} style={{fontSize:'30px'}}>0{answer1}</button></div>}
            {remainder && ((number1 >= 10 && num1 < 10) || (number1 >= 100 && num1 >=10)) && number1 === minus1 && answer1 < num1 && right2 && <div className="center absolute" style={{fontSize: '30px',width:'109%',top:'170px'}}><span>{answer1}</span></div>}            

            {((number1 < 10 && num1 < 10) || (number1 < 100 && num1 >=10)) && !(number1 === minus1) && right2 && <div className="center absolute" style={{fontSize: '30px',width:'100%',top:'170px'}}>{num1 >= 10 &&<span className="hide" >0//</span>}<span>{answer1}</span></div>}
            {((number1 >= 10 && num1 < 10) || (number1 >= 100 && num1 >=10)) && !(number1 === minus1) && answer1 >= num1 && right2 && <div className="center absolute" style={{fontSize: '30px',width:'109%',top:'170px'}}><span>{answer1}</span></div>}
            {!remainder && ((number1 >= 10 && num1 < 10) || (number1 >= 100 && num1 >=10)) && !(number1 === minus1) && answer1 < num1 && right2 && <div className="center absolute" style={{fontSize: '30px',width:'109%',top:'170px'}}><button className="carry Green" onClick={()=>{setRemainder(true);setDone(true);setMain(main*10)}} style={{fontSize:'30px'}}>0{answer1}</button></div>} 
            {remainder && ((number1 >= 10 && num1 < 10) || (number1 >= 100 && num1 >=10)) && !(number1 === minus1) && answer1 < num1 && right2 && <div className="center absolute" style={{fontSize: '30px',width:'109%',top:'170px'}}><span>{answer1}</span></div>}          
            
            {((number1 < 10 && num1 < 10) || (number1 < 100 && num1 >=10)) && Minus2 &&<div className="center absolute" style={{fontSize: '30px',width:'97%',top:'200px'}}>{num1 >= 10 &&<span className="hide" >00</span>}<span style={{borderBottom:'2px solid black'}}>-{minus2}</span></div>}
            {((number1 >= 10 && num1 < 10) || (number1 >= 100 && num1 >=10)) && Minus2 &&<div className="center absolute" style={{fontSize: '30px',width:'106%',top:'200px'}}><span style={{borderBottom:'2px solid black'}}>-{minus2}</span></div>}

            {(((number1 < 10 && num1 < 10) || (number1 < 100 && num1 >=10))) && right3 && <div className="center absolute" style={{fontSize: '30px',width:'105%',top:'235px'}}><span>{num1 > 9 && <span className="hide" >00.</span>}{answer2}</span></div>}
            {!remainder && ((number1 >= 10 && num1 < 10) || (number1 >= 100 && num1 >=10))  && right3 && <div className="center absolute" style={{fontSize: '30px',width:'114%',top:'235px'}}><button className="Green carry" style={{fontSize:'30px'}} onClick={() => {setRemainder(true);setDone(true)} }>{answer2}</button></div>}
            {remainder && ((number1 >= 10 && num1 < 10) || (number1 >= 100 && num1 >=10))  && right3 && <div className="center absolute" style={{fontSize: '30px',width:'114%',top:'235px'}}><span style={{fontSize:'30px'}}>{answer2}</span></div>}

            {((number1 < 10 && num1 < 10) || (number1 < 100 && num1 >=10)) && Minus3 &&<div className="center absolute" style={{fontSize: '30px',width:'102%',top:'265px'}}>{num1 > 9 && <span className="hide" >00.</span>}<span style={{borderBottom:'2px solid black'}}>-{minus3}</span></div>}
            {!remainder && ((number1 < 10 && num1 < 10) || (number1 < 100 && num1 >=10)) && step8 && <div className="center absolute" style={{fontSize: '30px',width:'109%',top:'300px'}}><button className="Green carry" style={{fontSize:'30px'}} onClick={() => {setRemainder(true);setDone(true)} }>{num1 > 9 && <span className="hide" >0.</span>}{answer3}</button></div>}
            {remainder && ((number1 < 10 && num1 < 10) || (number1 < 100 && num1 >=10)) && step8 && <div className="center absolute" style={{fontSize: '30px',width:'109%',top:'300px'}}><span style={{fontSize:'30px'}}>{num1 > 9 && <span className="hide" >0.</span>}{answer3}</span></div>}
                   
                   {done && !remainder && <div style={{display:'flex', justifyContent:'center', alignItems:'end', height:'250px'  }}>
                        <button className="choice-stretch" onClick = {() => {setDone(false);setNumber4(1) }}>{1}</button>
                        <button className="choice-stretch" onClick = {() => {setDone(false);setNumber4(2) }}>{2}</button>
                        <button className="choice-stretch" onClick = {() => {setDone(false);setNumber4(3) }}>{3}</button>
                   </div>} {done && !remainder && <div style={{display:'flex', justifyContent:'center', alignItems:'end'}}>
                        <button className="choice-stretch" onClick = {() => {setDone(false);setNumber4(4) }}>{4}</button>
                        <button className="choice-stretch" onClick = {() => {setDone(false);setNumber4(5) }}>{5}</button>
                        <button className="choice-stretch" onClick = {() => {setDone(false);setNumber4(6) }}>{6}</button>
                   </div>}{done && !remainder && <div style={{display:'flex', justifyContent:'center', alignItems:'end'}}>
                        <button className="choice-stretch" onClick = {() => {setDone(false);setNumber4(7) }}>{7}</button>
                        <button className="choice-stretch" onClick = {() => {setDone(false);setNumber4(8) }}>{8}</button>
                        <button className="choice-stretch" onClick = {() => {setDone(false);setNumber4(9) }}>{9}</button>
                   </div>}

            {big && <div className="double center absolute Pop Red " style={{top:"200px",left:'100px', fontSize:"60px"}}>Too big</div>}
            {small && <div className="double center absolute Pop Red " style={{top:"200px",left:'100px', fontSize:"60px"}}>Too Small</div>}
            {!done && !minus && <div className="center wrap absolute StepQuestion double">{num1} x {number4} = </div>}  
            {!done && !minus &&<div className='center wrap absolute StepAnswer'>
                <Step value = {number4*num1+arr[1]}  answer={number4*num1} Count ={Count} done = {done} mistake={Nothing}/>
                <Step value = {number4*num1+arr[2]}  answer={number4*num1} Count ={Count} done = {done} mistake={Nothing}/>
                <Step value = {number4*num1+arr[3]}  answer={number4*num1} Count ={Count} done = {done} mistake={Nothing}/>
                { <button className="choice" style={{backgroundColor:'yellow',color:'black'}} onClick={()=>{setExtra(true)}} >help</button>}
                <Step value = {number4*num1+arr[0]}  answer={number4*num1} Count ={Count} done = {done} mistake={Nothing}/>
                { <button className="choice red" onClick={close} >Close</button>} 
            </div>}
            {!done && minus && <div className="center wrap absolute StepQuestion double" >{number5} - {number6} = </div>}  
            {!done && minus &&<div className='center wrap absolute StepAnswer'>
                <Step value = {number5-number6+arr[1]}  answer={number5-number6} Count ={Count} done = {done} mistake={Nothing}/>
                <Step value = {number5-number6+arr[3]}  answer={number5-number6} Count ={Count} done = {done} mistake={Nothing}/>
                <Step value = {number5-number6+arr[2]}  answer={number5-number6} Count ={Count} done = {done} mistake={Nothing}/>
                {<button className="choice" style={{backgroundColor:'yellow',color:'black'}} onClick={()=>{setExtra(true)}} >help</button>}
                <Step value = {number5-number6+arr[0]}  answer={number5-number6} Count ={Count} done = {done} mistake={Nothing}/>
                { <button className="choice red" onClick={close} >Close</button>} 
            </div>}
        </div>
    )
}
export default LongDivisionHelp