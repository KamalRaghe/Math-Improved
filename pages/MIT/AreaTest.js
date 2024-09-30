import { useEffect, useState } from "react";
import Choice from "@/components/choice";
import { useRouter } from "next/router";
import Heart from "@/components/heart";
import Heart1 from "@/components/heart1";
import Heart2 from "@/components/heart2";
import Heart3 from "@/components/heart3";
import Timeout from "@/components/timeout";
import Correct from "@/components/correct";
import Wrong from "@/components/wrong";
import Pass from "@/components/passTiral";
import Mistake from "@/components/mistake";

export default function DoubleAdd(){
    const [again, setAgain] = useState(false)
    const [loaded, setLoaded] = useState(false)
    const [correct, setCorrect] = useState(false)
    const[ wrong, setWrong] = useState(false)
    const [num1, setNum1] = useState(Math.ceil(Math.random()*5+5));
    const [num2, setNum2] = useState(Math.ceil(Math.random()*4+1));
    const [num4, setNum4] = useState(Math.floor(Math.random()*5));
    const [num5, setNum5] = useState([num1*4,num1*(num1+num2),num1+num2-1+num1+num2,num1+((num1+num2)*2)])
    const [num6, setNum6] = useState(num5[num4])
    const [num3, setNum3] = useState([0,num1+num1,num2+num2+num2,-1*num1,num2])
    const [mistake, setMistake] = useState(0)
    const [count, setCount] = useState(0)
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

    function mix(){
        setNum3([0,num1+num1,num2,-1*num1,num2+num2+num2])
    }

    function update(){
        setDate(requestAnimationFrame(update))
      }

      
    function cancel(){
        setDate(cancelAnimationFrame(date))
      }

    function CorrectA(){ 
        setCorrect(true)
        setTimeout(() => {
            setCorrect(false) 
        }, 1900);
        setCount(count+1)
      }
  
      function WrongA(){ 
        setMistake( mistake + 1)
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
        mix()
        setNum3(prevChange => prevChange.sort((a,b)=>Math.random()-0.5))
        setNum5(([num1*num1,num1*(num2+num1),num1*num2,num1*num2,num1*num1]))
     },[num1,num4])

     useEffect(()=>{
        setNum6(num5[num4])
     },[num5])

    useEffect(() =>{
        setLoaded(true)
        update()
        const ID = window.localStorage.getItem('ID')
        
    },[])


    useEffect(() =>{
        setAgain(false)
    },[again])

    useEffect(() =>{
        if(mistake >= 3 || time - Date.now() < 0 || count >= 50){
            setLoaded(false)
            setTime(time)
            console.log(time)
            cancel()
        }
    })

    return(
        <div className="beige container column">
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
            </div>
            {loaded && correct && <Correct></Correct>}
            {loaded && wrong && <Wrong/> }
            { time - Date.now() < 0 && <Timeout again ={Again}/>}
            {mistake === 3 && <Mistake again={Again}></Mistake>}
            {count === 50 && <Pass time ={600000 -(time-Date.now())}/>}
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