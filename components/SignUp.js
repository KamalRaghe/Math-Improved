
export default function Sign(){
    return(
        <div className="center zoom" style={{backgroundColor:"beige",zIndex:"200",width:"100%",height:"100%",position:"absolute"}} >
            <div className=" column center" style={{borderRadius:"20px",padding:"20px",border:'2px solid brown',backgroundColor:"beige"}}>
                <div> You reach the limit for this topic</div>
                <div>Try a new topic </div>
                <div>or</div>
                <div><button className="sub-topic" onClick={()=>{router.push('/Sign')}} >Sign up</button></div>
                <div style={{fontSize:"20px"}} >7 day free trial </div>
            </div>
        </div>
    )
    
   
}