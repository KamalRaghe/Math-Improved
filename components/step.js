import { useState } from "react"

function Step({value, answer, Count, done , mistake}){
   
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
            {red ? <button disabled = {done} className='choice red' onClick={()=>{Do()}}>{value}</button>: <button disabled = {done} className='choice' onClick={()=>{Do()}}>{value}</button>}
        </div>
        
            
    )

}

export default Step