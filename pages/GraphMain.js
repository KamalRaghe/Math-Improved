import dynamic from 'next/dynamic';

const PlotlyGraph = dynamic(() => import('./graph'), { ssr: false });

const PlotlyGraphPage = () => {
    return (
        <div className=' center' style={{ padding: '20px', textAlign: 'center' }}>
            <PlotlyGraph />
        </div>
    );
};

export default PlotlyGraphPage;