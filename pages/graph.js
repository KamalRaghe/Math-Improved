import { useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";
import { evaluate } from "mathjs";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const FourQuadrantGraph = () => {
  const [equation, setEquation] = useState("x^2"); // Default equation
  const [dataPoints, setDataPoints] = useState(generateDataPoints("x^2"));

  // Generate data points based on the equation
  function generateDataPoints(eq) {
    const points = [];
    for (let x = -10; x <= 10; x += 0.1) {
      try {
        const y = evaluate(eq.replace("x", `(${x})`));
        points.push({ x, y });
      } catch (error) {
        console.error("Invalid equation", error);
        return [];
      }
    }
    return points;
  }

  // Handle form submission
  const handleGraphEquation = () => {
    const newDataPoints = generateDataPoints(equation);
    setDataPoints(newDataPoints);
  };

  // Prepare data for Chart.js
  const data = {
    datasets: [
      {
        label: `Graph of ${equation}`,
        data: dataPoints,
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        showLine: true,
        pointRadius: 0,
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        type: "linear",
        position: "bottom",
        grid: {
          display: true,
          color: "rgba(200,200,200,0.3)",
        },
        title: {
          display: true,
          text: "X-Axis",
        },
      },
      y: {
        type: "linear",
        position: "left",
        grid: {
          display: true,
          color: "rgba(200,200,200,0.3)",
        },
        title: {
          display: true,
          text: "Y-Axis",
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
    },
  };

  return (
    <div style={{ width: "800px", margin: "0 auto", textAlign: "center" }}>
      <h2>Four Quadrant Graph</h2>
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Enter equation (e.g., x^2, sin(x))"
          value={equation}
          onChange={(e) => setEquation(e.target.value)}
          style={{ marginRight: "10px", padding: "5px" }}
        />
        <button onClick={handleGraphEquation} style={{ padding: "5px 10px" }}>
          Graph Equation
        </button>
      </div>
      <Line data={data} options={options} />
    </div>
  );
};

export default FourQuadrantGraph;