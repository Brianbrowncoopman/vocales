import React from 'react';
import { useNavigate } from 'react-router-dom';

const Principal = () => {
    const navigate = useNavigate();

  return (
    <div className='pagina-principal'>
      <div className="boton-menu" onClick={() => navigate('/Vocales')}>Vocales</div>
      {/*<div className="boton-menu" onClick={() => navigate('/Consonantes')}>Consonantes</div>*/}
      <div className="boton-menu" onClick={() => navigate('/Numeros')}>Números</div>
      {/*<div className="boton-menu" onClick={() => navigate('/Animales')}>Animales</div>*/}
      <div className="boton-menu" onClick={() => navigate('/Vehiculos')}>Vehículos</div>
      {/*<div className="boton-menu" onClick={() => navigate('/Deportes')}>Deportes</div>*/}
      {/*<div className="boton-menu" onClick={() => navigate('/FrutasVerduras')}>Frutas y verduras</div>*/}
      
    </div>
  )
}

export default Principal;