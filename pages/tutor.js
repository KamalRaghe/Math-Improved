import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ref, get } from "firebase/database";
import { rdb } from "@/firebase";

export default function TomorrowSchedule({ day }) {
  const [bookedHours, setBookedHours] = useState([]);
  const router = useRouter();

  const hours = Array.from({ length: 8 }, (_, i) => i + 10); // [10..17]

  useEffect(() => {
    const fetchBookedSlots = async () => {
      const start = new Date();
      start.setDate(start.getDate() + day);
      start.setHours(0, 0, 0, 0);
      const dayStartTimestamp = start.getTime();

      const end = new Date(start);
      end.setHours(23, 59, 59, 999);
      const dayEndTimestamp = end.getTime();

      try {
        const dbRef = ref(rdb, "tutorTime");
        const snapshot = await get(dbRef);

        if (snapshot.exists()) {
          const data = snapshot.val();
          const booked = Object.keys(data)
            .map(ts => parseInt(ts))
            .filter(ts => ts >= dayStartTimestamp && ts <= dayEndTimestamp)
            .map(ts => new Date(ts).getHours()); // extract booked hours
          setBookedHours(booked);
        }
      } catch (error) {
        console.error("Error fetching booked slots:", error);
      }
    };

    fetchBookedSlots();
  }, [day]);

  const handleClick = (hour) => {
    const date = new Date();
    date.setDate(date.getDate() + day);
    date.setHours(hour, 0, 0, 0);
    window.localStorage.setItem("tutorTime", date.toString());
    router.push("/tutor");
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">
        {new Intl.DateTimeFormat("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        }).format(new Date(Date.now() + 86400000 * day))}
      </h2>

      <div className="grid grid-cols-2 gap-4">
        {hours
          .filter(hour => !bookedHours.includes(hour)) // 🛑 hide booked
          .map(hour => (
            <button
              key={hour}
              onClick={() => handleClick(hour)}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              {hour <= 12 ? `${hour} AM` : `${hour - 12} PM`}
            </button>
          ))}
      </div>
    </div>
  );
}