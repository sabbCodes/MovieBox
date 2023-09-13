import './App.css'
import Home from './components/Home'
import MovieDetail from './components/MovieDetail'
import { Routes, Route } from 'react-router-dom'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={ <Home /> } />
        <Route path='/:id' element={ <MovieDetail /> } />
      </Routes>
    </>
  )
}

export default App
