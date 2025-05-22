import React, { useState, useEffect } from 'react';

export default function Confirm() {
    const [formattedDate, setFormattedDate] = useState("");

    useEffect(() => {
        const storedDate = window.localStorage.getItem('tutorTime');
        if (storedDate) {
            const date = new Date(storedDate);
            const options = {
                weekday: 'short',
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
            };
            const formatted = date.toLocaleString(undefined, options);
            setFormattedDate(formatted);
        }
    }, []);

    return (
        <div className='center column' style={{height:"100vh"}}>
            <h2>{formattedDate || "Loading date..."}</h2>
            <div>
                <button>No</button>
                <button>Yes</button>
            </div>
        </div>
    );
}