import { useState ,useEffect, use } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import FeedBack from "@/components/feedback"
import Sign2 from "@/components/SignUp2";
import AboutUs from "@/components/AboutUS";
import Code from "@/components/code";
export default function Math(){
    const [count, setCount] = useState(0)
    const [loaded, setLoaded] = useState(true)
    const [check, setCheck] = useState(false)
    const [check2, setCheck2] = useState(false)
    const [about, setAbout] = useState(false)
    const [none, setNone] = useState('')
    const [flex, setFlex] = useState('flex')
    const router = useRouter() 
    const {id} = router.query 
    const [code, setCode] = useState(false)

    function close(){
        if(count){
            setCount(false)
        }
    }

    useEffect(()=>{
        const score = parseInt(window.localStorage.getItem(`${id} score`))
        setCheck2(score > 100)
        // if(score > 100){
        //     setNone('none')
        // }
    },[])

    return (
        <div className="beige" style={{padding:"20px",paddingBottom:"50px"}}>

            {check && <FeedBack close={()=>{setCheck(false),setNone(''),setFlex('flex')}} />}
            {about &&<AboutUs close={()=>{setAbout(false),setNone(''),setFlex('flex')}} />}
            <div style={{display:flex,justifyContent:"space-between",width:"100vw",height:"180px"}}>
                <div>
                    <div className="relative" style={{display:"flex",justifyContent:"start",fontSize:"70px",top:"20px",color:'navy',padding:"0px"}} >Math</div>
                    <div className="relative" style={{fontSize:"70px",color:'purple',paddingBottom:"20px"}} >Improve</div>      
                </div>
                <div className=" center column relative" style={{marginLeft:"50px",width:"300px",justifyContent:"end",top:"130px"}}>
                    <div ><button className="sub-topic" onClick={()=>{router.push('/Sign')}}>Sign in</button></div>
                    <div ><button className="sub-topic" style={{position:"relative",bottom:"25px"}} onClick={()=>{setAbout(true);setNone('none'),setFlex('none')}} >About us</button></div>
                    <div><button className="sub-topic" style={{position:"relative",bottom:"50px"}} onClick={()=>{setCheck(true);setNone('none'),setFlex('none')}} >Feedback</button></div>
                    <div ><button className="sub-topic" style={{position:"relative",bottom:"75px"}} onClick={()=>{setCode(true);setNone('none'),setFlex('none')}} >Code</button></div>
                </div>
            </div>
            <div className="column" style={{display:none,paddingBottom:"20px"}} onClick={close} >
                {loaded && <button onClick={() => {setCount(1)}} className="topic">Addition</button >}
                { count === 1 && <Link href= {`/MIT/singleAdd`}><button className="sub-topic zoom">Single digit Addition</button></Link>}
                { count === 1 && <Link href= {`/MIT/doubleAdd`}><button className="sub-topic zoom">Double digit Addition</button></Link>}
                
                { loaded && <button onClick={() => {setCount(2)}}  className="topic">Subtraction</button >}
                {  count === 2 &&<Link href= {`/MIT/singleMinus`}><button className="sub-topic zoom">Single digit Subtraction</button></Link>}
                {  count === 2 && <Link href= {`/MIT/doubleMinus`}><button className="sub-topic zoom">Double digit subtraction</button></Link>}

                { loaded && <button onClick={() => {setCount(3)}}  className="topic">Multiplication</button >}
                {  count === 3 &&<Link href= {`/MIT/singleTimes`}><button className="sub-topic zoom">Single digit Multiplication</button></Link>}
                {   count === 3 && <Link href= {`/MIT/doubleTimes`}><button className="sub-topic zoom">Double digit Multiplication</button></Link>}

                { loaded && <button onClick={() => {setCount(4)}}  className="topic">Division</button >}
                {  count === 4 &&<Link href= {`/MIT/longDivision`}><button className="sub-topic zoom">Long Division</button></Link>}

                { loaded && <button onClick={() => {setCount(5)}}  className="topic">LCM & HCF</button >}
                {  count === 5 &&<Link href= {`/MIT/Lcm`}><button className="sub-topic zoom">Lowest Common Multiple</button></Link>}
                {  count === 5 && <Link href= {`/MIT/Hcf`}><button className="sub-topic zoom">Highest Common Factor</button></Link>}

                { loaded && <button onClick={() => {setCount('fraction')}}  className="topic">Fractions</button >}
                {  count === 'fraction' &&<Link href= {`/MIT/Simplify`}><button className="sub-topic zoom">Simplify</button></Link>}
                {  count === 'fraction' &&<Link href= {`/MIT/Mixed`}><button className="sub-topic zoom">Mixed to Improper</button></Link>}
                {  count === 'fraction' && <Link href= {`/MIT/Improper`}><button className="sub-topic zoom">Improper to Mixed</button></Link>}            
                {  count === 'fraction' && <Link href= {`/MIT/ACD`}><button className="sub-topic zoom">Addition (common denominator)</button></Link>}            
                {  count === 'fraction' && <Link href= {`/MIT/AUD`}><button className="sub-topic zoom">Addition (uncommon denominator)</button></Link>}            
                {  count === 'fraction' && <Link href= {`/MIT/AMF`}><button className="sub-topic zoom">Addition (Mixed Fractions)</button></Link>}            
                {  count === 'fraction' && <Link href= {`/MIT/SCD`}><button className="sub-topic zoom">Subtraction (common denominator)</button></Link>}            
                {  count === 'fraction' && <Link href= {`/MIT/SMF`}><button className="sub-topic zoom">Subtraction (Mixed Fractions)</button></Link>}            
                {  count === 'fraction' && <Link href= {`/MIT/MPF`}><button className="sub-topic zoom">Multiplication (Proper Fractions)</button></Link>}            
                {  count === 'fraction' && <Link href= {`/MIT/MMF`}><button className="sub-topic zoom">Multiplication (Mixed Fractions)</button></Link>}
                {  count === 'fraction' && <Link href= {`/MIT/DPF`}><button className="sub-topic zoom">Division (Proper Fractions)</button></Link>}            
                {  count === 'fraction' && <Link href= {`/MIT/DMF`}><button className="sub-topic zoom">Division (Mixed Fractions)</button></Link>}                        

                { loaded && <button onClick={() => {setCount('in')}} className="topic" >Inequality</button>}
                { count === 'in' && <Link href= {`/MIT/Gl`}><button className="sub-topic zoom">Greater than less than</button></Link>}

                { loaded && <button onClick={() => {setCount(6)}} className="topic" >Mean Median & Mode</button>}
                { count === 6 && <Link href= {`/MIT/mean`}><button className="sub-topic zoom">Mean</button></Link>}
                { count === 6 && <Link href= {`/MIT/median`}><button className="sub-topic zoom ">Median</button></Link>}
                { count === 6 && <Link href= {`/MIT/mode`}><button className="sub-topic zoom" >Mode</button></Link>}

                { loaded && <button onClick={() => {setCount(7)}}  className="topic">Exponents/Power</button >}
                {  count === 7 &&<Link href= {`/MIT/square`}><button className="sub-topic zoom">Square</button></Link>}
                {  count === 7 && <Link href= {`/MIT/cube`}><button className="sub-topic zoom">Cube</button></Link>}

                { loaded &&  <button onClick={() => {setCount(8)}}  className="topic">Roots</button >}
                {  count === 8 &&<Link href= {`/MIT/squareRoots`}><button className="sub-topic zoom">Square roots</button></Link>}
                {  count === 8 && <Link href= {`/MIT/cubeRoots`}><button className="sub-topic zoom">Cube roots</button></Link>}

                { loaded && <button onClick={() => {setCount(9)}}  className="topic">Bedmas</button >}
                { count === 9 &&<Link href= {`/MIT/Bedmas`}><button className="sub-topic zoom">Bedmas</button></Link>}
                
                { loaded && <button onClick={() => {setCount(10)}}  className="topic">Algebra</button >}
                { count === 10 && <Link href= {`/MIT/Algebra`}><button className="sub-topic zoom">One variable</button></Link>}
                { count === 10 && <Link href= {`/MIT/likeTerm`}><button className="sub-topic zoom">Like terms</button></Link>}
                { count === 10 && <Link href= {`/MIT/Algebra2`}><button className="sub-topic zoom">Two variable</button></Link>}
                { count === 10 && <Link href= {`/MIT/Foil`}><button className="sub-topic zoom">Foil</button></Link>}
                { count === 10 && <Link href= {`/MIT/Trinomial`}><button className="sub-topic zoom">Factor trinomial</button></Link>}
                { count === 10 && <Link href= {`/MIT/Quadratic`}><button className="sub-topic zoom">Quadratic formula</button></Link>}

                
                { loaded && <button onClick={() => {setCount('angle')}}  className="topic">Geometry</button >}
                { count === 'angle' &&<Link href= {`/MIT/TypeAngle`}><button className="sub-topic zoom">Types of angle</button></Link>}
                { count === 'angle' &&<Link href= {`/MIT/Perimeter`}><button className="sub-topic zoom">Perimeter</button></Link>}
                { count === 'angle' &&<Link href= {`/MIT/Circumference`}><button className="sub-topic zoom">Circumference</button></Link>}
                { count === 'angle' &&<Link href= {`/MIT/Area`}><button className="sub-topic zoom">Area</button></Link>}

                { loaded && <button onClick={() => {setCount('log')}}  className="topic">Logarithms</button >}
                { count === 'log' &&<Link href= {`/MIT/Logarithm`}><button className="sub-topic zoom">Logarithms</button></Link>}
                { loaded && <button onClick={() => {setCount('fun')}}  className="topic">Function</button >}
                { count === 'fun' &&<Link href= {`/MIT/slope`}><button className="sub-topic zoom">Slope</button></Link>}
                { count === 'fun' &&<Link href= {`/MIT/solveB`}><button className="sub-topic zoom">Solve for b</button></Link>}
                { loaded && <button style={{opacity:"0.4"}} onClick={() => {setCount('loge')}}  className="topic">Calculus</button >}
            </div>
        </div>     
    )
 } 