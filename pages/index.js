
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { auth } from "@/firebase"
import { db } from "@/firebase"
import { addDoc, collection } from "firebase/firestore"
import { createUserWithEmailAndPassword,signInWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail } from "firebase/auth"

export default function Home() {
  const [sign, setSign] = useState()
  const [create, setCreate] = useState(false)
  const [user, setUser] = useState()
  const [red, setRed] = useState()
  const [ loaded, setLoaded] = useState(false)
  const [password, setPassword] = useState('password')
  const [move, setMove] = useState('165px')
  const [id, setId] = useState('id')
  const [link, setLink] = useState(false)
  const [account, setAccount] = useState({
    title:"", 
    password:""
    })

  const router = useRouter()



  function signIn(){
    const email = account.title
    const password = account.password
    signInWithEmailAndPassword(auth,email,password).then((result)=>{
      setUser(true)
      router.push('/login')
    }).catch(err =>{
      alert(err)
    })
  }
  
  function Forgot(){
    const email = account.title
    if(email){
      sendPasswordResetEmail(auth, email).then(()=>{alert('Check your email')})
    }else{
      alert('Put in your email') 
    }
  }

  function CreateUser(e){
    e.preventDefault()
    const email = e.target.email.value
    const password = e.target.password.value

    createUserWithEmailAndPassword(auth,email,password).then(()=>{
      setUser(true)
      router.push('/login')
    }).catch(err =>{
      alert(err)
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
    const security = window.localStorage.getItem('Id')
    if(security){
      setLink(security)
    }else{
      const num = Math.ceil(Math.random()*100000000000000000000)
      window.localStorage.setItem('Id' , num)
      setLink(num)
    }
  },[])

  useEffect(()=>{
    if(user === true){
    window.localStorage.setItem('User', `${auth.currentUser?.email}`)
    window.localStorage.setItem('uid', `${auth.currentUser?.uid}`)
    router.push('/login')
}},[user])

  return (
    <div className="center beige column">
      <div className="center column" style={{alignItems:"start"}}>
        <div className="relative" style={{fontSize:"70px",top:"20px",color:'navy',padding:"0px"}} >Math</div>
        <div className="relative" style={{fontSize:"70px",color:'purple',paddingBottom:"20px"}} >Improve</div>
        <div className="relative">
          {!user && !create && loaded && <div style={{ display:"flex",flexDirection:"column",alignItems:"center", height:"215px",border:"2px solid black",padding:"5px"}}>
            <div style={{paddingBottom:'10px',fontSize:"50px"}} >
            <button style={{background:'none',fontSize:"20px",border:'none',color:"blue",display:"flex",justifyContent:"end",width:"110%",paddingTop:"5px"}} onClick={()=>{setCreate(true)}} >Sign up</button>
              <div className="center" style={{fontSize:"50px",fontWeight:"bold"}}  >Sign In</div> 
            </div>  
             
            <div className="" style={{width:"200px",backgroundColor:"transparent",border:'none'}} >
              <input className="relative" style={{borderColor: red,width:'190px',marginBottom:"10px"}} name='email' type='email' placeholder="Email" value={account.title} onChange = {(e) => setAccount({...account, title: e.target.value})} ></input>
              <input style={{borderColor: red,width:'190px',zIndex:"100"}} name='password' type={password} placeholder="password" value={account.password} onChange = {(e) => setAccount({...account, password: e.target.value})} ></input> </div>
              {!user && !create && loaded && <button style={{position:"relative",left:"43px"}} onClick={Password}>
              <div className="relative">{password === 'password' ? 'show password' : 'hide password'}</div></button>}
          <div className="center column" >
          <button style={{position:'relative',right:"70px"}} onClick={signIn} >Enter</button>
            <button style={{position:'relative',right:"44px",margin:"4px",backgroundColor:"transparent",border:'none',color:"blue"}} onClick={Forgot} >Forgot password</button>   
          </div>
          
          </div>}
            <div style={{display:'flex',justifyContent:'end',position:"relative",zIndex:"10"}}>
             
            </div>
        <div className="relative" style={{display:'flex',justifyContent:'end',width:'200px',top:'-74px',left:"5px"}}>
           
        </div>
        
        </div>
      </div>
      {(create || user) && <div className="box" ></div>}
      {create && <div className="box"></div>}
      
        {!user && create && <div className="timeout center" style={{paddingBottom:"15px",border:'2px solid black',width:"280px",backgroundColor:"beige",position:"relative",top:"-50px"}} >
        <button className="relative" style={{top:'-70px',left:'205px',background:'none',border:'none',color:"black",fontSize:"50px",zIndex:"10"}} onClick={()=>{setCreate(false)}} >X</button> 
        <div className="relative" ><br></br><br></br>
          <form className="center column relative" style={{right:"28px"}} onSubmit={(e)=> CreateUser(e)}>
            <div style={{padding:'10px',fontSize:"40px"}} >Sign Up</div>
            <input style={{borderColor: red, width:'180px'}} name='email' type='email' placeholder="email" ></input><br></br>
            <div className="center" style={{backgroundColor:"transparent",border:'none'}} >
              <input style={{borderColor: red, width:'180px'}} name='password' type={password} placeholder="password" ></input>
          </div><br></br>
              <button className="relative" style={{marginBottom:'10px',right:'69px'}} >Create</button>
          </form>
          <div className="relative" style={{display:'flex',justifyContent:'end',top:'-50px',right:'28px'}} >
            <button onClick={Password}><div className="relative">{password === 'password' ? 'show password' : 'hide password'}</div></button>
          </div>
        </div>
        </div>}
      <div className="box" >
        <button onClick={()=>{router.push('/Enter')}} className="green" style={{fontSize:"20px",margin:"10px",fontWeight:"bold",padding:"8px",borderRadius:"18px"}} >Game</button>
      </div>
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
        <button className="topic column" onClick={router.push('/login')} style={{width: '150px', height:"90px"}} >
          <div className="center" style={{padding:'0 20px'}}>
            <div className="relative" style={{rotate:"90deg",borderBottom:"50px solid white",borderRight:'25px solid transparent',borderLeft:'25px solid transparent'}} ></div>
          </div>
          Start
        </button>
      </div>}
    </div>
  )
}
