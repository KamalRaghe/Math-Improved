import { useEffect, useState } from "react";
function Heart3(){
    useEffect(()=>{
            window.localStorage.setItem('cheat', 0)
        })
    return(
        <div>
            <div className='relative'>
                <div className="heart-right black absolute "></div> 
                <div className="heart-left black absolute"></div>    
            </div> 
             <div className='relative'>
                <div className="heart-right blacked absolute move-heart2"></div> 
                <div className="heart-left blacked absolute move-heart1"></div>    
            </div>
             <div className='relative'>
                <div className="heart-right blacked absolute move-heart4"></div> 
                <div className="heart-left blacked absolute move-heart3"></div>    
            </div>
        </div>  
    )
     
}

export default Heart3