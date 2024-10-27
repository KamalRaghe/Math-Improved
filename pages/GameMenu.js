import { useState ,useEffect, use } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";


export default function Menu(){
    const [count, setCount] = useState(0)
    const [loaded, setLoaded] = useState(true)
    const router = useRouter()
    const {id} = router.query 

    function topic(Topic){
        window.localStorage.setItem('Topic', Topic)
        router.push('/Host')
    }

    return (
        <div className="beige menu" style={{height:'300vh',backgroundColor:'beige'}}>
            <h1 style={{marginLeft:'35px',paddingLeft:'15px',margin:"20px",paddingTop:'15px', borderBottom: '2px solid black',width:'95px'}} >Topic</h1>
            {loaded && <button onClick={() => {setCount(1)}} className="topic">Addition</button >}
            { count === 1 && <button onClick={()=>{topic('Single digit addition')}}className="sub-topic zoom">Single digit Addition</button>}
            { count === 1 && <button onClick={()=>{topic('Double digit addition')}} className="sub-topic zoom">Double digit Addition</button>}
            
            { loaded && <button onClick={() => {setCount(2)}}  className="topic">Subtraction</button >}
            {  count === 2 &&<button onClick={()=>{topic('Single digit subtraction')}} className="sub-topic zoom">Single digit Subtraction</button>}
            {  count === 2 && <button onClick={()=>{topic('Double digit subtraction')}}className="sub-topic zoom">Double digit subtraction</button>}

            { loaded && <button onClick={() => {setCount(3)}}  className="topic">Multiplication</button >}
            {  count === 3 && <button onClick={()=>{topic('Single digit multiplication')}} className="sub-topic zoom">Single digit Multiplication</button>}
            {  count === 3 && <button onClick={()=>{topic('Double digit multiplication')}} className="sub-topic zoom">Double digit Multiplication</button>}

            { loaded && <button onClick={() => {setCount(4)}}  className="topic">Division</button >}
            {  count === 4 && <button onClick={()=>{topic('Long division')}} className="sub-topic zoom">Long Division</button>}

            {/* { loaded && <button onClick={() => {setCount(5)}}  className="topic">LCM & HCF</button >}
            {  count === 5 &&<Link href= {`/${id}/enter/Lcm`}><button className="sub-topic zoom">Lowest Common Multiple</button></Link>}
            {  count === 5 && <Link href= {`/${id}/enter/Hcf`}><button className="sub-topic zoom">Highest Common Factor</button></Link>} */}

            {/* { loaded && <button onClick={() => {setCount('fraction')}}  className="topic">Fractions</button >}
            {  count === 'fraction' &&<Link href= {`/${id}/enter/Simplify`}><button className="sub-topic zoom">Simplify</button></Link>}
            {  count === 'fraction' &&<Link href= {`/${id}/enter/Mixed`}><button className="sub-topic zoom">Mixed to Improper</button></Link>}
            {  count === 'fraction' && <Link href= {`/${id}/enter/Improper`}><button className="sub-topic zoom">Improper to Mixed</button></Link>}            
            {  count === 'fraction' && <Link href= {`/${id}/enter/ACD`}><button className="sub-topic zoom">Addition (common denominator)</button></Link>}            
            {  count === 'fraction' && <Link href= {`/${id}/enter/AUD`}><button className="sub-topic zoom">Addition (uncommon denominator)</button></Link>}            
            {  count === 'fraction' && <Link href= {`/${id}/enter/AMF`}><button className="sub-topic zoom">Addition (Mixed Fractions)</button></Link>}            
            {  count === 'fraction' && <Link href= {`/${id}/enter/SCD`}><button className="sub-topic zoom">Subtraction (common denominator)</button></Link>}            
            {  count === 'fraction' && <Link href= {`/${id}/enter/SMF`}><button className="sub-topic zoom">Subtraction (Mixed Fractions)</button></Link>}            
            {  count === 'fraction' && <Link href= {`/${id}/enter/MPF`}><button className="sub-topic zoom">Multiplication (Proper Fractions)</button></Link>}            
            {  count === 'fraction' && <Link href= {`/${id}/enter/MMF`}><button className="sub-topic zoom">Multiplication (Mixed Fractions)</button></Link>}
            {  count === 'fraction' && <Link href= {`/${id}/enter/DPF`}><button className="sub-topic zoom">Division (Proper Fractions)</button></Link>}            
            {  count === 'fraction' && <Link href= {`/${id}/enter/DMF`}><button className="sub-topic zoom">Division (Mixed Fractions)</button></Link>}                         */}
{/* 
            { loaded && <button onClick={() => {setCount('in')}} className="topic" >Inequality</button>}
            { count === 'in' && <Link href= {`/${id}/enter/Gl`}><button className="sub-topic zoom">Greater than less than</button></Link>} */}

           

            {/* { loaded && <button onClick={() => {setCount(7)}}  className="topic">Exponents/Power</button >}
            {  count === 7 &&<Link href= {`/${id}/enter/square`}><button className="sub-topic zoom">Square</button></Link>}
            {  count === 7 && <Link href= {`/${id}/enter/cube`}><button className="sub-topic zoom">Cube</button></Link>} */}

            {/* { loaded &&  <button onClick={() => {setCount(8)}}  className="topic">Roots</button >}
            {  count === 8 &&<Link href= {`/${id}/enter/squareRoots`}><button className="sub-topic zoom">Square roots</button></Link>}
            {  count === 8 && <Link href= {`/${id}/enter/cubeRoots`}><button className="sub-topic zoom">Cube roots</button></Link>} */}

            {/* { loaded && <button onClick={() => {setCount(9)}}  className="topic">Bedmas</button >}
            { count === 9 &&<Link href= {`/${id}/enter/Bedmas`}><button className="sub-topic zoom">Bedmas</button></Link>} */}
            
            {/* { loaded && <button onClick={() => {setCount(10)}}  className="topic">Algebra</button >}
            { count === 10 && <Link href= {`/${id}/enter/Algebra`}><button className="sub-topic zoom">One variable</button></Link>}
            { count === 10 && <Link href= {`/${id}/enter/likeTerm`}><button className="sub-topic zoom">Like terms</button></Link>}
            { count === 10 && <Link href= {`/${id}/enter/Algebra2`}><button className="sub-topic zoom">Two variable</button></Link>}
            { count === 10 && <Link href= {`/${id}/enter/Foil`}><button className="sub-topic zoom">Foil</button></Link>}
            { count === 10 && <Link href= {`/${id}/enter/Trinomial`}><button className="sub-topic zoom">Factor trinomial</button></Link>}
            { count === 10 && <Link href= {`/${id}/enter/Quadratic`}><button className="sub-topic zoom">Quadratic formula</button></Link>} */}

            
            {/* { loaded && <button onClick={() => {setCount('angle')}}  className="topic">Geometry</button >}
            { count === 'angle' &&<Link href= {`/${id}/enter/TypeAngle`}><button className="sub-topic zoom">Types of angle</button></Link>}
            { count === 'angle' &&<Link href= {`/${id}/enter/Perimeter`}><button className="sub-topic zoom">Perimeter</button></Link>}
            { count === 'angle' &&<Link href= {`/${id}/enter/Circumference`}><button className="sub-topic zoom">Circumference</button></Link>}
            { count === 'angle' &&<Link href= {`/${id}/enter/Area`}><button className="sub-topic zoom">Area</button></Link>} */}

            {/* { loaded && <button onClick={() => {setCount('log')}}  className="topic">Logarithms</button >}
            { count === 'log' &&<Link href= {`/${id}/enter/Logarithm`}><button className="sub-topic zoom">Logarithms</button></Link>} */}
        </div>     
    )
} 