import FeedBack from "@/components/Homework";
import "@/styles/globals.css";
import { useRouter } from "next/router";
import Done from "@/components/YourDdne";
import { useEffect, useReducer, useState } from "react";
import { reload } from "firebase/auth";

export default function App({ Component, pageProps }) {
  
  const [hw, setHw] = useState('h')
  const [amount, setAmount] = useState('h')
  const [check, setCHeck] = useState()
  const [Link, setLink] = useState(true)
  const [count, setCount] = useState()
  const [done, setDone] = useState()
  const router = useRouter()
  const [cheat, setCheat] = useState(0)
  const [on, setON] = useState('on')
  const [date, setDate] = useState();
  const [loaded, setLoaded] = useState();
  const [see, setSee] = useState();
  const {id} = router.query 
  function Route(){
    if(hw){
      router.push(`/MIT/${hw}`)
    }else{
      router.push(`/Trial}`)
    }
  }

  useEffect(()=>{
    const url  = window.localStorage.getItem('HwLink')
    const total  = window.localStorage.getItem('HwAmount')
    const counting = window.localStorage.getItem('HwCount')
    if(counting){
      setCount(counting)
    } 
    setAmount(total)
    if(counting > total){
      setDone(true)
    }
    setHw(url)
    const last = router.asPath.split("/").pop()
    setCHeck(last)
    setLoaded(true)
    setSee(false)
  },[])

  useEffect(()=>{
    const user = window.localStorage.getItem('ID')
    const cheatID = window.localStorage.getItem('cheatID')
    const mistake = window.localStorage.getItem('cheat')  
    if(mistake >= 3 && user == cheatID){
        setCheat(mistake)
      }
    if(mistake <= 0){
      setCheat(0)
    }
  },)

  useEffect(()=>{
    const user = window.localStorage.getItem('ID')
    if(on == 'on'&& loaded && id == user){
      setDate(new Date())
      window.localStorage.setItem(`${user} cheatTime`,new Date())    
    }
    if(on == 'off'){
      window.localStorage.setItem('cheat',0)
      window.localStorage.setItem('HwMistake',0)
    }
  },[on])

  function letSee(){
    setSee(!see)
    const user = window.localStorage.getItem('ID')
    let date = window.localStorage.getItem(`${user} cheatTime`) 
    if(date){
      setDate(new Date(date))
      console.log(id,user)
    }
  }

  return (
    <div onClick={()=>{setLink(!Link)}}>
      {/* Sky background (always rendered) */}
      <div className="sky">
        <div className="clouds layer-1" />
        <div className="clouds layer-2" />
        <div className="clouds layer-3" />
        <div className="tilt" />
      </div>

      {/* Page content */}
      <main className="content">
        {cheat > 0  && on == 'on' && <div className="Red" style={{fontSize:"100px",width:"100%",backgroundColor:"#7BCDFF",position:"fixed",left:"50%",top:"1%",transform:'translate(-50%)'}} >Cheater</div>}
        {cheat > 0  && on == 'on' && <div className="Red" style={{fontSize:"16px",width:"100%",backgroundColor:"#7BCDFF",position:"fixed",left:"50%",top:"15%",transform:'translate(-50%)'}} >Turn off cheat detection if user is discouraged. </div>}
        {hw !== 'false' && count <= amount && !done && count && amount &&
        <div className="center column" 
        style={{justifyContent:"end",alignItems:"end",width:"95%",margin:"10px"}} >
          {count && amount && <button className=" choice help" onClick={()=>Route()} style={{width:"200px",color:"black"}} >Homework {count}/{amount}</button>}
        <div style={{width:"210px",color:"black",position:"relative",bottom:"5px"}} >click button</div>
        </div>}
        {done && <Done close={()=>setDone()} ></Done>}
        <Component {...pageProps} />
        <div className="center column" 
        style={{width:"100vw",justifyContent:"end",position:"relative",left:"8px",bottom:"20px",zIndex:"20"}} >
          <div className="center" style={{fontSize:"28px"}} >
            <br></br>
            {id && <span>Cheat Detection:</span>}
            {on == 'on' ? 
            <div>{id && <button className="choice green" onClick={()=>{setON('off')}}>{on}</button>}</div>:
            <div>{id && <button className="choice red" onClick={()=>{setON('on')}}>{on}</button>}</div>} 
          </div>
          {on == 'on' && id && !see && <div className="center" >
            <button className="choice green" onClick={letSee} >check</button>
          </div> }
          {on == 'on' && id && date && see && <div className="center" 
          style={{fontSize:"20px"}} >
            Active since: {date.toLocaleString(undefined, {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                            second: "2-digit",
                          })}
          </div>}
        </div>
      </main>
    </div>
  );
}
