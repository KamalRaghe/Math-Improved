import dynamic from 'next/dynamic';

const PlotlyGraph = dynamic(() => import('./graph'), { ssr: false });

const PlotlyGraphPage = () => {
    return (
        <div className='column center relative' style={{padding: '20px', textAlign: 'center', bottom:"70px" }}>
            <h1 className='center relative' style={{backgroundColor:"white",width:"400px",top:"60px",zIndex:"10"}} >Find point:</h1>
            <PlotlyGraph />
        </div>
    );
};

export default PlotlyGraphPage;