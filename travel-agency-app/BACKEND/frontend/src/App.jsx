import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Homepage from './pages/Homepage'
import Destinations from './pages/Destinations'
import Contact from './pages/Contact'
import BookHotel from './pages/BookHotel'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/destinations" element={<Destinations />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/book-hotel" element={<BookHotel />} />
      </Routes>
    </Layout>
  )
}

export default App

