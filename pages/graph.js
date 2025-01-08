import React from 'react';
import { Scatter } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const Graph = () => {
    const data = {
        datasets: [
            {
                label: 'Quadrant I',
                data: [{ x: 2, y: 3 }, { x: 4, y: 5 }],
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
            },
            {
                label: 'Quadrant II',
                data: [{ x: -2, y: 3 }, { x: -4, y: 5 }],
                backgroundColor: 'rgba(255, 99, 132, 0.6)',
            },
            {
                label: 'Quadrant III',
                data: [{ x: -2, y: -3 }, { x: -4, y: -5 }],
                backgroundColor: 'rgba(153, 102, 255, 0.6)',
            },
            {
                label: 'Quadrant IV',
                data: [{ x: 2, y: -3 }, { x: 4, y: -5 }],
                backgroundColor: 'rgba(255, 206, 86, 0.6)',
            },
        ],
    };

    const options = {
        responsive: true,
        scales: {
            x: {
                beginAtZero: true,
                grid: {
                    drawBorder: true,
                },
            },
            y: {
                beginAtZero: true,
                grid: {
                    drawBorder: true,
                },
            },
        },
    };

    return (
        <div>
            <h2>4-Quadrant Graph</h2>
            <Scatter data={data} options={options} />
        </div>
    );
};

export default Graph;
Use the Graph Component in a Page
In the pages directory, create a new file graph.js and use the Graph component:

javascript
Copy code
import React from 'react';
import Graph from '../components/Graph';

const GraphPage = () => {
    return (
        <div>
            <h1>4-Quadrant Graph</h1>
            <Graph />
        </div>
    );
};

export default GraphPage;