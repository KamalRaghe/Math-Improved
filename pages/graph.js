import dynamic from "next/dynamic";

// Dynamically load Plot component to avoid SSR issues
const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

const GridGraph = () => {
  return (
    <div>
      <Plot
        data={[
          {
            x: [-10, -5, 0, 5, 10],
            y: [-10, -5, 0, 5, 10],
            mode: "markers",
            marker: { color: "red", size: 8 },
            type: "scatter",
          },
        ]}
        layout={{
          title: "Grid Graph Example",
          xaxis: {
            title: "X Axis",
            showgrid: true,
            gridcolor: "#ccc",
            zeroline: true,
            zerolinecolor: "black",
          },
          yaxis: {
            title: "Y Axis",
            showgrid: true,
            gridcolor: "#ccc",
            zeroline: true,
            zerolinecolor: "black",
          },
          width: 700,
          height: 500,
        }}
      />
    </div>
  );
};

export default GridGraph;