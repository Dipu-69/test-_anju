import { Alert, Card, CardContent, Button, Chip } from '@mui/material'

const hotlines = [
  { name: 'Emergency', number: 'Your local emergency number', region: 'Global' },
  { name: 'Samaritans (UK)', number: '116 123', region: 'UK & ROI' },
  { name: '988 Lifeline', number: '988', region: 'US' }
]

export default function MedicalHelp() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold">Medical Help</h1>
      <Alert severity="warning" className="mt-4" variant="outlined">
        If you’re in immediate danger or thinking about harming yourself, please call your local emergency number now.
      </Alert>

      <div className="grid md:grid-cols-3 gap-4 mt-6">
        {hotlines.map((h) => (
          <Card key={h.name} className="bg-ink-800/60 border border-white/10">
            <CardContent>
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">{h.name}</h3>
                <Chip label={h.region} size="small" />
              </div>
              <p className="mt-2 text-white/80">{h.number}</p>
              <Button className="mt-3" size="small" variant="contained" href={`tel:${h.number.replace(/\s/g, '')}`}>Call</Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-10">
        <h2 className="text-xl font-semibold">Find professional care</h2>
        <p className="text-white/80 mt-2">Contact your GP, campus health center, or search local directories.</p>
        <ul className="list-disc ml-6 mt-2 text-white/70">
          <li><a className="hover:text-white" href="https://www.psychologytoday.com" target="_blank" rel="noreferrer">Psychology Today directory</a></li>
          <li><a className="hover:text-white" href="https://www.betterhelp.com" target="_blank" rel="noreferrer">BetterHelp</a></li>
        </ul>
      </div>
    </div>
  )
}