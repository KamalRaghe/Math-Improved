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

    function updateList(){
        set(ref(rdb, 'users/' + '3222/' + '-O68N6PLEqfBXLJrFPLv'),{
            title:account.title,
        }).then(()=>{
            console.log('done Added to list ')
        })
    }

    function AddList(){
        setAdd(true)
        const usersRef = ref(rdb, 'users/')
        const AddList = push(usersRef)
        set(AddList,{
            user: account.title
        })
        get(usersRef).then((snapshot)=>{
            if(snapshot.exists()){
                const usersArray = Object.entries(snapshot.val()).map(([id,data])=>({
                    id,
                    data,
                }))
            
                for(let i = 0; i < usersArray.length;i++){
                    if(usersArray[i].data.user === account.title){
                        window.localStorage.setItem('GameId',usersArray[i].id)
                        window.localStorage.setItem('GameName',usersArray[i].data.user)
                    }
                }
                let userId = window.localStorage.getItem('GameId')
                console.log(userId)
            }
         }).catch((error)=>{ 
            console.error(error)
        
        })    
    }

    useEffect(()=>{
        let userId = account.title 
        setUser(userId)
        setAdd(userId)
        let room = window.localStorage.getItem('GameRoom')
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
        {add ? <div className="double WaitScreen" >Waiting for host</div> :<div>
            <div className="double center">{user} { user && <button onClick={AddList} className="green" style={{fontSize:"20px",margin:"10px",fontWeight:"bold",padding:"8px",borderRadius:"18px"}} >Ready</button>}</div>
            <br></br>
            <div>
                <input placeholder="Name" value={account.title} type='text' onChange = {(e) => setAccount({...account, title: e.target.value})} ></input>
                <button onClick={()=>{setUser(account.title)}} >Enter</button>
            </div>    
        </div>}
    </div>
)


}


export default App;