import React from 'react';
import { Scatter } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend);

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
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: '4-Quadrant Graph',
            },
        },
        scales: {
            x: {
                beginAtZero: false,
                grid: {
                    drawBorder: true,
                },
                ticks: {
                    font: {
                        weight: 'bolder', // Makes x-axis labels bold
                    },
                },
            },
            y: {
                beginAtZero: false,
                grid: {
                    drawBorder: true,
                },
                ticks: {
                    font: {
                        weight: 'bolder', // Makes y-axis labels bold
                    },
                },
            },
        },
    };

    return <Scatter onClick={()=>{console.log('sIVGweyi')}} style={{backgroundColor:"beige",color:"black",fontWeight:"bold"}} data={data} options={options} />;
};

export default Graph;