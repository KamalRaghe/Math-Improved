function Heart(){
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
                <div className="heart-right red absolute move-heart4"></div> 
                <div className="heart-left red absolute move-heart3"></div>    
            </div>
        </div>  
    )
     
}

export default Heart