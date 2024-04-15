import { useEffect, useState } from "react";
import Choice from "@/components/choice";
import Correct from "@/components/correct";
import Wrong from "@/components/wrong"; 
import Link from "next/link";
import { useRouter } from "next/router";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";
import TA from "@/components/TA";

export default function DoubleAdd(){

    const [help, setHelp] = useState(false)
    const [loaded, setLoaded] = useState(false)
    const [correct, setCorrect] = useState(false)
    const[ wrong, setWrong] = useState(false)
    const [num1, setNum1] = useState(Math.ceil(Math.random()*11));
    const [num2, setNum2] = useState();
    const [num3, setNum3] = useState([0,'acute','acute','acute','acute','acute','acute','right','obtuse','obtuse','obtuse','obtuse'])
    const router = useRouter()
    const {username} = router.query 
    const {id} = router.query 

    

    function open(){
        setHelp(true)
      }
      function close(){
        setHelp(false)
      }

    function CorrectA(){ 
        setCorrect(true)
        setNum1(0) 
        setTimeout(() => {
            setCorrect(false)
            setNum1(Math.ceil(Math.random()*11))
        }, 1900);   
        setCount(count+1)
        setScore(score+1)
      }
  
      function WrongA(){ 
        setWrong(true)
        setTimeout(() => {
            setWrong(false)
            setNum1(Math.ceil(Math.random()*11))
        }, 1900);
      } 
    function Add(){
    }


    useEffect(() =>{
        setNum2(num3[num1])
    },[num1])

    useEffect(() =>{
        setLoaded(true)
        setNum2(num3[num1])
    },[])

    
    const [score, setScore] =useState(0)
    const [count, setCount] =useState(0)
 
     useEffect(() =>{
         setLoaded(true)
         const count = parseInt(window.localStorage.getItem(`${id} Type of Angle`))
         setCount(count ? count : 0)
         const score = parseInt(window.localStorage.getItem(`${id} score`))
         setScore(score ? score : 0)
     },[])
 
     useEffect(() =>{
         if(count > 0){
         window.localStorage.setItem(`${id} Type of Angle`, count)
     }},[count])
 
     useEffect(() =>{
         if(score > 0){
         window.localStorage.setItem(`${id} score` , score)
     }},[score])

     useEffect(()=>{
        const ID = window.localStorage.getItem('ID')
        if(!(ID === id)){
            router.push("/")
        }
    },[])

    return(
        <div className="beige container column">
            <div className="Test sb"><div className="double" >
                <div>Score: {loaded && score}</div>
                <div className="font" >Type of Angle: {loaded && count} </div>
            </div><Link href={`/${id}/enter/TypeAngleTest`}><button className="green test-btn">Test</button></Link></div>
            <div className=" relative column" style={{top:"70px"}}>
                <div className="box" >
                      {num1 === 1 && <div className="relative"  
                      style={{ borderLeft:'3px solid black',
                      height:'130px',rotate:"50deg",
                      top:'-42px',left:"50px"}} ></div>} 
                      
                      {num1 === 2 && <div className="relative"  
                      style={{ borderLeft:'3px solid black',
                      height:'130px',rotate:"70deg",
                      top:'-23px',left:"62px"}} ></div>}

                      {num1 === 3 && <div className="relative"  
                      style={{ borderLeft:'3px solid black',
                      height:'120px',rotate:"80deg",
                      top:'-12px',left:"61px"}} ></div>}

                      {num1 === 4 && <div className="relative"  
                      style={{ borderLeft:'3px solid black',
                      height:'130px',rotate:"40deg",
                      top:'-49px',left:"43px"}} ></div>} 

                      {num1 === 5 && <div className="relative"  
                      style={{ borderLeft:'3px solid black',
                      height:'130px',rotate:"30deg",
                      top:'-56px',left:"33px"}} ></div>} 

                      {num1 === 6 && <div className="relative"  
                      style={{ borderLeft:'3px solid black',
                      height:'130px',rotate:"20deg",
                      top:'-62px',left:"26px"}} ></div>}

                      {num1 === 7 && <div className="relative" style={{ borderLeft:'3px solid black',
                      height:'133px',top:'-65px'}} ></div>} 

                      {num1 === 8 && <div className="relative"  
                      style={{ borderLeft:'3px solid black',
                      height:'130px',rotate:"120deg",
                      top:'-33px',left:"-54px"}} ></div>} 

                      {num1 === 9 && <div className="relative"  
                      style={{ borderLeft:'3px solid black',
                      height:'130px',rotate:"130deg",
                      top:'-43px',left:"-48px"}} ></div>}

                      {num1 === 10 && <div className="relative"  
                      style={{ borderLeft:'3px solid black',
                      height:'130px',rotate:"170deg",
                      top:'-65px',left:"-9px"}} ></div>}

                      {num1 === 11 && <div className="relative"  
                      style={{ borderLeft:'3px solid black',
                      height:'130px',rotate:"110deg",
                      top:'-22px',left:"-55px"}} ></div>}      


                      { num1 > 0 && <div className="relative" style={{ borderBottom:'3px solid black',width:'130px',alignItems:'start'}}>
                        {num1 === 1 && <div className="absolute" style={{top:'-16px',left:'18px'}} >40<span style={{fontSize:'10px',position:'relative', top:"-8px"}}>o</span></div>}
                        
                        {num1 === 2 && <div className="absolute" style={{top:'-22px'}} >20<span style={{fontSize:'10px',position:'relative', top:"-8px"}}>o</span></div>}
                        
                        {num1 === 3 && <div className="absolute" style={{top:'-22px'}} >10<span style={{fontSize:'10px',position:'relative', top:"-8px"}}>o</span></div>}

                        {num1 === 4 && <div className="absolute" style={{top:'-17px',left:'15px'}} >50<span style={{fontSize:'10px',position:'relative', top:"-8px"}}>o</span></div>}

                        {num1 === 5 && <div className="absolute" style={{top:'-21px',left:'15px'}} >75<span style={{fontSize:'10px',position:'relative', top:"-8px"}}>o</span></div>}

                        {num1 === 6 && <div className="absolute" style={{top:'-20px',left:'15px'}} >80<span style={{fontSize:'10px',position:'relative', top:"-8px"}}>o</span></div>}

                        {num1 === 7 && <div className="absolute" style={{top:'-18px',left:'5px'}} >90<span style={{fontSize:'10px',position:'relative', top:"-8px"}}>o</span></div>}

                        {num1 === 8 && <div className="absolute" style={{top:'-20px',left:'-5px'}} >130<span style={{fontSize:'10px',position:'relative', top:"-8px"}}>o</span></div>}

                        {num1 === 9 && <div className="absolute" style={{top:'-20px'}} >120<span style={{fontSize:'10px',position:'relative', top:"-8px"}}>o</span></div>}

                        {num1 === 10 && <div className="absolute" style={{top:'-18px',left:'5px'}} >100<span style={{fontSize:'10px',position:'relative', top:"-8px"}}>o</span></div>}

                        {num1 === 11 && <div className="absolute" style={{top:'-18px',left:'-5px'}} >150<span style={{fontSize:'10px',position:'relative', top:"-8px"}}>o</span></div>}
                        </div>} 
                </div>
            </div>
            <div className="box">
                <button className="help" style={{zIndex:"20"}} onClick={open}>help</button>
            </div>
            {help && <TA close={close} />}
            {loaded && correct && <Correct></Correct>}
            {loaded && wrong && <Wrong/> }
            <div className="box column">
               <div className="row ">
                    { loaded && <Choice value ={'acute'} answer ={num2} doSomething = {Add} Correct={CorrectA} Wrong={WrongA}/>}
                    { loaded && <Choice value ={'obtuse'} answer ={num2} doSomething = {Add} Correct={CorrectA} Wrong={WrongA}/>}
               </div>
               <div className="row">
                    { loaded && <Choice value ={'right'} answer ={num2} doSomething = {Add} Correct={CorrectA} Wrong={WrongA}/>}
               </div>
            </div>
        </div>
    )
}