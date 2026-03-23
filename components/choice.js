import { useRouter } from "next/router";
import { useEffect, useReducer, useState } from "react";

function Choice({value, answer, doSomething, Correct, Wrong,big, size ,title}){
   
      const [hw, setHw] = useState('h')
      const [amount, setAmount] = useState('h')
      const [check, setCHeck] = useState()
      const [Link, setLink] = useState()
      const [count, setCount] = useState(0)
      const [Mcount, setMCount] = useState(0)
      const router = useRouter()
    
      function counter(){
        console.log(check,hw,count)
        if(check == hw){
            setCount(Number(count)+1)
            console.log(Number(count)+1)
            setTimeout(() => {
                router.reload()
            }, 1400);
        }
      }
      function Mistake(){
        setMCount(Mcount+1)
        window.localStorage.setItem('HwMistake', Mcount+1)
      }
       useEffect(() =>{
         if(count > 0){
             window.localStorage.setItem(`HwCount`, count)
        }},[count])
    
      useEffect(()=>{
        const url  = window.localStorage.getItem('HwLink')
        const total  = window.localStorage.getItem('HwAmount')
        const counting = window.localStorage.getItem('HwCount')
        const mistake = window.localStorage.getItem('HwMistake')
        setMCount(mistake)
        if(counting){
          setCount(counting)
        } 
        setAmount(total)
        setHw(url)
        const last = router.asPath.split("/").pop()
        setCHeck(last)
      },[])  

    function Do(){
        if(answer === value){
            Correct() 
            counter()
            doSomething()
        }
        else{
            Wrong()
            Mistake()
        }
    }
    return(
        <div className="center" >
            {big ? <button className='choice-stretch' onClick={()=>{Do()}}><div style={{width: size, color:"white"}} >{title ? title:value}</div></button> 
            :<button className='choice center' onClick={()=>{Do()}}>{value}</button>}
        </div>
        
            
    )

}

export default Choice