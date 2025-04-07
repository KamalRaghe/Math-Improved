import { useState } from "react";
import { FaHandPointDown } from "react-icons/fa";
export default function tikTok(){
    const [count, setCount] = useState(3)
    setTimeout(() => {
        if(count === 3){
            setCount(2)
        }
    }, 1000);
    setTimeout(() => {
        if(count === 2){
            setCount(1)
        }
    }, 2000);
    setTimeout(() => {
        if(count === 1){
            setCount(0)
        }
    }, 1000); 
    return(
        <div className="double column center" style={{background:"white",height:"100vh"}} >
            <div>Solve this</div>
            <div style={{margin:"50px"}}> 2x - 4 = 6 </div>
            <div>Answer in {count}s</div>
        </div>
    )
}