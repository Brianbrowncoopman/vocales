import React, { useState, useEffect, useRef } from "react";
import ReactHowler from "react-howler";
import Confeti from "./Confeti";
import CuboVocal from "./CuboVocal";
import ImagenPalabra from "./ImagenPalabra";
import palabrasPorLetra from "./PalabrasPorLetra";

const coloresCubo = [
  "#FF6F61", "#FFD54F", "#4FC3F7", "#81C784", "#BA68C8"
];

const fondoStyle = {
  backgroundImage: `url(${process.env.PUBLIC_URL + '/images/fondo/fondo.png'})`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center center',
  backgroundSize: 'cover',
  minHeight: '100vh',
  width: '100vw'
};

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
  const [errorShake, setErrorShake] = useState(false);
  const [errorVisual, setErrorVisual] = useState(false);

  const [contadorCorrectas, setContadorCorrectas] = useState(0);
  const [contadorErroneas, setContadorErroneas] = useState(0);

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
    if (feedbackSound) return;
    if (playing) setPlaying(false);

    setSeleccion(v);

    if (v === letraActual) {
      setContadorCorrectas(prev => prev + 1);
      setFeedbackSound(sonidoCorrecto);
      setCelebracion(true);

      advanceTimeoutRef.current = setTimeout(() => {
        setPalabraActualIdx(getRandomIdx(todasLasPalabras.length, palabraActualIdx));
        setFeedback(null);
        setCelebracion(false);
      }, 2500);
    } else {
      setContadorErroneas(prev => prev + 1);
      setFeedbackSound(sonidoIncorrecto);
      setErrorVisual(true);
      setTimeout(() => setErrorVisual(false), 2400);

      advanceTimeoutRef.current = setTimeout(() => {
        setFeedback(null);
        setSeleccion(null);
        setSoundSrc(palabraActual.sound);
        setPlaying(true);
      }, 2500);
    }
  };

  useEffect(() => () => clearTimeout(advanceTimeoutRef.current), []);

  return (
    <div className="vocales-container">
      {!iniciado && (
        <div className="iniciar-overlay" style={fondoStyle}>
          <div className="iniciar-instrucciones">
            <h2>Instrucciones</h2>
            <ul>
              <li>1.- Verás una imagen y escucharás el sonido de esa imagen.</li>
              <li>2.- Debes elegir la vocal con la que empieza la palabra que suena.</li>
              <li>3.- Si eliges la vocal correcta, se escuchará un mensaje de felicitaciones y la imagen cambiará.</li>
              <li>4.- Si eliges una opción incorrecta, se escuchará un mensaje y nuevamente el sonido asociado a la imagen.</li>
              <li>5.- Si necesitas escuchar nuevamente el audio de la imagen, la puedes tocar y se reproducirá el audio cuantas veces necesites.</li>
            </ul>
          </div>
          <button className="iniciar-boton" onClick={handleEmpezar}>
            Empezar
          </button>
        </div>
      )}

      

      {/* Juego: Cubos a la izquierda, imagen a la derecha */}
      
        <div className="cubos-container">
          {['a', 'e', 'i', 'o', 'u'].map((v, idx) => (
            <CuboVocal
              key={v}
              letra={v}
              color={coloresCubo[idx]}
              seleccionado={seleccion === v}
              onSeleccionar={(letra) => {
                if (iniciado && !feedbackSound) verificarSeleccion(letra);
              }}
            />
          ))}
        </div>

        <div className="palabra-display">
          <ImagenPalabra
            src={palabraActual.img}
            alt={palabraActual.nombre}
            celebracion={celebracion}
            error={errorVisual}
            onClickRepetirSonido={repetirSonido}
            onMouseDown={e => e.currentTarget.style.transform = 'scale(0.97)'}
            onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
            ariaLabel={`Reproducir sonido de ${palabraActual.nombre}`}
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter') repetirSonido(); }}
          />
          {/*<div className="feedback-container">
            {feedback}
          </div>
           Contador en la parte superior centrada */}
          <div className="contador-feedback">
            <p>
              <span className="icono-correcto" role="img" aria-label="correcto">✔️</span>
              Correctas: {contadorCorrectas}
            </p>
            <p>
              <span className="icono-incorrecto" role="img" aria-label="incorrecto">❌</span>
              Incorrectas: {contadorErroneas}
            </p>
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














