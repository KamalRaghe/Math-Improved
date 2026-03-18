import { useEffect, useState } from "react"

export default function JoinClass(){

    const [teacher,setTeacher] = useState()
    useEffect(()=>{
        const teach = window.localStorage.getItem('TeacherName')
        setTeacher(teach)
    },[])

    return(
        <div className="center">
            div
        </div>
    )
}