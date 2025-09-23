import React from "react";

const CuboVocal = ({
  letra,
  color,
  seleccionado,
  onSeleccionar,
}) => {
  // Añadimos la clase 'seleccionado' dinámicamente
  const cuboClasses = `cubo-vocal ${seleccionado ? 'seleccionado' : ''}`;
  
  const handleMouseDown = (e) => {
    if (!seleccionado) e.currentTarget.style.transform = 'scale(0.95)';
  };

  const handleMouseUp = (e) => {
    if (!seleccionado) e.currentTarget.style.transform = 'scale(1)';
  };

  return (
    <div
      className={cuboClasses}
      role="button"
      tabIndex={0}
      aria-label={`Seleccionar vocal ${letra}`}
      onClick={() => onSeleccionar(letra)}
      onKeyDown={(e) => { if (e.key === 'Enter') onSeleccionar(letra); }}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp} // Reutilizamos la misma lógica para restaurar el tamaño
      style={{
        backgroundColor: color, // El único estilo en línea que necesitamos
      }}
    >
      {letra.toUpperCase()}
    </div>
  );
};

export default CuboVocal;