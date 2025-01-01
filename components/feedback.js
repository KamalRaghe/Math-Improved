import { db } from "@/firebase"
import { addDoc, collection } from "firebase/firestore"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

export default function FeedBack({close}){
    const router = useRouter()
    const [post, setPost] = useState()
    const [check, setCheck] = useState(false)

    function NewFeedback(){
        if(post){
            addDoc(collection(db, 'feedback'),{person: post}).then(
                close()
            )
            console.log(post)
        }else{
            close()
        }    
    }
    
    return(
        <div className="center zoom" style={{backgroundColor:"beige",zIndex:"200",width:"100%",height:"100%",position:"absolute"}} >
            <div className=" column center" style={{borderRadius:"20px",padding:"20px",border:'2px solid brown',backgroundColor:"beige"}}>
                 <div className='cancel' style={{width:"100%"}} >
                 <button className='cancel-btn' style={{fontSize:"25px",margin:"0px",position:"relative",left:"6px",bottom:"10px",alignItems:"end",zIndex:"100"}}  onClick={()=>close()}>X</button>
                </div>
                 <textarea placeholder="Feedback" onChange={(e)=>{setPost(e.target.value)}} ></textarea>
                 <br></br>
                 <button onClick={NewFeedback}>Submit</button>
            </div>
        </div>
    )
    
   
}