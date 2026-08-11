import { useEffect, useState } from "react"
import Step from "./step"

export default function TA({close}){
    return (
        <div className="Help center column" style={{zIndex:"30"}} >
            <button className=" absolute choice red"  style={{top:'0',left:'0px'}} onClick={close}>Close</button>
           <div>
            <div>
                <div className="relative center" style={{top:'40px'}} >Acute {'<'} 90<span style={{fontSize:'10px',position:'relative', top:"-8px"}}>o</span></div>
                <div className="relative" style={{ borderLeft:'3px solid black',
                      height:'130px',rotate:"50deg",
                      top:'72px',left:"27px"}} ></div>
                      <div style={{ borderBottom:'3px solid black',width:'130px',alignItems:'start'}}></div>
                      <div className="relative" style={{top:'-20px',left:'20px'}} >40<span style={{fontSize:'10px',position:'relative', top:"-8px"}}>o</span></div>
            </div>
           </div>
           <br></br>
           <div>
           <div className="center" >Right {'='} 90<span style={{fontSize:'10px',position:'relative', top:"-8px"}}>o</span></div>
             <div style={{ borderBottom:'3px solid black',borderLeft:'3px solid black',height:"130px",width:'130px',alignItems:'start'}}></div>
             <div className="relative" style={{top:'-20px',left:'5px'}} >90<span style={{fontSize:'10px',position:'relative', top:"-8px"}}>o</span></div> 
           </div>
           <div>
           <div className="relative center" style={{top:'50px'}} >Obtuse {'>'} 90<span style={{fontSize:'10px',position:'relative', top:"-8px"}}>o</span></div>
                <div className="relative" style={{ borderLeft:'3px solid black',
                      height:'130px',rotate:"-50deg",
                      top:'-24px',left:"-43px"}} ></div>
                      <div className="relative" style={{ left:"30px",borderBottom:'3px solid black',width:'130px',alignItems:'start'}}></div>
                      <div className="relative" style={{top:'-20px',left:'30px'}} >120<span style={{fontSize:'10px',position:'relative', top:"-8px"}}>o</span></div>
           </div>
           
        </div>
    )
}