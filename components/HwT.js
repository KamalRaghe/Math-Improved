import { db } from "@/firebase"
import { addDoc, collection, updateDoc,setDoc, doc, getDocs } from "firebase/firestore"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

export default function TWH({close}){
    const router = useRouter()
    const [post, setPost] = useState()
    const [check, setCheck] = useState(false)
    const [value, setValue] = useState(2);
    const [fade1,setFade1] = useState(1)
    const [fade2,setFade2] = useState(0.6)
    const [help, setHelp] = useState(true) 

    function on(){
        setFade1(1)
        setFade2(0.6)
        setHelp(true)
    }

     function off(){
        setFade2(1)
        setFade1(0.6)
        setHelp(false)
    }
     const increase = () => {
    setValue((prev) => prev + 1);
  };

  const decrease = () => {
    setValue((prev) => (prev - 1 >= 0 ? prev - 1 : 0));
  };

  const [custom, SetCustom] =  useState('just try again')
 
  async function NewFeedback(){
    const snapshot = await getDocs(collection(db, "11AFeedback"));

    // snapshot.forEach(async (docSnap) => {
    // await updateDoc(docSnap.ref, {
    //     active: 'it workes'  });
    // });
    const name = window.localStorage.getItem('Name')
    console.log(name)
  try {
    await setDoc(doc(db, "11AFeedback", custom), {
      person: value
    });

    console.log("created with id:", custom);
    close();

  } catch (err) {
    console.log(err);
  }
}
    

    return(
        <div className="center zoom" style={{zIndex:"200",width:"100%",height:"100%",position:"fixed",right:"0px"}} >
            <div className=" column center" style={{borderRadius:"20px",padding:"20px",border:'2px solid brown',backgroundColor:"beige"}}>
                 <div className='cancel' style={{width:"100%"}} >
                 <button className='cancel-btn' style={{fontSize:"25px",margin:"0px",position:"relative",left:"6px",bottom:"10px",alignItems:"end",zIndex:"100"}}  onClick={()=>close()}>X</button>
                </div>
                <div className="center">
                        <div style={{margin:'0px 10px'}} >Homework:</div>
                        <button
                        onClick={decrease}
                        style={{
                            padding: "2px 4px",
                            color:"white",
                            backgroundColor: "green",
                            borderRadius: "8px",
                            border: "none",
                            cursor: "pointer",
                            fontSize: "18px",
                        }}
                        >
                        ←
                    </button>
                    <input
                        type="number"
                        value={value}
                        onChange={(e) => setValue(Number(e.target.value))}
                        style={{
                        width: "40px",
                        textAlign: "center",
                        justifyContent:"center",
                        padding: "8px",
                        fontSize: "16px",
                        borderRadius: "6px",
                        border: "1px solid #ccc",
                        }}
      />
                    <button
                    onClick={increase}
                        style={{
                            padding: "2px 4px",
                            color:"white",
                            backgroundColor: "green",
                            borderRadius: "8px",
                            border: "none",
                            cursor: "pointer",
                            fontSize: "18px",
                        }}
                        >
                        →
                    </button>
                </div>
                <div className="center" >
                     Help: 
                     <button className="help" 
                     style={{margin:"20px 10px 20px 35px",opacity:fade1}}
                     onClick={()=>{on();NewFeedback()}} >On</button>
                     <button className="help green" style={{opacity:fade2}}
                     onClick={off}>Off</button>
                </div>
            </div>
        </div>
    )
    
   
}