import { db } from "@/firebase"
import { addDoc, collection } from "firebase/firestore"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { setDoc, doc } from "firebase/firestore"

export default function Done({close,mistake}){
    const router = useRouter()
    
    const [Name, setName] = useState()
    const [last, setLast] = useState()
    const [fill, setFill] = useState()
    const [check, setCheck] = useState(false)

    async function NewFeedback(){
        console.log('click')
     const name = window.localStorage.getItem('TeacherName')
     if(Name && last){
        const mistake = window.localStorage.getItem('HwMistake')
        const full = Name+last
         try {
            await setDoc(doc(db,name,full), {
            name: Name,
            last: last,
            mistake: mistake,
            state:"Done",  
            time: Date.now()
            });
            window.localStorage.setItem('HwLink', false)
            window.localStorage.setItem('HwCount',0)
            window.localStorage.setItem('HwMistake',0)
            close()
            router.push('/Trial')
        
        
        } catch (err) {
            console.log(err);
        }
        }else{
            setFill('Enter name')
        }
    }

    
    return(
        <div className="center zoom" style={{zIndex:"200",width:"100%",height:"100%",position:"fixed",right:"0px"}} >
            <div className=" column center" style={{borderRadius:"20px",padding:"20px",border:'2px solid brown',backgroundColor:"beige"}}>
                 <div className='cancel' style={{width:"100%"}} >
                </div>
                    <h2>Almost Done</h2>
                    {fill && <div style={{color:'red'}} >{fill}</div>}
                    <input placeholder="Name" onChange={(e)=>{setName(e.target.value)}} ></input>
                    <br></br>
                     <input placeholder="Last name" onChange={(e)=>{setLast(e.target.value)}} ></input>
                 <br></br>
                 <button onClick={NewFeedback}>Submit</button>
            </div>
        </div>
    )
    
   
}