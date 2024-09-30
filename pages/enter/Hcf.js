import { useEffect, useState } from 'react'
import Choice from "@/components/choice";
import Correct from "@/components/correct";
import Wrong from "@/components/wrong"; 
import Link from "next/link";
import HelpHcf from '@/components/HelpHcf';
import { useRouter } from 'next/router';


function Hcf(){
    const [num4, setNum4] = useState(Math.floor(Math.random()*8+2))
    const [num1, setNum1] = useState(Math.floor(Math.random()*8+2)*num4);
    const [num2, setNum2] = useState(Math.floor(Math.random()*8+2)*num4);
    const [count1, setCount] = useState(0)
    const [num3, setNum3] = useState([-1*(Math.floor(Math.random()*3+3)),0,-1*(Math.floor(Math.random()*2+1)),Math.floor(Math.random()*2+1),Math.floor(Math.random()*3+3)])
    const [open, setOpen] = useState(false)
    const [correct, setCorrect] = useState(false)
    const [wrong, setWrong] = useState(false)
    const [loaded, setLoaded] = useState(false)
    const router = useRouter()
    const {username} = router.query 
    const {id} = router.query 

    function noHelp(){
      setOpen(false)
    }

    function CorrectA(){
      setCount1(count+1)
      setScore(score+1)
      setCorrect(true)
      setTimeout(() => {
          setCorrect(false) 
      }, 1900);
    }
  
    function WrongA(){
      setWrong(true)
      setTimeout(() => {
        setWrong(false) 
    }, 1900);
    }


    useEffect(() => {
      for(let i=num1;i>0;i--){
        if(num1 % i === 0 && num2 % i === 0){
            setCount(i)
            break
        }
    }
    },[num1])
        
    function doSomething(){
       setTimeout(()=>{
        setNum4(Math.floor(Math.random()*8+2))
        setNum1(Math.ceil((Math.random()*4)*2+1)*num4)
        setNum2(Math.ceil((Math.random()*4)*2)*num4)
        setNum3(prevChange => prevChange.sort((a,b)=>Math.random()-0.5))
       },500)
  
    }    
  
    const [score, setScore] =useState(0)
    const [count, setCount1] =useState(0)

    useEffect(() =>{
      setLoaded(true)
      const count = parseInt(window.localStorage.getItem(`${id} Hcf`))
      setCount1(count ? count : 0)
      const score = parseInt(window.localStorage.getItem(`${id} score`))
      setScore(score ? score : 0)
      const ID = window.localStorage.getItem('ID')
        if(!(ID === id)){
            router.push("/")
        }
  },[])

  useEffect(() =>{
      if(count > 0){
      window.localStorage.setItem(`${id} Hcf`, count)
  }},[count])

  useEffect(() =>{
      if(score > 0){
      window.localStorage.setItem(`${id} score` , score)
  }},[score])

 return(
     <div className="beige container column">
         <div className="Test sb"><div className="double" >
             <div>Score: {loaded && score}</div>
             <div className="font" >Hcf: {loaded && count} </div>
         </div><Link href={`/enter/testHcf`}><button className="green test-btn">Test</button></Link></div> 
        <div className='double center'>Highest Common</div>
        <div className='double center'>Factor</div>
        <div className='double center'>of</div>
        <h1 className='double'>{loaded && num1} and {loaded && num2}</h1>
        {correct ? <Correct /> : null}
        {wrong ? <Wrong /> : null}
        <button className='help' onClick={() => setOpen(true)}>help</button>
        <br/><br/>
        {open ? <HelpHcf num1 = {num1} num2 ={num2}close={noHelp} /> : null}
        <div className="boxes">
          {loaded &&<div className="row">
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
  export default Hcf;