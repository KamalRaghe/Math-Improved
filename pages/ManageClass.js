import { useState } from "react"


export default function Manage(){
    const [name, setName] = useState()
    return(
        <div className="center">
            <h1>Enter Name</h1>
            <br></br>
            <input placeholder="Name" onChange={(e)=>{setName(e.target.value)}} ></input>
        </div>
    )
}