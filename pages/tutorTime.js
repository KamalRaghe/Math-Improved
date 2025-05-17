
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
        <h2 className="text-xl font-semibold mb-4">Tomorrow's Schedule (10AM - 5PM)</h2>
        <div className="grid grid-cols-2 gap-4">
          {hours.map((hour) => (
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
