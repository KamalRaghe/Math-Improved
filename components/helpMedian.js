import { useEffect, useState } from "react"
import Step from "./step"
import HelpAdd from "./HelpAdd"

export default function HelpMedian({num1,close}){
    const [done,setDone] = useState(true)
    const [extra, setExtra] = useState(false)
    const[array, setArray] = useState([num1[0],num1[1],num1[2],num1[3],num1[4],num1[5]])
    const [sign, setSign] = useState()
    const [arr, setArr] = useState([0,Math.floor(Math.random()*1+2)+1,1,Math.floor(Math.random()*3)-4])
    const [answer, setAnswer] = useState(0)
    const [count, setCount] = useState(0)
    const[loaded, setLoaded] = useState(false)
    const[big, setBig] = useState(false)
    const[Q1, setQ1] = useState() 
    const[Q2, setQ2] = useState() 
    function Nothing(){}
    function Count(){
       if(Q1 === array[2]){
        setAnswer((array[2]+array[3])/2)
        setQ1(array[2]+array[3])
        setQ2(2)
        setSign('÷')
       }else{
        close()
       }
    }
    function order(num){
        if (num === array[count]){
            setCount(count+1)
        }if(count >= 5){
            setDone(false)
            setAnswer(array[2]+array[3])
            setQ1(array[2])
            setQ2(array[3])
            setSign('+')
        }else if(num > array[count]){
            setBig(true)
            setTimeout(() => {
                setBig(false)
            }, 2000);
        }
    }
    useEffect(()=>{
       setArray(prev =>prev.sort((a,b) => a-b))
       console.log(array)
       setLoaded(true)
    },[])

    function Extra(){
        setExtra(false)
    }

    return (
        <div className="Help">
            {extra && sign == '+' && <HelpAdd close={Extra} num1 ={Q1} num2 = {Q2}/>}
            <div className='cancel'><button className='cancel-btn' onClick = {close}>X</button></div>
            <div className="double center">
                {num1[0] >= array[count] ? <span><button onClick = {() => order(num1[0])} className="carry Green">{num1[0]}</button><span className="hide" >.</span></span>:<span>{num1[0]}<span className="hide" >.</span></span>}
                {num1[1] >= array[count] ? <span><button onClick = {() => order(num1[1])} className="carry Green">{num1[1]}</button><span className="hide" >.</span></span>:<span>{num1[1]}<span className="hide" >.</span></span>}
                {num1[2] >= array[count] ? <span><button onClick = {() => order(num1[2])} className="carry Green">{num1[2]}</button><span className="hide" >.</span></span>:<span>{num1[2]}<span className="hide" >.</span></span>}
                {num1[3] >= array[count] ? <span><button onClick = {() => order(num1[3])} className="carry Green">{num1[3]}</button><span className="hide" >.</span></span>:<span>{num1[3]}<span className="hide" >.</span></span>}
                {num1[4] >= array[count] ? <span><button onClick = {() => order(num1[4])} className="carry Green">{num1[4]}</button><span className="hide" >.</span></span>:<span>{num1[4]}<span className="hide" >.</span></span>} 
                {num1[5] >= array[count] ? <span><button onClick = {() => order(num1[5])} className="carry Green">{num1[5]}</button><span className="hide" >.</span></span>:<span>{num1[5]}<span className="hide" >.</span></span>} 
            </div><div style={{height:'80px'}}>{big && <div className="Pop center Red">Too big</div>}</div>
            <div className="double center">
                { count >= 1 && loaded &&<span className="Green">{array[0]}<span className="hide" >.</span></span>}
                { count >= 2 && loaded &&<span className="Green">{array[1]}<span className="hide" >.</span></span>}
                { count >= 3 && loaded &&<span className="Green">{array[2]}<span className="hide" >.</span></span>}
                { count >= 4 && loaded &&<span className="Green">{array[3]}<span className="hide" >.</span></span>}
                { count >= 5 && loaded &&<span className="Green">{array[4]}<span className="hide" >.</span></span>} 
                { count >= 6 && loaded &&<span className="Green">{array[5]}<span className="hide" >.</span></span>} 
            </div>
                
            <div className=" double center Green absolute StepQuestion">{Q1} {sign} {Q2} {count === 6 && "="}</div>  
               {!done &&<div className='center wrap absolute StepAnswer'>
                   <Step value = {answer+arr[0]}  answer={answer} Count ={Count} done = {done} mistake={Nothing}/>
                   <Step value = {answer+arr[2]}  answer={answer} Count ={Count} done = {done} mistake={Nothing}/>
                   <Step value = {answer+arr[3]}  answer={answer} Count ={Count} done = {done} mistake={Nothing}/>
                   <button className="choice" style={{backgroundColor:'yellow',color:'black'}} onClick={()=>{setExtra(true);console.log(extra)}} >help</button>
                   <Step value = {answer+arr[1]}  answer={answer} Count ={Count} done = {done} mistake={Nothing}/>
                   <button className="choice red" onClick={close} >Close</button>
               </div>}
        </div>
    )
}