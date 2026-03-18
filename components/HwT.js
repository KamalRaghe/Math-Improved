import { db } from "@/firebase"
import { setDoc, doc } from "firebase/firestore"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

export default function TWH({close,topic,url}){
    const router = useRouter()
    const [post, setPost] = useState()
    const [value, setValue] = useState(2);
    const [fade1,setFade1] = useState(1)
    const [fade2,setFade2] = useState(0.6)
    const [help, setHelp] = useState(true) 
    const [name, setName] = useState()
    const [n, setN] = useState()
    const [check, setCheck] = useState(false) 

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

  const [custom, SetCustom] =  useState('teacher')
 
  async function NewFeedback(){
  try {
    await setDoc(doc(db,name,custom), {
      amount: value,
      help: help,
      topic: topic,
      url: url
    });
    close();

  } catch (err) {
    console.log(err);
  }
}

function saveName(){
    window.localStorage.setItem('Name',n)
    setCheck(n)
    setName(n)
}

useEffect(()=>{
    const nam = window.localStorage.getItem('Name')
    if(nam){
        setCheck(true)
        setName(nam)
    }
},[])
    

    return(
        <div className="center zoom" style={{zIndex:"200",width:"100%",height:"100%",position:"fixed",right:"0px"}} >
            <div className=" column center" style={{borderRadius:"20px",padding:"20px",border:'2px solid brown',backgroundColor:"beige"}}>
                 <div className='cancel' style={{width:"100%"}} >
                 <button className='cancel-btn' style={{fontSize:"25px",margin:"0px",position:"relative",left:"6px",bottom:"10px",alignItems:"end",zIndex:"100"}}  onClick={()=>close()}>X</button>
                </div>
                 <div className="center" ><button className="sub-topic" style={{margin:"0px"}} >{topic}</button></div>   
                {!(name) && <div style={{color:"red",position:"relative", top:"7px"}} >Enter name</div>}
                { name ? <div className="center" style={{margin:"17px",width:"185px",justifyContent:"space-between"}}>
                    {name}
                    <button className="help" style={{display:"flex",backgroundColor:"cyan"}}
                    onClick={()=>setName()} >Change</button> 
                    </div>:
                     <div>
                        <input
                            onChange={(e) => setN(e.target.value)} 
                            style={{width:"140px", margin:"10px"}} placeholder="name"></input>
                        <button onClick={saveName}>Enter</button>
                    </div> }
                <div className="center">
                        <div style={{margin:'0px 25px 0px 0px'}} >Amount:</div>
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
                     onClick={()=>{on()}} >On</button>
                     <button className="help green" style={{opacity:fade2}}
                     onClick={off}>Off</button>
                </div>
                <button onClick={NewFeedback}>Assign Homework</button>

            </div>
        </div>
    )
    
   
}