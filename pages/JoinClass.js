import { useEffect, useState } from "react"

export default function JoinClass(){

    const [teacher,setTeacher] = useState()
    useEffect(()=>{
        const teach = window.localStorage.getItem('TeacherName')
        setTeacher(teach)
    },[])

    return(
        <div className="center">
            <div className=" column center" style={{borderRadius:"20px",padding:"20px",border:'2px solid brown',backgroundColor:"beige"}}>
                 <div className='cancel' style={{width:"100%"}} >
                 {<button className='cancel-btn' 
                 style={{
                    fontSize:"25px",
                    margin:"0px",
                    position:"relative",
                    left:"6px",
                    bottom:"10px",
                    alignItems:"end",
                    zIndex:"100"}}  
                    onClick={()=>close()}>X</button>}
                </div>
            </div>
        </div>
    )
}