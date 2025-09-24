import React, { useState, useEffect, useRef } from "react";
import ReactHowler from "react-howler";
import Confeti from "./Confeti";
import CuboVocal from "./CuboVocal";
import ImagenPalabra from "./ImagenPalabra";
import palabrasPorLetra from "./PalabrasPorLetra";

const coloresCubo = [
  "#FF6F61", // rojo vivo
  "#FFD54F", // amarillo brillante
  "#4FC3F7", // azul cielo
  "#81C784", // verde suave
  "#BA68C8"  // morado amigable
];

// Asegúrate de que las rutas a tus sonidos son correctas desde la carpeta `public`
const sonidoCorrecto = "/sound/gano.mp3";
const sonidoIncorrecto = "/sound/perdio.mp3";

function getRandomIdx(arrLength, currentIdx) {
  let idx;
  do {
    idx = Math.floor(Math.random() * arrLength);
  } while (arrLength > 1 && idx === currentIdx);
  return idx;
}

const Vocales = () => {
  const todasLasPalabras = Object.values(palabrasPorLetra).flat();

  const [palabraActualIdx, setPalabraActualIdx] = useState(() => {
    return todasLasPalabras.length > 0 ? getRandomIdx(todasLasPalabras.length, -1) : 0;
  });

  const palabraActual = todasLasPalabras[palabraActualIdx] || { nombre: "", img: "", sound: "" };
  const letraActual = palabraActual.nombre ? palabraActual.nombre[0].toLowerCase() : "";

  const [seleccion, setSeleccion] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [playing, setPlaying] = useState(false);
  const [soundSrc, setSoundSrc] = useState(null);
  const [feedbackSound, setFeedbackSound] = useState(null);
  const [iniciado, setIniciado] = useState(false);
  const [celebracion, setCelebracion] = useState(false);

  const advanceTimeoutRef = useRef(null);

  useEffect(() => {
    if (iniciado) {
      setFeedback(null);
      setSeleccion(null);
      setSoundSrc(palabraActual.sound);
      setPlaying(true);
      setCelebracion(false);
    }
    return () => clearTimeout(advanceTimeoutRef.current);
  }, [palabraActual, iniciado]);

  const handleEmpezar = () => {
    setIniciado(true);
    setSoundSrc(palabraActual.sound);
    setPlaying(true);
  };

  const repetirSonido = () => {
    if (!playing && !feedbackSound) {
      setSoundSrc(palabraActual.sound);
      setPlaying(true);
    }
  };

  const verificarSeleccion = (v) => {
    if (playing || feedbackSound) return;
    setSeleccion(v);

    if (v === letraActual) {
      setFeedback("¡Correcto! 😊");
      setFeedbackSound(sonidoCorrecto);
      setCelebracion(true);

      advanceTimeoutRef.current = setTimeout(() => {
        setPalabraActualIdx(getRandomIdx(todasLasPalabras.length, palabraActualIdx));
        setFeedback(null); // Se limpia en el useEffect de palabraActual
        setCelebracion(false);
      }, 2500);
    } else {
      setFeedback("Incorrecto, intenta de nuevo 😕");
      setFeedbackSound(sonidoIncorrecto);

      advanceTimeoutRef.current = setTimeout(() => {
        setFeedback(null);
        setSeleccion(null); // Deseleccionamos el cubo incorrecto
        setSoundSrc(palabraActual.sound);
        setPlaying(true);
      }, 2500);
    }
  };

  useEffect(() => () => clearTimeout(advanceTimeoutRef.current), []);

  return (
    <div className="vocales-container">
      {!iniciado && (
        <div className="iniciar-overlay">
          <button className="iniciar-boton" onClick={handleEmpezar}>
            Empezar
          </button>
        </div>
      )}

      <div className="cubos-container">
        {['a', 'e', 'i', 'o', 'u'].map((v, idx) => (
          <CuboVocal
            key={v}
            letra={v}
            color={coloresCubo[idx]}
            seleccionado={seleccion === v}
            onSeleccionar={(letra) => {
              if (iniciado && !playing && !feedbackSound) verificarSeleccion(letra);
            }}
          />
        ))}
      </div>

      <div className="palabra-display">
        <ImagenPalabra
          src={palabraActual.img}
          alt={palabraActual.nombre}
          celebracion={celebracion}
          onClickRepetirSonido={repetirSonido}
          onMouseDown={e => e.currentTarget.style.transform = 'scale(0.97)'}
          onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
          ariaLabel={`Reproducir sonido de ${palabraActual.nombre}`}
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === 'Enter') repetirSonido(); }}
        />
        <div className="feedback-container">
          {feedback}
        </div>
      </div>
      
      {soundSrc && iniciado && playing && (
        <ReactHowler src={soundSrc} playing={playing} onEnd={() => setPlaying(false)} />
      )}
      {feedbackSound && (
        <ReactHowler src={feedbackSound} playing={true} onEnd={() => setFeedbackSound(null)} />
      )}
      {celebracion && <Confeti />}
    </div>
  );
};

export default Vocales;













