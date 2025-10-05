import { useEffect, useState } from "react";
import Choice from "@/components/choice";
import Correct from "@/components/correct";
import Wrong from "@/components/wrong";
import HelpCube from "@/components/cubehelp";
import Link from "next/link";
import { useRouter } from "next/router";

export default function DerivativeSameExp() {
  const [help, setHelp] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [correct, setCorrect] = useState(false);
  const [wrong, setWrong] = useState(false);

  const [terms, setTerms] = useState([]);
  const [choices, setChoices] = useState([]);
  const [answer, setAnswer] = useState("");

  const router = useRouter();
  const { username, id } = router.query;

  const [score, setScore] = useState(0);
  const [count, setCount] = useState(0);

  // 🎲 Generate random polynomial (4 terms, same exponent)
  function generatePolynomial() {
    const exponent = Math.random() < 0.5 ? 2 : 3; // all same exponent: 2 or 3
    const t = [];

    for (let i = 0; i < 4; i++) {
      const coeff = Math.ceil(Math.random() * 8 + 1);
      t.push({ coeff, exp: exponent });
    }

    setTerms(t);
  }

  // 🧮 Compute derivative & choices
  function generateChoices(t) {
    if (t.length === 0) return;

    const exp = t[0].exp;
    const totalCoeff = t.reduce((sum, { coeff }) => sum + coeff, 0);

    const correct =
      exp === 1
        ? `${totalCoeff}`
        : `${totalCoeff * exp}x${supString(exp - 1)}`;

    setAnswer(correct);

    // generate 3 wrong choices (slightly off)
    const wrongs = [];
    for (let i = 0; i < 3; i++) {
      const wrongCoeff = totalCoeff * exp + (Math.random() < 0.5 ? -exp : exp);
      const wrong =
        exp === 1
          ? `${wrongCoeff}`
          : `${wrongCoeff}x${supString(exp - 1)}`;
      wrongs.push(wrong);
    }

    const mixed = [correct]()
