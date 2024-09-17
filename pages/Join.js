import { useEffect, useState } from "react";
import { rdb } from "@/firebase";
import { get, ref, push, set, onChildAdded } from "firebase/database";
import { useRouter } from "next/router";


function App() {
 const [users, setUsers] = useState([])
 const [user, setUser] = useState()
 const [add, setAdd] = useState(false)
 const router = useRouter()
 const [account, setAccount] = useState({
    title:""
    })

    useEffect(()=>{
        let room = window.localStorage.getItem('GameRoom')
        if(room){
            const roomRef = ref(rdb, `${room}/`)
            get(roomRef).then((snapshot)=>{
                if(!(snapshot.exists())){
                    router.push('/Enter')
                }
            }).catch((error)=>{ 
                console.error(error)
            
            })
        }else{
            router.push('/Enter')
        }
        const usersRef = ref(rdb, `${room}/`+'time')
        onChildAdded(usersRef,(snapshot)=>{
            let time = Object.entries(snapshot.val())[0]
            console.log(time[1])
            window.localStorage.setItem('Timer', time[1])
            router.push('/Game')
        })
    },[])

return(
    <div className="center column" style={{height:"100vh"}}>       
         <div className="double WaitScreen" >Waiting for host</div>
    </div>
)


}


export default App;