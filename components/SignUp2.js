import { useRouter } from "next/router"
import { useEffect, useState } from "react"

export default function Sign2(){
    const router = useRouter()
    const [free, setFree] = useState(false)
    const [check, setCheck] = useState(false)
    const [code, setCode] = useState(false)
    useEffect(()=>{
        setFree(window.localStorage.getItem('HwLink'))
        const last = router.asPath.split("/").pop()
        setCheck(last)
    })

    if(!(free == check)){
        return(
        <div className="center" >
          <div className="center zoom" style={{zIndex:"200",width:"100%",height:"100%",position:"fixed"}} >
              <div className=" column center" style={{background:"beige",borderRadius:"20px",padding:"20px",border:'2px solid brown'}}>
                  <div className="font" > You reach the limit</div>
                  <div><button className="sub-topic" onClick={()=>{router.push('/Sign')}} >Sign up</button></div>
              </div>
          </div>
        </div>
      )
    }
}