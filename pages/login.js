
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { addDoc, collection, onSnapshot, query, where, getDoc, updateDoc, doc } from "firebase/firestore"
import Link from "next/link"
import { initFirebase } from "@/firebase"
import { getFirestore } from "firebase/firestore"
import { db , auth} from "../firebase"

export default function Home() {
    const [payed, Payed] = useState(false)
    const [link, setLink] = useState(false)
    const [name, setName] = useState(false)
    const [free, setFree] = useState(false)
    const [score, setScore] = useState(false)
    const [loaded, setLoaded] = useState(false)
    const [id, setId] = useState(false)
    const [count, setCount] = useState(false)
    const [devices, setDevices] = useState(false)
    const [time, setTime] = useState(false)
    const [linking, setLinking] = useState(false)
    const [date, setDate] = useState(Date.now()) 
    const [Account, SetAccounts] = useState([])
    const [account, setAccount] = useState({
    title:""
    })
    const router = useRouter()

    function SignOut(){
        auth.signOut().then(() => {router.push('/')}).catch((error) => alert(error.message))
        window.localStorage.setItem('User', '')
        window.localStorage.setItem('uid', '')
      }

      async function Free(id){
        const num = Math.ceil(Math.random()*100000000000000000000)
        window.localStorage.setItem('id' , num)
        setFree(num)
        const user = window.localStorage.getItem('User')  
        const docRef = await updateDoc(doc(db, user,id), {
              time: 7*24*60*60*1000+Date.now()  
          })
          
        
          
      }

      function update(){
        setDate(requestAnimationFrame(update))
      }


    async function getCheckoutUrl(){
        router.push('/paying');
      };
  
      async function Linked(id){
        setLinking(false)
        const user = window.localStorage.getItem('User')  
        const security = window.localStorage.getItem('Id')
          const docRef = await updateDoc(doc(db, user, id), {
                count: security,
                device: 3*24*60*60*1000+Date.now()
            })
    }

      async function PayedCheck() {
        const app = initFirebase()
        const userId = window.localStorage.getItem('uid')
        const db = getFirestore(app);
        const subscriptionsRef = collection(db, "customers", userId, "subscriptions");
        const q = query(
          subscriptionsRef,
          where("status", "in", ["trialing", "active"])
        );
      
        const promise = new Promise((resolve, reject) => {
          const unsubscribe = onSnapshot(
            q,
            (snapshot) => {
      
              if (snapshot.docs.length === 0) {
                Payed(false);
              } else {
                Payed(true);
              }
              unsubscribe();
            },
            reject
          );
        });
      };

      useEffect(()=>{
        setName(window.localStorage.getItem(`${id} username`))
        setScore((window.localStorage.getItem(`${id} score`)))
      })

      useEffect(()=>{
        PayedCheck()
        setLoaded(true)
        setFree(window.localStorage.getItem('id'))
        const security = window.localStorage.getItem('Id')
        if(security){
          setLink(security)
        }else{
          const num = Math.ceil(Math.random()*100000000000000000000)
          window.localStorage.setItem('Id' , num)
          setLink(num)
        }
        update()
        const user = window.localStorage.getItem('User')
        const unsubscribe = onSnapshot(collection(db, user), (snap) =>{   
          SetAccounts(snap.docs.map(doc =>{
              return{
                  id: doc.id,
                  count: doc.data().count,
                  time: doc.data().time,
                  device: doc.data().device,
                  time: doc.data().time,
              }
          }))
      })
      return unsubscribe
      },[])

      useEffect(()=>{
        console.log(Account)
        if(Account[0]){
            setId(Account[0].id)
            window.localStorage.setItem( 'ID', Account[0].id)
            setCount(Account[0].count)
            setDevices(Account[0].device)
            setTime(Account[0].time)

        }
      },[Account])

  return (
    <div className="center beige column">
      <div className="center column" style={{alignItems:"start"}}>
        <div className="relative" style={{fontSize:"70px",top:"20px",color:'navy',padding:"0px"}} >Math</div>
        <div className="relative" style={{fontSize:"70px",color:'purple',paddingBottom:"20px"}} >Improved</div>
      </div>
      <div className="box column" >   
        {!payed && time - Date.now() > 0 && <div className="font center" style={{fontWeight:"bold",width:"300px"}} >Free Trial: {Math.floor(((time - Date.now())%(1000*60*60*24*7))/1000/60/60/24)}d {""}{Math.floor(((time - Date.now())%(1000*60*60*24))/1000/60/60)}h {""}{Math.floor(((time - Date.now())%(1000*60*60))/1000/60)}m {""}
            {Math.floor(((time - Date.now())%(1000*60))/1000)}s
        </div>}
      </div>
        <br></br>
        <br></br>
        <br></br>
        {payed && score && <div className="center" style={{fontSize:"30px",width:"330px"}} >{name && 
        name} Score: {score}</div>}
        {count !== link  && linking && !(devices > Date.now()) &&<div className="timeout center column" style={{justifyContent:"start",backgroundColor:"lightgrey",border:"10px solid navy"}} >
            <h1>Are you sure</h1>
            <div className="font" >Do you want to link account to this device</div>
            <div className="font" >for the next three days</div>
            <div className="center box sb" ><button className="help red" onClick={()=>{setLinking(false)}} >No</button>{id && <button className="help" onClick={()=>Linked(id)} >Yes</button>}</div>
        </div>}
        {count !== link  && linking && devices > Date.now() &&<div className="timeout center column" style={{backgroundColor:"lightgrey",border:"10px solid navy"}} >
        <button className="cancel-btn relative" onClick={()=>{setLinking(false)}} style={{top:"-55px",left:"160px"}} >X</button>
        <div className="font center relative" style={{fontWeight:"bold",width:"300px",top:"-50px"}} >Wait: {Math.floor(((devices - Date.now())%(1000*60*60*24*7))/1000/60/60/24)}d {""}{Math.floor(((devices - Date.now())%(1000*60*60*24))/1000/60/60)}h {""}{Math.floor(((devices - Date.now())%(1000*60*60))/1000/60)}m {""}
            {Math.floor(((devices - Date.now())%(1000*60))/1000)}s
        </div>
        </div>}
        {id && !time && !free && !payed && loaded && <button className="topic" style={{backgroundColor:"yellow",color:"black"}} onClick={()=>{Free(id)}} >Start Free Trial</button>}
        {!payed && loaded && <div className="center column" ><button className="font" onClick={getCheckoutUrl} style={{color:'white',fontWeight:"bolder",borderRadius:"20px",width:'250px', height:"70px",backgroundColor:"orange"}} >
         <div>Full Access: CA$3.99</div> 
        </button>
      </div>}
      {((payed && count === link) || time - Date.now()) > 0 &&
        <div className="box center" style={{width:'340px'}}>
        
        <button className="topic column" onClick={()=>{router.push(`/${id}/enter/stats`)}} style={{width:'150px', height:"90px"}} >
          <div className="center" style={{paddingTop:'20px',paddingBottom:"5px"}} >
            <div className="red relative" style={{marginBottom:"10px",rotate:'90deg',width:'20px',height:'10px',left:'20px',top:"4px"}} ></div>
            <div className="relative" style={{marginBottom:"10px",rotate:'90deg',width:'40px',height:'10px',backgroundColor:"cyan",top:"-5px",left:"5px"}} ></div>
            <div className="relative" style={{marginBottom:"10px",rotate:'90deg',width:'30px',height:'10px',left:"-15px",backgroundColor:"lime"}} ></div>
          </div>
          Stats
        </button>
        <button className="topic column" onClick={()=>{router.push(`/${id}/enter/math`)}} style={{width: '150px', height:"90px"}} >
          <div className="center" style={{padding:'0 20px'}}>
            <div className="relative" style={{rotate:"90deg",borderBottom:"50px solid white",borderRight:'25px solid transparent',borderLeft:'25px solid transparent'}} ></div>
          </div>
          Start
        </button>
      </div>
      }
       {payed && count !== link && time < Date.now &&
        <div className="box center" style={{width:'340px'}}>
        {!linking  && <button className="topic column" onClick={()=>{setLinking(true)}} style={{color:"black",backgroundColor:"lightgrey",fontSize:"30px",width: '150px', height:"90px"}} >
            Link
        </button>}
      </div>
      }
      {(!payed && count !== link) ? <button className="font" style={{color:'white',fontWeight:"bolder",borderRadius:"20px",width:'150px', height:"40px",margin:"10px",backgroundColor:"grey"}}  onClick={SignOut} >SignOut</button>:
      <button className="font" style={{color:'white',fontWeight:"bolder",borderRadius:"20px",width:'150px', height:"40px",backgroundColor:"grey"}}  onClick={()=>router.push('settings')} >Settings</button>}
    </div>
  )
}
