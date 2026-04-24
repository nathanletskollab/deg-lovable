import { Routes, Route } from 'react-router-dom'
import './index.css'
import HomePage from './pages/HomePage'
import StartYourCarePage from './pages/StartYourCarePage'
import ContinueYourCarePage from './pages/ContinueYourCarePage'
import AboutEricaPage from './pages/AboutEricaPage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/start-your-care" element={<StartYourCarePage />} />
      <Route path="/continue-your-care" element={<ContinueYourCarePage />} />
      <Route path="/about" element={<AboutEricaPage />} />
    </Routes>
  )
}
