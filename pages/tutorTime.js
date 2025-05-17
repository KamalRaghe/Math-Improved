import React, { useState } from 'react';

const timeZones = [
  'UTC',
  'America/New_York',
  'Europe/London',
  'Asia/Dubai',
  'Asia/Tokyo',
  'Africa/Mogadishu',
];

export default function TimeZoneSchedule() {
  const [selectedZone, setSelectedZone] = useState('UTC');
  const hours = Array.from({ length: 8 }, (_, i) => i + 10); // 10AM to 5PM

  const handleClick = (hour) => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(hour, 0, 0, 0);

    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: selectedZone,
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      timeZoneName: 'short',
    });

    console.log(`Selected Time in ${selectedZone}:`, formatter.format(tomorrow));
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">Tomorrow's Schedule in Time Zone</h2>

      <div className="mb-4">
        <label className="block mb-2 font-medium">Select Time Zone:</label>
        <select
          value={selectedZone}
          onChange={(e) => setSelectedZone(e.target.value)}
          className="w-full p-2 border rounded"
        >
          {timeZones.map((zone) => (
            <option key={zone} value={zone}>
              {zone}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {hours.map((hour) => {
          const date = new Date();
          date.setDate(date.getDate() + 1);
          date.setHours(hour, 0, 0, 0);

          const timeStr = new Intl.DateTimeFormat('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            timeZone: selectedZone,
          }).format(date);

          return (
            <button
              key={hour}
              onClick={() => handleClick(hour)}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              {timeStr}
            </button>
          );
        })}
      </div>
    </div>
  );
}