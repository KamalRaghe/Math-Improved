import dynamic from 'next/dynamic';
import { useState } from 'react';
import Wrong from '@/components/wrong';
const PlotlyGraph = dynamic(() => import('./graph'), { ssr: false });

const PlotlyGraphPage = () => {
    const [x,setX] = useState(Math.random()*11-5)
    const [y,setY] = useState([-1,-2,-3,-4,-5,1,2,3,4,5])
    return (
        <div className='column center relative' style={{padding: '20px', textAlign: 'center' }}>
            <h1 className='center relative' style={{backgroundColor:"white",width:"400px",top:"60px",zIndex:"10"}} >Find point:</h1>
            <PlotlyGraph  x = {x} y = {y}  />
        </div>
    );
};

export default PlotlyGraphPage;