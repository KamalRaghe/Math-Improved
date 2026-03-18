import { useRouter } from "next/router"
import { doc, getDoc } from "firebase/firestore"
import { useEffect, useState } from "react"

export default function JoinClass(){

    const [teacher,setTeacher] = useState()
    const [name, setName] = useState()
    const [n, setN] = useState()
    const [Try, seTry] = useState()
    const router = useRouter()

    async function saveName(){
        window.localStorage.setItem('TeacherName',n)
        setName(n)
        setTeacher(n)
    }
    
    useEffect(()=>{
        const teach = window.localStorage.getItem('TeacherName')
    },[teacher])

    return(
        <div className="center">
            {!teacher ? <div className=" column center" style={{borderRadius:"20px",padding:"20px",border:'2px solid brown',backgroundColor:"beige"}}>
                 <div className='cancel' style={{width:"100%"}} >
                 <button className='cancel-btn' 
                 style={{
                    fontSize:"25px",
                    margin:"0px",
                    position:"relative",
                    left:"0px",
                    bottom:"10px",
                    alignItems:"end",
                    zIndex:"100",
                    padding:"5px"
                }}  
                    onClick={()=>{router.push('Trial'),saveName()}}>X</button>
                 <input
                    onChange={(e) => setN(e.target.value)} 
                    style={{width:"140px", margin:"10px"}} placeholder="Teacher's name"></input>
                <button style={{height:"20px",position:"relative",top:"10px"}} onClick={saveName}>Enter</button>
                </div>
            </div>:<div>
                {teacher}
            </div>}
        </div>
    )
}