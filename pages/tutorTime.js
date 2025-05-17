import TomorrowSchedule from "@/components/tutorTime";
import { useState } from "react";
export default function Schedule() {
    return (
      <div className="p-6">
        {days.map(day =>{
            <TomorrowSchedule day={day} ></TomorrowSchedule>
        })}
      </div>
    );
  }
