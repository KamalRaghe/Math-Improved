import { useEffect, useState } from "react"
import Step from "@/components/step"
import HelpDiv from "@/components/PerfectDivision"
import HelpAdd from "@/components/HelpAdd"
import HelpTimes from "@/components/HelpTimes"
import StepTimes from "@/components/stepTimes"
import HelpMinus from "@/components/HelpMinus"
import StepAdd from "@/components/StepAdd"
import StepMinus from "@/components/StepMinus"
import ExponentCalculator from "@/limitCalc"

// LimitsStepByStep.jsx
// A clean, step-by-step React component that evaluates
// lim_{x -> a} (c0*x^e0 + c1*x^e1 + c2*x^e2)
// Steps:
// 1) show original expression
// 2) show substitution for each term individually (x -> a)
// 3) show computed numeric value for each term
// 4) show final sum and present multiple-choice answers

export default function LimitsStepByStep({ c = [1, 2, 3], e = [2, 1, 0], x = 2, close }) {
  // step: 0 = intro, 1 = substitute term0, 2 = substitute term1, 3 = substitute term2,
  // 4 = show numeric term results, 5 = final MCQ result shown
  const [step, setStep] = useState(0)
  const [showHelp, setShowHelp] = useState(false)
  const [helpSign, setHelpSign] = useState("+")
  const [termValues, setTermValues] = useState([null, null, null])
  const [answer, setAnswer] = useState(null)
  const [choices, setChoices] = useState([])
  const [done, setDone] = useState(false)
  const [showCalculator, setShowCalculator] = useState(true)

  useEffect(() => {
    // compute numeric values of each term when props change
    const t0 = c[0] * Math.pow(x, e[0])
    const t1 = c[1] * Math.pow(x, e[1])
    const t2 = c[2] * Math.pow(x, e[2])
    const result = t0 + t1 + t2
    setTermValues([t0, t1, t2])
    setAnswer(result)

    // generate 4 distinct choices around the correct answer
    const base = Math.round(result)
    const offsets = [0, 1, -1, 2]
    // shuffle and map
    const shuffled = offsets.sort(() => Math.random() - 0.5)
    const generated = shuffled.map((o) => base + o)

    // make sure correct answer appears exactly once
    if (!generated.includes(Math.round(result))) {
      generated[0] = Math.round(result)
    }
    setChoices(generated)
  }, [c, e, x])

  function next() {
    setStep((s) => Math.min(5, s + 1))
  }
  function prev() {
    setStep((s) => Math.max(0, s - 1))
  }

  function openHelpFor(sign) {
    setHelpSign(sign)
    setShowHelp(true)
  }

  function onChoiceSelected(selected) {
    const correct = Math.round(answer)
    if (selected === correct) {
      setDone(true)
      // short delay then call close so parent can do whatever
      setTimeout(() => {
        if (close) close()
      }, 800)
    } else {
      // briefly flash an error state (could be extended)
      // here we'll just shake by toggling showHelp for attention
      setShowHelp(true)
      setTimeout(() => setShowHelp(false), 700)
    }
  }

  // render helpers
  const formatTerm = (coef, exp) => `${coef}x^${exp}`

  return (
    <div className="p-4 bg-white rounded-lg shadow-md w-full max-w-2xl relative">
      <div className="flex justify-between items-start">
        <div className="text-sm text-gray-600">Step {step} / 5</div>
        <div>
          <button className="px-3 py-1 text-sm rounded bg-gray-100 mr-2" onClick={prev}>
            Prev
          </button>
          <button className="px-3 py-1 text-sm rounded bg-gray-100" onClick={next}>
            Next
          </button>
          <button className="ml-3 px-3 py-1 text-sm rounded bg-red-500 text-white" onClick={close}>
            Close
          </button>
        </div>
      </div>

      <div className="mt-4">
        {/* Expression header */}
        <div className="text-2xl font-medium mb-3 flex items-baseline gap-3">
          <span className="text-3xl">lim</span>
          <span className="text-lg">(x → {x})</span>
          <span className="ml-2">{formatTerm(c[0], e[0])} + {formatTerm(c[1], e[1])} + {formatTerm(c[2], e[2])}</span>
        </div>

        {/* Step content */}
        <div className="bg-gray-50 p-4 rounded">
          {step === 0 && (
            <div>
              <p className="mb-2">This component will evaluate the limit by substituting <strong>x → {x}</strong> into each term and summing the results.</p>
              <p className="text-sm text-gray-600">Click <em>Next</em> to substitute term-by-term.</p>
            </div>
          )}

          {step >= 1 && (
            <div className="space-y-3">
              {/* substitution display per-term */}
              <div className={`p-2 rounded ${step === 1 ? 'bg-white shadow' : 'bg-transparent'}`}>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-gray-500">Term 1</div>
                    <div className="text-lg font-semibold">{formatTerm(c[0], e[0])}</div>
                    <div className="text-sm mt-1">Substitute x → {x} → {c[0]} * {x}^{e[0]} = <strong>{termValues[0]}</strong></div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <button className="px-3 py-1 text-sm rounded bg-yellow-200" onClick={() => openHelpFor('+')}>help</button>
                  </div>
                </div>
              </div>

              {step >= 2 && (
                <div className={`p-2 rounded ${step === 2 ? 'bg-white shadow' : 'bg-transparent'}`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-gray-500">Term 2</div>
                      <div className="text-lg font-semibold">{formatTerm(c[1], e[1])}</div>
                      <div className="text-sm mt-1">Substitute x → {x} → {c[1]} * {x}^{e[1]} = <strong>{termValues[1]}</strong></div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <button className="px-3 py-1 text-sm rounded bg-yellow-200" onClick={() => openHelpFor('+')}>help</button>
                    </div>
                  </div>
                </div>
              )}

              {step >= 3 && (
                <div className={`p-2 rounded ${step === 3 ? 'bg-white shadow' : 'bg-transparent'}`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-gray-500">Term 3</div>
                      <div className="text-lg font-semibold">{formatTerm(c[2], e[2])}</div>
                      <div className="text-sm mt-1">Substitute x → {x} → {c[2]} * {x}^{e[2]} = <strong>{termValues[2]}</strong></div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <button className="px-3 py-1 text-sm rounded bg-yellow-200" onClick={() => openHelpFor('+')}>help</button>
                    </div>
                  </div>
                </div>
              )}

              {step >= 4 && (
                <div className="p-3 rounded bg-white shadow">
                  <div className="text-sm text-gray-500">Sum the term values:</div>
                  <div className="text-2xl font-semibold mt-2">{termValues[0]} + {termValues[1]} + {termValues[2]} = <span className="text-indigo-600">{answer}</span></div>
                </div>
              )}

              {step >= 5 && (
                <div className="p-3 rounded bg-white shadow">
                  <div className="text-sm text-gray-500">Select the correct value of the limit:</div>
                  <div className="mt-3 grid grid-cols-2 gap-3">
                    {choices.map((ch, i) => (
                      <button key={i} onClick={() => onChoiceSelected(ch)} className="p-3 rounded border text-center hover:shadow">
                        {ch}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* optional calculator and help overlay */}
        <div className="mt-4 flex items-start gap-4">
          {showCalculator && (
            <div className="w-full">
              <ExponentCalculator close={() => setShowCalculator(false)} />
            </div>
          )}

          {showHelp && (
            <div className="w-80 p-3 border rounded bg-yellow-50">
              {/* Choose which help component you want to show depending on helpSign. For simplicity we show Add help here. */}
              {helpSign === '+' && <HelpAdd close={() => setShowHelp(false)} num1={termValues[0] ?? 0} num2={termValues[1] ?? 0} />}
              {helpSign === 'x' && <HelpTimes close={() => setShowHelp(false)} num1={termValues[0] ?? 0} num2={termValues[1] ?? 0} />}
              {helpSign === '-' && <HelpMinus close={() => setShowHelp(false)} num1={termValues[0] ?? 0} num2={termValues[1] ?? 0} />}
            </div>
          )}
        </div>

        {/* done message */}
        {done && (
          <div className="mt-4 p-3 bg-green-50 rounded text-green-800">Correct — closing...</div>
        )}
      </div>
    </div>
  )
}
