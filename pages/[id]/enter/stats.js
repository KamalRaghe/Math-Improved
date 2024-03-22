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

    return (
        <div className="center border column">
            <div className="menu">
                <div className="center column" style={{ fontSize: "30px" }}>
                    <div>Addition</div>
                    {localStorageAvailable && renderLinks(["singleAdd", "doubleAdd"])}
                </div>
                <div className="center column" style={{ fontSize: "30px" }}>
                    <div>Number Theory</div>
                    {localStorageAvailable && renderLinks(["Lcm", "Hcf"])}
                </div>
                <div className="center column" style={{ fontSize: "30px" }}>
                    <div>Fractions</div>
                    {localStorageAvailable && renderLinks(["simplify", "Mixed", "improper", "ACD", "AUD", "AMF", "SCD", "SMF", "MPF", "MMF", "DPF", "DMF"])}
                </div>
                <div className="center column" style={{ fontSize: "30px" }}>
                    <div>Other Heading</div>
                    {localStorageAvailable && renderLinks(["Gl", "Mean", "Median", "Mode", "Square", "Cube", "SquareRoot", "CubeRoot", "Bedmas", "Algebra", "LikeTerms", "TwoVariable", "Foil", "FactorTrinomial", "QuadraticFormula", "TypeAngle", "Perimeter", "Circumference", "Area", "Logarithm"])}
                </div>
            </div>
        </div>
    );

    // Function to render links for given topics
    function renderLinks(topicList) {
        const links = topicList.map(topic => (
            <Link key={topic} className="font sb" style={{ color: 'blue', textDecoration: 'underline' }} href={`/${id}/enter/${topic}`}>
                {topic}: {localStorageAvailable && parseInt(window.localStorage.getItem(`${id} ${topic}`)) ? parseInt(window.localStorage.getItem(`${id} ${topic}`)) : 0}
            </Link>
        ));
        return links;
    }
}