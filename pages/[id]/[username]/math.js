import { useState ,useEffect, use } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import Link from "next/link";
import { useRouter } from "next/router";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";

export async function getServerSideProps(context) {
  
    return{
        props: {
        }
    }
}

export default function Math(Count){
    const [count, setCount] = useState(0)
    const [loaded, setLoaded] = useState(true)
    const router = useRouter()
    const {username} = router.query 
    const {id} = router.query 

    useEffect(()=>{
        const ID = window.localStorage.getItem('ID')
        if(!(ID === id)){
            router.push("/")
        }
    },[])

    return (
        <div className="beige menu" style={{height: '300vh',backgroundColor:'beige'}}>
            <h1 className="Faded" style={{marginLeft:'35px',paddingLeft:'15px',paddingTop:'15px', borderBottom: '2px solid black',width: '90px'}} >Math</h1>
            
            {loaded && <button onClick={() => {setCount(1)}} className="topic Faded">Addition</button >}
            { count === 1 && <Link href= {`/${id}/${username}/singleAdd`}><button className="sub-topic zoom">Single digit Addition</button></Link>}
            { count === 1 && <Link href= {`/${id}/${username}/doubleAdd`}><button className="sub-topic zoom">Double digit Addition</button></Link>}
            
            { loaded && <button onClick={() => {setCount(2)}}  className="topic Faded">Subtraction</button >}
            {  count === 2 &&<Link href= {`/${id}/${username}/singleMinus`}><button className="sub-topic zoom">Single digit Subtraction</button></Link>}
            {  count === 2 && <Link href= {`/${id}/${username}/doubleMinus`}><button className="sub-topic zoom">Double digit subtraction</button></Link>}

            { loaded && <button onClick={() => {setCount(3)}}  className="topic Faded">Multiplication</button >}
            {  count === 3 &&<Link href= {`/${id}/${username}/singleTimes`}><button className="sub-topic zoom">Single digit Multiplication</button></Link>}
            {   count === 3 && <Link href= {`/${id}/${username}/doubleTimes`}><button className="sub-topic zoom">Double digit Multiplication</button></Link>}

            { loaded && <button onClick={() => {setCount(4)}}  className="topic Faded">Division</button >}
            {  count === 4 &&<Link href= {`/${id}/${username}/longDivision`}><button className="sub-topic zoom">Long Division</button></Link>}

            { loaded && <button onClick={() => {setCount(5)}}  className="topic Faded">LCM & HCF</button >}
            {  count === 5 &&<Link href= {`/${id}/${username}/Lcm`}><button className="sub-topic zoom">Lowest Common Multiple</button></Link>}
            {  count === 5 && <Link href= {`/${id}/${username}/Hcf`}><button className="sub-topic zoom">Highest Common Factor</button></Link>}

            { loaded && <button onClick={() => {setCount('fraction')}}  className="topic Faded">Fractions</button >}
            {  count === 'fraction' &&<Link href= {`/${id}/${username}/Simplify`}><button className="sub-topic zoom">Simplify</button></Link>}
            {  count === 'fraction' &&<Link href= {`/${id}/${username}/Mixed`}><button className="sub-topic zoom">Mixed to Improper</button></Link>}
            {  count === 'fraction' && <Link href= {`/${id}/${username}/Improper`}><button className="sub-topic zoom">Improper to Mixed</button></Link>}            
            {  count === 'fraction' && <Link href= {`/${id}/${username}/ACD`}><button className="sub-topic zoom">Addition (common denominator)</button></Link>}            
            {  count === 'fraction' && <Link href= {`/${id}/${username}/AUD`}><button className="sub-topic zoom">Addition (uncommon denominator)</button></Link>}            
            {  count === 'fraction' && <Link href= {`/${id}/${username}/AMF`}><button className="sub-topic zoom">Addition (Mixed Fractions)</button></Link>}            
            {  count === 'fraction' && <Link href= {`/${id}/${username}/SCD`}><button className="sub-topic zoom">Subtraction (common denominator)</button></Link>}            
            {  count === 'fraction' && <Link href= {`/${id}/${username}/SMF`}><button className="sub-topic zoom">Subtraction (Mixed Fractions)</button></Link>}            
            {  count === 'fraction' && <Link href= {`/${id}/${username}/MPF`}><button className="sub-topic zoom">Multiplication (Proper Fractions)</button></Link>}            
            {  count === 'fraction' && <Link href= {`/${id}/${username}/MMF`}><button className="sub-topic zoom">Multiplication (Mixed Fractions)</button></Link>}
            {  count === 'fraction' && <Link href= {`/${id}/${username}/DPF`}><button className="sub-topic zoom">Division (Proper Fractions)</button></Link>}            
            {  count === 'fraction' && <Link href= {`/${id}/${username}/DMF`}><button className="sub-topic zoom">Division (Mixed Fractions)</button></Link>}                        

            { loaded && <button onClick={() => {setCount('in')}} className="topic Faded" >Inequality</button>}
            { count === 'in' && <Link href= {`/${id}/${username}/Gl`}><button className="sub-topic zoom">Greater than less than</button></Link>}

            { loaded && <button onClick={() => {setCount(6)}} className="topic Faded" >Mean Median & Mode</button>}
            { count === 6 && <Link href= {`/${id}/${username}/mean`}><button className="sub-topic zoom">Mean</button></Link>}
            { count === 6 && <Link href= {`/${id}/${username}/median`}><button className="sub-topic zoom ">Median</button></Link>}
            { count === 6 && <Link href= {`/${id}/${username}/mode`}><button className="sub-topic zoom" >Mode</button></Link>}

            { loaded && <button onClick={() => {setCount(7)}}  className="topic Faded">Exponents/Power</button >}
            {  count === 7 &&<Link href= {`/${id}/${username}/square`}><button className="sub-topic zoom">Square</button></Link>}
            {  count === 7 && <Link href= {`/${id}/${username}/cube`}><button className="sub-topic zoom">Cube</button></Link>}

            { loaded &&  <button onClick={() => {setCount(8)}}  className="topic Faded">Roots</button >}
            {  count === 8 &&<Link href= {`/${id}/${username}/squareRoots`}><button className="sub-topic zoom">Square roots</button></Link>}
            {  count === 8 && <Link href= {`/${id}/${username}/cubeRoots`}><button className="sub-topic zoom">Cube roots</button></Link>}

            { loaded && <button onClick={() => {setCount(9)}}  className="topic Faded">Bedmas</button >}
            { count === 9 &&<Link href= {`/${id}/${username}/Bedmas`}><button className="sub-topic zoom">Bedmas</button></Link>}
            
            { loaded && <button onClick={() => {setCount(10)}}  className="topic Faded">Algebra</button >}
            { count === 10 && <Link href= {`/${id}/${username}/Algebra`}><button className="sub-topic zoom">One variable</button></Link>}
            { count === 10 && <Link href= {`/${id}/${username}/likeTerm`}><button className="sub-topic zoom">Like terms</button></Link>}
            { count === 10 && <Link href= {`/${id}/${username}/Algebra2`}><button className="sub-topic zoom">Two variable</button></Link>}
            { count === 10 && <Link href= {`/${id}/${username}/Foil`}><button className="sub-topic zoom">Foil</button></Link>}
            { count === 10 && <Link href= {`/${id}/${username}/Trinomial`}><button className="sub-topic zoom">Factor trinomial</button></Link>}
            { count === 10 && <Link href= {`/${id}/${username}/Quadratic`}><button className="sub-topic zoom">Quadratic formula</button></Link>}

            
            { loaded && <button onClick={() => {setCount('angle')}}  className="topic Faded">Geometry</button >}
            { count === 'angle' &&<Link href= {`/${id}/${username}/TypeAngle`}><button className="sub-topic zoom">Types of angle</button></Link>}
            { count === 'angle' &&<Link href= {`/${id}/${username}/Perimeter`}><button className="sub-topic zoom">Perimeter</button></Link>}
            { count === 'angle' &&<Link href= {`/${id}/${username}/Circumference`}><button className="sub-topic zoom">Circumference</button></Link>}
            { count === 'angle' &&<Link href= {`/${id}/${username}/Area`}><button className="sub-topic zoom">Area</button></Link>}

            { loaded && <button onClick={() => {setCount('log')}}  className="topic Faded">Logarithm</button >}
            { count === 'log' &&<Link href= {`/${id}/${username}/Logarithm`}><button className="sub-topic zoom">Logarithm</button></Link>}
        </div>     
    )
} 