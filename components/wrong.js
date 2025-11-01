function Wrong(){
    return(
        <div className='center column beige absolute'style={{zIndex:"100",width:"100vw"}}>
            <h1 className="Red center" style={{scale:"1.8"}} >Try again</h1>
            <img className="check" style={{borderRadius:"50%",backgroundColor:"#a0e1ff",width:'500px',height:"500px",position:"relative",bottom:"20px"}} src={'/Red.png'} alt="Wrong" />
        </div>  
    )    
}
export default Wrong