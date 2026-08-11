import { useEffect, useState } from "react"
import { getDocs, collection, doc, getDoc } from "firebase/firestore"
import { db } from "@/firebase"
import { useRouter } from "next/router"

export default function View(){
    const [data, setData] = useState()
    const [name, setName] = useState()
    const [time, setTime] = useState()
    const [check, setCheck] = useState()
    const router = useRouter()

    function Wrong(){
        window.localStorage.setItem('Name', '' )
        router.push('/ManageClass')
    }

    function Back(){
        router.push('/ManageClass')
    }

    async function Name(n){
        const ref = doc(db,n,"teacher")
        const snap = await getDoc(ref)
                
        if (snap.exists()) {
            setTime(snap.data().time)
        } 

        const querySnapshot = await getDocs(collection(db, n));
        const list = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));

        setData(list);
    }

    useEffect(()=>{
        const n = window.localStorage.getItem("HwName")
        Name(n)
        setName(n)
        let TId = window.localStorage.getItem('uid')
        setCheck(TId)
    },[])
    return(
        <div>
            <div className="double" >Name of class: {name}</div>
            <div>Student need to enter the name to join class</div>
            {data && <div>
                {data.map((item) => (
                <div className=" center" key={item.id}>
                    {item.name && item.check == check && time <= item.time && <span className='double' style={{width:"300px"}} >
                        {item.name} {item.last}
                    </span>} 
                    {item.state && item.check == check && time <= item.time && <button className="choice green" >
                        {item.state}
                    </button>} 
                    {item.state && item.check == check && time <= item.time && <button className="choice red" >
                        {item.mistake}
                    </button>}
                </div>
                ))}
            </div>}
            <div className="center" ><button className="choice help" onClick={Back} style={{width:"120px",color:"black"}}>Go back</button><button className="choice red" onClick={Wrong} style={{width:"180px"}}>Wrong Class</button></div>
            <div className="center" >Only teacher can view class</div>
            <div>You have sign in with teacher account</div>
        </div>
    )
}