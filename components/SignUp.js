
export default function Sign(){
    return(
        <div className="center zoom" style={{backgroundColor:"beige",zIndex:"200",width:"100%",height:"100%",position:"absolute"}} >
            <div className="Help column" style={{zIndex:'30', border:'1px solid brown',backgroundColor:"beige"}}>
                <button className="sub-topic" onClick={()=>{router.push('/Sign');console.log('RG')}} >Sign up</button>
            </div>
        </div>
    )
    
   
}