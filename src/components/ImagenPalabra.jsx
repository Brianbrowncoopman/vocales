

const ImagenPalabra = ({
  src,
  alt,
  celebracion,
  onClickRepetirSonido,
  onMouseDown,
  onMouseUp,
  onMouseLeave,
  ariaLabel,
  tabIndex,
  onKeyDown
}) => {
  // Añadimos la clase 'celebracion' dinámicamente
  const containerClasses = `imagen-palabra-container ${celebracion ? 'celebracion' : ''}`;

  return (
    <div
      className={containerClasses}
      onClick={onClickRepetirSonido}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseLeave}
      aria-label={ariaLabel}
      role="button"
      tabIndex={tabIndex}
      onKeyDown={onKeyDown}
    >
      <img
        src={src}
        alt={alt}
        draggable={false}
      />
    </div>
  );
};

export default ImagenPalabra;
