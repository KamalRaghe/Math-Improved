import { useEffect, useState } from "react";
import Choice from "@/components/choice";
import Correct from "@/components/correct";
import Wrong from "@/components/wrong";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Limits() {
  const [help, setHelp] = useState(false);           // existing help toggle
  const [helpIndex, setHelpIndex] = useState(0);     // which help step is showing
  const [helpSteps, setHelpSteps] = useState([]);    // prepared help steps

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

}


