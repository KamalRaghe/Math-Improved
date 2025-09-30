
export default function HelpAdd({num1,num2,num3,close}){
    return(
        <div className="Help column">
            
            <div style={{margin: "10px",marginTop:'30px',marginLeft:'30px', display:"flex"}}>
                {num3 == 1 && <div className="circle green font center">{1}</div>}
            </div>
            <div style={{margin: "10px",marginLeft:'30px', display:"flex"}}>
                {num1 >= 1 && <div className="circle red font center">{1}</div>}
                {num1 >= 2 && <div className="circle red font center">{2}</div>}
                {num1 >= 3 && <div className="circle red font center">{3}</div>}
                {num1 >= 4 && <div className="circle red font center">{4}</div>}
                {num1 >= 5 && <div className="circle red font center">{5}</div>}
            </div>
            <div style={{margin: "10px",marginLeft:'30px', display:"flex"}}>
                {num1 >= 6 && <div className="circle red font center">{6}</div>}
                {num1 >= 7 && <div className="circle red font center">{7}</div>}
                {num1 >= 8 && <div className="circle red font center">{8}</div>}
                {num1 >= 9 && <div className="circle red font center">{9}</div>}
                {num1 >= 10 && <div className="circle Green font center">{1}</div>}
            </div>
                <div className="center double" style={{margin: '30px'}}><div>{num3 === 1 && <span>1 +</span>} {num1} + {num2} = </div><button className="choice red" onClick={close} >Close</button></div>
            <div style={{margin: "10px",marginLeft:'30px', display:"flex"}}>
                {num2 >= 1 && <div className="circle orange font center">{1}</div>}
                {num2 >= 2 && <div className="circle orange font center">{2}</div>}
                {num2 >= 3 && <div className="circle orange font center">{3}</div>}
                {num2 >= 4 && <div className="circle orange font center">{4}</div>}
                {num2 >= 5 && <div className="circle orange font center">{5}</div>}
            </div>
            <div style={{margin: "10px",marginLeft:'30px', display:"flex"}}>
                {num2 >= 6 && <div className="circle orange font center">{6}</div>}
                {num2 >= 7 && <div className="circle orange font center">{7}</div>}
                {num2 >= 8 && <div className="circle orange font center">{8}</div>}
                {num2 >= 9 && <div className="circle orange font center">{9}</div>}
                {num2 >= 10 && <div className="circle orange font center">{10}</div>}
            </div>
        </div>
    )
    
   
}