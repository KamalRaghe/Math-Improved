import { useState } from "react";
import { FaHandPointDown } from "react-icons/fa";
export default function tikTok(){
    const [date,setDate] = useState(Date.now())
    const [count, setCount] = useState(Date.now())
    return(
        <div className="double column center" style={{background:"white",height:"100vh"}} >
            <div>Solve this</div>
            <div style={{margin:"50px"}}> 2x - 4 = 6 </div>
            <div>Answer in 3s</div>
        </div>
    )
}