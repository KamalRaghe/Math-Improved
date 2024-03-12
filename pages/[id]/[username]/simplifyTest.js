import { useEffect, useState } from "react";
import Choice from "@/components/FractionChoice";
import Simplify from "@/components/SimplifyHelp";
import Timeout from "@/components/timeout";
import Heart from "@/components/heart";
import Heart1 from "@/components/heart1";
import Heart2 from "@/components/heart2";
import Heart3 from "@/components/heart3";
import Mistake from "@/components/mistake";
import Pass from "@/components/pass";
import { useRouter } from "next/router";

export async function getServerSideProps(context){
    return{
        props: {
           
        }
    }
}

export default function testDoubleMinus(){
    const [help, setHelp] = useState(false)
    const [loaded, setLoaded] = useState(false)
    const [num, setNum] = useState(1)
    const [correct, setCorrect] = useState(false)
    const[ wrong, setWrong] = useState(false)
    const [time, setTime] = useState( 600000 + Date.now())
    const [date, setDate] = useState(Date.now()) 
    const [again, setAgain] = useState(false)
    const [count, setCount] = useState(0)
    const [mistake, setMistake] = useState(0)
    const router = useRouter()
    const {username} = router.query 
    const {id} = router.query
    const [num1, setNum1] = useState(Math.ceil(Math.random()*9));
    const [num2, setNum2] = useState(Math.ceil(Math.random()*9));
    const [num4, setNum4] = useState(Math.ceil(Math.random()*9));
    const [num3, setNum3] = useState([0,1,-1,Math.ceil(Math.random()*2+1),-1*Math.ceil(Math.random()*2+1)])
    
    function mix(){
        setNum3([0,1,-1,Math.ceil(Math.random()*2+1),-1*Math.ceil(Math.random()*2+1)])
    }

    function Again(){
        setAgain(true)
        setCount(0)
        setMistake(0)
        setTime(600000 + Date.now())
        setLoaded(true)
    }

    function open(){
        setHelp(true)
      }
      function close(){
        setHelp(false)
      }

    function CorrectA(){
        setCount(count + 1) 
        setCorrect(true)
        setTimeout(() => {
            setCorrect(false) 
        }, 1500);
      }
  
      function WrongA(){
        setMistake(mistake + 1)
        console.log(mistake)
        setWrong(true)
        setTimeout(() => {
            setWrong(false) 
        }, 1500);
      } 
      function Add(){
        setTimeout(() => {
            setNum1(Math.ceil(Math.random()*7+2))
            setNum2(Math.ceil(Math.random()*7+2))
            mix()
            setNum3(prevChange => prevChange.sort((a,b)=>Math.random()-0.5))
        }, 1500)
    }


    useEffect(() =>{
       mix()
       setNum3(prevChange => prevChange.sort((a,b)=>Math.random()-0.5))
       setNum4(Math.ceil(Math.random()*(num1-1)))
       for(let i=num1;i>0;i--){
        if(num1 % i === 0 && num4 % i === 0){
            setNum(i)
            break
        }
    }
    },[num1,num4])

 

    function update(){
        setDate(requestAnimationFrame(update))
      }

      function cancel(){
        setDate(cancelAnimationFrame(date))
      }

    useEffect(() =>{
        setLoaded(true)
        update()
        setNum1(Math.ceil(Math.random()*7+2))
        setNum2(Math.ceil(Math.random()*7+2))
        mix()
        setNum3(prevChange => prevChange.sort((a,b)=>Math.random()-0.5))
    },[])

    useEffect(() =>{
        setAgain(false)
    },[again])


    useEffect(() =>{
        if(mistake >= 3 || time - Date.now() < 0 || count >= 25){
            setLoaded(false)
            setTime(time)
            cancel()
            console.log(time)
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
            {loaded && <div className="box column">
                <div className=" double center">
                    <div className="column center" >
                        <div className="center" style={{borderBottom:'2px solid black', width:'45px'}} >
                            {!correct && !wrong && num4*num2}
                            {correct && <div className="Green" >{num4/num}</div>}
                            {wrong && <div className="Red" >{num4/num}</div>}
                        </div>
                        {!correct && !wrong && num1*num2}
                        {correct && <div className="Green" >{num1/num}</div>}
                        {wrong && <div className="Red" >{num1/num}</div>}
                    </div>
                </div>
            </div>}
            <div className="box">
                
            </div>
            
            { time - Date.now() < 0 && <Timeout again ={Again}/>}
            {mistake === 3 && <Mistake again={Again}></Mistake>}
            {count === 25 && <Pass time ={600000 -(time-Date.now())}/>}
            <div className="box column">
            <div className="row ">
                    { loaded && <Choice beginning={true}  value1 ={(num4/num)+num3[0]} answer1 ={num4/num} value2={(num1/num)+num3[0]} answer2={num1/num} doSomething = {Add} Correct={CorrectA} Wrong={WrongA}/>}
                    { loaded && <Choice beginning={true}  value1 ={(num4/num)+num3[1]} answer1 ={num4/num} value2={(num1/num)+num3[1]} answer2={num1/num} doSomething = {Add} Correct={CorrectA} Wrong={WrongA}/>}
                    { loaded && <Choice beginning={true}  value1 ={(num4/num)+num3[2]} answer1 ={num4/num} value2={(num1/num)+num3[2]} answer2={num1/num} doSomething = {Add} Correct={CorrectA} Wrong={WrongA}/>}
               </div>
               <div className="row">
                    { loaded && <Choice beginning={true}  value1 ={(num4/num)+num3[3]} answer1 ={num4/num} value2={(num1/num)+num3[3]} answer2={num1/num} doSomething = {Add} Correct={CorrectA} Wrong={WrongA}/>}
                    { loaded && <Choice beginning={true}  value1 ={(num4/num)+num3[4]} answer1 ={num4/num} value2={(num1/num)+num3[4]} answer2={num1/num} doSomething = {Add} Correct={CorrectA} Wrong={WrongA}/>}
               </div>
            </div>
        </div>
    )
}