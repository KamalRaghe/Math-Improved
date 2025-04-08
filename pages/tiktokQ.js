import { useState } from "react";
import { FaHandPointDown } from "react-icons/fa";
export default function tikTok(){
    const [count, setCount] = useState(4)
    setTimeout(() => {
        if(count === 4){
            setCount(3)
        }
    }, 800); 
    setTimeout(() => {
        if(count === 3){
            setCount(2)
        }
    }, 1600);
    setTimeout(() => {
        if(count === 2){
            setCount(1)
        }
    }, 3000);
    setTimeout(() => {
        if(count === 1){
            setCount(0)
        }
    }, 4000); 
    return(
        <div className="double column center" style={{background:"white",height:"100vh"}} >
            <div>Solve this</div>
            <div style={{margin:"50px"}}> 2x + 2 = 6 </div>
            <div>Answer in <span className="Red" >{count}</span>s</div>
        </div>
    )
}