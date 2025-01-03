import { useEffect, useState } from "react";
import { rdb } from "@/firebase";
import { get, ref, push, set, onChildAdded , remove} from "firebase/database";
import { useRouter } from "next/router";



function App() {
 const [time, setTime] = useState(1)
 const [user, setUser] = useState()
 const [topic, setTopic] = useState('Single digit addition')
 const router = useRouter()

    function Timer(){
        let room = window.localStorage.getItem('GameRoom')
        const usersRef = ref(rdb, `${room}/`+'time')
        const AddList = push(usersRef)
        set(AddList,{
            time: time*60000 + 3000 + Date.now(),
            topic: topic
        })
       
    }

    function pick(){
        let topic = window.localStorage.getItem('Topic')
        if(topic){
            setTopic(topic)
        }
    }

    function Leave(){
        let room = window.localStorage.getItem('GameRoom')
        const usersRef = ref(rdb, `${room}/`+'cancel')
        const AddList = push(usersRef)
        set(AddList,{
            time: 63000 + Date.now()
        }).then(remove(ref(rdb, `${room}/`)))  
        
             
    }

    useEffect(()=>{
        pick()
        let room = window.localStorage.getItem('GameRoom')
        setUser(room)
        if(!room){
            router.push('/create')
        }
        const roomRef = ref(rdb, `${room}/`+'cancel')
        onChildAdded(roomRef,()=>{
            router.push('/login')
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
            {time === 1 ? <div className="center" style={{fontSize:"20px",cursor:"pointer",padding:"2px 8px",border:"2px solid black"}} onClick = {(e) => setTime(3)} >
                1 min
            </div>:<div className="center" style={{fontSize:"20px",cursor:"pointer",padding:"2px 8px"}} onClick = {(e) => setTime(1)} >
                1 min
            </div>}
            {time === 2 ? <div className="center" style={{fontSize:"20px",cursor:"pointer",padding:"2px 8px",border:"2px solid black"}} onClick = {(e) => setTime(3)} >
                2 mins
            </div>:<div className="center" style={{fontSize:"20px",cursor:"pointer",padding:"2px 8px"}} onClick = {(e) => setTime(2)} >
                2 mins
            </div>}
           {time === 3 ? <div className="center" style={{fontSize:"20px",cursor:"pointer",padding:"2px 8px",border:"2px solid black"}} onClick = {(e) => setTime(3)} >
                3 mins
            </div>:<div className="center" style={{fontSize:"20px",cursor:"pointer",padding:"2px 8px"}} onClick = {(e) => setTime(3)} >
                3 mins
            </div>}
            {time === 4 ? <div className="center" style={{fontSize:"20px",cursor:"pointer",padding:"2px 8px",border:"2px solid black"}} onClick = {(e) => setTime(3)} >
                4 mins
            </div>:<div className="center" style={{fontSize:"20px",cursor:"pointer",padding:"2px 8px"}} onClick = {(e) => setTime(4)} >
                4 mins
            </div>}
            {time === 5 ? <div className="center" style={{fontSize:"20px",cursor:"pointer",padding:"2px 8px",border:"2px solid black"}} onClick = {(e) => setTime(3)} >
                5 mins
            </div>:<div className="center" style={{fontSize:"20px",cursor:"pointer",padding:"2px 8px"}} onClick = {(e) => setTime(5)} >
                5 mins
            </div>}
        </div>  
        </div>
        <br></br>
        <br></br>
        <div><button className="sub-topic" style={{margin:"2px"}} onClick={()=>{router.push('/GameMenu')}} >{topic}</button></div>
        <div className="double" style={{width:"340px",height:"10%",display:"flex",justifyContent:"space-between",alignItems:"end",}}>
            <button  onClick={Leave} className="topic red" style={{fontSize:"20px",margin:"10px",fontWeight:"bold",padding:"8px 20px"}}>Leave</button>
            <button onClick={() => router.push('/GameMenu')}  className="topic" style={{fontSize:"20px",margin:"10px",fontWeight:"bold",borderColor:"red",padding:"8px 20px",backgroundColor:'grey'}}>Topic</button>
        </div>       
        <button onClick={Timer} className="topic green" style={{fontSize:"20px",margin:"10px",fontWeight:"bold",padding:"8px 20px"}} >Start</button>        
    </div>
)


}


export default App;