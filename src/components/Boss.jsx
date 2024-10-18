import React, { useState, useEffect } from 'react';
import './Boss.css'; // Puedes agregar los estilos específicos aquí
import { TypeAnimation } from 'react-type-animation';
import useSound from 'use-sound'; // Para el sonido
import typingSound from './sounds/typing.mp3';

function Boss() {
  const [currentStep, setCurrentStep] = useState(0);
  const [playTypingSound, { stop: stopTypingSound }] = useSound(typingSound, { volume: 0.5 });
  const [isTyping, setIsTyping] = useState(true);
  // Frases del jefe
  const dialogues = [
    'Bienvenido... espero que estés listo para enfrentarte a mí.',
    'Te explicaré cómo jugar muy pronto...',
    'Prepárate, no será fácil ganarme...',
    '¿Te atreves a continuar?'
  ];

  useEffect(() => {
    if (isTyping) {
      playTypingSound();
    } else {
      stopTypingSound();
    }
  }, [isTyping, playTypingSound, stopTypingSound]);

  // Función para avanzar en los diálogos
  const handleNext = () => {
    if (currentStep < dialogues.length - 1) {
      setCurrentStep(currentStep + 1);
      setIsTyping(true);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
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
            sequence={[dialogues[currentStep], 2000, () => setIsTyping(false)]}
            wrapper="p"
          />
        ) : (
          <p>{dialogues[currentStep]}</p>
        )}
      </div>

      {/* Botones para controlar los diálogos */}
      <div className="boss-controls">
        <button
          onClick={handlePrev}
          disabled={currentStep === 0} // Desactivar el botón si estamos en el primer diálogo
        >
          Atrás
        </button>

        <button
          onClick={handleNext}
          disabled={currentStep === dialogues.length - 1} // Desactivar el botón si estamos en el último diálogo
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}

export default Boss;
