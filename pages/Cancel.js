import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { addDoc, collection, onSnapshot} from "firebase/firestore"
import { initFirebase } from "@/firebase"
import { getFirestore } from "firebase/firestore"
import { getFunctions, httpsCallable } from "firebase/functions"
import { db , auth} from "../firebase"
export default function Home() {
    const [Data, setData] = useState(false)
    const router = useRouter()

  
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
        };
  
      useEffect(()=>{
        getPortalUrl()
        getPortalUrl()
      },[])
      return(
        <div className='container double center'>
            <div className="rotate center" style={{border:"20px solid black",width:'200px',height:'200px',borderRadius:"50%",borderRight:"20px solid grey"}} >
            </div>
        </div>
      )

}
