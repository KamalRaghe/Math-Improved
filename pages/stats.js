
import { useEffect, useState } from "react"
import { auth, db } from "@/firebase"
import { useRouter } from "next/router"
import { addDoc, collection, onSnapshot } from "firebase/firestore"
import Link from "next/link"

export default function Home() {
  const [sign, setSign] = useState(false)
  const [add, setAdd]= useState(false)

  const router = useRouter()
  function SignOut(){
    auth.signOut().then(() => {router.push('/')}).catch((error) => alert(error.message))
    window.localStorage.setItem('User', '')
  }

  const [Account, SetAccounts] = useState([])
    const [account, setAccount] = useState({
    title:""
    })

   
  

    async function handleSubmit(){
      const user = window.localStorage.getItem('User')  
      const docRef = await addDoc(collection(db, user), {
            title: account.title,
            Game: false,
            count: 0,
        })
        SetAccounts([{title:account.title, id: docRef.id}])
        setAccount({title:""})
        setAdd(true)
    }


    useEffect(()=>{
      if(add === true){
        router.reload()
      }
      setTimeout(()=>{
        setAdd(false)
      },1000)
    },[add])

    function security(id){
      window.localStorage.setItem('ID' , id)
    }

    useEffect(() => {
      const user = window.localStorage.getItem('User')
         const unsubscribe = onSnapshot(collection(db, user), (snap) =>{
           
            SetAccounts(snap.docs.map(doc => {
                return{
                    id: doc.id,
                    title: doc.data().title,
                    count: doc.data().count 
                }
            }))
        })
        return unsubscribe
    }, [])
 
  return (
    <div className="center beige column">
      <div>
        {add && <div>Adding Account...</div>}
        {!add && <h1 className="center column">{Account.map(acc => {
            return <div className="center sb" key = {acc.id}>
              {acc.count > Date.now() && <Link className="center sb" style={{width:"250px",textDecoration:'none'}} href={`/${acc.id}/${acc.title}/stats`}>
                <span style={{margin:"5px"}} >
                  <button onClick={()=>{security(acc.id)}} 
                  style={{fontSize:"30px",border:"none",backgroundColor:"beige",color:"blue",textDecoration:'underline'}}>
                    {acc.title} 
                  </button>
                </span>
              </Link>}
              {acc.count > Date.now() && <button className="relative center" style={{border:"none",fontSize:"30px",backgroundColor:"beige",color:"black",textDecoration:'none'}} >Score: {window.localStorage.getItem(`${acc.id+acc.title} score`) || 0}</button>}
            </div>
        })}</h1>}
    </div>
       <button className="relative" style={{top:"30px"}} onClick={SignOut} >SignOut</button>
   </div>
  )
}
