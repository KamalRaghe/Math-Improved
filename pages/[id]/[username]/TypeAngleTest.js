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
import Correct from "@/components/correct";
import Wrong from "@/components/wrong"; 

export async function getServerSideProps(context){
    return{
        props: {
        }
    }
}

export default function DoubleAdd(){
    const [again, setAgain] = useState(false)
    const [loaded, setLoaded] = useState(false)
    const [correct, setCorrect] = useState(false)
    const[ wrong, setWrong] = useState(false)
    const [num1, setNum1] = useState(Math.ceil(Math.random()*11));
    const [num2, setNum2] = useState();
    const [num3, setNum3] = useState([0,'acute','acute','acute','acute','acute','acute','right','obtuse','obtuse','obtuse','obtuse'])
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

    function update(){
        setDate(requestAnimationFrame(update))
      }

      
    function cancel(){
        setDate(cancelAnimationFrame(date))
      }

    function CorrectA(){ 
        setCorrect(true)
        setNum1(0) 
        setTimeout(() => {
            setCorrect(false)
            setNum1(Math.ceil(Math.random()*11))
        }, 1700);
        setCount(count+1)
      }
  
      function WrongA(){ 
        setMistake( mistake + 1)
        setWrong(true)
        setNum1(0) 
        setTimeout(() => {
            setWrong(false)
            setNum1(Math.ceil(Math.random()*11)) 
        }, 1700);
      } 
    function Add(){
    }


    useEffect(() =>{
        setNum2(num3[num1])
    },[num1])

    useEffect(() =>{
        setLoaded(true)
        setNum2(num3[num1])
        update()
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
                        {num1 === 1 && <div className="absolute" style={{top:'-16px',left:'15px'}} >40<span style={{fontSize:'10px',position:'relative', top:"-13px"}}>o</span></div>}
                        
                        {num1 === 2 && <div className="absolute" style={{top:'-22px'}} >20<span style={{fontSize:'10px',position:'relative', top:"-13px"}}>o</span></div>}
                        
                        {num1 === 3 && <div className="absolute" style={{top:'-22px'}} >10<span style={{fontSize:'10px',position:'relative', top:"-13px"}}>o</span></div>}

                        {num1 === 4 && <div className="absolute" style={{top:'-17px',left:'15px'}} >50<span style={{fontSize:'10px',position:'relative', top:"-13px"}}>o</span></div>}

                        {num1 === 5 && <div className="absolute" style={{top:'-21px',left:'15px'}} >75<span style={{fontSize:'10px',position:'relative', top:"-13px"}}>o</span></div>}

                        {num1 === 6 && <div className="absolute" style={{top:'-22px',left:'15px'}} >80<span style={{fontSize:'10px',position:'relative', top:"-13px"}}>o</span></div>}

                        {num1 === 7 && <div className="absolute" style={{top:'-18px',left:'5px'}} >90<span style={{fontSize:'10px',position:'relative', top:"-13px"}}>o</span></div>}

                        {num1 === 8 && <div className="absolute" style={{top:'-20px',left:'-5px'}} >130<span style={{fontSize:'10px',position:'relative', top:"-13px"}}>o</span></div>}

                        {num1 === 9 && <div className="absolute" style={{top:'-20px'}} >120<span style={{fontSize:'10px',position:'relative', top:"-13px"}}>o</span></div>}

                        {num1 === 10 && <div className="absolute" style={{top:'-18px',left:'5px'}} >100<span style={{fontSize:'10px',position:'relative', top:"-13px"}}>o</span></div>}

                        {num1 === 11 && <div className="absolute" style={{top:'-18px',left:'-5px'}} >150<span style={{fontSize:'10px',position:'relative', top:"-13px"}}>o</span></div>}
                        </div>} 
                </div>
            <div className="box">
            </div>
            { time - Date.now() < 0 && <Timeout again ={Again}/>}
            {mistake === 3 && <Mistake again={Again}></Mistake>}
            {count === 25 && <Pass time ={600000 -(time-Date.now())}/>}
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