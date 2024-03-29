import { useEffect, useState } from "react"
import Step from "./step"

export default function HelpMode({num1,num8,close}){
    const [done,setDone] = useState(true)
    
    const[array, setArray] = useState(num8)
    const [sign, setSign] = useState()
    const [answer, setAnswer] = useState(0)
    const [count, setCount] = useState(0)
    const[loaded, setLoaded] = useState(false)
    const[big, setBig] = useState(false)
    const[Q1, setQ1] = useState() 
    const[Q2, setQ2] = useState() 
    function Nothing(){}
    function Count(){
       
    }
    function order(num){
        setCount(num)
    }

    return (
        <div className="Help">
            <div className='cancel'><button className='cancel-btn' onClick = {close}>X</button></div>
            <div className="double center">
                {array[0] >= 1 ? <span><button onClick = {() => order(array[0])} className="carry Green">{array[0]}</button><span className="hide" >.</span></span>:<span>{array[0]}<span className="hide" >.</span></span>}
                {array[1] >= 1 ? <span><button onClick = {() => order(array[1])} className="carry Green">{array[1]}</button><span className="hide" >.</span></span>:<span>{array[1]}<span className="hide" >.</span></span>}
                {array[2] >= 1 ? <span><button onClick = {() => order(array[2])} className="carry Green">{array[2]}</button><span className="hide" >.</span></span>:<span>{array[2]}<span className="hide" >.</span></span>}
                {array[3] >= 1 ? <span><button onClick = {() => order(array[3])} className="carry Green">{array[3]}</button><span className="hide" >.</span></span>:<span>{array[3]}<span className="hide" >.</span></span>}
                {array[4] >= 1 ? <span><button onClick = {() => order(array[4])} className="carry Green">{array[4]}</button><span className="hide" >.</span></span>:<span>{array[4]}<span className="hide" >.</span></span>} 
                {array[5] >= 1 ? <span><button onClick = {() => order(array[5])} className="carry Green">{array[5]}</button><span className="hide" >.</span></span>:<span>{array[5]}<span className="hide" >.</span></span>} 
                {array[5] >= 1 ? <span><button onClick = {() => order(array[5])} className="carry Green">{array[6]}</button><span className="hide" >.</span></span>:<span>{array[6]}<span className="hide" >.</span></span>} 
            </div><div style={{height:'80px'}}>{big && <div className="Pop center Red">Too big</div>}</div>
            <div className="double center">
                { count === array[0] && count === num1 && <span className="Green">{array[0]}<span className="hide" >.</span></span>}
                { count === array[1] && count === num1 && <span className="Green">{array[1]}<span className="hide" >.</span></span>}
                { count === array[2] && count === num1 && <span className="Green">{array[2]}<span className="hide" >.</span></span>}
                { count === array[3] && count === num1 && <span className="Green">{array[3]}<span className="hide" >.</span></span>}
                { count === array[4] && count === num1 && <span className="Green">{array[4]}<span className="hide" >.</span></span>} 
                { count === array[5] && count === num1 && <span className="Green">{array[5]}<span className="hide" >.</span></span>}
                { count === array[6] && count === num1 && <span className="Green">{array[5]}<span className="hide" >.</span></span>}

                { count === array[0] && count !== num1 && <span className="Red">{array[0]}<span className="hide" >.</span></span>}
                { count === array[1] && count !== num1 && <span className="Red">{array[1]}<span className="hide" >.</span></span>}
                { count === array[2] && count !== num1 && <span className="Red">{array[2]}<span className="hide" >.</span></span>}
                { count === array[3] && count !== num1 && <span className="Red">{array[3]}<span className="hide" >.</span></span>}
                { count === array[4] && count !== num1 && <span className="Red">{array[4]}<span className="hide" >.</span></span>} 
                { count === array[5] && count !== num1 && <span className="Red">{array[5]}<span className="hide" >.</span></span>}  
                { count === array[6] && count !== num1 && <span className="Red">{array[6]}<span className="hide" >.</span></span>}  
            </div>
        </div>
    )
}