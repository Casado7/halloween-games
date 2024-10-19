import React, { useState, useEffect } from 'react';
import './Boss.css'; // Puedes agregar los estilos específicos aquí
import { TypeAnimation } from 'react-type-animation';
import useSound from 'use-sound'; // Para el sonido
import typingSound from './sounds/typing2.mp3';

function Boss() {
  const [currentNodeIndex, setCurrentNodeIndex] = useState(1);
  const [isTyping, setIsTyping] = useState(false);

  // Precargar el sonido
  const [playTypingSound, { stop: stopTypingSound }] = useSound(typingSound, { volume: 0.5, interrupt: true });

  // Frases del jefe y opciones de diálogo
  const dialogues = {
    1: {
      text: 'Siento una energía... ¿Hay alguien ahí?',
      options: [
        { option: 'Sí', nextIndex: 2 },
        { option: 'No', nextIndex: 3 },
        { option: 'Hacer silencio', nextIndex: 4 }
      ]
    },
    2: {
      text: '¿Quién eres? ¿Qué buscas aquí?',
      nextIndex: 5,
      prevIndex: 1
    },
    3: {
      text: 'Sé que estás asustado. Es normal. Pero no te preocupes, pronto todo acabará...',
      nextIndex: 5,
      prevIndex: 1
    },
    4: {
      text: 'Bien, si no quieres hablar, no importa todo terminará de igual forma.',
      nextIndex: 5,
      prevIndex: 1
    },
    5: {
      text: '¿Dónde crees que estamos?',
      nextIndex: 6,
      prevIndex: 2 // Puedes ajustar el prevIndex según la lógica
    },
    6: {
      text: '¿Qué es lo último que recuerdas?',
      prevIndex: 5
    }
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
  };

  const handlePrev = () => {
    const prevIndex = dialogues[currentNodeIndex].prevIndex;
    if (prevIndex !== undefined) {
      setCurrentNodeIndex(prevIndex); // Ir al índice anterior
      setIsTyping(true);
    }
  };

  return (
    <div className="boss-container">
      {/* Imagen del jefe */}
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
            speed={10} // Controla la velocidad de escritura
            onFinished={() => stopTypingSound()} // Asegura que el sonido se detenga cuando termine la animación
          />
        ) : (
          <p>{dialogues[currentNodeIndex].text}</p> // Mostrar el texto completo cuando termine de escribir
        )}
      </div>

      {/* Botones para controlar los diálogos */}
      <div className="boss-controls">
        {/* Botón "Atrás" */}
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
          // Botón "Siguiente" si no hay opciones pero hay un diálogo "nextIndex"
          dialogues[currentNodeIndex].nextIndex && (
            <button onClick={() => handleNext()} disabled={isTyping}>
              Siguiente
            </button>
          )
        )}
      </div>
    </div>
  );
}

export default Boss;
