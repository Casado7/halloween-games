import React, { useState, useEffect } from 'react';
import './Boss.css'; // Puedes agregar los estilos específicos aquí
import { TypeAnimation } from 'react-type-animation';
import useSound from 'use-sound'; // Para el sonido
import typingSound from './sounds/typing2.mp3';

function Boss() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  
  // Precargar el sonido
  const [playTypingSound, { stop: stopTypingSound }] = useSound(typingSound, { volume: 0.5, interrupt: true });

  // Frases del jefe
  const dialogues = [
    'Bienvenido...',
    'espero que estés listo para enfrentarte a mí.',
    'Te explicaré cómo jugar muy pronto...',
    'Prepárate, no será fácil ganarme...',
    '¿Te atreves a continuar?'
  ];

  // Iniciar el sonido solo si se está escribiendo texto
  useEffect(() => {
    if (isTyping) {
      playTypingSound();  // Iniciar sonido al comenzar a escribir
    } else {
      stopTypingSound();  // Detener sonido cuando se deja de escribir
    }
  }, [isTyping, playTypingSound, stopTypingSound]);

  // Función para avanzar en los diálogos
  const handleNext = () => {
    if (currentStep < dialogues.length - 1) {
      setIsTyping(true);
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setIsTyping(true);
      setCurrentStep(currentStep - 1);
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
            sequence={[dialogues[currentStep], () => setIsTyping(false)]} // Cuando termine de escribir, desactiva `isTyping`
            wrapper="p"
            speed={10} // Controla la velocidad de escritura
            onFinished={() => stopTypingSound()} // Asegura que el sonido se detenga cuando termine la animación
          />
        ) : (
          <p>{dialogues[currentStep]}</p> // Mostrar el texto completo cuando termine de escribir
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
