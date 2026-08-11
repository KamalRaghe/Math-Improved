import { db } from "@/firebase"
import { addDoc, collection } from "firebase/firestore"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

export default function Class({close,payed}){
    const router = useRouter()
    const [post, setPost] = useState()
    const [count, setCount] = useState(5)
    const [check, setCheck] = useState(0)
    
    function StopFreeClasses(){
      let stop = window.localStorage.getItem('FreeHw')
      window.localStorage.setItem('FreeHw',Number(stop-1))
    }

    useEffect(()=>{
      let stop = window.localStorage.getItem('FreeHw')
      if(stop){
        setCheck(Number(stop))
      }
    },[])

    return(
        <div className="center zoom" style={{zIndex:"200",width:"100%",height:"100%",position:"fixed",right:"0px"}} >
            <div className=" column center" style={{borderRadius:"20px",padding:"20px",border:'2px solid brown',backgroundColor:"beige"}}>
                 <div className='cancel' style={{width:"100%"}} >
                 <button className='cancel-btn' style={{fontSize:"25px",margin:"0px",position:"relative",left:"6px",bottom:"10px",alignItems:"end",zIndex:"100"}}  onClick={()=>close()}>X</button>
                </div>
                {!payed && count+check > 0  && <div>Free classes: {count+check}</div>}
                {!payed && !(count+check > 0)  && <div>Subscribe to assign homework</div>}
                {!payed && !(count+check > 0)  && 
                  <button className="choice" style={{width:"130px",marginBottom:"2px"}} 
                  onClick={()=>{router.push('Sign')}}>
                    Sign up
                  </button>
                }
                 {(payed || count+check > 0) && <button className="choice help" style={{color:"black",width:"180px"}} onClick={()=>{router.push('ManageClass')}}>Manage Class</button>}
                 <button className="choice green" style={{width:"180px"}} onClick={()=>{router.push('JoinClass')}} >Join class</button>
                <button onClick={StopFreeClasses} >Stop</button>
            </div>
        </div>
    )
    
   
}