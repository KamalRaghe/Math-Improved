import React, { useState, useEffect } from 'react';
import { ref } from "firebase/database";
import { push } from "firebase/database";
import { rdb } from "@/firebase";
import { set } from 'firebase/database';
export default function Confirm() {
    const [formattedDate, setFormattedDate] = useState("");

  function set2() {
  const day = window.localStorage.getItem('tutorTime');
  const usersRef = ref(rdb, day);
  const AddList = push(usersRef);
    set(AddList, {
    user: 'hello',
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
            <h1 className='center'>Your session is on</h1>
            <h2>{formattedDate || "Loading date..."}</h2>
        </div>
    );
}