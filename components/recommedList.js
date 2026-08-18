import { useState } from 'react';
import Link from "next/link";
import { useRouter } from 'next/router';

export default function ReccomedList({close}){  
    const [count, setCount] = useState(0)
    const [loaded, setLoaded] = useState(true)
    const router = useRouter()  
    const {id} = router.query 

    return (
        <div className="center" style={{height: "20vh",position: "fixed",width: "100vw"}}>
            <div className="Help" >
                <div className='double' style={{position:"fixed",fontSize:"28px",top:"10%"}} >Recommended List</div>
                <div className='cancel'><button className='cancel-btn' onClick = {()=>close()}>X</button></div>
                {loaded &&  <button onClick={() => {setCount(1)}} className="topic">Addition</button>}
                { count === 1 && <span className = 'center' style={{justifyContent:" start",margin:"0",padding:"0",display:"flex"}} >
                <Link href= {`/${id}/enter/subMenu`}>
                <button className="sub-topic zoom" style={{margin:"0 8px 0 40px"}}>Single digit Addition</button></Link> 
            </span>}
            { loaded &&  <button onClick={() => {setCount(2)}}  className="topic">Subtraction</button >}
            {  count === 2 &&
                <Link href= {`/${id}/enter/subMenuMinus`} style={{display:"flex",justifyContent:"start",alignItems:"center"}} >
                    <button className="sub-topic zoom" style={{margin:"0 8px 0 40px"}}>Single digit Subtraction</button>
                </Link>}
                
            { loaded &&  <button onClick={() => {setCount(3)}}  className="topic">Multiplication</button >}
            {  count === 3 &&<Link href= {`/${id}/enter/subMenuTimes`} style={{display:"flex",justifyContent:"start",alignItems:"center"}}>
                    <button className="sub-topic zoom" style={{margin:"0 8px 0 40px"}}>Single digit Multiplication</button>
                </Link>}
                { loaded && <button onClick={() => {setCount(4)}}  className="topic">Division</button >}
            {  count === 4 && <Link href= {`/${id}/enter/subMenuDiv`} style={{display:"flex",justifyContent:"start",alignItems:"center"}}>
                    <button className="sub-topic zoom" style={{margin:"0 8px 0 40px"}}>Short Division</button> 
                </Link>}
                { loaded && <button onClick={() => {setCount(10)}}  className="topic">Algebra</button >}
            { count === 10 && <Link href= {`/${id}/enter/Algebra`} style={{display:"flex",justifyContent:"start",alignItems:"center"}}>
                    <button className="sub-topic zoom" style={{margin:"0 8px 0 40px"}}>One variable</button>
                </Link>}
                { loaded && <button onClick={() => {setCount('loge')}}  className="topic">Calculus</button >}
             { count === 'loge' &&<Link href= {`/${id}/enter/derivatives`} style={{display:"flex",justifyContent:"start",alignItems:"center"}} >
                    <button className="sub-topic zoom" style={{position:"relative",top:"-25px",}}>Intro to derivatives</button>
                </Link>}
            </div>
        </div>
    )
}