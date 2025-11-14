import { Routes, Route } from 'react-router-dom'
import Index from './pages/Index'
import SignUp from './pages/SignUp'
import Dashboard from './pages/Dashboard'
import QuestionBank from './pages/QuestionBank'
import Interview from './pages/Interview'
import Report from './pages/Report'
import NotFound from './pages/NotFound'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/questions" element={<QuestionBank />} />
      <Route path="/interview" element={<Interview />} />
      <Route path="/report/:id" element={<Report />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App