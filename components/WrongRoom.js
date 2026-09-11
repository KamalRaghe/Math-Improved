import { useRouter } from "next/router"
import { useEffect, useState } from "react"

export default function WrongRoom({close,remove}){
    const router = useRouter()
    const [free, setFree] = useState(false)
    const [check, setCheck] = useState(false)
    useEffect(()=>{
        setFree(window.localStorage.getItem('userId'))
        setCheck(window.localStorage.getItem('Check'))
    })
    return(
        <div className="center zoom" style={{zIndex:"200",width:"100%",height:"100%",position:"absolute"}} >
            <div className=" column center" style={{borderRadius:"20px",padding:"20px",border:'2px solid brown',backgroundColor:"white",width:"300px",height:"150px"}} >
                <div style={{marginBottom:"5px"}} >Do you want to leave the room?</div>
                <div className="center" >
                    <button className="green choice" onClick={remove} >Yes</button>
                    <button className="red choice" onClick={close} >No</button>
                </div> 
            </div>
        </div>
    )
    
   
}