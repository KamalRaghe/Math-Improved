import { useState ,useEffect, use } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { set, remove, ref, push } from "firebase/database";
import { rdb } from "@/firebase";
import FeedBack from "@/components/feedback";
import ReccomedList from "@/components/recommedList";

export default function Math(){
    const [count, setCount] = useState(0)
    const [loaded, setLoaded] = useState(true)
    const [check, setCheck] = useState(false)
    const [open, setOpen] = useState(false)

    const router = useRouter() 
    
    const {id} = router.query 

    function Leave(){
        let room = window.localStorage.getItem('GameRoom')
        let host = window.localStorage.getItem('host')
        let id = window.localStorage.getItem('GameId')
        if(host  === 'Host'){
            const usersRef = ref(rdb, `${room}/`+'cancel')
            const AddList = push(usersRef)
            set(AddList,{
                time: 63000 + Date.now()
            }).then(
                remove(ref(rdb, `${room}/`))  
            ) 
        }else{
            remove(ref(rdb, `${room}/`+ id))
        }
             
    }

    function Leave(){
        let room = window.localStorage.getItem('GameRoom')
        let host = window.localStorage.getItem('host')
        let id = window.localStorage.getItem('GameId')
        if(host  === 'Host'){
            const usersRef = ref(rdb, `${room}/`+'cancel')
            const AddList = push(usersRef)
            set(AddList,{
                time: 63000 + Date.now()
            }).then(
                remove(ref(rdb, `${room}/`))  
            ) 
        }else{
            remove(ref(rdb, `${room}/`+ id))
        }
             
    }

    function close(){
        if(count){
            setCount(false)
        }
    }

    useEffect(()=>{
        const ID = window.localStorage.getItem('ID')
        let room = window.localStorage.getItem('GameRoom')
        let cheat = window.localStorage.getItem(`${id} cheatTime`) 
        if(!cheat){
            window.localStorage.setItem(`${id} cheatTime`,new Date())
        }
        if(room){
            Leave()
            window.localStorage.setItem('GameRoom', '')
        }
        if(!(ID === id)){
            router.push("/")
        }
    },[])

    return (
        <div style={{width:"96%"}} onClick={close} >
            {check && <FeedBack close={()=>{setCheck(false);console.log("Feedback closed")}} />}
            <div style={{display:"flex",justifyContent:'space-between'}} >
                <h1 style={{padding:'5px',paddingTop:'15px', borderBottom: '2px solid black',width: '10Opx',height:"37px",position:"relative",bottom:"-10px"}}>Match</h1><div>
                </div>
                <div>
                    <button className="sub-topic " onClick={()=>{setCheck(true)}} style={{marginRight:"5px",zIndex:1000,color:'transparent',backgroundColor:'transparent',border:'none'}} >Feedback</button>
                    <button className="sub-topic" onClick={()=>{setCheck(true)}} style={{marginRight:"5px",position:"relative",left:"6px",color:'transparent',backgroundColor:'transparent',border:'none'}} >Session</button>
         </div>
            </div>
            <button onClick={()=>{router.push('/create')}} className="sub-topic green" style={{padding:"8px 43px",position:"relative",bottom:"55px"}} >Host</button>
            <button onClick={()=>{router.push('/Enter')}} className="sub-topic green" style={{padding:"8px 43px",position:"relative",bottom:"55px"}} >Join</button>
            
            <div style={{position:"relative",bottom:"55px"}} >
            <div style={{paddingBottom:"10px",margin:"0px"}} >
                 <h1 style={{borderBottom: '2px solid black',width: '125px'}} >Practice</h1>
                <span onClick={()=>{setCheck(true)}} style={{display:'flex',justifyContent:'start',position:"relative",left:"62px",top:"-10px",zIndex:1000,cursor:"pointer"}} >Feedback</span > 
                <div style={{color:"navy",display:"flex",justifyContent:"start",color:"navy",cursor:"pointer"}} onClick={()=>{setOpen(true)}} >
                    View Recommended Topic
                </div>
            </div>
            {open && <div><ReccomedList close={()=>setOpen(false)} /></div>}
            {loaded && <button onClick={() => {setCount(1)}} className="topic">Addition</button>}
            { count === 1 && <div className = 'center' style={{justifyContent:" start",margin:"0",padding:"0",display:"flex"}} >
                <Link href= {`/${id}/enter/subMenu`}>
                <button className="sub-topic zoom" style={{margin:"0 8px 0 40px"}}>Single digit Addition</button></Link> 
                 <span> ⭐ </span>
                 <span className ='zoom' style={{color:"purple",margin:"2px"}}>Recommended</span>
            </div>}
            { count === 1 && <Link href= {`/${id}/enter/doubleAdd`}><button className="sub-topic zoom" style ={{bottom:"60px"}} >Double digit Addition</button></Link>}
            
            { loaded && <button onClick={() => {setCount(2)}}  className="topic">Subtraction</button >}
            {  count === 2 &&
                <Link href= {`/${id}/enter/subMenuMinus`} style={{display:"flex",justifyContent:"start",alignItems:"center"}} >
                    <button className="sub-topic zoom" style={{margin:"0 8px 0 40px"}}>Single digit Subtraction</button>
                    <span> ⭐ </span>
                 <span className ='zoom' style={{color:"purple",margin:"2px"}}>Recommended</span>
                </Link>}
            {  count === 2 && <Link href= {`/${id}/enter/doubleMinus`}><button className="sub-topic zoom">Double digit subtraction</button></Link>}

            { loaded && <button onClick={() => {setCount(3)}}  className="topic">Multiplication</button >}
            {  count === 3 &&<Link href= {`/${id}/enter/subMenuTimes`} style={{display:"flex",justifyContent:"start",alignItems:"center"}}>
                    <button className="sub-topic zoom" style={{margin:"0 8px 0 40px"}}>Single digit Multiplication</button>
                    <span> ⭐ </span>
                    <span className ='zoom' style={{color:"purple",margin:"2px"}}>Recommended </span>
                </Link>}
            {   count === 3 && <Link href= {`/${id}/enter/doubleTimes`}><button className="sub-topic zoom">Double digit Multiplication</button></Link>}

            { loaded && <button onClick={() => {setCount(4)}}  className="topic">Division</button >}
            {  count === 4 &&<Link href= {`/${id}/enter/subMenuDiv`} style={{display:"flex",justifyContent:"start",alignItems:"center"}}>
                    <button className="sub-topic zoom" style={{margin:"0 8px 0 40px"}}>Short Division</button>
                    <span> ⭐ </span>
                    <span className ='zoom' style={{color:"purple",margin:"2px"}}>Recommended </span>
                </Link>}
            {  count === 4 &&<Link href= {`/${id}/enter/longDivision`}><button className="sub-topic zoom">Long Division</button></Link>}

            { loaded && <button onClick={() => {setCount(5)}}  className="topic">LCM & HCF</button >}
            {  count === 5 &&<Link href= {`/${id}/enter/Lcm`}><button className="sub-topic zoom">Lowest Common Multiple</button></Link>}
            {  count === 5 && <Link href= {`/${id}/enter/Hcf`}><button className="sub-topic zoom">Highest Common Factor</button></Link>}

            { loaded && <button onClick={() => {setCount('fraction')}}  className="topic">Fractions</button >}
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
            {  count === 'fraction' && <Link href= {`/${id}/enter/DMF`}><button className="sub-topic zoom">Division (Mixed Fractions)</button></Link>}                        

            { loaded && <button onClick={() => {setCount('in')}} className="topic" >Inequality</button>}
            { count === 'in' && <Link href= {`/${id}/enter/Gl`}><button className="sub-topic zoom">Greater than less than</button></Link>}

            { loaded && <button onClick={() => {setCount(6)}} className="topic" >Mean Median & Mode</button>}
            { count === 6 && <Link href= {`/${id}/enter/mean`}><button className="sub-topic zoom">Mean</button></Link>}
            { count === 6 && <Link href= {`/${id}/enter/median`}><button className="sub-topic zoom ">Median</button></Link>}
            { count === 6 && <Link href= {`/${id}/enter/mode`}><button className="sub-topic zoom" >Mode</button></Link>}

            { loaded && <button onClick={() => {setCount(7)}}  className="topic">Exponents/Power</button >}
            {  count === 7 &&<Link href= {`/${id}/enter/square`}><button className="sub-topic zoom">Square</button></Link>}
            {  count === 7 && <Link href= {`/${id}/enter/cube`}><button className="sub-topic zoom">Cube</button></Link>}

            { loaded &&  <button onClick={() => {setCount(8)}}  className="topic">Roots</button >}
            {  count === 8 &&<Link href= {`/${id}/enter/squareRoots`}><button className="sub-topic zoom">Square roots</button></Link>}
            {  count === 8 && <Link href= {`/${id}/enter/cubeRoots`}><button className="sub-topic zoom">Cube roots</button></Link>}

            { loaded && <button onClick={() => {setCount(9)}}  className="topic">Bedmas</button >}
            { count === 9 &&<Link href= {`/${id}/enter/Bedmas`}><button className="sub-topic zoom">Bedmas</button></Link>}
            
            { loaded && <button onClick={() => {setCount(10)}}  className="topic">Algebra</button >}
            { count === 10 && <Link href= {`/${id}/enter/Algebra`} style={{display:"flex",justifyContent:"start",alignItems:"center"}}>
                    <button className="sub-topic zoom" style={{margin:"0 8px 0 40px"}}>One variable</button>
                    <span> ⭐ </span>
                    <span className ='zoom' style={{color:"purple",margin:"2px"}}>Recommended </span>
                </Link>}
            { count === 10 && <Link href= {`/${id}/enter/likeTerm`}><button className="sub-topic zoom">Like terms</button></Link>}
            { count === 10 && <Link href= {`/${id}/enter/Algebra2`}><button className="sub-topic zoom">Two variable</button></Link>}
            { count === 10 && <Link href= {`/${id}/enter/Foil`}><button className="sub-topic zoom">Foil</button></Link>}
            { count === 10 && <Link href= {`/${id}/enter/Trinomial`}><button className="sub-topic zoom">Factor trinomial</button></Link>}
            { count === 10 && <Link href= {`/${id}/enter/Quadratic`}><button className="sub-topic zoom">Quadratic formula</button></Link>}

            
            { loaded && <button onClick={() => {setCount('angle')}}  className="topic">Geometry</button >}
            { count === 'angle' &&<Link href= {`/${id}/enter/TypeAngle`}><button className="sub-topic zoom">Types of angle</button></Link>}
            { count === 'angle' &&<Link href= {`/${id}/enter/Perimeter`}><button className="sub-topic zoom">Perimeter</button></Link>}
            { count === 'angle' &&<Link href= {`/${id}/enter/Circumference`}><button className="sub-topic zoom">Circumference</button></Link>}
            { count === 'angle' &&<Link href= {`/${id}/enter/Area`}><button className="sub-topic zoom">Area</button></Link>}

            { loaded && <button onClick={() => {setCount('log')}}  className="topic">Logarithms</button >}
            { count === 'log' &&<Link href= {`/${id}/enter/Logarithm`}><button className="sub-topic zoom">Logarithms</button></Link>}

            { loaded && <button onClick={() => {setCount('fun')}}  className="topic">Function</button >}
            { count === 'fun' &&<Link href= {`/${id}/enter/slope`}><button className="sub-topic zoom">Slope</button></Link>}
            { count === 'fun' &&<Link href= {`/${id}/enter/solveB`}><button className="sub-topic zoom">Solve for b</button></Link>}

            { loaded && <button onClick={() => {setCount('loge')}}  className="topic">Calculus</button >}
             { count === 'loge' &&<Link href= {`/${id}/enter/limits`} style={{display:"flex",justifyContent:"start",alignItems:"center"}} >
                    <button className="sub-topic zoom" style={{margin:'10px 8px 10px 40px',}}>Intro to limits</button>
                    <span> ⭐ </span>
                    <span className ='zoom' style={{color:"purple",margin:"2px"}}>Recommended </span>
                </Link>}
             { count === 'loge' &&<Link href= {`/${id}/enter/derivatives`} style={{display:"flex",justifyContent:"start",alignItems:"center"}} >
                    <button className="sub-topic zoom" style={{margin:'10px 8px 10px 40px',}}>Intro to derivatives</button>
                    <span> ⭐ </span>
                    <span className ='zoom' style={{color:"purple",margin:"2px"}}>Recommended </span>
                </Link>}
             { count === 'loge' &&<Link href= {`/${id}/enter/intergal`} style={{display:"flex",justifyContent:"start",alignItems:"center"}} >
                    <button className="sub-topic zoom" style={{margin:'10px 8px 10px 40px',}}>Intro to integral</button>
                    <span> ⭐ </span>
                    <span className ='zoom' style={{color:"purple",margin:"2px"}}>Recommended </span>
                </Link>}
            </div>
        </div>     
    )
} 