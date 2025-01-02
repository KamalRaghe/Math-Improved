function Mistake({again}){
    return(
        <div className="timeout center column"> 
            <h1>T0o many mistakes</h1>
            <button className="choice-stretch  red" onClick={again}>Try again</button>
        </div>
    )
}

export default Mistake