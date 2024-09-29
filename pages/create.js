import { useEffect, useState } from "react";
import { rdb } from "@/firebase";
import { get, ref, push, set, onChildAdded } from "firebase/database";
import { useRouter } from "next/router";


function App() {
 const [loaded, setLoaded] = useState(false)
 const [user, setUser] = useState(false)
 const [add, setAdd] = useState(false)
 const router = useRouter()
 const [array, setArray] = useState(['a','b','c','d','e',
    'f','g','h','i','j',
    'k','l','m','n','o',
    'p','q','r','s','t',
    'u','v','w','x','y','z'
])
 const [num1, setNum1] = useState(Math.ceil(Math.random()*9))
 const [num2, setNum2] = useState(Math.ceil(Math.random()*9))
 const [num3, setNum3] = useState(Math.ceil(Math.random()*9))
 const [num4, setNum4] = useState(Math.floor(Math.random()*26))
 const [num5, setNum5] = useState(Math.floor(Math.random()*26))
 const [num6, setNum6] = useState(Math.floor(Math.random()*26))
 const [code ,setCode] = useState([array[num4],num1,array[num5],num2,array[num6],num3])
 const [account, setAccount] = useState({
    title:""
    })
    function AddList(){
        setAdd(true)
        let Code = code.join('')
        console.log(Code)
        window.localStorage.setItem('GameRoom', Code)
        let player = window.localStorage.getItem('uid')
        const usersRef = ref(rdb, `${Code}`)
        const AddList = push(usersRef)
        set(AddList,{
           user: account.title,
           id: player
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
                router.push('/Host')
            }
         }).catch((error)=>{ 
            console.error(error)
        
        })    
    }
  
    useEffect(()=>{
        window.localStorage.setItem('host', 'Host' )
        setCode(prevChange => prevChange.sort((a,b)=>Math.random()-0.5))
    },[])

return(
    <div className="center column" style={{height:"100vh"}}>       
       <div>
            <div className="double center">{user} { user && <button onClick={AddList} className="green" style={{fontSize:"20px",margin:"10px",fontWeight:"bold",padding:"8px",borderRadius:"18px"}} >Ready</button>}</div>
            <br></br>
            <div>
            <input placeholder="Name" value={account.title} type='text' onChange = {(e) => setAccount({...account, title: e.target.value})} ></input>
                <button onClick={()=>{setUser(account.title)}} >Enter</button>
            </div>    
        </div>
    </div>
)


}


export default App;