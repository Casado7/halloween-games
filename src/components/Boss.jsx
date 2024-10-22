import React, { useState, useEffect } from 'react';
import { TypeAnimation } from 'react-type-animation';
import useSound from 'use-sound'; // Para el sonido
import typingSound from './sounds/typing2.mp3';
import dialogues from './dialogues/dialogues';
import { AdvancedImage } from '@cloudinary/react'
import { Resize, Effect, RoundCorners } from '@cloudinary/url-gen/actions'
import { fill } from "@cloudinary/url-gen/actions/resize";

function Boss({ startGame, setStartGame, setPlayerName, playerChoices, setPlayerChoices, cld }) {
  const imagen = {
    room: cld.image('room_mjt5j4'),
    boss: cld.image('boss_deze50'),
    hallway: cld.image('hallway_ed6xle'),
    table: cld.image('table_oyvgi1')
  }
  const [currentNodeIndex, setCurrentNodeIndex] = useState(0);
  const [historial, setHistorial] = useState([]);
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
  const handleNext = (nextIndex = null, option = null) => {
    // Actualizar las elecciones del jugador según las opciones elegidas
    if (currentNodeIndex === 1) { // Si está en la parte de elegir clase
      setPlayerChoices((prevChoices) => ({
        ...prevChoices,
        class: option // Guardar la elección del jugador (mago, caballero, etc.)
      }));
    }

    if (option && currentNodeIndex === 7) { // Si está en la parte de elegir tipo de jefe
      setPlayerChoices((prevChoices) => ({
        ...prevChoices,
        bossType: option // Guardar la elección del tipo de jefe
      }));
    }

    if (nextIndex !== null) {
      setCurrentNodeIndex(nextIndex); // Avanzar al índice indicado
      setIsTyping(true);
      // Guardar el nodo actual en el historial
      setHistorial([...historial, currentNodeIndex]);
    } else if (dialogues[currentNodeIndex].nextIndex) {
      // Si no hay opciones pero hay un "nextIndex"
      setCurrentNodeIndex(dialogues[currentNodeIndex].nextIndex); // Avanzar al siguiente nodo
      setIsTyping(true);
      // Guardar el nodo actual en el historial
      setHistorial([...historial, currentNodeIndex]);
    }
    console.log(playerChoices);
  };

  const handlePrev = () => {
    if (historial.length > 0) {
      const prevIndex = historial[historial.length - 1];
      setCurrentNodeIndex(prevIndex);
      setHistorial(historial.slice(0, -1));
      setIsTyping(true);
    }
  };

  return (

    <>
      <div className="boss-image">
        {/* Colocar la imagen de imagen cuya llave coincia con la imagen del nodo activo */}
        <AdvancedImage
          cldImg={imagen[dialogues[currentNodeIndex].imagen]
            .resize(fill().width(400).height(400))
          }
          alt="Halloween Dark Filter"
        />
      </div>

      {/* Texto del diálogo */}
      <div className="boss-dialogue">
        {isTyping ? (
          <TypeAnimation
            sequence={[dialogues[currentNodeIndex].text || '', () => setIsTyping(false)]}
            wrapper="p"
            speed={50} // Controla la velocidad de escritura
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
          disabled={isTyping || historial.length === 0}
        >
          Atrás
        </button>

        {/* Opciones del diálogo */}
        {dialogues[currentNodeIndex].options ? (
          <div className="options-container">
            {dialogues[currentNodeIndex].options.map((opt, index) => (
              <button key={index} onClick={() => handleNext(opt.nextIndex, opt.option)} disabled={isTyping}>
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
            <button onClick={() => setStartGame(true)} disabled={isTyping || startGame}>
              Empezar juego
            </button>
          )
        )}

      </div>
    </>
  );
}

export default Boss;
