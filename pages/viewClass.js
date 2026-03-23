import { useEffect, useState } from "react"
import { getDocs, collection } from "firebase/firestore"
import { db } from "@/firebase"
import { useRouter } from "next/router"

export default function View(){
    const [data, setData] = useState()

    async function Name(n){
        const querySnapshot = await getDocs(collection(db, n));
        const list = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));

        setData(list);
        console.log(list)
    }

    useEffect(()=>{
        const n = window.localStorage.getItem("Name")
        Name(n)
    },[])
    return(
        <div>

        </div>
    )
}