import { useEffect, useState } from "react";
import Choice from "@/components/choice";
import { useRouter } from "next/router";
import Heart from "@/components/heart";
import Heart1 from "@/components/heart1";
import Heart2 from "@/components/heart2";
import Heart3 from "@/components/heart3";
import Timeout from "@/components/timeout";
import Question from "@/Bedmas/Question";
import Question1 from "@/Bedmas/Question1";
import Question2 from "@/Bedmas/Question2";
import Question3 from "@/Bedmas/Question3";
import Question4 from "@/Bedmas/Question4";
import Question5 from "@/Bedmas/Question5";
import Question6 from "@/Bedmas/Question6";
import Question7 from "@/Bedmas/Question7";
import Question8 from "@/Bedmas/Question8";
import Pass from "@/components/pass";
import Mistake from "@/components/mistake";

export default function DoubleAdd(){
    const [again, setAgain] = useState(false)
    const [loaded, setLoaded] = useState(false)
    const [correct, setCorrect] = useState(false)
    const[ wrong, setWrong] = useState(false)
    const [num, setNum] = useState(Math.floor(Math.random()*9));
    const [num1, setNum1] = useState(Math.ceil(Math.random()*9));
    const [num2, setNum2] = useState(Math.ceil(Math.random()*9));
    const [num4, setNum4] = useState(Math.ceil(Math.random()*9));
    const [num5, setNum5] = useState(Math.ceil(Math.random()*9));
    const [num6, setNum6] = useState(Math.ceil(Math.random()*9));
    const [num7, setNum7] = useState([
        (num4*num5)+((num1+num2)*(num1+num2)),
        ((num1+num2)*(num1+num2)) + (num4*num5),
        num1+num2+num5 , 
        ((num1+num2)*(num1+num2))+num6-(num4*num5),
        (num1+num2)+num6*num4+num5,
        (num4*num5)+(num6+(num1+num2)),
        (num1+num2)+(num6*num4)+(num5*num5),
        (num6+((num1+num2)*num4))+num5 ,
        (num4*num4)+num5 + ((num1+num2)*num6) 
    ]);
    const [num3, setNum3] = useState([0,num1+num1,num2+num2+num2,-1*num1,num2])
    const [mistake, setMistake] = useState(0)
    const [count, setCount] = useState(0)
    const [time, setTime] = useState( 600000 + Date.now())
    const [date, setDate] = useState(Date.now()) 
    const [help, setHelp] = useState(false)
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
        setWrong(true)
        setTimeout(() => {
            setWrong(false) 
        }, 1500);
      }
      
      function open(){
        setHelp(true)
      }
      function close(){
        setHelp(false)
      }

    function Add(){
        setTimeout(() => {
            setNum(Math.floor(Math.random()*9))
            setNum1(Math.ceil(Math.random()*9))
            setNum2(Math.ceil(Math.random()*9))
            setNum5(Math.ceil(Math.random()*9))
            setNum4(Math.ceil(Math.random()*9)) 
            setNum6(Math.ceil(Math.random()*9)) 
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
        if(mistake >= 3 || time - Date.now() < 0 || count >= 15){
            setLoaded(false)
            setTime(time)
            cancel()
        }
    })

    useEffect(() =>{
        mix()
        setNum3(prevChange => prevChange.sort((a,b)=>Math.random()-0.5))
        setNum7([
         (num4*num5)+((num1+num2)*(num1+num2)),
         ((num1+num2)*(num1+num2)) + (num4*num5),
         num1+num2+num5 , 
         ((num1+num2)*(num1+num2))+num6-(num4*num5),
         (num1+num2)+num6*num4+num5,
         (num4*num5)+(num6+(num1+num2)),
         (num1+num2)+(num6*num4)+(num5*num5),
         (num6+((num1+num2)*num4))+num5 ,
         (num4*num4)+num5 + ((num1+num2)*num6) 
     ])
     },[num1,num2,num4])

    return(
        <div className="beige container column">
           <div className="double">Question left : {15 - count}</div>
           <div className="inTest">
            
                <div className="Red relative" > 
                    {mistake === 0 && <Heart/>}
                    {mistake === 1 && <Heart1/>}
                    {mistake === 2 && <Heart2/>}
                    {mistake === 3 && <Heart3/>}
                </div>
                {loaded && time - Date.now() > 0 && count < 15 && <div>{Math.floor(((time - Date.now())%(1000*60*60))/1000/60)}m {""}
                {Math.floor(((time - Date.now())%(1000*60))/1000)}s</div>}
            </div>

            <div className = 'center'style={{width:"100%"}}>
                 {/* (num4*num5)+((num1+num2)*(num1+num2)) */}
                {loaded && num === 0 && <div className="double">{num4} x {num5} + ({num1} + {num2})<span style={{fontSize:'20px',position:'relative', top:"-19px"}}>2</span> = </div>}
                {/* ((num1+num2)*(num1+num2)) + (num4*num5) */}
                {loaded && num === 1 && <div className="double">({num1} + {num2})<span style={{fontSize:'20px',position:'relative', top:"-19px"}}>2</span> + {num4} x {num5} = </div>}
                {/* num1+num2+num5 */}
                {loaded && num === 2 && <div className="double">({num1} + {num2}) + {num5*num4} ÷ {num4} = </div>}
                {/* ((num1+num2)*(num1+num2))+num6-(num4*num5) */}
                {loaded && num === 3 && <div className="double">({num1} + {num2})<span style={{fontSize:'20px',position:'relative', top:"-19px"}}>2</span> + {num6}  - {num4} x {num5} = </div>}
                {/* (num1+num2)+num6*num4+num5 */}
                {loaded && num === 4 && <div className="double">({num1} + {num2}) + {num6} x {num4} + {num5} =</div>}
                {/* (num4*num5)+(num6+(num1+num2)) */}
                {loaded && num === 5 && <div className="double"> {num4} x {num5} + ({num1} + {num2}) + {num6} =</div>}
                {/*(num1+num2)+(num6*num4)+(num5*num5)*/}
                {loaded && num === 6 && <div className="double">({num1} + {num2}) + {num6} x {num4} + {num5}<span style={{fontSize:'20px',position:'relative', top:"-19px"}}>2</span>  = </div>}
                {/* (num6+((num1+num2)*num4))+num5 */}
                {loaded && num === 7 && <div className="double"> {num6} + ({num1} + {num2}) x {num4} + {num5} =</div>}
                {/* (num4*num4)+num5 + ((num1+num2)*num6) */}
                {loaded && num === 8 && <div className="double"> {num4}<span style={{fontSize:'20px',position:'relative', top:"-19px"}}>2</span> + {num5} + ({num1} + {num2}) x {num6} = </div>}
                {correct && <div className="center double Green"><span className="hide">.</span>{num7[num]}</div>}
                {wrong && <div className="center double Red"><span className="hide">.</span>{num7[num]}</div>}
            </div>
                        
            <div className="box">
                
            
            </div>
            { time - Date.now() < 0 && <Timeout again ={Again}/>}
            {mistake === 3 && <Mistake again={Again}></Mistake>}
            {count === 15 && <Pass time ={600000 -(time-Date.now())}/>}
            <div className="box column">
                <div className="row ">
                    { loaded && <Choice value ={num7[num]+num3[0]} answer ={num7[num]} doSomething = {Add} Correct={CorrectA} Wrong={WrongA}/>}
                    { loaded && <Choice value ={num7[num]+num3[1]} answer ={num7[num]} doSomething = {Add} Correct={CorrectA} Wrong={WrongA}/>}
                    { loaded && <Choice value ={num7[num]+num3[2]} answer ={num7[num]} doSomething = {Add} Correct={CorrectA} Wrong={WrongA}/>}
               </div>
               <div className="row">
                    { loaded && <Choice value ={num7[num]+num3[3]} answer ={num7[num]} doSomething = {Add} Correct={CorrectA} Wrong={WrongA}/>}
                    { loaded && <Choice value ={num7[num]+num3[4]} answer ={num7[num]} doSomething = {Add} Correct={CorrectA} Wrong={WrongA}/>}
               </div>
            </div>
        </div>
    )
}