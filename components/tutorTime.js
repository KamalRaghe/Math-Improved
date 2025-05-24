import React, { useEffect, useState } from "react";
import { ref, get, runTransaction } from "firebase/database";
import { rdb } from "@/firebase"; // your initialized Firebase Realtime DB
import { useRouter } from "next/router";

export default function Schedule({ dayOffset }) {
  const [bookedHours, setBookedHours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const router = useRouter()

  const hours = Array.from({ length: 8 }, (_, i) => i + 10); // 10 AM to 5 PM

  // Calculate day start & end timestamps
  const getDayStartTimestamp = () => {
    const d = new Date();
    d.setDate(d.getDate() + dayOffset);
    d.setHours(0, 0, 0, 0);
    return d.getTime();
  };

  const getDayEndTimestamp = () => {
    const d = new Date();
    d.setDate(d.getDate() + dayOffset);
    d.setHours(23, 59, 59, 999);
    return d.getTime();
  };

  // Load booked slots for that day
  useEffect(() => {
    const fetchBookedSlots = async () => {
      setLoading(true);
      try {
        const dbRef = ref(rdb, "tutorTime");
        const snapshot = await get(dbRef);

        if (snapshot.exists()) {
          const data = snapshot.val();
          const start = getDayStartTimestamp();
          const end = getDayEndTimestamp();

          // Filter timestamps in this day and extract booked hours
          const booked = Object.keys(data)
            .map(Number)
            .filter((ts) => ts >= start && ts <= end)
            .map((ts) => new Date(ts).getHours());

          setBookedHours(booked);
        } else {
          setBookedHours([]);
        }
      } catch (error) {
        console.error("Error loading booked slots:", error);
      }
      setLoading(false);
    };

    fetchBookedSlots();
  }, [dayOffset]);

  // Booking function using transaction for concurrency safety
  const bookSlot = async (hour) => {
    setMessage("");
    const day = new Date();
    day.setDate(day.getDate() + dayOffset);
    day.setHours(hour, 0, 0, 0);
    const timestamp = day.getTime();

    const slotRef = ref(rdb, `tutorTime/${timestamp}`);

    try {
      const result = await runTransaction(slotRef, (currentData) => {
        if (currentData === null) {
         const formatted = day.toLocaleString(undefined, {
            weekday: 'short',   // "Mon"
            year: 'numeric',    // "2025"
            month: 'short',     // "Jun"
            day: 'numeric',     // "23"
            hour: '2-digit',    // "10 AM"
            minute: '2-digit',  // "00"
});
          return {
            user: "anonymous", // Replace with real user info if you have auth
            time: formatted
            
          };
        } else {
          return; // Abort, slot already booked
        }
      });

      if (result.committed) {
        window.localStorage.setItem('tutorTime',day)
        window.localStorage.setItem('CheckTime',timestamp)
        setMessage(`✅ You successfully booked ${hour <= 12 ? `${hour} AM` : `${hour - 12} PM`}`);
        setBookedHours((prev) => [...prev, hour]); // Update UI immediately
        router.push('/session')
      } else {
        setMessage("❌ Sorry, this time slot is already booked.");
        router.reload()
      }
    } catch (err) {
      console.error(err);
      setMessage("⚠️ Something went wrong while booking.");
      router.reload()
    }
  };

  if (loading) return <p>Loading available slots...</p>;

  return (
    <div style={{ maxWidth: 400, margin: "auto", padding: 20 }}>
      <h2>
        Schedule for{" "}
        {new Date(Date.now() + 86400000 * dayOffset).toLocaleDateString(undefined, {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </h2>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 20 }}>
        {hours
          .filter((hour) => !bookedHours.includes(hour))
          .map((hour) => (
            <button
              key={hour}
              onClick={() => bookSlot(hour)}
              style={{
                padding: "10px 0",
                backgroundColor: "#2563eb",
                color: "white",
                borderRadius: 6,
                cursor: "pointer",
              }}
            >
              {hour <= 12 ? `${hour} AM` : `${hour - 12} PM`}
            </button>
          ))}

        {bookedHours.length === hours.length && <p>No slots available for this day.</p>}
      </div>

      {message && <p style={{ marginTop: 20, fontWeight: "bold" }}>{message}</p>}
    </div>
  );
}