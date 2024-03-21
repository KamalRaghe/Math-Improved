import { useEffect, useState } from 'react'
import Choice from "@/components/choice";
import Correct from "@/components/correct";
import Wrong from "@/components/wrong"; 
import Link from "next/link";
import { useRouter } from 'next/router';
import Timeout from "@/components/timeout";
import Heart from "@/components/heart";
import Heart1 from "@/components/heart1";
import Heart2 from "@/components/heart2";
import Heart3 from "@/components/heart3";
import Mistake from "@/components/mistake";
import Pass from "@/components/pass";



function Lcm(){
    const [count, setCount] = useState(0)
    const [mistake, setMistake] = useState(0)
    const [num1, setNum1] = useState(Math.floor(Math.random()*8+2));
    const [num2, setNum2] = useState(Math.floor(Math.random()*8+2));
    const [count1, setCount1] = useState(0)
    const [num3, setNum3] = useState([0,num1,-1*num2,num1+num1,num2+num2+num2])

    const [time, setTime] = useState( 600000 + Date.now())
    const [date, setDate] = useState(Date.now()) 
    const [again, setAgain] = useState(false)
    const [correct, setCorrect] = useState(false)
    const [wrong, setWrong] = useState(false)
    const [loaded, setLoaded] = useState(false)
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
        setNum3([0,num1,-1*num2,num1+num1,num2+num2+num2])
    }

    
  
    function CorrectA(){
      setCount(count+1)  
      setCorrect(true)
      setTimeout(() => {
          setCorrect(false) 
      }, 1500);
    }
  
    function WrongA(){
      setMistake(mistake+1)  
      setWrong(true)
      setTimeout(() => {
        setWrong(false) 
    }, 1500);
    }

    function update(){
        setDate(requestAnimationFrame(update))
      }

      function cancel(){
        setDate(cancelAnimationFrame(date))
      }

      useEffect(() =>{
        setLoaded(true)
        update()
    },[])

    useEffect(() =>{
        setAgain(false)
    },[again])

    useEffect(()=>{
        mix()
        setNum3(prevChange => prevChange.sort((a,b)=>Math.random()-0.5))
        setLoaded(true)
        for(let i=1;i<15;i++){
            if(num1*i%num2===0){
                setCount1(i*num1)
                break
            }
        }
    },[num1,num2])
       
    function doSomething(){
        mix()
        setTimeout(()=>{
            setNum1(Math.ceil(Math.random()*9+1))
            setNum2(Math.ceil(Math.random()*9+1))
            setNum3(prevChange => prevChange.sort((a,b)=>Math.random()-0.5))
        },1500)
    }    
    useEffect(() =>{
        if(mistake >= 3 || time - Date.now() < 0 || count >= 50){
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
  
    return (
      <div className="beige center column">
          <div className="double">Question left : {50 - count}</div>
           <div className="inTest">
            
            <div className="Red relative" > 
                {mistake === 0 && <Heart/>}
                {mistake === 1 && <Heart1/>}
                {mistake === 2 && <Heart2/>}
                {mistake === 3 && <Heart3/>}
            </div>
                {loaded && time - Date.now() > 0 && count < 50 && <div>{Math.floor(((time - Date.now())%(1000*60*60))/1000/60)}m {""}
                {Math.floor(((time - Date.now())%(1000*60))/1000)}s</div>}
            </div>
        <div className='center column'>
            <div className='double'>LCM of</div>
            <br></br>
            <div className='double'>{loaded && num1} and {loaded && num2}</div>
        </div>
        { time - Date.now() < 0 && <Timeout again ={Again}/>}
        {mistake === 3 && <Mistake again={Again}></Mistake>}
        {count === 50 && <Pass time ={600000 -(time-Date.now())}/>}
        <div className='box double'>
            {correct && <div className='Green'>{count1}</div>}{wrong && <div className='Red'>{count1}</div>}  
        </div>
        
        <div className="boxes">
          {loaded && <div className="row">
            <Choice value = {count1+num3[0]} answer = {count1} doSomething ={doSomething} Correct = {CorrectA} Wrong={WrongA}/>
            <Choice value = {count1+num3[1]} answer = {count1} doSomething ={doSomething} Correct = {CorrectA} Wrong={WrongA}/>
            <Choice value = {count1+num3[2]} answer = {count1} doSomething ={doSomething} Correct = {CorrectA} Wrong={WrongA}/>
          </div>}
          {loaded && <div className="row">
            <Choice value = {count1+num3[3]} answer = {count1} doSomething ={doSomething} Correct = {CorrectA} Wrong={WrongA}/>
            <Choice value = {count1+num3[4]} answer = {count1} doSomething ={doSomething} Correct = {CorrectA} Wrong={WrongA}/>
          </div>}
        </div>
      </div>
    )
  }
  export default Lcm;