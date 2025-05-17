import TomorrowSchedule from "@/components/tutorTime";
import { useState } from "react";

const [days,setDays] = useState([1,2,3,4,5,6])
export default function Schedule() {
    return (
      <div className="p-6">
        <TomorrowSchedule day={1}></TomorrowSchedule>
        <TomorrowSchedule day={2}></TomorrowSchedule>
      </div>
    );
  }
