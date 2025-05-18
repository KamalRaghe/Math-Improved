import TomorrowSchedule from "@/components/tutorTime";
import { useState } from "react";
export default function Schedule() {
    const [days,setDays] = useState([1,2,3,4,5,6])
    return (
      <div>
        {days.map(day =>{
          return  <TomorrowSchedule day={day} ></TomorrowSchedule>
        })}
      </div>
    );
  }
