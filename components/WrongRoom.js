import { useRouter } from "next/router"
import { useEffect, useState } from "react"

export default function WrongRoom({code,close,remove}){
    const router = useRouter()
    const [free, setFree] = useState(false)
    const [check, setCheck] = useState(false)
    useEffect(()=>{
        setFree(window.localStorage.getItem('userId'))
        setCheck(window.localStorage.getItem('Check'))
    })
    return(
        <div className="center zoom" style={{zIndex:"200",width:"100%",height:"100%",position:"absolute"}} >
            <div className=" column center" style={{borderRadius:"20px",padding:"20px",border:'2px solid brown'}}>
                <div style={{marginBottom:"5px"}} >Is this the Code</div>
                <div className="double" >{code}</div>
                <div className="center" >
                    <button className="green choice" onClick={close} >Yes</button>
                    <button className="red choice" onClick={remove} >No</button>
                </div> 
            </div>
        </div>
    )
    
   
}