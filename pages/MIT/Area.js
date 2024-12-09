import { useEffect, useState } from "react";
import Choice from "@/components/choice";
import Correct from "@/components/correct";
import Wrong from "@/components/wrong";
import Area from "@/components/area"; 
import Area1 from "@/components/area1";
import Area2 from "@/components/area2";
import Area3 from "@/components/area3";
import Area4 from "@/components/area4";
import Link from "next/link";
import { useRouter } from "next/router";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";
import Sign from "@/components/SignUp";
import Sign2 from "@/components/SignUp2";

export default function DoubleAdd(){
    const [help, setHelp] = useState(false)
    const [loaded, setLoaded] = useState(false)
    const [correct, setCorrect] = useState(false)
    const[ wrong, setWrong] = useState(false)
    const [num1, setNum1] = useState(Math.ceil(Math.random()*5+5));
    const [num2, setNum2] = useState(Math.ceil(Math.random()*4+1));
    const [num4, setNum4] = useState(Math.floor(Math.random()*5));
    const [num5, setNum5] = useState([num1*4,num1*(num1+num2),num1+num2-1+num1+num2,num1+((num1+num2)*2)])
    const [num6, setNum6] = useState(num5[num4])
    const [num3, setNum3] = useState([0,num1+num1,num2+num2+num2,-1*num1,num2])
    const router = useRouter()
    const {username} = router.query 
    const {id} = router.query 

    function mix(){
        setNum3([0,num1+num1,num2+num2+num2,-1*num1,num2])
    }

    function open(){
        setHelp(true)
      }
      function close(){
        setHelp(false)
      }

    function CorrectA(){ 
        setCorrect(true)
        setTimeout(() => {
            setCorrect(false) 
        }, 1900);
        setCount(count+1)
        setScore(score+1)
      }
  
      function WrongA(){ 
        setWrong(true)
        setTimeout(() => {
            setWrong(false) 
        }, 1900);
      } 
    function Add(){
        setTimeout(() => {
            setNum1(Math.ceil(Math.random()*5+5))
            setNum2(Math.ceil(Math.random()*4+1))
            setNum4(Math.floor(Math.random()*5))
            mix()
            setNum3(prevChange => prevChange.sort((a,b)=>Math.random()-0.5)) 
        }, 1500)
    }


    useEffect(() =>{
        setLoaded(true)
        const ID = window.localStorage.getItem('ID')
        
    },[])

    useEffect(() =>{
        mix()
        setNum3(prevChange => prevChange.sort((a,b)=>Math.random()-0.5))
        setNum5(([num1*num1,num1*(num2+num1),num1*num2,num1*num2,num1*num1]))
     },[num1,num4])

     useEffect(()=>{
        setNum6(num5[num4])
     },[num5])
     
     const [score, setScore] =useState(0)
     const [count, setCount] =useState(0)
  
      useEffect(() =>{
          setLoaded(true)
          const count = parseInt(window.localStorage.getItem(`${id} Area`))
          setCount(count ? count : 0)
          const score = parseInt(window.localStorage.getItem(`${id} score`))
          setScore(score ? score : 0)
      },[])
  
      useEffect(() =>{
          if(count > 0){
          window.localStorage.setItem(`${id} Area`, count)
      }},[count])
  
      useEffect(() =>{
          if(score > 0){
          window.localStorage.setItem(`${id} score` , score)
      }},[score])
 
     return(
         <div className="beige container column">
             <div className="Test sb"><div className="double" >
                 <div>Score: {loaded && score}</div>
                 <div className="font" >Factor Area: {loaded && count} </div>
             </div><Link href={`/MIT/AreaTest`}><button className="green test-btn">Test</button></Link></div>
            <div className="box column center">
                {loaded && num4 === 0 && <div className="double relative" style={{top:'70px',color:'white'}} >A =</div>}
                {loaded && num4 === 0 && <div className="double" style={{width:'100px', height:"100px",border:"3px solid black",backgroundColor:'black'}}>
                    <div className="relative center" style={{top:"-30px",fontSize:'20px'}} >{loaded && num1}</div>
                    <div className="relative center" style={{top:"85px",fontSize:'20px'}} >{loaded && num1}</div>
                    <div className="relative center" style={{top:'-7px', left:"-70px",fontSize:'20px'}} >{loaded && num1}</div>
                    <div className="relative center" style={{top:'-30px',left:"70px",fontSize:'20px'}} >{loaded && num1}</div>
                </div>}

                {loaded && num4 === 1 && <div className="double relative" style={{top:'70px',color:'white'}} >A =</div>}
                {loaded && num4 === 1 && <div className="double" style={{width:'200px', height:"100px",border:"3px solid black",backgroundColor:'black'}}>
                    <div className="relative center" style={{top:"-30px",fontSize:'20px'}} >{loaded && num2+num1}</div>
                    <div className="relative center" style={{top:"85px",fontSize:'20px'}} >{loaded && num2+num1}</div>
                    <div className="relative center" style={{top:'-7px', left:"-120px",fontSize:'20px'}} >{loaded && num1}</div>
                    <div className="relative center" style={{top:'-30px',left:"120px",fontSize:'20px'}} >{loaded && num1}</div>
                </div>}

                {loaded && num4 === 2 && <div className="double relative" style={{top:'100px',left:"-10px",color:'white',zIndex:'20'}} >A =</div>}
                {loaded && num4 === 2 && <div><div className="double" style={{borderBottom:"100px solid black",borderRight:'100px solid transparent'}}></div>
                    <div className="relative center" style={{fontSize:'20px'}} >{loaded && num2*2}</div>
                    <div className="relative center" style={{top:"-80px",left:"-60px",fontSize:'20px'}} >{loaded && num1}</div>
                </div>}

                {loaded && num4 === 3 && <div className="double relative" style={{top:'10px',zIndex:'20'}} >A =</div>}
                {loaded && num4 === 3 && <div className="relative" style={{width:"180px",top:"100px",left:"-5px",fontSize:'20px',color:'white',borderTop:'2px dotted beige',padding:"5px",rotate:"90deg"}} ></div>}
                {loaded && num4 === 3 && <div><div className="double" style={{borderBottom:"100px solid black",borderRight:'50px solid transparent',borderLeft:'50px solid transparent'}}></div>
                    <div className="relative center" style={{top:'5px',fontSize:'20px'}} >{loaded && num2*2}</div>
                    <div className="relative center" style={{top:'-80px',left:"15px",fontSize:'20px',color:'white'}} >{loaded && num1}</div>
                </div>}

                {loaded && num4 === 4 && <div className="double center" style={{display:'flex',justifyContent:'end',alignItems:'center',width:'100px', height:"100px",border:"3px solid black",backgroundColor:'black', borderRadius:"50%"}}>
                    <div className="relative center" style={{top:'-10px',fontSize:'20px',width:'50%',color:"white",borderBottom:"2px solid white"}} >{loaded && num1}</div>
                </div>}
            </div>
            <div className="box">
                <button className="help"  style={{zIndex:'30'}} onClick={open}>help</button>
            </div>
            {help && num4 === 0 && <Area num1 ={num1} num2={num2} close={close}/>}
            {help && num4 === 1 && <Area1 num1 ={num1} num2={num2} close={close}/>}
            {help && num4 === 2 && <Area2 num1 ={num1} num2={num2} close={close}/>}
            {help && num4 === 3 && <Area3 num1 ={num1} num2={num2} close={close}/>}
            {help && num4 === 4 && <Area4 num1 ={num1} close={close}/>}
            {loaded && correct && <Correct></Correct>}
            {loaded && wrong && <Wrong/> }
            {count > 10 && score < 100  && <Sign></Sign>}
            {score > 100  && <Sign2></Sign2>}
            <div className="box column">
               <div className="row ">
                    { loaded && <Choice value ={num4 === 4 ? num6+num3[0]+'π':num6+num3[0]} answer ={num4 === 4 ? num6+'π':num6} doSomething = {Add} Correct={CorrectA} Wrong={WrongA}/>}
                    { loaded && <Choice value ={num4 === 4 ? num6+num3[1]+'π':num6+num3[1]} answer ={num4 === 4 ? num6+'π':num6} doSomething = {Add} Correct={CorrectA} Wrong={WrongA}/>}
                    { loaded && <Choice value ={num4 === 4 ? num6+num3[2]+'π':num6+num3[2]} answer ={num4 === 4 ? num6+'π':num6} doSomething = {Add} Correct={CorrectA} Wrong={WrongA}/>}
               </div>
               <div className="row">
                    { loaded && <Choice value ={num4 === 4 ? num6+num3[3]+'π':num6+num3[3]} answer ={num4 === 4 ? num6+'π':num6} doSomething = {Add} Correct={CorrectA} Wrong={WrongA}/>}
                    { loaded && <Choice value ={num4 === 4 ? num6+num3[4]+'π':num6+num3[4]} answer ={num4 === 4 ? num6+'π':num6} doSomething = {Add} Correct={CorrectA} Wrong={WrongA}/>}
               </div>
            </div>
        </div>
    )
}