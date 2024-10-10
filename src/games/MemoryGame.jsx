import React, { useState, useEffect } from 'react';
import 'animate.css'; // Importar animate.css
import './MemoryGame.css';

export default function MemoryGame() {
  // Generar 8 pares de cartas
  const generateCards = () => {
    const cardValues = 'ABCDEFGH'.split(''); // 8 letras diferentes
    const cards = cardValues.concat(cardValues) // Duplicar las letras para tener pares
      .sort(() => Math.random() - 0.5) // Mezclar las cartas
      .map((value, index) => ({ id: index + 1, value, flipped: false, matched: false, isError: false }));
    return cards;
  };

  const [cards, setCards] = useState(generateCards);
  const [flippedCards, setFlippedCards] = useState([]); // Guardar las cartas volteadas

  // Manejar la lógica de voltear cartas
  const handleFlip = (id) => {
    const flippedCard = cards.find(card => card.id === id);

    if (flippedCard.flipped || flippedCard.matched || flippedCards.length === 2) {
      return; // Ignorar si la carta ya está volteada o si ya hay dos volteadas
    }

    const updatedCards = cards.map(card =>
      card.id === id ? { ...card, flipped: true } : card
    );

    setCards(updatedCards);
    setFlippedCards([...flippedCards, flippedCard]);

    if (flippedCards.length === 1) {
      checkForMatch(updatedCards, flippedCards[0], flippedCard);
    }
  };

  // Verificar si las dos cartas volteadas coinciden
  const checkForMatch = (updatedCards, firstCard, secondCard) => {
    if (firstCard.value === secondCard.value) {
      // Si coinciden, poner borde verde y mantenerlas volteadas
      setCards(prevCards =>
        prevCards.map(card =>
          card.id === firstCard.id || card.id === secondCard.id
            ? { ...card, matched: true }
            : card
        )
      );
      setFlippedCards([]); // Reiniciar las cartas volteadas
    } else {
      // Si no coinciden, resaltar en rojo y voltearlas después
      setCards(prevCards =>
        prevCards.map(card =>
          card.id === firstCard.id || card.id === secondCard.id
            ? { ...card, isError: true }
            : card
        )
      );

      setTimeout(() => {
        setCards(prevCards =>
          prevCards.map(card =>
            card.id === firstCard.id || card.id === secondCard.id
              ? { ...card, flipped: false, isError: false }
              : card
          )
        );
        setFlippedCards([]); // Reiniciar las cartas volteadas
      }, 1000); // 1 segundo de espera antes de voltear
    }
  };

  return (
    <div className="memory-game">
      {cards.map(card => (
        <div 
          key={card.id} 
          className={`card animate__animated ${card.flipped ? 'animate__flipInY flipped' : ''} ${card.matched ? 'matched' : ''} ${card.isError ? 'error' : ''}`}
          onClick={() => handleFlip(card.id)}
        >
          <div>
            {card.flipped || card.matched ? card.value : ''}
          </div>
        </div>
      ))}
    </div>
  );
}
