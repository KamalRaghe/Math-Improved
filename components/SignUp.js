import { useRouter } from "next/router"

export default function Sign(){
    const router = useRouter()
    return(
        <div className="center zoom" style={{backgroundColor:"beige",zIndex:"200",width:"100%",height:"100%",position:"absolute"}} >
            <div className=" column center" style={{borderRadius:"20px",padding:"20px",border:'2px solid brown',backgroundColor:"beige"}}>
                <div className="font" > You reach the limit for this topic</div>
                <br></br>
                <div className="font">Try a new topic </div>
                <br></br>
                <div>or</div>
                <div><button className="sub-topic" onClick={()=>{router.push('/Sign')}} >Sign up</button></div>
                <div className="font" > 7 day free trial </div>
            </div>
        </div>
    )
    
   
}