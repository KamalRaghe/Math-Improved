import React from 'react';

export default function DateTimeButton() {
  const handleClick = () => {
    const now = new Date();
    const Tom =  + 1000*60*60*24;
    console.log('today', now.toString());
    console.log("tom",Tom.toString())
  };

  return (
    <button
      onClick={handleClick}
      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
    >
      Log Date & Time
    </button>
  );
}