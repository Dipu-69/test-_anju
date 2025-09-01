import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material'
import ExpandMore from '@mui/icons-material/ExpandMore'

export default function Resources() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold">Resources</h1>
      <img alt="Studying illustration" src="/assets/illustrations/studying.svg" className="mt-6 w-48 opacity-90" />
      <div className="mt-6">
        <Accordion defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMore />}>Breathing Techniques</AccordionSummary>
          <AccordionDetails>
            Try 4–7–8 breathing: inhale 4s, hold 7s, exhale 8s. Repeat 4 cycles.
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMore />}>Study Plans</AccordionSummary>
          <AccordionDetails>
            Use Pomodoro (25/5), active recall, and spaced repetition. Keep a weekly plan.
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMore />}>Focus Tools</AccordionSummary>
          <AccordionDetails>
            Turn off notifications, use a site blocker, and curate a short focus playlist.
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  )
}