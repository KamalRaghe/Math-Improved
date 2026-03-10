import { useState } from "react";

export default function Math() {

  const [open, setOpen] = useState(null)
  const [url, setUrl] = useState("")
  const [topic, setTopic] = useState("")

  const topics = [
    {
      name: "Addition",
      id: 1,
      subs: [
        { name: "Single digit Addition", url: "singleADD" },
        { name: "Double digit Addition", url: "doubleADD" }
      ]
    },
    {
      name: "Subtraction",
      id: 2,
      subs: [
        { name: "Single digit Subtraction", url: "singleMinus" },
        { name: "Double digit Subtraction", url: "doubleMinus" }
      ]
    },
    {
      name: "Multiplication",
      id: 3,
      subs: [
        { name: "Single digit Multiplication", url: "singleTimes" },
        { name: "Double digit Multiplication", url: "doubleTimes" }
      ]
    }
  ]

  function choose(u, t) {
    setUrl(u)
    setTopic(t)
  }

  return (
    <div style={{width:"96%"}}>

      <h1 style={{margin:"20px"}}>Practice</h1>

      {topics.map((t) => (
        <div key={t.id}>

          {/* Main topic */}
          <button
            className="topic"
            onClick={() => setOpen(t.id)}
          >
            {t.name}
          </button>

          {/* Sub topics */}
          {open === t.id && t.subs.map((s) => (
            <button
              key={s.url}
              className="sub-topic zoom"
              onClick={() => choose(s.url, s.name)}
            >
              {s.name}
            </button>
          ))}

        </div>
      ))}

      <p>Selected Topic: {topic}</p>
      <p>URL: {url}</p>

    </div>
  )
}