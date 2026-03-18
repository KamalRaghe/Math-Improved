import { db } from "@/firebase"
import { addDoc, collection } from "firebase/firestore"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

export default function Class({close}){
    const router = useRouter()
    const [post, setPost] = useState()
    const [check, setCheck] = useState(false)

  async function NewFeedback() {
  try {
    const docRef = await addDoc(collection(db, "11AFeedback"), { person: post });
    if(docRef.id){
        console.log(docRef.id)
        close()
    }
    
  } catch (error) {
    console.error("Error adding feedback:", error);
  }
}
    
    return(
        <div className="center zoom" style={{zIndex:"200",width:"100%",height:"100%",position:"fixed",right:"0px"}} >
            <div className=" column center" style={{borderRadius:"20px",padding:"20px",border:'2px solid brown',backgroundColor:"beige"}}>
               <button className="choice help" style={{color:"black"}} >Manage Class</button>
            </div>
        </div>
    )
    
   
}