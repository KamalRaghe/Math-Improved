import { useState ,useEffect, use } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import FeedBack from "@/components/feedback"
import Sign2 from "@/components/SignUp2";
import AboutUs from "@/components/AboutUS";
import Head from "next/head";
import Image from "next/image";
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
    <> 
        <title>MathImprove – Fix Math Gaps Step by Step</title>
        <meta
          name="description"
          content="MathImprove helps students fix missing math skills with step-by-step explanations and guided practice."
        />
    

      {/* Your image stays */}
      <Image
        src="/Intro.jpeg"
        alt="MathImprove helping students improve math skills"
        width={400}
        height={400}
        priority
      />

      {/* REAL TEXT FOR GOOGLE */}
      <main className="center" style={{color:"black"}} >
        <h1>Unlock New Math Potential Step by Step</h1>

        <p className="border" style={{width:"200px"}} >
         MathImprove is the best place to explore new math topics at your own pace.
        Whether a student is ahead and ready to go further, or behind and needs to catch up, 
        our step-by-step approach helps every learner grow with confidence.
        </p>

        <ul>
          <li>Identify missing math fundamentals</li>
          <li>Learn concepts step by step</li>
          <li>Practice with guided explanations</li>
          <li>Study from home at your own pace</li>
        </ul>
      </main>
    </>   
    )
 } 





    
  