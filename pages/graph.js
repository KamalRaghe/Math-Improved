import React from 'react';
import dynamic from 'next/dynamic';

// Dynamically import Plotly to prevent SSR issues
const Plotly = dynamic(() => import('react-plotly.js'), { ssr: false });

const PlotlyGraph = () => {
    const data = [
        {
            x: [2, 4], // Quadrant I
            y: [3, 5],
            mode: 'markers',
            hoverinfo: 'none', // Disable hover info
            type: 'scatter',
            marker: { color: 'rgba(75, 192, 192, 0.6)', size: 10 },
        },
        {
            x: [-2, -4], // Quadrant II
            y: [3, 5],
            mode: 'markers',
            hoverinfo: 'none', // Disable hover info
            type: 'scatter',
            marker: { color: 'rgba(255, 99, 132, 0.6)', size: 10 },
        },
        {
            x: [-2, -4], // Quadrant III
            y: [-3, -5],
            mode: 'markers',
            hoverinfo: 'none', // Disable hover info
            type: 'scatter',
            marker: { color: 'rgba(153, 102, 255, 0.6)', size: 10 },
        },
        {
            x: [2, 4], // Quadrant IV
            y: [-3, -5],
            mode: 'markers',
            hoverinfo: 'none', // Disable hover info
            type: 'scatter',
            marker: { color: 'rgba(255, 206, 86, 0.6)', size: 10 },
        },
        {
            x: [0,0,0,0,0,0,0,0,0,0,0,0], // Yaxis
            y: [-3, -5,-4,-2,-1,0,1,2,3,4,5],
            mode: 'markers',
            hoverinfo: 'none', // Disable hover info
            type: 'scatter',
            marker: { color: 'rgba(0, 0, 0, 1', size: 10 },
        },
        {
            y: [0,0,0,0,0,0,0,0,0,0,0,0], // Xaxis
            x: [-3, -5,-4,-3,-2,-1,0,1,2,3,4,5],
            mode: 'markers',
            hoverinfo: 'none', // Disable hover info
            type: 'scatter',
            marker: { color: 'rgba(0, 0, 0, 1', size: 10 },
        },
    ];

    const layout = {
        xaxis: {
            title: 'X-Axis',
            zeroline: true,
            showgrid: true,
            range: [-6, 6], // Set X-axis range
            dtick: 1, // Add more grid lines (spacing of 1 unit)
            titlefont: { size: 16, color: 'black' },
        },
        yaxis: {
            title: 'Y-Axis',
            zeroline: true,
            showgrid: true,
            range: [-6, 6], // Set Y-axis range
            dtick: 1, // Add more grid lines (spacing of 1 unit)
            titlefont: { size: 16, color: 'black' },
        },
        showlegend: false, // Disable legend
        hovermode: false, // Disable hover mode
    };

    const handleClick = (event) => {
        if (event.points && event.points.length > 0) {
            const point = event.points[0];
            console.log(`Clicked Point: x=${point.x}, y=${point.y}`);
        }
    };

    return (
        <Plotly
            data={data}
            layout={layout}
            onClick={handleClick} // Handle point click
            style={{ width: '80vh', height: '80vh' }}
            useResizeHandler={true} // Make the graph responsive
        />
    );
};

export default PlotlyGraph;