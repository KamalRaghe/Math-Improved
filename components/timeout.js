function Timeout({again}){
    return(
        <div className="timeout center column"> 
            <h1>Ran out of time</h1>
            <button className="choice-stretch red" onClick={again}>Try again</button>
        </div>
    )
}

export default Timeout