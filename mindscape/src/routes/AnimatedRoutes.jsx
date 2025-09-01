import React, { Suspense, lazy } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Home from '../pages/Home'

const MedicalHelp = lazy(() => import('../pages/MedicalHelp'))
const Contact = lazy(() => import('../pages/Contact'))
const Resources = lazy(() => import('../pages/Resources'))
const SelfAssessment = lazy(() => import('../pages/SelfAssessment'))
const About = lazy(() => import('../pages/About'))

const Page = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -12 }}
    transition={{ duration: 0.35, ease: 'easeOut' }}
    className="min-h-[70vh]"
  >
    {children}
  </motion.div>
)

export default function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<div className="p-10 text-center">Loading…</div>}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Page><Home /></Page>} />
          <Route path="/medical-help" element={<Page><MedicalHelp /></Page>} />
          <Route path="/contact" element={<Page><Contact /></Page>} />
          <Route path="/resources" element={<Page><Resources /></Page>} />
          <Route path="/self-assessment" element={<Page><SelfAssessment /></Page>} />
          <Route path="/about" element={<Page><About /></Page>} />
        </Routes>
      </Suspense>
    </AnimatePresence>
  )
}