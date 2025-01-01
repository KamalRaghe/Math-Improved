import { useRouter } from "next/router"
import { useEffect, useState } from "react"

export default function AboutUs({close}){
    const router = useRouter()
    const [free, setFree] = useState(false)
    const [check, setCheck] = useState(false)
    useEffect(()=>{
        setFree(window.localStorage.getItem('userId'))
        setCheck(window.localStorage.getItem('Check'))
    })
    return(
        <div className="center zoom" style={{backgroundColor:"beige",zIndex:"200",width:"100%",height:"100%",position:"fixed",right:"10px"}} >
            <div className=" column center" style={{borderRadius:"20px",padding:"20px",width:"300px",border:'2px solid brown',backgroundColor:"beige"}}>
            <button className='cancel-btn' style={{fontSize:"25px",margin:"0px",position:"relative",left:"140px",alignItems:"end",zIndex:"100"}}  onClick={()=>close()}>X</button>
            <div className="center column" style={{position:"relative",bottom:"20px"}}>
                <h2>Mission</h2>
                To create a supportive and engaging learning environment where students can build strong foundations in mathematics no matter their grade level and parents can easily track their progress. Empowering students to overcome challenges, explore their full potential, and develop a lifelong love for learning. 

                <h2>Vision</h2>
                To become the go-to platform for students to truly understand and excel in mathematics, fostering curiosity, confidence, and mastery in learners of all levels.
            </div>

            </div>
        </div>
    )
    
   
}