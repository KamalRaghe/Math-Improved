import { useRouter } from "next/router"
import { useEffect, useState } from "react"

export default function Sign2(){
    const router = useRouter()
    const [free, setFree] = useState(false)
    const [check, setCheck] = useState(false)
    useEffect(()=>{
        setFree(window.localStorage.getItem('userId'))
        setCheck(window.localStorage.getItem('Check'))
    })
    return(
      <div>
        
      </div>
    )
    
   
}