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
        try {
          const functions = getFunctions(app, "us-central1");
          const functionRef = httpsCallable(
            functions,
            "ext-firestore-stripe-payments-jw7p-createPortalLink"
          );
          const { data } = await functionRef({
            returnUrl: window.location.origin,
          });
          setData(data)
          router.push(data.url)
          console.log('cancel')
        } catch (error) {
          console.error(error)
        }
      };    
  
      useEffect(()=>{
        getPortalUrl()
      },[])
      return(
        <div className='container double center'>
            <div style={{position:"fixed"}} >Loading...</div>
        </div>
      )

}
