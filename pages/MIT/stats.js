import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function DoubleAdd(){
    const router = useRouter();
    const { id } = router.query;

    const [localStorageAvailable, setLocalStorageAvailable] = useState(false);

    function stats(topic){
        parseInt(window.localStorage.getItem(`${id} ${topic}`))
    }

    useEffect(() => {
        setLocalStorageAvailable(typeof window !== "undefined" && window.localStorage);
    }, []);


    return(
                <div className="beige container column" style ={{justifyContent:'start'}} >
                    <div className="menu">
                   <div className="column" style ={{fontSize:"30px"}}>
                        <div>Addition</div>
                        <Link className="font sb" style ={{color: 'blue',textDecoration:'underline'}} href= {`/MIT/singleAdd`}>Single digit Addition: { localStorageAvailable && parseInt(window.localStorage.getItem(`singleAdd ${id}`)) ? parseInt(window.localStorage.getItem(`singleAdd ${id}`)): 0}</Link><br></br>
                        <Link className="font sb" style ={{color: 'blue',textDecoration:'underline'}} href= {`/MIT/doubleAdd`}>Double digit Addition: { localStorageAvailable && parseInt(window.localStorage.getItem(`${id} DoubleAdd`)) ? parseInt(window.localStorage.getItem(`${id} DoubleAdd`)): 0}</Link>
                   </div>
                   <br></br>
                   <div className="  column" style ={{fontSize:"30px"}}>
                        <div>Subtraction</div>
                        <Link className="font sb" style ={{color: 'blue',textDecoration:'underline'}} href= {`/MIT/singleMinus`}>Single digit Subtraction: { localStorageAvailable && parseInt(window.localStorage.getItem(`${id} singleMinus`)) ? parseInt(window.localStorage.getItem(`${id} singleMinus`)): 0}</Link><br></br>
                        <Link className="font sb" style ={{color: 'blue',textDecoration:'underline'}} href= {`/MIT/doubleMinus`}>Double digit subtraction: {  localStorageAvailable && parseInt(window.localStorage.getItem(`${id} DoubleMinus`)) ? parseInt(window.localStorage.getItem(`${id} DoubleMinus`)): 0}</Link>
                   </div>
                   <br></br>
           
                   <div className=" column" style ={{fontSize:"30px"}}>
                        <div>Multiplication</div>
                        <Link className="font sb" style ={{color: 'blue',textDecoration:'underline'}} href= {`/MIT/singleTimes`}>Single digit Multiplication: { localStorageAvailable && parseInt(window.localStorage.getItem(`${id} singleTimes`)) ? parseInt(window.localStorage.getItem(`${id} singleTimes`)): 0}</Link><br></br>
                        <Link className="font sb" style ={{color: 'blue',textDecoration:'underline'}} href= {`/MIT/doubleTimes`}> Double digit Multiplication: { localStorageAvailable && parseInt(window.localStorage.getItem(`${id} DoubleTimes`)) ? parseInt(window.localStorage.getItem(`${id} DoubleTimes`)): 0}</Link>
                   </div>
                    <br></br>
        
                   <div className=" column" style ={{fontSize:"30px"}}>
                        <div>Division</div>
                        <Link className="font sb" style ={{color: 'blue',textDecoration:'underline'}} href= {`/MIT/longDivision`}>Long Division: { localStorageAvailable && parseInt(window.localStorage.getItem(`${id} longDivision`)) ? parseInt(window.localStorage.getItem(`${id} longDivision`)): 0}</Link><br></br>
                   </div>
                   <br></br>
        
                   <div className=" column" style ={{fontSize:"30px"}}>
                        <div>LCM & HCF</div>
                        <Link className="font sb" style ={{color: 'blue',textDecoration:'underline'}} href= {`/MIT/Lcm`}>Lowest Common Multiple: { localStorageAvailable && parseInt(window.localStorage.getItem(`${id} Lcm`)) ? parseInt(window.localStorage.getItem(`${id} Lcm`)): 0}</Link><br></br>
                        <Link className="font sb" style ={{color: 'blue',textDecoration:'underline'}} href= {`/MIT/Hcf`}>Highest Common Factor: { localStorageAvailable && parseInt(window.localStorage.getItem(`${id} Hcf`)) ? parseInt(window.localStorage.getItem(`${id} Hcf`)): 0}</Link>
                   </div>
                    <br></br>
        
                    <div className="column" style ={{fontSize:"30px"}}>
                        <div>Fractions</div>
                        <Link className="font sb" style ={{color: 'blue',textDecoration:'underline'}} href= {`/MIT/Simplify`}>Simplify: { localStorageAvailable && parseInt(window.localStorage.getItem(`${id} simplify`)) ? parseInt(window.localStorage.getItem(`${id} simplify`)): 0}</Link><br></br>
                        <Link className="font sb" style ={{color: 'blue',textDecoration:'underline'}} href= {`/MIT/Mixed`}>Mixed to Improper: { localStorageAvailable && parseInt(window.localStorage.getItem(`${id} Mixed`)) ? parseInt(window.localStorage.getItem(`${id} Mixed`)): 0}</Link><br></br>
                        <Link className="font sb" style ={{color: 'blue',textDecoration:'underline'}} href= {`/MIT/Improper`}>Improper to Mixed: { localStorageAvailable && parseInt(window.localStorage.getItem(`${id} improper`)) ? parseInt(window.localStorage.getItem(`${id} improper`)): 0}</Link><br></br>
                        <Link className="font sb" style ={{color: 'blue',textDecoration:'underline'}} href= {`/MIT/ACD`}>Addition common denominator: { localStorageAvailable && parseInt(window.localStorage.getItem(`${id} ACD`)) ? parseInt(window.localStorage.getItem(`${id} ACD`)): 0}</Link><br></br>
                        <Link className="font sb" style ={{color: 'blue',textDecoration:'underline'}} href= {`/MIT/AUD`}>Addition uncommon denominator: { localStorageAvailable && parseInt(window.localStorage.getItem(`${id} AUD`)) ? parseInt(window.localStorage.getItem(`${id} AUD`)): 0}</Link><br></br>
                        <Link className="font sb" style ={{color: 'blue',textDecoration:'underline'}} href= {`/MIT/AMF`}>Addition Mixed Fractions: {  localStorageAvailable && parseInt(window.localStorage.getItem(`${id} AMF`)) ? parseInt(window.localStorage.getItem(`${id} AMF`)): 0}</Link><br></br>
                        <Link className="font sb" style ={{color: 'blue',textDecoration:'underline'}} href= {`/MIT/SCD`}>Subtraction common denominator: { localStorageAvailable && parseInt(window.localStorage.getItem(`${id} SCD`)) ? parseInt(window.localStorage.getItem(`${id} SCD`)): 0}</Link><br></br>
                        <Link className="font sb" style ={{color: 'blue',textDecoration:'underline'}} href= {`/MIT/SMF`} >Subtraction Mixed Fractions: { localStorageAvailable && parseInt(window.localStorage.getItem(`${id} SMF`)) ? parseInt(window.localStorage.getItem(`${id} SMF`)): 0}</Link><br></br>
                        <Link className="font sb" style ={{color: 'blue',textDecoration:'underline'}} href= {`/MIT/MPF`}>Multiplication Proper Fractions: { localStorageAvailable && parseInt(window.localStorage.getItem(`${id} MPF`)) ? parseInt(window.localStorage.getItem(`${id} MPF`)): 0}</Link><br></br>
                        <Link className="font sb" style ={{color: 'blue',textDecoration:'underline'}} href= {`/MIT/MMF`}>Multiplication Mixed Fractions: { localStorageAvailable && parseInt(window.localStorage.getItem(`${id} MMF`)) ? parseInt(window.localStorage.getItem(`${id} MMF`)): 0}</Link><br></br>
                        <Link className="font sb" style ={{color: 'blue',textDecoration:'underline'}} href= {`/MIT/DPF`}>Division Proper Fractions: { localStorageAvailable && parseInt(window.localStorage.getItem(`${id} DPF`)) ? parseInt(window.localStorage.getItem(`${id} DPF`)): 0} </Link><br></br>
                        <Link className="font sb" style ={{color: 'blue',textDecoration:'underline'}} href= {`/MIT/DMF`}>Division Mixed Fractions: { localStorageAvailable && parseInt(window.localStorage.getItem(`${id} DMF`)) ? parseInt(window.localStorage.getItem(`${id} DMF`)): 0}</Link>
                   </div>
                    <br></br>                                                        
                                       
        
                    <div className=" column" style ={{fontSize:"30px"}}>
                        <div>Inequality</div>
                        <Link className="font sb" style ={{color: 'blue',textDecoration:'underline'}} href= {`/MIT/Gl`}>Greater than less than: { localStorageAvailable && parseInt(window.localStorage.getItem(`${id} Gl`)) ? parseInt(window.localStorage.getItem(`${id} Gl`)): 0}</Link><br></br>
                   </div>
                   <br></br>
        
                   <div className=" column" style ={{fontSize:"30px"}}>
                        <div>Mean Median & Mode</div>
                        <Link className="font sb" style ={{color: 'blue',textDecoration:'underline'}} href= {`/MIT/mean`}>Mean: { localStorageAvailable && parseInt(window.localStorage.getItem(`${id} Mean`)) ? parseInt(window.localStorage.getItem(`${id} Mean`)): 0}</Link><br></br>
                        <Link className="font" style ={{color: 'blue',textDecoration:'underline'}} href= {`/MIT/median`}>Median: { localStorageAvailable && parseInt(window.localStorage.getItem(`${id} Median`)) ? parseInt(window.localStorage.getItem(`${id} Median`)): 0}</Link><br></br>
                        <Link className="font" style ={{color: 'blue',textDecoration:'underline'}} href= {`/MIT/mode`}>Mode: { localStorageAvailable && parseInt(window.localStorage.getItem(`${id} Mode`)) ? parseInt(window.localStorage.getItem(`${id} Mode`)): 0}</Link>
                   </div>
                   <br></br>
        
                   <div className=" column" style ={{fontSize:"30px"}}>
                        <div>Exponents/Power</div>
                        <Link className="font" style ={{color: 'blue',textDecoration:'underline'}} href= {`/MIT/square`}>Square: { localStorageAvailable && parseInt(window.localStorage.getItem(`${id} Square`)) ? parseInt(window.localStorage.getItem(`${id} Square`)): 0}</Link><br></br>
                        <Link className="font" style ={{color: 'blue',textDecoration:'underline'}} href= {`/MIT/cube`}>Cube: { localStorageAvailable && parseInt(window.localStorage.getItem(`${id} Cube`)) ? parseInt(window.localStorage.getItem(`${id} Cube`)): 0}</Link>
                   </div>
                   <br></br>
        
                   
        
                    <div className=" column" style ={{fontSize:"30px"}}>
                        <div>Roots</div>
                        <Link className="font" style ={{color: 'blue',textDecoration:'underline'}} href= {`/MIT/squareRoots`}>Square roots: { localStorageAvailable && parseInt(window.localStorage.getItem(`${id} Square Root`)) ? parseInt(window.localStorage.getItem(`${id} Square Root`)): 0}</Link><br></br>
                        <Link className="font" style ={{color: 'blue',textDecoration:'underline'}} href= {`/MIT/cubeRoots`}>Cube roots: { localStorageAvailable && parseInt(window.localStorage.getItem(`${id} Cube Root`)) ? parseInt(window.localStorage.getItem(`${id} Cube Root`)): 0}</Link>
                    </div>
                   <br></br>
        
                   <div className=" column" style ={{fontSize:"30px"}}>
                        <div>Bedmas</div>
                        <Link className="font" style ={{color: 'blue',textDecoration:'underline'}} href= {`/MIT/Bedmas`}>Bedmas: { localStorageAvailable && parseInt(window.localStorage.getItem(`${id} Bedmas`)) ? parseInt(window.localStorage.getItem(`${id} Bedmas`)): 0}</Link>
                    </div>
                   <br></br>
        
                   <div className=" column" style ={{fontSize:"30px"}}>
                        <div>Algebra</div>
                        <Link className="font" style ={{color: 'blue',textDecoration:'underline'}} href= {`/MIT/Algebra`}>One variable: { localStorageAvailable && parseInt(window.localStorage.getItem(`${id} Algebra`)) ? parseInt(window.localStorage.getItem(`${id} Algebra`)): 0}</Link><br></br>
                        <Link className="font" style ={{color: 'blue',textDecoration:'underline'}} href= {`/MIT/likeTerm`}>Like terms: { localStorageAvailable && parseInt(window.localStorage.getItem(`${id} Like terms`)) ? parseInt(window.localStorage.getItem(`${id} Like terms`)): 0}</Link><br></br>
                        <Link className="font" style ={{color: 'blue',textDecoration:'underline'}} href= {`/MIT/Algebra2`}>Two variable: { localStorageAvailable && parseInt(window.localStorage.getItem(`${id} Two Variable`)) ? parseInt(window.localStorage.getItem(`${id} Two Variable`)): 0}</Link><br></br>
                        <Link className="font" style ={{color: 'blue',textDecoration:'underline'}} href= {`/MIT/Foil`}>Foil: { localStorageAvailable && parseInt(window.localStorage.getItem(`${id} Foil`)) ? parseInt(window.localStorage.getItem(`${id} Foil`)): 0}</Link><br></br>
                        <Link className="font" style ={{color: 'blue',textDecoration:'underline'}} href= {`/MIT/Trinomial`}>Factor trinomial: { localStorageAvailable && parseInt(window.localStorage.getItem(`${id} Factor Trinomial`)) ? parseInt(window.localStorage.getItem(`${id} Factor Trinomial`)): 0}</Link><br></br>
                        <Link className="font" style ={{color: 'blue',textDecoration:'underline'}} href= {`/MIT/Quadratic`}>Quadratic formula: { localStorageAvailable && parseInt(window.localStorage.getItem(`${id} Quadratic Formula`)) ? parseInt(window.localStorage.getItem(`${id} Quadratic Formula`)): 0}</Link><br></br>
                    </div>
                   <br></br>
        
                   
                    <div className=" column" style ={{fontSize:"30px"}}>
                        <div>Geometry</div>
                        <Link className="font sb" style ={{color: 'blue',textDecoration:'underline'}} href= {`/MIT/TypeAngle`}>Types of angle: { localStorageAvailable && parseInt(window.localStorage.getItem(`${id} Type of Angle`)) ? parseInt(window.localStorage.getItem(`${id} Type of Angle`)): 0}</Link><br></br>
                        <Link className="font sb" style ={{color: 'blue',textDecoration:'underline'}} href= {`/MIT/Perimeter`}>Perimeter: { localStorageAvailable && parseInt(window.localStorage.getItem(`${id} Perimeter`)) ? parseInt(window.localStorage.getItem(`${id} Perimeter`)): 0}</Link><br></br>
                        <Link className="font sb" style ={{color: 'blue',textDecoration:'underline'}} href= {`/MIT/Circumference`}>Circumference: { localStorageAvailable && parseInt(window.localStorage.getItem(`${id} Circumference`)) ? parseInt(window.localStorage.getItem(`${id} Circumference`)): 0}</Link><br></br>
                        <Link className="font sb " style ={{color: 'blue',textDecoration:'underline'}} href= {`/MIT/Area`}>Area: { localStorageAvailable && parseInt(window.localStorage.getItem(`${id} Area`)) ? parseInt(window.localStorage.getItem(`${id} Area`)): 0}</Link>
                   </div>
                   <br></br>
                       
                    <div className=" column" style ={{fontSize:"30px"}}>
                        <div>Logarithms</div>
                        <Link className="font sb" style ={{color: 'blue',textDecoration:'underline'}} href= {`/MIT/Logarithm`}>Logarithms: { localStorageAvailable && parseInt(window.localStorage.getItem(`${id} Logarithm`)) ? parseInt(window.localStorage.getItem(`${id} Logarithm`)): 0}</Link><br></br>
                   </div>
                   <br></br>
                   </div> 
                </div>
            )
        }

    