import { useEffect} from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export async function getServerSideProps(context){
    return{
        props: {
        }
    }
}

export default function DoubleAdd({Count}){
    const router = useRouter() 
    const {id} = router.query 

    useEffect(()=>{
        const ID = window.localStorage.getItem('ID')
        if(!(ID === id)){
            router.push("/")
        }
    },[])

   

    return(
        <div className="beige container column" style ={{justifyContent:'start'}} >
            <div className="menu">
           <div className="column" style ={{fontSize:"30px"}}>
                <div>Addition</div>
                <Link className="font sb" style ={{color: 'blue',textDecoration:'underline'}} href= {`/${id}/enter/singleAdd`}>Single digit Addition: {parseInt(window.localStorage.getItem(`singleAdd ${id}`)) ? parseInt(window.localStorage.getItem(`singleAdd ${id}`)): 0}</Link><br></br>
                <Link className="font sb" style ={{color: 'blue',textDecoration:'underline'}} href= {`/${id}/enter/doubleAdd`}>Double digit Addition: {parseInt(window.localStorage.getItem(`${id} DoubleAdd`)) ? parseInt(window.localStorage.getItem(`${id} DoubleAdd`)): 0}</Link>
           </div>
           <br></br>
           <div className="  column" style ={{fontSize:"30px"}}>
                <div>Subtraction</div>
                <Link className="font sb" style ={{color: 'blue',textDecoration:'underline'}} href= {`/${id}/enter/singleMinus`}>Single digit Subtraction: {parseInt(window.localStorage.getItem(`${id} singleMinus`)) ? parseInt(window.localStorage.getItem(`${id} singleMinus`)): 0}</Link><br></br>
                <Link className="font sb" style ={{color: 'blue',textDecoration:'underline'}} href= {`/${id}/enter/doubleMinus`}>Double digit subtraction: {parseInt(window.localStorage.getItem(`${id} DoubleMinus`)) ? parseInt(window.localStorage.getItem(`${id} DoubleMinus`)): 0}</Link>
           </div>
           <br></br>
   
           <div className=" column" style ={{fontSize:"30px"}}>
                <div>Multiplication</div>
                <Link className="font sb" style ={{color: 'blue',textDecoration:'underline'}} href= {`/${id}/enter/singleTimes`}>Single digit Multiplication: {parseInt(window.localStorage.getItem(`${id} singleTimes`)) ? parseInt(window.localStorage.getItem(`${id} singleTimes`)): 0}</Link><br></br>
                <Link className="font sb" style ={{color: 'blue',textDecoration:'underline'}} href= {`/${id}/enter/doubleTimes`}> Double digit Multiplication: {parseInt(window.localStorage.getItem(`${id} DoubleTimes`)) ? parseInt(window.localStorage.getItem(`${id} DoubleTimes`)): 0}</Link>
           </div>
            <br></br>

           <div className=" column" style ={{fontSize:"30px"}}>
                <div>Division</div>
                <Link className="font sb" style ={{color: 'blue',textDecoration:'underline'}} href= {`/${id}/enter/longDivision`}>Long Division: {parseInt(window.localStorage.getItem(`${id} longDivision`)) ? parseInt(window.localStorage.getItem(`${id} longDivision`)): 0}</Link><br></br>
           </div>
           <br></br>

           <div className=" column" style ={{fontSize:"30px"}}>
                <div>LCM & HCF</div>
                <Link className="font sb" style ={{color: 'blue',textDecoration:'underline'}} href= {`/${id}/enter/Lcm`}>Lowest Common Multiple: {parseInt(window.localStorage.getItem(`${id} Lcm`)) ? parseInt(window.localStorage.getItem(`${id} Lcm`)): 0}</Link><br></br>
                <Link className="font sb" style ={{color: 'blue',textDecoration:'underline'}} href= {`/${id}/enter/Hcf`}>Highest Common Factor: {parseInt(window.localStorage.getItem(`${id} Hcf`)) ? parseInt(window.localStorage.getItem(`${id} Hcf`)): 0}</Link>
           </div>
            <br></br>

            <div className="column" style ={{fontSize:"30px"}}>
                <div>Fractions</div>
                <Link className="font sb" style ={{color: 'blue',textDecoration:'underline'}} href= {`/${id}/enter/Simplify`}>Simplify: {parseInt(window.localStorage.getItem(`${id} simplify`)) ? parseInt(window.localStorage.getItem(`${id} simplify`)): 0}</Link><br></br>
                <Link className="font sb" style ={{color: 'blue',textDecoration:'underline'}} href= {`/${id}/enter/Mixed`}>Mixed to Improper: {parseInt(window.localStorage.getItem(`${id} Mixed`)) ? parseInt(window.localStorage.getItem(`${id} Mixed`)): 0}</Link><br></br>
                <Link className="font sb" style ={{color: 'blue',textDecoration:'underline'}} href= {`/${id}/enter/Improper`}>Improper to Mixed: {parseInt(window.localStorage.getItem(`${id} improper`)) ? parseInt(window.localStorage.getItem(`${id} improper`)): 0}</Link><br></br>
                <Link className="font sb" style ={{color: 'blue',textDecoration:'underline'}} href= {`/${id}/enter/ACD`}>Addition common denominator: {parseInt(window.localStorage.getItem(`${id} ACD`)) ? parseInt(window.localStorage.getItem(`${id} ACD`)): 0}</Link><br></br>
                <Link className="font sb" style ={{color: 'blue',textDecoration:'underline'}} href= {`/${id}/enter/AUD`}>Addition uncommon denominator: {parseInt(window.localStorage.getItem(`${id} AUD`)) ? parseInt(window.localStorage.getItem(`${id} AUD`)): 0}</Link><br></br>
                <Link className="font sb" style ={{color: 'blue',textDecoration:'underline'}} href= {`/${id}/enter/AMF`}>Addition Mixed Fractions: {parseInt(window.localStorage.getItem(`${id} AMF`)) ? parseInt(window.localStorage.getItem(`${id} AMF`)): 0}</Link><br></br>
                <Link className="font sb" style ={{color: 'blue',textDecoration:'underline'}} href= {`/${id}/enter/SCD`}>Subtraction common denominator: {parseInt(window.localStorage.getItem(`${id} SCD`)) ? parseInt(window.localStorage.getItem(`${id} SCD`)): 0}</Link><br></br>
                <Link className="font sb" style ={{color: 'blue',textDecoration:'underline'}} href= {`/${id}/enter/SMF`} >Subtraction Mixed Fractions: {parseInt(window.localStorage.getItem(`${id} SMF`)) ? parseInt(window.localStorage.getItem(`${id} SMF`)): 0}</Link><br></br>
                <Link className="font sb" style ={{color: 'blue',textDecoration:'underline'}} href= {`/${id}/enter/MPF`}>Multiplication Proper Fractions: {parseInt(window.localStorage.getItem(`${id} MPF`)) ? parseInt(window.localStorage.getItem(`${id} MPF`)): 0}</Link><br></br>
                <Link className="font sb" style ={{color: 'blue',textDecoration:'underline'}} href= {`/${id}/enter/MMF`}>Multiplication Mixed Fractions: {parseInt(window.localStorage.getItem(`${id} MMF`)) ? parseInt(window.localStorage.getItem(`${id} MMF`)): 0}</Link><br></br>
                <Link className="font sb" style ={{color: 'blue',textDecoration:'underline'}} href= {`/${id}/enter/DPF`}>Division Proper Fractions: {parseInt(window.localStorage.getItem(`${id} DPF`)) ? parseInt(window.localStorage.getItem(`${id} DPF`)): 0} </Link><br></br>
                <Link className="font sb" style ={{color: 'blue',textDecoration:'underline'}} href= {`/${id}/enter/DMF`}>Division Mixed Fractions: {parseInt(window.localStorage.getItem(`${id} DMF`)) ? parseInt(window.localStorage.getItem(`${id} DMF`)): 0}</Link>
           </div>
            <br></br>                                                        
                               

            <div className=" column" style ={{fontSize:"30px"}}>
                <div>Inequality</div>
                <Link className="font sb" style ={{color: 'blue',textDecoration:'underline'}} href= {`/${id}/enter/Gl`}>Greater than less than: {parseInt(window.localStorage.getItem(`${id} Gl`)) ? parseInt(window.localStorage.getItem(`${id} Gl`)): 0}</Link><br></br>
           </div>
           <br></br>

           <div className=" column" style ={{fontSize:"30px"}}>
                <div>Mean Median & Mode</div>
                <Link className="font sb" style ={{color: 'blue',textDecoration:'underline'}} href= {`/${id}/enter/mean`}>Mean: {parseInt(window.localStorage.getItem(`${id} Mean`)) ? parseInt(window.localStorage.getItem(`${id} Mean`)): 0}</Link><br></br>
                <Link className="font" style ={{color: 'blue',textDecoration:'underline'}} href= {`/${id}/enter/median`}>Median: {parseInt(window.localStorage.getItem(`${id} Median`)) ? parseInt(window.localStorage.getItem(`${id} Median`)): 0}</Link><br></br>
                <Link className="font" style ={{color: 'blue',textDecoration:'underline'}} href= {`/${id}/enter/mode`}>Mode: {parseInt(window.localStorage.getItem(`${id} Mode`)) ? parseInt(window.localStorage.getItem(`${id} Mode`)): 0}</Link>
           </div>
           <br></br>

           <div className=" column" style ={{fontSize:"30px"}}>
                <div>Exponents/Power</div>
                <Link className="font" style ={{color: 'blue',textDecoration:'underline'}} href= {`/${id}/enter/square`}>Square: {parseInt(window.localStorage.getItem(`${id} Square`)) ? parseInt(window.localStorage.getItem(`${id} Square`)): 0}</Link><br></br>
                <Link className="font" style ={{color: 'blue',textDecoration:'underline'}} href= {`/${id}/enter/cube`}>Cube: {parseInt(window.localStorage.getItem(`${id} Cube`)) ? parseInt(window.localStorage.getItem(`${id} Cube`)): 0}</Link>
           </div>
           <br></br>

           

            <div className=" column" style ={{fontSize:"30px"}}>
                <div>Roots</div>
                <Link className="font" style ={{color: 'blue',textDecoration:'underline'}} href= {`/${id}/enter/squareRoots`}>Square roots: {parseInt(window.localStorage.getItem(`${id} Square Root`)) ? parseInt(window.localStorage.getItem(`${id} Square Root`)): 0}</Link><br></br>
                <Link className="font" style ={{color: 'blue',textDecoration:'underline'}} href= {`/${id}/enter/cubeRoots`}>Cube roots: {parseInt(window.localStorage.getItem(`${id} Cube Root`)) ? parseInt(window.localStorage.getItem(`${id} Cube Root`)): 0}</Link>
            </div>
           <br></br>

           <div className=" column" style ={{fontSize:"30px"}}>
                <div>Bedmas</div>
                <Link className="font" style ={{color: 'blue',textDecoration:'underline'}} href= {`/${id}/enter/Bedmas`}>Bedmas: {parseInt(window.localStorage.getItem(`${id} Bedmas`)) ? parseInt(window.localStorage.getItem(`${id} Bedmas`)): 0}</Link>
            </div>
           <br></br>

           <div className=" column" style ={{fontSize:"30px"}}>
                <div>Algebra</div>
                <Link className="font" style ={{color: 'blue',textDecoration:'underline'}} href= {`/${id}/enter/Algebra`}>One variable: {parseInt(window.localStorage.getItem(`${id} Algebra`)) ? parseInt(window.localStorage.getItem(`${id} Algebra`)): 0}</Link><br></br>
                <Link className="font" style ={{color: 'blue',textDecoration:'underline'}} href= {`/${id}/enter/likeTerm`}>Like terms: {parseInt(window.localStorage.getItem(`${id} Like terms`)) ? parseInt(window.localStorage.getItem(`${id} Like terms`)): 0}</Link><br></br>
                <Link className="font" style ={{color: 'blue',textDecoration:'underline'}} href= {`/${id}/enter/Algebra2`}>Two variable: {parseInt(window.localStorage.getItem(`${id} Two Variable`)) ? parseInt(window.localStorage.getItem(`${id} Two Variable`)): 0}</Link><br></br>
                <Link className="font" style ={{color: 'blue',textDecoration:'underline'}} href= {`/${id}/enter/Foil`}>Foil: {parseInt(window.localStorage.getItem(`${id} Foil`)) ? parseInt(window.localStorage.getItem(`${id} Foil`)): 0}</Link><br></br>
                <Link className="font" style ={{color: 'blue',textDecoration:'underline'}} href= {`/${id}/enter/Trinomial`}>Factor trinomial: {parseInt(window.localStorage.getItem(`${id} Factor Trinomial`)) ? parseInt(window.localStorage.getItem(`${id} Factor Trinomial`)): 0}</Link><br></br>
                <Link className="font" style ={{color: 'blue',textDecoration:'underline'}} href= {`/${id}/enter/Quadratic`}>Quadratic formula: {parseInt(window.localStorage.getItem(`${id} Quadratic Formula`)) ? parseInt(window.localStorage.getItem(`${id} Quadratic Formula`)): 0}</Link><br></br>
            </div>
           <br></br>

           
            <div className=" column" style ={{fontSize:"30px"}}>
                <div>Geometry</div>
                <Link className="font sb" style ={{color: 'blue',textDecoration:'underline'}} href= {`/${id}/enter/TypeAngle`}>Types of angle: {parseInt(window.localStorage.getItem(`${id} Type of Angle`)) ? parseInt(window.localStorage.getItem(`${id} Type of Angle`)): 0}</Link><br></br>
                <Link className="font sb" style ={{color: 'blue',textDecoration:'underline'}} href= {`/${id}/enter/Perimeter`}>Perimeter: {parseInt(window.localStorage.getItem(`${id} Perimeter`)) ? parseInt(window.localStorage.getItem(`${id} Perimeter`)): 0}</Link><br></br>
                <Link className="font sb" style ={{color: 'blue',textDecoration:'underline'}} href= {`/${id}/enter/Circumference`}>Circumference: {parseInt(window.localStorage.getItem(`${id} Circumference`)) ? parseInt(window.localStorage.getItem(`${id} Circumference`)): 0}</Link><br></br>
                <Link className="font sb " style ={{color: 'blue',textDecoration:'underline'}} href= {`/${id}/enter/Area`}>Area: {parseInt(window.localStorage.getItem(`${id} Area`)) ? parseInt(window.localStorage.getItem(`${id} Area`)): 0}</Link>
           </div>
           <br></br>

            <div className=" column" style ={{fontSize:"30px"}}>
                <div>Logarithms</div>
                <Link className="font sb" style ={{color: 'blue',textDecoration:'underline'}} href= {`/${id}/enter/Logarithm`}>Logarithms: {parseInt(window.localStorage.getItem(`${id} Logarithm`)) ? parseInt(window.localStorage.getItem(`${id} Logarithm`)): 0}</Link><br></br>
           </div>
           <br></br>
           </div> 
        </div>
    )
}