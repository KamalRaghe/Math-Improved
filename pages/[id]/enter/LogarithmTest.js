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

export default function DoubleAdd(){
    const [again, setAgain] = useState(false)
    const [loaded, setLoaded] = useState(false)
    const [correct, setCorrect] = useState(false)
    const[ wrong, setWrong] = useState(false)
    const [num, setNum] = useState(Math.floor(Math.random()*29));
    const [num1, setNum1] = useState([2,2,2,2,2,3,3,3,3,3,4,4,4,4,5,5,5,6,6,6,7,7,7,8,8,8,9,9,9]);
    const [num2, setNum2] = useState([2,4,8,16,32,3,9,27,81,243,4,16,64,256,5,25,125,6,36,216,7,49,343,8,64,512,9,81,729]);
    const [answer, setAnswer] = useState([1,2,3,4,5,1,2,3,4,5,1,2,3,4,1,2,3,1,2,3,1,2,3,1,2,3,1,2,3])
    const [num3, setNum3] = useState([1,2,3,4,5])
    const [mistake, setMistake] = useState(0)
    const [count, setCount] = useState(0)
    const [time, setTime] = useState( 300000 + Date.now())
    const [date, setDate] = useState(Date.now()) 
    const router = useRouter()
    const {username} = router.query 
    const {id} = router.query
    
    function Again(){
        setAgain(true)
        setCount(0)
        setMistake(0)
        setTime(300000 + Date.now())
        setLoaded(true)
    }

    function mix(){
        setNum3([1,2,3,4,5])
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
            setNum(Math.floor(Math.random()*29))
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
        const ID = window.localStorage.getItem('ID')
        if(!(ID === id)){
            router.push("/")
        }
    },[])


    useEffect(() =>{
        setAgain(false)
    },[again])

    useEffect(() =>{
        if(mistake >= 3 || time - Date.now() < 0 || count >= 25){
            setLoaded(false)
            setTime(time)
            console.log(time)
            cancel()
        }
    })

    return(
        <div className="beige container column">
           <div className="double">Question left : {25 - count}</div>
           <div className="inTest">
            
                <div className="Red relative" > 
                    {mistake === 0 && <Heart/>}
                    {mistake === 1 && <Heart1/>}
                    {mistake === 2 && <Heart2/>}
                    {mistake === 3 && <Heart3/>}
                </div>
                {loaded && time - Date.now() > 0 && count < 25 && <div>{Math.floor(((time - Date.now())%(1000*60*60))/1000/60)}m {""}
                {Math.floor(((time - Date.now())%(1000*60))/1000)}s</div>}
            </div>

            <div style={{width:"100%"}}>
            <div className="double center">log<span style={{fontSize:'20px',padding:'1px',position:'relative', top:"13px"}}>{loaded && num1[num]}</span>{loaded && num2[num]} =<span className="hide" >.</span> {correct && <div className="Green double" >{answer[num]}</div>}{wrong && <div className="double center Red">{answer[num]}</div>}</div>
            </div>
            <div className="box">
                
            </div>
            { time - Date.now() < 0 && <Timeout again ={Again}/>}
            {mistake === 3 && <Mistake again={Again}></Mistake>}
            {count === 25 && <Pass time ={300000 -(time-Date.now())}/>}
            <div className="box column">
            <div className="box column">
               <div className="row ">
                    { loaded && <Choice value ={loaded && num3[0]} answer ={loaded && answer[num]} doSomething = {Add} Correct={CorrectA} Wrong={WrongA}/>}
                    { loaded && <Choice value ={loaded && num3[1]} answer ={loaded && answer[num]} doSomething = {Add} Correct={CorrectA} Wrong={WrongA}/>}
                    { loaded && <Choice value ={loaded && num3[2]} answer ={loaded && answer[num]} doSomething = {Add} Correct={CorrectA} Wrong={WrongA}/>}
               </div>
               <div className="row">
                    { loaded && <Choice value ={loaded && num3[3]} answer ={loaded && answer[num]} doSomething = {Add} Correct={CorrectA} Wrong={WrongA}/>}
                    { loaded && <Choice value ={loaded && num3[4]} answer ={loaded && answer[num]} doSomething = {Add} Correct={CorrectA} Wrong={WrongA}/>}
               </div>
            </div>
            </div>
        </div>
    )
}