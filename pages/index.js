
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { auth } from "@/firebase"
import { createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth"

export default function Home() {
  const [sign, setSign] = useState()
  const [create, setCreate] = useState(false)
  const [user, setUser] = useState()
  const [red, setRed] = useState()
  const [ loaded, setLoaded] = useState(false)
  const [password, setPassword] = useState('password')
  const [move, setMove] = useState('165px')
  const [id, setId] = useState('id')

  const router = useRouter()



  function signIn(e){
    e.preventDefault()
    const email = e.target.email.value
    const password = e.target.password.value
    signInWithEmailAndPassword(auth,email,password).then((result)=>{
      setUser(true)
    }).catch(err =>{
      setRed('red')
      alert(err)
  
      setTimeout(() => {
        setRed(false)
      }, 1000);
    })
  }
  
  function CreateUser(e){
    e.preventDefault()

    const email = e.target.email.value
    const password = e.target.password.value
    
    createUserWithEmailAndPassword(auth,email,password).then(()=>{
      setUser(true)
    }).catch(err =>{
      alert(err)
      setRed('red')
      setTimeout(() => {
        setRed(false)
      }, 1000);
    })
  }

  function Password(){
    if(password === 'password'){
      setPassword('')
      setMove('169px')
    }else{
      setPassword('password')
      setMove('165px')
    }
  }

  useEffect(()=>{
    const SignInUser = window.localStorage.getItem('User')
    setUser((SignInUser))
    setLoaded(true)
  },[])

  useEffect(()=>{
    if(user === true){
    window.localStorage.setItem('User', `${auth.currentUser?.email}`)
    window.localStorage.setItem('uid', `${auth.currentUser?.uid}`)
}},[user])

  return (
    <div className="center beige column">
      <div className="center column" style={{alignItems:"start"}}>
        <div className="relative" style={{fontSize:"70px",top:"20px",color:'navy',padding:"0px"}} >Math</div>
        <div className="relative" style={{fontSize:"70px",color:'purple',paddingBottom:"20px"}} >Improved</div>
        <div className="relative">
        {!user && !create && loaded && <button className="absolute center" onClick={Password} style={{padding:"0px",top:"110px",left:move,backgroundColor:"white",border:"none"}} >
            <span className="hide" ></span><div className="relative">{password === 'password' ? 'show' : 'hide'}</div></button>}
        {!user && !create && loaded && <div>
          <div style={{paddingBottom:'10px',fontSize:"50px"}} >Sign In <button style={{background:'none',fontSize:"30px",border:'none',color:"blue"}} onClick={()=>{setCreate(true)}} >Sign up</button></div>  
        <form className="center sb column" style={{alignItems:'start'}} onSubmit={(e)=> signIn(e)}>
          <input className="relative" style={{borderColor: red,width:'190px'}} name='email' type='email' placeholder="Email" ></input><br></br>
          <div className="center" style={{width:"200px",backgroundColor:"transparent",border:'none'}} >
            <input style={{borderColor: red,width:'200px'}} name='password' type={password} placeholder="password" ></input> </div>
        <div className="center" >
          <button style={{marginTop:'10px'}}>Enter</button>   
        </div>
        </form>
        </div>}
        </div>
      </div>
      {(create || user) && <div className="box" ></div>}
      {create && <div className="box" ></div>}
      
        {!user && create && <div className="timeout center" style={{border:'10px solid navy',backgroundColor:"silver"}} >
        <button className="relative" style={{top:'-65px',left:'250px',background:'none',border:'none',color:"black",fontSize:"50px"}} onClick={()=>{setCreate(false)}} >X</button> 
        <div>
          <button className="relative center" onClick={Password} style={{width:"40px",zIndex:"10",left:"130px",top:'125px',backgroundColor:"transparent",border:"none"}} >
              <span className="hide" ></span><div>{password === 'password' ? 'show' : 'hide'}</div></button>
          <form className="center column relative" style={{right:"20px"}} onSubmit={(e)=> CreateUser(e)}>
            <div style={{padding:'10px',fontSize:"40px"}} >Sign Up</div>
            <input style={{borderColor: red, width:'180px'}} name='email' type='email' placeholder="Email" ></input><br></br>
            <div className="center" style={{backgroundColor:"transparent",border:'none'}} >
              <input style={{borderColor: red, width:'180px'}} name='password' type={password} placeholder="password" ></input>
          </div><br></br>
              <button style={{marginBottom:'10px'}} >Create</button>
          </form>
        
        </div>
        </div>}
      <div className="box" ></div>
      {!user && <div className="box" ></div>}
      {user && <div className="box center" style={{width:'340px'}} >
        
        <button className="topic column" onClick={()=>{router.push('/stats')}} style={{width:'150px', height:"90px"}} >
          <div className="center" style={{paddingTop:'20px',paddingBottom:"5px"}} >
            <div className="red relative" style={{marginBottom:"10px",rotate:'90deg',width:'20px',height:'10px',left:'20px',top:"4px"}} ></div>
            <div className="relative" style={{marginBottom:"10px",rotate:'90deg',width:'40px',height:'10px',backgroundColor:"cyan",top:"-5px",left:"5px"}} ></div>
            <div className="relative" style={{marginBottom:"10px",rotate:'90deg',width:'30px',height:'10px',left:"-15px",backgroundColor:"lime"}} ></div>
          </div>
          Stats
        </button>
        <button className="topic column" onClick={()=>{router.push('/home')}} style={{width: '150px', height:"90px"}} >
          <div className="center" style={{padding:'0 20px'}}>
            <div className="relative" style={{rotate:"90deg",borderBottom:"50px solid white",borderRight:'25px solid transparent',borderLeft:'25px solid transparent'}} ></div>
          </div>
          Start
        </button>
      </div>}
    </div>
  )
}
