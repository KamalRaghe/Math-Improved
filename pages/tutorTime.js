import TomorrowSchedule from "@/components/tutorTime";

export default function Schedule() {
    return (
      <div className="p-6">
        <TomorrowSchedule day={1}></TomorrowSchedule>
        <TomorrowSchedule day={2}></TomorrowSchedule>
      </div>
    );
  }
