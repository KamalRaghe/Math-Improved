import { useEffect, useState } from "react"
import { getDocs, collection } from "firebase/firestore"
import { db } from "@/firebase"
import { useRouter } from "next/router"


export default function Manage(){
    const [name, setName] = useState()
    const [n, setN] = useState()
    const [data, setData] = useState()
    const router = useRouter()

    function saveName(){
        window.localStorage.setItem('Name',n)
        setName(n)   
    }

    useEffect(()=>{
        let nam = window.localStorage.getItem("Name")
        setName(nam)
    },[])

    return(
        <>
            {!name ? <div className="center column">
                <h1>Enter Name</h1>
                <div>
                    <input placeholder="Name" onChange={(e)=>{setN(e.target.value)}} ></input> <button onClick={saveName} >Enter</button>
                </div>
            </div>:<div>
                <div className="center column" >
                    <div className="center" >
                        <h2>Name: {name}</h2> 
                        <button 
                        style={{marginLeft:"20px",
                        backgroundColor:"cyan",
                        borderRadius:"15px"}}
                        onClick={()=>{setName()}} 
                        >Change</button>
                    </div>
                    <button className="choice green" style={{width:"230px"}} 
                    onClick={()=>{router.push('/homework')}} >Assign Homework</button>
                    <button className="choice help" style={{color:"black",width:"200px"}} 
                    onClick={()=>{router.push('/viewClass')}} >View Class</button>
                </div>
            </div>}
        </>
    )
}