export default function HelpCube({close}){
    return (
        <div className="Help">
            <div className='cancel'><button className='cancel-btn' onClick = {close}>X</button></div>
            <div style={{display:'flex'}}>
                <div className="column" style={{width:'50%'}}>
                    <div className="double center" style={{ paddingBottom:'20px'}}>
                        <span className="root-tip" style={{left:'-5px',top:"-6px"}} ><div style={{position:'relative',rotate:'90deg',top:"-2px",left:'7px'}} >3</div></span><span className="root-right" style={{left:'1px'}}></span><span className="root-left" style={{left:'-7px'}}></span><span style={{borderTop:'2px solid black'}}><span className="hide">.</span>{1*1}</span><span className="hide">0</span>= {1}
                    </div>
                    <div className="double center"  style={{ paddingBottom:'20px'}}>
                        <span className="root-tip" style={{left:'-5px',top:"-6px"}} ><div style={{position:'relative',rotate:'90deg',top:"-2px",left:'7px'}} >3</div></span><span className="root-right" style={{left:'1px'}}></span><span className="root-left" style={{left:'-7px'}}></span><span style={{borderTop:'2px solid black'}}><span className="hide">.</span>{2*2*2}</span><span className="hide">0</span>= {2}
                    </div>
                    <div className="double center" style={{ paddingBottom:'20px'}}>
                        <span className="root-tip" style={{left:'-5px',top:"-6px"}} ><div style={{position:'relative',rotate:'90deg',top:"-2px",left:'7px'}} >3</div></span><span className="root-right" style={{left:'1px'}}></span><span className="root-left" style={{left:'-7px'}}></span><span style={{borderTop:'2px solid black'}}><span className="hide">.</span>{3*3*3}</span><span className="hide">0</span>= {3}
                    </div>
                    <div className="double center" style={{ paddingBottom:'20px'}}>
                        <span className="root-tip" style={{left:'-5px',top:"-6px"}} ><div style={{position:'relative',rotate:'90deg',top:"-2px",left:'7px'}} >3</div></span><span className="root-right" style={{left:'1px'}}></span><span className="root-left" style={{left:'-7px'}}></span><span style={{borderTop:'2px solid black'}}><span className="hide">.</span>{4*4*4}</span><span className="hide">0</span>= {4}
                    </div>
                    <div className="double center" style={{ paddingBottom:'20px'}}>
                        <span className="root-tip" style={{left:'-5px',top:"-6px"}} ><div style={{position:'relative',rotate:'90deg',top:"-2px",left:'7px'}} >3</div></span><span className="root-right" style={{left:'1px'}}></span><span className="root-left" style={{left:'-7px'}}></span><span style={{borderTop:'2px solid black'}}><span className="hide">.</span>{5*5*5}</span><span className="hide">0</span>= {5}
                    </div>
                </div>
                <div className="column" style={{width:'50%'}}>
                    <div className="double center" style={{ paddingBottom:'20px'}}>
                        <span className="root-tip" style={{left:'-5px',top:"-6px"}} ><div style={{position:'relative',rotate:'90deg',top:"-2px",left:'7px'}} >3</div></span><span className="root-right" style={{left:'1px'}}></span><span className="root-left" style={{left:'-7px'}}></span><span style={{borderTop:'2px solid black'}}><span className="hide">.</span>{6*6*6}</span><span className="hide">0</span>= {6}
                    </div>
                    <div className="double center" style={{ paddingBottom:'20px'}}>
                        <span className="root-tip" style={{left:'-5px',top:"-6px"}} ><div style={{position:'relative',rotate:'90deg',top:"-2px",left:'7px'}} >3</div></span><span className="root-right" style={{left:'1px'}}></span><span className="root-left" style={{left:'-7px'}}></span><span style={{borderTop:'2px solid black'}}><span className="hide">.</span>{7*7*7}</span><span className="hide">0</span>= {7}
                    </div>
                    <div className="double center" style={{ paddingBottom:'20px'}}>
                        <span className="root-tip" style={{left:'-5px',top:"-6px"}} ><div style={{position:'relative',rotate:'90deg',top:"-2px",left:'7px'}} >3</div></span><span className="root-right" style={{left:'1px'}}></span><span className="root-left" style={{left:'-7px'}}></span><span style={{borderTop:'2px solid black'}}><span className="hide">.</span>{8*8*8}</span><span className="hide">0</span>= {8}
                    </div> 
                    <div className="double center" style={{ paddingBottom:'20px'}}>
                        <span className="root-tip" style={{left:'-5px',top:"-6px"}} ><div style={{position:'relative',rotate:'90deg',top:"-2px",left:'7px'}} >3</div></span><span className="root-right" style={{left:'1px'}}></span><span className="root-left" style={{left:'-7px'}}></span><span style={{borderTop:'2px solid black'}}><span className="hide">.</span>{9*9*9}</span><span className="hide">0</span>= {9}
                    </div>
                    <div className="double center" style={{ paddingBottom:'20px'}}>
                    <span className="root-tip" style={{left:'-5px',top:"-6px"}} ><div style={{position:'relative',rotate:'90deg',top:"-2px",left:'7px'}} >3</div></span><span className="root-right" style={{left:'1px'}}></span><span className="root-left" style={{left:'-7px'}}></span><span style={{borderTop:'2px solid black'}}>{10*10*10}</span>={10}</div>     
                </div> 
            </div>   
                
        </div>
    )
}