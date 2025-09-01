import { motion } from 'framer-motion'
import { Button, Paper } from '@mui/material'
import { Link } from 'react-router-dom'
import BrainScene from '../components/Three/BrainScene'

export default function Home() {
  return (
    <div>
      <section className="bg-hero-gradient relative">
        <div className="absolute inset-0 pointer-events-none">
          <div className="w-64 h-64 rounded-full bg-brand-500/20 blur-3xl animate-breathe absolute -top-10 -right-10" />
          <div className="w-72 h-72 rounded-full bg-mint-500/20 blur-3xl animate-breathe absolute bottom-0 left-0" />
        </div>
        <div className="max-w-7xl mx-auto px-4 py-20 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <motion.h1
              className="text-4xl md:text-6xl font-bold leading-tight"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Breathe. Focus. Grow.
            </motion.h1>
            <motion.p
              className="mt-4 text-white/80 text-lg"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.6 }}
            >
              Tools and guidance to reduce exam stress and build healthier study habits.
            </motion.p>
            <motion.div
              className="mt-8 flex gap-4"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <Button component={Link} to="/self-assessment" variant="contained" color="primary">Take a quick check-in</Button>
              <Button component={Link} to="/resources" variant="outlined" color="info">Explore resources</Button>
            </motion.div>

            <div className="mt-8 flex items-center gap-4">
              <div className="h-16 w-16 rounded-full bg-brand-500/20 ring-2 ring-brand-500/50 animate-breathe" />
              <div className="text-white/70">
                A calming pulse to center your focus before you dive in.
              </div>
            </div>
          </div>

          <Paper className="bg-ink-800/40 p-2 rounded-2xl shadow-glow border border-white/10">
            <BrainScene />
          </Paper>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-16 grid md:grid-cols-3 gap-6">
        {[
          { title: 'Calm breathing', desc: 'Follow guided breathing to steady your mind.', link: '/resources' },
          { title: 'Study routines', desc: 'Pomodoro, focus playlists, and planner templates.', link: '/resources' },
          { title: 'Talk to us', desc: 'Chat with the assistant for quick support.', link: '/contact' }
        ].map((c) => (
          <motion.div key={c.title} whileHover={{ y: -4 }} className="rounded-2xl border border-white/10 p-6 bg-ink-800/50">
            <h3 className="font-semibold text-lg">{c.title}</h3>
            <p className="text-white/70 mt-2">{c.desc}</p>
            <Button component={Link} to={c.link} className="mt-4" size="small">Learn more</Button>
          </motion.div>
        ))}
      </section>
    </div>
  )
}