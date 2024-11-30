import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { addDoc, collection, onSnapshot} from "firebase/firestore"
import { initFirebase } from "@/firebase"
import { getFirestore } from "firebase/firestore"
import { db , auth} from "../firebase"
export default function Home() {

    const router = useRouter()

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
            }
          });
        });
      };
  
      useEffect(()=>{
        getCheckoutUrl()
      },[])
      return(
        <div className='container double center'>
            <div className="rotate center" style={{border:"20px solid black",width:'200px',height:'200px',borderRadius:"50%",borderRight:"20px solid grey"}} >

            </div>
        </div>
      )

}
