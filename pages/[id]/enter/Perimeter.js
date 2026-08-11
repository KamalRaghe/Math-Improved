import { useEffect, useState } from "react";
import Choice from "@/components/choice";
import Correct from "@/components/correct";
import Wrong from "@/components/wrong"; 
import Pm from "@/components/Perimeter";
import Pm1 from "@/components/Perimeter1";
import Pm2 from "@/components/Perimeter2";
import Pm3 from "@/components/perimeter3";
import Link from "next/link";
import { useRouter } from "next/router";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";

export default function DoubleAdd(){

    const [help, setHelp] = useState(false)
    const [loaded, setLoaded] = useState(false)
    const [correct, setCorrect] = useState(false)
    const[ wrong, setWrong] = useState(false)
    const [num1, setNum1] = useState(Math.ceil(Math.random()*5+5));
    const [num2, setNum2] = useState(Math.ceil(Math.random()*4+1));
    const [num4, setNum4] = useState(Math.floor(Math.random()*4));
    const [num5, setNum5] = useState([num1*4,num1*(num1+num2),num1+num2-1+num1+num2,num1+((num1+num2)*2)])
    const [num6, setNum6] = useState(num5[num4])
    const [num3, setNum3] = useState([0,1,-1,Math.ceil(Math.random()*2+1),-1*Math.ceil(Math.random()*2+1)])
    const router = useRouter()
    const {username} = router.query 
    const {id} = router.query 

    function mix(){
        setNum3([0,1,-1,Math.ceil(Math.random()*2+1),-1*Math.ceil(Math.random()*2+1)])
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
            setNum4(Math.floor(Math.random()*4))
            mix()
            setNum3(prevChange => prevChange.sort((a,b)=>Math.random()-0.5)) 
        }, 1500)
    }


    useEffect(() =>{
        setLoaded(true)
        const ID = window.localStorage.getItem('ID')
        if(!(ID === id)){
            router.push("/")
        }
    },[])

    useEffect(() =>{
        mix()
        setNum3(prevChange => prevChange.sort((a,b)=>Math.random()-0.5))
        setNum5(([num1*4,2*(num1+num2+num1),num1+num2-1+num1+num2,num1+((num1+num2)*2)]))
     },[num1,num4,num2])

     useEffect(()=>{
        setNum6(num5[num4])
     },[num5])

    
     const [score, setScore] =useState(0)
     const [count, setCount] =useState(0)
  
      useEffect(() =>{
          setLoaded(true)
          const count = parseInt(window.localStorage.getItem(`${id} Perimeter`))
          setCount(count ? count : 0)
          const score = parseInt(window.localStorage.getItem(`${id} score`))
          setScore(score ? score : 0)
      },[])
  
      useEffect(() =>{
          if(count > 0){
          window.localStorage.setItem(`${id} Perimeter`, count)
      }},[count])
  
      useEffect(() =>{
          if(score > 0){
          window.localStorage.setItem(`${id} score` , score)
      }},[score])
 
     return(
         <div className="beige container column">
             <div className="Test sb"><div className="double" >
                 <div>Score: {loaded && score}</div>
                 <div className="font" >Perimeter: {loaded && count} </div>
             </div><Link href={`/${id}/enter/PmTest`}><button className="green test-btn">Test</button></Link></div>
            <div className="box column center">
                {loaded && num4 === 0 && <div className="double relative" style={{top:'70px',color:'white'}} >P =</div>}
                {loaded && num4 === 0 && <div className="double" style={{width:'100px', height:"100px",border:"3px solid black",backgroundColor:'black'}}>
                    <div className="relative center" style={{top:"-30px",fontSize:'20px'}} >{loaded && num1}</div>
                    <div className="relative center" style={{top:"85px",fontSize:'20px'}} >{loaded && num1}</div>
                    <div className="relative center" style={{top:'-7px', left:"-70px",fontSize:'20px'}} >{loaded && num1}</div>
                    <div className="relative center" style={{top:'-30px',left:"70px",fontSize:'20px'}} >{loaded && num1}</div>
                </div>}

                {loaded && num4 === 1 && <div className="double relative" style={{top:'70px',color:'white'}} >P =</div>}
                {loaded && num4 === 1 && <div className="double" style={{width:'200px', height:"100px",border:"3px solid black",backgroundColor:'black'}}>
                    <div className="relative center" style={{top:"-30px",fontSize:'20px'}} >{loaded && num2+num1}</div>
                    <div className="relative center" style={{top:"85px",fontSize:'20px'}} >{loaded && num2+num1}</div>
                    <div className="relative center" style={{top:'-7px', left:"-120px",fontSize:'20px'}} >{loaded && num1}</div>
                    <div className="relative center" style={{top:'-30px',left:"120px",fontSize:'20px'}} >{loaded && num1}</div>
                </div>}

                {loaded && num4 === 2 && <div className="double relative" style={{top:'100px',color:'white',zIndex:'20'}} >P =</div>}
                {loaded && num4 === 2 && <div><div className="double relative" style={{top:"50px",borderBottom:"100px solid black",borderRight:'100px solid transparent',rotate:'120deg'}}></div>
                    <div className="relative center" style={{top:"5px",fontSize:'20px'}} >{loaded && num1+num2-1}</div>
                    <div className="relative center" style={{top:"-90px",left:"30px",fontSize:'20px'}} >{loaded && num2}</div>
                    <div className="relative center" style={{top:"-90px",left:"-55px",fontSize:'20px'}} >{loaded && num1}</div>
                </div>}

                {loaded && num4 === 3 && <div className="double relative" style={{top:'100px',color:'white',zIndex:'20'}} >P =</div>}
                {loaded && num4 === 3 && <div><div className="double" style={{borderBottom:"100px solid black",borderRight:'50px solid transparent',borderLeft:'50px solid transparent'}}></div>
                    <div className="relative center" style={{top:'5px',fontSize:'20px'}} >{loaded && num1}</div>
                    <div className="relative center " style={{top:"-90px",left:"40px",fontSize:'20px'}} >{loaded && num2+num1}</div>
                    <div className="relative center" style={{top:"-112px",left:"-40px",fontSize:'20px'}} >{loaded && num1+num2}</div>
                </div>}
            </div>
            <div className="box">
                <button className="help" onClick={open}>help</button>
            </div>
            {help && num4 === 0 && <Pm num1 ={num1} num2={num2} close={close}/>}
            {help && num4 === 1 && <Pm1 num1 ={num1} num2={num2} close={close}/>}
            {help && num4 === 2 && <Pm2 num1 ={num1} num2={num2} close={close}/>}
            {help && num4 === 3 && <Pm3 num1 ={num1} num2={num2} close={close}/>}
            {loaded && correct && <Correct></Correct>}
            {loaded && wrong && <Wrong/> }
            <div className="box column">
               <div className="row ">
                    { loaded && <Choice value ={num6+num3[0]} answer ={num6} doSomething = {Add} Correct={CorrectA} Wrong={WrongA}/>}
                    { loaded && <Choice value ={num6+num3[1]} answer ={num6} doSomething = {Add} Correct={CorrectA} Wrong={WrongA}/>}
                    { loaded && <Choice value ={num6+num3[2]} answer ={num6} doSomething = {Add} Correct={CorrectA} Wrong={WrongA}/>}
               </div>
               <div className="row">
                    { loaded && <Choice value ={num6+num3[3]} answer ={num6} doSomething = {Add} Correct={CorrectA} Wrong={WrongA}/>}
                    { loaded && <Choice value ={num6+num3[4]} answer ={num6} doSomething = {Add} Correct={CorrectA} Wrong={WrongA}/>}
               </div>
            </div>
        </div>
    )
}