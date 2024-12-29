
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { addDoc, collection, onSnapshot, query, where } from "firebase/firestore"
import Link from "next/link"
import { initFirebase } from "@/firebase"
import { getFirestore } from "firebase/firestore"
import { db , auth} from "../firebase"

export default function Home() {
    const [payed, Payed] = useState(false)
    const [name, setName] = useState(false)
    const [free, setFree] = useState(false)
    const [check, setCheck] = useState(false)
    const [score, setScore] = useState(false)
    const [loaded, setLoaded] = useState(false)
    const [date, setDate] = useState(Date.now()) 
    const [id , setId] = useState(false)
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

      async function Free(){
        const num = 7*24*60*60*1000+Date.now()
        window.localStorage.setItem('userId' , num)
        window.localStorage.setItem('Check' , num + 34521)
        setCheck(num + 34521)
        setFree(num)
      }

      function update(){
        setDate(requestAnimationFrame(update))
      }


    async function getCheckoutUrl(){
        router.push('/paying');
      };
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
        const timer = window.localStorage.getItem('Timer')
        console.log(timer)
        setId(window.localStorage.getItem('uid'))
        PayedCheck()
        setLoaded(true)
        setFree(window.localStorage.getItem('userId'))
        setCheck(window.localStorage.getItem('Check'))
        update()
        const user = window.localStorage.getItem('User')
        const unsubscribe = onSnapshot(collection(db, user), (snap) =>{   
          SetAccounts(snap.docs.map(doc =>{
              return{
                  User: 'hello',
                  id: doc.id,
              }
          }))
      })
      
      return unsubscribe
      },[])

      useEffect(()=>{
        window.localStorage.setItem( 'ID', id)
      },[id])

  return (
    <div className="center beige column">
      <div className="center column" style={{alignItems:"start"}}>
        <div className="relative" style={{fontSize:"70px",top:"20px",color:'navy',padding:"0px"}} >Math</div>
        <div className="relative" style={{fontSize:"70px",color:'purple',paddingBottom:"20px"}} >Improve</div>
      </div>
      <div className="box column" >   
        {!payed && parseInt(free) === parseInt(check) - 34521 && free - Date.now() > 0 && <div className="font center" style={{fontWeight:"bold",width:"300px"}} >Free Trial: {Math.floor(((free - Date.now())%(1000*60*60*24*7))/1000/60/60/24)}d {""}{Math.floor(((free - Date.now())%(1000*60*60*24))/1000/60/60)}h {""}{Math.floor(((free - Date.now())%(1000*60*60))/1000/60)}m {""}
            {Math.floor(((free - Date.now())%(1000*60))/1000)}s
        </div>}
      </div>
        <br></br>
        <br></br>
        <br></br>
        {payed && score && <div className="center" style={{fontSize:"30px",width:"330px"}} >{name && 
        name} Score: {score}</div>}

        {!check && !free && !payed && loaded && <button className="topic" style={{backgroundColor:"yellow",color:"black",fontSize:"20px",fontWeight:"bolder",borderRadius:"20px",width:'250px', height:"40px"}} onClick={()=>{Free()}} >Start Free Trial</button>}
        {!payed && loaded && <div className="center column" ><button className="font" onClick={getCheckoutUrl} style={{color:'white',fontWeight:"bolder",borderRadius:"20px",width:'250px', height:"70px",backgroundColor:"orange"}} >
         <div>Full Access: CA$3.99</div> 
        </button>
      </div>}
      {(payed || (free - Date.now() > 0 &&  parseInt(free) === parseInt(check) - 34521)) &&
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
        {!payed && <button className="font" style={{color:'white',fontWeight:"bolder",borderRadius:"20px",width:'150px', height:"40px",margin:"10px",backgroundColor:"grey"}}  onClick={SignOut} >SignOut</button>}
      {payed && false && <div><button className="font" style={{color:'white',fontWeight:"bolder",borderRadius:"20px",width:'150px', height:"40px",backgroundColor:"blue"}}  onClick={()=>{router.push('settings'),console.log('widubc')}} >Settings</button></div>}
    </div>
  )
}
