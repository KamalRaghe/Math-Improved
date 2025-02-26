import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import Wrong from '@/components/wrong';
const PlotlyGraph = dynamic(() => import('./graph'), { ssr: false });

const PlotlyGraphPage = () => {
    const [x,setX] = useState(Math.floor(Math.random()*11-5))
    const [y,setY] = useState(Math.floor(Math.random()*11-5))
    const [loaded,setLoaded] = useState(false)
    function mix(){
        setX((Math.floor(Math.random()*11-5)))
        setY((Math.floor(Math.random()*11-5)))
    }
    useEffect(()=>{
        setLoaded(true)
    })
    return (
        <>
            {loaded && <div className='column center relative' style={{padding: '20px', textAlign: 'center' }}>
                <div className='center relative column' style={{backgroundColor:"white",width:"400px",top:"60px",zIndex:"10"}} >
                    <h1 style={{margin:"5px",marginTop:"20px"}} >Find ({x},{y})</h1>
                    <h2 style={{margin:"0px"}} >Example (<span style={{color:"yellow"}} >3</span>,<span style={{color:"green"}} >4</span>)</h2>
                </div>
                <PlotlyGraph  x = {x} y = {y} mix = {mix} />
            </div>}
        </>
    );
};

export default PlotlyGraphPage;