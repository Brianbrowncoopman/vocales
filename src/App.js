
import './App.css';
import Principal from './components/Principal';
import Vocales from './components/Vocales';
import Animales from './components/Animales';
import Consonantes from './components/Consonantes';
import Deportes from './components/Deportes';
import FrutasVerduras from './components/FrutasVerduras';
import Numeros from './components/Numeros';
import Vehiculos from './components/Vehiculos';
import 'semantic-ui-css/semantic.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/*<div className="App" style={{
          backgroundImage: `url(${process.env.PUBLIC_URL + '/images/fondo/fondo.png'})`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center center',
          backgroundSize: 'cover',
          minHeight: '100vh',
          width: '100vw'
        }}>
          <Vocales />
          
        </div>*/}
        <Route path="/" element={<Principal />} />
        <Route path="/Vocales" element={<Vocales />} />
        <Route path="/Animales" element={<Animales />} />
        <Route path="/Consonantes" element={<Consonantes />} />
        <Route path="/Deportes"  element={<Deportes />} />
        <Route path="/FrutasVerduras"element={<FrutasVerduras />} />
        <Route path="/Numeros" element={<Numeros />} />
        <Route path="/Vehiculos" element={<Vehiculos />} />
      </Routes>
    </BrowserRouter>
  );
}

export  default App;