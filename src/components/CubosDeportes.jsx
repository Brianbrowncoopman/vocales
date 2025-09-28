import React from "react";

const CubosDeportes
 = ({
  deporte,
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
      aria-label={`Seleccionar vehículo ${deporte}`}
      onClick={() => onSeleccionar(deporte)}
      onKeyDown={(e) => {
        if (e.key === "Enter") onSeleccionar(deporte);
      }}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      style={{ backgroundColor: color }}
    >
      {deporte}
    </div>
  );
};

export default CubosDeportes
;