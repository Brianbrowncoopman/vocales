import React from "react";

const CubosVehiculos = ({
  vehiculo,
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
      aria-label={`Seleccionar vehículo ${vehiculo}`}
      onClick={() => onSeleccionar(vehiculo)}
      onKeyDown={(e) => {
        if (e.key === "Enter") onSeleccionar(vehiculo);
      }}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      style={{ backgroundColor: color }}
    >
      {vehiculo}
    </div>
  );
};

export default CubosVehiculos;