import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"


function Pass({time}){
    const [minus, setMinus] = useState(0)
    const [link, setLink] = useState(0)
    const router = useRouter()
    const {username} = router.query 
    const {id} = router.query 
    useEffect(()=>{
        setMinus(time)
    },[])
    return(
        <div className="timeout center column green"> 
            <h1>Congratulation</h1>
            <h2>You passed </h2>
            <p className="absolute" style={{top:'55px'}} >Time: {Math.floor(((minus)%(1000*60*60))/1000/60)}m {Math.floor(((minus)%(1000*60))/1000)}s</p>
            <Link href={`/${id}/enter/math`}><button className="choice-stretch Purple ">Menu</button></Link>
        </div>
    )
}

export default Pass