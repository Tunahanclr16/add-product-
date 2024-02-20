import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import Products from './pages/Products'
import Navbar from './components/Navbar'
import Favorites from './pages/Favorites'

function App() {

  return (
    <>
      <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
    </BrowserRouter>
      </>
  )
}
export default App
  