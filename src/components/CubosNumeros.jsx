import React from "react";

const CubosNumeros = ({
  numero,
  color,
  seleccionado,
  onSeleccionar,
}) => {
  const cuboClasses = `cubo-numeros${seleccionado ? " seleccionado" : ""}`;

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
      aria-label={`Seleccionar número ${numero}`}
      onClick={() => onSeleccionar(numero)}
      onKeyDown={(e) => {
        if (e.key === "Enter") onSeleccionar(numero);
      }}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      style={{ backgroundColor: color }}
    >
      {numero}
    </div>
  );
};

export default CubosNumeros;

