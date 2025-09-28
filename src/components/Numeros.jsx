import React, { useState, useEffect, useRef } from "react";
import ReactHowler from "react-howler";
import Confeti from "./Confeti";
import CubosNumeros from "./CubosNumeros"; // Asegúrate de que CubosNumeros use .cubo-numeros en su div raíz
import ImagenPalabra from "./ImagenPalabra";
import NumerosPorLetra from "./NumerosPorLetra";
import { useNavigate } from "react-router-dom";

const coloresCubo = [
  "#FF6F61",
  "#FFD54F",
  "#4FC3F7",
  "#81C784",
  "#BA68C8",
];

const fondoStyle = {
  backgroundImage: `url(${process.env.PUBLIC_URL + "/images/fondo/fondo.png"})`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center center",
  backgroundSize: "cover",
  minHeight: "100vh",
  width: "100vw",
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

// Obtener 4 números aleatorios distintos al correcto, más el correcto
function getRandomOpciones(todasLasPalabras, correcto, count) {
  const opciones = new Set();
  opciones.add(correcto);

  while (opciones.size < count + 1) {
    const idx = Math.floor(Math.random() * todasLasPalabras.length);
    const candidato = todasLasPalabras[idx].nombre.toLowerCase();
    if (candidato !== correcto) {
      opciones.add(candidato);
    }
  }

  // Mezclar aleatoriamente
  return Array.from(opciones).sort(() => Math.random() - 0.5);
}

const Numeros = () => {
  const todasLasPalabras = NumerosPorLetra;

  const [palabraActualIdx, setPalabraActualIdx] = useState(() =>
    todasLasPalabras.length > 0 ? getRandomIdx(todasLasPalabras.length, -1) : 0
  );

  const palabraActual = todasLasPalabras[palabraActualIdx] || {
    nombre: "",
    img: "",
    sound: "",
  };
  const numeroActual = palabraActual.nombre ? palabraActual.nombre.toLowerCase() : "";

  const [numerosEnCubos, setNumerosEnCubos] = useState([]);
  const [seleccion, setSeleccion] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [playing, setPlaying] = useState(false);
  const [soundSrc, setSoundSrc] = useState(null);
  const [feedbackSound, setFeedbackSound] = useState(null);
  const [iniciado, setIniciado] = useState(false);
  const [celebracion, setCelebracion] = useState(false);
  const [errorVisual, setErrorVisual] = useState(false);

  const [contadorCorrectas, setContadorCorrectas] = useState(0);
  const [contadorErroneas, setContadorErroneas] = useState(0);

  const navigate = useNavigate();

  const advanceTimeoutRef = useRef(null);

  useEffect(() => {
    if (numeroActual) {
      const opciones = getRandomOpciones(todasLasPalabras, numeroActual, 4);
      setNumerosEnCubos(opciones);
    }
  }, [numeroActual, todasLasPalabras]);

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

    if (String(v).toLowerCase() === numeroActual) {
      setContadorCorrectas((prev) => prev + 1);
      setFeedbackSound(sonidoCorrecto);
      setCelebracion(true);

      advanceTimeoutRef.current = setTimeout(() => {
        setPalabraActualIdx(getRandomIdx(todasLasPalabras.length, palabraActualIdx));
        setFeedback(null);
        setCelebracion(false);
      }, 2500);
    } else {
      setContadorErroneas((prev) => prev + 1);
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
    <div className="vocales-container" >
      {!iniciado && (
        <div className="iniciar-overlay" style={fondoStyle}>
          <div className="iniciar-instrucciones">
            <h2>Instrucciones</h2>
            <ul>
              <li>1.- Verás una imagen y escucharás el sonido de esa imagen.</li>
              <li>2.- Debes elegir el número que corresponde con la imagen y sonido.</li>
              <li>
                3.- Si eliges el número correcto, se escuchará un mensaje de felicitaciones y la imagen cambiará.
              </li>
              <li>
                4.- Si eliges una opción incorrecta, se escuchará un mensaje y nuevamente el sonido asociado a la imagen.
              </li>
              <li>
                5.- Puedes tocar la imagen para escuchar el sonido nuevamente cuantas veces necesites.
              </li>
            </ul>
          </div>
          <button className="iniciar-boton" onClick={handleEmpezar}>
            Empezar
          </button>
        </div>
      )}

      <div className="cubos-container-numeros">
        {numerosEnCubos.map((num, idx) => (
          <CubosNumeros
            key={num}
            numero={num}
            color={coloresCubo[idx % coloresCubo.length]}
            seleccionado={seleccion === num}
            onSeleccionar={(numero) => {
              if (iniciado && !feedbackSound) verificarSeleccion(numero);
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
          onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.97)")}
          onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
          ariaLabel={`Reproducir sonido de ${palabraActual.nombre}`}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter") repetirSonido();
          }}
        />
        <div className="contador-feedback">
          <p>
            <span className="icono-correcto" role="img" aria-label="correcto">
              ✔️
            </span>
            Correctas: {contadorCorrectas}
          </p>
          <p>
            <span className="icono-incorrecto" role="img" aria-label="incorrecto">
              ❌
            </span>
            Incorrectas: {contadorErroneas}
          </p>
        </div>

        <button
          className="boton-volver-principal"
          style={{
            marginTop: "15px",
            padding: "8px 18px",
            borderRadius: "12px",
            background: "#FF6F61",
            color: "white",
            border: "none",
            fontSize: "1.1rem",
            fontWeight: "bold",
          }}
          onClick={() => navigate("/")}
        >
          Ir a Menú Principal
        </button>
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

export default Numeros;


