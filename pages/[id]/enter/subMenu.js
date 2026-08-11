import Link from "next/link";
import { useRouter } from "next/router"
export default function Menu(){
    const router = useRouter() 
    const {id} = router.query 
    return(
        <div className="center column relative" style={{top:"100px"}} >
            <Link href= {`/${id}/enter/singleAdd`}><button className="sub-topic" style={{margin:"0"}}>Basic</button></Link>
            <Link href= {`/${id}/enter/flashAdd`}><button className="sub-topic help" style={{backgroundColor:"yellow"}}>Flashcard</button></Link>
            <Link href= {`/${id}/enter/MAdd`}><button className="sub-topic green"  style={{margin:"0"}} >Memorize</button></Link>
        </div>
    )
}