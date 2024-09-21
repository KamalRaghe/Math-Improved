import { useEffect, useState } from "react";
import { rdb } from "@/firebase";
import { get, ref, push, set, onChildAdded } from "firebase/database";
import { useRouter } from "next/router";
import Menu from "@/components/GameMenu";


function App() {
 const [time, setTime] = useState(1)
 const [user, setUser] = useState()
 const [add, setAdd] = useState(false)
 const [Choice, setChoice] = useState(false)
 const [topic, setTopic] = useState('Single digit Addition')
 const router = useRouter()
 const [account, setAccount] = useState({
    title:""
    })

    function Timer(){
        let room = window.localStorage.getItem('GameRoom')
        const usersRef = ref(rdb, `${room}/`+'time')
        const AddList = push(usersRef)
        set(AddList,{
            time: time*60000 + 3000 + Date.now(),
            topic: topic
        })
       
    }
   

    useEffect(()=>{
        let room = window.localStorage.getItem('GameRoom')
        setUser(room)
        if(!room){
            router.push('/create')
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
        <div className="center sb" style={{fontSize:"30px",width:"340px",height:"25%",alignItems:"start"}}>
         <div>Code:<span style={{padding:"1.5px"}} >{user}</span></div>
         <div className="center column" style={{position:'relative',top: '0.5px'}} >
            Time
            <div className="center" style={{fontSize:"20px"}}>
                <input name='time' value={time} type='radio' onClick = {(e) => setTime(1)}/>1 min
            </div>
            <div className="center" style={{fontSize:"20px"}}>
                <input name='time' value={time} type='radio' onClick = {(e) => setTime(2)}/>2 min
            </div>
            <div className="center" style={{fontSize:"20px"}}>
                <input name='time' value={time} type='radio' onClick = {(e) => setTime(3)}/>3 min
            </div>
            <div className="center" style={{fontSize:"20px"}}>
                <input name='time' value={time} type='radio' onClick = {(e) => setTime(4)}/>4 min
            </div>
            <div className="center" style={{fontSize:"20px"}}>
                <input name='time' value={time} type='radio' onClick = {(e) => setTime(5)}/>5 min
            </div>
        </div>  
        </div>
        <br></br>{<Menu></Menu>}
        <div><button className="sub-topic" style={{margin:"2px"}} >{topic}</button></div>
        <div className="double" style={{width:"340px",height:"10%",display:"flex",alignItems:"end",}}>
            <button className="topic red" style={{fontSize:"20px",margin:"10px",fontWeight:"bold",padding:"8px 20px"}}>Leave</button>
        </div>       
        <button onClick={Timer} className="topic green" style={{fontSize:"20px",margin:"10px",fontWeight:"bold",padding:"8px 20px"}} >Start</button>        
    </div>
)


}


export default App;