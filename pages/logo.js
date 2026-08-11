
export default function Logo(){
    return(
       <div className="center beige" >
             <div style={{width:"250px",height:"150px",backgroundColor:"cyan"}} >
                <div style={{border:'5px solid blue',width:"100px", position:"relative",top:"90px", rotate:"-55deg" }} ></div>
                <div style={{border:'5px solid blue',width:"40px", position:"relative",top:"55px",left:"70px", rotate:"55deg" }} ></div>
                <div style={{border:'5px solid blue',width:"40px", position:"relative",top:"45px",left:"100px", rotate:"-45deg" }} ></div>
                <div style={{border:'5px solid purple',width:"100px", position:"relative",left:"120px",top:"60px", rotate:"90deg" }} ></div>
             </div>
       </div>
    )
}