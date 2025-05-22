import React, { useState, useEffect } from 'react';
import { ref } from "firebase/database";
import { push } from "firebase/database";
import { rdb } from "@/firebase";
export default function Confirm() {
    const [formattedDate, setFormattedDate] = useState("");

  function set2() {
  const day = window.localStorage.getItem('tutorTime');
  const usersRef = ref(rdb, `tutorTime`);
  const AddList = push(usersRef);
    set(AddList, {
    user: 'hello',
    day: day,
  });
}

    useEffect(() => {
        const storedDate = window.localStorage.getItem('tutorTime');
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
    }, []);

    return (
        <div className='center column' style={{height:"100vh"}}>
            <h2>{formattedDate || "Loading date..."}</h2>
            <div>
                <button className='red' >No</button>
                <span style={{padding:"10px"}} ></span>
                <button className='green' onClick={set2} >Yes</button>
            </div>
        </div>
    );
}