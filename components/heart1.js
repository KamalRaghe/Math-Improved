import { useEffect, useState } from "react";
function Heart1(){
    useEffect(()=>{
            window.localStorage.setItem('cheat', 0)
        })
    return(
        <div>
            <div className='relative'>
                <div className="heart-right red absolute "></div> 
                <div className="heart-left red absolute"></div>    
            </div> 
             <div className='relative'>
                <div className="heart-right red absolute move-heart2"></div> 
                <div className="heart-left red absolute move-heart1"></div>    
            </div>
             <div className='relative'>
                <div className="heart-right black absolute move-heart4"></div> 
                <div className="heart-left black absolute move-heart3"></div>    
            </div>
        </div>  
    )
     
}

export default Heart1