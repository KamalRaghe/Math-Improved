import { useState } from "react"

function BigStep({value, answer, Count, done , mistake}){
   
    const [red, setRed] = useState(false)

    function Do(){
        if(answer === value){
            Count() 
        }
        else{
           mistake()
           setRed(true)
           setTimeout(() => {
            setRed(false) 
        }, 700)

        }
    }
    return(
        <div>
            {red ? <button disabled = {done} className='choice-stretch red' onClick={()=>{Do()}}>{value}</button>: <button disabled = {done} className='choice-stretch' onClick={()=>{Do()}}>{value}</button>}
        </div>
        
            
    )

}

export default BigStep