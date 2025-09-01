import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 py-10 grid gap-6 md:grid-cols-3 text-sm text-white/70">
        <div>
          <div className="font-semibold text-white">Mindscape</div>
          <p className="mt-2">Support for exam stress, anxiety, and mental wellbeing. Not a substitute for professional care.</p>
        </div>
        <div>
          <div className="font-semibold text-white">Quick Links</div>
          <ul className="mt-2 space-y-1">
            <li><Link className="hover:text-white" to="/medical-help">Medical Help</Link></li>
            <li><Link className="hover:text-white" to="/resources">Resources</Link></li>
            <li><Link className="hover:text-white" to="/self-assessment">Self-Assessment</Link></li>
          </ul>
        </div>
        <div>
          <div className="font-semibold text-white">Crisis</div>
          <p className="mt-2">If you’re in immediate danger, please call your local emergency number.</p>
        </div>
      </div>
    </footer>
  )
}