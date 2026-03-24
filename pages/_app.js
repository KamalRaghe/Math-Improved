import FeedBack from "@/components/Homework";
import "@/styles/globals.css";
import { useRouter } from "next/router";
import Done from "@/components/YourDdne";

import { useEffect, useReducer, useState } from "react";

export default function App({ Component, pageProps }) {
  
  const [hw, setHw] = useState('h')
  const [amount, setAmount] = useState('h')
  const [check, setCHeck] = useState()
  const [Link, setLink] = useState()
  const [count, setCount] = useState(0)
  const [done, setDone] = useState()
  const router = useRouter()

  useEffect(()=>{
    const url  = window.localStorage.getItem('HwLink')
    const total  = window.localStorage.getItem('HwAmount')
    const counting = window.localStorage.getItem('HwCount')
    if(counting){
      setCount(counting)
    } 
    setAmount(total)
    if(counting >= total){
      setDone(true)
    }
    setHw(url)
    const last = router.asPath.split("/").pop()
    setCHeck(last)
  },[])
  return (
    <>
      {/* Sky background (always rendered) */}
      <div className="sky">
        <div className="clouds layer-1" />
        <div className="clouds layer-2" />
        <div className="clouds layer-3" />
        <div className="tilt" />
      </div>

      {/* Page content */}
      <main className="content">
        {hw !== 'false' && count < amount && !done && <div className="center column" style={{justifyContent:"end",alignItems:"end",width:"95%",margin:"10px"}} >
          <button className=" choice help" onClick={()=>{router.push(`/MIT/${hw}`)}} style={{width:"170px",color:"black"}} >Homework {count}/{amount}</button>
          <div style={{width:"185px",color:"black",position:"relative",bottom:"5px"}} >click button</div>
        </div>}
       
        <Component {...pageProps} />
      </main>
    </>
  );
}
