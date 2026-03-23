import { useEffect, useState } from "react"
import { getDocs, collection } from "firebase/firestore"
import { db } from "@/firebase"
import { useRouter } from "next/router"

export default function View(){
    const [data, setData] = useState()
    const [name, setName] = useState()
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
            <div className="center" >
                <span style={{position:"relative",left:"110px"}} className="double">{name}</span>
                <button style={{marginLeft:"212px"}} className="choice green" >
                    state
                </button> 
                <button className="choice red" >
                    mistake
                </button>
            </div>
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
        </div>
    )
}