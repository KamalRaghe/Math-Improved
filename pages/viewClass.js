import { useEffect, useState } from "react"
import { getDocs, collection } from "firebase/firestore"
import { db } from "@/firebase"
import { useRouter } from "next/router"

export default function View(){
     async function saveName(){
        const querySnapshot = await getDocs(collection(db, n));
        setData(querySnapshot)
        console.log('cwi')
        querySnapshot.forEach((doc) => {
            console.log(doc.id, doc.data());
        });
    }
}