import { useEffect, useState } from 'react'
import Choice from "@/components/choice";
import Correct from "@/components/correct";
import Wrong from "@/components/wrong"; 
import Link from "next/link";
import HelpLcm from '@/components/HelpLcm';
import { useRouter } from 'next/router';
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";


function Lcm(){
    const [num1, setNum1] = useState(Math.floor(Math.random()*8+2));
    const [num2, setNum2] = useState(Math.floor(Math.random()*8+2));
    const [count1, setCount] = useState(0)
    const [num3, setNum3] = useState([0,num1,-1*num2,num1+num1,num2+num2+num2])
    const [help, setHelp] = useState(false)
    const [correct, setCorrect] = useState(false)
    const [wrong, setWrong] = useState(false)
    const [loaded, setLoaded] = useState(false)
    const router = useRouter()
    const {username} = router.query 
    const {id} = router.query 

    function mix(){
        setNum3([0,num1,-1*num2,num1+num1,num2+num2+num2])
    }

    function open(){
      setHelp(true)
    }
    function close(){
      setHelp(false)
    }
    
  
    function CorrectA(){
      setCorrect(true)
      setCount1(count+1)
      setScore(score+1)
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

    useEffect(()=>{
        mix()
        setNum3(prevChange => prevChange.sort((a,b)=>Math.random()-0.5))
        setLoaded(true)
        for(let i=1;i<15;i++){
            if(num1*i%num2===0){
                setCount(i*num1)
                break
            }
        }
    },[num1, num2])
       
    function doSomething(){
        mix()
        setNum1(Math.ceil(Math.random()*9+1))
        setNum3(prevChange => prevChange.sort((a,b)=>Math.random()-0.5))
  
    } 
    
    useEffect(()=>{
      if(num1 >= 5){
          setNum2(Math.ceil(Math.random()*3+1))
      }else{setNum2(Math.ceil(Math.random()*5+4))}
  },[num1])
  
  const [score, setScore] =useState(0)
  const [count, setCount1] =useState(0)

  useEffect(() =>{
      setLoaded(true)
      const count = parseInt(window.localStorage.getItem(`${id} Lcm`))
      setCount1(count ? count : 0)
      const score = parseInt(window.localStorage.getItem(`${id} score`))
      const ID = window.localStorage.getItem('ID')
        
      setScore(score ? score : 0)
  },[])

  useEffect(() =>{
      if(count > 0){
      window.localStorage.setItem(`${id} Lcm`, count)
  }},[count])

  useEffect(() =>{
      if(score > 0){
      window.localStorage.setItem(`${id} score` , score)
  }},[score])

 return(
     <div className="beige container column">
         <div className="Test sb"><div className="double" >
             <div>Score: {loaded && score}</div>
             <div className="font" >Lcm: {loaded && count} </div>
         </div><Link href={`/MIT/testLcm`}><button className="green test-btn">Test</button></Link></div> 
        <div className='center column'>
            <div className='double'>Lowest Common</div>
            <div className='double'>Multiple</div>
            <div className='double' style={{padding:'10px'}}>of</div>
            <div className='double'>{loaded && num1} and {loaded && num2}</div>  
        </div>
        {correct ? <Correct /> : null}
        {wrong ? <Wrong /> : null}
        <div className='box'><button className='help' onClick={open} >help</button></div>
        {help ? <HelpLcm num1 = {num1} num2 ={num2}close={close} answer={count1} /> : null}
        
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