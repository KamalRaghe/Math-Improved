import { useEffect, useState } from "react";
import { rdb } from "@/firebase";
import { get, ref, push, set, remove, update } from "firebase/database";
import { useRouter } from "next/router";


function App() {
 const [users, setUsers] = useState([])
 const [user, setUser] = useState()
 const [inList,setInList] = useState(false)
 const [add, setAdd] = useState(false)
 const [score, setScore] = useState()
 const router = useRouter()
 const [account, setAccount] = useState({
    title:""
    })

    // function AddList(){
    //     remove(ref(rdb, 'users/'+'test'),{
    //         title:account.title,
    //     }).then(()=>{
    //         console.log('done Added to list ')
    //     })
    // }

    function AddList(){
        const usersRef = ref(rdb, 'users/'+'time')
        const AddList = push(usersRef)
        set(AddList,{
            time: 60000
        })
       
    }

 useEffect(()=>{
 const usersRef = ref(rdb, 'users/')
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
    
    }
 }).catch((error)=>{ 
    console.error(error)

})   
},[])

return(
    <div className="center column" style={{height:"100vh"}}>
        {users.map(num =>{
            return <div className="double" key={num.id} >{num.data.user}: {num.data.score}</div>
          })}
        <br></br>
        <input placeholder="Name" value={account.title} type='text' onChange = {(e) => setAccount({...account, title: e.target.value})} ></input>
        <br></br>
        <button onClick={AddList} >Check</button>
          <br></br>
    </div>
)


}


export default App;