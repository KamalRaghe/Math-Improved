import { useEffect, useState } from "react"

export default function HelpHcf({num1,num2,close}){
  const [count, setCount ] = useState([])
  const [loaded, setLoaded] = useState(false)
  const [count1, setCount1 ] = useState([])
  const [count2, setCount2 ] = useState([])
  const [count4, setCount4 ] = useState([])
  const [size, setSize] = useState('wrap')
  const [size2, setSize2] = useState('wrap')
  const [num3, setNum3] = useState('wrap')

  useEffect(() => {
    setLoaded(true)
    for(let i = 1; i <= num1 ; i++){
      if(num1 % i === 0){
        setCount(prev => [...prev, i ])
      }
  }
  for(let i = 1; i <= num2 ; i++){
    if(num2 % i === 0){
        setCount2(prev => [...prev, i ])
    }
}
  },[])

  useEffect(() => {

    if(count[Math.floor(count.length/2)] === 1){
      for(let i = 0; i < count.length/2; i++){
        setCount1(prev => [...prev, count[i]])
    }
    }else{
      for(let i = 0; i < count.length; i++){
        setCount1(prev => [...prev, count[i]])
    }
    }

  },[loaded])

  useEffect(() => {
    if(count2[Math.floor(count2.length/2)] === 1){
      for(let i = 0; i < count2.length/2; i++){
        setCount4(prev => [...prev, count2[i]])
      }
    }else{
      for(let i = 0; i < count2.length; i++){
        setCount4(prev => [...prev, count2[i]])
      }
    }

  },[loaded])

  useEffect(()=>{
    if(count1.length > 13 || count4.length > 13){
      setSize('20px')
      setSize2('3px')
    }else{
      setSize('40px')
      setSize2('10px')
    }
  },[count1,count4])

  useEffect(() => {
    for(let i=num1;i>0;i--){
      if(num1 % i === 0 && num2 % i === 0){
          setNum3(i)
          break
      }
  }
  },[num1])

  return(
      <div className="Help" style={{border: '10px solid yellow'}} >
        <div className='cancel sb' style={{height:'50px'}} ><button className="choice red" onClick={close} >Close</button><button className='cancel-btn hide'  >X</button></div>
        <div className="sb">
          {(count1.length <= 12 || count4.length <= 12) && <div style={{height:'30px'}}></div>}
          <div className="double center Green">Factor of {num1}</div>
          <div className="wrap" style={{display:'flex'}}>{count1.map( num =>{
            return <div style={{padding: size2,fontSize: size}}><div>{ num3 === num ? <div className="Green" >{num}</div>: <div>{num}</div>}</div></div>
          })}</div>

          <div className="double center Green">Factor of {num2}</div>
          <div className=" wrap" style={{display:'flex'}}>{count4.map( num4 =>{
            return <div style={{padding: size2,fontSize: size}}>{ num3 === num4 ? <div className="Green" >{num4}</div>: <div>{num4}</div>}</div>
          })}</div>
        </div>
      </div>
  )
  
 
}