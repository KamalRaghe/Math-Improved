import TomorrowSchedule from "@/components/tutorTime";

export default function TomorrowSchedule() {
    const hours = Array.from({ length: 8 }, (_, i) => i + 10); // [10, 11, ..., 17]
  
    const handleClick = (hour) => {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(hour, 0, 0, 0);
      console.log('Scheduled Time:', tomorrow.toString());
    };
  
    return (
      <div className="p-6">
      </div>
    );
  }
