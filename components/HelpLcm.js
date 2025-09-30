function HelpLcm({close, num1 , num2,answer}){

    return(
        <div className="Help">
            <div><button className="choice red" onClick={close} >Close</button></div>
            <div className="double center ">Multiple</div>
            <div className="center sb" style={{padding:'15px'}}>
                {num1*1 === answer ?<div className='Green double mini'>{num1*1}</div>:<div className='double mini'>{num1*1}</div>}
                {num1*2 === answer ?<div className='Green double mini'>{num1*2}</div>:<div className='double mini'>{num1*2}</div>}
                {num1*3 === answer ?<div className='Green double mini'>{num1*3}</div>:<div className='double mini'>{num1*3}</div>}
                {num1*4 === answer ?<div className='Green double mini'>{num1*4}</div>:<div className='double mini'>{num1*4}</div>}
                {num1*5 === answer ?<div className='Green double mini'>{num1*5}</div>:<div className='double mini'>{num1*5}</div>}
            </div>
            <div className="center sb" style={{padding:'15px'}}>
                {num1*6 === answer ?<div className='Green double mini'>{num1*6}</div>:<div className='double mini'>{num1*6}</div>}
                {num1*7 === answer ?<div className='Green double mini'>{num1*7}</div>:<div className='double mini'>{num1*7}</div>}
                {num1*8 === answer ?<div className='Green double mini'>{num1*8}</div>:<div className='double mini'>{num1*8}</div>}
                {num1*9 === answer ?<div className='Green double mini'>{num1*9}</div>:<div className='double mini'>{num1*9}</div>}
                {num1*10 === answer?<div className='Green double mini'>{num1*10}</div>:<div className='double mini'>{num1*10}</div>}
            </div>
            <br></br>
            <br></br>
            <div className="center sb" style={{padding:'15px'}}>
                {num2*1 === answer ?<div className='Green double mini'>{num2*1}</div>:<div className='double mini'>{num2*1}</div>}
                {num2*2 === answer ?<div className='Green double mini'>{num2*2}</div>:<div className='double mini'>{num2*2}</div>}
                {num2*3 === answer ?<div className='Green double mini'>{num2*3}</div>:<div className='double mini'>{num2*3}</div>}
                {num2*4 === answer ?<div className='Green double mini'>{num2*4}</div>:<div className='double mini'>{num2*4}</div>}
                {num2*5 === answer ?<div className='Green double mini'>{num2*5}</div>:<div className='double mini'>{num2*5}</div>}
    
            </div>
            <div className="center sb" style={{padding:'15px'}}>
                {num2*6 === answer ?<div className=' Green double mini'>{num2*6}</div>:<div className='double mini'>{num2*6}</div>}
                {num2*7 === answer ?<div className='Green double mini'>{num2*7}</div>:<div className='double mini'>{num2*7}</div>}
                {num2*8 === answer ?<div className='Green double mini'>{num2*8}</div>:<div className='double mini'>{num2*8}</div>}
                {num2*9 === answer ?<div className='Green double mini'>{num2*9}</div>:<div className='double mini'>{num2*9}</div>}
                {num2*10 === answer?<div className='Green double mini'>{num2*10}</div>:<div className='double mini'>{num2*10}</div>}
            </div>
           
            <div className='space'></div>     
        </div>
    )
}
export default HelpLcm