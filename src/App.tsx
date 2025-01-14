import React from 'react';
import { Routes, Route, } from 'react-router-dom';
import Header from './Components/Header'
import PLNCalculator from './Pages/PLNCalculator'
import LightQuantity from './Pages/LightQuantity';
import LumensLux from './Pages/LumenLux';

function App() {
  return (
    <>
      <Header/>
      <Routes>
        <Route path="/" element={<PLNCalculator />} />
        <Route path="/light-quantity" element={<LightQuantity />} />
        <Route path="/lumens-lux" element={<LumensLux/>} />
      </Routes>
    </>
  )
}

export default App