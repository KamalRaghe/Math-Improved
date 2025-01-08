import React from 'react';
import Plot from 'react-plotly.js';

const PlotlyGraph = () => {
    const data = [
        {
            x: [2, 4], // Quadrant I
            y: [3, 5],
            mode: 'markers',
            type: 'scatter',
            name: 'Quadrant I',
            marker: { color: 'rgba(75, 192, 192, 0.6)', size: 10 },
        },
        {
            x: [-2, -4], // Quadrant II
            y: [3, 5],
            mode: 'markers',
            type: 'scatter',
            name: 'Quadrant II',
            marker: { color: 'rgba(255, 99, 132, 0.6)', size: 10 },
        },
        {
            x: [-2, -4], // Quadrant III
            y: [-3, -5],
            mode: 'markers',
            type: 'scatter',
            name: 'Quadrant III',
            marker: { color: 'rgba(153, 102, 255, 0.6)', size: 10 },
        },
        {
            x: [2, 4], // Quadrant IV
            y: [-3, -5],
            mode: 'markers',
            type: 'scatter',
            name: 'Quadrant IV',
            marker: { color: 'rgba(255, 206, 86, 0.6)', size: 10 },
        },
    ];

    const layout = {
        title: '4-Quadrant Graph',
        xaxis: {
            title: 'X-Axis',
            zeroline: true,
            showgrid: true,
            titlefont: { size: 16, color: 'black' },
        },
        yaxis: {
            title: 'Y-Axis',
            zeroline: true,
            showgrid: true,
            titlefont: { size: 16, color: 'black' },
        },
        showlegend: true,
        hovermode: 'closest',
    };

    const handleClick = (event) => {
        if (event.points && event.points.length > 0) {
            const point = event.points[0];
            console.log(`Clicked Point: x=${point.x}, y=${point.y}`);
        }
    };

    return (
        <Plot
            data={data}
            layout={layout}
            onClick={handleClick} // Handle point click
            style={{ width: '100%', height: '100%' }}
        />
    );
};

export default PlotlyGraph;