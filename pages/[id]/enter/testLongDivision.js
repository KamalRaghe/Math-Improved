import { useEffect, useState } from "react";
import Choice from "@/components/choice";
import { useRouter } from "next/router";
import Heart from "@/components/heart";
import Heart1 from "@/components/heart1";
import Heart2 from "@/components/heart2";
import Heart3 from "@/components/heart3";
import Timeout from "@/components/timeout";
import Pass from "@/components/pass";
import Mistake from "@/components/mistake";
import LongDivisionHelp from "@/components/longDivisionHelp";

export async function getServerSideProps(context){
    return{
        props: {
        }
    }
}

export default function DoubleAdd(){
    const [again, setAgain] = useState(false)
    const [loaded, setLoaded] = useState(false)
    const [correct, setCorrect] = useState(false)
    const[ wrong, setWrong] = useState(false)
    const [num1, setNum1] = useState(Math.ceil(Math.random()*8+1));
    const [num2, setNum2] = useState(Math.ceil(Math.random()*900+99));
    const [num3, setNum3] = useState([0,1,-1,Math.ceil(Math.random()*2+1),-1*Math.ceil(Math.random()*2+1)])
    const [mistake, setMistake] = useState(0)
    const [count, setCount] = useState(0)
    const [help, setHelp] = useState(false)
    const [time, setTime] = useState( 600000 + Date.now())
    const [date, setDate] = useState(Date.now()) 
    const router = useRouter()
    const {username} = router.query 
    const {id} = router.query
    
    function Again(){
        setAgain(true)
        setCount(0)
        setMistake(0)
        setTime(600000 + Date.now())
        setLoaded(true)
    }

    function open(){
        setHelp(true)
        console.log(help)
      }
      function close(){
        setHelp(false)
      }

    function mix(){
        setNum3([0,1,-1,Math.ceil(Math.random()*2+1),-1*Math.ceil(Math.random()*2+1)])
    }

    function update(){
        setDate(requestAnimationFrame(update))
      }

    function CorrectA(){ 
        setCorrect(true)
        setTimeout(() => {
            setCorrect(false) 
        }, 1500);
        setCount(count+1)
      }
  
      function WrongA(){ 
        setMistake( mistake + 1)
        console.log(mistake)
        setWrong(true)
        setTimeout(() => {
            setWrong(false) 
        }, 1500);
      } 
    function Add(){
        setTimeout(() => {
            setNum1(Math.ceil(Math.random()*8+1))
            setNum2(Math.ceil(Math.random()*900+99))
            mix()
            setNum3(prevChange => prevChange.sort((a,b)=>Math.random()-0.5)) 
        }, 1500)
    }

    function cancel(){
        setDate(cancelAnimationFrame(date))
      }

    useEffect(() =>{
        mix()
        setNum3(prevChange => prevChange.sort((a,b)=>Math.random()-0.5))
     },[num1])

    useEffect(() =>{
        setLoaded(true)
        update()
    },[])


    useEffect(() =>{
        setAgain(false)
    },[again])

    useEffect(() =>{
        if(mistake >= 3 || time - Date.now() < 0 || count >= 10){
            setLoaded(false)
            setTime(time)
            console.log(time)
            cancel()
        }
    })

    useEffect(()=>{
        const ID = window.localStorage.getItem('ID')
        if(!(ID === id)){
            router.push("/")
        }
    },[])

    return(
        <div className="beige container column">
           <div className="double">Question left : {10 - count}</div>
           <div className="inTest">
            
                <div className="Red relative" > 
                    {mistake === 0 && <Heart/>}
                    {mistake === 1 && <Heart1/>}
                    {mistake === 2 && <Heart2/>}
                    {mistake === 3 && <Heart3/>}
                </div>
                {loaded && time - Date.now() > 0 && count < 10 && <div>{Math.floor(((time - Date.now())%(1000*60*60))/1000/60)}m {""}
                {Math.floor(((time - Date.now())%(1000*60))/1000)}s</div>}
            </div>

            <div style={{width:"100%"}}>
                <div className="center double Green" style={{width:"105.5%"}}><span></span>{correct && num2/num1 < 100 && <span className="hide">0</span>}{correct && loaded && ((num2-(num2 % num1))/num1)}{correct && num2%num1 > 0 && "R"+ (num2%num1)}</div>
                <div className="center double Red" style={{marginBottom:'15px', width:"105.5%"}}><span></span>{wrong && num2/num1 < 100 && <span className="hide">0</span>}{wrong && loaded && ((num2-(num2 % num1))/num1)}{wrong && num2%num1 > 0 && "R"+ (num2%num1)}</div>
                <div className="double center" style={{ height: '10px'}}>{loaded && num1}<div style={{borderLeft: '3px solid black', borderTop: '3px solid black', margin:'5px', paddingRight:'10px'}}><span className="hide">.</span>{loaded && num2}</div> </div>
            </div>
            <div className="box">
          
            </div>
            { time - Date.now() < 0 && <Timeout again ={Again}/>}
            {mistake === 3 && <Mistake again={Again}></Mistake>}
            {count === 10 && <Pass time ={600000 -(time-Date.now())}/>}
            <div className="box column">
                <div className="row ">
                    { loaded && num2 % num1 > 0 && <Choice  value ={((num2-(num2 % num1))/num1)-num3[0] + "R"+ (num2%num1)} answer ={((num2-(num2 % num1))/num1) + "R"+ (num2%num1)} doSomething = {Add} Correct={CorrectA} Wrong={WrongA}/>}
                    { loaded && num2 % num1 > 0 && <Choice  value ={((num2-(num2 % num1))/num1)-num3[1] + "R"+ (num2%num1)} answer ={((num2-(num2 % num1))/num1) + "R"+ (num2%num1)} doSomething = {Add} Correct={CorrectA} Wrong={WrongA}/>}
                    { loaded && num2 % num1 > 0 && <Choice  value ={((num2-(num2 % num1))/num1)-num3[2] + "R"+ (num2%num1)} answer ={((num2-(num2 % num1))/num1) + "R"+ (num2%num1)} doSomething = {Add} Correct={CorrectA} Wrong={WrongA}/>}
               </div>
               <div className="row">
                    { loaded && num2 % num1 > 0 && <Choice  value ={((num2-(num2 % num1))/num1)-num3[3] + "R"+ (num2%num1)} answer ={((num2-(num2 % num1))/num1) + "R"+ (num2%num1)} doSomething = {Add} Correct={CorrectA} Wrong={WrongA}/>}
                    { loaded && num2 % num1 > 0 && <Choice  value ={((num2-(num2 % num1))/num1)-num3[4] + "R"+ (num2%num1)} answer ={((num2-(num2 % num1))/num1) + "R"+ (num2%num1)} doSomething = {Add} Correct={CorrectA} Wrong={WrongA}/>}
               </div>
               <div className="row ">
                    { loaded && num2 % num1 === 0 && <Choice  value ={((num2-(num2 % num1))/num1)-num3[0]} answer ={((num2-(num2 % num1))/num1) + "R"+ (num2%num1)} doSomething = {Add} Correct={CorrectA} Wrong={WrongA}/>}
                    { loaded && num2 % num1 === 0 && <Choice  value ={((num2-(num2 % num1))/num1)-num3[1]} answer ={((num2-(num2 % num1))/num1) + "R"+ (num2%num1)} doSomething = {Add} Correct={CorrectA} Wrong={WrongA}/>}
                    { loaded && num2 % num1 === 0 && <Choice  value ={((num2-(num2 % num1))/num1)-num3[2]} answer ={((num2-(num2 % num1))/num1) + "R"+ (num2%num1)} doSomething = {Add} Correct={CorrectA} Wrong={WrongA}/>}
               </div>
               <div className="row">
                    { loaded && num2 % num1 === 0 && <Choice  value ={((num2-(num2 % num1))/num1)-num3[3]} answer ={((num2-(num2 % num1))/num1) + "R"+ (num2%num1)} doSomething = {Add} Correct={CorrectA} Wrong={WrongA}/>}
                    { loaded && num2 % num1 === 0 && <Choice  value ={((num2-(num2 % num1))/num1)-num3[4]} answer ={((num2-(num2 % num1))/num1) + "R"+ (num2%num1)} doSomething = {Add} Correct={CorrectA} Wrong={WrongA}/>}
               </div>
            </div>
        </div>
    )
}