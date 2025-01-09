import dynamic from 'next/dynamic';
import { useState } from 'react';
import Wrong from '@/components/wrong';
const PlotlyGraph = dynamic(() => import('./graph'), { ssr: false });

const PlotlyGraphPage = () => {
    const [x,setX] = useState(Math.floor(Math.random()*11-5))
    const [y,setY] = useState(Math.floor(Math.random()*11-5))
    function mix(){
        setX((Math.floor(Math.random()*11-5)))
        setY((Math.floor(Math.random()*11-5)))
    }
    return (
        <div className='column center relative' style={{padding: '20px', textAlign: 'center' }}>
            <h1 className='center relative' style={{backgroundColor:"white",width:"400px",top:"60px",zIndex:"10"}} >Find ({x},{y})</h1>
            <PlotlyGraph  x = {x} y = {y} mix = {mix} />
        </div>
    );
};

export default PlotlyGraphPage;