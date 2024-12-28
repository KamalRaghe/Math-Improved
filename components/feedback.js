import { db } from "@/firebase"
import { addDoc, collection } from "firebase/firestore"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

export default function FeedBack(){
    const router = useRouter()
    const [post, setPost] = useState({hello:"hello"})
    const [check, setCheck] = useState(false)

    function NewFeedback(){
        addDoc(collection(db, 'feedback'),post)
    }

    useEffect(()=>{
        NewFeedback()
    },[])
    
    return(
        <div className="center zoom" style={{backgroundColor:"beige",zIndex:"200",width:"100%",height:"100%",position:"absolute"}} >
            <div className=" column center" style={{borderRadius:"20px",padding:"20px",border:'2px solid brown',backgroundColor:"beige"}}>
                 <textarea placeholder="Feedback"></textarea>
                 <br></br>
                 <button onClick={()=>{setCheck(!check)}}>Submit</button>
            </div>
        </div>
    )
    
   
}