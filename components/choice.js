function Choice({value, answer, doSomething, Correct, Wrong,big, size ,title}){
   

    function Do(){
         console.log(value, answer)
        if(answer === value){
            Correct() 
            doSomething()
        }
        else{
            Wrong()
        }
    }
    return(
        <div className="center" >
            {big ? <button className='choice-stretch' onClick={()=>{Do()}}><div style={{width: size }} >{title ? title:value}</div></button> 
            :<button className='choice center' onClick={()=>{Do()}}>{value}</button>}
        </div>
        
            
    )

}

export default Choice