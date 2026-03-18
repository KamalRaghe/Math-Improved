import { useEffect, useState } from "react";
import TWH from "@/components/HwT";

export default function Math(){

const [open,setOpen] = useState(null)
const [close,setClose] = useState(true)
const [url,setUrl] = useState("")
const [topic,setTopic] = useState("")
const [hw, setHw] = useState()

function choose(u,t){
  setUrl(u)
  setTopic(t)
  setClose(true)
}

function Close(){
  setClose(false)
}

const topics = [

{
name:"Addition",
id:1,
subs:[
{name:"Single digit Addition",url:"singleADD"},
{name:"Double digit Addition",url:"doubleADD"}
]
},

{
name:"Subtraction",
id:2,
subs:[
{name:"Single digit Subtraction",url:"singleMinus"},
{name:"Double digit Subtraction",url:"doubleMinus"}
]
},

{
name:"Multiplication",
id:3,
subs:[
{name:"Single digit Multiplication",url:"singleTimes"},
{name:"Double digit Multiplication",url:"doubleTimes"}
]
},

{
name:"Division",
id:4,
subs:[
{name:"Long Division",url:"longDivision"}
]
},

{
name:"LCM & HCF",
id:5,
subs:[
{name:"Lowest Common Multiple",url:"Lcm"},
{name:"Highest Common Factor",url:"Hcf"}
]
},

{
name:"Fractions",
id:"fraction",
subs:[
{name:"Simplify",url:"Simplify"},
{name:"Mixed to Improper",url:"Mixed"},
{name:"Improper to Mixed",url:"Improper"},
{name:"Addition (common denominator)",url:"ACD"},
{name:"Addition (uncommon denominator)",url:"AUD"},
{name:"Addition (Mixed Fractions)",url:"AMF"},
{name:"Subtraction (common denominator)",url:"SCD"},
{name:"Subtraction (Mixed Fractions)",url:"SMF"},
{name:"Multiplication (Proper Fractions)",url:"MPF"},
{name:"Multiplication (Mixed Fractions)",url:"MMF"},
{name:"Division (Proper Fractions)",url:"DPF"},
{name:"Division (Mixed Fractions)",url:"DMF"}
]
},

{
name:"Inequality",
id:"ineq",
subs:[
{name:"Greater than less than",url:"Gl"}
]
},

{
name:"Mean Median & Mode",
id:6,
subs:[
{name:"Mean",url:"mean"},
{name:"Median",url:"median"},
{name:"Mode",url:"mode"}
]
},

{
name:"Exponents / Power",
id:7,
subs:[
{name:"Square",url:"square"},
{name:"Cube",url:"cube"}
]
},

{
name:"Roots",
id:8,
subs:[
{name:"Square roots",url:"squareRoots"},
{name:"Cube roots",url:"cubeRoots"}
]
},

{
name:"Bedmas",
id:9,
subs:[
{name:"Bedmas",url:"Bedmas"}
]
},

{
name:"Algebra",
id:10,
subs:[
{name:"One variable",url:"Algebra"},
{name:"Like terms",url:"likeTerm"},
{name:"Two variable",url:"Algebra2"},
{name:"Foil",url:"Foil"},
{name:"Factor trinomial",url:"Trinomial"},
{name:"Quadratic formula",url:"Quadratic"}
]
},

{
name:"Geometry",
id:"geometry",
subs:[
{name:"Types of angle",url:"TypeAngle"},
{name:"Perimeter",url:"Perimeter"},
{name:"Circumference",url:"Circumference"},
{name:"Area",url:"Area"}
]
},

{
name:"Logarithms",
id:"log",
subs:[
{name:"Logarithms",url:"Logarithm"}
]
},

{
name:"Function",
id:"function",
subs:[
{name:"Slope",url:"slope"},
{name:"Solve for b",url:"solveB"}
]
}

]
useEffect(()=>{
 console.log(topic, url)
},[topic])

return(

<div style={{width:"96%"}}>

{close && topic && <TWH close={()=>Close()} topic = {topic} url ={url} ></TWH>}

{topics.map((t)=>(
<div key={t.id}>

<button
className="topic"
onClick={()=>setOpen(t.id)}
>
{t.name}
</button>

{open===t.id && t.subs.map((s)=>(
<button
key={s.url}
className="sub-topic zoom"
onClick={()=>choose(s.url,s.name)}
>
{s.name}
</button>
))}

</div>
))}

</div>

)

}