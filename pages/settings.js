
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { addDoc, collection, onSnapshot, query, where, getDoc, updateDoc, doc } from "firebase/firestore"
import Link from "next/link"
import { initFirebase } from "@/firebase"
import { getFirestore } from "firebase/firestore"
import { db , auth} from "../firebase"
import { getFunctions, httpsCallable } from "firebase/functions";

export default function Home() {

  const [Data, setData] = useState(false)
  const [id, setId] = useState(false)
  const [edit, setEdit] = useState(false)
  const [name, setName] = useState(false)
  const router = useRouter() 
  const [account, setAccount] = useState({
    title:""
    })

    function SignOut(){
        auth.signOut().then(() => {router.push('/')}).catch((error) => alert(error.message))
        window.localStorage.setItem('User', '')
        window.localStorage.setItem('uid', '')
      }

    async function handleSubmit(){
        const user = window.localStorage.getItem('User') 
        setEdit(false) 
        if(account.title){
          window.localStorage.setItem(`${id} username` , account.title )
        }
          
      }

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
            resolve(Data.url)
          }
        });
      };    
 

      useEffect(()=>{
        setId(window.localStorage.getItem('ID'))
        setName(window.localStorage.getItem(`${id} username`))
      })

  return (
<div className="center column beige">
{name && <div className="center">
  {edit || !(name) ? <div className="center" style={{width:"300px"}}>
  <input placeholder= {name && name} value={account.title} type='text' onChange = {(e) => setAccount({...account, title: e.target.value})}></input><button onClick={handleSubmit} >Enter</button> </div>:
  <div className="center sb" style={{fontSize:"30px",width:"300px"}}>{name && name} 
  <button className="help" style={{backgroundColor:"cyan",fontWeight:"bold"}} onClick={()=>setEdit(true)} >Change</button> </div>}
  </div>}
  <button className="topic relative" style={{top:'20px',backgroundColor:"red",width:"100px"}} onClick={getPortalUrl} >Cancel</button> 
  <button  style={{margin:"20px"}}  onClick={SignOut} >SignOut</button>
  </div>
  )
}
