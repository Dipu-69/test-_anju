import { Slider, Button, Paper } from '@mui/material'
import { useState } from 'react'

export default function SelfAssessment() {
  const [stress, setStress] = useState(5)
  const [sleep, setSleep] = useState(6)
  const [result, setResult] = useState(null)

  const calculate = () => {
    const score = stress * 2 - sleep
    setResult(score)
    localStorage.setItem('mh_checkin', JSON.stringify({ stress, sleep, score, at: Date.now() }))
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold">Self-Assessment</h1>
      <Paper className="p-6 mt-6 bg-ink-800/60 border border-white/10">
        <div className="grid gap-6">
          <div>
            <div className="flex justify-between">
              <span>Stress level</span><span>{stress}</span>
            </div>
            <Slider value={stress} onChange={(_, v) => setStress(v)} min={0} max={10} />
          </div>
          <div>
            <div className="flex justify-between">
              <span>Hours of sleep</span><span>{sleep}</span>
            </div>
            <Slider value={sleep} onChange={(_, v) => setSleep(v)} min={0} max={10} />
          </div>
          <Button variant="contained" onClick={calculate}>Calculate</Button>
          {result !== null && (
            <div className="text-white/80">
              Your indicative stress score: <b>{result}</b>. This is not a diagnosis; consider our Resources or Medical Help sections.
            </div>
          )}
        </div>
      </Paper>
    </div>
  )
}