function Choice({value, answer, doSomething, Correct, Wrong,big, size ,title}){
   

    function Do(){
        if(answer === value){
            Correct() 
        }
        else{
            Wrong()
        }
    }
    return(
        <div className="center" >
            {big ? <button className='choice-stretch' onClick={()=>{Do();doSomething()}}><div style={{width: size }} >{title ? title:value}</div></button> 
            :<button className='choice center' onClick={()=>{Do();doSomething()}}>{value}</button>}
        </div>
        
            
    )

}

export default Choice