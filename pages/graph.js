import { useState } from "react";
import Plot from "react-plotly.js";
import { evaluate } from "mathjs"; // For parsing mathematical expressions

export default function FourQuadrantGraph(){
  const [equation, setEquation] = useState("x^2"); // Default equation
  const [range, setRange] = useState(10); // Range for x-axis

  // Function to generate graph points
  const generatePoints = () => {
    const xValues = [];
    const yValues = [];
    for (let x = -range; x <= range; x += 0.1) {
      try {
        const y = evaluate(equation.replaceAll("^", "**").replaceAll("x", `(${x})`));
        xValues.push(x);
        yValues.push(y);
      } catch (err) {
        console.error("Error evaluating equation:", err);
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
          Enter Equation (e.g., x^2, sin(x), x^3 - 4x):
          <input
            type="text"
            value={equation}
            onChange={(e) => setEquation(e.target.value)}
            style={{ marginLeft: "10px", width: "300px" }}
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
            marker: { color: "blue" },
          },
        ]}
        layout={{
          title: "Graph of the Equation",
          xaxis: { title: "x", zeroline: true },
          yaxis: { title: "y", zeroline: true },
          shapes: [
            // Add the x-axis and y-axis lines
            {
              type: "line",
              x0: -range,
              x1: range,
              y0: 0,
              y1: 0,
              line: { color: "black", width: 2 },
            },
            {
              type: "line",
              x0: 0,
              x1: 0,
              y0: -Math.pow(range, 2),
              y1: Math.pow(range, 2),
              line: { color: "black", width: 2 },
            },
          ],
        }}
        style={{ width: "100%", height: "500px" }}
      />
    </div>
  );
};