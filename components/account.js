import Link from "next/link";
import { useState, useEffect } from "react";
import {db} from '../firebase';
import { addDoc, arrayUnion, collection, onSnapshot, updateDoc,doc, count} from "firebase/firestore";
import { auth } from "../firebase";

export async function getServerSideProps(context){
    const id = context.query.id
    const docRef = doc(db, 'account', id);
    const docSnap = await getDoc(docRef);
    const data = docSnap.data();
    const Data = {
        Account: data?.Account
    }
    return{
        props: {
            Count: Data,
        }
    }
}

export default function Account({Count}){
   
    const [Account, SetAccounts] = useState([])
    const [account, setAccount] = useState({
    title:""
    })

   
  

    async function handleSubmit(){
        const docRef = await addDoc(collection(db, "accounts"), {
            title: [account.title],
            Game: false,
            count: 0,
        })
        SetAccounts([{title:account.title, id: docRef.id}])
        setAccount({title:""})
    }
    
    async function Update(){
        const docRef2 = await updateDoc(doc(db, "accounts",'11fwmtrPmQRWJVvx8Noe'), {
            title: account.title
        })
        setAccount({title:""})
    }

    useEffect(() =>{

    },[Account])

    useEffect(() => {
         const unsubscribe = onSnapshot(collection(db, "accounts"), (snap) =>{
           
            SetAccounts(snap.docs.map(doc => {
                return{
                    id: doc.id,
                    title: doc.data().title 
                }
            }))
        })
        return unsubscribe
    }, [])


    return( 
    <div className="column center" >
        <h1 className="center">{Account.map(acc => {
            return <div className="no-link" key = {acc.id}><Link href={`/${acc.id}/${acc.title}/math`}><div>{acc.title}</div></Link></div>
        })}</h1>

     <div className=" column">{}
            <input placeholder="Create account" value={account.title} type='text' onChange = {(e) => setAccount({...account, title: e.target.value})}></input>
            <button onClick={() => handleSubmit()}>Enter</button>
        </div> 
    </div>
)}