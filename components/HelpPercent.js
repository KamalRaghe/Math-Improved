import { useEffect, useState } from "react"
import Step from "./step"
import StepF from "./fractionStep"
import HelpHcf from "./HelpHcf"
import HelpDiv from "./PerfectDivision"
import LongDivisionHelp from "./longDivisionHelp"
import ShortDivisionHelp from "./shortDivison"
import HelpTimes from "./HelpTimes"
import StepTimes from "./stepTimes"

function shuffle(arr){
    const a = [...arr]
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]]
    }
    return a
}

function gcd(a, b){
    return b === 0 ? a : gcd(b, a % b)
}

export default function HelpPercent({percent, base, close}){
    const [extra, setExtra] = useState(false)
    const [stepNum, setStepNum] = useState(0)
    const [finished, setFinished] = useState(false)
    const [arr, setArr] = useState([0, 1, -1, 2])
    const [fracArr, setFracArr] = useState([0, 1, 2, 3])

    // percent as a simplified fraction, e.g. 80% = 80/100 = 4/5
    const g = gcd(percent, 100)
    const num = percent / g
    const den = 100 / g
    const ans1 = base / den   // base ÷ den
    const ans2 = ans1 * num   // ans1 x num (skipped when num is 1)
    const finalAnswer = num === 1 ? ans1 : ans2

    // step 0: HCF of percent and 100
    // step 1: percent ÷ HCF
    // step 2: 100 ÷ HCF
    // step 3: pick the simplified fraction
    // step 4: base ÷ den
    // step 5: that answer x num (skipped when num is 1)
    const questions = [
        { Q1: percent, Q2: 100, sign: 'and', ans: g },
        { Q1: percent, Q2: g, sign: '÷', ans: num },
        { Q1: 100, Q2: g, sign: '÷', ans: den },
        null,
        { Q1: base, Q2: den, sign: '÷', ans: ans1 },
        { Q1: ans1, Q2: num, sign: 'x', ans: ans2 },
    ]
    const q = questions[stepNum]
    const fractionStep = stepNum === 3

    // keep every wrong choice above zero
    const target = fractionStep ? num : q.ans
    const offs = arr.map(o => target + o <= 0 ? 3 : o)

    // which helper fits this divide question
    const isDiv = q && q.sign === '÷'
    const perfect = isDiv && q.ans >= 1 && q.ans <= 9
    const longDiv = isDiv && !perfect && q.Q1 > 99 && q.Q2 < 10
    const shortDiv = isDiv && !perfect && !longDiv 

    // the help button only shows when one of your helpers can handle the question
    let canHelp = false
    if(q){
        if(q.sign === 'and' || q.sign === 'x') canHelp = true
        if(isDiv) canHelp = perfect || longDiv || shortDiv
    }

    useEffect(() => {
        setArr(shuffle([0, 1, -1, 2]))
        setFracArr(shuffle([0, 1, 2, 3]))
    },[stepNum])

    function Extra(){
        setExtra(false)
    }

    function Count(){
        setExtra(false)
        if(stepNum === 5 || (stepNum === 4 && num === 1)){
            // last question answered: keep the page open and show the answer
            setFinished(true)
        }else{
            setStepNum(stepNum + 1)
        }
    }

    function Nothing(){}

    // fraction shown at the top, changes as the student works through the steps
    let top = percent
    let bottom = 100
    let color = ''
    if(stepNum === 1){ top = `${percent} ÷ ${g}`; bottom = `100 ÷ ${g}` }
    if(stepNum === 2){ top = num; bottom = `100 ÷ ${g}` }
    if(stepNum >= 3){ top = num; bottom = den; color = 'Green' }

    const showDivLine = stepNum >= 5 || (stepNum === 4 && finished)
    const showTimesLine = stepNum === 5 && finished

    return (
        <div className="Help" style={{zIndex:'50'}}>
            {extra && q && q.sign === 'and' && <HelpHcf close={Extra} num1={q.Q1} num2={q.Q2}/>}
            {extra && q && q.sign === 'x' && q.Q1 < 10 && q.Q2 < 10 && <HelpTimes close={Extra} num1={q.Q1} num2={q.Q2}/>}
            {extra && q && q.sign === 'x' && (q.Q1 >= 10 || q.Q2 >= 10) && <StepTimes close={Extra} num1={q.Q1} num2={q.Q2}/>}
            {extra && perfect && <HelpDiv close={Extra} num1={q.Q1} num2={q.Q2}/>}
            {extra && longDiv && <LongDivisionHelp close={Extra} num1={q.Q2} num2={q.Q1}/>}
            {extra && shortDiv && <ShortDivisionHelp close={Extra} num1={q.Q2} num2={q.Q1}/>}

            <div className='cancel'><button className='cancel-btn' onClick={close}>X</button></div>

            <div className="double center">
                {stepNum < 4 && <span style={{paddingRight:'12px'}}>{percent}% =</span>}
                <div className="column center">
                    <div className={`center ${color}`} style={{borderBottom:'2px solid black', minWidth:'45px'}}>{top}</div>
                    <div className={color}>{bottom}</div>
                </div>
                {stepNum >= 4 && <span style={{paddingLeft:'12px'}}>of {base}</span>}
            </div>

            {showDivLine && <div className="double center">{base} ÷ {den} = <span className="Green" style={{margin:'10px 7px'}}>{ans1}</span></div>}
            {showTimesLine && <div className="double center">{ans1} x {num} = <span className="Green" style={{margin:'10px 5px'}}>{ans2}</span></div>}
            {finished && <div className="double center Green" style={{margin:'10px 5px'}}>{percent}% of {base} = {finalAnswer}</div>}

            {stepNum === 0 && <div className="double center" style={{paddingTop:'20px'}}>Highest common</div>}
            {stepNum === 0 && <div className="double center">factor of</div>}
            {stepNum === 0 && <div className="double center">{percent} and 100</div>}

            {!finished && q && stepNum !== 0 && <div className="double center Green absolute StepQuestion">{q.Q1} {q.sign} {q.Q2} =</div>}

            {!finished && q && <div key={stepNum} className='center wrap absolute StepAnswer'>
                <Step value={q.ans + offs[1]} answer={q.ans} Count={Count} done={false} mistake={Nothing}/>
                <Step value={q.ans + offs[3]} answer={q.ans} Count={Count} done={false} mistake={Nothing}/>
                <Step value={q.ans + offs[0]} answer={q.ans} Count={Count} done={false} mistake={Nothing}/>
                {canHelp && <button className="choice" style={{backgroundColor:'yellow',color:'black'}} onClick={()=>setExtra(true)}>help</button>}
                <Step value={q.ans + offs[2]} answer={q.ans} Count={Count} done={false} mistake={Nothing}/>
                <button className="choice red" onClick={close}>Close</button>
            </div>}

            {/* same as your Simplify help: top and bottom both shift, the true fraction is the one with offset 0 */}
            {fractionStep && <div className='center wrap absolute' style={{width:'100%', top:'325px'}}>
                {fracArr.map(o => (
                    <StepF key={o} whole={0} value1={num + o} answer1={num} value2={den + o} answer2={den + o} Count={Count} mistake={Nothing}/>
                ))}
            </div>}
        </div>
    )
}