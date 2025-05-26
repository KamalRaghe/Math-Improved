import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
export default function Confirm() {
    const [formattedDate, setFormattedDate] = useState("");
    const [date,setDate] = useState(Date.now())

    const router =  useRouter()

    useEffect(() => {
        const storedDate = window.localStorage.getItem('tutorTime');
        const check = window.localStorage.getItem('CheckTime');
        if (storedDate) {
            const date = new Date(storedDate);
            const formatted = date.toLocaleString(undefined, {
                weekday: 'short',
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
            });
            setFormattedDate(formatted);
        }
        if(date >= check){
            router.push('/tutorTime')
        }
    }, []);

    return (
        <div className='center column' style={{height:"100vh"}}>
            <h1 className='center'>Your session is on</h1>
            <h2>{formattedDate || "Loading date..."}</h2>
            <br></br>
            <div className="font" >Send a friend request to <span style={{fontWeight:"bold"}} >kamal#0032</span></div>
        </div>
    );
}