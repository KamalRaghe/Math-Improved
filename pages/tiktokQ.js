import { useState } from "react";
import { FaHandPointDown } from "react-icons/fa";
export default function tikTok(){
    const [count, setCount] = useState(4)
    setTimeout(() => {
        setCount(3)
    }, 1000);
    setTimeout(() => {
        setCount(2)
    }, 2000);
    return(
        <div className="double column center" style={{background:"white",height:"100vh"}} >
            <div>Solve this</div>
            <div style={{margin:"50px"}}> 2x - 4 = 6 </div>
            <div>Answer in {count}s</div>
        </div>
    )
}