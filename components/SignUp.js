import { useRouter } from "next/router"
import { useEffect, useState } from "react"

export default function Sign(){
    const router = useRouter()
    const [free, setFree] = useState(false)
    const [check, setCheck] = useState(false)
    const [code, setCode] = useState(false)
    useEffect(()=>{
        setFree(window.localStorage.getItem('userId'))
        setCheck(window.localStorage.getItem('Check'))
        setCode(window.localStorage.getItem('code'))
    })
    // if(code != 'nile123' && false){
    //     return(
    //         <div className="center zoom" style={{zIndex:"200",width:"100%",height:"100%",position:"fixed"}} >
    //         <div className=" column center" style={{background:"beige",borderRadius:"20px",padding:"20px",border:'2px solid brown'}}>
    //                 <div className="font" > You reach the limit for this topic</div>
    //                 <br></br>
    //                 <div className="font">Try a new topic </div>
    //                 <br></br>
    //                 <div>or</div>
    //                 <div><button className="sub-topic" onClick={()=>{router.push('/Sign')}} >Sign up</button></div>
    //                 {!(parseInt(free) === parseInt(check) - 34521) && <div className="font" > 3 day free trial available</div>}
    //             </div>
    //         </div>
    //     )
    //     }
}