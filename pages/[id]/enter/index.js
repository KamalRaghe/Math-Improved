import Link from "next/link"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { doc, getDoc } from "firebase/firestore"
import { db } from "@/firebase"

export default function Home() {
    const router = useRouter()
    const {username} = router.query 
    const {id} = router.query  
  return (
    <div className="center double container beige">
       <Link href={"/"}>Go back</Link>
    </div>
  )
}
