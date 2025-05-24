import React, { useState, useEffect } from 'react';
import { ref } from "firebase/database";
import { push } from "firebase/database";
import { rdb } from "@/firebase";
import { set } from 'firebase/database';
import { Router } from 'express';
import { useRouter } from 'next/router';
export default function Confirm() {
    const [formattedDate, setFormattedDate] = useState("");
    
    const router =  useRouter()

   

    return (
        <div className='center column' style={{height:"100vh"}}>
            <h1 className='center'>Your session is on</h1>
            <h2>{formattedDate || "Loading date..."}</h2>
        </div>
    );
}