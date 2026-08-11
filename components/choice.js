import { set } from "firebase/database";
import { number } from "mathjs";
import { useRouter } from "next/router";
import { useEffect, useReducer, useState } from "react";

function Choice({value, answer, doSomething, Correct, Wrong,big, size ,title}){
   
      const [hw, setHw] = useState('h')
      const [amount, setAmount] = useState('h')
      const [check, setCHeck] = useState()
      const [Link, setLink] = useState()
      const [count, setCount] = useState(0)
      const [MCount, setMCount] = useState(0)
      const [noCheat, setNOCheat] = useState(true)
      const router = useRouter()
    
      function counter(){
        let cheat = window.localStorage.getItem('cheat')
        if(cheat > 0){
          window.localStorage.setItem('cheat',cheat-1)
          window.localStorage.setItem('HwMistake', cheat-1)
        }
          
        if(check == hw){
            setCount(Number(count)+1)
            setTimeout(() => {
                router.reload()
            }, 1490);
        }
      }
      function Mistake(){
         let cheat = window.localStorage.getItem('cheat')
         let checkCheat = Number(cheat)
        if(checkCheat >= 0){
          window.localStorage.setItem('cheat',checkCheat+1)
          window.localStorage.setItem('HwMistake', checkCheat+1)
        }
        let user = window.localStorage.getItem('ID')
        window.localStorage.setItem('cheatID', user)
      }
       useEffect(() =>{
         if(count > 0){
             window.localStorage.setItem(`HwCount`, count)
        }},[count])
    
      useEffect(()=>{
        const url  = window.localStorage.getItem('HwLink')
        const total  = window.localStorage.getItem('HwAmount')
        const counting = window.localStorage.getItem('HwCount')
        // const mistake = window.localStorage.getItem('HwMistake')
        const mistake = window.localStorage.getItem('cheat')
        setMCount(Number(mistake))
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
            {big ? <button className='choice-stretch' onClick={()=>{Do()}}><div style={{width: size}} >{title ? title:value}</div></button> 
            :<button className='choice center' onClick={()=>{Do()}}>{value}</button>}
        </div>
        
            
    )

}

export default Choice