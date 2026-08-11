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
    const [time, setTime] = useState()

    function Start(){
        window.localStorage.setItem('HwLink', data.url)
        window.localStorage.setItem('HwAmount', data.amount)
        router.push(`/MIT/${data.url}`)
    }

    async function saveName(){
        const ref = doc(db,n,"teacher")
        const snap = await getDoc(ref)
        const name = window.localStorage.getItem('Name')
        const last = window.localStorage.getItem('LastName')
        const full = name+last
        const see = doc(db,n,full)
        const ifDone = await getDoc(see)

        if (snap.exists()) {
            window.localStorage.setItem('TeacherName',n)
            setName(n)
            setTeacher(n)
            setData(snap.data())
            window.localStorage.setItem('TeacherID',snap.data().check)
            if(ifDone.exists()){
                if(snap.data().time < ifDone.data().time){
                    setTime(true)
                }
            }
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
            {!teacher ? <div className=" column center" style={{borderRadius:"20px",padding:"10px",border:'2px solid brown',backgroundColor:"beige"}}>
                    <button className='cancel-btn' 
                 style={{
                    fontSize:"25px",
                    position:"relative",
                    bottom:"10px",
                    right:"5px",
                    display: "flex",
                    width:"100%",
                    justifyContent:"end",
                    zIndex:"100",
                    padding:"5px"
                }}  
                    onClick={()=>{router.push('Trial')}}>X</button>
                    <div style={{position:"relative",bottom:"30px"}} ><div className="double">Enter class</div>
                 <div className='cancel center' style={{width:"100%"}} >
                 {Try && <div style={{color:"red"}} >{Try}</div>}</div>
                 <input
                    onChange={(e) => setN(e.target.value)} 
                    style={{width:"140px", margin:"10px"}} placeholder="Teacher's name"></input>
                <button style={{height:"20px"}} onClick={saveName}>Enter</button>
                </div> 
            </div>:<div>{ !time && <div className="center double column">
               Class: {teacher}
               <br></br>
               Topic: {data.topic}
               <br></br>
               amount: {data.amount}
                <button className="choice green" onClick={Start} >Start</button>
            </div>}
                {time && <div className=" center double Green" >Homework Done</div>}
            </div>
            }
        </div>
    )
}