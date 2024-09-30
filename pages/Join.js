import { useEffect, useState } from "react";
import { rdb } from "@/firebase";
import { get, ref, push, set, onChildAdded, remove } from "firebase/database";
import { useRouter } from "next/router";


function App() {
 const [user, setUser] = useState()
 const router = useRouter()

    function Remove(){
        let room = window.localStorage.getItem('GameRoom')
        let id = window.localStorage.getItem('GameId')
        router.push('/Enter')
        remove(ref(rdb, `${room}/`+ id))
    }

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
            let topic = Object.entries(snapshot.val())[1]
            window.localStorage.setItem('Timer', time[1])
            let go = ''
            for(let word of topic[1].split(' ')){
                go += word
            }
            console.log(go)
            router.push(`/Games/${go}`)
        })
    },[])

return(
     <div className="center column" style={{height:"100vh"}}>       
         <div className="double WaitScreen" >Waiting for host</div>
         <div style={{margin:"20px",fontSize:"20px"}}>Code: {user}</div>
         <button onClick={Remove} className="Red" style={{backgroundColor:"transparent",padding:"5px"}} >Wrong room?</button>
    </div>

)


}


export default App;