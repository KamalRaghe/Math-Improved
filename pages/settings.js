
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { initFirebase } from "@/firebase"
import { db , auth} from "../firebase"
import { getFunctions, httpsCallable } from "firebase/functions";
import FeedBack from "@/components/feedback";

export default function Home() {
  const [Data, setData] = useState(false)
  const [id, setId] = useState(false)
  const [check, setCheck] = useState(false)
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
        setName(account.title) 
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
          router.push(data.url)
          console.log('cancel')
        } catch (error) {
        }
      };    
 

      useEffect(()=>{
        setId(window.localStorage.getItem('ID'))
        setName(window.localStorage.getItem(`${id} username`))
      })

  return (
<div className="center column beige">
{check && <FeedBack close={()=>{setCheck(false)}} />}
{!name && <div className="center" style={{width:"300px"}}> 
  <input placeholder = 'Enter Name' value={account.title} type='text' onChange = {(e) => setAccount({...account, title: e.target.value})}>
  </input><button onClick={handleSubmit} >Enter</button> </div>}
{name && <div className="center">
  {edit? <div className="center" style={{width:"300px"}}>
  <input placeholder= {name && name} value={account.title} type='text' onChange = {(e) => setAccount({...account, title: e.target.value})}>
  </input><button onClick={handleSubmit} >Enter</button> </div>:
  <div className="center sb" style={{fontSize:"30px",width:"300px"}}>{name && name} 
  <button className="help" style={{backgroundColor:"cyan",fontWeight:"bold"}} onClick={()=>setEdit(true)} >Change</button> </div>}
  </div>}
  <button className="sub-topic" onClick={()=>{setCheck(true)}} style={{margin:"0px", position:'relative',top:"23px"}} >Feedback</button>
  <button className="topic relative" style={{top:'20px',backgroundColor:"red",marginBottom:"30px",width:"100px"}} onClick={getPortalUrl} >Cancel</button> 
  <button  style={{margin:"20px"}}  onClick={SignOut} >SignOut</button>
  </div>
  )
}
