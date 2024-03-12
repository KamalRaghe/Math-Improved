import { useState } from 'react'
import Step from "./step"
import HelpTimes from './HelpTimes'
import HelpAdd from './HelpAdd'
import StepAdd from './StepAdd'

function StepTimes({close, num1 , num2}){
 const [extra, setExtra] = useState(false)
 const [addNum1, setAddNum1] = useState('160px')   
 const [step1, setStep1] = useState(true)
 const [step2, setStep2] = useState(false)
 const [step3, setStep3] = useState(false)
 const [step4, setStep4] = useState(false)
 const [step5, setStep5] = useState(false)
 const [step6, setStep6] = useState(false)
 const [step7, setStep7] = useState(false)
 const [step8, setStep8] = useState(false)
 const [number3, setNumber3] = useState('')
 const [number4, setNumber4] = useState('')
 const [number1, setNumber1] = useState([(num1 % 10),((num1-(num1%10))/10),(num1 % 10),((num1-(num1%10))/10),(num1*(num2%10))%10,(Math.floor((num1*(num2%10))/10))%10,(Math.floor((num1*(num2%10))/100))%10,num1])
 const [number2, setNumber2] = useState([(num2 % 10),( num2 % 10 ),((num2-(num2%10))/10),((num2-(num2%10))/10),((num1*((num2-(num2%10))/10)*10))%10,(Math.floor(((num1*((num2-(num2%10))/10)*10))/10))%10,((Math.floor(((num1*((num2-(num2%10))/10)*10))/100))),num2])
 const[answer, setAnswer] = useState([(num1%10)*(num2%10),((num1-(num1%10))/10)*(num2 % 10),(num1%10)*((num2-(num2%10))/10),((num1-(num1%10))/10)*((num2-(num2%10))/10),((num1*(num2%10))%10)+(((num1*((num2-(num2%10))/10)*10))%10),((Math.floor((num1*(num2%10))/10))%10)+((Math.floor(((num1*((num2-(num2%10))/10)*10))/10))%10),((Math.floor((num1*(num2%10))/100))%10)+((Math.floor(((num1*((num2-(num2%10))/10)*10))/100))),num1*num2])
 const [done, setDone]= useState(false)
 const [carry, theOne] = useState(false)
 const [sign,toOne] = useState('+')
 const [num4, setNum4] = useState(0)
 const [num5, setNum5] = useState()
 const [sign5,toOne2] = useState('+')
 const [num6, setNum6] = useState(0)
 const [num7, setNum7] = useState()
 const [sign4,toOne3] = useState('+')
 const [num8, setNum8] = useState(0)
 const [num9, setNum9] = useState()
 const [sign2, setSign2] = useState('')
 const [sign3, setSign3] = useState('x')
 const [zero, setZero] = useState(false)
 const [arr, setArr] = useState([0,Math.floor(Math.random()*1+2)+1,1,Math.floor(Math.random()*3)-4])
 const [count, setCount] = useState(0)
 const[add, allowAdd] = useState(false)
 const[stop, setStop] = useState(false)
 const[stop1, setStop1] = useState(false)
 const[move, setMove] = useState('0')
 const[move1, setMove1] = useState('100%')
 const[move2, setMove2] = useState('100%')
 const[last, setLast] = useState(false)

function click(){
    toOne(Math.floor(((num1 % 10)*(num2 % 10))/10))
    setNum4(Math.floor(((num1 % 10)*(num2 % 10))/10))
    setNum5(Math.floor(((num1 % 10)*(num2 % 10))/10))
    setSign2('+')
    setStep2(true)
    setDone(false)
    setStop(true)
}

console.log(Math.floor((num1 % 10)*((num2-(num2%10)))/100))

function click2(){
    toOne2(Math.floor((num1 % 10)*((num2-(num2%10)))/100))
    setNum6(Math.floor((num1 % 10)*((num2-(num2%10)))/100))
    setNum7(Math.floor((num1 % 10)*((num2-(num2%10)))/100))
    setSign2('+')
    setStep2(false)
    setStep3(false)
    setStep4(true)
    setDone(false)
    setStop1(true)
    setZero(false)
    setNumber4(((num1%10)*((num2-(num2%10))/10)%10)*10)
}

function click3(){
    toOne3(1)
    setNum8(1)
    setNum9(1)
    setSign2('+')
    setDone(false)
    setLast(true)
    setMove2('310px')
}

function Zero(){
    setNumber4('0')
    setStep3(true)
    setZero(false)
    setDone(false)
}
console.log((num1%10)*((num2-(num2%10))/10))
console.log((num1%10)*(num2%10))
function Count(){
    setArr(prevChange => prevChange.sort((a,b)=>Math.random()-0.5)) 
    setCount(count+1)
   
    if(((num1%10)*(num2%10)) >= 10){
        theOne(true)
        setDone(true)
    }else{
        setDone(false)
    }

    if(count === 7){
        close()
    }

    if((Math.floor(number3/10))%10+(Math.floor(number4/10))%10 >= 10 ){
        setDone(true)
    }else{
        setDone(false)
    }

    if(step1 === true && carry === false){
        setStep2(true)
    }
       
    if(step1 === true){
        setDone(((num1%10)*(num2%10)) >= 10)
        setStep1(false)
        setNumber3(((num1 % 10)*(num2 % 10) )% 10)
    }else if(step2 === true){
        toOne()
        setNum4(0)
        setNum5()
        setSign2()
        setAddNum1('120px')
        setStep2(false)
        setStep3(true)
        setZero(true)
        setDone(true)
        setNumber3(num1*(num2%10))
    }else if(step3 === true){
        setStep3(false)
        setStep4(true)
        setNumber4(((num1%10)*((num2-(num2%10))/10)%10)*10)
        setZero(false)
        setDone(((num1%10)*((num2-(num2%10))/10)) >=10)
    }else if(step4 === true){
        toOne2()
        setSign2()
        setNum6(0)
        setNum7()
        setStep4(false)
        setStep5(true)
        allowAdd(true)
        setDone(false)
        setNumber4(num1*((num2-(num2%10))/10)*10)
        setMove('0px')
        setMove1('292px')
        setSign3('+')
        setZero(false)
    }else if(step5 === true){
        setDone(false)
        setStep5(false)
        setStep6(true)
    } else if(step6 === true) {
        setStep6(false)
        setStep7(true)
    }else if(step7 === true){
        setDone(false)
        toOne3()
        setSign2()
        setNum8(0)
        setNum9()
        setStep7(false)
        setStep8(true)
        setSign3('x')
        setMove2( '100%')
    }else{
        setNumber1()
        setAnswer()
        setNumber2()
    }
    
    
}function nothing(){}

function Extra(){
    setExtra(false)
}
     return(
        <div className="Help" style={{zIndex:'20',border:'10px solid yellow'}}>
            {extra && (step1||step2||step3||step4) && <HelpTimes close={Extra} num1 ={number1[count]} num2 = {number2[count]} num3={num5 || num7 || num9} />}
            {extra && !(step1||step2||step3||step4||step7) && <HelpAdd close={Extra} num1 ={number1[count]} num2 = {number2[count]} num3={num8} />}
            {extra && step7 && number2[count] <= 9 && <HelpAdd close={Extra} num1 ={number1[count]} num2 = {number2[count]} num3={num8} />}
            {extra && step7 && number2[count] > 9 && <StepAdd close={Extra} num1 ={number1[count]+num8} num2 = {number2[count]} />}
            <div className='cancel' style={{paddingBottom:'0px'}}><button className='cancel-btn hide' style={{paddingBottom:'0px'}}>X</button></div>
            <div className='center absolute' style={{left:'155px', top: '60px'}}>
                <span className='hide'>0</span>
                {carry && !stop && !step3 ? <button className='carry Green' onClick={click}>{sign}</button>:null}
                {stop ? <button className=' back2Step2 Green' onClick={click}>{sign}</button>:null}
                {stop1 ? <button className=' back2Step2 Green' onClick={click}>{sign5}</button>:null}
                {(num1%10)*((num2-(num2%10))/10)>10 && step4===true && !stop1? <button className='carry Green' onClick={click2}>{sign5}</button>:null}
            </div>
            <div className='double center top-number'>
                {step2 || step4 || step8 ? <span className='Green'>{(num1-(num1%10))/10}</span>:<span>{(num1-(num1%10))/10}</span>} 
                {step1 || step3 || step8 ? <span className='Green'>{num1%10}</span>:<span>{num1%10}</span>}
            </div>
            <div className=' double center'>
                <div>
                    <span className='bottom-number'>x</span>{step3 || step4 || step8 ? <span className='Green bottom-number'>{(num2-(num2%10))/10}</span>:<span className='bottom-number'>{(num2-(num2%10))/10}</span>} 
                    {step1 || step2 || step8  ? <span className='Green bottom-number'>{num2%10}</span>:<span className='bottom-number'>{num2%10}</span>}
                </div>
            </div>
            {step7 && (Math.floor(number3/10))%10+(Math.floor(number4/10))%10 >= 10 && !last? <span className='center' style={{width:'308px'}}><button className='carry Green' onClick={click3}>{sign4}</button></span>:null}
            {last ? <span className='center' style={{width:'295px'}}><button className='back2Step2 Green' onClick={click3}>{sign4}</button></span>:null}
            <div className='double center' style={{width: move2}} > 
                {step7 && (Math.floor(number3/10))%10+(Math.floor(number4/10))%10 >= 10 && last && <span className='Green relative' style={{paddingRight: "5px",top:'7px'}} >+</span>}
                {!add ? <span className='lower-number'>{number3}</span>:<span></span>}
                {step8 && add ? <span className='lower-number'><span>{(Math.floor(number3/100))%10}</span>{(Math.floor(number3/10))%10}{number3%10}</span>:null}
                {step7 && add ? <span className='lower-number'><span className='Green'>{(Math.floor(number3/100))%10}</span>{(Math.floor(number3/10))%10}{number3%10}</span>:<div></div>}
                {step6 && add ? <span className='lower-number'>{(Math.floor(number3/100))%10}<span className='Green'>{(Math.floor(number3/10))%10}</span>{number3%10}</span>:null}
                {step5 && add ? <span className='lower-number'>{(Math.floor(number3/100))%10}{(Math.floor(number3/10))%10}<span className='Green'>{number3%10}</span></span>:null}
            </div>
            <div className='double center' style={{paddingTop:'10px',width: move1,left: move}}>
                {number4 < 1000 && (step5 || step6 || step7 || step8) && <span className='hide'>0</span>}
                {!add ? <span className='lower-number' >{number4}</span>:<span></span>}
                {step8 && add ?  <span style={{borderBottom: '2px solid black'}} >+ <span>{(Math.floor(number4/100))}</span>{(Math.floor(number4/10))%10}{number4%10}</span>:null}
                {step7 && add ?  <span style={{borderBottom: '2px solid black'}} >+ <span className='Green'>{(Math.floor(number4/100))}</span>{(Math.floor(number4/10))%10}{number4%10}</span>:null}
                {step6 && add ?  <span style={{borderBottom: '2px solid black'}} >+ {(Math.floor(number4/100))}<span className='Green'>{(Math.floor(number4/10))%10}</span>{number4%10}</span>:null}
                {step5 && add ?  <span style={{borderBottom: '2px solid black'}} >+ {(Math.floor(number4/100))}{(Math.floor(number4/10))%10}<span className='Green'>{number4%10}</span></span>:<div></div>}
                {zero ? <button className='carry' onClick={Zero}>+</button>: null}
            </div>
            {add ?<div className='center double'><div className="Line-big"></div></div>: null}
            {step6 ? <div className='center double Green' style={{width: '325px'}}><span className='hide'>000</span>{number3%10+number4%10}</div>: null}
            {step7 ? <div className='center double Green' style={{width: '325px'}}><span className='hide'>00</span>{(number3%100+number4%100)%100}</div>: null}
            {step8 ? <div className='center double Green' style={{width: '325px'}}>{number3+number4 < 1000 && <span className='hide'>0</span>}{number3+number4}</div>: null}
            { !done && !(step7 && (Math.floor(number3/10))%10+(Math.floor(number4/10))%10 >= 10) && <div className=" double center absolute Green StepQuestion">{number1[count]} {sign3} {number2[count]} {sign2}  {num9}{num7}{num5} = </div>}
            {!done && <div className='center wrap absolute StepAnswer'>
                <Step value = { num8 + num6 + num4 + answer[count]+arr[1]}  answer={ num8 + num6 + num4 + answer[count]} Count ={Count} done = {done} mistake = {nothing}/>
                <Step value = { num8 + num6 + num4 + answer[count]+arr[2]}  answer={ num8 + num6 + num4 + answer[count]} Count ={Count} done = {done} mistake = {nothing}/>
                <Step value = { num8 + num6 + num4 + answer[count]+arr[0]}  answer={ num8 + num6 + num4 + answer[count]} Count ={Count} done = {done} mistake = {nothing}/>
                {!step8 && <button className="choice" style={{backgroundColor:'yellow',color:'black'}} onClick={()=>{setExtra(true);console.log(extra)}} >help</button>}
                <Step value = { num8 + num6 + num4 + answer[count]+arr[3]}  answer={ num8 + num6 + num4 + answer[count]} Count ={Count} done = {done} mistake = {nothing}/>
                {!step8 && <button className="choice red" onClick={close} >Close</button>} 
            </div>}
        </div>
    )
}
export default StepTimes