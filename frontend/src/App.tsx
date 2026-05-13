import { Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import InstallPrompt from './components/pwa/InstallPrompt'
import UpdatePrompt from './components/pwa/UpdatePrompt'
import Home from './pages/Home'
import Proposals from './pages/Proposals'
import ProposalDetail from './pages/ProposalDetail'
import Simulations from './pages/Simulations'

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />
      <UpdatePrompt />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/proposals" element={<Proposals />} />
          <Route path="/proposals/:id" element={<ProposalDetail />} />
          <Route path="/simulations" element={<Simulations />} />
        </Routes>
      </main>
      <Footer />
      <InstallPrompt />
    </div>
  )
}
