import { useState ,useEffect, use } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import FeedBack from "@/components/feedback"
import Sign2 from "@/components/SignUp2";
import AboutUs from "@/components/AboutUS";
export default function Math(){
    const [count, setCount] = useState(0)
    const [loaded, setLoaded] = useState(true)
    const [check, setCheck] = useState(false)
    const [check2, setCheck2] = useState(false)
    const [about, setAbout] = useState(false)
    const [none, setNone] = useState('')
    const [flex, setFlex] = useState('flex')
    const router = useRouter() 
    const {id} = router.query 

    function close(){
        if(count){
            setCount(false)
        }
    }

    useEffect(()=>{
        const score = parseInt(window.localStorage.getItem(`${id} score`))
        setCheck2(score > 100)
        if(score > 100){
            setNone('none')
        }
        let main =  window.localStorage.getItem('uid')
        let me =  window.localStorage.getItem('tag')
        if(main){
            router.push('/login')
        }if(!(me === 'Kamal')){
            router.push('https://mathimprove.com/')
        }
    },[])

    return (
        <div className="beige center column " style={{padding:"20px",paddingBottom:"50px"}}>
            <img className="FrontPage" src={"/intro.jpeg"} ></img>
            <div><button className="sub-topic" onClick={()=>{router.push('/Trial')}} >Start</button></div>
        </div>     
    )
 } 