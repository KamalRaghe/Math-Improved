import { useEffect, useState } from "react"
import BigStep from "./stepBig"
import Step from "./step"

export default function Gl({num1,num2,num3,close}){
    const [done,setDone] = useState(false)
    const [sign,setSign] = useState()
    
    
    useEffect(() =>{
        if(num1>num2){
            setSign('> greater')
        }if(num1=== num2){
            setSign('= equal')
        }if(num1<num2){
            setSign('< less')
        }
     },[num1])

    function Count(){
        close()    
    }

    function Nothing(){}
    return(
        <div className="Help column" >
            <button className=" cancel-btn absolute " style={{left:'270px'}} onClick={close} >X</button>
            <div className="center double"style={{marginTop:"50px"}} ><div>{num1} ? {num2} </div></div>
            <div style={{margin: "10px",marginLeft:'30px', display:"flex"}}>
                {num1 >= 1 && <div className="circle red font center">{1}</div>}
                {num1 >= 2 && <div className="circle red font center">{2}</div>}
                {num1 >= 3 && <div className="circle red font center">{3}</div>}
                {num1 >= 4 && <div className="circle red font center">{4}</div>}
                {num1 >= 5 && <div className="circle red font center">{5}</div>}
            </div>
            <div style={{margin: "10px",marginLeft:'30px', display:"flex"}}>
                {num1 >= 6 && <div className="circle red font center">{6}</div>}
                {num1 >= 7 && <div className="circle red font center">{7}</div>}
                {num1 >= 8 && <div className="circle red font center">{8}</div>}
                {num1 >= 9 && <div className="circle red font center">{9}</div>}
                {num1 >= 10 && <div className="circle Green font center">{1}</div>}
            </div>
            <div className='center wrap'>
                   <BigStep value = {'> greater'}  answer={sign} Count ={Count} done = {done} mistake={Nothing}/>
                   <BigStep value = {'< less'}  answer={sign} Count ={Count} done = {done} mistake={Nothing}/>
                   <BigStep value = {'= equal'}  answer={sign} Count ={Count} done = {done} mistake={Nothing}/>
               </div>
            <div style={{margin: "10px",marginLeft:'30px', display:"flex"}}>
                {num2 >= 1 && <div className="circle orange font center">{1}</div>}
                {num2 >= 2 && <div className="circle orange font center">{2}</div>}
                {num2 >= 3 && <div className="circle orange font center">{3}</div>}
                {num2 >= 4 && <div className="circle orange font center">{4}</div>}
                {num2 >= 5 && <div className="circle orange font center">{5}</div>}
            </div>
            <div style={{margin: "10px",marginLeft:'30px', display:"flex"}}>
                {num2 >= 6 && <div className="circle orange font center">{6}</div>}
                {num2 >= 7 && <div className="circle orange font center">{7}</div>}
                {num2 >= 8 && <div className="circle orange font center">{8}</div>}
                {num2 >= 9 && <div className="circle orange font center">{9}</div>}
                {num2 >= 10 && <div className="circle orange font center">{10}</div>}
            </div>
        </div>
    )
    
   
}