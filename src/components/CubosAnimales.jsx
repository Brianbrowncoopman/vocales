import React from "react";

const CubosAnimales = ({
  animales,
  color,
  seleccionado,
  onSeleccionar,
}) => {
  const cuboClasses = `cubo-vehiculo${seleccionado ? " seleccionado" : ""}`;

  const handleMouseDown = (e) => {
    if (!seleccionado) e.currentTarget.style.transform = "scale(0.95)";
  };

  const handleMouseUp = (e) => {
    if (!seleccionado) e.currentTarget.style.transform = "scale(1)";
  };

  return (
    <div
      className={cuboClasses}
      role="button"
      tabIndex={0}
      aria-label={`Seleccionar vehículo ${animales}`}
      onClick={() => onSeleccionar(animales)}
      onKeyDown={(e) => {
        if (e.key === "Enter") onSeleccionar(animales);
      }}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      style={{ backgroundColor: color }}
    >
      {animales}
    </div>
  );
};

export default CubosAnimales;