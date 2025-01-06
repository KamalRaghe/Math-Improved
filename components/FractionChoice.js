import { useEffect, useState } from "react"

function Choice({value1, answer1, whole,whole2,value2, answer2, doSomething, Correct, Wrong,beginning }){
   
    const [count, setCount] = useState(1)
    const [show1, setShow1] = useState(Math.floor(value1/count))
    const [show2, setShow2] = useState(Math.floor(value2/count))
    const [num1, setNum1] = useState(Math.ceil(Math.random()*7+2));
    
    useEffect(() => {
        for(let i=value1;i>0;i--){
          if(value1 % i === 0 && value2 % i === 0){
              setCount(i)
              break
          }
      }
      },[value1,value2])

      useEffect(() =>{
        setShow1(Math.ceil(value1/count))
        setShow2(Math.ceil(value2/count))
      },[count,value1,value2])

    function Do(){
        if(answer1 === value1 && answer2 === value2){
            Correct()
            doSomething() 
        }
        else{
            Wrong()
        }
    }
    return(
        <div>
            <button className='choice-stretch center' style={{padding:'30px 10px'}} onClick={()=>{Do()}}>
                {whole > 0 && !(beginning === true)? <div style={{paddingRight:'2px'}}>{whole}</div>:null}
                {!(whole > 0) && whole2 > 0 && !(beginning === true) && <div style={{paddingRight:'2px'}}>{whole2}</div> }
                {!(whole > 0) && !(whole2 > 0) && !(beginning === true)&& (value1 === 0) && 0}
                <div className="column center" >
                    { !(value1 === 0) && !(beginning === true) && <div className="center" style={{borderBottom:'2px solid white', width:'30px'}} >
                        { show1 > 0 && show1}
                        {show1 <= 0 && show1+answer1+3}
                    </div>}
                    { !(value1 === 0) && !(beginning === true) && <div>{show2 <= 1 && answer2+num1}{show2 > 1 && show2}</div>}
                    {answer1 > 0 && beginning === true &&<div className="center" style={{borderBottom:'2px solid white', width:'30px'}} >
                        {show1 > 0 && show1}
                        {show1 < 0 && answer1+show1}{show1 === 0 && answer1+3}
                    </div>}
                    {answer1 > 0 && beginning === true && <div>{show2 <= 1 && num1+show2}{show2 > 1 && show2}</div>}
                </div>
            </button>
        </div>
        
            
    )

}

export default Choice