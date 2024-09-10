import { useEffect, useState } from "react";
import { rdb } from "@/firebase";
import { get, ref, push, set, remove, update, onChildAdded } from "firebase/database";
import { useRouter } from "next/router";


function App() {
 const [users, setUsers] = useState([])
 const [user, setUser] = useState(0)
 const [inList,setInList] = useState(false)
 const [add, setAdd] = useState(false)
 const [score, setScore] = useState()
 const router = useRouter()
 const [account, setAccount] = useState({
    title:""
    })   

    const PlayerList = () =>{
        const usersRef = ref(rdb, 'users/'+'time')
        const abort = new AbortController()
        get(usersRef).then((snapshot)=>{
            if(snapshot.exists()){
                const usersArray = Object.entries(snapshot.val()).map(([id,data])=>({
                    id,
                    data,
                }))
             //    usersArray.sort((a,b) =>{
             //        return b.data.score - a.data.score
             //    })
                let player = []
                for(let i = 0; i < usersArray.length;i++){
                    player.push(usersArray[i])
                }
             window.localStorage.setItem(`player`, player)
             setUsers(player)
            }
         }).catch((error)=>{ 
            console.error(error)
        
        }) 
       }
    useEffect(()=>{
        const usersRef = ref(rdb, 'users/'+'time')
        PlayerList()
        onChildAdded(usersRef,(snapshot)=>{
            let time = Object.entries(snapshot.val())[0]
            console.log(time[1])
            window.localStorage.setItem('Timer', time[1])
            router.push('/login')
        })

       },[])


return(
    <div className="center column" style={{height:"100vh"}}>
        {users.map(num =>{//{num.data.user}: {num.data.score}
            return <div className="double" key={num.id} >{num.data.time}</div>
          })}
        
    </div>
)


}


export default App;