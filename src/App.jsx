import React, { useEffect, useState } from 'react';
import './App.css';
import DiceGame from './games/DiceGame';
import CloudinaryTests from './components/CloudinaryTests';
import Boss from './components/Boss';

function App() {
  const [startGame, setStartGame] = useState(false);
  useEffect(() => {
    console.log("startGame", startGame);
  }
  , [startGame]);
  return (
    <div className="app-container">
      {/* Contenedor de Boss */}
      <div className="boss-container">
        <Boss setStartGame={setStartGame} />
      </div>
      
      {/* Contenedor del juego */}
      <div className="dicegame-container">
        <DiceGame startGame={startGame} />
      </div>
    </div>
  );
}

export default App;
