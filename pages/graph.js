import { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const GraphWithGrid = () => {
  const [values, setValues] = useState([0, 10, 20, 30, 40]);
  const [inputValue, setInputValue] = useState("");

  const addValue = () => {
    const parsedValue = parseFloat(inputValue);
    if (!isNaN(parsedValue)) {
      setValues([...values, parsedValue]);
      setInputValue("");
    }
  };

  const data = {
    labels: values.map((_, index) => `Point ${index + 1}`),
    datasets: [
      {
        label: 'Values',
        data: values,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
    },
    scales: {
      x: {
        grid: {
          display: true,
        },
      },
      y: {
        grid: {
          display: true,
        },
      },
    },
  };

  return (
    <div style={{ width: '600px', margin: '0 auto' }}>
      <Line data={data} options={options} />
      <div style={{ marginTop: '20px' }}>
        <input
          type="number"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter a value"
        />
        <button onClick={addValue}>Add Value</button>
      </div>
    </div>
  );
};

export default GraphWithGrid;