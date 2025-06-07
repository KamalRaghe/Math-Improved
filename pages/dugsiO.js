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
          price: 'price_1OtfM3DlcBixp6qNRoKw4xAD', // change this
          success_url: window.location.origin,
          cancel_url: window.location.origin,
        });
          const unsubscribe = onSnapshot(docRef, (snap) => {
            const { error, url } = snap.data() || {};
            if (error) {
              unsubscribe(); 
            }
            if (url) {
              unsubscribe(); 
              router.push(url);
            }
          });
      };
      return(
        <div className='container double center'>
            <div>
              Loading...
            </div>
        </div>
      )

}
