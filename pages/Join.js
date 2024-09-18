import { useEffect, useState } from "react";
import { rdb } from "@/firebase";
import { get, ref, push, set, onChildAdded } from "firebase/database";
import { useRouter } from "next/router";


function App() {
 const [user, setUser] = useState()
 const router = useRouter()


    useEffect(()=>{
        let room = window.localStorage.getItem('GameRoom')
        setUser(room)
        if(!room){
            router.push('/Enter')
        }
        const roomRef = ref(rdb, `${room}/`+'cancel')
        onChildAdded(roomRef,()=>{
            router.push('/')
        })
        const usersRef = ref(rdb, `${room}/`+'time')
        onChildAdded(usersRef,(snapshot)=>{
            let time = Object.entries(snapshot.val())[0]
            console.log(time[1])
            window.localStorage.setItem('Timer', time[1])
            router.push('/Game')
        })
    },[])

return(
    <div>
        <div className="double" style={{paddingTop:"30px",paddingLeft:"50px"}} >Code: {user}</div>
        <div className="center column" style={{height:"70vh"}}>       
             <div className="double WaitScreen" >Waiting for host</div>
        </div>
    </div>
)


}


export default App;