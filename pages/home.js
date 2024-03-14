
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { addDoc, collection, onSnapshot, query, where, getDoc, updateDoc, doc } from "firebase/firestore"
import Link from "next/link"
import { initFirebase } from "@/firebase"
import { getFirestore } from "firebase/firestore"
import { db , auth} from "../firebase"
import { getFunctions, httpsCallable } from "firebase/functions";

export default function Home() {
  const [sign, setSign] = useState(false)
  const [add, setAdd]= useState(false)
  const app = initFirebase()
  const [cancel, setCancel] = useState(false)
  const [color, setColor] = useState('blue')
  const [link, setLink] = useState(false)
  const [date, setDate] = useState(Date.now()) 
  const [free, setFree] = useState(false)
  const router = useRouter()
  const [payed, Payed] = useState(false)
  const [Data, setData] = useState(false)
  const [loading, setLoading] = useState(false)
  const [edit, setEdit] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [Account, SetAccounts] = useState([])
    const [account, setAccount] = useState({
    title:""
    })

    function SignOut(){
      auth.signOut().then(() => {router.push('/')}).catch((error) => alert(error.message))
      window.localStorage.setItem('User', '')
      window.localStorage.setItem('uid', '')
    }

    async function getCheckoutUrl(){
      const app = initFirebase()
      const userId = window.localStorage.getItem('uid');
    
      const db = getFirestore(app);
      const checkoutSessionRef = collection(
        db,
        "customers",
        userId,
        "checkout_sessions"
      );
    
      const docRef = await addDoc(checkoutSessionRef, {
        price: 'price_1OtfM3DlcBixp6qNRoKw4xAD',
        success_url: window.location.origin,
        cancel_url: window.location.origin,
      });
      const promise = new Promise((resolve, reject) => {
        const unsubscribe = onSnapshot(docRef, (snap) => {
          const { error, url } = snap.data() || {};
          if (error) {
            unsubscribe(); 
            reject(new Error(`An error occurred: ${error.message}`));
          }
          if (url) {
            unsubscribe(); 
            router.push(url);
            setLoading(true)
          }
        });
      });
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

    async function getPortalUrl(){
      const app = initFirebase()
      const userId = window.localStorage.getItem('uid');
        try {
          const functions = getFunctions(app, "us-central1");
          const functionRef = httpsCallable(
            functions,
            "ext-firestore-stripe-payments-jw7p-createPortalLink"
          );
          const { data } = await functionRef({
            customerId: userId,
            returnUrl: window.location.origin,
          });
          setData(data)
        } catch (error) {
        }
      
        return new Promise((resolve, reject) => {
          if (Data.url) {
            router.push(Data.url);
            setLoading(true)
            resolve(Data.url)
          }
        });
      };
    

    async function handleSubmit(){
      const user = window.localStorage.getItem('User')  
      if(account.title){
      const docRef = await addDoc(collection(db, user), {
            title: account.title,
            count: link
        })
        setAccount({title:""})
        setAdd(true)
        window.localStorage.setItem('user', true)
      }
        
    }

    async function Free(){
      const num = Math.ceil(Math.random()*100000000000000000000)
      window.localStorage.setItem('id' , num)
      setFree(num)
      const user = window.localStorage.getItem('User')  
      const docRef = await addDoc(collection(db, user), {
            title: 'Free trial',
            time: 7*24*60*60*1000+Date.now()  
        })
        
      
        
    }

    function update(){
      setDate(requestAnimationFrame(update))
    }

    async function Edit(id){
      setEdit(false)
      const user = window.localStorage.getItem('User')  
        const docRef = await updateDoc(doc(db, user, id), {
              title: account.title,
              edit: 24*60*60*1000+Date.now()
          })
          setAccount({title:""})
  }

    useEffect(()=>{
      PayedCheck()
      update()
      setLoading(false)
      setLoaded(true)
      const security = window.localStorage.getItem('Id')
      if(security){
        setLink(security)
      }else{
        const num = Math.ceil(Math.random()*100000000000000000000)
        window.localStorage.setItem('Id' , num)
        setLink(num)
      }
      setFree(window.localStorage.getItem('id'))
      const user = window.localStorage.getItem('User')
      const unsubscribe = onSnapshot(collection(db, user), (snap) =>{
           
        SetAccounts(snap.docs.map(doc => {
            return{
                id: doc.id,
                title: doc.data().title, 
                count: doc.data().count,
                time: doc.data().time,
                edit: doc.data().edit,
                link: doc.data().link, 
            }
        }))
    })
    return unsubscribe
    },[])

    useEffect(()=>{
      if(add === true){
        router.push('/home')
      }
      setTimeout(()=>{
        setAdd(false)
      },1000)
    },[add])

    function security(id){
      window.localStorage.setItem('ID' , id)
    }
 
  return (
 <div className="center beige column">
      { !loading ?  <div className="center column">
        {add && <div>Adding Account...</div>}
          {<h1 className="center column">{Account.map(acc => {
            return <div className="center sb" style={{width:"340px"}} key = {acc.id}>
              {acc.time - Date.now() > 0 && acc.title === 'Free trial' && <Link className="center sb" style={{textDecoration:'none'}} href={`/${acc.id}/enter/math`}>
                <span >
                  <button onClick={()=>{security(acc.id)}} 
                  style={{fontSize:"30px",border:"none",backgroundColor:"beige",color:'blue',textDecoration:'underline'}}>
                    {acc.title} 
                  </button>
                </span>
              </Link>}
              { acc.time - Date.now() > 0 && acc.title === 'Free trial' && <div className="font">{Math.floor(((acc.time - Date.now())%(1000*60*60*24*7))/1000/60/60/24)}d {""}{Math.floor(((acc.time - Date.now())%(1000*60*60*24))/1000/60/60)}h {""}{Math.floor(((acc.time - Date.now())%(1000*60*60))/1000/60)}m {""}
                {Math.floor(((acc.time - Date.now())%(1000*60))/1000)}s</div>}
            </div>
        })}</h1>}
      
        {!add && payed && <h1 className="center column">{Account.map(acc => {
          { acc.count === link && window.localStorage.setItem('name', acc.title)}
            return <div className="center sb" key = {acc.id}>
              { acc.count === link && <Link className="center sb" style={{width:"250px",textDecoration:'none'}} href={`/${acc.id}/enter/math`}>
                <span>
                  <button onClick={()=>{security(acc.id)}} 
                  style={{fontSize:"30px",border:"none",backgroundColor:"beige",color: color,textDecoration:'underline'}}>
                    {acc.title} 
                  </button>
                </span>
              </Link>}
              {acc.count && acc.count !== link && <Link className="center sb" style={{width:"250px",textDecoration:'none'}} href={`/home`}>
              <span>
                <button onClick={()=>{security(acc.id)}} 
                style={{fontSize:"30px",border:"none",backgroundColor:"beige",color:'grey',textDecoration:'underline'}}>
                  {acc.title} 
                </button>
              </span>
            </Link>}
              { acc.count === link && <button className="relative fonts center" onClick={()=>setEdit(true)} style={{backgroundColor:"cyan",padding:'2px 10px',borderRadius:"15px",color:"black",textDecoration:'none'}} >edit</button>}
              {acc.count && acc.count !== link && <button className="relative center" style={{border:"none",fontSize:"30px",backgroundColor:"lightgrey",padding:'2px 10px',borderRadius:"15px",color:"Grey",textDecoration:'none'}} >Link</button>}
              { acc.count && edit && Date.now() < acc.edit && <div className="timeout column center absolute" style={{border:'10px solid blue',backgroundColor:'silver',top:'120px',right:'140px'}}>
              <div className="relative center" ><button className="absolute" style={{top:'-85px',left:'130px',background:'none',border:'none',color:"black",fontSize:"50px"}} onClick={()=>{setEdit(false)}} >X</button></div>
               <div className="font">Wait: {Math.floor(((acc.edit - Date.now())%(1000*60*60*24))/1000/60/60)}h {""}{Math.floor(((acc.edit - Date.now())%(1000*60*60))/1000/60)}m {""}
                {Math.floor(((acc.edit - Date.now())%(1000*60))/1000)}s</div>
                </div>}
                { acc.count && edit && (Date.now() > acc.edit || !(acc.edit)) && <div className="timeout center absolute" style={{border:'10px solid blue',backgroundColor:'silver',top:'120px',right:'140px'}}>
              <div className="relative" ><button className="absolute" style={{top:'-95px',left:'240px',background:'none',border:'none',color:"black",fontSize:"50px"}} onClick={()=>{setEdit(false)}} >X</button></div> 
              <input placeholder={acc.title}  value={account.title} type='text' onChange = {(e) => setAccount({...account, title: e.target.value})}></input>
            <button onClick={() => Edit(acc.id)}>Enter</button>
                </div>}
            </div>
        })}</h1>}
        
        {payed && !(window.localStorage.getItem('user')) && <div className="center">
            <input placeholder="Create account" value={account.title} type='text' onChange = {(e) => setAccount({...account, title: e.target.value})}></input>
            <button onClick={() => handleSubmit()}>Enter</button>
           
        </div>
        }{Account.length === 0 && !free && <button style={{backgroundColor:"yellow",color:'black',width:"100px",height:'25px',borderRadius:"20px",margin:'10px'}} onClick={Free} >Start free trial</button>}
        {!(Account.length === 0 && !free) && !payed && <button style={{backgroundColor:"orange",color: 'white',width:"100px",height:'40px',margin:'15px',borderRadius:"20px"}} onClick={getCheckoutUrl} >CA$3.99</button>} 
        {payed && <button className="topic" style={{backgroundColor:"red",width:"100px"}} onClick={getPortalUrl} >Cancel</button>}
        {!add && loaded && <button onClick={SignOut} >SignOut</button>}
      </div> : null }
  </div>
  )
}
