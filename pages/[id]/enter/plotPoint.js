import { Fragment, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const RANGE = [5, 4, 3, 2, 1, 0, -1, -2, -3, -4, -5]; // top to bottom (y)
const XS = [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5];

function randomPoint() {
    return {
        x: Math.floor(Math.random() * 11) - 5,
        y: Math.floor(Math.random() * 11) - 5,
    };
}

export default function FindPoint() {
    const [loaded, setLoaded] = useState(false);
    const [target, setTarget] = useState({ x: 0, y: 0 });
    const [helpStep, setHelpStep] = useState(0); // 0 = nothing, 1 = x column, 2 = x column + y row
    const [locked, setLocked] = useState(false);
    const [bad, setBad] = useState(null);   // "x,y" of the wrong button
    const [good, setGood] = useState(null); // "x,y" of the right button
    const [score, setScore] = useState(0)
    const [count, setCount] = useState(0)
    const router = useRouter()
    const {username} = router.query
    const {id} = router.query

    useEffect(() =>{
        setLoaded(true)
        const count = parseInt(window.localStorage.getItem(`${id} DoubleAdd`))
        setCount(count ? count : 0)
        const score = parseInt(window.localStorage.getItem(`${id} score`))
        setScore(score ? score : 0)
        const ID = window.localStorage.getItem('ID')
    },[])

    // random numbers only after mount, so server and client HTML match
    useEffect(() => {
        setTarget(randomPoint());
        setLoaded(true);
    }, []);

    function open() {
        if (!locked && helpStep < 2) setHelpStep(helpStep + 1);
    }

    function guess(x, y) {
        if (locked) return;
        if (x === target.x && y === target.y) {
            setLocked(true);
            setGood(`${x},${y}`);
            setScore(score + 1);
            setTimeout(() => {
                setTarget(randomPoint());
                setGood(null);
                setHelpStep(0);
                setLocked(false);
            }, 1000);
        } else {
            setBad(`${x},${y}`);
            setTimeout(() => setBad(null), 700);
        }
    }

    function cellClass(x, y) {
        const key = `${x},${y}`;
        let c = "fp-cell";
        if (x === 0 || y === 0) c += " fp-axis";
        if (helpStep >= 1 && x === target.x) c += " fp-x";
        if (helpStep >= 2 && y === target.y) c += " fp-y";
        if (bad === key) c += " fp-bad";
        if (good === key) c += " fp-good";
        return c;
    }

    return (
        <div className="beige container column">
            <div className="Test sb double center">
                <div>Score: {loaded && score}</div>
                <div className="font" >Plot point: {loaded && count} </div>
            </div>
            <div className="font">
                Find the point ({loaded && target.x}, {loaded && target.y})
            </div>
            <div className="font" style={{minHeight: "28px"}}>
                {loaded && helpStep >= 1 && <span style={{color: "#3b82f6"}}>x = {target.x}</span>}
                {loaded && helpStep >= 2 && <span style={{color: "#d4a900", marginLeft: "16px"}}>y = {target.y}</span>}
            </div>
            <div className="row">
                {helpStep < 2 && (
                    <button className="help" style={{margin: "10px 20px"}} onClick={open}>Help</button>
                )}
            </div>

            <div className="fp-grid" style={{position: "relative",right:"15px"}} >
                {RANGE.map((y) => (
                    <Fragment key={y}>
                        <div className="fp-label">{y}</div>
                        {XS.map((x) => (
                            <button
                                key={`${x},${y}`}
                                className={cellClass(x, y)}
                                onClick={() => guess(x, y)}
                            />
                        ))}
                    </Fragment>
                ))}
                <div />
                {XS.map((x) => (
                    <div key={`b${x}`} className="fp-label">{x}</div>
                ))}
            </div>

            <style jsx>{`
                .fp-grid{display:grid;grid-template-columns:repeat(12,1fr);gap:3px;padding:8px;border-radius:14px;width:min(92vw,480px);margin-top:8px}
                .fp-label{font-size:.7rem;display:flex;align-items:center;justify-content:center;opacity:.7}
                .fp-cell{aspect-ratio:1;border:1px solid #d5d9e5;border-radius:6px;background:#fff;cursor:pointer;padding:0;transition:background .15s,box-shadow .15s}
                .fp-cell.fp-axis{background:#d3d3d3}
                .fp-cell:hover{filter:brightness(.92)}
                .fp-cell.fp-x{background:#3b82f6;box-shadow:0 0 10px #3b82f6}
                .fp-cell.fp-y{background:#facc15;box-shadow:0 0 10px #facc15}
                .fp-cell.fp-x.fp-y{background:linear-gradient(135deg,#3b82f6 50%,#facc15 50%)}
                .fp-cell.fp-bad{background:#ef4444!important;box-shadow:0 0 16px #ef4444!important}
                .fp-cell.fp-good{background:#22c55e!important;box-shadow:0 0 16px #22c55e!important}
            `}</style>
        </div>
    );
}