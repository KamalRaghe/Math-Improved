import TomorrowSchedule from "@/components/tutorTime";
import { useState } from "react";
export default function Schedule() {
    const [days,setDays] = useState([1,2,3,4,5,6])
    return (
      <div className="p-6">
        {days.map(day =>{
            <TomorrowSchedule day={day} ></TomorrowSchedule>
        })}
      </div>
    );
  }
