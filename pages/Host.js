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

    function Timer(){
        let room = window.localStorage.getItem('GameRoom')
        const usersRef = ref(rdb, `${room}/`+'time')
        const AddList = push(usersRef)
        set(AddList,{
            time: 63000 + Date.now()
        })
       
    }
   

    useEffect(()=>{
        let room = window.localStorage.getItem('GameRoom')
        setUser(room)
        if(room){
            const roomRef = ref(rdb, `${room}/`)
            get(roomRef).then((snapshot)=>{
                if(!(snapshot.exists())){
                    router.push('/create')
                }
            }).catch((error)=>{ 
                console.error(error)
            
            })
        }else{
            router.push('/create')
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
        {<div className="double" style={{width:"80%",height:"50%"}}>Code: {user}</div>}       
        <button onClick={Timer} className="green" style={{fontSize:"20px",margin:"10px",fontWeight:"bold",padding:"8px",borderRadius:"18px"}} >Start</button>        
    </div>
)


}


export default App;