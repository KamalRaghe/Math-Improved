import { useState } from "react"

function HelpMinus({num1,num2,close}){
    const [faded, setFaded] = useState("0.2")
    return(
        <div className="Help">
            <div className="center" style={{margin: '30px', marginTop: '140px'}}><div className="double">{num1} - {num2} =</div><button className="choice red" onClick={close} >Close</button></div>
            <div style={{margin: "10px", display:"flex"}}>
                {num2 >= 1 && <div className="circle red font center" style={{opacity: faded }}>{1}</div>}{num1 >= 1 && num2 < 1 && <div className="circle red font center">{1}</div>}
                {num2 >= 2 && <div className="circle red font center" style={{opacity: faded }}>{2}</div>}{num1 >= 2 && num2 < 2 && <div className="circle red font center">{2}</div>}
                {num2 >= 3 && <div className="circle red font center" style={{opacity: faded }}>{3}</div>}{num1 >= 3 && num2 < 3 && <div className="circle red font center">{3}</div>}
                {num2 >= 4 && <div className="circle red font center" style={{opacity: faded }}>{4}</div>}{num1 >= 4 && num2 < 4 && <div className="circle red font center">{4}</div>}
                {num2 >= 5 && <div className="circle red font center" style={{opacity: faded }}>{5}</div>}{num1 >= 5 && num2 < 5 && <div className="circle red font center">{5}</div>}
            </div>
            <div style={{margin: "10px", display:"flex"}}>
                {num2 >= 6 && <div className="circle red font center" style={{opacity: faded }}>{6}</div>}{num1 >= 6 && num2 < 6 && <div className="circle red font center">{6}</div>}
                {num2 >= 7 && <div className="circle red font center" style={{opacity: faded }}>{7}</div>}{num1 >= 7 && num2 < 7 && <div className="circle red font center">{7}</div>}
                {num2 >= 8 && <div className="circle red font center" style={{opacity: faded }}>{8}</div>}{num1 >= 8 && num2 < 8 && <div className="circle red font center">{8}</div>}
                {num2 >= 9 && <div className="circle red font center" style={{opacity: faded }}>{9}</div>}{num1 >= 9 && num2 < 9 && <div className="circle red font center">{9}</div>}
                {num2 >= 10 && <div className="circle red font center" style={{opacity: faded }}>{10}</div>}{num1 >= 10 && num2 < 10 && <div className="circle red font center">{10}</div>}
            </div>
            <div style={{margin: "10px", display:"flex"}}>
                {num1 >= 11 && <div className="circle red font center">{11}</div>}
                {num1 >= 12 && <div className="circle red font center">{12}</div>}
                {num1 >= 13 && <div className="circle red font center">{13}</div>}
                {num1 >= 14 && <div className="circle red font center">{14}</div>}
                {num1 >= 15 && <div className="circle red font center" >{15}</div>}
            </div>
            <div style={{margin: "10px", display:"flex"}}>
                {num1 >= 16 && <div className="circle red font center">{16}</div>}
                {num1 >= 17 && <div className="circle red font center">{17}</div>}
                {num1 >= 18 && <div className="circle red font center">{18}</div>}
                {num1 >= 19 && <div className="circle red font center">{19}</div>}
                {num1 >= 20 && <div className="circle red font center" >{20}</div>}
            </div>
        </div>
    )
    
   
}

export default HelpMinus