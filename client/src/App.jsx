
import './App.css'
import { LandingPage } from './Pages/LandingPage'

import { Route, Routes } from 'react-router-dom';
import { Houses } from './Pages/Houses';



function App() {

  return (
    <div>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/houses/:code' element={<Houses />} />
      </Routes>
      
    </div>
  )
}

export default App
