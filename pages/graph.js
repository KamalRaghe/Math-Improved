import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Wrong from '@/components/wrong';
import Correct from '@/components/correct';

// Dynamically import Plotly to prevent SSR issues
const Plotly = dynamic(() => import('react-plotly.js'), { ssr: false });

const PlotlyGraph = ({x,y}) => {
    const [xAxis,setXAxis] = useState([4,-1,2,1,-2,.5,-3,-4,-5,3])
    const [yAxis,setYAxis] = useState([-1,5,-2,-3,1,-4,5,-5,3,4])
    const [correct, setCorrect] = useState(false)
    const[ wrong, setWrong] = useState(false)
    const data = [
        {
            x: [xAxis[1],xAxis[3],xAxis[5],xAxis[7],x], // Quadrant I
            y: [yAxis[1],yAxis[3],yAxis[5],yAxis[7],y],
            mode: 'markers',
            hoverinfo: 'none', // Disable hover info
            type: 'scatter',
            marker: { color: 'navy', size: 10 },
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
            gridcolor: 'rgba(0, 0, 0, 0.5)',
            zerolinewidth: 3, // Thicker zero line
        },
        yaxis: {
            title: 'Y-Axis',
            zeroline: true,
            showgrid: true,
            range: [-6, 6], // Set Y-axis range
            dtick: 1, // Add more grid lines (spacing of 1 unit)
            titlefont: { size: 16, color: 'black' },
            gridcolor: 'rgba(0, 0, 0, 0.5)',
            zerolinewidth: 3, // Thicker zero line
        },
        showlegend: false, // Disable legend
        hovermode: 'closest', // Ensure hovermode is not false
        
    };

    const handleClick = (event) => {
        if (event.points && event.points.length > 0) {
            const point = event.points[0];
            console.log(`Clicked Point: x=${point.x}, y=${point.y}`);
            if(point.x === x && point.y === y){
                CorrectA()
            }else{
                WrongA()
            }
        }
    };

    function CorrectA(){ 
        setCorrect(true)
        setTimeout(() => {
            setCorrect(false) 
        }, 1900);
      }
      
      function WrongA(){
        setWrong(true)
            setTimeout(() => {
                setWrong(false)
            }, 1900); 
      } 

    useEffect(()=>{
        setXAxis(prevChange => prevChange.sort((a,b)=>Math.random()-0.5))
        setYAxis(prevChange => prevChange.sort((a,b)=>Math.random()-0.5))
    },[])

    return (
        <div className='center' >
            {wrong && <Wrong></Wrong>}
            {correct && <Correct></Correct>}
            <Plotly
            data={data}
            layout={layout}
            onClick={handleClick} // Handle point click
            style={{ width: '400px', height: '400px' }}
            useResizeHandler={true} // Make the graph responsive
        />
        </div>
    );
};

export default PlotlyGraph;