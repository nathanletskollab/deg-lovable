import { Routes, Route } from 'react-router-dom'
import { SpeedInsights } from '@vercel/speed-insights/react'
import './index.css'
import HomePage from './pages/HomePage'
import StartYourCarePage from './pages/StartYourCarePage'
import ContinueYourCarePage from './pages/ContinueYourCarePage'

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/start-your-care" element={<StartYourCarePage />} />
        <Route path="/continue-your-care" element={<ContinueYourCarePage />} />
      </Routes>
      <SpeedInsights />
    </>
  )
}
