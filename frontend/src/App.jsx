import React from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from './components/shared/Header';
import Home from './components/pages/Home';
import Footer from './components/shared/Footer';
import Encrypt from './components/pages/Encrypt';
import Decrypt from './components/pages/Decrypt';
const App = () => {
  return (
    <div className=''>
      <Router>
        <Header />  
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/encrypt" element={<Encrypt />} />
          <Route path="/decrypt" element={<Decrypt />} />
        </Routes>
        <Footer/>
      </Router>
      
    </div>
  )
}

export default App
