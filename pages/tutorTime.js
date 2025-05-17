import React from 'react';

export default function DateTimeButton() {
  const handleClick = () => {
    const now = new Date();
    const Tom = 
    console.log('today', now.toString());
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