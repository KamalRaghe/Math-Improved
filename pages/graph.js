import { useState } from "react";
import dynamic from "next/dynamic"; // For dynamic import
import { evaluate } from "mathjs"; // To evaluate the equation

// Dynamically import react-plotly.js with SSR disabled
const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

const FourQuadrantGraph = () => {
  const [equation, setEquation] = useState("x^2"); // Default equation
  const [range, setRange] = useState(10); // Default range for x and y axes

  // Generate points for the equation
  const generatePoints = () => {
    const xValues = [];
    const yValues = [];

    for (let x = -range; x <= range; x += 0.1) {
      try {
        const y = evaluate(equation.replaceAll("^", "**").replaceAll("x", `(${x})`));
        xValues.push(x);
        yValues.push(y);
      } catch (error) {
        console.error("Error evaluating equation:", error);
        return { xValues: [], yValues: [] };
      }
    }
    return { xValues, yValues };
  };

  const { xValues, yValues } = generatePoints();

  return (
    <div>
      <h2>Four Quadrant Graph</h2>
      <div style={{ marginBottom: "20px" }}>
        <label>
          Enter Equation (e.g., x^2, sin(x), x^3 - x):
          <input
            type="text"
            value={equation}
            onChange={(e) => setEquation(e.target.value)}
            style={{ marginLeft: "10px", width: "100px" }}
          />
        </label>
        <br />
        <label style={{ marginTop: "10px" }}>
          Set Range (+/-):
          <input
            type="number"
            value={range}
            onChange={(e) => setRange(Number(e.target.value))}
            style={{ marginLeft: "10px", width: "100px" }}
          />
        </label>
      </div>
        <Plot
    data={[
      {
        x: xValues,
        y: yValues,
        type: "scatter",
        mode: "lines",
        line: { color: "blue" },
      },
    ]}
    layout={{
      title: "Graph of the Equation",
      xaxis: {
        title: "x-axis",
        zeroline: true,
        zerolinecolor: "black",
        showgrid: true,
        gridcolor: "#ddd",
        range: [-range, range],
        dtick: range / 10, // Synchronize x-axis tick spacing
      },
      yaxis: {
        title: "y-axis",
        zeroline: true,
        zerolinecolor: "black",
        showgrid: true,
        gridcolor: "#ddd",
        scaleanchor: "x", // Ensures equal scaling
        range: [-range, range],
        dtick: range / 10, // Synchronize y-axis tick spacing
      },
      shapes: [
        {
          type: "line",
          x0: 0,
          x1: 0,
          y0: -range,
          y1: range,
          line: { color: "black", width: 2 },
        },
        {
          type: "line",
          x0: -range,
          x1: range,
          y0: 0,
          y1: 0,
          line: { color: "black", width: 2 },
        },
      ],
    }}
    style={{ width: "500px", height: "500px" }}
  />
    </div>
  );
};

export default FourQuadrantGraph;