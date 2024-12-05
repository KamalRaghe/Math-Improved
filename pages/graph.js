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
      
    </div>
  );
};

export default FourQuadrantGraph;