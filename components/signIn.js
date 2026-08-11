import { auth } from "@/firebase"
import {createUserWithEmailAndPassword } from "firebase/auth"
import Account from "./account"
import { useEffect, useState } from "react"
import { useRouter } from "next/router" 

export default function SingIn(){
    const [user, setUser] = useState(false)
    const [user1, setUser1] = useState(false)
    const [password, setPassword] = useState('password')

    const router = useRouter()

    function signIn(e){
      e.preventDefault()
      const email = e.target.email.value
      const password = e.target.password.value
      createUserWithEmailAndPassword(auth,email,password).then(()=>{
        router.push('/home')
      })
    }
    
    function Password(){
      if(password === 'password'){
        setPassword('')
      }else{
        setPassword('password')
      }
    }

    useEffect(()=>{
      console.log(user,user1)
    },[user])
    
    return(
        <div className="timeout container" style={{border:'10px solid navy',backgroundColor:"silver"}} >
        <form className="center column" onSubmit={(e)=> signIn(e)}>
          <input name='email' type='email' placeholder="Email" ></input><br></br>
          <div className="center" style={{width:"100px",backgroundColor:"transparent",border:'none'}} >
            <input name='password' type={password} placeholder="password" ></input>
          <button className="absolute center" onClick={Password} style={{top:"98px",left:"255px",rotate:"-90deg",width:"10px",height:"10px",backgroundColor:"transparent",border:'none'}}>
            <span className="hide" >(</span><div className="relative" style={{fontSize:"10px",padding:"0px",left:"2px"}} >{password === 'password' ? 'o' : '|'}</div>)</button></div><br></br>
          <button>SingIn</button> 
        </form>
        </div>
          
      )
}