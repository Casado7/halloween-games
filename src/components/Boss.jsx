import React, { useState, useEffect } from 'react';
import { TypeAnimation } from 'react-type-animation';
import useSound from 'use-sound'; // Para el sonido
import typingSound from './sounds/typing2.mp3';
import dialogues from './dialogues/dialogues';

function Boss({ setStartGame }) {
  const [currentNodeIndex, setCurrentNodeIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [inputValues, setInputValues] = useState({ name: '', photo: null });
  // Precargar el sonido
  const [playTypingSound, { stop: stopTypingSound }] = useSound(typingSound, { volume: 0.5, interrupt: true });


  // Manejar cambios en el input de texto
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValues((prevValues) => ({
      ...prevValues,
      [name]: value
    }));
  };

  // Manejar cambios en la carga de archivos
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setInputValues((prevValues) => ({
      ...prevValues,
      photo: file
    }));
  };

  // Iniciar el sonido solo si se está escribiendo texto
  useEffect(() => {
    if (isTyping) {
      playTypingSound();  // Iniciar sonido al comenzar a escribir
    } else {
      stopTypingSound();  // Detener sonido cuando se deja de escribir
    }
  }, [isTyping, playTypingSound, stopTypingSound]);

  // Función para avanzar en los diálogos
  const handleNext = (nextIndex = null) => {
    if (nextIndex !== null) {
      setCurrentNodeIndex(nextIndex); // Avanzar al índice indicado
      setIsTyping(true);
    } else if (dialogues[currentNodeIndex].nextIndex) {
      // Si no hay opciones pero hay un "nextIndex"
      setCurrentNodeIndex(dialogues[currentNodeIndex].nextIndex); // Avanzar al siguiente nodo
      setIsTyping(true);
    }
    console.log(inputValues); // Mostrar los valores de los inputs
  };

  const handlePrev = () => {
    const prevIndex = dialogues[currentNodeIndex].prevIndex;
    if (prevIndex !== undefined) {
      setCurrentNodeIndex(prevIndex); // Ir al índice anterior
      setIsTyping(true);
    }
  };

  return (

    <>
      <div className="boss-image">
        {/* Espacio para la imagen del jefe que agregarás más tarde */}
        <img
          src="/path/to/boss-image.png" // Cambia este path cuando tengas la imagen
          alt="Boss"
          className="boss-img"
        />
      </div>

      {/* Texto del diálogo */}
      <div className="boss-dialogue">
        {isTyping ? (
          <TypeAnimation
            sequence={[dialogues[currentNodeIndex].text || '', () => setIsTyping(false)]}
            wrapper="p"
            speed={30} // Controla la velocidad de escritura
            onFinished={() => stopTypingSound()} // Asegura que el sonido se detenga cuando termine la animación
          />
        ) : (
          <p>{dialogues[currentNodeIndex].text}</p> // Mostrar el texto completo cuando termine de escribir
        )}
        {/* Manejo de entradas */}
        {dialogues[currentNodeIndex].input && (
          <div className="input-container">
            {dialogues[currentNodeIndex].type === 'string' && (
              <input
                type="text"
                name={dialogues[currentNodeIndex].input}
                value={inputValues[dialogues[currentNodeIndex].input] || ''}
                onChange={handleInputChange}
                placeholder="Escribe tu respuesta..."
              />
            )}

            {dialogues[currentNodeIndex].type === 'file' && (
              <input
                type="file"
                name={dialogues[currentNodeIndex].input}
                onChange={handleFileChange}
                accept="image/*"
              />
            )}
          </div>
        )}
      </div>

      {/* Botones para controlar los diálogos */}
      <div className="boss-controls">
        {/* TODO: Botón "Atrás" hacer una lista/array con el historial de movimientos para manejar el atras */}
        <button
          onClick={handlePrev}
          disabled={dialogues[currentNodeIndex].prevIndex === undefined || isTyping} // Desactivar si no hay prevIndex
        >
          Atrás
        </button>

        {/* Opciones del diálogo */}
        {dialogues[currentNodeIndex].options ? (
          <div className="options-container">
            {dialogues[currentNodeIndex].options.map((opt, index) => (
              <button key={index} onClick={() => handleNext(opt.nextIndex)} disabled={isTyping}>
                {opt.option}
              </button>
            ))}
          </div>
        ) : (
          // Si hay un nextIndex, mostrar el botón "Siguiente"
          dialogues[currentNodeIndex].nextIndex ? (
            <button onClick={() => handleNext()} disabled={isTyping}>
              Siguiente
            </button>
          ) : (
            // Si no hay opciones ni nextIndex, mostrar el botón "Empezar juego"
            <button onClick={() => setStartGame(true)} disabled={isTyping}>
              Empezar juego
            </button>
          )
        )}

      </div>
    </>
  );
}

export default Boss;
