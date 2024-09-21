import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { set, ref } from "firebase/database";
import { rdb } from "@/firebase";


export default function DoubleAdd(){
    const [name, setName] =useState()
    const [time, setTime] = useState()
    const [start, setStart] = useState(3)
    const [date, setDate] = useState(Date.now())

    function update(){
        setDate(requestAnimationFrame(update))
      }

    function updateList(){
        let name = window.localStorage.getItem('GameName')
        let id = window.localStorage.getItem('GameId')
        let room = window.localStorage.getItem('GameRoom')
        set(ref(rdb, `${room}/` + id),{
            user: name,
            score: score
        }).then(()=>{
            router.push('/Score')
        })
    }

    
    useEffect(() =>{
        let timer = window.localStorage.getItem('Timer')
        setTime(timer)
        setTimeout(() => {
            setStart(2)
        }, 1000); 
        setTimeout(() => {
            setStart(1)
        }, 2000);
        setTimeout(() => {
            setStart()
            setLoaded(true)
            update() 
        }, 3000);
        let name = window.localStorage.getItem('GameName')
        setName(name)
    },[])

     useEffect(() =>{
        if(time - Date.now() < 0 ){
            updateList()
        }
    })

    return(
        <div className="beige container column" >
            <div className="Test sb" style={{alignItems:"end"}}><div className="double" >
                {loaded && <div><div>Score: {score}</div><div style={{fontSize:"20px"}} >{name}</div></div>}
            </div>
                <div>
                    {loaded && time-Date.now() > 60 && <span style={{fontSize:"30px",padding:"5px"}}>{Math.floor(((time-Date.now())%(1000*60*60))/60000)}m</span>}
                    {loaded && time-Date.now() > 0 && <span style={{fontSize:"30px"}}>{Math.floor(((time-Date.now())%(1000*60))/1000)}s</span>}
                </div>    
            </div>
                {<div className="countStart" >{start}</div>}
        </div>
    )
}