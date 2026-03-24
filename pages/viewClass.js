import { useEffect, useState } from "react"
import { getDocs, collection } from "firebase/firestore"
import { db } from "@/firebase"
import { useRouter } from "next/router"

export default function View(){
    const [data, setData] = useState()
    const [name, setName] = useState()
    const router = useRouter()

    function Wrong(){
        window.localStorage.setItem('Name', '' )
        router.push('/ManageClass')
    }

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
        setName(n)
    },[])
    return(
        <div>
            <div className="double" >{name}'s Class</div>
            {data && <div>
                {data.map((item) => (
                <div className=" center" key={item.id}>
                    {item.name &&<span className='double' style={{width:"300px"}} >
                        {item.name} {item.last}
                    </span>} 
                    {item.state && <button className="choice green" >
                        {item.state}
                    </button>} 
                    {item.state && <button className="choice red" >
                        {item.mistake}
                    </button>}
                </div>
                ))}
            </div>}
            <div className="center" ><button className="choice red" onClick={Wrong} style={{width:"180px"}}>Wrong Class</button></div>
        </div>
    )
}