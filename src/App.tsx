import React from 'react';
import { Routes, Route, } from 'react-router-dom';
import Header from './Components/Header'
import PLNCalculator from './Pages/PLNCalculator'
import LightQuantity from './Pages/LightQuantity';
import LumensLux from './Pages/LumenLux';
import Footer from './Components/Footer';


function App() {
  return (
    <>
      <Header/>
      <Routes>
        <Route path="/" element={<PLNCalculator />} />
        <Route path="/light-quantity" element={<LightQuantity />} />
        <Route path="/lumens-lux" element={<LumensLux/>} />
      </Routes>
      <Footer/>
    </>
  )
}

export default App