export default function HelpTimes({num1,num2,num3,close}){
    return (
        <div className="Help" style={{zIndex:'30', border:'10px solid red'}}>
            <button className="choice red" onClick={close} >Close</button>
            <br></br>
            <br></br>
            <div className="center" style={{width:'90%'}} >{ num2 === 0 && <div className="Green" style={{fontSize: "30px", paddingBottom: '3px',position:"relative"}}>{num1} x 0 = <span className="absolute"><span className="hide">0</span>{num1*0}</span> </div>}</div>
            
            <div className="center" style={{width:'90%'}} >{num2 === 1 ? <div className="Green" style={{fontSize: "30px", paddingBottom: '3px', position:"relative"}}>{num1} x 1 {num3 > 0 && <span>+</span>} {num3 > 0 && num3} = <span className="absolute"><span className="hide">0</span>{!(num3 > 0) && num1*1}{num3 > 0 && num1*num2+num3} </span></div>:
            <div style={{fontSize: "30px", paddingBottom: '3px', position: 'relative'}}>{num1} x 1 = <span className="absolute"><span className="hide">0</span>{num1*1}</span></div>}</div>
            
            <div className="center" style={{width:'90%'}} >{num2 === 2 ? <div className="Green" style={{fontSize: "30px", paddingBottom: '3px', position:"relative"}}>{num1} x 2 {num3 > 0 && <span>+</span>} {num3 > 0 && num3} = <span className="absolute"><span className="hide">0</span>{!(num3 > 0) && num1*2}{num3 > 0 && num1*num2+num3} </span></div>:
            <div style={{fontSize: "30px", paddingBottom: '3px', position: 'relative'}}>{num1} x 2 = <span className="absolute"><span className="hide">0</span>{num1*2}</span></div>}</div>
            
            <div className="center" style={{width:'90%'}} >{num2 === 3 ? <div className="Green" style={{fontSize: "30px", paddingBottom: '3px', position:"relative"}}>{num1} x 3 {num3 > 0 && <span>+</span>} {num3 > 0 && num3} = <span className="absolute"><span className="hide">0</span>{!(num3 > 0) && num1*3}{num3 > 0 && num1*num2+num3} </span></div>:
            <div style={{fontSize: "30px", paddingBottom: '3px', position: 'relative'}}>{num1} x 3 = <span className="absolute"><span className="hide">0</span>{num1*3}</span></div>}</div>
            
            <div className="center" style={{width:'90%'}} >{num2 === 4 ? <div className="Green" style={{fontSize: "30px", paddingBottom: '3px', position:"relative"}}>{num1} x 4 {num3 > 0 && <span>+</span>} {num3 > 0 && num3} = <span className="absolute"><span className="hide">0</span>{!(num3 > 0) && num1*4}{num3 > 0 && num1*num2+num3} </span></div>:
            <div style={{fontSize: "30px", paddingBottom: '3px', position: 'relative'}}>{num1} x 4 = <span className="absolute"><span className="hide">0</span>{num1*4}</span></div>}</div>
            
            <div className="center" style={{width:'90%'}} >{num2 === 5 ? <div className="Green" style={{fontSize: "30px", paddingBottom: '3px', position:"relative"}}>{num1} x 5 {num3 > 0 && <span>+</span>} {num3 > 0 && num3} = <span className="absolute"><span className="hide">0</span>{!(num3 > 0) && num1*5}{num3 > 0 && num1*num2+num3} </span></div>:
            <div style={{fontSize: "30px", paddingBottom: '3px', position: 'relative'}}>{num1} x 5 = <span className="absolute"><span className="hide">0</span>{num1*5}</span></div>}</div>
            
            <div className="center" style={{width:'90%'}} >{num2 === 6 ? <div className="Green" style={{fontSize: "30px", paddingBottom: '3px', position:"relative"}}>{num1} x 6 {num3 > 0 && <span>+</span>} {num3 > 0 && num3} = <span className="absolute"><span className="hide">0</span>{!(num3 > 0) && num1*6}{num3 > 0 && num1*num2+num3} </span></div>:
            <div style={{fontSize: "30px", paddingBottom: '3px', position: 'relative'}}>{num1} x 6 = <span className="absolute"><span className="hide">0</span>{num1*6}</span></div>}</div>
            
            <div className="center" style={{width:'90%'}} >{num2 === 7 ? <div className="Green" style={{fontSize: "30px", paddingBottom: '3px', position:"relative"}}>{num1} x 7 {num3 > 0 && <span>+</span>} {num3 > 0 && num3} = <span className="absolute"><span className="hide">0</span>{!(num3 > 0) && num1*7}{num3 > 0 && num1*num2+num3} </span></div>:
            <div style={{fontSize: "30px", paddingBottom: '3px', position: 'relative'}}>{num1} x 7 = <span className="absolute"><span className="hide">0</span>{num1*7}</span></div>}</div>
            
            <div className="center" style={{width:'90%'}} >{num2 === 8 ? <div className="Green" style={{fontSize: "30px", paddingBottom: '3px', position:"relative"}}>{num1} x 8 {num3 > 0 && <span>+</span>} {num3 > 0 && num3} = <span className="absolute"><span className="hide">0</span>{!(num3 > 0) && num1*8}{num3 > 0 && num1*num2+num3} </span></div>:
            <div style={{fontSize: "30px", paddingBottom: '3px', position: 'relative'}}>{num1} x 8 = <span className="absolute"><span className="hide">0</span>{num1*8}</span></div>}</div>
            
            <div className="center" style={{width:'90%'}} >{num2 === 9 ? <div className="Green" style={{fontSize: "30px", paddingBottom: '3px', position:"relative"}}>{num1} x 9 {num3 > 0 && <span>+</span>} {num3 > 0 && num3} = <span className="absolute"><span className="hide">0</span>{!(num3 > 0) && num1*9}{num3 > 0 && num1*num2+num3} </span></div>:
            <div style={{fontSize: "30px", paddingBottom: '3px', position: 'relative'}}>{num1} x 9 = <span className="absolute"><span className="hide">0</span>{num1*9}</span></div>}</div>
        </div>
    )
}