
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { addDoc, collection, onSnapshot, query, where } from "firebase/firestore"
import Link from "next/link"
import { initFirebase } from "@/firebase"
import { getFirestore } from "firebase/firestore"
import { db , auth} from "../firebase"
import { Resend } from 'resend';

export default function Home() {
    const [payed, Payed] = useState(false)
    const [name, setName] = useState(false)
    const [free, setFree] = useState(false)
    const [check, setCheck] = useState(false)
    const [score, setScore] = useState(false)
    const [loaded, setLoaded] = useState(false)
    const [date, setDate] = useState(Date.now()) 
    const [id , setId] = useState(false)
    const [Account, SetAccounts] = useState([])
    const [account, setAccount] = useState({
    title:""
    })
    const router = useRouter()
    const [currencies, setCurrencies] = useState([]);
    const [fromCurrency, setFromCurrency] = useState("CAD");
    const [toCurrency, setToCurrency] = useState("EUR");
    const [amount, setAmount] = useState(3.99);
    const [convertedAmount, setConvertedAmount] = useState(null);
    const [rates, setRates] = useState({});
    
    const countryNames = {
      AED: "United Arab Emirates Dirham",
      AFN: "Afghan Afghani",
      ALL: "Albanian Lek",
      AMD: "Armenian Dram",
      ANG: "Netherlands Antillean Guilder",
      AOA: "Angolan Kwanza",
      ARS: "Argentine Peso",
      AUD: "Australian Dollar",
      AWG: "Aruban Florin",
      AZN: "Azerbaijani Manat",
      BAM: "Bosnia-Herzegovina Convertible Mark",
      BBD: "Barbadian Dollar",
      BDT: "Bangladeshi Taka",
      BGN: "Bulgarian Lev",
      BHD: "Bahraini Dinar",
      BIF: "Burundian Franc",
      BMD: "Bermudian Dollar",
      BND: "Brunei Dollar",
      BOB: "Bolivian Boliviano",
      BRL: "Brazilian Real",
      BSD: "Bahamian Dollar",
      BTN: "Bhutanese Ngultrum",
      BWP: "Botswana Pula",
      BYN: "Belarusian Ruble",
      BZD: "Belize Dollar",
      CAD: "Canadian Dollar",
      CDF: "Congolese Franc",
      CHF: "Swiss Franc",
      CLP: "Chilean Peso",
      CNY: "Chinese Yuan",
      COP: "Colombian Peso",
      CRC: "Costa Rican Colón",
      CUP: "Cuban Peso",
      CVE: "Cape Verdean Escudo",
      CZK: "Czech Koruna",
      DJF: "Djiboutian Franc",
      DKK: "Danish Krone",
      DOP: "Dominican Peso",
      DZD: "Algerian Dinar",
      EGP: "Egyptian Pound",
      ERN: "Eritrean Nakfa",
      ETB: "Ethiopian Birr",
      EUR: "Euro",
      FJD: "Fijian Dollar",
      FKP: "Falkland Islands Pound",
      GBP: "British Pound Sterling",
      GEL: "Georgian Lari",
      GHS: "Ghanaian Cedi",
      GIP: "Gibraltar Pound",
      GMD: "Gambian Dalasi",
      GNF: "Guinean Franc",
      GTQ: "Guatemalan Quetzal",
      GYD: "Guyanese Dollar",
      HKD: "Hong Kong Dollar",
      HNL: "Honduran Lempira",
      HRK: "Croatian Kuna",
      HTG: "Haitian Gourde",
      HUF: "Hungarian Forint",
      IDR: "Indonesian Rupiah",
      ILS: "Israeli New Shekel",
      INR: "Indian Rupee",
      IQD: "Iraqi Dinar",
      IRR: "Iranian Rial",
      ISK: "Icelandic Króna",
      JMD: "Jamaican Dollar",
      JOD: "Jordanian Dinar",
      JPY: "Japanese Yen",
      KES: "Kenyan Shilling",
      KGS: "Kyrgyzstani Som",
      KHR: "Cambodian Riel",
      KMF: "Comorian Franc",
      KRW: "South Korean Won",
      KWD: "Kuwaiti Dinar",
      KYD: "Cayman Islands Dollar",
      KZT: "Kazakhstani Tenge",
      LAK: "Lao Kip",
      LBP: "Lebanese Pound",
      LKR: "Sri Lankan Rupee",
      LYD: "Libyan Dinar",
      MAD: "Moroccan Dirham",
      MDL: "Moldovan Leu",
      MGA: "Malagasy Ariary",
      MKD: "Macedonian Denar",
      MMK: "Burmese Kyat",
      MNT: "Mongolian Tögrög",
      MOP: "Macanese Pataca",
      MUR: "Mauritian Rupee",
      MVR: "Maldivian Rufiyaa",
      MWK: "Malawian Kwacha",
      MXN: "Mexican Peso",
      MYR: "Malaysian Ringgit",
      NAD: "Namibian Dollar",
      NGN: "Nigerian Naira",
      NOK: "Norwegian Krone",
      NPR: "Nepalese Rupee",
      NZD: "New Zealand Dollar",
      OMR: "Omani Rial",
      PAB: "Panamanian Balboa",
      PEN: "Peruvian Sol",
      PGK: "Papua New Guinean Kina",
      PHP: "Philippine Peso",
      PKR: "Pakistani Rupee",
      PLN: "Polish Złoty",
      QAR: "Qatari Riyal",
      RON: "Romanian Leu",
      RUB: "Russian Ruble",
      RWF: "Rwandan Franc",
      SAR: "Saudi Riyal",
      SDG: "Sudanese Pound",
      SEK: "Swedish Krona",
      SGD: "Singapore Dollar",
      SOS: "Somali Shilling",
      SYP: "Syrian Pound",
      THB: "Thai Baht",
      TRY: "Turkish Lira",
      TZS: "Tanzanian Shilling",
      UAH: "Ukrainian Hryvnia",
      UGX: "Ugandan Shilling",
      USD: "United States Dollar",
      UYU: "Uruguayan Peso",
      VND: "Vietnamese Dong",
      XAF: "Central African CFA Franc",
      XCD: "East Caribbean Dollar",
      XOF: "West African CFA Franc",
      XPF: "CFP Franc",
      ZAR: "South African Rand",
      ZMW: "Zambian Kwacha"
    };

    function SignOut(){
        auth.signOut().then(() => {router.push('/')}).catch((error) => alert(error.message))
        window.localStorage.setItem('User', '')
        window.localStorage.setItem('uid', '')
      }

      async function Free(){
        const num = 3*24*60*60*1000+Date.now()
        window.localStorage.setItem('userId' , num)
        window.localStorage.setItem('Check' , num + 34521)
        setCheck(num + 34521)
        setFree(num)
      }

      function update(){
        setDate(requestAnimationFrame(update))
      }


    async function getCheckoutUrl(){
        router.push('/paying');
      };
      async function PayedCheck() {
        const app = initFirebase()
        const userId = window.localStorage.getItem('uid')
        const db = getFirestore(app);
        const subscriptionsRef = collection(db, "customers", userId, "subscriptions");
        const q = query(
          subscriptionsRef,
          where("status", "in", ["trialing", "active"])
        );
      
        const promise = new Promise((resolve, reject) => {
          const unsubscribe = onSnapshot(
            q,
            (snapshot) => {
      
              if (snapshot.docs.length === 0) {
                Payed(false);
              } else {
                Payed(true);
              }
              unsubscribe();
            },
            reject
          );
        });
      };

      useEffect(()=>{
        setName(window.localStorage.getItem(`${id} username`))
        setScore((window.localStorage.getItem(`${id} score`)))
      })

      useEffect(()=>{
        const timer = window.localStorage.getItem('Timer')
        setId(window.localStorage.getItem('uid'))
        PayedCheck()
        setLoaded(true)
        setFree(window.localStorage.getItem('userId'))
        setCheck(window.localStorage.getItem('Check'))
        update()
        const user = window.localStorage.getItem('User')
        const unsubscribe = onSnapshot(collection(db, user), (snap) =>{   
          SetAccounts(snap.docs.map(doc =>{
              return{
                  User: 'hello',
                  id: doc.id,
              }
          }))
      })
      
      return unsubscribe
    
      },[])

     

  const resend = new Resend('re_6bpe5ZTx_BoRmvFfjdTSGCLBY6XMiCzGY');

      useEffect(()=>{
        window.localStorage.setItem( 'ID', id)
      },[id])

      useEffect(()=>{
        resend.emails.send({
          from: 'kamal.raghe33@gmail.com',
          to: 'kamal.raghe33@gmail.com',
          subject: 'Hello World',
          html: '<p>Congrats on sending your <strong>first email</strong>!</p>'
        });
      },[])

  return (
    <div className="center beige column">
      
      <div className="center column" style={{alignItems:"start"}}>
        <div className="relative" style={{fontSize:"70px",top:"20px",color:'navy',padding:"0px"}} >Math</div>
        <div className="relative" style={{fontSize:"70px",color:'purple',paddingBottom:"20px"}} >Improve</div>
      </div>
      <div className="box column" >   
        {!payed && parseInt(free) === parseInt(check) - 34521 && free - Date.now() > 0 && <div className="font center" style={{fontWeight:"bold",width:"300px"}} >Free Trial: {Math.floor(((free - Date.now())%(1000*60*60*24*3))/1000/60/60/24)}d {""}{Math.floor(((free - Date.now())%(1000*60*60*24))/1000/60/60)}h {""}{Math.floor(((free - Date.now())%(1000*60*60))/1000/60)}m {""}
            {Math.floor(((free - Date.now())%(1000*60))/1000)}s
        </div>}
      </div>
        <br></br>
        <br></br>
        <br></br>
        {payed && score && <div className="center" style={{fontSize:"30px",width:"330px"}} >{name && 
        name} Score: {score}</div>}

        {!check && !free && !payed && loaded && <button className="topic" style={{backgroundColor:"yellow",color:"black",fontSize:"20px",fontWeight:"bolder",borderRadius:"20px",width:'250px', height:"40px"}} onClick={()=>{Free()}} >Start Free Trial</button>}
        {!payed && loaded && <div className="center column" ><button className="font" onClick={getCheckoutUrl} style={{color:'white',fontWeight:"bolder",borderRadius:"20px",width:'250px', height:"70px",backgroundColor:"orange"}} >
         <div>Full Access: CA$3.99</div> 
        </button>
      </div>}
      {(payed || (free - Date.now() > 0 &&  parseInt(free) === parseInt(check) - 34521)) &&
        <div className="box center" style={{width:'340px',position:"relative", top:"15px"}}>
        
        <button className="topic column" onClick={()=>{router.push(`/${id}/enter/stats`)}} style={{width:'150px', height:"90px"}} >
          <div className="center" style={{paddingTop:'20px',paddingBottom:"5px"}} >
            <div className="red relative" style={{marginBottom:"10px",rotate:'90deg',width:'20px',height:'10px',left:'20px',top:"4px"}} ></div>
            <div className="relative" style={{marginBottom:"10px",rotate:'90deg',width:'40px',height:'10px',backgroundColor:"cyan",top:"-5px",left:"5px"}} ></div>
            <div className="relative" style={{marginBottom:"10px",rotate:'90deg',width:'30px',height:'10px',left:"-15px",backgroundColor:"lime"}} ></div>
          </div>
          Stats
        </button>
        <button className="topic column" onClick={()=>{router.push(`/${id}/enter/math`)}} style={{width:'150px', height:"90px"}} >
          <div className="center" style={{padding:'0 20px'}}>
            <div className="relative" style={{rotate:"90deg",borderBottom:"50px solid white",borderRight:'25px solid transparent',borderLeft:'25px solid transparent'}} ></div>
          </div>
          Start
        </button>
      </div>
      }
        {!payed && <button className="font" style={{color:'white',fontWeight:"bolder",borderRadius:"20px",width:'150px', height:"40px",margin:"10px",backgroundColor:"grey"}}  onClick={SignOut} >SignOut</button>}
        {payed && <button className="topic column" onClick={()=>{router.push(`/settings`)}} style={{fontSize:"20px",backgroundColor:"gray",padding:"12px 34px"}} >
          Setting
        </button>
      }
    </div>
  )
}
