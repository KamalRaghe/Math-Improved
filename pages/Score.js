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

    function Again(){
        let name = window.localStorage.getItem('GameName')
        let id = window.localStorage.getItem('GameId')
        set(ref(rdb, 'users/' + id),{
            user: name,
            score: 0
        }).then(()=>{
            router.push('/Join')
        })
    }

    function Leave(){
        let name = window.localStorage.getItem('GameName')
        let id = window.localStorage.getItem('GameId')
        set(ref(rdb, 'users/' + id),{
            user: name,
            score: 0
        }).then(()=>{
            router.push('/')
        })
    }

    function Remove(){
        let name = window.localStorage.getItem('GameName')
        let id = window.localStorage.getItem('GameId')
        remove(ref(rdb, 'users/' + 'time'))
    }

    const PlayerList = () =>{
        const usersRef = ref(rdb, 'users/')
        const abort = new AbortController()
        get(usersRef).then((snapshot)=>{
            if(snapshot.exists()){
                const usersArray = Object.entries(snapshot.val()).map(([id,data])=>({
                    id,
                    data,
                }))
                usersArray.sort((a,b) =>{
                    return b.data.score - a.data.score
                })
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
        PlayerList()
        Remove()
        setTimeout(()=>{
            Leave()
        },300000)
    },[])


return(
    <div className="center column" style={{height:"100vh"}}>
        {users.map(num =>{//{num.data.user}: {num.data.score}
            return <div className="double" key={num.id} >{num.data.score > 0 && num.data.user} {num.data.score > 0 && num.data.score}</div>
          })}
        <button onClick={Again} className="red" style={{fontSize:"20px",margin:"10px",fontWeight:"bold",padding:"8px",borderRadius:"18px"}} >Play Again</button>
    </div>
)


}


export default App;