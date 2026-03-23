import { useState } from "react"
import { getDocs, collection } from "firebase/firestore"
import { db } from "@/firebase"
import { useRouter } from "next/router"


export default function Manage(){
    const [name, setName] = useState()
    const [n, setN] = useState()
    const [data, setData] = useState()
    const router = useRouter()

    async function saveName(){
        window.localStorage.setItem('Name',n)
        setName(n)
        const querySnapshot = await getDocs(collection(db, n));
        setData(querySnapshot)
        console.log('cwi')
        querySnapshot.forEach((doc) => {
            console.log(doc.id, doc.data());
        });
    }

    return(
        <>
            {!name ? <div className="center column">
                <h1>Enter Name</h1>
                <div>
                    <input placeholder="Name" onChange={(e)=>{setN(e.target.value)}} ></input> <button onClick={saveName} >Enter</button>
                </div>
            </div>:<div>
                <div className="center">
                    <h2>Name: {name}</h2>
                    <button className="choice help" style={{color:"black",width:"230px"}} 
                    onClick={()=>{router.push('/homework')}} >Assign Homework</button>
                </div>
            </div>}
        </>
    )
}