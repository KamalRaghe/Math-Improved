import { useRouter } from "next/router"
import { useEffect, useState } from "react"

export default function AboutUs(){
    const router = useRouter()
    const [free, setFree] = useState(false)
    const [check, setCheck] = useState(false)
    useEffect(()=>{
        setFree(window.localStorage.getItem('userId'))
        setCheck(window.localStorage.getItem('Check'))
    })
    return(
        <div className="center zoom" style={{backgroundColor:"beige",zIndex:"200",width:"100%",height:"100%",position:"absolute"}} >
            <button className='cancel-btn' style={{fontSize:"25px",margin:"0px",position:"relative",bottom:"8px"}}  onClick = {close}>X</button>
            <div className=" column center" style={{borderRadius:"20px",padding:"20px",width:"300px",border:'2px solid brown',backgroundColor:"beige"}}>
            <h1>Mission</h1>
            To create a supportive and engaging learning environment where students can build strong foundations in mathematics, empowering them to overcome challenges, explore their full potential, and develop a lifelong love for learning.

            <h1>Vision</h1>
            To become the go-to platform for students to truly understand and excel in mathematics, fostering curiosity, confidence, and mastery in learners of all levels.

            </div>
        </div>
    )
    
   
}