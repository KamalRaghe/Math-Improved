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

const InteractiveGraph = () => {
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
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                enabled: true,
            },
        },
        scales: {
            x: {
                beginAtZero: false,
                ticks: {
                    font: {
                        weight: 'bold',
                    },
                },
            },
            y: {
                beginAtZero: false,
                ticks: {
                    font: {
                        weight: 'bold',
                    },
                },
            },
        },
        onClick: (event, elements) => {
            if (elements.length > 0) {
                const datasetIndex = elements[0].datasetIndex;
                const index = elements[0].index;
                const point = data.datasets[datasetIndex].data[index];
                console.log(`Clicked Point: x=${point.x}, y=${point.y}`);
            }
        },
    };

    return <Scatter data={data} options={options} />;
};

export default InteractiveGraph;