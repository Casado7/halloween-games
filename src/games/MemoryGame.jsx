import React, { useState } from 'react'; 
import 'animate.css'; // Importar animate.css
import './MemoryGame.css';
import Card from './Card'; // Importar el nuevo componente Card

const suits = ['♥️', '♦️', '♣️', '♠️']; // Definir los palos
const values = ['2', '3', '4', '5', '6', '7', '10', 'J', 'Q', 'K', 'A'];

const generateCards = () => {
  const selectedValues = [];
  while (selectedValues.length < 8) {
    const randomValue = values[Math.floor(Math.random() * values.length)];
    const randomSuit = suits[Math.floor(Math.random() * suits.length)];
    const card = { value: randomValue, suit: randomSuit };

    if (!selectedValues.find(c => c.value === card.value && c.suit === card.suit)) {
      selectedValues.push(card);
    }
  }

  const cards = selectedValues.concat(selectedValues) // Duplicar las cartas para tener pares
    .sort(() => Math.random() - 0.5) // Mezclar las cartas
    .map((card, index) => ({ id: index + 1, ...card, flipped: false, matched: false, isError: false }));
  return cards;
};

export default function MemoryGame() {
  const [cards, setCards] = useState(generateCards);
  const [flippedCards, setFlippedCards] = useState([]);

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

  const checkForMatch = (updatedCards, firstCard, secondCard) => {
    if (firstCard.value === secondCard.value) {
      // Si coinciden, mantenerlas volteadas
      setCards(prevCards =>
        prevCards.map(card =>
          card.id === firstCard.id || card.id === secondCard.id
            ? { ...card, matched: true }
            : card
        )
      );
      setFlippedCards([]);
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
        setFlippedCards([]);
      }, 1000);
    }
  };

  return (
    <div className="memory-game">
      {cards.map(card => (
        <Card 
          key={card.id} 
          value={card.value} 
          suit={card.suit} 
          flipped={card.flipped} 
          matched={card.matched} 
          isError={card.isError}
          onClick={() => handleFlip(card.id)}
        />
      ))}
    </div>
  );
}
