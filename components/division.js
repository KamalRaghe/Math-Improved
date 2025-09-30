export default function HelpDivision({num1,num2,num3,close}){
    return (
        <div className="Help" >
        {extra && sign == '-' && number1 <= 9 && <HelpMinus close={Extra} num1 ={number1} num2 = {number2}/>}
        {extra && sign == '-' && number1 > 9 && <StepMinus close={Extra} num1 ={number1} num2 = {number2} />}
        {extra && sign == 'x' && <HelpTimes close={Extra} num1 ={number2} num2 = {number1}/>}
        
        <div className='cancel'><button className='cancel-btn' onClick = {close}>X</button></div>
        <div className="double center column">
            <div>{num1} ÷ {num2} = {!step1 && answer == 0 && <button className="carry Green" onClick={close} >{num1/num2}</button>}</div>
            {sign === '-'&& !(!step1 && answer == 0) && <div>{num1} - {number4*num2} = {!step1 && answer > 0 && <button className="carry Red" onClick={Small} >{answer}</button> }{!step1 && answer === 0 && answer } </div>}
        </div> 
        {small && <div className=" center Red double Pop">Too Small</div>}    
        {big && <div className=" center Red double Pop">Too big</div>}    
        {done && step1 && <div style={{display:'flex', justifyContent:'center', alignItems:'end', height:'250px'  }}>
                    <button className="choice-stretch" onClick = {() => {setDone(false);setNumber4(1) }}>{1}</button>
                    <button className="choice-stretch" onClick = {() => {setDone(false);setNumber4(2) }}>{2}</button>
                    <button className="choice-stretch" onClick = {() => {setDone(false);setNumber4(3) }}>{3}</button>
               </div>} {done && step1 && <div style={{display:'flex', justifyContent:'center', alignItems:'end'}}>
                    <button className="choice-stretch" onClick = {() => {setDone(false);setNumber4(4) }}>{4}</button>
                    <button className="choice-stretch" onClick = {() => {setDone(false);setNumber4(5) }}>{5}</button>
                    <button className="choice-stretch" onClick = {() => {setDone(false);setNumber4(6) }}>{6}</button>
               </div>}{done && step1 && <div style={{display:'flex', justifyContent:'center', alignItems:'end'}}>
                    <button className="choice-stretch" onClick = {() => {setDone(false);setNumber4(7) }}>{7}</button>
                    <button className="choice-stretch" onClick = {() => {setDone(false);setNumber4(8) }}>{8}</button>
                    <button className="choice-stretch" onClick = {() => {setDone(false);setNumber4(9) }}>{9}</button>
               </div>}    
        {!done && <div className=" double center Green absolute StepQuestion">{number1} {sign} {number2} = </div>}  
           {!done &&<div className='center wrap absolute StepAnswer'>
               <Step value = {((answer))+arr[1]}  answer={(answer)} Count ={Count} done = {done} mistake={Nothing}/>
               <Step value = {((answer))+arr[3]}  answer={(answer)} Count ={Count} done = {done} mistake={Nothing}/>
               <Step value = {((answer))+arr[0]}  answer={(answer)} Count ={Count} done = {done} mistake={Nothing}/>
               <button className="choice" style={{backgroundColor:'yellow',color:'black'}} onClick={()=>{setExtra(true);console.log(extra)}} >help</button>
               <Step value = {((answer))+arr[2]}  answer={(answer)} Count ={Count} done = {done} mistake={Nothing}/>
               <button className="choice red" onClick={close} >Close</button>
           </div>}
    </div>
    )
}