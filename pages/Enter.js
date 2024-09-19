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
    const [code, setCode] = useState({
        title:""
        })

    function inList(){
        const usersRef = ref(rdb, `${code.title}`)
        get(usersRef).then((snapshot)=>{
            if(snapshot.exists()){
                window.localStorage.setItem('GameRoom', code.title)
                setAdd(true)
                console.log(code.title)
            }
        })
    }

    function AddList(){
        setAdd(true)
        const usersRef = ref(rdb, `${code.title}`)
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
                        window.localStorage.setItem('host', true )
                    }
                }
                router.push('Join')
            }
         }).catch((error)=>{ 
            console.error(error)
        
        })    
    }


return(
    <div className="center column" style={{height:"100vh"}}>       
        {user ? <div className="double" >
            <div>
            <div className="double center">{user} { add && <button onClick={AddList} className="green" style={{fontSize:"20px",margin:"10px",fontWeight:"bold",padding:"8px",borderRadius:"18px"}} >Ready</button>}</div>
                {!add && <input placeholder="Code" value={code.title} type='text' onChange = {(e) => setCode({...code, title: e.target.value})} ></input>}
                { !add && <button onClick={()=>{inList()}} >Enter</button>}
            </div> 
        </div> 
            :<div>
                <input placeholder="Name" value={account.title} type='text' onChange = {(e) => setAccount({...account, title: e.target.value})} ></input>
                <button onClick={()=>{setUser(account.title);console.log(account.title)}} >Enter</button>
            </div>}
    </div>
)


}


export default App;