import { useEffect, useState } from "react";
import { rdb } from "@/firebase";
import { get, ref, push, set, remove, update, onChildAdded } from "firebase/database";
import { useRouter } from "next/router";


function App() {
 const [users, setUsers] = useState([])
 const [user, setUser] = useState(0)
 const [inList,setInList] = useState(false)
 const [add, setAdd] = useState(false)
 const [score, setScore] = useState(false)
 const router = useRouter()
 const [account, setAccount] = useState({
    title:""
    })   

    function Again(){
        let name = window.localStorage.getItem('GameName')
        let id = window.localStorage.getItem('GameId')
        let room = window.localStorage.getItem('GameRoom')
        set(ref(rdb, `${room}/` + id),{
            user: name,
            score: 0
        }).then(()=>{
            router.push('/Join')
        })
    }

    function Leave(){
        let name = window.localStorage.getItem('GameName')
        let id = window.localStorage.getItem('GameId')
        let room = window.localStorage.getItem('GameRoom')
        set(ref(rdb, `${room}/` + id),{
            user: name,
            score: 0
        })
    }

    function Remove(){
        let name = window.localStorage.getItem('GameName')
        let id = window.localStorage.getItem('GameId')
        let room = window.localStorage.getItem('GameRoom')
        remove(ref(rdb, `${room}/` + 'time'))
    }

    const PlayerList = () =>{
        let room = window.localStorage.getItem('GameRoom')
        const usersRef = ref(rdb, `${room}/`)
        
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
        setTimeout(()=>{
            PlayerList()
            setAdd(true)
        },1500)
        setTimeout(() => {
            Leave()
        }, 30000);
        Remove()
        setTimeout(()=>{
            router.push('/')
        },300000)
    },[])


return(
    <div className="center column" style={{height:"100vh"}}>
        {!add && <div className="double WaitScreen" >Result</div>}
        {users.map(num =>{//{num.data.user}: {num.data.score}
            return <div className="double" key={num.id} >{num.data.score > 0 && num.data.user} {num.data.score > 0 && num.data.score}</div>
          })}
        {add && <button onClick={Again} className="red" style={{fontSize:"20px",margin:"10px",fontWeight:"bold",padding:"8px",borderRadius:"18px"}} >Play Again</button>}
    </div>
)


}


export default App;