import "@/styles/globals.css";
import { useEffect, useState } from "react";

export default function App({ Component, pageProps }) {
  
  const [hw, setHw] = useState('h')

  // useEffect(()=>{
  //   const homework = window.localStorage.getItem('HwLink')
  //   setHw(homework)
  // },[])
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
        {hw && <div className="center" style={{justifyContent:"end",width:"95%"}} >
          <button className="help">Homework</button>
        </div>}
        <Component {...pageProps} />
      </main>
    </>
  );
}
