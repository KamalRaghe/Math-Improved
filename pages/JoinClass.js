import { useRouter } from "next/router"
import { doc, getDoc } from "firebase/firestore"
import { useEffect, useState } from "react"
import { db } from "@/firebase"

export default function JoinClass(){

    const [teacher,setTeacher] = useState()
    const [name, setName] = useState()
    const [n, setN] = useState('n')
    const [Try, setTry] = useState()
    const [data, setData] = useState()
    const router = useRouter()

    async function saveName(){
        const ref = doc(db,n,"teacher")
        const snap = await getDoc(ref)
        
        if (snap.exists()) {
            window.localStorage.setItem('TeacherName',n)
            setName(n)
            setTeacher(n)
            setData(snap.data())
        } else {
           if(Try == 'Try again'){
                setTry("Please try again")
           }else{
                setTry('Try again')
           }
    }
}

    return(
        <div className="center">
            {!teacher ? <div className=" column center" style={{borderRadius:"20px",padding:"20px",border:'2px solid brown',backgroundColor:"beige"}}>
                 <div className='cancel' style={{width:"100%"}} >
                 <button className='cancel-btn' 
                 style={{
                    fontSize:"25px",
                    margin:"0px",
                    position:"relative",
                    bottom:"10px",
                    alignItems:"end",
                    zIndex:"100",
                    padding:"5px"
                }}  
                    onClick={()=>{router.push('Trial')}}>X</button>
                 <input
                    onChange={(e) => setN(e.target.value)} 
                    style={{width:"140px", margin:"10px"}} placeholder="Teacher's name"></input>
                <button style={{height:"20px",position:"relative",top:"10px"}} onClick={saveName}>Enter</button>
                </div> 
                {Try && <div style={{color:"red"}} >{Try}</div>}
            </div>:<div className="center double column">
               Class: {teacher}
               <br></br>
               Topic: {data.topic}
               <br></br>
               amount: {data.amount}
                <button className="choice green" onClick={()=>{router.push(`/MIT/${data.url}`)}} >Start</button>
            </div>}
        </div>
    )
}