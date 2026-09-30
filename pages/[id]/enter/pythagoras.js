import { useEffect, useState } from "react";
import Choice from "@/components/choice";
import Correct from "@/components/correct";
import Wrong from "@/components/wrong";
import HelpPythagoras from "@/components/helpPythagoras";
import PythagorasTriangle from "@/components/Pythagoras";
import Link from "next/link";
import { useRouter } from "next/router";

// Whole-number Pythagorean triples [leg, leg, hypotenuse] so every answer is an integer
const TRIPLES = [
    [3, 4, 5],
    [6, 8, 10],
    [5, 12, 13],
    [9, 12, 15],
    [8, 15, 17],
    [12, 16, 20],
    [7, 24, 25],
    [10, 24, 26],
    [20, 21, 29],
    [9, 40, 41],
];
function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function newQuestion() {
    const [x, y, c] = TRIPLES[Math.floor(Math.random() * TRIPLES.length)];
    const swap = Math.random() < 0.5;
    const far = Math.ceil(Math.random() * 2 + 1); // 2 or 3
    const offsets = shuffle([0, 1, -1, far, -far]);
    return {
        a: swap ? y : x,
        b: swap ? x : y,
        c,
        options: offsets.map((o) => c + o),
    };
}

export default function Pythagoras() {
    const [help, setHelp] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const [correct, setCorrect] = useState(false);
    const [wrong, setWrong] = useState(false);
    const [q, setQ] = useState(null); // generated on the client only, avoids hydration mismatch
    const [score, setScore] = useState(0);
    const [count, setCount] = useState(0);
    const router = useRouter();
    const { id } = router.query;

    function open() { setHelp(true); }
    function close() { setHelp(false); }

    function CorrectA() {
        setCorrect(true);
        setCount((c) => c + 1);
        setScore((s) => s + 1);
        setTimeout(() => setCorrect(false), 1900);
    }

    function WrongA() {
        setWrong(true);
        setTimeout(() => {
            setWrong(false);
            setHelp(true);
        }, 1900);
    }

    function Next() {
        setTimeout(() => setQ(newQuestion()), 1900);
    }

    // load saved progress once the router knows the id
    useEffect(() => {
        if (!router.isReady) return;

        const ID = window.localStorage.getItem("ID");
        if (ID !== id) {
            router.push("/");
            return;
        }

        const savedCount = parseInt(window.localStorage.getItem(`pythagoras ${id}`));
        setCount(savedCount ? savedCount : 0);
        const savedScore = parseInt(window.localStorage.getItem(`${id} score`));
        setScore(savedScore ? savedScore : 0);
        setQ(newQuestion());
        setLoaded(true);
    }, [router.isReady, id]);

    useEffect(() => {
        if (loaded && count > 0) window.localStorage.setItem(`pythagoras ${id}`, count);
    }, [count]);

    useEffect(() => {
        if (loaded && score > 0) window.localStorage.setItem(`${id} score`, score);
    }, [score]);

    return (
        <div className="beige container column">
            <div className="Test sb">
                <div className="double">
                    <div>Score: {loaded && score}</div>
                    <div className="font">Pythagorean Theorem: {loaded && count}</div>
                </div>
                <Link href={`/${id}/enter/testPythagoras`}>
                    <button className="green test-btn">Test</button>
                </Link>
            </div>

            <div className="center column">
                <div className="box column">
                    {loaded && q && <PythagorasTriangle a={q.a} b={q.b} />}
                </div>

                {help && q && <HelpPythagoras a={q.a} b={q.b} close={close} />}
                <div className="box column" style={{ height: "30px", paddingBottom: "20px" }}>
                    {!help && <button className="help" onClick={open}>help</button>}
                </div>

                {loaded && correct && <Correct />}
                {loaded && wrong && <Wrong />}
                <div style={{ height: "30px" }}></div>

                {loaded && q && (
                    <div className="box column">
                        <div className="row">
                            {q.options.slice(0, 3).map((v) => (
                                <Choice key={v} value={v} answer={q.c} doSomething={Next} Correct={CorrectA} Wrong={WrongA} />
                            ))}
                        </div>
                        <div className="row">
                            {q.options.slice(3).map((v) => (
                                <Choice key={v} value={v} answer={q.c} doSomething={Next} Correct={CorrectA} Wrong={WrongA} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
