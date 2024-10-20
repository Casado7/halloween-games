import React, { useEffect, useState } from 'react';
import './App.css';
import DiceGame from './games/DiceGame';
import CloudinaryTests from './components/CloudinaryTests';
import Boss from './components/Boss';

function App() {
  const [startGame, setStartGame] = useState(false);
  const [playerName, setPlayerName] = useState('Jugador 1');
  useEffect(() => {
    console.log("startGame", startGame);
  }
    , [startGame]);
  return (
    <div className="app-container">
      {/* Si startGame es false, mostrar el componente Boss */}
      {!startGame && (
        <div className="boss-container">
          <Boss startGame={startGame} setStartGame={setStartGame} setPlayerName={setPlayerName} />
        </div>
      )}

      {/* Si startGame es true, mostrar el componente DiceGame */}
      {startGame && (
        <div className="dicegame-container">
          <DiceGame startGame={startGame} setStartGame={setStartGame} playerName={playerName} />
        </div>
      )}
    </div>

  );
}

export default App;
